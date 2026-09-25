import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchForm({
  defaultQuery = "",
  category,
  compact = false,
}: {
  defaultQuery?: string
  category?: string
  compact?: boolean
}) {
  return (
    <form action="/schemes" className="flex w-full flex-col gap-2 sm:flex-row">
      {category ? <input type="hidden" name="category" value={category} /> : null}
      <label className="sr-only" htmlFor={compact ? "scheme-search" : "home-search"}>
        Search schemes
      </label>
      <Input
        id={compact ? "scheme-search" : "home-search"}
        name="q"
        defaultValue={defaultQuery}
        placeholder="Try PM-KISAN, drip, honey, pension, solar pump"
        className="h-11 flex-1 bg-card px-3 text-base md:text-sm"
      />
      <Button type="submit" size="lg" className="h-11 px-4">
        <Search />
        Search
      </Button>
    </form>
  )
}
