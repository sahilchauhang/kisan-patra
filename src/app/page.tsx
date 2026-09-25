import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { SchemeCard } from "@/components/scheme-card"
import { SearchForm } from "@/components/search-form"
import { buttonVariants } from "@/components/ui/button"
import { categories, categoryBlurb, categoryLabel } from "@/data/categories"
import { alliedCount, ministryListCount, schemes } from "@/data/schemes"
import { eyebrowClass, t } from "@/lib/copy"
import { getLang } from "@/lib/language"
import { cn } from "cn"

export default async function HomePage() {
  const lang = await getLang()
  const text = t(lang)
  const featured = schemes.filter((scheme) => scheme.featured && scheme.jurisdiction !== "state")
  const counts = new Map<string, number>()
  for (const scheme of schemes) {
    if (scheme.jurisdiction === "state") continue
    counts.set(scheme.category, (counts.get(scheme.category) ?? 0) + 1)
  }

  return (
    <div>
      <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <div>
          <p className={eyebrowClass(lang)}>{text.homeEyebrow}</p>
          <h1 className="mt-3 max-w-xl font-heading text-4xl leading-[1.05] text-balance sm:text-6xl">
            {text.homeTitle}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-foreground/80">
            {text.homeLead(ministryListCount, alliedCount)}
          </p>
          <div className="mt-8">
            <SearchForm lang={lang} />
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Link href="/finder" className={cn(buttonVariants({ size: "lg" }), "h-11 px-4")}>
              {text.homeFit}
              <ArrowRight />
            </Link>
            <Link
              href="/schemes"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-11 bg-card px-4")}
            >
              {text.homeBrowse}
            </Link>
          </div>
        </div>
        <aside className="rounded-2xl bg-primary px-5 py-6 text-primary-foreground shadow-sm">
          <p className="text-xs tracking-[0.16em] uppercase opacity-80">{text.homeStart}</p>
          <ol className="mt-4 space-y-4">
            <li>
              <p className="font-heading text-xl">{text.homeOwn}</p>
              <p className="mt-1 text-sm leading-6 text-primary-foreground/85">{text.homeOwnBody}</p>
            </li>
            <li>
              <p className="font-heading text-xl">{text.homeSeason}</p>
              <p className="mt-1 text-sm leading-6 text-primary-foreground/85">{text.homeSeasonBody}</p>
            </li>
            <li>
              <p className="font-heading text-xl">{text.homeSeed}</p>
              <p className="mt-1 text-sm leading-6 text-primary-foreground/85">{text.homeSeedBody}</p>
            </li>
          </ol>
        </aside>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-4 sm:px-6">
        <div className="rounded-2xl bg-card px-4 py-5 ring-1 ring-foreground/10 sm:px-6">
          <h2 className="font-heading text-3xl">{text.haryanaTitle}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{text.haryanaBody}</p>
          <Link
            href="/schemes?place=haryana"
            className={cn(buttonVariants({ size: "lg" }), "mt-4 h-11 px-4")}
          >
            {text.haryanaLink}
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-3 rounded-2xl bg-card px-4 py-4 ring-1 ring-foreground/10 sm:grid-cols-3 sm:px-6">
          <p>
            <span className="font-heading text-3xl">{ministryListCount}</span>
            <span className="mt-1 block text-sm text-muted-foreground">{text.statMinistry}</span>
          </p>
          <p>
            <span className="font-heading text-3xl">{alliedCount}</span>
            <span className="mt-1 block text-sm text-muted-foreground">{text.statAllied}</span>
          </p>
          <p>
            <span className="font-heading text-3xl">1</span>
            <span className="mt-1 block text-sm text-muted-foreground">{text.statPlace}</span>
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="font-heading text-3xl">{text.homeByWork}</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/schemes?category=${category.id}`}
                className="flex h-full flex-col rounded-xl bg-card px-4 py-4 ring-1 ring-foreground/10 transition hover:ring-primary/40"
              >
                <span className="text-xs text-muted-foreground">
                  {text.schemeCount(counts.get(category.id) ?? 0)}
                </span>
                <span className="mt-2 font-heading text-xl">{categoryLabel(category.id, lang)}</span>
                <span className="mt-1 text-sm leading-6 text-muted-foreground">
                  {categoryBlurb(category.id, lang)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="font-heading text-3xl">{text.homeFeatured}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{text.homeFeaturedBody}</p>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {featured.map((scheme) => (
            <li key={scheme.slug}>
              <SchemeCard scheme={scheme} lang={lang} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
