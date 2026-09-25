import { test } from "node:test"
import assert from "node:assert/strict"
import { createJiti } from "jiti"

const jiti = createJiti(process.cwd(), { tsconfigPaths: true })
const { schemes } = jiti("./src/data/schemes.ts")
const { schemeHi } = jiti("./src/data/scheme-hi.ts")

test("scheme slugs and Hindi bodies stay in sync", () => {
  const slugs = schemes.map((scheme) => scheme.slug)
  assert.equal(new Set(slugs).size, slugs.length, "duplicate scheme slug")
  assert.deepEqual(Object.keys(schemeHi).sort(), [...slugs].sort())

  for (const scheme of schemes) {
    const hindi = schemeHi[scheme.slug]
    assert.ok(hindi, `${scheme.slug}: missing Hindi body`)
    for (const key of ["summary", "highlight"]) {
      assert.ok(hindi[key]?.trim(), `${scheme.slug}: missing Hindi ${key}`)
    }
    for (const key of ["whatYouGet", "whoCanApply", "documents", "howToApply", "watchouts"]) {
      assert.equal(
        Boolean(hindi[key]?.length),
        Boolean(scheme[key]?.length),
        `${scheme.slug}: English/Hindi ${key} presence differs`,
      )
    }
  }
})

test("state entries and source links are suitable for the register", () => {
  for (const scheme of schemes) {
    assert.match(scheme.officialUrl, /^https:\/\//, `${scheme.slug}: official URL`)
    assert.match(scheme.editorialUpdatedOn, /^\d{4}-\d{2}-\d{2}$/, `${scheme.slug}: edit date`)
    if (scheme.jurisdiction === "state") {
      assert.equal(scheme.list, "state", `${scheme.slug}: state list`)
      assert.ok(scheme.onlyStates?.includes("haryana"), `${scheme.slug}: state filter`)
    }
  }
})
