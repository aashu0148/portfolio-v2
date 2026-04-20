"use client"

import { useRef, useEffect, useMemo } from "react"
import { gsap } from "gsap"
import { ContributionGraph } from "@/components/ui/ContributionGraph"
import { PERSONAL } from "@/lib/constants"
import { getYears } from "@/lib/github"
import type { ContributionYear } from "@/lib/types"


export function HeroSection() {
  const labelRef = useRef<HTMLDivElement>(null)
  const title1Ref = useRef<HTMLSpanElement>(null)
  const title2Ref = useRef<HTMLSpanElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const graphWrapperRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const blob1Ref = useRef<HTMLDivElement>(null)
  const blob2Ref = useRef<HTMLDivElement>(null)

  const contributionYears: ContributionYear[] = useMemo(
    () => getYears().filter((y) => Number(y.year) >= 2023),
    []
  )

  // ── Entrance animation ──────────────────────────────────────────────────
  useEffect(() => {
    const els = [
      labelRef.current,
      title1Ref.current,
      title2Ref.current,
      subRef.current,
      ctaRef.current,
      graphWrapperRef.current,
      scrollHintRef.current,
    ]

    // Set all to invisible before animating (avoids CSS class conflicts)
    gsap.set(els, { opacity: 0, y: 0 })
    gsap.set([title1Ref.current, title2Ref.current], { y: 40 })
    gsap.set([labelRef.current, subRef.current], { y: 20 })
    gsap.set([ctaRef.current, graphWrapperRef.current, scrollHintRef.current], { y: 24 })

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: 0.1,
    })

    tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.6 })
      .to([title1Ref.current, title2Ref.current], { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, "-=0.3")
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
      .to(graphWrapperRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.2")
      .to(scrollHintRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")

    return () => { tl.kill() }
  }, [])

  // ── Ambient blob mouse parallax ─────────────────────────────────────────
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const xR = (e.clientX / window.innerWidth - 0.5) * 2
      const yR = (e.clientY / window.innerHeight - 0.5) * 2
      gsap.to(blob1Ref.current, { x: xR * 30, y: yR * 20, duration: 2, ease: "power1.out" })
      gsap.to(blob2Ref.current, { x: -xR * 20, y: -yR * 15, duration: 2.5, ease: "power1.out" })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-svh flex flex-col overflow-hidden bg-background"
    >
      {/* Dot-matrix grid */}
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 40%, rgba(173,198,255,0.07) 0%, transparent 65%)" }}
      />

      {/* Ambient blobs */}
      <div
        ref={blob1Ref}
        className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none will-change-transform"
      />
      <div
        ref={blob2Ref}
        className="absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-[100px] pointer-events-none will-change-transform"
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 md:px-10 pt-24 pb-8 text-center">
        {/* Label */}
        <div ref={labelRef} className="mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-primary/40" />
          <span className="font-label text-[10px] tracking-[0.3em] uppercase text-primary">
            {PERSONAL.role} · {PERSONAL.location}
          </span>
          <span className="h-px w-8 bg-primary/40" />
        </div>

        {/* Title */}
        <h1 className="mb-6 max-w-4xl">
          <span
            ref={title1Ref}
            className="block font-headline text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.92] text-on-surface"
          >
            Hi, I&apos;m{" "}
            <span className="gradient-text">{PERSONAL.alias}</span>
          </span>
          <span
            ref={title2Ref}
            className="block font-headline text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.92] text-on-surface/80 mt-1"
          >
            I build for the web.
          </span>
        </h1>

        {/* Subheading */}
        <p
          ref={subRef}
          className="mb-10 max-w-xl text-base md:text-lg text-on-surface-variant leading-relaxed"
        >
          {PERSONAL.tagline}
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) }}
            className="group relative overflow-hidden px-6 py-3 rounded-xl kinetic-gradient text-on-primary font-label text-xs tracking-widest uppercase font-semibold transition-all duration-200 hover:shadow-[0_0_30px_rgba(173,198,255,0.35)] active:scale-95"
          >
            <span className="relative z-10">View My Work</span>
            <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-200" />
          </a>
          <a
            href={`mailto:${PERSONAL.email}`}
            className="px-6 py-3 rounded-xl ghost-border text-on-surface-variant font-label text-xs tracking-widest uppercase font-medium transition-all duration-200 hover:text-on-surface hover:border-outline-variant/40 active:scale-95"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Contribution Graphs — all years stacked */}
      <div
        ref={graphWrapperRef}
        id="hero-graph-wrapper"
        className="relative z-10 w-full px-6 md:px-10 pb-16"
      >
        <div className="mx-auto max-w-5xl">
          {/* Section header */}
          <div className="mb-8 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-label text-[10px] tracking-[0.25em] uppercase text-outline">
              GitHub Activity
            </span>
          </div>

          {/* One graph per year, newest first */}
          <div className="flex flex-col gap-10">
            {contributionYears.map((y) => (
              <div key={y.year}>
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-label text-xs tracking-widest uppercase text-primary/80">
                    {y.year}
                  </span>
                  <span className="font-label text-[10px] tracking-widest uppercase text-outline/60">
                    {y.total.toLocaleString()} contributions
                  </span>
                </div>
                <ContributionGraph
                  initialYear={y.year}
                  compact={false}
                  showHeader={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="font-label text-[9px] tracking-[0.25em] uppercase text-outline/60">
          Scroll
        </span>
        <div className="h-8 w-px bg-gradient-to-b from-outline/40 to-transparent" />
      </div>
    </section>
  )
}
