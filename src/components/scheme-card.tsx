import Link from "next/link"

import { categoryLabel } from "@/data/categories"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { t } from "@/lib/copy"
import type { Lang } from "@/lib/language"
import { localizeScheme } from "@/lib/localize"
import { SchemeStatusText } from "@/components/scheme-detail-controls"
import type { Scheme } from "@/lib/types"

export function SchemeCard({ scheme, lang }: { scheme: Scheme; lang: Lang }) {
  const text = t(lang)
  const view = localizeScheme(scheme, lang)
  const isLivestockInsurance = scheme.category === "insurance" && scheme.activities.includes("livestock")
  const category = isLivestockInsurance
    ? (lang === "hi" ? "पशुधन सहायता" : "Livestock support")
    : categoryLabel(scheme.category, lang)
  const listLabel = {
    "ministry-2026": text.listMinistry,
    allied: text.listAllied,
    platform: text.listPlatform,
    state: text.placeHaryana,
  } as const

  return (
    <Link href={`/schemes/${scheme.slug}`} className="group block h-full">
      <Card className="h-full min-h-64 gap-3 transition-shadow group-hover:shadow-md group-focus-visible:ring-2">
        <div className="flex flex-wrap items-center justify-between gap-2 px-(--card-spacing)">
          <Badge variant="secondary">{category}</Badge>
          <span className="text-sm font-semibold text-primary">{view.highlight}</span>
        </div>
        <div className="px-(--card-spacing)">
          <h2 className="font-heading text-xl leading-snug text-foreground group-hover:text-primary">
            {lang === "hi" ? scheme.localName : scheme.shortName}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {lang === "hi" ? scheme.shortName : scheme.name}
          </p>
        </div>
        <div className="grid gap-3 px-(--card-spacing) text-sm">
          <p className="leading-5"><span className="font-semibold">{lang === "hi" ? "मुख्य लाभ: " : "Benefit: "}</span>{view.whatYouGet[0]}</p>
          <p className="line-clamp-2 leading-5 text-muted-foreground"><span className="font-semibold text-foreground">{lang === "hi" ? "किसके लिए: " : "For: "}</span>{view.whoCanApply[0]}</p>
          <p className="line-clamp-2 rounded-lg bg-muted/60 px-3 py-2 leading-5"><span className="font-semibold">{lang === "hi" ? "स्थिति: " : "Status: "}</span><SchemeStatusText scheme={scheme} lang={lang} /></p>
        </div>
        <p className="px-(--card-spacing) text-sm leading-5 text-muted-foreground line-clamp-2">{view.summary}</p>
        <div className="mt-auto flex min-h-11 items-center justify-between gap-3 px-(--card-spacing) text-xs text-muted-foreground">
          <span>{listLabel[scheme.list]}</span>
          <span className="shrink-0 font-semibold text-primary">{lang === "hi" ? "विवरण पढ़ें →" : "Read details →"}</span>
        </div>
      </Card>
    </Link>
  )
}
