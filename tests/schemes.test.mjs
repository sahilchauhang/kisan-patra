import { test } from "node:test"
import assert from "node:assert/strict"
import { createJiti } from "jiti"

const jiti = createJiti(process.cwd(), { tsconfigPaths: true })
const { ageBandRelation, ageReasonCode, filterSchemes, matchSchemes } = jiti("./src/lib/schemes.ts")

function answers(overrides = {}) {
  return {
    state: "haryana",
    land: "owner",
    holding: "small",
    age: "18-40",
    womanOrShg: false,
    activities: [],
    ...overrides,
  }
}

function slugs(input) {
  return new Set(matchSchemes(input).map(({ scheme }) => scheme.slug))
}

test("owner-only schemes exclude tenants while cultivator schemes allow them", () => {
  const tenantMatches = slugs(answers({ land: "tenant" }))

  assert.equal(tenantMatches.has("pm-kisan"), false)
  assert.equal(tenantMatches.has("pm-kmy"), false)
  assert.equal(tenantMatches.has("pmfby"), true)
})

test("state schemes require a known matching state", () => {
  const cropAnswers = { activities: ["crops"] }
  assert.equal(slugs(answers({ ...cropAnswers, state: "haryana" })).has("mpmv"), true)
  assert.equal(slugs(answers({ ...cropAnswers, state: "punjab" })).has("mpmv"), false)
  assert.equal(slugs(answers({ ...cropAnswers, state: "unsure" })).has("mpmv"), false)
})

test("PM-KMY matches the full 18 to 40 entry band and excludes adjacent bands", () => {
  for (const age of ["under-18", "41-59", "60-plus"]) {
    assert.equal(slugs(answers({ age })).has("pm-kmy"), false, age)
  }
  assert.equal(slugs(answers({ age: "18-40" })).has("pm-kmy"), true)
})

test("activity selections filter specific schemes and retain relevant matches", () => {
  const fish = slugs(answers({ activities: ["fisheries"] }))
  const crops = slugs(answers({ activities: ["crops"] }))

  assert.equal(fish.has("pmmsy"), true)
  assert.equal(crops.has("pmmsy"), false)
  assert.equal(crops.has("pm-kisan"), true)
})

test("broad age bands distinguish outside, partial, and fully covered age ranges", () => {
  assert.equal(ageBandRelation("18-40", 45, 55), "outside")
  assert.equal(ageBandRelation("18-40", 25, 35), "partial")
  assert.equal(ageBandRelation("18-40", 18, 40), "inside")
  assert.equal(ageBandRelation("41-59", 45, 55), "partial")
  assert.equal(ageBandRelation("under-18", 0, 17), "inside")
  assert.equal(ageBandRelation("60-plus", 60, 70), "partial")
})

test("partial age overlap remains a possible match with a visible uncertainty reason", () => {
  const relation = ageBandRelation("18-40", 25, 35)
  assert.equal(relation, "partial")
  assert.equal(ageReasonCode(relation), "ageUncertain")
  assert.equal(ageReasonCode(ageBandRelation("18-40", 18, 40)), "age")
  assert.equal(ageReasonCode(ageBandRelation("18-40", 45, 55)), undefined)

  const match = matchSchemes(answers({ age: "18-40" })).find(({ scheme }) => scheme.slug === "pm-kmy")
  assert.ok(match)
  assert.ok(match.reasons.some(({ code }) => code === "age"))
})

test("new Haryana listings appear only in the Haryana register", () => {
  const haryana = filterSchemes({ place: "haryana", q: "MBBY", lang: "en" })
  const centre = filterSchemes({ place: "centre", q: "MBBY", lang: "en" })
  assert.ok(haryana.some((scheme) => scheme.slug === "haryana-mbby"))
  assert.equal(centre.some((scheme) => scheme.slug === "haryana-mbby"), false)
})

test("women-farmer MKSP route requires a women or SHG answer", () => {
  const farm = { activities: ["crops"] }
  assert.equal(slugs(answers({ ...farm, womanOrShg: false })).has("mksp-day-nrlm"), false)
  assert.equal(slugs(answers({ ...farm, womanOrShg: true })).has("mksp-day-nrlm"), true)
})
