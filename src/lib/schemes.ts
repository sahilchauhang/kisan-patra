import { categoryLabel } from "@/data/categories"
import { schemeHi } from "@/data/scheme-hi"
import { schemes } from "@/data/schemes"
import { schemeSearchText } from "@/lib/localize"
import type { Lang } from "@/lib/language"
import type {
  AgeAnswer,
  FinderAnswers,
  LandAnswer,
  Scheme,
} from "@/lib/types"

export type ReasonCode =
  | "overlap"
  | "coreGeneral"
  | "core"
  | "owner"
  | "cultivator"
  | "unsureLand"
  | "small"
  | "age"
  | "ageUncertain"
  | "shg"
  | "group"
  | "startup"
  | "throughState"
  | "open"
  | "state"

export type MatchReason = { code: ReasonCode; stateId?: string }

export function getScheme(slug: string) {
  return schemes.find((scheme) => scheme.slug === slug)
}

export function relatedSchemes(scheme: Scheme, count = 3) {
  const pool = schemes.filter((item) => {
    if (item.slug === scheme.slug) return false
    if (scheme.jurisdiction === "state") return item.jurisdiction === "state"
    return item.jurisdiction !== "state"
  })
  const sameCategory = pool.filter((item) => item.category === scheme.category)
  const rest = scheme.jurisdiction === "state" ? pool.filter((item) => item.category !== scheme.category) : []
  return [...sameCategory, ...rest].slice(0, count)
}

export function filterSchemes(input: {
  q?: string
  category?: string
  place?: string
  lang?: Lang
}) {
  const query = input.q?.trim().toLowerCase() ?? ""
  const words = query.split(/\s+/).filter(Boolean)
  const place = input.place === "haryana" || input.place === "centre" ? input.place : "all"

  return schemes.filter((scheme) => {
    const isState = scheme.jurisdiction === "state"
    if (place === "haryana") {
      if (!isState || !scheme.onlyStates?.includes("haryana")) return false
    } else if (place === "centre" && isState) {
      return false
    }
    if (input.category && input.category !== "all" && scheme.category !== input.category) {
      return false
    }
    if (words.length === 0) return true
    const hindi = schemeHi[scheme.slug]
    const haystack = [
      scheme.name,
      scheme.shortName,
      scheme.localName,
      scheme.summary,
      scheme.highlight,
      scheme.ministry,
      categoryLabel(scheme.category, input.lang ?? "en"),
      schemeSearchText(scheme),
      hindi?.summary ?? "",
      ...scheme.keywords,
      ...scheme.whatYouGet,
      ...scheme.whoCanApply,
    ]
      .join(" ")
      .toLowerCase()
    return words.every((word) => haystack.includes(word))
  })
}

export type AgeBandRelation = "outside" | "partial" | "inside"

export function ageBandRelation(age: AgeAnswer, min: number, max: number): AgeBandRelation {
  const [bandMin, bandMax] = age === "under-18"
    ? [0, 17]
    : age === "18-40"
      ? [18, 40]
      : age === "41-59"
        ? [41, 59]
        : [60, Number.POSITIVE_INFINITY]

  if (max < bandMin || min > bandMax) return "outside"
  if (min <= bandMin && max >= bandMax) return "inside"
  return "partial"
}

export function ageReasonCode(relation: AgeBandRelation | undefined) {
  if (relation === "partial") return "ageUncertain" as const
  if (relation === "inside") return "age" as const
  return undefined
}

function landFits(need: Scheme["land"], land: LandAnswer) {
  if (land === "unsure") return true
  if (need === "any") return true
  if (need === "cultivator") return land === "owner" || land === "tenant"
  return land === "owner"
}

export type MatchBand = "apply" | "group" | "state"

export type SchemeMatch = {
  scheme: Scheme
  reasons: MatchReason[]
  score: number
  band: MatchBand
}

function bandFor(scheme: Scheme): MatchBand {
  if (scheme.applyAs === "through-state") return "state"
  if (scheme.applyAs === "group" || scheme.applyAs === "startup") return "group"
  return "apply"
}

export function matchSchemes(answers: FinderAnswers): SchemeMatch[] {
  const matches: SchemeMatch[] = []

  for (const scheme of schemes) {
    if (!landFits(scheme.land, answers.land)) continue
    if (scheme.smallMarginalOnly && answers.holding === "larger" && answers.land === "owner") {
      continue
    }
    const ageRelation = scheme.entryAge
      ? ageBandRelation(answers.age, scheme.entryAge.min, scheme.entryAge.max)
      : undefined
    if (ageRelation === "outside") {
      continue
    }
    if (scheme.jurisdiction === "state") {
      if (answers.state === "unsure" || !scheme.onlyStates?.includes(answers.state)) continue
    }
    if (
      scheme.onlyStates &&
      scheme.jurisdiction !== "state" &&
      answers.state !== "unsure" &&
      !scheme.onlyStates.includes(answers.state)
    ) {
      continue
    }
    if (scheme.womenOrShgOnly && !answers.womanOrShg) continue

    const overlap = scheme.activities.filter((activity) =>
      answers.activities.includes(activity)
    )
    const pickedActivities = answers.activities.length > 0
    const specific = scheme.activities.length > 0

    if (pickedActivities && specific && overlap.length === 0 && !scheme.core && !scheme.womenOrShgOnly) {
      continue
    }
    if (!pickedActivities && !scheme.core && specific && scheme.applyAs === "person") {
      continue
    }
    if (!pickedActivities && !scheme.core && scheme.applyAs !== "person" && specific) {
      continue
    }

    let score = 1
    const reasons: MatchReason[] = []

    const ageReason = ageReasonCode(ageRelation)
    if (ageReason === "ageUncertain") {
      // Keep possible matches, while making the unresolved age fit visible.
      reasons.push({ code: ageReason })
    }

    if (overlap.length > 0) {
      score += 5 + overlap.length
      reasons.push({ code: "overlap" })
    } else if (scheme.core && pickedActivities) {
      score += 2
      reasons.push({ code: "coreGeneral" })
    } else if (scheme.core) {
      score += 3
      reasons.push({ code: "core" })
    }

    if (scheme.land === "owner" && answers.land === "owner") {
      score += 1
      reasons.push({ code: "owner" })
    }
    if (scheme.land === "cultivator" && (answers.land === "owner" || answers.land === "tenant")) {
      score += 1
      reasons.push({ code: "cultivator" })
    }
    if (answers.land === "unsure" && scheme.land !== "any") {
      reasons.push({ code: "unsureLand" })
    }
    if (scheme.smallMarginalOnly && answers.holding === "small") {
      score += 2
      reasons.push({ code: "small" })
    }
    if (ageRelation === "inside") {
      score += 2
      reasons.push({ code: "age" })
    }
    if (scheme.womenOrShgOnly) {
      score += 3
      reasons.push({ code: "shg" })
    }
    if (scheme.onlyStates && answers.state !== "unsure") {
      score += 2
      reasons.push({ code: "state", stateId: answers.state })
    }
    if (scheme.applyAs === "group") {
      reasons.push({ code: "group" })
    }
    if (scheme.applyAs === "startup") {
      reasons.push({ code: "startup" })
    }
    if (scheme.applyAs === "through-state") {
      reasons.push({ code: "throughState" })
    }

    if (reasons.length === 0) {
      reasons.push({ code: "open" })
    }

    matches.push({
      scheme,
      reasons,
      score,
      band: bandFor(scheme),
    })
  }

  return matches.sort((a, b) => b.score - a.score || a.scheme.name.localeCompare(b.scheme.name))
}
