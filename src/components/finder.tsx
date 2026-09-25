"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

import { activities, activityLabel } from "@/data/categories"
import { stateName, states } from "@/data/states"
import { SchemeCard } from "@/components/scheme-card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { t } from "@/lib/copy"
import type { Lang } from "@/lib/language"
import { matchSchemes, type MatchReason, type SchemeMatch } from "@/lib/schemes"
import type {
  ActivityId,
  AgeAnswer,
  HoldingAnswer,
  LandAnswer,
} from "@/lib/types"

function reasonLine(reason: MatchReason, lang: Lang) {
  const reasons = t(lang).reasons
  if (reason.code === "state") {
    return reasons.state(stateName(reason.stateId ?? "", lang))
  }
  return reasons[reason.code]
}

function ChoiceGroup<T extends string>({
  name,
  label,
  value,
  options,
  onChange,
}: {
  name: string
  label: string
  value: T
  options: { id: T; label: string }[]
  onChange: (value: T) => void
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium">{label}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const selected = value === option.id
          return (
            <label
              key={option.id}
              className={`flex cursor-pointer items-start gap-2 rounded-lg border px-3 py-3 text-sm ${
                selected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:bg-muted"
              }`}
            >
              <input
                type="radio"
                name={name}
                className="mt-0.5 accent-[var(--primary)]"
                checked={selected}
                onChange={() => onChange(option.id)}
              />
              <span>{option.label}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

function ResultColumn({
  title,
  empty,
  items,
  lang,
}: {
  title: string
  empty: string
  items: SchemeMatch[]
  lang: Lang
}) {
  return (
    <section className="space-y-3">
      <h2 className="font-heading text-2xl">{title}</h2>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">{empty}</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.scheme.slug} className="space-y-2">
              <SchemeCard scheme={item.scheme} lang={lang} />
              <p className="px-1 text-sm leading-6 text-muted-foreground">
                {item.reasons[0] ? reasonLine(item.reasons[0], lang) : null}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export function Finder({ lang }: { lang: Lang }) {
  const text = t(lang)
  const [state, setState] = useState("unsure")
  const [land, setLand] = useState<LandAnswer>("owner")
  const [holding, setHolding] = useState<HoldingAnswer>("small")
  const [age, setAge] = useState<AgeAnswer>("18-40")
  const [womanOrShg, setWomanOrShg] = useState(false)
  const [selected, setSelected] = useState<ActivityId[]>([])
  const [submitted, setSubmitted] = useState(false)

  const stateItems: Record<string, string> = { unsure: text.notSure }
  for (const item of states) {
    stateItems[item.id] = stateName(item.id, lang)
  }

  const landOptions: { id: LandAnswer; label: string }[] = [
    { id: "owner", label: text.landOwner },
    { id: "tenant", label: text.landTenant },
    { id: "none", label: text.landNone },
    { id: "unsure", label: text.landUnsure },
  ]

  const holdingOptions: { id: HoldingAnswer; label: string }[] = [
    { id: "small", label: text.holdingSmall },
    { id: "larger", label: text.holdingLarger },
    { id: "unsure", label: text.holdingUnsure },
  ]

  const ageOptions: { id: AgeAnswer; label: string }[] = [
    { id: "under-18", label: text.ageUnder },
    { id: "18-40", label: text.ageYoung },
    { id: "41-59", label: text.ageMid },
    { id: "60-plus", label: text.ageOld },
  ]

  const results = useMemo(
    () =>
      matchSchemes({
        state,
        land,
        holding,
        age,
        womanOrShg,
        activities: selected,
      }),
    [state, land, holding, age, womanOrShg, selected]
  )

  function toggleActivity(id: ActivityId, checked: boolean) {
    setSelected((current) =>
      checked ? [...current, id] : current.filter((item) => item !== id)
    )
  }

  const apply = results.filter((item) => item.band === "apply")
  const group = results.filter((item) => item.band === "group")
  const stateChannel = results.filter((item) => item.band === "state")

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr]">
      <form
        className="space-y-6 rounded-2xl bg-card p-4 ring-1 ring-foreground/10 sm:p-5 lg:sticky lg:top-20 lg:self-start"
        onSubmit={(event) => {
          event.preventDefault()
          setSubmitted(true)
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="state">{text.stateLabel}</Label>
          <Select
            items={stateItems}
            value={state}
            onValueChange={(value) => setState(value ?? "unsure")}
          >
            <SelectTrigger id="state" className="h-11 w-full bg-background">
              <SelectValue placeholder={text.statePlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unsure">{text.notSure}</SelectItem>
              {states.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {stateName(item.id, lang)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ChoiceGroup
          name="land"
          label={text.land}
          value={land}
          options={landOptions}
          onChange={setLand}
        />

        {land === "owner" ? (
          <ChoiceGroup
            name="holding"
            label={text.holding}
            value={holding}
            options={holdingOptions}
            onChange={setHolding}
          />
        ) : null}

        <ChoiceGroup name="age" label={text.age} value={age} options={ageOptions} onChange={setAge} />

        <label className="flex items-start gap-3 rounded-lg border border-border bg-background px-3 py-3 text-sm">
          <Checkbox
            checked={womanOrShg}
            onCheckedChange={(checked) => setWomanOrShg(checked === true)}
            className="mt-0.5"
          />
          <span>{text.shg}</span>
        </label>

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium">{text.work}</legend>
          <p className="text-xs leading-5 text-muted-foreground">{text.workHint}</p>
          <div className="grid gap-2">
            {activities.map((activity) => (
              <label key={activity.id} className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={selected.includes(activity.id)}
                  onCheckedChange={(checked) =>
                    toggleActivity(activity.id, checked === true)
                  }
                />
                {activityLabel(activity.id, lang)}
              </label>
            ))}
          </div>
        </fieldset>

        <Button type="submit" size="lg" className="h-11 w-full">
          {text.showSchemes}
        </Button>
      </form>

      <div className="space-y-8">
        {!submitted ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/70 px-5 py-10">
            <h2 className="font-heading text-2xl">{text.shortlistTitle}</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              {text.shortlistBody}
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="rounded-2xl bg-card px-5 py-8 ring-1 ring-foreground/10">
            <h2 className="font-heading text-2xl">{text.noneTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{text.noneBody}</p>
            <Link
              href="/schemes"
              className="mt-4 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              {text.openRegister}
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">{text.mayFit(results.length)}</p>
            <ResultColumn
              title={text.bandApply}
              empty={text.bandApplyEmpty}
              items={apply}
              lang={lang}
            />
            <ResultColumn
              title={text.bandGroup}
              empty={text.bandGroupEmpty}
              items={group}
              lang={lang}
            />
            <ResultColumn
              title={text.bandState}
              empty={text.bandStateEmpty}
              items={stateChannel}
              lang={lang}
            />
          </>
        )}
      </div>
    </div>
  )
}
