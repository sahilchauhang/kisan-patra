import { test } from "node:test"
import assert from "node:assert/strict"
import { createJiti } from "jiti"

const jiti = createJiti(process.cwd(), { tsconfigPaths: true })
const { filterSchemes } = jiti("./src/lib/schemes.ts")
const { schemes } = jiti("./src/data/schemes.ts")

test("the default catalogue includes every scheme, including Haryana entries", () => {
  assert.equal(filterSchemes({}).length, schemes.length)
  assert.equal(filterSchemes({}).length, 79)
  assert.ok(filterSchemes({ q: "MBBY" }).some((scheme) => scheme.slug === "haryana-mbby"))
})

test("scope filters distinguish all, central, and Haryana schemes", () => {
  const all = filterSchemes({ place: "all" })
  const central = filterSchemes({ place: "centre" })
  const haryana = filterSchemes({ place: "haryana" })

  assert.equal(all.length, central.length + haryana.length)
  assert.ok(haryana.some((scheme) => scheme.slug === "haryana-mbby"))
  assert.equal(central.some((scheme) => scheme.slug === "haryana-mbby"), false)
  assert.ok(central.length > 0)
})
