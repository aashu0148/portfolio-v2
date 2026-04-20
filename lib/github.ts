import type {
  GithubData,
  ContributionDay,
  ContributionYear,
  WeekColumn,
  ParsedContributions,
} from "./types"
import rawData from "./github.data.json"

const data = rawData as GithubData

/* ─── Intensity → design-palette color ───────────────────────────────────── */

export const INTENSITY_COLORS: Record<string, string> = {
  "0": "rgba(66, 71, 84, 0.12)",   // outline-variant at 12%
  "1": "rgba(173, 198, 255, 0.20)", // primary at 20%
  "2": "rgba(173, 198, 255, 0.45)", // primary at 45%
  "3": "rgba(173, 198, 255, 0.72)", // primary at 72%
  "4": "rgba(173, 198, 255, 1.0)",  // primary full + glow
}

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

function parseDate(dateStr: string): Date {
  // Parse as UTC to avoid timezone shifts
  const [y, m, d] = dateStr.split("-").map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}

function getDayOfWeek(date: Date): number {
  // 0 = Sunday ... 6 = Saturday
  return date.getUTCDay()
}

/**
 * Groups a sorted (oldest→newest) array of ContributionDay objects
 * into week columns for the GitHub-style grid.
 *
 * Each column is 7 cells tall (Sun–Sat). The first column may have
 * leading null entries to align the first day to the correct weekday.
 */
function groupIntoWeeks(days: ContributionDay[]): WeekColumn[] {
  if (days.length === 0) return []

  const weeks: WeekColumn[] = []
  let weekIndex = 0
  let currentWeek: (ContributionDay | null)[] = []

  // Pad the first week so day[0] lands on its correct weekday slot
  const firstDayOfWeek = getDayOfWeek(parseDate(days[0].date))
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push(null)
  }

  for (const day of days) {
    currentWeek.push(day)
    if (currentWeek.length === 7) {
      weeks.push({ weekIndex, days: currentWeek })
      weekIndex++
      currentWeek = []
    }
  }

  // Push trailing partial week
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null)
    weeks.push({ weekIndex, days: currentWeek })
  }

  return weeks
}

/* ─── Public API ──────────────────────────────────────────────────────────── */

/**
 * Returns the list of year summaries (newest first for UI display).
 */
export function getYears(): ContributionYear[] {
  return [...data.years].sort((a, b) => Number(b.year) - Number(a.year))
}

/**
 * Returns all contributions for a given year, parsed into a weekly grid.
 */
export function getContributionsByYear(year: string): ParsedContributions {
  const yearMeta = data.years.find((y) => y.year === year)

  const yearContributions = data.contributions
    .filter((d) => d.date.startsWith(year))
    .sort((a, b) => a.date.localeCompare(b.date)) // oldest → newest

  const weeks = groupIntoWeeks(yearContributions)

  return {
    weeks,
    year,
    total: yearMeta?.total ?? 0,
  }
}

/**
 * Returns contributions for the most recent 52 weeks (rolling window),
 * suitable for the hero graph display.
 */
export function getRecentContributions(): ParsedContributions {
  const sorted = [...data.contributions].sort((a, b) =>
    a.date.localeCompare(b.date)
  )

  // Take the last 52*7 = 364 days
  const recent = sorted.slice(-364)
  const weeks = groupIntoWeeks(recent)

  const latestYear = data.years[0]
  const yearTotal = latestYear?.total ?? 0

  return {
    weeks,
    year: "recent",
    total: yearTotal,
  }
}

/**
 * Returns total contributions across all years.
 */
export function getTotalContributions(): number {
  return data.years.reduce((sum, y) => sum + y.total, 0)
}

/**
 * Returns the streak of active years (years with > 0 contributions).
 */
export function getActiveYears(): number {
  return data.years.filter((y) => y.total > 0).length
}
