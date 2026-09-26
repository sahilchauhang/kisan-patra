import type { Metadata } from "next"
import { NoticeCard } from "@/components/farmer-updates"
import { farmerNotices } from "@/data/notices"
import { getLang } from "@/lib/language"
import { currentNotices, indiaDay, isCurrentNotice } from "@/lib/policy"

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getLang()) === "hi" ? "किसान सूचनाएँ और पुरालेख" : "Farmer updates and archive" }
}

export default async function UpdatesPage() {
  const lang = await getLang()
  const now = new Date()
  const current = currentNotices(farmerNotices, now)
  const archive = farmerNotices.filter((notice) => notice.publishedOn <= indiaDay(now) && !isCurrentNotice(notice, now)).sort((a, b) => b.publishedOn.localeCompare(a.publishedOn))
  return <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
    <h1 className="font-heading text-4xl">{lang === "hi" ? "किसानों के लिए नई सूचनाएँ" : "Farmer updates"}</h1>
    <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">{lang === "hi" ? "पंजीकरण, खरीद, राहत और प्रशिक्षण की आधिकारिक सूचनाएँ। आवेदन से पहले संबंधित विभाग से तारीख और पात्रता की पुष्टि करें। यहाँ सभी सरकारी घोषणाएँ शामिल होने का दावा नहीं है।" : "Official notices about registration, procurement, relief and training. Confirm dates and eligibility with the department before applying. This is a selected collection, not every government announcement."}</p>
    <h2 className="mt-8 font-heading text-2xl">{lang === "hi" ? "मौजूदा सूचनाएँ" : "Current notices"}</h2>
    <div className="mt-4 grid gap-4">{current.length ? current.map((notice) => <NoticeCard key={notice.id} notice={notice} lang={lang} />) : <p className="rounded-2xl border border-border p-5 text-muted-foreground">{lang === "hi" ? "अभी कोई नई सत्यापित सूचना प्रकाशित नहीं है। योजनाएँ देखने के लिए योजना सूची खोलें।" : "No new verified notices have been published yet. You can still explore the scheme catalogue."}</p>}</div>
    <section id="archive" className="mt-12">
      <h2 className="font-heading text-2xl">{lang === "hi" ? "पुरालेख और आगामी सूचनाएँ" : "Archive and upcoming notices"}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{lang === "hi" ? "आवेदन अवधि समाप्त होने का अर्थ योजना बंद होना नहीं है। प्रत्येक सूचना की तारीख देखें।" : "An ended application window does not mean a programme has retired. Check the dates on each notice."}</p>
      <div className="mt-4 grid gap-4">{archive.length ? archive.map((notice) => <NoticeCard key={notice.id} notice={notice} lang={lang} />) : <p className="text-sm text-muted-foreground">{lang === "hi" ? "पुरालेख अभी खाली है।" : "The archive is empty for now."}</p>}</div>
    </section>
  </div>
}
