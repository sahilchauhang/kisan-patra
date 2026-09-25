import type { Metadata } from "next"
import Link from "next/link"

import { SchemeCard } from "@/components/scheme-card"
import { SearchForm } from "@/components/search-form"
import { categories } from "@/data/categories"
import { schemes } from "@/data/schemes"
import { filterSchemes } from "@/lib/schemes"
import { cn } from "cn"

export const metadata: Metadata = {
  title: "The register",
  description:
    "Search central and allied farmer schemes by name, crop, or category.",
}

function hrefFor(q: string, category: string) {
  const params = new URLSearchParams()
  if (q) params.set("q", q)
  if (category && category !== "all") params.set("category", category)
  const query = params.toString()
  return query ? `/schemes?${query}` : "/schemes"
}

export default async function SchemesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>
}) {
  const params = await searchParams
  const q = params.q?.toString() ?? ""
  const category = params.category?.toString() ?? "all"
  const known = categories.some((item) => item.id === category)
  const activeCategory = known ? category : "all"
  const results = filterSchemes({
    q,
    category: activeCategory,
  })

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-xs font-medium tracking-[0.16em] text-clay uppercase">
        {schemes.length} entries
      </p>
      <h1 className="mt-2 font-heading text-4xl sm:text-5xl">The register</h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
        Search by scheme, crop, or need. Each page has the benefit, who can
        apply, the papers, and the official link.
      </p>
      <div className="mt-6">
        <SearchForm defaultQuery={q} category={activeCategory === "all" ? undefined : activeCategory} compact />
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        <Link
          href={hrefFor(q, "all")}
          className={cn(
            "shrink-0 rounded-full px-3 py-1.5 text-sm",
            activeCategory === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-card ring-1 ring-foreground/10 hover:bg-muted"
          )}
        >
          All
        </Link>
        {categories.map((item) => (
          <Link
            key={item.id}
            href={hrefFor(q, item.id)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-sm",
              activeCategory === item.id
                ? "bg-primary text-primary-foreground"
                : "bg-card ring-1 ring-foreground/10 hover:bg-muted"
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {results.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-card px-5 py-10">
          <h2 className="font-heading text-2xl">Nothing matches that search.</h2>
          <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
            Try a shorter word — Kisan, drip, honey, pension, fish — or clear
            the category. State schemes are not in this register.
          </p>
          <Link href="/schemes" className="mt-4 inline-block text-sm font-medium text-primary">
            Clear search
          </Link>
        </div>
      ) : (
        <>
          <p className="mt-6 text-sm text-muted-foreground">
            Showing {results.length} {results.length === 1 ? "scheme" : "schemes"}
            {q ? ` for “${q}”` : ""}.
          </p>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {results.map((scheme) => (
              <li key={scheme.slug}>
                <SchemeCard scheme={scheme} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
