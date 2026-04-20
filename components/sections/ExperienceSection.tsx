"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { gsap } from "gsap"
import { ArrowRight, Code2 } from "lucide-react"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { TechChip } from "@/components/ui/TechChip"
import { EXPERIENCE } from "@/lib/constants"
import { cn } from "@/lib/utils"

/* ─── Right Panel ─────────────────────────────────────────────────────────── */

function DetailPanel({ idx }: { idx: number }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const prevIdx = useRef(idx)

  useEffect(() => {
    if (!panelRef.current || prevIdx.current === idx) return
    prevIdx.current = idx
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    )
  }, [idx])

  const item = EXPERIENCE[idx]
  if (!item) return null

  return (
    <div ref={panelRef} className="flex flex-col gap-5">
      {/* What I Built */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Code2 className="h-3.5 w-3.5 text-primary/70" />
          <span className="font-label text-[10px] tracking-[0.25em] uppercase text-outline">
            What I Built
          </span>
        </div>
        <ul className="flex flex-col gap-2.5">
          {item.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-on-surface-variant leading-relaxed">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary/60" />
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* Biggest Learnings */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-secondary/70 text-xs">✦</span>
          <span className="font-label text-[10px] tracking-[0.25em] uppercase text-outline">
            Biggest Learnings
          </span>
        </div>
        <ul className="flex flex-col gap-2.5">
          {item.learnings.map((l, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-on-surface-variant leading-relaxed">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-secondary/60" />
              {l}
            </li>
          ))}
        </ul>
      </div>

      {/* Feedback */}
      {item.feedback && (
        <div className="rounded-xl ghost-border bg-surface-container/50 p-4">
          <span className="font-label text-[9px] tracking-[0.25em] uppercase text-outline block mb-2">
            Feedback Received
          </span>
          <p className="text-sm text-on-surface-variant leading-relaxed italic">
            &ldquo;{item.feedback}&rdquo;
          </p>
        </div>
      )}

      {/* Why I Left */}
      {item.reasonForLeaving && (
        <div className="flex items-start gap-3">
          <ArrowRight className="h-3.5 w-3.5 text-outline/50 mt-0.5 shrink-0" />
          <div>
            <span className="font-label text-[9px] tracking-[0.25em] uppercase text-outline block mb-1">
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

/* ─── Left Timeline Card ──────────────────────────────────────────────────── */

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
  return (
    <div
      id={`exp-entry-${index}`}
      className={cn("relative pl-10 group cursor-pointer", !isLast && "pb-10")}
      onClick={onClick}
    >
      {/* Dot node */}
      <div
        ref={dotRef}
        className="absolute left-0 top-[18px] h-[14px] w-[14px] rounded-full"
        style={{ backgroundColor: "#424754" }}
      />

      {/* Card */}
      <div
        className={cn(
          "rounded-xl p-4 transition-all duration-300 ghost-border",
          isActive
            ? "bg-surface-container border-primary/30 shadow-[0_0_24px_rgba(173,198,255,0.07)]"
            : "bg-surface-container/30 hover:bg-surface-container/60 hover:border-outline-variant/25 opacity-60 group-hover:opacity-80"
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className={cn(
                "font-headline text-base font-bold tracking-tight transition-colors duration-300",
                isActive ? "text-on-surface" : "text-on-surface-variant"
              )}>
                {item.company}
              </span>
              {item.badge && (
                <span className="font-label text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 tracking-wide">
                  {item.badge}
                </span>
              )}
            </div>
            <p className={cn(
              "font-label text-xs tracking-wide",
              isActive ? "text-primary/80" : "text-outline"
            )}>
              {item.role}
            </p>
          </div>
          <span className="font-label text-[10px] tracking-widest uppercase text-outline/70 whitespace-nowrap shrink-0 pt-0.5">
            {item.period}
          </span>
        </div>

        {/* Description — only show when active */}
        <p className={cn(
          "text-xs text-on-surface-variant leading-relaxed overflow-hidden transition-all duration-300",
          isActive ? "max-h-20 opacity-100 mb-3" : "max-h-0 opacity-0"
        )}>
          {item.description}
        </p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1">
          {item.tech.slice(0, isActive ? item.tech.length : 3).map((t) => (
            <TechChip key={t} label={t} variant={isActive ? "primary" : "default"} />
          ))}
          {!isActive && item.tech.length > 3 && (
            <span className="font-label text-[9px] tracking-wide text-outline/60 self-center">
              +{item.tech.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Section ─────────────────────────────────────────────────────────────── */

// How far from the top of the timeline column the track begins (matches top-5 = 20px)
const TRACK_TOP_OFFSET = 20

export function ExperienceSection() {
  const [activeIdx, setActiveIdx] = useState(0)

  const timelineColRef = useRef<HTMLDivElement>(null)
  const lineProgressRef = useRef<HTMLDivElement>(null)
  const lineTipRef = useRef<HTMLDivElement>(null)
  const pulseRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<(HTMLDivElement | null)[]>([])
  const measureTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  /* Start the tip pulse loop once on mount */
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

  /**
   * Measures the centre-Y of the active dot relative to the timeline column,
   * then drives the progress line height + tip position to that point.
   * Called immediately on click and again after the card-expand CSS transition
   * (300 ms) so the tip lands exactly on the dot even after the card grows.
   */
  const animateLine = useCallback((idx: number) => {
    /* ── Dot colours ──────────────────────────────────────────────────────── */
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return
      if (i < idx) {
        gsap.to(dot, {
          scale: 1,
          backgroundColor: "rgba(173,198,255,0.45)",
          boxShadow: "none",
          duration: 0.3,
        })
      } else if (i === idx) {
        gsap.to(dot, {
          scale: 1.5,
          backgroundColor: "#adc6ff",
          boxShadow: "0 0 14px rgba(173,198,255,0.6)",
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

    /* ── Measure → animate ────────────────────────────────────────────────── */
    const measure = () => {
      const dot = dotRefs.current[idx]
      const col = timelineColRef.current
      if (!dot || !col) return

      const dotRect = dot.getBoundingClientRect()
      const colRect = col.getBoundingClientRect()
      // Centre-Y of the dot relative to the column top
      const dotCY = dotRect.top + dotRect.height / 2 - colRect.top
      const lineH = Math.max(0, dotCY - TRACK_TOP_OFFSET)

      gsap.to(lineProgressRef.current, {
        height: lineH,
        duration: 0.55,
        ease: "power2.inOut",
      })

      gsap.to(lineTipRef.current, {
        y: lineH,
        opacity: 1,
        duration: 0.55,
        ease: "power2.inOut",
      })
    }

    measure()
    // Re-measure after the card's CSS expand/collapse transition (300 ms)
    clearTimeout(measureTimer.current)
    measureTimer.current = setTimeout(measure, 340)
  }, [])

  /* Initial paint — wait one RAF so the DOM has been laid out */
  useEffect(() => {
    const raf = requestAnimationFrame(() => animateLine(0))
    return () => cancelAnimationFrame(raf)
  }, [animateLine])

  /* Re-animate whenever active card changes */
  useEffect(() => {
    animateLine(activeIdx)
  }, [activeIdx, animateLine])

  /* Cleanup timer on unmount */
  useEffect(() => () => clearTimeout(measureTimer.current), [])

  const activeItem = EXPERIENCE[activeIdx]

  return (
    <section
      id="experience"
      className="relative py-28 px-6 md:px-10 bg-surface-container-lowest"
    >
      <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-primary/4 blur-[130px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <SectionLabel className="mb-4">Career</SectionLabel>
          <h2 className="font-headline text-4xl md:text-5xl font-black tracking-tight leading-tight">
            <span className="text-on-surface">Where I&apos;ve</span>{" "}
            <span className="gradient-text">shipped things.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ── Left: Timeline ──────────────────────────────────────────── */}
          <div className="lg:col-span-5 relative" ref={timelineColRef}>
            {/* Static track */}
            <div className="absolute left-[6px] top-5 bottom-5 w-px bg-outline-variant/15" />

            {/* Glowing progress fill */}
            <div
              ref={lineProgressRef}
              className="absolute left-[6px] top-5 w-px origin-top pointer-events-none"
              style={{
                height: 0,
                background:
                  "linear-gradient(to bottom, rgba(173,198,255,0.15) 0%, rgba(173,198,255,0.55) 60%, rgba(173,198,255,0.9) 100%)",
                boxShadow: "0 0 5px 1px rgba(173,198,255,0.35)",
              }}
            />

            {/* Glow tip — sits at the head of the progress line */}
            <div
              ref={lineTipRef}
              className="absolute pointer-events-none"
              style={{
                left: 3,   // centres the 7 px orb over the 1 px line (6 px left − 3 px)
                top: TRACK_TOP_OFFSET,
                opacity: 0,
              }}
            >
              {/* Pulsing halo (GSAP-driven) */}
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
                  dotRef={(el) => { dotRefs.current[i] = el }}
                />
              ))}
            </div>
          </div>

          {/* ── Right: Sticky detail panel ──────────────────────────────── */}
          <div className="lg:col-span-7">
            <div className="sticky top-24 flex flex-col gap-4">
              {/* Company header card */}
              {activeItem && (
                <div className="ghost-border rounded-xl bg-surface-container-low p-5 kinetic-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    {activeItem.badge && (
                      <span className="font-label text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25">
                        {activeItem.badge}
                      </span>
                    )}
                    <span className="font-label text-[10px] tracking-widest uppercase text-outline">
                      {activeItem.location} · {activeItem.period}
                    </span>
                  </div>
                  <h3 className="font-headline text-2xl font-black tracking-tight text-on-surface mb-1">
                    {activeItem.role}
                  </h3>
                  {activeItem.companyUrl ? (
                    <a
                      href={activeItem.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-label text-sm tracking-wide text-primary hover:underline"
                    >
                      {activeItem.company} ↗
                    </a>
                  ) : (
                    <span className="font-label text-sm tracking-wide text-primary">{activeItem.company}</span>
                  )}
                </div>
              )}

              {/* Detail content */}
              <div className="ghost-border rounded-xl bg-surface-container-low/60 p-5 md:p-6 kinetic-shadow">
                <DetailPanel idx={activeIdx} />
              </div>

              {/* CTA */}
              <div className="relative overflow-hidden rounded-xl kinetic-gradient p-5 group cursor-pointer">
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/8 transition-all duration-300" />
                <div className="absolute -right-4 -bottom-4 text-on-primary/10 pointer-events-none">
                  <Code2 className="h-20 w-20 rotate-12" />
                </div>
                <div className="relative z-10">
                  <p className="font-label text-[10px] tracking-[0.25em] uppercase text-on-primary/70 mb-1">
                    Available for work
                  </p>
                  <p className="font-headline text-sm font-bold text-on-primary leading-snug mb-3">
                    Let&apos;s build something great together.
                  </p>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
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
