import type { FarmerNotice, Scheme } from "@/lib/types"

/** All date-only government deadlines are interpreted in India, inclusively. */
export function indiaDay(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(now)
}

export function isDiscoverable(scheme: Scheme) {
  return !["retired", "replaced"].includes(scheme.lifecycle?.status ?? "unknown")
}

export function isCurrentNotice(notice: FarmerNotice, now = new Date()) {
  const day = indiaDay(now)
  return !notice.archived && notice.publishedOn <= day && (!notice.effectiveOn || notice.effectiveOn <= day) && notice.previewUntil >= day && (!notice.deadline || notice.deadline >= day)
}

export function currentNotices(notices: FarmerNotice[], now = new Date()) {
  return notices.filter((notice) => isCurrentNotice(notice, now)).sort((a, b) => b.publishedOn.localeCompare(a.publishedOn))
}
