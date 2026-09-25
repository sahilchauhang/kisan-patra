"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { recordRecentScheme, toggleSavedScheme, useVisitorState } from "@/lib/visitor-state"
import type { Lang } from "@/lib/language"
import { schemeStatus } from "@/lib/scheme-status"
import type { Scheme } from "@/lib/types"

export function SchemeDetailControls({ slug, lang }: { slug: string; lang: Lang }) {
  const visitor = useVisitorState()
  const saved = visitor.saved.includes(slug)
  useEffect(() => {
    recordRecentScheme(slug)
  }, [slug])

  return (
    <Button type="button" variant="outline" className="min-h-11 px-4" aria-pressed={saved} onClick={() => toggleSavedScheme(slug)}>
      {saved ? (lang === "hi" ? "सहेजी योजना हटाएँ" : "Remove saved scheme") : (lang === "hi" ? "योजना सहेजें" : "Save scheme")}
    </Button>
  )
}

export function SchemeBackLink({ lang, fallbackHref }: { lang: Lang; fallbackHref: string }) {
  const [hasFinderSession, setHasFinderSession] = useState(false)
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = window.sessionStorage.getItem("kisan-finder-v1")
        setHasFinderSession(saved ? Boolean((JSON.parse(saved) as { submitted?: boolean }).submitted) : false)
      } catch {
        setHasFinderSession(false)
      }
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])
  const href = hasFinderSession ? "/finder" : fallbackHref
  return (
    <Link href={href} className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2">
      {hasFinderSession
        ? (lang === "hi" ? "खोज के नतीजों पर वापस" : "Back to finder results")
        : (lang === "hi" ? "सभी योजनाओं पर वापस" : "Back to the register")}
    </Link>
  )
}

export function SchemeStatusText({ scheme, lang, detail = false }: { scheme: Scheme; lang: Lang; detail?: boolean }) {
  const [status, setStatus] = useState(() => schemeStatus(scheme, lang))
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setStatus(schemeStatus(scheme, lang, new Date())))
    return () => window.cancelAnimationFrame(frame)
  }, [scheme, lang])
  return <>{detail ? <>{status.label}<p className="mt-2 text-sm leading-6 text-muted-foreground"><span className="font-semibold text-foreground">{lang === "hi" ? "अगला कदम: " : "Next step: "}</span>{status.nextAction}</p></> : status.label}</>
}
