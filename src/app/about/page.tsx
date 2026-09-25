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
