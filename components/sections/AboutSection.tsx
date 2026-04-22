"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail } from "lucide-react"
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { GhostCard } from "@/components/ui/GhostCard"
import { PERSONAL } from "@/lib/constants"
import { getYears, getTotalContributions } from "@/lib/github"
import { useTrackSection } from "@/hooks/useTrackSection"
import { trackSocialClick } from "@/lib/analytics"

const STORY = [
  {
    act: "01",
    title: "The Spark",
    text: "Got into coding back in school — fascinated by how a few lines of code could turn into something people actually use. Not magic, just logic. But it felt like both.",
    accent: "primary" as const,
  },
  {
    act: "02",
    title: "The Dive",
    text: "In college, I fully embraced it. Skipping lectures, diving into projects, landing my first internship as a freshman. Fast learner by necessity, not choice.",
    accent: "secondary" as const,
  },
  {
    act: "03",
    title: "The Ride",
    text: "Since then, a wild ride through multiple startups — crafting web experiences using TypeScript, React, and Next.js. Each company faster and more ambitious than the last.",
    accent: "primary" as const,
  },
  {
    act: "04",
    title: "The Craft",
    text: "I thrive in fast-paced environments because, honestly, slow just isn't my thing. Seeing an idea take shape, pixel by pixel, is what keeps me hooked.",
    accent: "secondary" as const,
  },
]

const BEYOND = [
  {
    emoji: "🗺️",
    title: "City Hopper",
    body: "Exploring new cities, soaking in different cultures. There's something about experiencing new places that fuels creativity.",
  },
  {
    emoji: "🍜",
    title: "Street Food Devotee",
    body: "On a mission to taste my way through India's street food scene. Currently winning.",
  },
  {
    emoji: "⚡",
    title: "Fast Mover",
    body: "Momentum is everything. I ship fast, learn fast, iterate fast. Slow is a feature I haven't shipped yet.",
  },
]

export function AboutSection() {
  const sectionRef = useTrackSection<HTMLElement>("about")
  const labelRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const openerTextRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const beyondRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const blob1Ref = useRef<HTMLDivElement>(null)
  const blob2Ref = useRef<HTMLDivElement>(null)

  const years = getYears()
  const totalContributions = getTotalContributions()

  const dynamicStats = [
    { label: "Years experience", value: "~4" },
    {
      label: "Total contributions",
      value: `${(totalContributions / 1000).toFixed(1)}k`,
    },
    { label: "Projects shipped", value: "15+" },
    // { label: "Startups shaped", value: "3" },
  ]

  useEffect(() => {
    // ⚠️ Register inside useEffect — the only SSR-safe place in Next.js.
    // At module level, this can execute during the server render before the
    // browser scroll container exists, causing ScrollTrigger to silently no-op.
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // ── 1. Section label — slides in from the left ─────────────────────────
      gsap.from(labelRef.current, {
        opacity: 0,
        x: -24,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: { trigger: labelRef.current, start: "top 90%" },
      })

      // ── 2. Headline — word-by-word clip-mask reveal ────────────────────────
      //    Each word is wrapped in overflow:hidden + an inner span that starts
      //    yPercent:115 (below the clip) and slides up to 0.
      const wordInners = headlineRef.current?.querySelectorAll(".word-inner")
      if (wordInners?.length) {
        gsap.from(wordInners, {
          yPercent: 115,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.07,
          scrollTrigger: { trigger: headlineRef.current, start: "top 88%" },
        })
      }

      // ── 3. Opener paragraphs — staggered fade + rise ───────────────────────
      const paras = openerTextRef.current?.querySelectorAll("p")
      if (paras?.length) {
        gsap.from(paras, {
          opacity: 0,
          y: 30,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: openerTextRef.current, start: "top 82%" },
        })
      }

      // ── 4. Story cards — individual triggers so each pops in as you scroll ─
      //    Same-row cards get a tiny delay offset so they don't land together.
      const storyCards =
        sectionRef.current?.querySelectorAll(".about-story-card")
      storyCards?.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          scale: 0.93,
          duration: 0.8,
          ease: "power3.out",
          delay: (i % 2) * 0.12,
          scrollTrigger: { trigger: card, start: "top 90%" },
        })
      })

      // ── 5. Stats strip — bouncy back-ease stagger ─────────────────────────
      const statItems = sectionRef.current?.querySelectorAll(".about-stat-item")
      if (statItems?.length) {
        gsap.from(statItems, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          ease: "back.out(1.7)",
          stagger: 0.09,
          scrollTrigger: { trigger: statsRef.current, start: "top 84%" },
        })
      }

      // ── 6. Beyond cards — individual triggers (same pattern as story cards)
      const beyondCards =
        sectionRef.current?.querySelectorAll(".about-beyond-card")
      beyondCards?.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 0.75,
          ease: "power3.out",
          delay: i * 0.12,
          scrollTrigger: { trigger: card, start: "top 95%" },
        })
      })

      // ── 7. CTA — fade + rise ──────────────────────────────────────────────
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 32,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 90%" },
      })

      // ── 8. Ambient blobs — parallax scrub ────────────────────────────────
      //    Blobs move at different speeds, giving a subtle depth illusion.
      gsap.to(blob1Ref.current, {
        y: -110,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.8,
        },
      })
      gsap.to(blob2Ref.current, {
        y: 90,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2.5,
        },
      })
    }, sectionRef) // scope: all string selectors are relative to sectionRef

    return () => ctx.revert() // kills all tweens + ScrollTriggers in this context
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-background px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:py-28"
    >
      {/* Parallax ambient blobs */}
      <div
        ref={blob1Ref}
        className="pointer-events-none absolute top-1/4 right-0 h-[280px] w-[280px] rounded-full bg-primary/4 blur-[80px] will-change-transform md:h-[550px] md:w-[550px] md:blur-[150px]"
      />
      <div
        ref={blob2Ref}
        className="pointer-events-none absolute bottom-1/4 left-0 h-[210px] w-[210px] rounded-full bg-secondary/4 blur-[70px] will-change-transform md:h-[420px] md:w-[420px] md:blur-[130px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ── Opener ──────────────────────────────────────────────────────── */}
        <div className="mb-12 sm:mb-16 md:mb-24">
          <div ref={labelRef}>
            <SectionLabel className="mb-6">About Me</SectionLabel>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
            {/* Left: word-clip headline */}
            <div>
              <h2
                ref={headlineRef}
                className="font-headline text-3xl leading-[1.15] font-black tracking-tight text-on-surface sm:text-4xl md:text-5xl lg:text-6xl"
              >
                {/* Each word: outer = overflow:hidden clip, inner = animated */}
                <span className="block">
                  {["Less", "robotic,"].map((word) => (
                    <span
                      key={word}
                      className="mr-[0.25em] inline-block overflow-hidden align-bottom"
                    >
                      <span className="word-inner inline-block">{word}</span>
                    </span>
                  ))}
                </span>
                <span className="block overflow-hidden">
                  <span className="word-inner gradient-text inline-block">
                    more real.
                  </span>
                </span>
              </h2>

              {/* <div className="mt-8 flex items-center gap-3">
                <span className="h-px w-10 bg-primary/40" />
                <span className="font-label text-[9px] tracking-[0.3em] text-primary/70 uppercase">
                  Anshul&apos;s story
                </span>
              </div> */}
            </div>

            {/* Right: narrative paragraphs */}
            <div
              ref={openerTextRef}
              className="space-y-5 text-base leading-relaxed text-on-surface-variant md:text-lg"
            >
              <p>
                Hi there! I&apos;m{" "}
                <span className="font-semibold text-on-surface">Anshul</span>,
                and if you&apos;ve made it here, you probably know I build for
                the web. But let&apos;s make this less robotic and more real.
              </p>
              <p>
                This website exists to show what I do, what I love, and maybe
                even help you get to know me a little better.{" "}
                <span className="font-medium text-on-surface">
                  I thrive in fast-paced environments
                </span>{" "}
                because, honestly, slow just isn&apos;t my thing.
              </p>
              <p>
                This is my little corner of the internet; if you like what you
                see, feel free to reach out.{" "}
                <span className="font-medium">
                  Let&apos;s build something awesome.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* ── Story Acts ──────────────────────────────────────────────────── */}
        <div ref={storyRef} className="mb-12 sm:mb-16 md:mb-24">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-px flex-1 bg-outline-variant/20" />
            <span className="font-label text-[10px] tracking-[0.3em] text-outline uppercase">
              My Story
            </span>
            <span className="h-px flex-1 bg-outline-variant/20" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {STORY.map((chapter) => (
              <GhostCard
                key={chapter.act}
                glowColor={chapter.accent}
                className="about-story-card group relative flex flex-col gap-4 overflow-hidden p-6"
              >
                {/* Watermark act number */}
                <span
                  className="pointer-events-none absolute -right-3 -bottom-4 origin-bottom-right font-headline text-8xl leading-none font-black text-outline/[0.06] transition-all duration-500 select-none group-hover:scale-110 group-hover:text-outline/[0.1]"
                  aria-hidden
                >
                  {chapter.act}
                </span>

                <div className="flex items-center justify-between">
                  <span
                    className={`font-label text-[9px] tracking-[0.3em] uppercase ${
                      chapter.accent === "primary"
                        ? "text-primary/60"
                        : "text-secondary/60"
                    }`}
                  >
                    Act {chapter.act}
                  </span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      chapter.accent === "primary"
                        ? "bg-primary/50"
                        : "bg-secondary/50"
                    }`}
                  />
                </div>

                <div
                  className={`border-l-2 pl-4 ${
                    chapter.accent === "primary"
                      ? "border-primary/40"
                      : "border-secondary/40"
                  }`}
                >
                  <h3
                    className={`mb-2 font-headline text-lg font-bold tracking-tight ${
                      chapter.accent === "primary"
                        ? "text-primary"
                        : "text-secondary"
                    }`}
                  >
                    {chapter.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    {chapter.text}
                  </p>
                </div>
              </GhostCard>
            ))}
          </div>
        </div>

        {/* ── Stats Strip ─────────────────────────────────────────────────── */}
        <div ref={statsRef} className="mb-12 sm:mb-16 md:mb-24">
          <div className="ghost-border grid grid-cols-2 overflow-hidden rounded-2xl bg-surface-container-low/40 md:grid-cols-3 md:divide-x md:divide-outline-variant/15">
            {dynamicStats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`about-stat-item flex flex-col gap-1 p-6 ${
                  idx < 2
                    ? "border-b border-outline-variant/15 md:border-b-0"
                    : ""
                } ${idx % 2 === 0 && idx < 2 ? "border-r border-outline-variant/15 md:border-r-0" : ""}`}
              >
                <span className="font-headline text-2xl font-black tracking-tight text-on-surface sm:text-3xl md:text-4xl">
                  {stat.value}
                </span>
                <span className="font-label text-[10px] leading-tight tracking-widest text-outline uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Beyond the Code ─────────────────────────────────────────────── */}
        <div ref={beyondRef} className="mb-10 sm:mb-14 md:mb-20">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-px flex-1 bg-outline-variant/20" />
            <span className="font-label text-[10px] tracking-[0.3em] text-outline uppercase">
              Beyond the Code
            </span>
            <span className="h-px flex-1 bg-outline-variant/20" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {BEYOND.map((item) => (
              <div
                key={item.title}
                className="about-beyond-card ghost-border group rounded-xl bg-surface-container-low/40 p-6 transition-all duration-300 hover:bg-surface-container/50"
              >
                <div className="mb-4 origin-left text-3xl transition-transform duration-300 group-hover:scale-110">
                  {item.emoji}
                </div>
                <h4 className="mb-2 font-headline text-sm font-bold text-on-surface">
                  {item.title}
                </h4>
                <p className="font-label text-[11px] leading-relaxed text-on-surface-variant">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <div
          ref={ctaRef}
          className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="max-w-lg">
            <p className="font-headline text-xl leading-snug font-bold text-on-surface md:text-2xl">
              Like what you see?{" "}
              <span className="gradient-text">
                Let&apos;s build something awesome.
              </span>
            </p>
            <p className="mt-2 text-sm text-on-surface-variant">
              Always open to interesting conversations, collaborations, and new
              challenges.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-5">
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackSocialClick("github", "about")}
              className="group flex items-center gap-2 font-label text-[11px] tracking-widest text-outline uppercase transition-colors duration-200 hover:text-primary"
            >
              <GitHubIcon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              GitHub
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackSocialClick("linkedin", "about")}
              className="group flex items-center gap-2 font-label text-[11px] tracking-widest text-outline uppercase transition-colors duration-200 hover:text-primary"
            >
              <LinkedInIcon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              LinkedIn
            </a>
            <a
              href={`mailto:${PERSONAL.email}`}
              target="_blank"
              onClick={() => trackSocialClick("email", "about")}
              className="group flex items-center gap-2 font-label text-[11px] tracking-widest text-outline uppercase transition-colors duration-200 hover:text-primary"
            >
              <Mail className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
