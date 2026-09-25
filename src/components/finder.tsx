"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

import { activities } from "@/data/categories"
import { states } from "@/data/states"
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
import { matchSchemes, type SchemeMatch } from "@/lib/schemes"
import type {
  ActivityId,
  AgeAnswer,
  HoldingAnswer,
  LandAnswer,
} from "@/lib/types"

const landOptions: { id: LandAnswer; label: string }[] = [
  { id: "owner", label: "I own cultivable land" },
  { id: "tenant", label: "I farm land I do not own" },
  { id: "none", label: "I do not cultivate a field" },
  { id: "unsure", label: "I am not sure about the land record" },
]

const holdingOptions: { id: HoldingAnswer; label: string }[] = [
  { id: "small", label: "2 hectares or less" },
  { id: "larger", label: "More than 2 hectares" },
  { id: "unsure", label: "I do not know the area" },
]

const ageOptions: { id: AgeAnswer; label: string }[] = [
  { id: "under-18", label: "Under 18" },
  { id: "18-40", label: "18 to 40" },
  { id: "41-59", label: "41 to 59" },
  { id: "60-plus", label: "60 or older" },
]

function ChoiceGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
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
                name={label}
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
}: {
  title: string
  empty: string
  items: SchemeMatch[]
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
              <SchemeCard scheme={item.scheme} />
              <p className="px-1 text-sm leading-6 text-muted-foreground">
                {item.reasons[0]}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export function Finder() {
  const [state, setState] = useState("unsure")
  const [land, setLand] = useState<LandAnswer>("owner")
  const [holding, setHolding] = useState<HoldingAnswer>("small")
  const [age, setAge] = useState<AgeAnswer>("18-40")
  const [womanOrShg, setWomanOrShg] = useState(false)
  const [selected, setSelected] = useState<ActivityId[]>([])
  const [submitted, setSubmitted] = useState(false)

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
          <Label htmlFor="state">State or Union Territory</Label>
          <Select
            value={state}
            onValueChange={(value) => setState(value ?? "unsure")}
          >
            <SelectTrigger id="state" className="h-11 w-full bg-background">
              <SelectValue placeholder="Choose a state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unsure">Not sure</SelectItem>
              {states.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ChoiceGroup
          label="Land"
          value={land}
          options={landOptions}
          onChange={setLand}
        />

        {land === "owner" ? (
          <ChoiceGroup
            label="Holding size"
            value={holding}
            options={holdingOptions}
            onChange={setHolding}
          />
        ) : null}

        <ChoiceGroup label="Age" value={age} options={ageOptions} onChange={setAge} />

        <label className="flex items-start gap-3 rounded-lg border border-border bg-background px-3 py-3 text-sm">
          <Checkbox
            checked={womanOrShg}
            onCheckedChange={(checked) => setWomanOrShg(checked === true)}
            className="mt-0.5"
          />
          <span>
            I am a woman in a self-help group, or our SHG is looking for a scheme.
          </span>
        </label>

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium">What do you work on?</legend>
          <p className="text-xs leading-5 text-muted-foreground">
            Leave this blank to see the schemes most farm families start with.
          </p>
          <div className="grid gap-2">
            {activities.map((activity) => (
              <label key={activity.id} className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={selected.includes(activity.id)}
                  onCheckedChange={(checked) =>
                    toggleActivity(activity.id, checked === true)
                  }
                />
                {activity.label}
              </label>
            ))}
          </div>
        </fieldset>

        <Button type="submit" size="lg" className="h-11 w-full">
          Show schemes
        </Button>
      </form>

      <div className="space-y-8">
        {!submitted ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/70 px-5 py-10">
            <h2 className="font-heading text-2xl">Your shortlist will land here.</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Answer the questions and press show schemes. You will get three
              piles: apply yourself, apply as a group, and ask the state office.
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="rounded-2xl bg-card px-5 py-8 ring-1 ring-foreground/10">
            <h2 className="font-heading text-2xl">Nothing in the register matched.</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              That can happen if the only schemes for this work are limited to
              another state, or if land ownership rules you out. Browse the full
              register, or change an answer.
            </p>
            <Link
              href="/schemes"
              className="mt-4 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Open the full register
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              {results.length} schemes may fit. Read the page before you apply.
              A match is not an entitlement.
            </p>
            <ResultColumn
              title="Apply yourself"
              empty="No personal application stood out. Look at the group and state piles."
              items={apply}
            />
            <ResultColumn
              title="Through a group or a business"
              empty="No group scheme matched the work you selected."
              items={group}
            />
            <ResultColumn
              title="Ask the state agriculture office"
              empty="No state-run scheme matched."
              items={stateChannel}
            />
          </>
        )}
      </div>
    </div>
  )
}
