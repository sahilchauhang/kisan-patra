export const categoryIds = [
  "income",
  "insurance",
  "credit",
  "water",
  "machines",
  "crops",
  "natural",
  "market",
  "horticulture",
  "enterprise",
  "allied",
  "digital",
] as const

export type CategoryId = (typeof categoryIds)[number]

export const activityIds = [
  "crops",
  "horticulture",
  "livestock",
  "fisheries",
  "bees",
  "organic",
  "oil-palm",
  "oilseeds",
  "bamboo",
  "processing",
  "fpo",
  "irrigation",
  "machines",
  "marketing",
] as const

export type ActivityId = (typeof activityIds)[number]

export type SchemeList = "ministry-2026" | "allied" | "platform" | "state"

export type Jurisdiction = "central" | "state"

export type ApplyAs = "person" | "group" | "startup" | "through-state"

export type LandNeed = "owner" | "cultivator" | "any"

export type Scheme = {
  slug: string
  name: string
  shortName: string
  localName: string
  ministry: string
  category: CategoryId
  summary: string
  highlight: string
  whatYouGet: string[]
  whoCanApply: string[]
  documents: string[]
  howToApply: string[]
  watchouts: string[]
  officialUrl: string
  officialLabel: string
  list: SchemeList
  jurisdiction?: Jurisdiction
  featured?: boolean
  keywords: string[]
  activities: ActivityId[]
  land: LandNeed
  smallMarginalOnly?: boolean
  entryAge?: { min: number; max: number }
  onlyStates?: string[]
  womenOrShgOnly?: boolean
  core?: boolean
  applyAs: ApplyAs
}

export type LandAnswer = "owner" | "tenant" | "none" | "unsure"
export type HoldingAnswer = "small" | "larger" | "unsure"
export type AgeAnswer = "under-18" | "18-40" | "41-59" | "60-plus"

export type FinderAnswers = {
  state: string
  land: LandAnswer
  holding: HoldingAnswer
  age: AgeAnswer
  womanOrShg: boolean
  activities: ActivityId[]
}
