import { createHash } from "node:crypto"

export const hash = (value) => createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex")
const stable = (value) => Array.isArray(value) ? value.map(stable) : value && typeof value === "object" ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])])) : value
export const digest = (value) => hash(stable(value))

export function normalizeText(html) {
  return html.replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style|noscript|nav|footer|header)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, " ")
    .replace(/<\/?(?:p|div|br|li|tr|h[1-6]|section|article|td|th)\b[^>]*>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&#(x[0-9a-f]+|\d+);/gi, (_, code) => { const n = code[0].toLowerCase() === "x" ? parseInt(code.slice(1), 16) : Number(code); return n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : " " })
    .replace(/&(amp|nbsp|quot|apos|lt|gt);/gi, (_, key) => ({ amp: "&", nbsp: " ", quot: '"', apos: "'", lt: "<", gt: ">" })[key.toLowerCase()])
    .normalize("NFKC").replace(/\s+/g, " ").trim()
}

export function canonicalUrl(value) {
  const url = new URL(value)
  if (url.protocol !== "https:") throw new Error("HTTPS source required")
  url.hash = ""
  for (const key of [...url.searchParams.keys()]) if (/^utm_|^(fbclid|gclid)$/i.test(key)) url.searchParams.delete(key)
  url.searchParams.sort()
  return url.href
}

export function extractLinks(html, base) {
  const links = []
  for (const match of html.matchAll(/<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    try { links.push({ url: canonicalUrl(new URL(match[1].replace(/&amp;/g, "&"), base).href), title: normalizeText(match[2]) }) } catch { /* Non-HTTPS and invalid links are not evidence. */ }
  }
  return [...new Map(links.map((link) => [link.url, link])).values()].sort((a, b) => a.url.localeCompare(b.url))
}

export function lookbackSince(previous, now) {
  // An unreviewed successful download must not erase the discovery backlog.
  const anchor = previous?.lastReviewedOn
  return new Date(anchor ? Date.parse(anchor) - 7 * 86400000 : Date.parse(previous?.firstAttemptOn ?? now) - 30 * 86400000).toISOString()
}

export function recordFetch(previous = {}, result, now) {
  previous = { firstAttemptOn: previous.firstAttemptOn ?? now, ...previous }
  if (!result.ok) return { ...previous, lastAttemptOn: now, error: result.error, failureCount: (previous.failureCount ?? 0) + 1 }
  return { ...previous, lastAttemptOn: now, lastFetchedOn: now, fingerprint: result.fingerprint, snapshot: result.snapshot, error: null, failureCount: 0 }
}

export function validateProposal(proposal) {
  for (const key of ["eventKey", "subject", "action", "affectedFarmers", "uncertainty"]) if (typeof proposal[key] !== "string" || !proposal[key].trim()) throw new Error(`Missing ${key}`)
  if (!["add", "amend", "extend", "close-window", "archive", "investigate"].includes(proposal.action)) throw new Error("Invalid proposal action")
  for (const lang of ["en", "hi"]) {
    if (typeof proposal.existing?.[lang] !== "string" || !proposal.replacement?.[lang]?.trim()) throw new Error(`Exact existing/replacement ${lang} required`)
  }
  if (!proposal.pages?.length || !proposal.sources?.length) throw new Error("Pages and official evidence required")
  for (const source of proposal.sources) {
    canonicalUrl(source.url)
    for (const key of ["sourceId", "fingerprint", "excerpt", "retrievedOn", "publicationDate", "effectiveDate", "officialBasis"]) if (!source[key]) throw new Error(`Evidence missing ${key}; use 'unknown' for unknown dates`)
    if (!/^[a-f0-9]{64}$/.test(source.fingerprint)) throw new Error("Invalid evidence fingerprint")
  }
  if (proposal.action === "archive" && !proposal.retirementEvidence?.trim()) throw new Error("Explicit retirement/replacement order excerpt required")
  if (!Array.isArray(proposal.edits) || (proposal.action !== "investigate" && !proposal.edits.length)) throw new Error("Exact file edits required")
  for (const edit of proposal.edits) {
    if (!/^src\/data\/[a-zA-Z0-9/_-]+\.(ts|json)$/.test(edit.file) || edit.file.includes("..")) throw new Error("Content edits must stay in src/data")
    if (typeof edit.before !== "string" || typeof edit.after !== "string" || edit.before === edit.after) throw new Error("Each edit needs different exact before/after text")
  }
}

function materialProposal(proposal) {
  // Retrieval dates alone and reordering the JSON cannot create new proposals.
  return { ...proposal, sources: proposal.sources.map((source) => Object.fromEntries(Object.entries(source).filter(([key]) => key !== "retrievedOn"))).sort((a, b) => a.sourceId.localeCompare(b.sourceId)) }
}

export function propose(ledger, proposal, now) {
  validateProposal(proposal)
  const id = `FP-${hash(proposal.eventKey).slice(0, 10)}`
  const versions = ledger[id] ?? []
  const fingerprint = digest(materialProposal(proposal))
  const latest = versions.at(-1)
  if (latest?.fingerprint === fingerprint) return { entry: latest, changed: false }
  const entry = { id, version: versions.length + 1, fingerprint, status: "pending", createdOn: now, proposal }
  ledger[id] = [...versions, entry]
  return { entry, changed: true }
}

export function resolveRefs(ledger, refs) {
  if (!refs.length) throw new Error("Supply explicit ID@version references")
  if (new Set(refs).size !== refs.length) throw new Error("Duplicate references")
  return refs.map((ref) => {
    const [id, version] = ref.split("@")
    const entry = ledger[id]?.at(-1)
    if (!entry || String(entry.version) !== version) throw new Error(`Missing or superseded approval: ${ref}`)
    return entry
  })
}

export function decide(ledger, refs, decision, userMessage, now) {
  if (!["approved", "rejected"].includes(decision) || !userMessage?.trim()) throw new Error("Decision and exact user authorization message required")
  const entries = resolveRefs(ledger, refs)
  for (const entry of entries) {
    if (entry.status === "published") throw new Error("Already published")
    if (decision === "approved" && (entry.proposal.action === "investigate" || entry.proposal.uncertainty !== "none")) throw new Error("Resolve uncertainty before approval")
  }
  for (const entry of entries) { entry.status = decision; entry.decision = { userMessage, at: now, fingerprint: entry.fingerprint }; entry.decisions = [...(entry.decisions ?? []), { status: decision, ...entry.decision }] }
}

export function approvedBundle(ledger, refs, sources) {
  const entries = resolveRefs(ledger, refs)
  for (const entry of entries) {
    if (entry.status !== "approved" || entry.decision?.fingerprint !== entry.fingerprint || digest(materialProposal(entry.proposal)) !== entry.fingerprint) throw new Error(`Not approved: ${entry.id}@${entry.version}`)
    for (const evidence of entry.proposal.sources) {
      const source = sources[evidence.sourceId]
      if (!source || source.error || source.fingerprint !== evidence.fingerprint || !Number.isFinite(Date.parse(source.lastFetchedOn)) || source.lastFetchedOn < entry.decision.at) throw new Error(`Refresh evidence or revise approval: ${evidence.sourceId}`)
    }
  }
  return entries
}

export function applyExactEdits(contents, edits) {
  const result = { ...contents }
  for (const edit of edits) {
    const content = result[edit.file]
    if (edit.before === "") {
      if (content !== undefined) throw new Error(`New file already exists: ${edit.file}`)
      result[edit.file] = edit.after
    } else {
      if (typeof content !== "string" || content.split(edit.before).length !== 2) throw new Error(`Base changed or ambiguous replacement: ${edit.file}`)
      result[edit.file] = content.replace(edit.before, () => edit.after)
    }
  }
  return result
}

export function reservePublication(publications, entries, date) {
  const refs = entries.map((entry) => `${entry.id}@${entry.version}`).sort()
  const key = digest(refs)
  // Any intersecting reservation must be resumed, never create a second branch for the same approval.
  const existing = Object.values(publications).find((item) => item.refs.some((ref) => refs.includes(ref)))
  if (existing) {
    if (JSON.stringify(existing.refs) !== JSON.stringify(refs)) throw new Error("Selection overlaps an existing publication; resume it first")
    return existing
  }
  const publication = { key, refs, branch: `codex/farmer-updates-${date}-${entries[0].id.toLowerCase()}-v${entries[0].version}-${key.slice(0, 6)}`, status: "reserved" }
  publications[key] = publication
  return publication
}

export function renderProposal(entry) {
  const p = entry.proposal
  return `## ${entry.id}@${entry.version}: ${p.subject}\n\nStatus: ${entry.status} · Action: ${p.action}\n\nAffected farmers: ${p.affectedFarmers}\n\nPages: ${p.pages.join(", ")}\n\nDeadline: ${p.deadline ?? "none confirmed"}\n\nUncertainty: ${p.uncertainty}\n\n### English\n\nExisting:\n\n${p.existing.en || "(new entry)"}\n\nProposed:\n\n${p.replacement.en}\n\n### Hindi\n\nExisting:\n\n${p.existing.hi || "(नई प्रविष्टि)"}\n\nProposed:\n\n${p.replacement.hi}\n\n### Official evidence\n\n${p.sources.map((s) => `- [${s.sourceId}](${s.url}) · published ${s.publicationDate}; effective ${s.effectiveDate}; retrieved ${s.retrievedOn}\n  Evidence: ${s.excerpt}`).join("\n")}\n`
}
