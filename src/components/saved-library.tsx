"use client"

import Link from "next/link"
import { Bookmark, Clock3, Trash2 } from "lucide-react"

import type { Lang } from "@/lib/language"
import { t } from "@/lib/copy"
import { clearSavedSchemes, toggleSavedScheme, useVisitorState } from "@/lib/visitor-state"

type Item = { slug: string; name: string; summary: string }

export function SavedLibrary({ lang, items }: { lang: Lang; items: Item[] }) {
  const state = useVisitorState()
  const text = t(lang)
  const bySlug = new Map(items.map((item) => [item.slug, item]))
  const saved = state.saved.map((slug) => bySlug.get(slug)).filter((item): item is Item => !!item)
  const recent = state.recent.map((slug) => bySlug.get(slug)).filter((item): item is Item => !!item)
  return <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
    <p className="text-xs font-semibold uppercase tracking-[.15em] text-clay">{text.homeDeviceOnly}</p>
    <h1 className="mt-2 font-heading text-4xl sm:text-5xl">{text.savedPageTitle}</h1>
    <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{text.savedPageBody}</p>
    <section className="mt-9">
      <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="flex items-center gap-2 font-heading text-2xl"><Bookmark className="size-5 text-clay" />{text.homeSaved}</h2>{saved.length > 0 && <button type="button" onClick={clearSavedSchemes} className="min-h-11 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">{text.homeClearSaved}</button>}</div>
      {saved.length === 0 ? <p className="mt-3 rounded-xl border border-dashed border-border px-4 py-6 text-sm text-muted-foreground">{text.savedEmpty}</p> : <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{saved.map((item) => <li key={item.slug} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10"><Link href={`/schemes/${item.slug}`} className="font-heading text-xl hover:underline">{item.name}</Link><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.summary}</p><button type="button" onClick={() => toggleSavedScheme(item.slug)} className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"><Trash2 className="size-3.5" />{text.savedRemove}</button></li>)}</ul>}
    </section>
    {recent.length > 0 && <section className="mt-10"><h2 className="flex items-center gap-2 font-heading text-2xl"><Clock3 className="size-5 text-clay" />{text.homeRecent}</h2><ul className="mt-4 flex flex-wrap gap-2">{recent.map((item) => <li key={item.slug}><Link href={`/schemes/${item.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-border bg-card px-3 py-2 text-sm hover:bg-muted">{item.name}</Link></li>)}</ul></section>}
  </main>
}
