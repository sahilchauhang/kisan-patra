import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { SchemeCard } from "@/components/scheme-card"
import { SchemeBackLink, SchemeDetailControls, SchemeStatusText } from "@/components/scheme-detail-controls"
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
      <div className="flex flex-wrap items-center justify-between gap-2">
        <SchemeBackLink lang={lang} fallbackHref={registerHref} />
        <SchemeDetailControls slug={source.slug} lang={lang} />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{text.crumbRegister} <span aria-hidden> / </span>{categoryLabel(scheme.category, lang)}</p>
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
      <section className="mt-6 rounded-2xl border border-border bg-card p-4 sm:p-6">
        <p className="text-base leading-7">{scheme.summary}</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold">{lang === "hi" ? "मुख्य लाभ" : "Main benefit"}</h2>
            <p className="mt-1 text-sm leading-6">{scheme.whatYouGet[0]}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold">{text.whoCanApply}</h2>
            <p className="mt-1 text-sm leading-6">{scheme.whoCanApply[0]}</p>
          </div>
        </div>
        <div className="mt-5 rounded-xl bg-muted/70 p-4">
          <h2 className="text-sm font-semibold">{lang === "hi" ? "आवेदन की स्थिति" : "Application status"}</h2>
          <div className="mt-1 text-sm leading-6"><SchemeStatusText scheme={source} lang={lang} detail /></div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a href={scheme.officialUrl} target="_blank" rel="noreferrer" className={cn(buttonVariants({ size: "lg" }), "min-h-11 px-4")}>
            {lang === "hi" ? "आधिकारिक स्रोत खोलें" : "Open official source"}
          </a>
          <span className="text-sm text-muted-foreground">{scheme.officialLabel}</span>
        </div>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          {lang === "hi" ? "यह विभागीय जानकारी या घोषणा का स्रोत है; यह जरूरी नहीं कि आवेदन फ़ॉर्म हो।" : "This links to an official information source or notice; it may not be an application form."}
        </p>
        <div className="mt-5 grid gap-1 border-t border-border pt-4 text-sm leading-6 text-muted-foreground sm:grid-cols-2 sm:gap-4">
          <p><span className="font-semibold text-foreground">{lang === "hi" ? "प्रविष्टि अपडेट:" : "Entry updated:"}</span> {formatReviewDate(source.editorialUpdatedOn, lang)}</p>
          <p>{source.lastVerifiedOn
            ? <><span className="font-semibold text-foreground">{lang === "hi" ? "स्रोत जाँचा:" : "Source checked:"}</span> {formatReviewDate(source.lastVerifiedOn, lang)}</>
            : text.sourceNotVerified}</p>
        </div>
        <p className="mt-3 text-xs leading-5 text-muted-foreground">{scheme.ministry}. {text.listNote[scheme.list]}</p>
      </section>

      {scheme.whatYouGet.length > 1 ? <Section title={lang === "hi" ? "अन्य लाभ" : "More benefit details"} items={scheme.whatYouGet.slice(1)} /> : null}
      {scheme.whoCanApply.length > 1 ? <Section title={lang === "hi" ? "पात्रता की अन्य शर्तें" : "More eligibility details"} items={scheme.whoCanApply.slice(1)} /> : null}
      {scheme.documents.length > 0 ? <Section title={text.papers} items={scheme.documents} /> : null}
      <div className="mt-8">
        {source.lifecycle?.successorSlug && <p className="mb-4"><Link className="text-primary underline" href={`/schemes/${source.lifecycle.successorSlug}`}>{lang === "hi" ? "उत्तराधिकारी योजना देखें" : "View successor programme"}</Link></p>}
        {(source.evidence?.length || source.lifecycle?.evidence) ? <section className="mb-8">
          <h2 className="font-heading text-2xl">{lang === "hi" ? "आधिकारिक साक्ष्य" : "Official evidence"}</h2>
          <ul className="mt-3 space-y-3 text-sm">{[...(source.evidence ?? []), ...(source.lifecycle?.evidence ? [source.lifecycle.evidence] : [])].map((evidence, index) => <li key={`${evidence.url}-${index}`}>
            <a href={evidence.url} className="text-primary underline" target="_blank" rel="noreferrer">{evidence.title[lang]}</a>
            <p>{lang === "hi" ? "स्रोत जाँचा" : "Checked"}: {evidence.retrievedOn}{evidence.publishedOn ? ` · ${lang === "hi" ? "प्रकाशित" : "Published"}: ${evidence.publishedOn}` : ""}{evidence.effectiveOn ? ` · ${lang === "hi" ? "लागू" : "Effective"}: ${evidence.effectiveOn}` : ""}</p>
          </li>)}</ul>
        </section> : null}
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

function formatReviewDate(date: string, lang: "en" | "hi") {
  return new Date(`${date}T00:00:00`).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
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
