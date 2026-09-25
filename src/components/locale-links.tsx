"use client"

import { useEffect } from "react"

import type { Lang } from "@/lib/language"

export function LocaleLinks({ lang }: { lang: Lang }) {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }
      const anchor = (event.target as Element | null)?.closest?.("a")
      if (!anchor) return
      const raw = anchor.getAttribute("href")
      if (!raw || raw.startsWith("#") || raw.startsWith("mailto:") || raw.startsWith("tel:")) return
      const url = new URL(raw, window.location.origin)
      if (url.origin !== window.location.origin) return
      if (lang === "hi") url.searchParams.set("lang", "hi")
      else url.searchParams.delete("lang")
      const next = url.pathname + url.search + url.hash
      if (next === raw) return
      event.preventDefault()
      event.stopPropagation()
      window.location.assign(next)
    }

    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [lang])

  return null
}
