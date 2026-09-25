import type { Metadata } from "next"
import { Fraunces, Source_Sans_3 } from "next/font/google"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

import "./globals.css"

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
})

export const metadata: Metadata = {
  title: {
    default: "Kisan Patra — central schemes for Indian farmers",
    template: "%s · Kisan Patra",
  },
  description:
    "A single register of central government schemes and subsidies for Indian farmers: income support, crop insurance, loans, irrigation, machines, and allied programmes.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
