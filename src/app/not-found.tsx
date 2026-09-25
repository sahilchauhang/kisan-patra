import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { eyebrowClass, t } from "@/lib/copy"
import { getLang } from "@/lib/language"
import { cn } from "cn"

export default async function NotFound() {
  const lang = await getLang()
  const text = t(lang)
  return (
    <div className="mx-auto w-full max-w-xl px-4 py-20 sm:px-6">
      <p className={eyebrowClass(lang)}>{text.missingEyebrow}</p>
      <h1 className="mt-2 font-heading text-4xl">{text.missingTitle}</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{text.missingBody}</p>
      <Link href="/schemes" className={cn(buttonVariants({ size: "lg" }), "mt-6 h-11 px-4")}>
        {text.missingBack}
      </Link>
    </div>
  )
}
