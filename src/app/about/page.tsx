import type { Metadata } from "next"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { alliedCount, ministryListCount } from "@/data/schemes"

export const metadata: Metadata = {
  title: "Sources",
  description:
    "Where Kisan Patra’s farmer scheme register comes from, and what it leaves out.",
}

const questions = [
  {
    id: "official",
    q: "Is this a government website?",
    a: "No. Kisan Patra is an independent reading desk. Applications, payments, and corrections happen only on the official portal or at the bank, the mandi, or the district office named on each scheme.",
  },
  {
    id: "list",
    q: "Where does the list come from?",
    a: `The ${ministryListCount} agriculture schemes are the annexure the Minister of State for Agriculture and Farmers Welfare gave in a written Lok Sabha reply on 3 February 2026 (PIB release PRID 2222801). The ${alliedCount} allied entries — Kisan Credit Card, PM-KUSUM, fisheries, livestock, food processing, RKVY, and crop residue machines — come from the departments that run them. e-NAM is called out separately because it sits inside the marketing scheme and farmers search for it by name.`,
  },
  {
    id: "states",
    q: "Where are the state schemes?",
    a: "Left out on purpose. State income-support schemes are renamed and resized when governments change. A stale amount would be worse than a gap. Use myScheme, filter by your state and agriculture, and confirm with the state agriculture department.",
  },
  {
    id: "numbers",
    q: "Can I rely on the rupee figures?",
    a: "The well-known ones are tied to a public source: ₹6,000 under PM-KISAN, the PMFBY premium caps, the ₹3,000 PM-KMY pension, the MISS rate as continued for 2025–26, the FPO ceilings in the February 2026 reply, the Namo Drone Didi cap, the AgriSURE corpus, and the PMFME 35% cap. Machine and drip percentages move with guidelines and state top-ups, so those pages tell you to confirm the current rate instead of printing a number that may already be old.",
  },
  {
    id: "miss",
    q: "Why does the loan page say ₹3 lakh if the Budget said ₹5 lakh?",
    a: "Budget 2025–26 announced a higher ceiling under the Modified Interest Subvention Scheme. The Union Cabinet continuation for 2025–26, and the Reserve Bank’s operational circular for that year, kept the interest benefit at ₹3 lakh overall and ₹2 lakh when the loan is only for animals, fish, or bees. Ask the bank which ceiling is on your sanction letter.",
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-xs font-medium tracking-[0.16em] text-clay uppercase">
        How to read this register
      </p>
      <h1 className="mt-2 font-heading text-4xl sm:text-5xl">Sources</h1>
      <p className="mt-4 text-base leading-7 text-foreground/85">
        A scheme page is a briefing, written so you can walk into a bank or a
        Common Service Centre knowing what to ask. It is not the guideline, and
        it is not a promise that you will be paid.
      </p>
      <Accordion className="mt-8">
        {questions.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-base">{item.q}</AccordionTrigger>
            <AccordionContent className="text-sm leading-6 text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-10">
        <h2 className="font-heading text-2xl">Primary pages</h2>
        <ul className="mt-3 space-y-2 text-sm leading-6">
          <li>
            <a className="underline underline-offset-4" href="https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2222801">
              Lok Sabha reply, 3 February 2026, listing the agriculture schemes
            </a>
          </li>
          <li>
            <a className="underline underline-offset-4" href="https://agriwelfare.gov.in/">
              Department of Agriculture & Farmers Welfare
            </a>
          </li>
          <li>
            <a className="underline underline-offset-4" href="https://pmkisan.gov.in/">
              PM-KISAN
            </a>
          </li>
          <li>
            <a className="underline underline-offset-4" href="https://pmfby.gov.in/">
              PM Fasal Bima Yojana
            </a>
          </li>
          <li>
            <a className="underline underline-offset-4" href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2131989">
              Cabinet continuation of the interest subvention scheme, 28 May 2025
            </a>
          </li>
          <li>
            <a className="underline underline-offset-4" href="https://www.myscheme.gov.in/">
              myScheme, for state and central schemes together
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
