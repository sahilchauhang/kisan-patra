import type { Metadata } from "next"
import { Fraunces, Noto_Sans_Devanagari, Source_Sans_3 } from "next/font/google"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { getLang } from "@/lib/language"

import "./globals.css"

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
})

const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-devanagari",
})

export const metadata: Metadata = {
  title: {
    default: "Kisan Patra — central schemes for Indian farmers",
    template: "%s · Kisan Patra",
  },
  description:
    "A single register of central government schemes and subsidies for Indian farmers, plus Haryana’s own schemes.",
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const lang = await getLang()
  return (
    <html
      lang={lang === "hi" ? "hi" : "en"}
      className={`${sourceSans.variable} ${fraunces.variable} ${devanagari.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader lang={lang} />
        <main className="flex-1">{children}</main>
        <SiteFooter lang={lang} />
      </body>
    </html>
  )
}
