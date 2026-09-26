// Run from the original task checkout; target is a managed, isolated checkout.
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { execFileSync } from "node:child_process"
import { approvedBundle, applyExactEdits, digest, renderProposal } from "./core.mjs"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const storage = path.join(root, ".monitor")
const [mode, key, checkoutArg, receiptArg] = process.argv.slice(2)
if (!["prepare", "publish"].includes(mode) || !key || !checkoutArg) throw new Error("Usage: node scripts/monitor/publish.mjs prepare|publish PUBLICATION_KEY CHECKOUT [BROWSER_RECEIPT.json]")
const checkout = fs.realpathSync(checkoutArg)
if (checkout.toLowerCase() === fs.realpathSync(root).toLowerCase()) throw new Error("Use an isolated managed checkout, never the working project")
const lock = path.join(storage, "lock")
const fd = fs.openSync(lock, "wx")
const read = (file) => JSON.parse(fs.readFileSync(file, "utf8"))
const save = (file, value) => { fs.writeFileSync(`${file}.tmp`, JSON.stringify(value, null, 2) + "\n"); fs.renameSync(`${file}.tmp`, file) }
const git = (...args) => execFileSync("git", ["-c", `safe.directory=${checkout.replaceAll("\\", "/")}`, ...args], { cwd: checkout, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim()
const gh = (...args) => execFileSync("gh", args, { cwd: checkout, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim()
const repo = "sahilchauhang/kisan-patra"
try {
  const stateFile = path.join(storage, "state.json")
  const state = read(stateFile)
  const publication = state.publications[key]
  if (!publication) throw new Error("Reserve the approved selection first")
  if (publication.prUrl) { console.log(`Already published: ${publication.prUrl}`); process.exitCode = 0 }
  else {
    const entries = approvedBundle(state.proposals, publication.refs, state.sources)
    for (const entry of entries) for (const evidence of entry.proposal.sources) {
      if (Date.now() - Date.parse(state.sources[evidence.sourceId].lastFetchedOn) > 86400000) throw new Error("Evidence refresh must be within 24 hours of publication")
    }
    if (!/^(https:\/\/github\.com\/sahilchauhang\/kisan-patra(?:\.git)?|git@github\.com:sahilchauhang\/kisan-patra\.git)$/.test(git("remote", "get-url", "origin"))) throw new Error("Unexpected GitHub repository")
    const prs = JSON.parse(gh("pr", "list", "--repo", repo, "--head", publication.branch, "--state", "all", "--json", "url,state", "--limit", "100"))
    if (prs.length) {
      publication.prUrl = prs[0].url; publication.status = "published"
      for (const entry of entries) entry.status = "published"
      save(stateFile, state)
      console.log(`Existing PR recovered; do not create another: ${prs[0].url}`)
    } else {
      git("fetch", "origin")
      const defaultRef = git("symbolic-ref", "refs/remotes/origin/HEAD")
      if (!defaultRef.startsWith("refs/remotes/origin/")) throw new Error("Cannot identify the remote default branch")
      const baseBranch = defaultRef.slice("refs/remotes/origin/".length)
      const base = git("rev-parse", defaultRef)
      const edits = entries.flatMap((entry) => entry.proposal.edits)
      const files = [...new Set(edits.map((edit) => edit.file))].sort()
      const before = {}
      for (const file of files) {
        // Refuse symlinks: content edits must remain inside this checkout.
        const resolved = path.resolve(checkout, file)
        if (!resolved.startsWith(checkout + path.sep)) throw new Error("Invalid edit path")
        for (let current = resolved; current !== checkout; current = path.dirname(current)) if (fs.existsSync(current) && fs.lstatSync(current).isSymbolicLink()) throw new Error("Symlink edit path")
        try { before[file] = execFileSync("git", ["-c", `safe.directory=${checkout.replaceAll("\\", "/")}`, "show", `${base}:${file}`], { cwd: checkout, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }) } catch { before[file] = undefined }
      }
      const expected = applyExactEdits(before, edits)
      const contentHash = digest(expected)
      if (mode === "prepare") {
        if (git("status", "--porcelain")) throw new Error("Isolated checkout must be clean")
        if (git("rev-parse", "HEAD") !== base) throw new Error("Create/reuse a clean checkout from the current remote default branch")
        if (!fs.existsSync(path.join(checkout, "src/data/notices.ts"))) throw new Error("Merge the monitor/updates infrastructure first; it must not be bundled with unrelated local work")
        git("switch", "-c", publication.branch)
        for (const [file, content] of Object.entries(expected)) { fs.mkdirSync(path.dirname(path.join(checkout, file)), { recursive: true }); fs.writeFileSync(path.join(checkout, file), content, "utf8") }
        publication.base = base; publication.baseBranch = baseBranch; publication.contentHash = contentHash; publication.checkout = checkout
        save(stateFile, state)
        console.log(JSON.stringify({ branch: publication.branch, base, contentHash, files, next: "Install dependencies, start this checkout, check affected pages in both languages and at desktop/mobile widths. Record a browser receipt. Then run publish." }, null, 2))
      } else {
        if (publication.base !== base || publication.contentHash !== contentHash) throw new Error("Remote base or approved result changed. Prepare again from the current base; revise approval if a content replacement fails.")
        if (git("branch", "--show-current") !== publication.branch) throw new Error("Wrong review branch")
        for (const file of files) if (fs.readFileSync(path.join(checkout, file), "utf8") !== expected[file]) throw new Error(`Unapproved file contents: ${file}`)
        const changed = [...new Set([...git("diff", "--name-only", base).split("\n"), ...git("ls-files", "--others", "--exclude-standard").split("\n")].filter(Boolean))].sort()
        if (JSON.stringify(changed) !== JSON.stringify(files)) throw new Error("Unexpected files in checkout/diff; do not include unrelated work")
        const receipt = read(path.resolve(receiptArg ?? ""))
        const pages = [...new Set(entries.flatMap((entry) => entry.proposal.pages))]
        if (receipt.contentHash !== contentHash || receipt.base !== base || !receipt.passed || !receipt.notes?.trim() || !Number.isFinite(Date.parse(receipt.checkedOn)) || Math.abs(Date.now() - Date.parse(receipt.checkedOn)) > 86400000 || !pages.every((page) => receipt.pages?.includes(page)) || !["en", "hi"].every((lang) => receipt.languages?.includes(lang)) || !["mobile", "desktop"].every((width) => receipt.viewports?.includes(width))) throw new Error("Fresh passing browser receipt for this content/base, all affected pages, both languages and mobile/desktop required")
        for (const command of ["npm.cmd test", "npm.cmd run lint", "npm.cmd run typecheck", "npm.cmd run build"]) {
          console.log(`Validation: ${command}`)
          if (process.platform === "win32") execFileSync(process.env.ComSpec ?? "cmd.exe", ["/d", "/s", "/c", command], { cwd: checkout, stdio: "inherit" })
          else { const [bin, ...args] = command.replaceAll(".cmd", "").split(" "); execFileSync(bin, args, { cwd: checkout, stdio: "inherit" }) }
        }
        // Recheck files and approval after checks; tests/build must not add changes.
        for (const file of files) if (fs.readFileSync(path.join(checkout, file), "utf8") !== expected[file]) throw new Error("Validation changed approved content")
        git("diff", "--check")
        git("add", "--", ...files)
        if (git("diff", "--cached", "--name-only")) git("commit", "-m", `Apply approved farmer updates ${publication.refs.join(", ")}`)
        if (git("status", "--porcelain")) throw new Error("Unexpected work remains after commit")
        const bodyFile = path.join(storage, `pr-${key}.md`)
        fs.writeFileSync(bodyFile, `## Approved farmer policy updates\n\nApproval: ${publication.refs.join(", ")}\n\nBase: ${base}\n\nValidation: catalogue/bilingual/monitor tests, lint, TypeScript, production build and browser checks passed.\n\n${entries.map(renderProposal).join("\n")}\n\nThe owner retains the final merge decision.\n`)
        git("push", "--set-upstream", "origin", publication.branch)
        const url = gh("pr", "create", "--repo", repo, "--base", baseBranch, "--head", publication.branch, "--title", `Farmer policy updates: ${publication.refs.join(", ")}`, "--body-file", bodyFile)
        if (!/^https:\/\/github.com\/sahilchauhang\/kisan-patra\/pull\/\d+$/.test(url)) throw new Error("Unexpected PR output; inspect remote before retrying")
        publication.prUrl = url; publication.status = "published"
        for (const entry of entries) entry.status = "published"
        save(stateFile, state)
        console.log(`PR created: ${url}\nAttach this PR to the Codex task with attach_artifact. Do not merge.`)
      }
    }
  }
} finally { fs.closeSync(fd); fs.unlinkSync(lock) }
