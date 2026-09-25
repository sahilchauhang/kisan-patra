"use client"

import Link from "next/link"
import { Bookmark, Clock3, X } from "lucide-react"

import type { Lang } from "@/lib/language"
import { t } from "@/lib/copy"
import { stateName } from "@/data/states"
import { clearSavedSchemes, useVisitorState } from "@/lib/visitor-state"

type Summary = { slug: string; name: string }

export function HomeContinue({ lang, summaries }: { lang: Lang; summaries: Summary[] }) {
  const state = useVisitorState()
  const text = t(lang)
  const bySlug = new Map(summaries.map((item) => [item.slug, item]))
  const saved = state.saved.map((slug) => bySlug.get(slug)).filter((item): item is Summary => !!item)
  const recent = state.recent.map((slug) => bySlug.get(slug)).filter((item): item is Summary => !!item)
  const hasState = !!state.profile.state && state.profile.state !== "unsure"
  if (saved.length === 0 && recent.length === 0 && !hasState) return null

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-5 sm:px-6" aria-label={text.homeContinueTitle}>
      <div className="rounded-2xl border border-primary/15 bg-white/70 p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><p className="text-xs font-semibold uppercase tracking-[.14em] text-clay">{text.homeContinueEyebrow}</p><h2 className="mt-1 font-heading text-2xl">{text.homeContinueTitle}</h2></div>
          <p className="text-xs text-muted-foreground">{text.homeDeviceOnly}</p>
        </div>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {hasState && <div className="md:col-span-2 rounded-xl bg-accent/55 px-4 py-3 sm:flex sm:items-center sm:justify-between sm:gap-4">
            <div><h3 className="text-sm font-semibold">{text.homeStateResume(stateName(state.profile.state!, lang))}</h3><p className="mt-1 text-xs leading-5 text-muted-foreground">{state.profile.state === "haryana" ? text.homeHaryanaTitle : text.homeStateOutside}</p></div>
            <Link href={state.profile.state === "haryana" ? "/schemes?place=haryana" : "https://www.myscheme.gov.in/"} className="mt-2 inline-flex min-h-11 items-center font-semibold text-primary underline decoration-primary/30 underline-offset-4 sm:mt-0">{state.profile.state === "haryana" ? text.haryanaLink : text.footerState}</Link>
          </div>}
          {saved.length > 0 && <div>
            <div className="flex items-center justify-between gap-2"><h3 className="flex items-center gap-2 text-sm font-semibold"><Bookmark className="size-4 text-clay" />{text.homeSaved}</h3><button type="button" onClick={clearSavedSchemes} className="inline-flex min-h-11 items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><X className="size-3.5" />{text.homeClearSaved}</button></div>
            <ul className="mt-2 flex flex-wrap gap-2">{saved.map((item) => <li key={item.slug}><Link href={`/schemes/${item.slug}`} className="inline-flex min-h-11 items-center rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground hover:bg-accent">{item.name}</Link></li>)}</ul>
          </div>}
          {recent.length > 0 && <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold"><Clock3 className="size-4 text-clay" />{text.homeRecent}</h3>
            <ul className="mt-2 flex flex-wrap gap-2">{recent.slice(0, 4).map((item) => <li key={item.slug}><Link href={`/schemes/${item.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-border bg-card px-3 py-1.5 text-sm hover:bg-muted">{item.name}</Link></li>)}</ul>
          </div>}
        </div>
      </div>
    </section>
  )
}
