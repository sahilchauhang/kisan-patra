import { categoryLabel } from "@/data/categories"
import { schemes } from "@/data/schemes"
import { stateName } from "@/data/states"
import type {
  AgeAnswer,
  FinderAnswers,
  LandAnswer,
  Scheme,
} from "@/lib/types"

export function getScheme(slug: string) {
  return schemes.find((scheme) => scheme.slug === slug)
}

export function relatedSchemes(scheme: Scheme, count = 3) {
  return schemes
    .filter((item) => item.slug !== scheme.slug && item.category === scheme.category)
    .slice(0, count)
}

export function filterSchemes(input: { q?: string; category?: string }) {
  const query = input.q?.trim().toLowerCase() ?? ""
  const words = query.split(/\s+/).filter(Boolean)

  return schemes.filter((scheme) => {
    if (input.category && input.category !== "all" && scheme.category !== input.category) {
      return false
    }
    if (words.length === 0) return true
    const haystack = [
      scheme.name,
      scheme.shortName,
      scheme.localName,
      scheme.summary,
      scheme.highlight,
      scheme.ministry,
      categoryLabel(scheme.category),
      ...scheme.keywords,
      ...scheme.whatYouGet,
      ...scheme.whoCanApply,
    ]
      .join(" ")
      .toLowerCase()
    return words.every((word) => haystack.includes(word))
  })
}

function ageInRange(age: AgeAnswer, min: number, max: number) {
  if (age === "under-18") return 17 >= min && 17 <= max
  if (age === "18-40") return 30 >= min && 30 <= max
  if (age === "41-59") return 50 >= min && 50 <= max
  return 65 >= min && 65 <= max
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
  reasons: string[]
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
    if (scheme.entryAge && !ageInRange(answers.age, scheme.entryAge.min, scheme.entryAge.max)) {
      continue
    }
    if (
      scheme.onlyStates &&
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
    const reasons: string[] = []

    if (overlap.length > 0) {
      score += 5 + overlap.length
      reasons.push("It lines up with the work you selected.")
    } else if (scheme.core && pickedActivities) {
      score += 2
      reasons.push("A general scheme, still worth checking alongside the specialist ones.")
    } else if (scheme.core) {
      score += 3
      reasons.push("One of the schemes most farm families should look at first.")
    }

    if (scheme.land === "owner" && answers.land === "owner") {
      score += 1
      reasons.push("You own cultivable land, which this scheme asks for.")
    }
    if (scheme.land === "cultivator" && (answers.land === "owner" || answers.land === "tenant")) {
      score += 1
      reasons.push("You cultivate a crop, including as a tenant where the scheme allows it.")
    }
    if (answers.land === "unsure" && scheme.land !== "any") {
      reasons.push("You were unsure about the land record. Confirm that before you apply.")
    }
    if (scheme.smallMarginalOnly && answers.holding === "small") {
      score += 2
      reasons.push("Your holding is within 2 hectares, which this pension requires.")
    }
    if (scheme.entryAge) {
      score += 2
      reasons.push("Your age is inside the window for joining.")
    }
    if (scheme.womenOrShgOnly) {
      score += 3
      reasons.push("You are in a women self-help group, which is who this selects.")
    }
    if (scheme.onlyStates && answers.state !== "unsure") {
      score += 2
      reasons.push(`It runs in ${stateName(answers.state)}.`)
    }
    if (scheme.applyAs === "group") {
      reasons.push("The money goes to a group or a project, not as a personal instalment.")
    }
    if (scheme.applyAs === "startup") {
      reasons.push("This is for a business or a processing unit, not a seasonal crop loan.")
    }
    if (scheme.applyAs === "through-state") {
      reasons.push("The state opens this. There may be no personal form on a national portal.")
    }

    if (reasons.length === 0) {
      reasons.push("It is open for the situation you described.")
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
