"use client"

import type { Lang } from "@/lib/language"
import { cn } from "cn"

const languageCookie = "lang"

export function LanguageToggle({ lang }: { lang: Lang }) {
  function choose(next: Lang) {
    if (next === lang) return
    document.cookie = `${languageCookie}=${next}; Path=/; Max-Age=31536000; SameSite=Lax`
    const url = new URL(window.location.href)
    if (next === "hi") url.searchParams.set("lang", "hi")
    else url.searchParams.delete("lang")
    window.location.assign(url.pathname + url.search + url.hash)
  }

  return (
    <div
      role="group"
      aria-label={lang === "hi" ? "भाषा" : "Language"}
      className="flex shrink-0 rounded-lg bg-card p-0.5 ring-1 ring-foreground/15"
    >
      <LangButton active={lang === "en"} onClick={() => choose("en")}>
        English
      </LangButton>
      <LangButton active={lang === "hi"} onClick={() => choose("hi")}>
        हिंदी
      </LangButton>
    </div>
  )
}

function LangButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-md px-2.5 py-1.5 text-sm font-medium",
        active
          ? "bg-primary text-primary-foreground"
          : "text-foreground/75 hover:bg-muted hover:text-foreground"
      )}
    >
      {children}
    </button>
  )
}
