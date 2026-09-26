import { readFile, writeFile, mkdir, rename, open, unlink } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createJiti } from "jiti"
import { hash, normalizeText, canonicalUrl, extractLinks, lookbackSince, recordFetch, propose, decide, approvedBundle, reservePublication, renderProposal } from "./core.mjs"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const storage = path.join(root, ".monitor")
const now = () => new Date().toISOString()
async function readJson(file, fallback) {
  try { return JSON.parse(await readFile(file, "utf8")) } catch (error) { if (error.code === "ENOENT" && fallback !== undefined) return fallback; throw error }
}
async function save(file, value) {
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(`${file}.tmp`, JSON.stringify(value, null, 2) + "\n", "utf8")
  await rename(`${file}.tmp`, file)
}
async function registry() {
  const config = await readJson(path.join(root, "monitoring/sources.json"))
  config.sources.push(...await readJson(path.join(storage, "discovered-sources.json"), []))
  const jiti = createJiti(root, { tsconfigPaths: true })
  const { schemes } = jiti("./src/data/schemes.ts")
  const audit = await readFile(path.join(root, "docs/scheme-coverage-audit-2026-09-26.md"), "utf8")
  const candidates = [...config.sources, ...schemes.map((scheme) => ({ id: `scheme-${scheme.slug}`, name: scheme.name, url: scheme.officialUrl, scope: `existing scheme ${scheme.slug}` })), ...[...audit.matchAll(/https:\/\/[^\s)\]>]+/g)].map(([url]) => ({ id: `audit-${hash(url).slice(0, 12)}`, name: "Coverage audit evidence", url, scope: "coverage audit" }))]
  const map = new Map()
  for (const source of candidates) {
    const url = canonicalUrl(source.url)
    const previous = map.get(url)
    if (previous) previous.scope += `; ${source.scope}`
    else map.set(url, { ...source, url })
  }
  return [...map.values()]
}

async function fetchSource(source, timestamp) {
  try {
    const response = await fetch(source.url, { signal: AbortSignal.timeout(15000), headers: { "User-Agent": "KisanPatraPolicyMonitor/1.0 (official public information review)", Accept: "text/html,text/plain,application/pdf" } })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    if (new URL(response.url).protocol !== "https:") throw new Error("Redirected to non-HTTPS page")
    const contentType = response.headers.get("content-type") ?? ""
    if (!/text\/html|text\/plain|application\/xhtml/i.test(contentType)) throw new Error(`Needs manual extraction: ${contentType || "unknown content type"}`)
    let body = ""
    const decoder = new TextDecoder()
    for await (const chunk of response.body) {
      body += decoder.decode(chunk, { stream: true })
      if (body.length > 8_000_000) throw new Error("Source exceeds 8 MB; use focused manual extraction")
    }
    body += decoder.decode()
    const text = normalizeText(body)
    if (text.length < 160 || /access denied|verify you are human|checking your browser|enable javascript and cookies|request rejected|service unavailable/i.test(text.slice(0, 1500))) throw new Error("Unavailable, blocked, or script-only content; needs browser verification")
    const links = extractLinks(body, response.url)
    const fingerprint = hash(text + "\n" + links.map((link) => `${link.title} ${link.url}`).join("\n"))
    const snapshot = `snapshots/${source.id}/${fingerprint}.json`
    await save(path.join(storage, snapshot), { source, finalUrl: response.url, retrievedOn: timestamp, method: "http", text, links, fingerprint })
    return { ok: true, fingerprint, snapshot, excerpt: text.slice(0, 700), finalUrl: response.url }
  } catch (error) { return { ok: false, error: error.message } }
}

async function main() {
  const [command, ...args] = process.argv.slice(2)
  if (!command || command === "help") {
    console.log("Policy monitor: registry | scan [source-id ...] | ingest evidence.json | review run-id review.json | propose proposal.json | decide approved|rejected message.txt ID@version ... | gate ID@version ... | reserve ID@version ... | published publication-key PR-URL | report\nSee docs/farmer-policy-monitor.md before recording user approval or publishing.")
    return
  }
  await mkdir(storage, { recursive: true })
  let lock
  try { lock = await open(path.join(storage, "lock"), "wx") } catch { throw new Error("Another monitor command is running. If interrupted, verify no process remains before removing .monitor/lock.") }
  try {
    await lock.writeFile(JSON.stringify({ pid: process.pid, startedOn: now() }))
    const stateFile = path.join(storage, "state.json")
    const state = await readJson(stateFile, { version: 1, sources: {}, proposals: {}, publications: {}, failuresNotified: {} })
    const sources = await registry()
    if (command === "registry") { await save(path.join(storage, "registry.json"), sources); console.log(`${sources.length} unique sources → .monitor/registry.json`); return }
    if (command === "discover") {
      const additions = await readJson(path.resolve(args[0]))
      const previous = await readJson(path.join(storage, "discovered-sources.json"), [])
      for (const source of additions) {
        canonicalUrl(source.url)
        if (!/^[a-z0-9-]+$/.test(source.id) || !source.name || !source.scope || !source.officialBasis) throw new Error("Discovery requires id, name, url, scope and officialBasis")
        if (sources.some((item) => item.id === source.id && item.url !== canonicalUrl(source.url))) throw new Error("Source ID already used")
        if (!sources.some((item) => item.id === source.id || item.url === canonicalUrl(source.url))) previous.push(source)
      }
      await save(path.join(storage, "discovered-sources.json"), previous)
      console.log("Official discoveries registered locally; no website files changed.")
    } else if (command === "notifications") {
      const proposals = Object.values(state.proposals).map((versions) => versions.at(-1)).filter((entry) => entry.status === "pending" && entry.presentedFingerprint !== entry.fingerprint)
      const failures = Object.entries(state.sources).filter(([, source]) => source.error).map(([id, source]) => ({ id, error: source.error, persistent: source.failureCount >= 3 }))
      const signature = hash(JSON.stringify(failures.sort((a, b) => a.id.localeCompare(b.id))))
      const changedFailures = signature !== state.lastFailureNotification && (failures.length > 0 || Boolean(state.lastFailureNotification))
      console.log(JSON.stringify({ notify: proposals.length > 0 || changedFailures, proposals: proposals.map((entry) => `${entry.id}@${entry.version}`), failures: changedFailures ? failures : [], recovered: changedFailures && failures.length === 0 }, null, 2))
      if (args.includes("--ack")) {
        for (const entry of proposals) entry.presentedFingerprint = entry.fingerprint
        state.lastFailureNotification = signature
        await save(stateFile, state)
      }
    } else if (command === "scan") {
      const selected = args.length ? sources.filter((source) => args.includes(source.id)) : sources
      if (!selected.length || args.some((id) => !selected.some((source) => source.id === id))) throw new Error("Unknown source ID")
      const startedOn = now()
      const id = startedOn.replace(/[:.]/g, "-")
      const results = []
      let index = 0
      await Promise.all(Array.from({ length: Math.min(6, selected.length) }, async () => {
        while (index < selected.length) {
          const source = selected[index++]
          const before = state.sources[source.id]
          const timestamp = now()
          const result = await fetchSource(source, timestamp)
          results.push({ ...source, checkedOn: timestamp, lookbackSince: lookbackSince(before, startedOn), ...result, changed: result.ok && before?.fingerprint !== result.fingerprint, baseline: !before?.fingerprint })
          state.sources[source.id] = recordFetch(before, result, timestamp)
          if (results.length % 20 === 0) console.log(`Retrieved ${results.length}/${selected.length} sources`)
        }
      }))
      results.sort((a, b) => a.id.localeCompare(b.id))
      const run = { id, startedOn, finishedOn: now(), results, limitation: "Retrieval is not semantic verification. Agent review and official discovery searches are required. No exhaustive coverage claim." }
      await save(path.join(storage, `runs/${id}.json`), run)
      await save(path.join(storage, "registry.json"), sources)
      state.latestRun = id
      await save(stateFile, state)
      const successful = results.filter((result) => result.ok)
      const report = `# Farmer policy source scan\n\nRun: ${id}\n\n${successful.length}/${results.length} sources downloaded; ${results.length - successful.length} need verification. ${successful.filter((result) => result.changed).length} baseline/changed candidates. No website content changed.\n\n${run.limitation}\n\n## Source coverage\n\n| Source | Outcome | Discovery lookback | Evidence |\n|---|---|---|---|\n${results.map((result) => `| [${result.name}](${result.url}) | ${result.ok ? (result.baseline ? "baseline; review required" : result.changed ? "changed; review required" : "unchanged download") : `needs verification: ${result.error.replace(/\|/g, "/")}`} | ${result.lookbackSince.slice(0, 10)} | ${result.snapshot ?? "No successful retrieval"} |`).join("\n")}\n\n## Approval\n\nRaw differences are not policy recommendations. Review snapshots and official announcements, then create exact bilingual versioned proposals. Existing pending/rejected proposals are in proposals.md.\n`
      await writeFile(path.join(storage, `runs/${id}.md`), report, "utf8")
      await writeFile(path.join(storage, "latest-report.md"), report, "utf8")
      console.log(`${successful.length}/${results.length} retrieved. Report: ${path.join(storage, "latest-report.md")}`)
    } else if (command === "ingest") {
      const evidence = await readJson(path.resolve(args[0]))
      const source = sources.find((item) => item.id === evidence.sourceId)
      if (!source || canonicalUrl(evidence.url) !== source.url || !evidence.method || !Number.isFinite(Date.parse(evidence.retrievedOn)) || Math.abs(Date.now() - Date.parse(evidence.retrievedOn)) > 86400000 || !evidence.text || evidence.text.length < 160) throw new Error("Supply fresh complete browser/PDF extraction, matching registry source and method")
      const text = normalizeText(evidence.text)
      const fingerprint = hash(text)
      const snapshot = `snapshots/${source.id}/${fingerprint}.json`
      await save(path.join(storage, snapshot), { ...evidence, text, fingerprint })
      state.sources[source.id] = recordFetch(state.sources[source.id], { ok: true, fingerprint, snapshot }, evidence.retrievedOn)
      await save(stateFile, state)
      console.log(JSON.stringify({ sourceId: source.id, fingerprint, snapshot }))
    } else if (command === "review") {
      const run = await readJson(path.join(storage, `runs/${args[0]}.json`))
      const review = await readJson(path.resolve(args[1]))
      if (!review.discoverySearches?.length || !review.summary?.trim() || !Array.isArray(review.checkedSources)) throw new Error("Review needs discoverySearches, summary and checkedSources")
      for (const check of review.checkedSources) {
        const source = state.sources[check.sourceId]
        if (!source || source.error || !check.notes?.trim() || source.fingerprint !== check.fingerprint || !["verified", "needs-verification"].includes(check.outcome)) throw new Error(`Invalid reviewed evidence: ${check.sourceId}`)
      }
      for (const check of review.checkedSources) if (check.outcome === "verified") state.sources[check.sourceId].lastReviewedOn = run.startedOn
      await save(path.join(storage, `reviews/${run.id}.json`), { ...review, reviewedOn: now() })
      await save(stateFile, state)
      console.log("Review recorded. Failed, conflicting and unreviewed sources retain their previous review cursors.")
    } else if (command === "propose") {
      const proposal = await readJson(path.resolve(args[0]))
      for (const evidence of proposal.sources ?? []) {
        const source = sources.find((item) => item.id === evidence.sourceId)
        if (!source || canonicalUrl(evidence.url) !== source.url || state.sources[source.id]?.error || state.sources[source.id]?.fingerprint !== evidence.fingerprint) throw new Error(`Evidence is not a current successful registry snapshot: ${evidence.sourceId}`)
      }
      const result = propose(state.proposals, proposal, now())
      await save(stateFile, state)
      console.log(`${result.entry.id}@${result.entry.version}: ${result.changed ? "new proposal; present for approval" : "unchanged; do not notify again"}`)
    } else if (command === "decide") {
      const [decision, messageFile, ...refs] = args
      decide(state.proposals, refs, decision, await readFile(path.resolve(messageFile), "utf8"), now())
      await save(stateFile, state)
      console.log(`Recorded ${decision}: ${refs.join(", ")}`)
    } else if (command === "gate" || command === "reserve") {
      const entries = approvedBundle(state.proposals, args, state.sources)
      if (command === "gate") console.log(JSON.stringify(entries, null, 2))
      else { const reservation = reservePublication(state.publications, entries, now().slice(0, 10)); await save(stateFile, state); console.log(JSON.stringify(reservation, null, 2)) }
    } else if (command === "published") {
      const [key, url] = args
      const publication = state.publications[key]
      if (!publication || !/^https:\/\/github.com\/sahilchauhang\/kisan-patra\/pull\/\d+$/.test(url)) throw new Error("Expected reserved publication and repository PR URL")
      if (publication.prUrl && publication.prUrl !== url) throw new Error("Already linked to a different PR")
      publication.prUrl = url
      publication.status = "published"
      for (const ref of publication.refs) { const [id, version] = ref.split("@"); state.proposals[id].find((entry) => String(entry.version) === version).status = "published" }
      await save(stateFile, state)
      console.log(`Recorded ${url}; retain the final merge decision for the user.`)
    } else if (command !== "report") throw new Error(`Unknown command: ${command}`)
    const latest = Object.values(state.proposals).map((versions) => versions.at(-1))
    await writeFile(path.join(storage, "proposals.md"), `# Farmer policy proposals\n\nApprove selected ID@version references, reject them, or request revisions. Approval covers only the exact text, edits and evidence in that version.\n\n${latest.length ? latest.map(renderProposal).join("\n") : "No verified policy-change proposals recorded yet. This does not mean no government changes occurred.\n"}`, "utf8")
  } finally { await lock.close(); await unlink(path.join(storage, "lock")) }
}

main().catch((error) => { console.error(error.message); process.exitCode = 1 })
