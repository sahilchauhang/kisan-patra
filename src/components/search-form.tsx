import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { t } from "@/lib/copy"
import type { Lang } from "@/lib/language"

export function SearchForm({
  lang,
  defaultQuery = "",
  category,
  place,
  compact = false,
}: {
  lang: Lang
  defaultQuery?: string
  category?: string
  place?: string
  compact?: boolean
}) {
  const text = t(lang)
  return (
    <form action="/schemes" className="flex w-full flex-col gap-2 sm:flex-row">
      {category ? <input type="hidden" name="category" value={category} /> : null}
      {place === "haryana" ? <input type="hidden" name="place" value="haryana" /> : null}
      {lang === "en" ? <input type="hidden" name="lang" value="en" /> : null}
      <label className="sr-only" htmlFor={compact ? "scheme-search" : "home-search"}>
        {text.searchLabel}
      </label>
      <Input
        id={compact ? "scheme-search" : "home-search"}
        name="q"
        defaultValue={defaultQuery}
        placeholder={text.searchPlaceholder}
        className="h-11 flex-1 bg-card px-3 text-base md:text-sm"
      />
      <Button type="submit" size="lg" className="h-11 px-4">
        <Search />
        {text.searchButton}
      </Button>
    </form>
  )
}
