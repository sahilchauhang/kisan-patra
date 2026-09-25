import type { Lang } from "@/lib/language"
import type { ActivityId, CategoryId } from "@/lib/types"

export const categories: {
  id: CategoryId
  label: string
  labelHi: string
  blurb: string
  blurbHi: string
}[] = [
  {
    id: "income",
    label: "Income support",
    labelHi: "आय सहायता",
    blurb: "Cash paid into the bank on a fixed schedule.",
    blurbHi: "तय समय पर बैंक में आने वाली नकद राशि।",
  },
  {
    id: "insurance",
    label: "Crop insurance",
    labelHi: "फसल बीमा",
    blurb: "A claim when a notified crop fails.",
    blurbHi: "अधिसूचित फसल खराब हो तो दावा।",
  },
  {
    id: "credit",
    label: "Loans",
    labelHi: "ऋण",
    blurb: "Crop credit and interest relief.",
    blurbHi: "फसल ऋण और ब्याज में राहत।",
  },
  {
    id: "water",
    label: "Water",
    labelHi: "पानी",
    blurb: "Drip, sprinkler, and irrigation works.",
    blurbHi: "ड्रिप, स्प्रिंकलर और सिंचाई के काम।",
  },
  {
    id: "machines",
    label: "Machines",
    labelHi: "मशीनें",
    blurb: "Tools, custom hiring, and drones.",
    blurbHi: "यंत्र, किराये पर मशीन, और ड्रोन।",
  },
  {
    id: "crops",
    label: "Soil, seed and crops",
    labelHi: "मिट्टी, बीज और फसल",
    blurb: "Testing, seed, and crop missions.",
    blurbHi: "जाँच, बीज और फसल मिशन।",
  },
  {
    id: "natural",
    label: "Natural farming",
    labelHi: "प्राकृतिक खेती",
    blurb: "Organic and chemical-free clusters.",
    blurbHi: "जैविक और रसायन-मुक्त क्लस्टर।",
  },
  {
    id: "market",
    label: "Selling the harvest",
    labelHi: "फसल बेचना",
    blurb: "Mandis, MSP, and storage.",
    blurbHi: "मंडी, एमएसपी और भंडारण।",
  },
  {
    id: "horticulture",
    label: "Gardens and plantations",
    labelHi: "बाग और बागान",
    blurb: "Fruit, oil palm, oilseeds, and bamboo.",
    blurbHi: "फल, ऑयल पाम, तिलहन और बाँस।",
  },
  {
    id: "enterprise",
    label: "Groups and businesses",
    labelHi: "समूह और कारोबार",
    blurb: "FPOs, start-ups, and processing units.",
    blurbHi: "एफपीओ, स्टार्टअप और प्रसंस्करण इकाइयाँ।",
  },
  {
    id: "allied",
    label: "Animals and fish",
    labelHi: "पशु और मछली",
    blurb: "Dairy, livestock, and fisheries.",
    blurbHi: "डेयरी, पशुधन और मत्स्य।",
  },
  {
    id: "digital",
    label: "Advice and records",
    labelHi: "सलाह और रिकॉर्ड",
    blurb: "Training, extension, and farmer IDs.",
    blurbHi: "प्रशिक्षण, विस्तार और किसान पहचान।",
  },
]

export const activities: { id: ActivityId; label: string; labelHi: string }[] = [
  { id: "crops", label: "Field crops", labelHi: "खेत की फसलें" },
  { id: "horticulture", label: "Fruit, vegetables, or flowers", labelHi: "फल, सब्जी या फूल" },
  { id: "livestock", label: "Cattle, buffalo, goats, or poultry", labelHi: "गाय, भैंस, बकरी या मुर्गी" },
  { id: "fisheries", label: "Fish or shrimp", labelHi: "मछली या झींगा" },
  { id: "bees", label: "Bees and honey", labelHi: "मधुमक्खी और शहद" },
  { id: "organic", label: "Organic or natural farming", labelHi: "जैविक या प्राकृतिक खेती" },
  { id: "oil-palm", label: "Oil palm", labelHi: "ऑयल पाम" },
  { id: "oilseeds", label: "Oilseeds", labelHi: "तिलहन" },
  { id: "bamboo", label: "Bamboo", labelHi: "बाँस" },
  { id: "processing", label: "Food processing", labelHi: "खाद्य प्रसंस्करण" },
  { id: "fpo", label: "A farmer producer organisation", labelHi: "किसान उत्पादक संगठन" },
  { id: "irrigation", label: "Irrigation on the farm", labelHi: "खेत पर सिंचाई" },
  { id: "machines", label: "Farm machines", labelHi: "कृषि मशीनें" },
  { id: "marketing", label: "Selling in a mandi", labelHi: "मंडी में बेचना" },
]

export function categoryLabel(id: CategoryId, lang: Lang = "en") {
  const category = categories.find((item) => item.id === id)
  if (!category) return id
  return lang === "hi" ? category.labelHi : category.label
}

export function categoryBlurb(id: CategoryId, lang: Lang) {
  const category = categories.find((item) => item.id === id)
  if (!category) return ""
  return lang === "hi" ? category.blurbHi : category.blurb
}

export function activityLabel(id: ActivityId, lang: Lang = "en") {
  const activity = activities.find((item) => item.id === id)
  if (!activity) return id
  return lang === "hi" ? activity.labelHi : activity.label
}
