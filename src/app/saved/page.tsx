import type { Metadata } from "next"

import { SavedLibrary } from "@/components/saved-library"
import { schemes } from "@/data/schemes"
import { getLang } from "@/lib/language"
import { localizeScheme } from "@/lib/localize"

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang()
  return {
    title: lang === "hi"
      ? "सहेजी योजनाएँ — किसान पत्र | केंद्र और हरियाणा"
      : "Saved schemes — Kisan Patra | Central and Haryana",
  }
}

export default async function SavedPage() {
  const lang = await getLang()
  const items = schemes.map((scheme) => {
    const localized = localizeScheme(scheme, lang)
    return { slug: scheme.slug, name: lang === "hi" ? scheme.localName : scheme.shortName || scheme.name, summary: localized.highlight }
  })
  return <SavedLibrary lang={lang} items={items} />
}
