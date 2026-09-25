import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { SchemeCard } from "@/components/scheme-card"
import { SearchForm } from "@/components/search-form"
import { buttonVariants } from "@/components/ui/button"
import { categories } from "@/data/categories"
import { alliedCount, ministryListCount, schemes } from "@/data/schemes"
import { cn } from "cn"

export default function HomePage() {
  const featured = schemes.filter((scheme) => scheme.featured)
  const counts = new Map<string, number>()
  for (const scheme of schemes) {
    counts.set(scheme.category, (counts.get(scheme.category) ?? 0) + 1)
  }

  return (
    <div>
      <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-clay uppercase">
            India · Independent register
          </p>
          <h1 className="mt-3 max-w-xl font-heading text-4xl leading-[1.05] text-balance sm:text-6xl">
            Every central farmer scheme, on one desk.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-foreground/80">
            Kisan Patra lists the {ministryListCount} programmes the Ministry of
            Agriculture named in Parliament on 3 February 2026, plus {alliedCount}{" "}
            allied schemes farmers actually use for loans, fish, livestock, food
            processing, and solar pumps.
          </p>
          <div className="mt-8">
            <SearchForm />
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Link
              href="/finder"
              className={cn(buttonVariants({ size: "lg" }), "h-11 px-4")}
            >
              See what may fit me
              <ArrowRight />
            </Link>
            <Link
              href="/schemes"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-11 bg-card px-4"
              )}
            >
              Browse the full register
            </Link>
          </div>
        </div>
        <aside className="rounded-2xl bg-primary px-5 py-6 text-primary-foreground shadow-sm">
          <p className="text-xs tracking-[0.16em] uppercase opacity-80">
            Start with these three
          </p>
          <ol className="mt-4 space-y-4">
            <li>
              <p className="font-heading text-xl">Own land?</p>
              <p className="mt-1 text-sm leading-6 text-primary-foreground/85">
                PM-KISAN pays ₹6,000 a year in three instalments, if the land
                record is in the family name.
              </p>
            </li>
            <li>
              <p className="font-heading text-xl">Worried about the season?</p>
              <p className="mt-1 text-sm leading-6 text-primary-foreground/85">
                PMFBY caps your premium. Your state has to have opted in, and
                you must enrol before the cut-off.
              </p>
            </li>
            <li>
              <p className="font-heading text-xl">Need money for seed?</p>
              <p className="mt-1 text-sm leading-6 text-primary-foreground/85">
                A Kisan Credit Card is the loan. Interest relief sits on top of
                it. Ask the bank for the prompt-repayment date.
              </p>
            </li>
          </ol>
        </aside>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-4 sm:px-6">
        <div className="grid gap-3 rounded-2xl bg-card px-4 py-4 ring-1 ring-foreground/10 sm:grid-cols-3 sm:px-6">
          <p>
            <span className="font-heading text-3xl">{ministryListCount}</span>
            <span className="mt-1 block text-sm text-muted-foreground">
              schemes in the ministry’s parliamentary list
            </span>
          </p>
          <p>
            <span className="font-heading text-3xl">{alliedCount}</span>
            <span className="mt-1 block text-sm text-muted-foreground">
              allied programmes from other departments
            </span>
          </p>
          <p>
            <span className="font-heading text-3xl">1</span>
            <span className="mt-1 block text-sm text-muted-foreground">
              place to read eligibility, papers, and the official link
            </span>
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-3xl">By the work it supports</h2>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/schemes?category=${category.id}`}
                className="flex h-full flex-col rounded-xl bg-card px-4 py-4 ring-1 ring-foreground/10 transition hover:ring-primary/40"
              >
                <span className="text-xs text-muted-foreground">
                  {counts.get(category.id) ?? 0} schemes
                </span>
                <span className="mt-2 font-heading text-xl">{category.label}</span>
                <span className="mt-1 text-sm leading-6 text-muted-foreground">
                  {category.blurb}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="font-heading text-3xl">Often the first ones people need</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          These are the schemes with a personal application and a number you can
          check. State top-ups — Rythu Bharosa and the rest — change with the
          state government and are not listed here.
        </p>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {featured.map((scheme) => (
            <li key={scheme.slug}>
              <SchemeCard scheme={scheme} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
