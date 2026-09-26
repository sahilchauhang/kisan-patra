import type { ApplicationWindow, Scheme } from "@/lib/types"

// Migration of dates already published in the catalogue. This does not establish programme lifecycle.
const legacyWindows: Record<string, ApplicationWindow> = {
  "haryana-cotton-micronutrients-ipm": { status: "closed", closesOn: "2026-09-15", label: { en: "2026 bill submission", hi: "2026 के बिल जमा करना" } },
  "haryana-sugarcane-planting-incentive": { status: "announced", opensOn: "2026-10-15", closesOn: "2026-12-31", label: { en: "Announced application window", hi: "घोषित आवेदन अवधि" } },
}

export function withPolicyMetadata(scheme: Scheme): Scheme {
  return { ...scheme, evidence: scheme.evidence ?? [], lifecycle: scheme.lifecycle ?? { status: "unknown" }, applicationWindow: scheme.applicationWindow ?? legacyWindows[scheme.slug] ?? { status: "unknown" } }
}
