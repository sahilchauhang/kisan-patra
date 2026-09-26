import type { Lang } from "@/lib/language"
import type { Scheme } from "@/lib/types"
import { indiaDay } from "@/lib/policy"

export type SchemeStatus = { label: string; nextAction: string }

export function schemeStatus(scheme: Scheme, lang: Lang, today?: Date): SchemeStatus {
  const hi = lang === "hi"
  const lifecycle = scheme.lifecycle?.status ?? "unknown"
  if (lifecycle === "retired" || lifecycle === "replaced") return {
    label: hi ? (lifecycle === "replaced" ? "योजना की जगह नई योजना लागू है" : "योजना समाप्त की गई है") : (lifecycle === "replaced" ? "Programme replaced" : "Programme retired"),
    nextAction: hi ? "नीचे आधिकारिक आदेश और उत्तराधिकारी योजना की जानकारी देखें।" : "See the official order and any successor programme below.",
  }
  const window = scheme.applicationWindow
  const day = today ? indiaDay(today) : undefined
  const dates = [window?.opensOn, window?.closesOn].filter(Boolean).join(" – ")
  if (window?.status === "closed" || (day && window?.closesOn && day > window.closesOn)) return {
    label: hi ? `आवेदन अवधि समाप्त${dates ? `: ${dates}` : ""}` : `Application window closed${dates ? `: ${dates}` : ""}`,
    nextAction: hi ? "विभाग से विस्तार या अगली अवधि पूछें। अवधि बंद होने का अर्थ योजना समाप्त होना नहीं है।" : "Ask the department about an extension or next window. A closed window does not mean the programme has retired.",
  }
  if (window && window.status !== "unknown") return {
    label: `${window.label?.[lang] ?? (hi ? "आवेदन अवधि" : "Application window")}${dates ? `: ${dates}` : ""}`,
    nextAction: hi ? "आवेदन से पहले आधिकारिक पोर्टल पर वर्तमान सूचना और तारीख की पुष्टि करें।" : "Confirm the current notice and dates on the official portal before applying.",
  }
  return hi
    ? { label: "आवेदन की मौजूदा स्थिति यहाँ पुष्ट नहीं है", nextAction: "आवेदन की तारीख और प्रक्रिया आधिकारिक विभाग से जाँचें।" }
    : { label: "Current application status is not confirmed here", nextAction: "Check application dates and the process with the official department." }
}
