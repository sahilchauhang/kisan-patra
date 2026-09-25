import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/80 bg-card">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-heading text-lg">Kisan Patra</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            An independent register of central schemes and subsidies for Indian
            farmers. Not a Government of India website. Check the official
            portal before you apply, pay a fee, or share documents.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <Link href="/schemes" className="hover:underline">
            Browse the register
          </Link>
          <Link href="/finder" className="hover:underline">
            See what may fit
          </Link>
          <Link href="/about" className="hover:underline">
            Sources and how to read a scheme
          </Link>
          <a
            href="https://www.myscheme.gov.in/"
            className="hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            State schemes on myScheme
          </a>
        </div>
      </div>
    </footer>
  )
}
