import type { Metadata } from "next"

import { Finder } from "@/components/finder"

export const metadata: Metadata = {
  title: "What fits me",
  description:
    "Answer a few questions and see which central farmer schemes may match your land, age, and work.",
}

export default function FinderPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-xs font-medium tracking-[0.16em] text-clay uppercase">
        A shortlist, not a sanction
      </p>
      <h1 className="mt-2 max-w-2xl font-heading text-4xl sm:text-5xl">
        Which schemes may fit your farm?
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
        Tell us about the land, your age, and the work. We will hide schemes
        that clearly do not apply, and we will say when the money goes to a
        group or a state office instead of you.
      </p>
      <div className="mt-8">
        <Finder />
      </div>
    </div>
  )
}
