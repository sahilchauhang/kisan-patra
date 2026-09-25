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
    "Search central farmer schemes, or open Haryana’s own schemes, by name, crop, or category.",
}

function hrefFor(q: string, category: string, place: "centre" | "haryana") {
  const params = new URLSearchParams()
  if (q) params.set("q", q)
  if (category && category !== "all") params.set("category", category)
  if (place === "haryana") params.set("place", "haryana")
  const query = params.toString()
  return query ? `/schemes?${query}` : "/schemes"
}

export default async function SchemesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; place?: string }>
}) {
  const lang = await getLang()
  const text = t(lang)
  const params = await searchParams
  const q = params.q?.toString() ?? ""
  const category = params.category?.toString() ?? "all"
  const place = params.place === "haryana" ? "haryana" : "centre"
  const known = categories.some((item) => item.id === category)
  const activeCategory = known ? category : "all"
  const catalogueSize = schemes.filter((scheme) =>
    place === "haryana" ? scheme.jurisdiction === "state" : scheme.jurisdiction !== "state"
  ).length
  const results = filterSchemes({
    q,
    category: activeCategory,
    place,
    lang,
  })

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <p className={eyebrowClass(lang)}>{text.registerEyebrow(catalogueSize)}</p>
      <h1 className="mt-2 font-heading text-4xl sm:text-5xl">
        {place === "haryana" ? text.haryanaTitle : text.registerTitle}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
        {place === "haryana" ? text.haryanaBody : text.registerLead}
      </p>
      <div className="mt-6">
        <PlaceSwitch lang={lang} place={place} q={q} category={activeCategory} />
      </div>
      <div className="mt-6">
        <SearchForm
          lang={lang}
          defaultQuery={q}
          category={activeCategory === "all" ? undefined : activeCategory}
          place={place}
          compact
        />
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        <Link
          href={hrefFor(q, "all", place)}
          className={cn(
            "shrink-0 rounded-full px-3 py-1.5 text-sm",
            activeCategory === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-card ring-1 ring-foreground/10 hover:bg-muted"
          )}
        >
          {text.all}
        </Link>
        {categories.map((item) => (
          <Link
            key={item.id}
            href={hrefFor(q, item.id, place)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-sm",
              activeCategory === item.id
                ? "bg-primary text-primary-foreground"
                : "bg-card ring-1 ring-foreground/10 hover:bg-muted"
            )}
          >
            {categoryLabel(item.id, lang)}
          </Link>
        ))}
      </div>

      {results.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-card px-5 py-10">
          <h2 className="font-heading text-2xl">{text.emptyTitle}</h2>
          <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
            {place === "haryana" ? text.emptyHaryana : text.emptyBody}
          </p>
          <Link
            href={place === "haryana" ? "/schemes?place=haryana" : "/schemes"}
            className="mt-4 inline-block text-sm font-medium text-primary"
          >
            {text.clearSearch}
          </Link>
        </div>
      ) : (
        <>
          <p className="mt-6 text-sm text-muted-foreground">{text.showing(results.length, q)}</p>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
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
