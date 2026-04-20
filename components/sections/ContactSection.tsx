"use client"

import { useRef } from "react"
import { Mail } from "lucide-react"
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { PERSONAL } from "@/lib/constants"

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-surface-container-lowest px-6 py-28 md:px-10"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 80%, rgba(173,198,255,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionLabel className="mb-10">Contact</SectionLabel>

        {/* Main gradient CTA card */}
        <div className="group kinetic-gradient relative overflow-hidden rounded-2xl p-10 transition-all duration-300 hover:shadow-[0_0_60px_rgba(173,198,255,0.2)] md:p-16">
          <div className="absolute inset-0 bg-white/0 transition-all duration-300 group-hover:bg-white/5" />

          {/* Decorative oversized icon */}
          <div className="pointer-events-none absolute -right-6 -bottom-6 rotate-[-15deg] text-on-primary/10 select-none">
            <Mail className="h-48 w-48" />
          </div>

          <div className="dot-grid pointer-events-none absolute inset-0 opacity-5" />

          <div className="relative z-10 max-w-2xl">
            <p className="mb-3 font-label text-[10px] tracking-[0.3em] text-on-primary/60 uppercase">
              Available for opportunities
            </p>
            <h2 className="mb-4 font-headline text-3xl leading-tight font-black tracking-tight text-on-primary md:text-5xl">
              Let&apos;s build something
              <br />
              remarkable together.
            </h2>
            <p className="mb-8 max-w-lg text-sm leading-relaxed text-on-primary/70 md:text-base">
              Whether you&apos;re looking for a frontend engineer to join your
              team or a collaborator for your next product, I&apos;d love to
              hear from you.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${PERSONAL.email}`}
                className="group/btn relative flex items-center gap-2 overflow-hidden rounded-xl bg-on-primary px-6 py-3 font-label text-xs font-semibold tracking-widest text-primary uppercase transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,46,106,0.3)] active:scale-95"
              >
                <Mail className="h-3.5 w-3.5" />
                Send an Email
              </a>

              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-on-primary/25 px-5 py-3 font-label text-xs font-medium tracking-widest text-on-primary uppercase transition-all duration-200 hover:border-on-primary/50 hover:bg-on-primary/10 active:scale-95"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                GitHub
              </a>

              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-on-primary/25 px-5 py-3 font-label text-xs font-medium tracking-widest text-on-primary uppercase transition-all duration-200 hover:border-on-primary/50 hover:bg-on-primary/10 active:scale-95"
              >
                <LinkedInIcon className="h-3.5 w-3.5" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Status row */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            <span className="font-label text-[10px] tracking-widest text-outline uppercase">
              Available · {new Date().getFullYear()}
            </span>
          </div>
          <span className="font-label text-[10px] tracking-widest text-outline uppercase">
            {PERSONAL.location} · {PERSONAL.timezone}
          </span>
        </div>
      </div>
    </section>
  )
}
