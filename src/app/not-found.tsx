import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-xl px-4 py-20 sm:px-6">
      <p className="text-xs font-medium tracking-[0.16em] text-clay uppercase">
        Missing page
      </p>
      <h1 className="mt-2 font-heading text-4xl">That page is not in the register.</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        The scheme may have been renamed, or the address is wrong. Search the
        register by the name you know.
      </p>
      <Link href="/schemes" className={cn(buttonVariants({ size: "lg" }), "mt-6 h-11 px-4")}>
        Back to the register
      </Link>
    </div>
  )
}
