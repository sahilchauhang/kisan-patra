"use client"

import { useEffect, useState } from "react"
import type { FinderAnswers } from "@/lib/types"

export const VISITOR_STORAGE_KEY = "kisan-patra:visitor:v1"

export type VisitorState = {
  saved: string[]
  recent: string[]
  profile: Partial<FinderAnswers>
}

const emptyState = (): VisitorState => ({ saved: [], recent: [], profile: {} })
const eventName = "kisan-patra:visitor-state"

function normalize(value: unknown): VisitorState {
  if (!value || typeof value !== "object") return emptyState()
  const data = value as Partial<VisitorState>
  return {
    saved: Array.isArray(data.saved) ? [...new Set(data.saved.filter((x): x is string => typeof x === "string"))] : [],
    recent: Array.isArray(data.recent) ? [...new Set(data.recent.filter((x): x is string => typeof x === "string"))].slice(0, 8) : [],
    profile: sanitizeProfile(data.profile),
  }
}

function sanitizeProfile(value: unknown): Partial<FinderAnswers> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {}
  const input = value as Record<string, unknown>
  const profile: Partial<FinderAnswers> = {}
  if (typeof input.state === "string" && input.state.length < 60) profile.state = input.state
  if (["owner", "tenant", "none", "unsure"].includes(String(input.land))) profile.land = input.land as FinderAnswers["land"]
  if (["small", "larger", "unsure"].includes(String(input.holding))) profile.holding = input.holding as FinderAnswers["holding"]
  if (["under-18", "18-40", "41-59", "60-plus"].includes(String(input.age))) profile.age = input.age as FinderAnswers["age"]
  if (typeof input.womanOrShg === "boolean") profile.womanOrShg = input.womanOrShg
  if (Array.isArray(input.activities)) {
    const known = ["crops", "horticulture", "livestock", "fisheries", "bees", "organic", "oil-palm", "oilseeds", "bamboo", "processing", "fpo", "irrigation", "machines", "marketing"]
    profile.activities = input.activities.filter((item): item is FinderAnswers["activities"][number] => typeof item === "string" && known.includes(item))
  }
  return profile
}

export function readVisitorState(): VisitorState {
  if (typeof window === "undefined") return emptyState()
  try {
    return normalize(JSON.parse(window.localStorage.getItem(VISITOR_STORAGE_KEY) ?? "null"))
  } catch {
    return emptyState()
  }
}

function writeVisitorState(state: VisitorState) {
  if (typeof window === "undefined") return state
  try {
    window.localStorage.setItem(VISITOR_STORAGE_KEY, JSON.stringify(state))
    window.dispatchEvent(new Event(eventName))
  } catch {
    // Private browsing or storage limits should not break scheme browsing.
  }
  return state
}

export function toggleSavedScheme(slug: string) {
  const state = readVisitorState()
  const saved = state.saved.includes(slug)
    ? state.saved.filter((item) => item !== slug)
    : [slug, ...state.saved]
  return writeVisitorState({ ...state, saved })
}

export function clearSavedSchemes() {
  const state = readVisitorState()
  return writeVisitorState({ ...state, saved: [] })
}

export function recordRecentScheme(slug: string) {
  const state = readVisitorState()
  return writeVisitorState({ ...state, recent: [slug, ...state.recent.filter((item) => item !== slug)].slice(0, 8) })
}

export function setVisitorProfile(profile: Partial<FinderAnswers>) {
  const state = readVisitorState()
  return writeVisitorState({ ...state, profile: { ...state.profile, ...profile } })
}

export function useVisitorState() {
  const [state, setState] = useState<VisitorState>(emptyState)
  useEffect(() => {
    const refresh = () => setState(readVisitorState())
    refresh()
    window.addEventListener(eventName, refresh)
    window.addEventListener("storage", refresh)
    return () => {
      window.removeEventListener(eventName, refresh)
      window.removeEventListener("storage", refresh)
    }
  }, [])
  return state
}
