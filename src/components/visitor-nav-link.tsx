"use client"

import Link from "next/link"
import { Bookmark } from "lucide-react"

import type { Lang } from "@/lib/language"
import { t } from "@/lib/copy"
import { useVisitorState } from "@/lib/visitor-state"

export function VisitorNavLink({ lang }: { lang: Lang }) {
  const { saved } = useVisitorState()
  return <Link href="/saved" className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground"><Bookmark className="size-4" />{t(lang).navSaved}{saved.length > 0 && <span className="rounded-full bg-accent px-1.5 text-[11px] text-accent-foreground">{saved.length}</span>}</Link>
}
