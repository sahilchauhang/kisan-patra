import Link from "next/link"
import type { Lang } from "@/lib/language"
import type { FarmerNotice } from "@/lib/types"
import { schemes } from "@/data/schemes"
import { farmerNotices } from "@/data/notices"
import { currentNotices } from "@/lib/policy"

export function NoticeCard({ notice, lang }: { notice: FarmerNotice; lang: Lang }) {
  return <article id={notice.id} className="rounded-2xl border border-border bg-card p-5">
    <p className="text-xs text-muted-foreground">{lang === "hi" ? "प्रकाशित" : "Published"}: <time dateTime={notice.publishedOn}>{notice.publishedOn}</time></p>
    <h3 className="mt-2 font-heading text-2xl">{notice.title[lang]}</h3>
    <p className="mt-2 text-sm leading-6">{notice.body[lang]}</p>
    <p className="mt-2 text-sm text-muted-foreground">{notice.audience[lang]}</p>
    <p className="mt-3 font-medium">{notice.action[lang]}</p>
    {notice.effectiveOn && <p className="mt-2 text-sm">{lang === "hi" ? "लागू होने की तारीख" : "Effective from"}: {notice.effectiveOn}</p>}
    {notice.deadline && <p className="mt-2 text-sm">{lang === "hi" ? "अंतिम तारीख" : "Deadline"}: {notice.deadline} ({lang === "hi" ? "भारतीय समय" : "India time"})</p>}
    <ul className="mt-3 space-y-2 text-sm">{notice.evidence.map((source) => <li key={source.url}><a className="text-primary underline underline-offset-4" href={source.url} target="_blank" rel="noreferrer">{source.title[lang]}</a><span className="ml-2 text-muted-foreground">{lang === "hi" ? "स्रोत जाँचा" : "Checked"}: {source.retrievedOn}</span></li>)}</ul>
    <div className="mt-3 flex flex-wrap gap-3">{notice.schemeSlugs.map((slug) => {
      const scheme = schemes.find((item) => item.slug === slug)
      return scheme ? <Link key={slug} className="text-sm text-primary underline underline-offset-4" href={`/schemes/${slug}`}>{lang === "hi" ? scheme.localName : scheme.shortName}</Link> : null
    })}</div>
  </article>
}

export function UpdatesPreview({ lang }: { lang: Lang }) {
  const notices = currentNotices(farmerNotices).slice(0, 3)
  return <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6" aria-labelledby="updates-heading">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 id="updates-heading" className="font-heading text-2xl">{lang === "hi" ? "किसानों के लिए नई सूचनाएँ" : "Farmer updates"}</h2>
      <Link href="/updates" className="text-sm font-semibold text-primary underline underline-offset-4">{lang === "hi" ? "सभी सूचनाएँ और पुरालेख" : "All updates and archive"}</Link>
    </div>
    {notices.length ? <div className="mt-4 grid gap-4 md:grid-cols-3">{notices.map((notice) => <NoticeCard key={notice.id} notice={notice} lang={lang} />)}</div> : <p className="mt-2 text-sm text-muted-foreground">{lang === "hi" ? "अभी यहाँ कोई नई सत्यापित सूचना प्रकाशित नहीं है।" : "No new verified notices have been published here yet."}</p>}
  </section>
}
