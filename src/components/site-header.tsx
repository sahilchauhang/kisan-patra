import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const links = [
  { href: "/schemes", label: "The register" },
  { href: "/finder", label: "What fits me" },
  { href: "/about", label: "Sources" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="min-w-0">
          <span className="font-heading text-xl leading-none tracking-tight text-foreground sm:text-2xl">
            Kisan Patra
          </span>
          <span className="mt-1 block text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
            Farmer scheme register
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <Menu />
                </Button>
              }
            />
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="font-heading text-xl">Kisan Patra</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3 py-3 text-base font-medium hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
