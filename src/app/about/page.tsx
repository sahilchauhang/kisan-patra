import type { Metadata } from "next"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { eyebrowClass, t } from "@/lib/copy"
import { getLang } from "@/lib/language"

export const metadata: Metadata = {
  title: "Sources",
  description:
    "Where Kisan Patra’s farmer scheme register comes from, and which state lists are included.",
}

const links = [
  {
    key: "pib" as const,
    href: "https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2222801",
  },
  { key: "ministry" as const, href: "https://agriwelfare.gov.in/" },
  { key: "pmkisan" as const, href: "https://pmkisan.gov.in/" },
  { key: "pmfby" as const, href: "https://pmfby.gov.in/" },
  {
    key: "cabinet" as const,
    href: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2131989",
  },
  { key: "haryana" as const, href: "https://fasal.haryana.gov.in/" },
  { key: "myscheme" as const, href: "https://www.myscheme.gov.in/" },
]

export default async function AboutPage() {
  const lang = await getLang()
  const text = t(lang)
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <p className={eyebrowClass(lang)}>{text.aboutEyebrow}</p>
      <h1 className="mt-2 font-heading text-4xl sm:text-5xl">{text.aboutTitle}</h1>
      <p className="mt-4 text-base leading-7 text-foreground/85">{text.aboutLead}</p>
      <section className="mt-6 rounded-2xl border border-border bg-card p-4 sm:p-6">
        <h2 className="font-heading text-2xl">{lang === "hi" ? "स्रोत और सीमाएँ" : "Sources and limits"}</h2>
        <ul className="mt-3 space-y-3 text-sm leading-6 text-foreground/85">
          <li>{lang === "hi"
            ? "यह चयनित सूची है: कृषि मंत्रालय की 3 फरवरी 2026 की संसदीय सूची, कुछ अन्य केंद्रीय कार्यक्रम और हरियाणा की चुनी हुई योजनाएँ। यह सभी सरकारी योजनाओं की पूरी सूची नहीं है।"
            : "This is a selected register: the Ministry of Agriculture’s parliamentary list dated 3 February 2026, some other central programmes, and selected Haryana schemes. It is not a complete list of every government scheme."}</li>
          <li>{lang === "hi"
            ? "हर योजना पर प्रविष्टि अपडेट की तारीख और, जहाँ दर्ज हो, आधिकारिक स्रोत की जाँच की तारीख दी है। जाँच की तारीख मौजूदा पात्रता या आवेदन खुला होने की गारंटी नहीं है।"
            : "Each scheme page shows when its entry was updated and, when recorded, when its official source was checked. A check date does not confirm current eligibility or an open application window."}</li>
          <li>{lang === "hi"
            ? "आधिकारिक लिंक सूचना पन्ने या घोषणा पर जा सकता है; जरूरी नहीं कि वह आवेदन फ़ॉर्म हो। आवेदन से पहले तारीख, प्रक्रिया, पात्रता और शुल्क संबंधित विभाग से जाँचें।"
            : "An official link may lead to an information page or announcement; it may not be an application form. Confirm dates, process, eligibility, and fees with the department before applying."}</li>
          <li>{lang === "hi"
            ? "योजना का सार पढ़ने में मदद के लिए है, मंजूरी या लाभ का वादा नहीं। अंतिम नियम विभागीय अधिसूचना और स्थानीय कार्यान्वयन से तय होते हैं।"
            : "Scheme summaries are a reading aid, not an approval or promise of benefits. Department notices and local implementation set the final rules."}</li>
        </ul>
      </section>
      <Accordion className="mt-8">
        {text.faqs.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-base">{item.q}</AccordionTrigger>
            <AccordionContent className="text-sm leading-6 text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-10">
        <h2 className="font-heading text-2xl">{text.primaryPages}</h2>
        <ul className="mt-3 space-y-2 text-sm leading-6">
          {links.map((item) => (
            <li key={item.key}>
              <a className="underline underline-offset-4" href={item.href}>
                {text.links[item.key]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
