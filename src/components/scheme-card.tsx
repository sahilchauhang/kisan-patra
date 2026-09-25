import Link from "next/link"

import { categoryLabel } from "@/data/categories"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { t } from "@/lib/copy"
import type { Lang } from "@/lib/language"
import { localizeScheme } from "@/lib/localize"
import type { Scheme } from "@/lib/types"

export function SchemeCard({ scheme, lang }: { scheme: Scheme; lang: Lang }) {
  const text = t(lang)
  const view = localizeScheme(scheme, lang)
  const listLabel = {
    "ministry-2026": text.listMinistry,
    allied: text.listAllied,
    platform: text.listPlatform,
    state: text.placeHaryana,
  } as const

  return (
    <Link href={`/schemes/${scheme.slug}`} className="group block h-full">
      <Card className="h-full gap-3 transition-shadow group-hover:shadow-md group-focus-visible:ring-2">
        <div className="flex items-start justify-between gap-3 px-(--card-spacing)">
          <Badge variant="secondary">{categoryLabel(scheme.category, lang)}</Badge>
          <span className="text-right text-sm font-medium text-primary">
            {view.highlight}
          </span>
        </div>
        <div className="px-(--card-spacing)">
          <h2 className="font-heading text-xl leading-snug text-foreground group-hover:text-primary">
            {lang === "hi" ? scheme.localName : scheme.shortName}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {lang === "hi" ? scheme.shortName : scheme.name}
          </p>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-foreground/85">
            {view.summary}
          </p>
        </div>
        <p className="mt-auto px-(--card-spacing) text-xs text-muted-foreground">
          {listLabel[scheme.list]}
        </p>
      </Card>
    </Link>
  )
}
