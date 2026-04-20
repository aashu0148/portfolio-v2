"use client"

import { useRef } from "react"
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { GhostCard } from "@/components/ui/GhostCard"
import { PERSONAL } from "@/lib/constants"
import { getYears, getTotalContributions } from "@/lib/github"

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const years = getYears()
  const totalContributions = getTotalContributions()

  const dynamicStats = [
    { label: "Years experience", value: `~4` },
    {
      label: "Total contributions",
      value: `${(totalContributions / 1000).toFixed(1)}k`,
    },
    { label: "Projects shipped", value: "15+" },
    {
      label: "Strongest year",
      value:
        years.find((y) => y.total === Math.max(...years.map((yr) => yr.total)))
          ?.year ?? "2023",
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-background px-6 py-28 md:px-10"
    >
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-0 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-secondary/4 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Full-width GitHub contribution graph (prominent) */}
        <div
          id="about-graph"
          className="ghost-border kinetic-shadow mb-20 rounded-2xl bg-surface-container-low/60 p-6 md:p-8"
        >
          <div className="mb-5 flex items-center justify-between">
            <SectionLabel>Contribution History</SectionLabel>
            <span className="font-label text-[10px] tracking-widest text-outline uppercase">
              {totalContributions.toLocaleString()} total contributions
            </span>
          </div>

          {/* Year-by-year stats bar */}
          <div className="mb-6 flex flex-wrap gap-3">
            {years.map((y) => (
              <div
                key={y.year}
                className="ghost-border rounded-lg bg-surface-container px-3 py-2"
              >
                <div className="mb-1 font-label text-[10px] tracking-widest text-outline uppercase">
                  {y.year}
                </div>
                <div className="font-headline text-sm font-bold text-on-surface">
                  {y.total.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Contribution bar chart visualization */}
          <div className="flex h-16 items-end gap-1.5">
            {years
              .slice()
              .reverse()
              .map((y) => {
                const maxTotal = Math.max(...years.map((yr) => yr.total))
                const heightPct = (y.total / maxTotal) * 100
                return (
                  <div
                    key={y.year}
                    className="group flex flex-1 flex-col items-center gap-1"
                  >
                    <div
                      className="relative w-full overflow-hidden rounded-t-sm bg-primary/20 transition-colors duration-200 group-hover:bg-primary/40"
                      style={{ height: `${heightPct}%`, minHeight: "4px" }}
                    >
                      <div
                        className="absolute right-0 bottom-0 left-0 rounded-t-sm bg-primary/60"
                        style={{ height: "30%" }}
                      />
                    </div>
                  </div>
                )
              })}
          </div>
          <div className="mt-1 flex gap-1.5">
            {years
              .slice()
              .reverse()
              .map((y) => (
                <div
                  key={y.year}
                  className="flex-1 text-center font-label text-[8px] tracking-wider text-outline/60 uppercase"
                >
                  {y.year.slice(2)}
                </div>
              ))}
          </div>
        </div>

        {/* Bio + stats grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Bio — wider column */}
          <div className="flex flex-col gap-6 lg:col-span-3">
            <div>
              <SectionLabel className="mb-4">About Me</SectionLabel>
              <h2 className="mb-4 font-headline text-3xl leading-tight font-black tracking-tight text-on-surface md:text-4xl">
                Frontend engineer,{" "}
                <span className="gradient-text">product-minded by nature.</span>
              </h2>
              <p className="text-base leading-relaxed text-on-surface-variant">
                {PERSONAL.bio}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "TypeScript",
                "React / Next.js",
                "WebSockets",
                "Chrome Extensions",
                "Node.js",
              ].map((t) => (
                <span
                  key={t}
                  className="ghost-border rounded-full bg-surface-container px-3 py-1.5 font-label text-[10px] tracking-wider text-on-surface-variant uppercase transition-colors duration-200 hover:bg-surface-container-high"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 font-label text-[11px] tracking-widest text-outline uppercase transition-colors duration-200 hover:text-primary"
              >
                <GitHubIcon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                GitHub
              </a>
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 font-label text-[11px] tracking-widest text-outline uppercase transition-colors duration-200 hover:text-primary"
              >
                <LinkedInIcon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Stats grid — narrower column */}
          <div className="grid grid-cols-2 content-start gap-3 lg:col-span-2">
            {dynamicStats.map((stat) => (
              <GhostCard
                key={stat.label}
                glowColor="primary"
                className="flex flex-col gap-1 p-4"
                data-stat-card
              >
                <span className="font-headline text-2xl font-black tracking-tight text-on-surface md:text-3xl">
                  {stat.value}
                </span>
                <span className="font-label text-[10px] leading-tight tracking-widest text-outline uppercase">
                  {stat.label}
                </span>
              </GhostCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
