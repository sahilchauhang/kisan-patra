import type { ActivityId, CategoryId } from "@/lib/types"

export const categories: {
  id: CategoryId
  label: string
  blurb: string
}[] = [
  {
    id: "income",
    label: "Income support",
    blurb: "Cash paid into the bank on a fixed schedule.",
  },
  {
    id: "insurance",
    label: "Crop insurance",
    blurb: "A claim when a notified crop fails.",
  },
  {
    id: "credit",
    label: "Loans",
    blurb: "Crop credit and interest relief.",
  },
  {
    id: "water",
    label: "Water",
    blurb: "Drip, sprinkler, and irrigation works.",
  },
  {
    id: "machines",
    label: "Machines",
    blurb: "Tools, custom hiring, and drones.",
  },
  {
    id: "crops",
    label: "Soil, seed and crops",
    blurb: "Testing, seed, and crop missions.",
  },
  {
    id: "natural",
    label: "Natural farming",
    blurb: "Organic and chemical-free clusters.",
  },
  {
    id: "market",
    label: "Selling the harvest",
    blurb: "Mandis, MSP, and storage.",
  },
  {
    id: "horticulture",
    label: "Gardens and plantations",
    blurb: "Fruit, oil palm, oilseeds, and bamboo.",
  },
  {
    id: "enterprise",
    label: "Groups and businesses",
    blurb: "FPOs, start-ups, and processing units.",
  },
  {
    id: "allied",
    label: "Animals and fish",
    blurb: "Dairy, livestock, and fisheries.",
  },
  {
    id: "digital",
    label: "Advice and records",
    blurb: "Training, extension, and farmer IDs.",
  },
]

export const activities: { id: ActivityId; label: string }[] = [
  { id: "crops", label: "Field crops" },
  { id: "horticulture", label: "Fruit, vegetables, or flowers" },
  { id: "livestock", label: "Cattle, buffalo, goats, or poultry" },
  { id: "fisheries", label: "Fish or shrimp" },
  { id: "bees", label: "Bees and honey" },
  { id: "organic", label: "Organic or natural farming" },
  { id: "oil-palm", label: "Oil palm" },
  { id: "oilseeds", label: "Oilseeds" },
  { id: "bamboo", label: "Bamboo" },
  { id: "processing", label: "Food processing" },
  { id: "fpo", label: "A farmer producer organisation" },
  { id: "irrigation", label: "Irrigation on the farm" },
  { id: "machines", label: "Farm machines" },
  { id: "marketing", label: "Selling in a mandi" },
]

export function categoryLabel(id: CategoryId) {
  return categories.find((category) => category.id === id)?.label ?? id
}

export function activityLabel(id: ActivityId) {
  return activities.find((activity) => activity.id === id)?.label ?? id
}
