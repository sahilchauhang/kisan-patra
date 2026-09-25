import Link from "next/link"

import { t } from "@/lib/copy"
import type { Lang } from "@/lib/language"
import { cn } from "cn"

export function PlaceSwitch({
  lang,
  place,
  q = "",
  category = "all",
}: {
  lang: Lang
  place: "centre" | "haryana"
  q?: string
  category?: string
}) {
  const text = t(lang)

  function href(next: "centre" | "haryana") {
    const params = new URLSearchParams()
    if (q) params.set("q", q)
    if (category && category !== "all") params.set("category", category)
    if (next === "haryana") params.set("place", "haryana")
    const query = params.toString()
    return query ? `/schemes?${query}` : "/schemes"
  }

  const options = [
    { id: "centre" as const, label: text.placeCentre },
    { id: "haryana" as const, label: text.placeHaryana },
  ]

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{text.placeLabel}</p>
      <div className="flex flex-wrap gap-2" role="group" aria-label={text.placeLabel}>
        {options.map((option) => (
          <Link
            key={option.id}
            href={href(option.id)}
            aria-current={place === option.id ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm",
              place === option.id
                ? "bg-primary text-primary-foreground"
                : "bg-card ring-1 ring-foreground/10 hover:bg-muted"
            )}
          >
            {option.label}
          </Link>
        ))}
      </div>
      <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{text.placeLead}</p>
    </div>
  )
}
