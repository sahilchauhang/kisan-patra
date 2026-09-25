import { cookies } from "next/headers"

export type Lang = "en" | "hi"

export const languageCookie = "lang"

export async function getLang(): Promise<Lang> {
  const jar = await cookies()
  return jar.get(languageCookie)?.value === "hi" ? "hi" : "en"
}
