import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { SchemeCard } from "@/components/scheme-card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { categoryLabel } from "@/data/categories"
import { schemes } from "@/data/schemes"
import { t } from "@/lib/copy"
import { getLang } from "@/lib/language"
import { localizeScheme } from "@/lib/localize"
import { getScheme, relatedSchemes } from "@/lib/schemes"
import { cn } from "cn"

export function generateStaticParams() {
  return schemes.map((scheme) => ({ slug: scheme.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const lang = await getLang()
  const scheme = getScheme(slug)
  if (!scheme) return { title: t(lang).missingTitle }
  const view = localizeScheme(scheme, lang)
  return {
    title: lang === "hi" ? scheme.localName : scheme.shortName,
    description: view.summary,
  }
}

export default async function SchemePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const lang = await getLang()
  const text = t(lang)
  const { slug } = await params
  const source = getScheme(slug)
  if (!source) notFound()
  const scheme = localizeScheme(source, lang)
  const related = relatedSchemes(source)
  const registerHref = source.jurisdiction === "state" ? "/schemes?place=haryana" : "/schemes"

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm text-muted-foreground">
        <Link href={registerHref} className="hover:underline">
          {text.crumbRegister}
        </Link>
        <span aria-hidden> / </span>
        {categoryLabel(scheme.category, lang)}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge>{categoryLabel(scheme.category, lang)}</Badge>
        <Badge variant="outline">{scheme.highlight}</Badge>
      </div>
      <h1 className="mt-4 font-heading text-4xl leading-tight sm:text-5xl">
        {lang === "hi" ? source.localName : source.shortName}
      </h1>
      <p className="mt-2 text-lg text-foreground/80">
        {lang === "hi" ? source.shortName : source.name}
      </p>
      {lang === "en" ? (
        <p className="mt-1 text-sm text-muted-foreground">{source.localName}</p>
      ) : null}
      <p className="mt-6 text-base leading-7">{scheme.summary}</p>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        {scheme.ministry}. {text.listNote[scheme.list]}
      </p>

      <a
        href={scheme.officialUrl}
        target="_blank"
        rel="noreferrer"
        className={cn(buttonVariants({ size: "lg" }), "mt-6 h-11 px-4")}
      >
        {text.openOfficial(scheme.officialLabel)}
      </a>

      <Section title={text.whatYouGet} items={scheme.whatYouGet} />
      <Section title={text.whoCanApply} items={scheme.whoCanApply} />
      <Section title={text.papers} items={scheme.documents} />
      <div className="mt-8">
        <h2 className="font-heading text-2xl">{text.howToApply}</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6">
          {scheme.howToApply.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
      <div className="mt-8 rounded-2xl bg-accent px-4 py-4 text-accent-foreground">
        <h2 className="font-heading text-xl">{text.beforePay}</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6">
          {scheme.watchouts.map((item) => (
            <li key={item}>{item}</li>
          ))}
          <li>{text.rateNote}</li>
        </ul>
      </div>

      {related.length > 0 ? (
        <div className="mt-12">
          <h2 className="font-heading text-2xl">{text.nearby}</h2>
          <ul className="mt-4 grid gap-4">
            {related.map((item) => (
              <li key={item.slug}>
                <SchemeCard scheme={item} lang={lang} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  )
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-8">
      <h2 className="font-heading text-2xl">{title}</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}
