"use client"

import { useState, useId } from "react"
import { INTENSITY_COLORS, getContributionsByYear, getYears } from "@/lib/github"
import type { WeekColumn, ContributionDay } from "@/lib/types"
import { cn } from "@/lib/utils"

/* ─── Constants ───────────────────────────────────────────────────────────── */

const CELL_SIZE = 14
const CELL_GAP = 3
const CELL_STEP = CELL_SIZE + CELL_GAP

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

function getMonthLabels(weeks: WeekColumn[]): { label: string; x: number }[] {
  const labels: { label: string; x: number }[] = []
  let lastMonth = -1

  weeks.forEach((week, wi) => {
    for (const day of week.days) {
      if (!day) continue
      const month = new Date(day.date + "T00:00:00Z").getUTCMonth()
      if (month !== lastMonth) {
        labels.push({ label: MONTH_NAMES[month], x: wi * CELL_STEP })
        lastMonth = month
      }
      break
    }
  })

  return labels
}

/* ─── Tooltip ─────────────────────────────────────────────────────────────── */

interface TooltipState {
  day: ContributionDay
  x: number
  y: number
}

/* ─── Cell ────────────────────────────────────────────────────────────────── */

interface CellProps {
  day: ContributionDay | null
  cx: number
  cy: number
  onHover: (state: TooltipState | null) => void
  filterId: string
}

function Cell({ day, cx, cy, onHover, filterId }: CellProps) {
  if (!day) {
    return (
      <rect
        x={cx}
        y={cy}
        width={CELL_SIZE}
        height={CELL_SIZE}
        rx={2}
        fill="rgba(66, 71, 84, 0.08)"
      />
    )
  }

  const fill = INTENSITY_COLORS[day.intensity] ?? INTENSITY_COLORS["0"]
  const isActive = day.intensity !== "0"

  return (
    <rect
      x={cx}
      y={cy}
      width={CELL_SIZE}
      height={CELL_SIZE}
      rx={2}
      fill={fill}
      filter={isActive && day.intensity === "4" ? `url(#${filterId})` : undefined}
      className="cursor-pointer transition-all duration-150"
      style={{ outline: "none" }}
      onMouseEnter={(e) => {
        const rect = (e.target as SVGRectElement).getBoundingClientRect()
        onHover({ day, x: rect.left + rect.width / 2, y: rect.top })
      }}
      onMouseLeave={() => onHover(null)}
    />
  )
}

/* ─── Main Component ──────────────────────────────────────────────────────── */

interface ContributionGraphProps {
  initialYear?: string
  className?: string
  compact?: boolean
  /** When false, hides the year-selector + total row. Defaults to true when not compact. */
  showHeader?: boolean
}

export function ContributionGraph({
  initialYear,
  className,
  compact = false,
  showHeader,
}: ContributionGraphProps) {
  const displayHeader = showHeader ?? !compact
  const years = getYears()
  const defaultYear = initialYear ?? years[0]?.year ?? "2025"
  const [selectedYear, setSelectedYear] = useState(defaultYear)
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)

  const uid = useId().replace(/:/g, "")
  const filterId = `glow-${uid}`

  const { weeks, total } = getContributionsByYear(selectedYear)
  const monthLabels = getMonthLabels(weeks)

  const svgWidth = weeks.length * CELL_STEP - CELL_GAP
  const dayLabelOffset = compact ? 0 : 28
  const monthLabelOffset = compact ? 0 : 16
  const svgHeight = 7 * CELL_STEP - CELL_GAP + monthLabelOffset

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Year selector + total */}
      {displayHeader && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {years.map((y) => (
              <button
                key={y.year}
                onClick={() => setSelectedYear(y.year)}
                className={cn(
                  "font-label text-[10px] tracking-widest uppercase px-2.5 py-1 rounded transition-all duration-200",
                  selectedYear === y.year
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "text-outline hover:text-on-surface-variant border border-transparent hover:border-outline-variant/20"
                )}
              >
                {y.year}
              </button>
            ))}
          </div>
          <span className="font-label text-[10px] tracking-widest uppercase text-outline">
            {total.toLocaleString()} contributions
          </span>
        </div>
      )}

      {/* SVG Grid */}
      <div className="overflow-x-auto flex justify-center">
        <svg
          width={svgWidth + dayLabelOffset}
          height={svgHeight + (compact ? 0 : 4)}
          className="block max-w-full"
          aria-label={`GitHub contributions for ${selectedYear}`}
        >
          <defs>
            <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Day labels */}
          {!compact && [1, 3, 5].map((di) => (
            <text
              key={di}
              x={0}
              y={monthLabelOffset + di * CELL_STEP + CELL_SIZE / 2 + 4}
              className="font-label"
              style={{ fontFamily: "var(--font-label)", fontSize: 9 }}
              fill="rgba(140, 144, 159, 0.6)"
              textAnchor="start"
            >
              {DAY_LABELS[di].substring(0, 3)}
            </text>
          ))}

          {/* Month labels */}
          {!compact && monthLabels.map((m, i) => (
            <text
              key={i}
              x={dayLabelOffset + m.x}
              y={10}
              className="font-label"
              style={{ fontFamily: "var(--font-label)", fontSize: 9 }}
              fill="rgba(140, 144, 159, 0.6)"
            >
              {m.label}
            </text>
          ))}

          {/* Cells */}
          <g transform={`translate(${dayLabelOffset}, ${monthLabelOffset})`}>
            {weeks.map((week) =>
              week.days.map((day, di) => (
                <Cell
                  key={`${week.weekIndex}-${di}`}
                  day={day}
                  cx={week.weekIndex * CELL_STEP}
                  cy={di * CELL_STEP}
                  onHover={setTooltip}
                  filterId={filterId}
                />
              ))
            )}
          </g>
        </svg>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full -mt-2 px-2.5 py-1.5 rounded-md ghost-border bg-surface-container-high/95 backdrop-blur-sm shadow-lg"
          style={{ left: tooltip.x, top: tooltip.y - 8 }}
        >
          <span className="font-label text-[10px] tracking-wide uppercase text-on-surface-variant whitespace-nowrap">
            {new Date(tooltip.day.date + "T00:00:00Z").toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="font-label text-[10px] tracking-wide text-primary ml-1.5">
            {tooltip.day.intensity !== "0" ? `intensity ${tooltip.day.intensity}` : "no activity"}
          </span>
        </div>
      )}
    </div>
  )
}
