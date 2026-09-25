import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { SchemeCard } from "@/components/scheme-card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { categoryLabel } from "@/data/categories"
import { schemes } from "@/data/schemes"
import { getScheme, relatedSchemes } from "@/lib/schemes"
import { cn } from "cn"

const listCopy = {
  "ministry-2026":
    "Named in the Ministry of Agriculture & Farmers Welfare list tabled in the Lok Sabha on 3 February 2026.",
  allied:
    "Run by another department. Farmers use it, but it was not in that agriculture-ministry annexure.",
  platform:
    "The trading platform inside the Integrated Scheme for Agricultural Marketing. Listed on its own because farmers search for it by name.",
} as const

export function generateStaticParams() {
  return schemes.map((scheme) => ({ slug: scheme.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const scheme = getScheme(slug)
  if (!scheme) return { title: "Scheme not found" }
  return {
    title: scheme.shortName,
    description: scheme.summary,
  }
}

export default async function SchemePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const scheme = getScheme(slug)
  if (!scheme) notFound()
  const related = relatedSchemes(scheme)

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm text-muted-foreground">
        <Link href="/schemes" className="hover:underline">
          Register
        </Link>
        <span aria-hidden> / </span>
        {categoryLabel(scheme.category)}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge>{categoryLabel(scheme.category)}</Badge>
        <Badge variant="outline">{scheme.highlight}</Badge>
      </div>
      <h1 className="mt-4 font-heading text-4xl leading-tight sm:text-5xl">
        {scheme.shortName}
      </h1>
      <p className="mt-2 text-lg text-foreground/80">{scheme.name}</p>
      <p className="mt-1 text-sm text-muted-foreground">{scheme.localName}</p>
      <p className="mt-6 text-base leading-7">{scheme.summary}</p>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        {scheme.ministry}. {listCopy[scheme.list]}
      </p>

      <a
        href={scheme.officialUrl}
        target="_blank"
        rel="noreferrer"
        className={cn(buttonVariants({ size: "lg" }), "mt-6 h-11 px-4")}
      >
        Open {scheme.officialLabel}
      </a>

      <Section title="What you get" items={scheme.whatYouGet} />
      <Section title="Who can apply" items={scheme.whoCanApply} />
      <Section title="Papers to keep ready" items={scheme.documents} />
      <div className="mt-8">
        <h2 className="font-heading text-2xl">How to apply</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6">
          {scheme.howToApply.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
      <div className="mt-8 rounded-2xl bg-accent px-4 py-4 text-accent-foreground">
        <h2 className="font-heading text-xl">Before you pay anyone</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6">
          {scheme.watchouts.map((item) => (
            <li key={item}>{item}</li>
          ))}
          <li>
            Rates, crops, and state participation change. The official page is
            the one that counts.
          </li>
        </ul>
      </div>

      {related.length > 0 ? (
        <div className="mt-12">
          <h2 className="font-heading text-2xl">Nearby in the register</h2>
          <ul className="mt-4 grid gap-4">
            {related.map((item) => (
              <li key={item.slug}>
                <SchemeCard scheme={item} />
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
