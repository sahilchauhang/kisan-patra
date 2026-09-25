import type { Metadata } from "next"

import { Finder } from "@/components/finder"
import { eyebrowClass, t } from "@/lib/copy"
import { getLang } from "@/lib/language"

export const metadata: Metadata = {
  title: "What fits me",
  description:
    "Choose your state and farm work to build a shortlist of schemes that may fit. Add optional details, then check each scheme’s current eligibility and application requirements.",
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
