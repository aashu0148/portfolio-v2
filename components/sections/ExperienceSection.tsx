"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  ArrowRight,
  Code2,
  MapPin,
  CalendarDays,
  ExternalLink,
  ChevronRight,
  Layers,
  Sparkles,
} from "lucide-react"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { TechChip } from "@/components/ui/TechChip"
import { EXPERIENCE } from "@/lib/constants"
import { cn } from "@/lib/utils"

// Safe plugin registration — handles the case where ScrollAnimations already registered it
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

/* ─── Per-company accent palette ─────────────────────────────────────────── */

const ACCENTS = [
  {
    // Vectorshift — primary blue
    text: "#adc6ff",
    bg: "rgba(173,198,255,0.10)",
    border: "rgba(173,198,255,0.28)",
    glow: "rgba(173,198,255,0.50)",
    chipVariant: "primary" as const,
  },
  {
    // Permar — secondary purple
    text: "#ddb7ff",
    bg: "rgba(221,183,255,0.10)",
    border: "rgba(221,183,255,0.28)",
    glow: "rgba(221,183,255,0.50)",
    chipVariant: "secondary" as const,
  },
  {
    // Hushl — tertiary orange
    text: "#ffb786",
    bg: "rgba(255,183,134,0.10)",
    border: "rgba(255,183,134,0.28)",
    glow: "rgba(255,183,134,0.50)",
    chipVariant: "tertiary" as const,
  },
]

/* ─── Tenure helper ───────────────────────────────────────────────────────── */

function calcDuration(period: string): string {
  const parts = period.split("—").map((s) => s.trim())
  if (parts.length !== 2) return ""
  const monthMap: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  }
  const parse = (s: string) => {
    const [m, y] = s.split(" ")
    return new Date(parseInt(y, 10), monthMap[m] ?? 0)
  }
  try {
    const mo = Math.round(
      (parse(parts[1]).getTime() - parse(parts[0]).getTime()) /
        (1000 * 60 * 60 * 24 * 30.44)
    )
    if (mo < 12) return `${mo} mo`
    const yr = Math.floor(mo / 12)
    const rem = mo % 12
    return rem > 0 ? `${yr} yr ${rem} mo` : `${yr} yr`
  } catch {
    return ""
  }
}

/* ─── Right panel ─────────────────────────────────────────────────────────── */

function DetailPanel({ idx }: { idx: number }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const hasMounted = useRef(false)

  useEffect(() => {
    if (!panelRef.current) return

    const sections = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>("[data-section]")
    )

    if (!hasMounted.current) {
      hasMounted.current = true
      // Initial mount: gentle stagger-up with a brief delay so the scroll entry
      // finishes first
      gsap.fromTo(
        sections,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.07,
          ease: "power2.out",
          delay: 0.3,
        }
      )
      return
    }

    // Subsequent idx changes: flash panel down-out → stagger in with blur
    gsap.to(panelRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.16,
      ease: "power2.in",
      onComplete: () => {
        if (!panelRef.current) return
        gsap.set(panelRef.current, { opacity: 1, y: 0 })
        // Re-query after React has already re-rendered with new content
        const freshSections = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>("[data-section]")
        )
        gsap.fromTo(
          freshSections,
          { opacity: 0, y: 18, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.4,
            stagger: 0.065,
            ease: "power3.out",
          }
        )
      },
    })
  }, [idx])

  const item = EXPERIENCE[idx]
  if (!item) return null
  const accent = ACCENTS[idx % ACCENTS.length]

  return (
    <div ref={panelRef} className="flex flex-col gap-7">
      {/* ── What I Built ────────────────────────────────────────────── */}
      <div data-section>
        <div className="flex items-center gap-3 mb-4">
          <div
            className="h-px flex-1"
            style={{
              background: `linear-gradient(to right, ${accent.border}, transparent)`,
            }}
          />
          <Layers className="h-3 w-3 opacity-60" style={{ color: accent.text }} />
          <span className="font-label text-[10px] tracking-[0.28em] uppercase text-outline">
            What I Built
          </span>
        </div>
        <ul className="flex flex-col gap-3.5">
          {item.highlights.map((h, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-on-surface-variant leading-relaxed"
            >
              <span
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: accent.text, opacity: 0.65 }}
              />
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Biggest Learnings ───────────────────────────────────────── */}
      <div data-section>
        <div className="flex items-center gap-3 mb-4">
          <div
            className="h-px flex-1"
            style={{
              background: "linear-gradient(to right, rgba(221,183,255,0.25), transparent)",
            }}
          />
          <Sparkles className="h-3 w-3 text-secondary/50" />
          <span className="font-label text-[10px] tracking-[0.28em] uppercase text-outline">
            Learnings
          </span>
        </div>
        <ul className="flex flex-col gap-3.5">
          {item.learnings.map((l, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-on-surface-variant leading-relaxed"
            >
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-secondary/50" />
              {l}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Feedback ────────────────────────────────────────────────── */}
      {item.feedback && (
        <div
          data-section
          className="relative overflow-hidden rounded-xl p-4 pl-5"
          style={{
            background: `linear-gradient(135deg, rgba(28,27,27,0.9) 0%, rgba(32,31,31,0.6) 100%)`,
            border: `1px solid ${accent.border}`,
          }}
        >
          {/* Accent left bar */}
          <div
            className="absolute left-0 top-0 w-[3px] h-full rounded-l-xl"
            style={{
              background: `linear-gradient(to bottom, ${accent.text}, transparent)`,
            }}
          />
          <span
            className="font-label text-[9px] tracking-[0.28em] uppercase block mb-2"
            style={{ color: accent.text, opacity: 0.7 }}
          >
            Feedback Received
          </span>
          <p className="text-sm text-on-surface-variant leading-relaxed italic">
            &ldquo;{item.feedback}&rdquo;
          </p>
        </div>
      )}

      {/* ── Why I Left ──────────────────────────────────────────────── */}
      {item.reasonForLeaving && (
        <div data-section className="flex items-start gap-3">
          <ChevronRight className="h-3.5 w-3.5 text-outline/40 mt-0.5 shrink-0" />
          <div>
            <span className="font-label text-[9px] tracking-[0.28em] uppercase text-outline block mb-1.5">
              Why I Left
            </span>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {item.reasonForLeaving}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Left timeline card ──────────────────────────────────────────────────── */

function TimelineCard({
  item,
  index,
  isActive,
  isLast,
  onClick,
  dotRef,
}: {
  item: (typeof EXPERIENCE)[number]
  index: number
  isActive: boolean
  isLast: boolean
  onClick: () => void
  dotRef: (el: HTMLDivElement | null) => void
}) {
  const accent = ACCENTS[index % ACCENTS.length]
  const duration = calcDuration(item.period)

  return (
    <div
      id={`exp-entry-${index}`}
      data-timeline-card
      className={cn("relative pl-12 group cursor-pointer", !isLast && "pb-10")}
      onClick={onClick}
    >
      {/* Timeline dot */}
      <div
        ref={dotRef}
        className="absolute left-0 top-[22px] h-[14px] w-[14px] rounded-full"
        style={{ backgroundColor: "#424754" }}
      />

      {/* Card */}
      <div
        className={cn(
          "rounded-xl p-5 transition-all duration-300",
          isActive
            ? "bg-surface-container"
            : "bg-surface-container/20 hover:bg-surface-container/40 opacity-55 hover:opacity-80"
        )}
        style={
          isActive
            ? {
                border: `1px solid ${accent.border}`,
                boxShadow: `0 4px 32px rgba(0,0,0,0.4), 0 0 0 1px ${accent.border}20`,
              }
            : { border: "1px solid rgba(66,71,84,0.15)" }
        }
      >
        {/* ── Top row: avatar + company info ──────────────────────── */}
        <div className="flex items-start gap-3.5 mb-3.5">
          {/* Company initial avatar */}
          <div
            className="flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center font-headline font-black text-sm transition-all duration-300"
            style={
              isActive
                ? {
                    background: `linear-gradient(135deg, ${accent.bg} 0%, rgba(28,27,27,0.85) 100%)`,
                    border: `1px solid ${accent.border}`,
                    color: accent.text,
                    boxShadow: `0 0 16px ${accent.glow}20`,
                  }
                : {
                    background: "rgba(42,42,42,0.5)",
                    border: "1px solid rgba(66,71,84,0.2)",
                    color: "#8c909f",
                  }
            }
          >
            {item.company.charAt(0)}
          </div>

          <div className="flex-1 min-w-0">
            {/* Company name + badge */}
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <span
                className={cn(
                  "font-headline text-sm font-bold tracking-tight transition-colors duration-300",
                  isActive ? "text-on-surface" : "text-on-surface-variant"
                )}
              >
                {item.company}
              </span>
              {item.badge && (
                <span
                  className="font-label text-[9px] px-1.5 py-0.5 rounded-full tracking-wide flex-shrink-0 transition-all duration-300"
                  style={
                    isActive
                      ? {
                          background: accent.bg,
                          color: accent.text,
                          border: `1px solid ${accent.border}`,
                        }
                      : {
                          background: "rgba(66,71,84,0.2)",
                          color: "#8c909f",
                          border: "1px solid rgba(66,71,84,0.3)",
                        }
                  }
                >
                  {item.badge}
                </span>
              )}
            </div>
            {/* Role */}
            <p
              className="font-label text-xs tracking-wide transition-colors duration-300"
              style={{ color: isActive ? accent.text : "#8c909f" }}
            >
              {item.role}
            </p>
          </div>
        </div>

        {/* ── Meta row: period, tenure, location ──────────────────── */}
        <div className="flex items-center gap-3 mb-3.5 flex-wrap">
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-3 w-3 text-outline/45" />
            <span className="font-label text-[10px] tracking-wide text-outline/65">
              {item.period}
            </span>
          </div>
          {duration && (
            <span
              className="font-label text-[9px] px-2 py-0.5 rounded-full tracking-wide transition-all duration-300"
              style={
                isActive
                  ? { background: accent.bg, color: accent.text }
                  : { background: "rgba(66,71,84,0.15)", color: "#8c909f" }
              }
            >
              {duration}
            </span>
          )}
          <div className="flex items-center gap-1">
            <MapPin className="h-2.5 w-2.5 text-outline/40" />
            <span className="font-label text-[10px] text-outline/50">
              {item.location}
            </span>
          </div>
        </div>

        {/* ── Description (active only) ────────────────────────────── */}
        <p
          className={cn(
            "text-xs text-on-surface-variant leading-relaxed overflow-hidden transition-all duration-300",
            isActive ? "max-h-24 opacity-100 mb-3.5" : "max-h-0 opacity-0"
          )}
        >
          {item.description}
        </p>

        {/* ── Tech chips ──────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-1.5">
          {item.tech
            .slice(0, isActive ? item.tech.length : 4)
            .map((t) => (
              <TechChip
                key={t}
                label={t}
                variant={isActive ? accent.chipVariant : "default"}
              />
            ))}
          {!isActive && item.tech.length > 4 && (
            <span className="font-label text-[9px] tracking-wide text-outline/50 self-center">
              +{item.tech.length - 4}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Section ─────────────────────────────────────────────────────────────── */

const TRACK_TOP_OFFSET = 22

export function ExperienceSection() {
  const [activeIdx, setActiveIdx] = useState(0)

  const sectionRef = useRef<HTMLElement>(null)
  const timelineColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)
  const staticTrackRef = useRef<HTMLDivElement>(null)
  const lineProgressRef = useRef<HTMLDivElement>(null)
  const lineTipRef = useRef<HTMLDivElement>(null)
  const pulseRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<(HTMLDivElement | null)[]>([])
  const measureTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )

  /* ── Pulse loop on tip orb ──────────────────────────────────────────────── */
  useEffect(() => {
    if (!pulseRef.current) return
    gsap.to(pulseRef.current, {
      scale: 2.8,
      opacity: 0,
      duration: 1.8,
      repeat: -1,
      ease: "power1.out",
    })
  }, [])

  /* ── Scroll-triggered entry animations ─────────────────────────────────── */
  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll("[data-timeline-card]")

      // 1. Timeline static track draws downward
      if (staticTrackRef.current) {
        gsap.fromTo(
          staticTrackRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            duration: 1.1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 72%",
              once: true,
            },
          }
        )
      }

      // 2. Cards stagger in from the left
      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.13,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
            onComplete: () => {
              // Let Tailwind's opacity classes take over for inactive cards
              gsap.set(cards, { clearProps: "opacity,x" })
            },
          }
        )
      }

      // 3. Right panel slides in from right
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { opacity: 0, x: 32 },
          {
            opacity: 1,
            x: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
            onComplete: () => {
              gsap.set(rightColRef.current, { clearProps: "opacity,x" })
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /* ── Progress line + dot colours ───────────────────────────────────────── */
  const animateLine = useCallback((idx: number) => {
    const accent = ACCENTS[idx % ACCENTS.length]

    dotRefs.current.forEach((dot, i) => {
      if (!dot) return
      if (i < idx) {
        gsap.to(dot, {
          scale: 1,
          backgroundColor: "rgba(173,198,255,0.30)",
          boxShadow: "none",
          duration: 0.3,
        })
      } else if (i === idx) {
        gsap.to(dot, {
          scale: 1.5,
          backgroundColor: accent.text,
          boxShadow: `0 0 14px ${accent.glow}`,
          duration: 0.3,
        })
      } else {
        gsap.to(dot, {
          scale: 1,
          backgroundColor: "#424754",
          boxShadow: "none",
          duration: 0.3,
        })
      }
    })

    const measure = () => {
      const dot = dotRefs.current[idx]
      const col = timelineColRef.current
      if (!dot || !col) return

      const dotRect = dot.getBoundingClientRect()
      const colRect = col.getBoundingClientRect()
      const dotCY = dotRect.top + dotRect.height / 2 - colRect.top
      const lineH = Math.max(0, dotCY - TRACK_TOP_OFFSET)

      gsap.to(lineProgressRef.current, {
        height: lineH,
        duration: 0.6,
        ease: "power2.inOut",
      })
      gsap.to(lineTipRef.current, {
        y: lineH,
        opacity: 1,
        duration: 0.6,
        ease: "power2.inOut",
      })
    }

    measure()
    clearTimeout(measureTimer.current)
    measureTimer.current = setTimeout(measure, 340)
  }, [])

  useEffect(() => {
    const raf = requestAnimationFrame(() => animateLine(0))
    return () => cancelAnimationFrame(raf)
  }, [animateLine])

  useEffect(() => {
    animateLine(activeIdx)
  }, [activeIdx, animateLine])

  useEffect(() => () => clearTimeout(measureTimer.current), [])

  const activeItem = EXPERIENCE[activeIdx]
  const activeAccent = ACCENTS[activeIdx % ACCENTS.length]

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-28 px-6 md:px-10 bg-surface-container-lowest overflow-hidden"
    >
      {/* ── Ambient blobs ───────────────────────────────────────────────── */}
      <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-primary/4 blur-[130px] pointer-events-none" />
      <div
        className="absolute left-1/4 bottom-1/3 h-[320px] w-[320px] rounded-full blur-[110px] pointer-events-none transition-all duration-1000"
        style={{ background: `${activeAccent.glow}08` }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="mb-16">
          <SectionLabel className="mb-4">Career</SectionLabel>
          <h2 className="font-headline text-4xl md:text-5xl font-black tracking-tight leading-tight">
            <span className="text-on-surface">Where I&apos;ve</span>{" "}
            <span className="gradient-text">shipped things.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ── Left: Timeline ────────────────────────────────────────────── */}
          <div className="lg:col-span-5 relative" ref={timelineColRef}>
            {/* Static track — animated on scroll-entry */}
            <div
              ref={staticTrackRef}
              className="absolute left-[6px] top-5 bottom-5 w-px bg-outline-variant/15"
            />

            {/* Glowing progress fill */}
            <div
              ref={lineProgressRef}
              className="absolute left-[6px] top-5 w-px origin-top pointer-events-none"
              style={{
                height: 0,
                background:
                  "linear-gradient(to bottom, rgba(173,198,255,0.12) 0%, rgba(173,198,255,0.5) 55%, rgba(173,198,255,0.9) 100%)",
                boxShadow: "0 0 5px 1px rgba(173,198,255,0.32)",
              }}
            />

            {/* Glow tip — travels along the progress line */}
            <div
              ref={lineTipRef}
              className="absolute pointer-events-none"
              style={{ left: 3, top: TRACK_TOP_OFFSET, opacity: 0 }}
            >
              {/* Pulsing halo */}
              <div
                ref={pulseRef}
                className="absolute rounded-full"
                style={{
                  width: 14,
                  height: 14,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) scale(1)",
                  background: "rgba(173,198,255,0.35)",
                  transformOrigin: "center",
                }}
              />
              {/* Core orb */}
              <div
                className="relative w-[7px] h-[7px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, #ffffff 0%, #adc6ff 55%, rgba(173,198,255,0.6) 100%)",
                  boxShadow:
                    "0 0 6px 2px rgba(173,198,255,0.95), 0 0 16px 5px rgba(173,198,255,0.55), 0 0 32px 10px rgba(173,198,255,0.2)",
                }}
              />
            </div>

            <div className="flex flex-col">
              {EXPERIENCE.map((item, i) => (
                <TimelineCard
                  key={item.id}
                  item={item}
                  index={i}
                  isActive={activeIdx === i}
                  isLast={i === EXPERIENCE.length - 1}
                  onClick={() => setActiveIdx(i)}
                  dotRef={(el) => {
                    dotRefs.current[i] = el
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── Right: Sticky detail panel ──────────────────────────────── */}
          <div ref={rightColRef} className="lg:col-span-7">
            <div className="sticky top-24 flex flex-col gap-4">
              {/* Company header card */}
              {activeItem && (
                <div
                  className="rounded-xl bg-surface-container-low p-5 transition-all duration-500"
                  style={{
                    border: `1px solid ${activeAccent.border}`,
                    boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 50px ${activeAccent.glow}08`,
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left: info block */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        {activeItem.badge && (
                          <span
                            className="font-label text-[9px] tracking-[0.22em] uppercase px-2 py-0.5 rounded-full"
                            style={{
                              background: activeAccent.bg,
                              color: activeAccent.text,
                              border: `1px solid ${activeAccent.border}`,
                            }}
                          >
                            {activeItem.badge}
                          </span>
                        )}
                        <span className="font-label text-[10px] tracking-widest uppercase text-outline">
                          {activeItem.location} · {activeItem.period}
                        </span>
                      </div>
                      <h3 className="font-headline text-2xl font-black tracking-tight text-on-surface mb-1.5">
                        {activeItem.role}
                      </h3>
                      {activeItem.companyUrl ? (
                        <a
                          href={activeItem.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-label text-sm tracking-wide hover:underline transition-all duration-200 group/link"
                          style={{ color: activeAccent.text }}
                        >
                          {activeItem.company}
                          <ExternalLink className="h-3 w-3 opacity-50 group-hover/link:opacity-90 transition-opacity" />
                        </a>
                      ) : (
                        <span
                          className="font-label text-sm tracking-wide"
                          style={{ color: activeAccent.text }}
                        >
                          {activeItem.company}
                        </span>
                      )}
                    </div>

                    {/* Right: large company initial */}
                    <div
                      className="flex-shrink-0 h-14 w-14 rounded-xl flex items-center justify-center font-headline font-black text-xl transition-all duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${activeAccent.bg} 0%, rgba(28,27,27,0.9) 100%)`,
                        border: `1px solid ${activeAccent.border}`,
                        color: activeAccent.text,
                        boxShadow: `0 0 24px ${activeAccent.glow}22`,
                      }}
                    >
                      {activeItem.company.charAt(0)}
                    </div>
                  </div>
                </div>
              )}

              {/* Detail content */}
              <div
                className="ghost-border rounded-xl bg-surface-container-low/60 p-5 md:p-7"
                style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              >
                <DetailPanel idx={activeIdx} />
              </div>

              {/* CTA */}
              <div className="relative overflow-hidden rounded-xl kinetic-gradient p-5 group cursor-pointer">
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.07] transition-all duration-300" />
                <div className="absolute -right-4 -bottom-4 text-on-primary/10 pointer-events-none select-none">
                  <Code2 className="h-20 w-20 rotate-12" />
                </div>
                <div className="relative z-10">
                  <p className="font-label text-[10px] tracking-[0.28em] uppercase text-on-primary/70 mb-1">
                    Available for work
                  </p>
                  <p className="font-headline text-sm font-bold text-on-primary leading-snug mb-3">
                    Let&apos;s build something great together.
                  </p>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById("contact")?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }}
                    className="inline-flex items-center gap-1.5 font-label text-[10px] tracking-widest uppercase text-on-primary font-semibold hover:gap-3 transition-all duration-200"
                  >
                    Get in touch <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
