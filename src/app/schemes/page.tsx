import type { Metadata } from "next"
import Link from "next/link"

import { PlaceSwitch } from "@/components/place-switch"
import { SchemeCard } from "@/components/scheme-card"
import { SearchForm } from "@/components/search-form"
import { categories, categoryLabel } from "@/data/categories"
import { schemes } from "@/data/schemes"
import { eyebrowClass, t } from "@/lib/copy"
import { getLang } from "@/lib/language"
import { filterSchemes } from "@/lib/schemes"
import { cn } from "cn"

export const metadata: Metadata = {
  title: "The register",
  description:
    "Search central and Haryana farmer schemes by name, crop, or category.",
}

type Place = "all" | "centre" | "haryana"

function hrefFor(q: string, category: string, place: Place, lang: "en" | "hi") {
  const params = new URLSearchParams()
  if (q) params.set("q", q)
  if (category && category !== "all") params.set("category", category)
  if (place !== "all") params.set("place", place)
  params.set("lang", lang)
  return `/schemes?${params.toString()}`
}

export default async function SchemesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[]; category?: string | string[]; place?: string | string[] }>
}) {
  const lang = await getLang()
  const text = t(lang)
  const params = await searchParams
  const q = typeof params.q === "string" ? params.q : ""
  const category = typeof params.category === "string" ? params.category : "all"
  const place: Place = params.place === "centre" || params.place === "haryana" ? params.place : "all"
  const known = categories.some((item) => item.id === category)
  const activeCategory = known ? category : "all"
  const catalogueSize = place === "all"
    ? schemes.length
    : schemes.filter((scheme) => place === "haryana"
      ? scheme.jurisdiction === "state" && scheme.onlyStates?.includes("haryana")
      : scheme.jurisdiction !== "state").length
  const results = filterSchemes({ q, category: activeCategory, place, lang })
  const otherPlace: Place | undefined = place === "haryana" ? "centre" : place === "centre" ? "haryana" : undefined
  const otherScopeResults = otherPlace && q
    ? filterSchemes({ q, category: activeCategory, place: otherPlace, lang })
    : []
  const commonCategories = ["income", "insurance", "credit", "machines"]
  const categoryOptions = [
    { id: "all", label: lang === "hi" ? "सभी श्रेणियाँ" : "All categories" },
    ...categories.map((item) => ({ id: item.id, label: categoryLabel(item.id, lang) })),
  ]

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <p className={eyebrowClass(lang)}>{text.registerEyebrow(catalogueSize)}</p>
      <h1 className="mt-1 font-heading text-3xl sm:mt-2 sm:text-5xl">
        {lang === "hi" && place === "all" ? "योजनाओं की सूची" : place === "haryana" ? text.haryanaTitle : text.registerTitle}
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:mt-3 sm:text-base sm:leading-7">
        {place === "haryana" ? text.haryanaBody : text.registerLead}
      </p>
      <div className="mt-4 sm:mt-6">
        <PlaceSwitch lang={lang} place={place} q={q} category={activeCategory} />
      </div>
      <div className="mt-4 sm:mt-6">
        <SearchForm
          lang={lang}
          defaultQuery={q}
          category={activeCategory === "all" ? undefined : activeCategory}
          place={place}
          compact
        />
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <form action="/schemes" className="flex gap-2 sm:hidden">
          {q ? <input type="hidden" name="q" value={q} /> : null}
          {place !== "all" ? <input type="hidden" name="place" value={place} /> : null}
          <input type="hidden" name="lang" value={lang} />
          <label className="sr-only" htmlFor="scheme-category">
            {lang === "hi" ? "श्रेणी चुनें" : "Choose a category"}
          </label>
          <select
            id="scheme-category"
            name="category"
            defaultValue={activeCategory}
            className="h-10 min-w-0 flex-1 rounded-xl border border-input bg-card px-3 text-sm"
          >
            {categoryOptions.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
          <button type="submit" className="rounded-xl bg-secondary px-4 text-sm font-medium">
            {lang === "hi" ? "दिखाएँ" : "Show"}
          </button>
        </form>
        <nav aria-label={lang === "hi" ? "लोकप्रिय श्रेणियाँ" : "Popular categories"} className="flex gap-2 overflow-x-auto pb-1 sm:hidden">
          {commonCategories.map((id) => (
            <Link key={id} href={hrefFor(q, id, place, lang)} className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-sm",
              activeCategory === id ? "bg-primary text-primary-foreground" : "bg-card ring-1 ring-foreground/10 hover:bg-muted"
            )}>{categoryLabel(id as (typeof categories)[number]["id"], lang)}</Link>
          ))}
        </nav>
        <nav aria-label={lang === "hi" ? "श्रेणियाँ" : "Categories"} className="hidden flex-wrap gap-2 sm:flex">
          {categoryOptions.map((item) => (
            <Link key={item.id} href={hrefFor(q, item.id, place, lang)} aria-current={activeCategory === item.id ? "page" : undefined} className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-sm",
              activeCategory === item.id ? "bg-primary text-primary-foreground" : "bg-card ring-1 ring-foreground/10 hover:bg-muted"
            )}>{item.label}</Link>
          ))}
        </nav>
      </div>

      {results.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-border bg-card px-5 py-8 sm:mt-8 sm:py-10">
          <h2 className="font-heading text-2xl">{text.emptyTitle}</h2>
          <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
            {place === "haryana" ? text.emptyHaryana : text.emptyBody}
          </p>
          {otherScopeResults.length > 0 ? (
            <p className="mt-3 text-sm leading-6">
              {lang === "hi" ? "यह खोज दूसरी सूची में मिलती है:" : "This search appears in the other register:"}{" "}
              <Link className="font-medium text-primary" href={hrefFor(q, activeCategory, otherPlace!, lang)}>
                {otherPlace === "haryana" ? text.placeHaryana : (lang === "hi" ? "केंद्र की योजनाएँ" : "Central schemes")}
              </Link>
            </p>
          ) : null}
          <Link
            href={hrefFor("", "all", place, lang)}
            className="mt-4 inline-block text-sm font-medium text-primary"
          >
            {text.clearSearch}
          </Link>
        </div>
      ) : (
        <>
          <p className="mt-5 text-sm text-muted-foreground">{text.showing(results.length, q)}</p>
          <ul className="mt-3 grid gap-4 md:grid-cols-2">
            {results.map((scheme) => (
              <li key={scheme.slug}>
                <SchemeCard scheme={scheme} lang={lang} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
