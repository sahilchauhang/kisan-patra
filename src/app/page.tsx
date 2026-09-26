import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, Bookmark, CalendarDays, Sprout } from "lucide-react"

import { SchemeCard } from "@/components/scheme-card"
import { HomeContinue } from "@/components/home-continue"
import { UpdatesPreview } from "@/components/farmer-updates"
import { isDiscoverable } from "@/lib/policy"
import { buttonVariants } from "@/components/ui/button"
import { categories, categoryBlurb, categoryLabel } from "@/data/categories"
import { alliedCount, ministryListCount, schemes } from "@/data/schemes"
import { eyebrowClass, t } from "@/lib/copy"
import { getLang } from "@/lib/language"
import { cn } from "cn"

const starterSlugs = ["pm-kisan", "pmfby", "kcc"]

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang()
  return {
    title: lang === "hi"
      ? "किसान पत्र — केंद्र और हरियाणा की किसान योजनाएँ"
      : "Kisan Patra — central and Haryana farmer schemes",
  }
}

export default async function HomePage() {
  const lang = await getLang()
  const text = t(lang)
  const featured = schemes.filter((scheme) => isDiscoverable(scheme) && scheme.featured && scheme.jurisdiction !== "state")
  const starters = starterSlugs.map((slug) => schemes.find((scheme) => scheme.slug === slug && isDiscoverable(scheme))).filter((item) => item !== undefined)
  const summaries = schemes.map((scheme) => ({
    slug: scheme.slug,
    name: lang === "hi" ? scheme.localName : scheme.shortName || scheme.name,
  }))

  return (
    <div>
      <section className="home-hero mx-auto grid w-full max-w-6xl gap-8 px-4 pb-12 pt-9 sm:px-6 sm:pb-16 sm:pt-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div className="relative z-10">
          <p className={eyebrowClass(lang)}>{text.homeEyebrow}</p>
          <h1 className="mt-3 max-w-xl font-heading text-4xl leading-[1.08] text-balance sm:text-6xl">
            {text.homeTitle}
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-foreground/75 sm:text-lg">
            {text.homeLead()}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link href="/finder" className={cn(buttonVariants({ size: "lg" }), "h-12 gap-2 px-5 text-base shadow-md shadow-primary/15")}>
              {text.homeFit}<ArrowRight className="size-4" />
            </Link>
            <Link href="/schemes" className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">
              {text.homeBrowse}
            </Link>
          </div>
          <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Bookmark className="size-3.5" />{text.homeSaveNote}
          </p>
        </div>

        <div className="home-illustration relative min-h-64 overflow-hidden rounded-[2rem] border border-white/70 bg-[#e8ead1] p-5 sm:min-h-[340px] sm:p-7" aria-label={text.homeIllustrationAlt}>
          <div className="absolute right-5 top-5 rounded-full bg-white/75 px-3 py-1.5 text-xs font-medium text-primary/80">{text.homeIllustrationTag}</div>
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 410" fill="none" role="img" aria-hidden="true">
            <circle cx="475" cy="107" r="52" fill="#E6B85C" opacity=".85" />
            <path d="M0 296C105 228 196 278 287 238c102-45 209-60 313-4v176H0V296Z" fill="#B9C58A" />
            <path d="M0 333c116-59 205-39 301-70 117-37 203-13 299 33v114H0V333Z" fill="#71885F" />
            <path d="M23 410c112-85 205-69 294-111 86-40 166-33 283 21" stroke="#EAD99E" strokeWidth="4" />
            <path d="M-8 382c120-85 207-71 299-111 84-37 168-37 299 18" stroke="#EAD99E" strokeWidth="4" />
            <path d="M272 269c-5-55 4-98 32-129m-34 88c-29-32-48-37-68-40m93-18c25-29 47-37 70-38m-77 75c-20-30-18-52-11-72m13 102c31-27 56-32 83-28" stroke="#345F43" strokeWidth="9" strokeLinecap="round" />
            <path d="M231 185c13-20 31-23 49-15-7 19-23 31-49 15Zm73-56c7-20 25-31 47-28-2 22-19 37-47 28Zm37 72c15-15 35-18 53-8-10 19-29 26-53 8Zm-71-20c-21-9-30-26-27-48 22 5 36 22 27 48Z" fill="#55784F" />
            <path d="M152 288h34l-5 59h-24l-5-59Zm-9-4 25-27 27 27h-52Z" fill="#A35B3A" />
            <path d="M157 316h19v31h-19z" fill="#F0DDA4" />
          </svg>
          <div className="relative mt-auto flex h-full min-h-56 flex-col justify-end">
            <div className="max-w-56 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-sm backdrop-blur">
              <span className="text-[11px] font-semibold uppercase tracking-[.14em] text-clay">{text.homeIllustrationCard}</span>
              <p className="mt-1 font-heading text-xl leading-tight">{text.homeIllustrationTitle}</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{text.homeIllustrationBody}</p>
            </div>
          </div>
        </div>
      </section>

      <HomeContinue lang={lang} summaries={summaries} />
      <UpdatesPreview lang={lang} />

      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className={eyebrowClass(lang)}>{text.homeStart}</p>
            <h2 className="mt-2 font-heading text-3xl sm:text-4xl">{text.homeStartTitle}</h2>
          </div>
          <Sprout className="mb-1 hidden size-8 text-clay sm:block" aria-hidden="true" />
        </div>
        <ul className="mt-6 grid gap-3 md:grid-cols-3">
          {starters.map((scheme, index) => (
            <li key={scheme.slug}>
              <Link href={`/schemes/${scheme.slug}`} className="starter-card group flex h-full min-h-52 flex-col rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-lg">
                <span className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <span>{text.homeStartNumber(index + 1)}</span><ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </span>
                <span className="mt-7 font-heading text-2xl">{lang === "hi" ? scheme.localName : scheme.shortName}</span>
                <span className="mt-2 text-sm leading-6 text-muted-foreground">{text.homeStarterDescription(index, scheme.highlight)}</span>
                <span className="mt-auto pt-4 text-xs font-semibold text-primary">{text.homeReadScheme}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="season-panel mx-auto my-4 grid w-full max-w-6xl gap-5 px-5 py-6 sm:my-8 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:px-8">
        <div className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground"><CalendarDays className="size-5" /></div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.14em] text-clay">{text.homeSeasonEyebrow}</p>
          <h2 className="mt-1 font-heading text-2xl">{text.homeSeasonTitle}</h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">{text.homeSeasonPanelBody}</p>
        </div>
        <Link href="/schemes/pmfby" className="text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-4">{text.homeSeasonLink}</Link>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div><p className={eyebrowClass(lang)}>{text.homeBrowseHint}</p><h2 className="mt-2 font-heading text-3xl">{text.homeByWork}</h2></div>
          <Link href="/schemes" className="hidden text-sm font-medium text-primary underline underline-offset-4 sm:block">{text.homeBrowse}</Link>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <li key={category.id}>
              <Link href={`/schemes?category=${category.id}`} className={`need-card need-card-${index % 4} flex h-full flex-col rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-md`}>
                <span className="mt-2 font-heading text-xl">{categoryLabel(category.id, lang)}</span>
                <span className="mt-1 text-sm leading-6 text-muted-foreground">{categoryBlurb(category.id, lang)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-5 rounded-3xl bg-primary px-5 py-6 text-primary-foreground sm:grid-cols-[1fr_auto] sm:items-end sm:px-8 sm:py-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.15em] opacity-75">{text.haryanaTitle}</p>
            <h2 className="mt-2 max-w-xl font-heading text-3xl">{text.homeHaryanaTitle}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-primary-foreground/80">{text.homeHaryanaBody}</p>
          </div>
          <Link href="/schemes?place=haryana" className={cn(buttonVariants({ variant: "secondary" }), "h-11 whitespace-nowrap")}>{text.haryanaLink}<ArrowRight /></Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-4 sm:px-6">
        <div className="mb-6"><p className={eyebrowClass(lang)}>{text.homeFeaturedEyebrow}</p><h2 className="mt-2 font-heading text-3xl">{text.homeFeatured}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{text.homeFeaturedBody}</p></div>
        <ul className="grid gap-4 md:grid-cols-2">{featured.map((scheme) => <li key={scheme.slug}><SchemeCard scheme={scheme} lang={lang} /></li>)}</ul>
        <div className="mt-8 grid gap-3 rounded-2xl border border-border bg-card/80 px-5 py-5 text-sm text-muted-foreground sm:grid-cols-3">
          <p><span className="font-heading text-2xl text-foreground">{ministryListCount}</span><span className="mt-1 block">{text.statMinistry}</span></p>
          <p><span className="font-heading text-2xl text-foreground">{alliedCount}</span><span className="mt-1 block">{text.statAllied}</span></p>
          <p><span className="font-medium text-foreground">{text.homeTrustTitle}</span><span className="mt-1 block">{text.homeTrustBody}</span></p>
        </div>
      </section>
    </div>
  )
}
