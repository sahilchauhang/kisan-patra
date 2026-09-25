import Link from "next/link"

import { categoryLabel } from "@/data/categories"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import type { Scheme } from "@/lib/types"

const listLabel = {
  "ministry-2026": "Ministry list",
  allied: "Allied programme",
  platform: "Trading platform",
} as const

export function SchemeCard({ scheme }: { scheme: Scheme }) {
  return (
    <Link href={`/schemes/${scheme.slug}`} className="group block h-full">
      <Card className="h-full gap-3 transition-shadow group-hover:shadow-md group-focus-visible:ring-2">
        <div className="flex items-start justify-between gap-3 px-(--card-spacing)">
          <Badge variant="secondary">{categoryLabel(scheme.category)}</Badge>
          <span className="text-right text-sm font-medium text-primary">
            {scheme.highlight}
          </span>
        </div>
        <div className="px-(--card-spacing)">
          <h2 className="font-heading text-xl leading-snug text-foreground group-hover:text-primary">
            {scheme.shortName}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{scheme.name}</p>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-foreground/85">
            {scheme.summary}
          </p>
        </div>
        <p className="mt-auto px-(--card-spacing) text-xs tracking-wide text-muted-foreground uppercase">
          {listLabel[scheme.list]}
        </p>
      </Card>
    </Link>
  )
}
