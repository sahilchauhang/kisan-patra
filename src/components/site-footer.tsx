import Link from "next/link"

import { t } from "@/lib/copy"
import type { Lang } from "@/lib/language"

export function SiteFooter({ lang }: { lang: Lang }) {
  const text = t(lang)
  return (
    <footer className="mt-auto border-t border-border/80 bg-card">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-heading text-lg">Kisan Patra</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            {text.footerBlurb}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <Link href="/updates" className="hover:underline">{lang === "hi" ? "नई सूचनाएँ और पुरालेख" : "Updates and archive"}</Link>
          <Link href="/schemes" className="hover:underline">
            {text.footerBrowse}
          </Link>
          <Link href="/finder" className="hover:underline">
            {text.footerFit}
          </Link>
          <Link href="/saved" className="hover:underline">
            {text.navSaved}
          </Link>
          <Link href="/schemes?place=haryana" className="hover:underline">
            {text.haryanaLink}
          </Link>
          <Link href="/about" className="hover:underline">
            {text.footerSources}
          </Link>
          <a
            href="https://www.myscheme.gov.in/"
            className="hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            {text.footerState}
          </a>
        </div>
      </div>
    </footer>
  )
}
