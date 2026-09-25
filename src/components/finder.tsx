"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"

import { activities, activityLabel } from "@/data/categories"
import { stateName, states } from "@/data/states"
import { SchemeCard } from "@/components/scheme-card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { matchSchemes, type MatchReason, type SchemeMatch } from "@/lib/schemes"
import { setVisitorProfile } from "@/lib/visitor-state"
import type { Lang } from "@/lib/language"
import type { ActivityId, AgeAnswer, HoldingAnswer, LandAnswer } from "@/lib/types"

const SESSION_KEY = "kisan-finder-v1"
const PREVIEW_COUNT = 5
const COMMON_ACTIVITIES = new Set<ActivityId>(["crops", "horticulture", "livestock", "fisheries", "bees", "organic"])

const ui = {
  en: {
    step: (n: number) => `Step ${n} of 2`,
    firstTitle: "Start with your state and work",
    firstHint: "Choose a state. Select every kind of farm work that applies; you can leave work blank.",
    state: "Where do you farm?",
    statePlaceholder: "Choose a state",
    unsure: "I’m not sure",
    work: "What kind of work do you do?",
    workHint: "Choose all that apply. This helps bring the closest schemes to the top.",
    showAllWork: "Show all work types",
    showLessWork: "Show fewer work types",
    detailsTitle: "A few details can narrow the list",
    detailsHint: "These answers are optional. Leave anything blank if you don’t know it.",
    land: "Do you own or cultivate farm land?",
    landOptions: ["I own the land", "I cultivate someone else’s land", "I don’t cultivate land", "Not sure"] as const,
    holding: "How much land do you own?",
    holdingOptions: ["2 hectares or less", "More than 2 hectares", "Not sure"] as const,
    age: "Your age",
    ageOptions: ["Under 18", "18–40", "41–59", "60 or older"] as const,
    shg: "I’m part of a women’s self help group, or my group is looking for schemes.",
    submit: "Show matching schemes",
    edit: "Edit answers",
    shortlistTitle: "Your shortlist will appear here",
    shortlistBody: "Choose your state and, if you like, your work. Then see schemes that may fit.",
    mayFit: (n: number) => `${n} schemes may fit your answers. Check each scheme’s page before applying; a match does not confirm eligibility.`,
    reasons: "Why it may fit",
    eligibilityLand: "Land eligibility is still to check.",
    eligibilityAge: "Age eligibility is still to check.",
    eligibilityHolding: "The exact landholding limit is still to check.",
    more: (n: number) => `Show ${n} more schemes`,
    less: "Show fewer schemes",
    apply: "Apply yourself",
    group: "Apply as a group or business",
    stateChannel: "Ask your state agriculture office",
    noneTitle: "No close matches found",
    noneBody: "Try changing your answers, or browse the full scheme register. The listed schemes and application windows can change.",
    register: "Browse all schemes",
  },
  hi: {
    step: (n: number) => `चरण ${n} / 2`,
    firstTitle: "राज्य और खेती के काम से शुरू करें",
    firstHint: "राज्य चुनें। खेती के जो काम लागू हों, वे चुनें; काम का सवाल खाली छोड़ सकते हैं।",
    state: "आप किस राज्य में खेती करते हैं?",
    statePlaceholder: "राज्य चुनें",
    unsure: "पक्का नहीं",
    work: "आप कौन से काम करते हैं?",
    workHint: "जितने लागू हों चुनें। इससे मिलती-जुलती योजनाएँ ऊपर आएँगी।",
    showAllWork: "खेती के सभी काम दिखाएँ",
    showLessWork: "कम काम दिखाएँ",
    detailsTitle: "कुछ और जवाब सूची छोटी कर सकते हैं",
    detailsHint: "ये सवाल ज़रूरी नहीं हैं। जानकारी न हो तो खाली छोड़ दें।",
    land: "क्या खेती की ज़मीन आपकी है या आप उसे जोतते हैं?",
    landOptions: ["ज़मीन मेरे नाम है", "दूसरे की ज़मीन जोतता/जोतती हूँ", "मैं ज़मीन नहीं जोतता/जोतती", "पक्का नहीं"] as const,
    holding: "आपके नाम कितनी ज़मीन है?",
    holdingOptions: ["2 हेक्टेयर या कम", "2 हेक्टेयर से ज़्यादा", "पक्का नहीं"] as const,
    age: "आपकी उम्र",
    ageOptions: ["18 से कम", "18–40", "41–59", "60 या ज़्यादा"] as const,
    shg: "मैं महिला स्वयं सहायता समूह में हूँ, या मेरा समूह योजनाएँ ढूँढ रहा है।",
    submit: "मिलती योजनाएँ देखें",
    edit: "जवाब बदलें",
    shortlistTitle: "आपकी चुनी हुई योजनाएँ यहाँ दिखेंगी",
    shortlistBody: "राज्य चुनें और चाहें तो खेती के काम भी चुनें। फिर संभावित योजनाएँ देखें।",
    mayFit: (n: number) => `${n} योजनाएँ आपके जवाबों से मेल खा सकती हैं। आवेदन से पहले योजना का पन्ना पढ़ें; मेल का मतलब पात्रता की पुष्टि नहीं है।`,
    reasons: "यह क्यों मेल खा सकती है",
    eligibilityLand: "ज़मीन की पात्रता की पुष्टि अभी करनी है।",
    eligibilityAge: "उम्र की पात्रता की पुष्टि अभी करनी है।",
    eligibilityHolding: "ज़मीन के रकबे की सीमा की पुष्टि अभी करनी है।",
    more: (n: number) => `${n} और योजनाएँ दिखाएँ`,
    less: "कम योजनाएँ दिखाएँ",
    apply: "खुद आवेदन करें",
    group: "समूह या कारोबार के रूप में आवेदन करें",
    stateChannel: "राज्य कृषि दफ़्तर से पूछें",
    noneTitle: "करीबी मेल नहीं मिला",
    noneBody: "जवाब बदलकर देखें या सभी योजनाएँ खोलें। योजनाएँ और आवेदन की तारीखें बदल सकती हैं।",
    register: "सभी योजनाएँ देखें",
  },
} as const

const reasonCopy: Record<Lang, Record<string, string>> = {
  en: {
    overlap: "Matches the farm work you selected.",
    coreGeneral: "A general farmer scheme that may be useful alongside work specific schemes.",
    core: "A broad scheme many farm households can start by checking.",
    owner: "The scheme asks for land ownership.",
    cultivator: "The scheme is for cultivators; tenant farmers may qualify where permitted.",
    unsureLand: "Land details are unknown; confirm the records before applying.",
    small: "The selected holding size fits the scheme’s small farmer limit.",
    age: "The selected age range fits the scheme’s stated age limit.",
    ageUncertain: "Your age range partly overlaps the scheme limit; check your exact age.",
    shg: "This scheme is intended for women’s self help groups.",
    group: "Support goes to a group or project, not as an individual instalment.",
    startup: "This route is for a business or processing unit.",
    throughState: "The state opens this scheme; ask the state department about applications.",
    open: "Your answers fit the listed criteria; check the scheme page for current dates.",
  },
  hi: {
    overlap: "आपके चुने खेती के काम से मेल है।",
    coreGeneral: "काम से जुड़ी योजनाओं के साथ यह आम किसान योजना भी देख सकते हैं।",
    core: "कई किसान परिवार इस आम योजना की जानकारी पहले ले सकते हैं।",
    owner: "योजना में ज़मीन का मालिक होना ज़रूरी है।",
    cultivator: "योजना खेती करने वालों के लिए है; नियम मानें तो बटाईदार भी आ सकते हैं।",
    unsureLand: "ज़मीन की जानकारी पक्की नहीं है; आवेदन से पहले रिकॉर्ड जाँचें।",
    small: "चुना हुआ रकबा योजना की छोटे किसान वाली सीमा में है।",
    age: "चुनी उम्र योजना की बताई सीमा में है।",
    ageUncertain: "आपकी उम्र की श्रेणी योजना की सीमा से कुछ मिलती है; सही उम्र जाँचें।",
    shg: "यह योजना महिला स्वयं सहायता समूहों के लिए है।",
    group: "सहायता समूह या परियोजना को मिलती है, व्यक्तिगत किस्त के रूप में नहीं।",
    startup: "यह रास्ता कारोबार या प्रसंस्करण इकाई के लिए है।",
    throughState: "यह योजना राज्य खोलता है; आवेदन के लिए राज्य विभाग से पूछें।",
    open: "दर्ज शर्तें आपके जवाबों से मेल खाती हैं; मौजूदा तारीख योजना के पन्ने पर देखें।",
  },
}

function ChoiceGroup<T extends string>({
  name, label, value, options, onChange,
}: {
  name: string
  label: string
  value: T | ""
  options: readonly { id: T; label: string }[]
  onChange: (value: T) => void
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-base font-medium">{label}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const selected = value === option.id
          return (
            <label key={option.id} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm ${selected ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-muted"}`}>
              <input type="radio" name={name} className="size-4 shrink-0 accent-[var(--primary)]" checked={selected} onChange={() => onChange(option.id)} />
              <span>{option.label}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

function reasonLine(reason: MatchReason, lang: Lang) {
  if (reason.code === "state") return `${lang === "hi" ? "यह " : "Available in "}${stateName(reason.stateId ?? "", lang)}${lang === "hi" ? " में चलती है।" : "."}`
  return reasonCopy[lang][reason.code] ?? reasonCopy[lang].open
}

function ResultColumn({ title, items, lang, answers }: { title: string; items: SchemeMatch[]; lang: Lang; answers: SavedFinder }) {
  if (items.length === 0) return null
  return (
    <section className="space-y-3">
      <h2 className="font-heading text-xl sm:text-2xl">{title}</h2>
      <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.scheme.slug}>
              <SchemeCard scheme={item.scheme} lang={lang} />
              <div className="mt-2 rounded-lg bg-muted/60 px-3 py-2">
                <p className="text-xs font-semibold text-foreground">{ui[lang].reasons}</p>
                <ul className="mt-1 list-inside list-disc space-y-1 text-sm leading-5 text-muted-foreground">
                  {item.reasons.slice(0, 3).map((reason, index) => <li key={`${reason.code}-${index}`}>{reasonLine(reason, lang)}</li>)}
                  {!answers.land && item.scheme.land !== "any" && <li>{ui[lang].eligibilityLand}</li>}
                  {!answers.age && item.scheme.entryAge && <li>{ui[lang].eligibilityAge}</li>}
                  {!answers.holding && item.scheme.smallMarginalOnly && <li>{ui[lang].eligibilityHolding}</li>}
                </ul>
              </div>
            </li>
          ))}
        </ul>
    </section>
  )
}

type SavedFinder = {
  state: string
  land: LandAnswer | ""
  holding: HoldingAnswer | ""
  age: AgeAnswer | ""
  womanOrShg: boolean
  selected: ActivityId[]
  submitted: boolean
  expanded: boolean
  scrollY: number
}

const emptySaved: SavedFinder = { state: "", land: "", holding: "", age: "", womanOrShg: false, selected: [], submitted: false, expanded: false, scrollY: 0 }

export function Finder({ lang }: { lang: Lang }) {
  const text = ui[lang]
  const [saved, setSaved] = useState<SavedFinder>(emptySaved)
  const [ready, setReady] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [allWorkTypes, setAllWorkTypes] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)
  const stateItems = useMemo(() => [
    ...states.map((item) => ({ id: item.id, name: stateName(item.id, lang) })),
  ], [lang])
  const detailsVisible = Boolean(saved.state)
  const answersReady = Boolean(saved.state)

  useEffect(() => {
    let restored = emptySaved
    try {
      const raw = sessionStorage.getItem(SESSION_KEY)
      if (raw) {
        restored = { ...emptySaved, ...JSON.parse(raw) } as SavedFinder
      }
    } catch {
      // A damaged or unavailable session snapshot should not block the finder.
    }
    requestAnimationFrame(() => {
      setSaved(restored)
      setExpanded(restored.expanded)
      setReady(true)
      requestAnimationFrame(() => window.scrollTo({ top: restored.scrollY, behavior: "instant" }))
    })
  }, [])

  useEffect(() => {
    if (!ready) return
    const persist = () => {
      try { sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ...saved, expanded, scrollY: window.scrollY })) } catch { /* Storage can be disabled. */ }
    }
    persist()
    window.addEventListener("scroll", persist, { passive: true })
    window.addEventListener("pagehide", persist)
    return () => { window.removeEventListener("scroll", persist); window.removeEventListener("pagehide", persist) }
  }, [saved, expanded, ready])

  const results = useMemo(() => {
    const base = {
      state: saved.state || "unsure",
      land: (saved.land || "unsure") as LandAnswer,
      holding: (saved.holding || "unsure") as HoldingAnswer,
      womanOrShg: saved.womanOrShg,
      activities: saved.selected,
    }
    if (saved.age) return matchSchemes({ ...base, age: saved.age })
    const bySlug = new Map<string, SchemeMatch>()
    for (const age of ["under-18", "18-40", "41-59", "60-plus"] as const) {
      for (const match of matchSchemes({ ...base, age })) {
        const prior = bySlug.get(match.scheme.slug)
        if (!prior || match.score > prior.score) {
          const reasons = match.reasons.filter((reason) => reason.code !== "age" && reason.code !== "ageUncertain")
          bySlug.set(match.scheme.slug, { ...match, score: match.score - (reasons.length !== match.reasons.length && match.reasons.some((reason) => reason.code === "age") ? 2 : 0), reasons })
        }
      }
    }
    return [...bySlug.values()].sort((a, b) => b.score - a.score || a.scheme.name.localeCompare(b.scheme.name))
  }, [saved])

  function update<K extends keyof SavedFinder>(key: K, value: SavedFinder[K]) {
    setSaved((current) => ({ ...current, [key]: value }))
  }

  function toggleActivity(id: ActivityId, checked: boolean) {
    update("selected", checked ? [...saved.selected, id] : saved.selected.filter((item) => item !== id))
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!answersReady) return
    setVisitorProfile({ state: saved.state || "unsure", activities: saved.selected })
    update("submitted", true)
    window.setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60)
  }

  const visible = expanded ? results : results.slice(0, PREVIEW_COUNT)
  const apply = visible.filter((item) => item.band === "apply")
  const group = visible.filter((item) => item.band === "group")
  const stateChannel = visible.filter((item) => item.band === "state")
  const hiddenCount = Math.max(0, results.length - PREVIEW_COUNT)
  const shownActivities = allWorkTypes ? activities : activities.filter((activity) => COMMON_ACTIVITIES.has(activity.id))

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-10">
      <form className="space-y-6 rounded-2xl bg-card p-4 ring-1 ring-foreground/10 sm:p-6" onSubmit={submit}>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-clay">{text.step(detailsVisible ? 2 : 1)}</p>
            {saved.submitted && <button type="button" onClick={() => update("submitted", false)} className="min-h-11 px-2 text-sm font-medium text-primary underline underline-offset-4">{text.edit}</button>}
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted" aria-label={`${text.step(detailsVisible ? 2 : 1)}`}><div className={`h-full rounded-full bg-primary transition-all ${detailsVisible ? "w-full" : "w-1/2"}`} /></div>
          <h2 className="font-heading text-xl">{detailsVisible ? text.detailsTitle : text.firstTitle}</h2>
          <p className="text-sm leading-6 text-muted-foreground">{detailsVisible ? text.detailsHint : text.firstHint}</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="finder-state" className="text-base font-medium">{text.state}</label>
          <select id="finder-state" required value={saved.state} onChange={(event) => update("state", event.target.value)} className="h-12 w-full rounded-lg border border-input bg-background px-3 text-base">
            <option value="" disabled>{text.statePlaceholder}</option>
            <option value="unsure">{text.unsure}</option>
            {stateItems.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </div>

        <fieldset className="space-y-2">
          <legend className="text-base font-medium">{text.work}</legend>
          <p className="text-sm leading-5 text-muted-foreground">{text.workHint}</p>
          <div className="grid gap-1.5">
            {shownActivities.map((activity) => (
              <label key={activity.id} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted">
                <Checkbox checked={saved.selected.includes(activity.id)} onCheckedChange={(checked) => toggleActivity(activity.id, checked === true)} className="size-5" />
                <span>{activityLabel(activity.id, lang)}</span>
              </label>
            ))}
          </div>
          {!allWorkTypes && activities.length > shownActivities.length && <button type="button" onClick={() => setAllWorkTypes(true)} className="min-h-11 w-full rounded-lg border border-border px-3 text-sm font-medium text-primary hover:bg-muted">{text.showAllWork}</button>}
          {allWorkTypes && <button type="button" onClick={() => setAllWorkTypes(false)} className="min-h-11 w-full rounded-lg border border-border px-3 text-sm font-medium text-primary hover:bg-muted">{text.showLessWork}</button>}
        </fieldset>

        {detailsVisible && <div className="space-y-5 border-t border-border pt-5">
          <ChoiceGroup name="land" label={text.land} value={saved.land} options={[
            { id: "owner", label: text.landOptions[0] }, { id: "tenant", label: text.landOptions[1] }, { id: "none", label: text.landOptions[2] }, { id: "unsure", label: text.landOptions[3] },
          ]} onChange={(value) => { update("land", value); if (value !== "owner") update("holding", "") }} />
          {saved.land === "owner" && <ChoiceGroup name="holding" label={text.holding} value={saved.holding} options={[
            { id: "small", label: text.holdingOptions[0] }, { id: "larger", label: text.holdingOptions[1] }, { id: "unsure", label: text.holdingOptions[2] },
          ]} onChange={(value) => update("holding", value)} />}
          <ChoiceGroup name="age" label={text.age} value={saved.age} options={[
            { id: "under-18", label: text.ageOptions[0] }, { id: "18-40", label: text.ageOptions[1] }, { id: "41-59", label: text.ageOptions[2] }, { id: "60-plus", label: text.ageOptions[3] },
          ]} onChange={(value) => update("age", value)} />
          <label className="flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm leading-5">
            <Checkbox checked={saved.womanOrShg} onCheckedChange={(checked) => update("womanOrShg", checked === true)} className="mt-0.5 size-5" />
            <span>{text.shg}</span>
          </label>
        </div>}

        <Button type="submit" size="lg" disabled={!answersReady} className="h-12 w-full text-base">{text.submit}</Button>
      </form>

      <div ref={resultsRef} className="scroll-mt-20 space-y-8" aria-live="polite">
        {!saved.submitted ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/70 px-5 py-10">
            <h2 className="font-heading text-2xl">{text.shortlistTitle}</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{text.shortlistBody}</p>
          </div>
        ) : results.length === 0 ? (
          <div className="rounded-2xl bg-card px-5 py-8 ring-1 ring-foreground/10">
            <h2 className="font-heading text-2xl">{text.noneTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{text.noneBody}</p>
            <Link href="/schemes" className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-primary underline-offset-4 hover:underline">{text.register}</Link>
          </div>
        ) : (
          <>
            <p className="text-sm leading-6 text-muted-foreground">{text.mayFit(results.length)}</p>
            <ResultColumn title={text.apply} items={apply} lang={lang} answers={saved} />
            <ResultColumn title={text.group} items={group} lang={lang} answers={saved} />
            <ResultColumn title={text.stateChannel} items={stateChannel} lang={lang} answers={saved} />
            {hiddenCount > 0 && <button type="button" className="min-h-12 w-full rounded-xl border border-border bg-card px-4 text-sm font-medium text-primary hover:bg-muted" onClick={() => setExpanded((value) => !value)}>{expanded ? text.less : text.more(hiddenCount)}</button>}
          </>
        )}
      </div>
    </div>
  )
}
