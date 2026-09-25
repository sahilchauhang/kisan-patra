import { cookies, headers } from "next/headers"

export type Lang = "en" | "hi"

export const languageCookie = "lang"

export async function getLang(): Promise<Lang> {
  const marked = (await headers()).get("x-lang")
  if (marked === "hi" || marked === "en") return marked
  const jar = await cookies()
  return jar.get(languageCookie)?.value === "hi" ? "hi" : "en"
}
