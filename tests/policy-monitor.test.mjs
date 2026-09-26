import { test } from "node:test"
import assert from "node:assert/strict"
import { createJiti } from "jiti"
import { hash, normalizeText, canonicalUrl, lookbackSince, recordFetch, propose, decide, approvedBundle, applyExactEdits, reservePublication } from "../scripts/monitor/core.mjs"

const jiti = createJiti(process.cwd(), { tsconfigPaths: true })
const { schemes } = jiti("./src/data/schemes.ts")
const { farmerNotices } = jiti("./src/data/notices.ts")
const { isDiscoverable, currentNotices, indiaDay } = jiti("./src/lib/policy.ts")
const { schemeStatus } = jiti("./src/lib/scheme-status.ts")
const { matchSchemes, getScheme } = jiti("./src/lib/schemes.ts")
const timestamp = "2026-09-26T12:00:00.000Z"
const fingerprint = hash("Official benefits: 6000")
const fixture = (overrides = {}) => ({ eventKey: "pm-kisan/benefits/2026", subject: "Benefit amendment", action: "amend", affectedFarmers: "Eligible landholders", uncertainty: "none", existing: { en: "6000", hi: "6000 रुपये" }, replacement: { en: "7000", hi: "7000 रुपये" }, pages: ["/schemes/pm-kisan"], sources: [{ sourceId: "pib", url: "https://www.pib.gov.in/", fingerprint, excerpt: "New annual benefit", officialBasis: "Ministry official order", retrievedOn: timestamp, publicationDate: "2026-09-26", effectiveDate: "2026-10-01" }], edits: [{ file: "src/data/schemes.ts", before: "6000", after: "7000" }], ...overrides })

test("formatting and tracking noise normalize without discarding policy numbers", () => {
  assert.equal(normalizeText('<header>10:00</header><p>Grant <b>6000</b> &amp; seed</p>'), normalizeText('<p class="new">Grant 6000 &amp; seed</p><footer>New</footer>'))
  assert.notEqual(normalizeText("Grant 6000"), normalizeText("Grant 7000"))
  assert.equal(canonicalUrl("https://www.pib.gov.in/?id=12&utm_source=x#top"), "https://www.pib.gov.in/?id=12")
})

test("failed checks and unreviewed downloads never erase missed coverage", () => {
  const old = { lastReviewedOn: "2026-08-01T00:00:00.000Z", lastFetchedOn: "2026-08-01T00:00:00.000Z", fingerprint }
  const failed = recordFetch(old, { ok: false, error: "404" }, timestamp)
  assert.equal(failed.lastReviewedOn, old.lastReviewedOn)
  assert.equal(failed.lastFetchedOn, old.lastFetchedOn)
  assert.equal(lookbackSince(failed, timestamp), "2026-07-25T00:00:00.000Z")
  assert.equal(recordFetch(failed, { ok: true, fingerprint }, timestamp).lastReviewedOn, old.lastReviewedOn)
  assert.equal(lookbackSince(undefined, timestamp), "2026-08-27T12:00:00.000Z")
  const neverReviewed = recordFetch({}, { ok: false, error: "timeout" }, timestamp)
  assert.equal(lookbackSince(neverReviewed, "2026-12-01T00:00:00.000Z"), "2026-08-27T12:00:00.000Z")
})

test("benefit amendments and new schemes produce versioned bilingual proposals", () => {
  const ledger = {}
  const first = propose(ledger, fixture(), timestamp).entry
  assert.equal(first.version, 1)
  assert.equal(propose(ledger, fixture({ replacement: { en: "8000", hi: "8000 रुपये" } }), timestamp).entry.version, 2)
  assert.notEqual(propose(ledger, fixture({ eventKey: "new-programme/2026", action: "add", existing: { en: "", hi: "" } }), timestamp).entry.id, first.id)
  assert.throws(() => propose({}, fixture({ replacement: { en: "8000" } }), timestamp), /hi/)
})

test("unchanged pending/rejected findings and retrieval dates do not duplicate proposals", () => {
  const ledger = {}
  const entry = propose(ledger, fixture(), timestamp).entry
  assert.equal(propose(ledger, fixture(), timestamp).changed, false)
  decide(ledger, [`${entry.id}@1`], "rejected", "Reject this proposal", timestamp)
  const again = fixture(); again.sources[0].retrievedOn = "2026-10-03T12:00:00.000Z"
  assert.equal(propose(ledger, again, timestamp).changed, false)
  assert.equal(ledger[entry.id].length, 1)
})

test("selective approval excludes pending items and stale versions/evidence", () => {
  const ledger = {}
  const a = propose(ledger, fixture(), timestamp).entry
  const b = propose(ledger, fixture({ eventKey: "other/2026" }), timestamp).entry
  decide(ledger, [`${a.id}@1`], "approved", "Approve this version only", timestamp)
  const sources = { pib: { fingerprint, lastFetchedOn: "2026-09-26T13:00:00.000Z" } }
  assert.equal(approvedBundle(ledger, [`${a.id}@1`], sources).length, 1)
  assert.throws(() => approvedBundle(ledger, [`${b.id}@1`], sources), /Not approved/)
  assert.throws(() => approvedBundle(ledger, [`${a.id}@1`], { pib: { ...sources.pib, error: "timeout" } }), /Refresh/)
  assert.throws(() => approvedBundle(ledger, [`${a.id}@1`], { pib: { ...sources.pib, fingerprint: hash("changed") } }), /Refresh/)
  propose(ledger, fixture({ deadline: "2026-10-31" }), timestamp)
  assert.throws(() => approvedBundle(ledger, [`${a.id}@1`], sources), /superseded/)
})

test("conflicting evidence cannot be approved; archive requires an explicit order", () => {
  const ledger = {}
  const entry = propose(ledger, fixture({ uncertainty: "Official notices conflict" }), timestamp).entry
  assert.throws(() => decide(ledger, [`${entry.id}@1`], "approved", "approve", timestamp), /uncertainty/)
  assert.throws(() => propose({}, fixture({ action: "archive" }), timestamp), /retirement/)
  assert.equal(propose({}, fixture({ action: "archive", retirementEvidence: "Order explicitly discontinues this programme" }), timestamp).changed, true)
})

test("extensions revise proposals; seasonal closure does not retire schemes", () => {
  const ledger = {}
  const a = propose(ledger, fixture({ action: "extend", deadline: "2026-10-01" }), timestamp).entry
  assert.equal(propose(ledger, fixture({ action: "extend", deadline: "2026-10-15" }), timestamp).entry.version, a.version + 1)
  const scheme = { ...schemes[0], lifecycle: { status: "unknown" }, applicationWindow: { status: "announced", closesOn: "2026-09-26" } }
  assert.equal(isDiscoverable(scheme), true)
  assert.match(schemeStatus(scheme, "en", new Date("2026-09-26T18:31:00Z")).label, /closed/)
  assert.doesNotMatch(schemeStatus(scheme, "en", new Date("2026-09-26T18:29:00Z")).label, /closed/)
})

test("retired schemes keep URLs and leave active finder results", () => {
  const scheme = getScheme("pm-kisan")
  const saved = scheme.lifecycle
  try {
    scheme.lifecycle = { status: "retired" }
    assert.equal(getScheme(scheme.slug), scheme)
    assert.equal(isDiscoverable(scheme), false)
    assert.equal(matchSchemes({ state: "haryana", land: "owner", holding: "small", age: "18-40", womanOrShg: false, activities: ["crops"] }).some((item) => item.scheme.slug === scheme.slug), false)
  } finally { scheme.lifecycle = saved }
})

test("expired notices leave homepage selection but remain in the archive", () => {
  const notices = [{ id: "expired", publishedOn: "2026-09-01", deadline: "2026-09-25", previewUntil: "2026-10-01" }, { id: "current", publishedOn: "2026-09-01", deadline: "2026-09-26", previewUntil: "2026-10-01" }]
  assert.equal(indiaDay(new Date(timestamp)), "2026-09-26")
  assert.deepEqual(currentNotices(notices, new Date(timestamp)).map((notice) => notice.id), ["current"])
  assert.equal(notices.length, 2)
})

test("exact edits fail on changed bases; publication reservations are idempotent", () => {
  const edit = fixture().edits[0]
  assert.deepEqual(applyExactEdits({ [edit.file]: "6000" }, [edit]), { [edit.file]: "7000" })
  assert.throws(() => applyExactEdits({ [edit.file]: "6000 6000" }, [edit]), /ambiguous/)
  assert.throws(() => applyExactEdits({ [edit.file]: "5000" }, [edit]), /Base changed/)
  const publications = {}, entries = [{ id: "FP-example", version: 1 }]
  const first = reservePublication(publications, entries, "2026-09-26")
  first.prUrl = "https://github.com/sahilchauhang/kisan-patra/pull/1"
  assert.equal(reservePublication(publications, entries, "2026-10-03"), first)
  assert.throws(() => reservePublication(publications, [...entries, { id: "FP-other", version: 1 }], "2026-10-03"), /overlaps/)
})

test("structured catalogue evidence, lifecycle and notices remain coherent", () => {
  const ids = new Set()
  const verifyEvidence = (source) => {
    assert.match(source.url, /^https:\/\//)
    assert.ok(source.title.en.trim() && source.title.hi.trim() && source.excerpt.trim())
    assert.match(source.retrievedOn, /^\d{4}-\d{2}-\d{2}$/)
  }
  for (const scheme of schemes) {
    assert.ok(scheme.lifecycle?.status && scheme.applicationWindow?.status)
    for (const source of scheme.evidence ?? []) verifyEvidence(source)
    if (!isDiscoverable(scheme)) { assert.ok(scheme.lifecycle.evidence); verifyEvidence(scheme.lifecycle.evidence) }
    if (scheme.lifecycle.successorSlug) assert.ok(schemes.some((item) => item.slug === scheme.lifecycle.successorSlug))
    const window = scheme.applicationWindow
    if (window.opensOn && window.closesOn) assert.ok(window.opensOn <= window.closesOn)
  }
  for (const notice of farmerNotices) {
    assert.equal(ids.has(notice.id), false); ids.add(notice.id)
    for (const key of ["title", "body", "action", "audience"]) assert.ok(notice[key].en.trim() && notice[key].hi.trim())
    assert.ok(notice.evidence.length && notice.approval.proposalId && notice.approval.version > 0)
    assert.ok(notice.previewUntil >= notice.publishedOn)
    for (const source of notice.evidence) verifyEvidence(source)
    for (const slug of notice.schemeSlugs) assert.ok(schemes.some((item) => item.slug === slug))
  }
})
