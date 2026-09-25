import { ministryHi, schemeHi } from "@/data/scheme-hi"
import type { Lang } from "@/lib/language"
import type { Scheme } from "@/lib/types"

export function localizeScheme(scheme: Scheme, lang: Lang): Scheme {
  if (lang !== "hi") return scheme
  const text = schemeHi[scheme.slug]
  if (!text) return scheme
  return {
    ...scheme,
    ...text,
    ministry: ministryHi[scheme.ministry] ?? scheme.ministry,
  }
}

export function schemeSearchText(scheme: Scheme) {
  const text = schemeHi[scheme.slug]
  if (!text) return ""
  return [text.summary, text.highlight, ...text.whatYouGet, ...text.whoCanApply].join(" ")
}
