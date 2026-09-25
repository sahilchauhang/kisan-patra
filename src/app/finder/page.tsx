import type { Metadata } from "next"

import { Finder } from "@/components/finder"
import { eyebrowClass, t } from "@/lib/copy"
import { getLang } from "@/lib/language"

export const metadata: Metadata = {
  title: "What fits me",
  description:
    "Answer a few questions and see which central farmer schemes, and Haryana schemes, may match your land, age, and work.",
}

export default async function FinderPage() {
  const lang = await getLang()
  const text = t(lang)
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <p className={eyebrowClass(lang)}>{text.finderEyebrow}</p>
      <h1 className="mt-2 max-w-2xl font-heading text-4xl sm:text-5xl">{text.finderTitle}</h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">{text.finderLead}</p>
      <div className="mt-8">
        <Finder lang={lang} />
      </div>
    </div>
  )
}
