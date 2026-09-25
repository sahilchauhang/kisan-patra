import type { Lang } from "@/lib/language"
import type { Scheme } from "@/lib/types"

export type SchemeStatus = { label: string; nextAction: string }

/** Status is deliberately explicit: free-form scheme prose is not reliable evidence of an open window. */
export function schemeStatus(scheme: Scheme, lang: Lang, today?: Date): SchemeStatus {
  if (scheme.slug === "haryana-cotton-micronutrients-ipm") {
    return lang === "hi"
      ? { label: "2026 की बिल जमा करने की तारीख 15 सितंबर बीत चुकी है", nextAction: "विभाग से पूछें कि अवधि बढ़ी है या बाद में दावा स्वीकार होगा।" }
      : { label: "2026 bill deadline of 15 September has passed", nextAction: "Ask the department whether it extended the window or will accept a later claim." }
  }
  if (scheme.slug === "haryana-sugarcane-planting-incentive") {
    const day = today ? new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime() : undefined
    const start = new Date(2026, 9, 15).getTime()
    const end = new Date(2026, 11, 31).getTime()
    if (day !== undefined && day > end) {
      return lang === "hi"
        ? { label: "घोषित आवेदन अवधि 31 दिसंबर 2026 को समाप्त हुई", nextAction: "अगली अवधि या विस्तार के लिए राज्य विभाग से पूछें।" }
        : { label: "Announced application window ended on 31 December 2026", nextAction: "Ask the state department about an extension or the next window." }
    }
    if (day !== undefined && day >= start) {
      return lang === "hi"
        ? { label: "घोषित अवधि चल रही है: 15 अक्टूबर–31 दिसंबर 2026", nextAction: "आवेदन से पहले राज्य पोर्टल की मौजूदा सूचना की पुष्टि करें।" }
        : { label: "Announced window is in progress: 15 October–31 December 2026", nextAction: "Confirm the current notice on the state portal before applying." }
    }
    return lang === "hi"
      ? { label: "घोषित आवेदन अवधि: 15 अक्टूबर–31 दिसंबर 2026", nextAction: "अवधि शुरू होने पर राज्य पोर्टल की सूचना देखें।" }
      : { label: "Announced application window: 15 October–31 December 2026", nextAction: "Check the state portal notice when the announced window begins." }
  }

  return lang === "hi"
    ? { label: "आवेदन की मौजूदा स्थिति यहाँ पुष्ट नहीं है", nextAction: "आवेदन की तारीख और प्रक्रिया आधिकारिक विभाग से जाँचें।" }
    : { label: "Current application status is not confirmed here", nextAction: "Check application dates and the process with the official department." }
}
