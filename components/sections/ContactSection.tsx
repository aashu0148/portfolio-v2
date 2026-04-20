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
      className="relative py-28 px-6 md:px-10 bg-surface-container-lowest"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 80%, rgba(173,198,255,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionLabel className="mb-10">Contact</SectionLabel>

        {/* Main gradient CTA card */}
        <div className="group relative overflow-hidden rounded-2xl kinetic-gradient p-10 md:p-16 transition-all duration-300 hover:shadow-[0_0_60px_rgba(173,198,255,0.2)]">
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300" />

          {/* Decorative oversized icon */}
          <div className="absolute -right-6 -bottom-6 text-on-primary/10 pointer-events-none select-none rotate-[-15deg]">
            <Mail className="h-48 w-48" />
          </div>

          <div className="absolute inset-0 dot-grid opacity-5 pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <p className="font-label text-[10px] tracking-[0.3em] uppercase text-on-primary/60 mb-3">
              Available for opportunities
            </p>
            <h2 className="font-headline text-3xl md:text-5xl font-black text-on-primary tracking-tight leading-tight mb-4">
              Let&apos;s build something
              <br />
              remarkable together.
            </h2>
            <p className="text-sm md:text-base text-on-primary/70 leading-relaxed mb-8 max-w-lg">
              Whether you&apos;re looking for a frontend engineer to join your team or a collaborator for your next product — I&apos;d love to hear from you.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${PERSONAL.email}`}
                className="group/btn relative overflow-hidden px-6 py-3 rounded-xl bg-on-primary text-primary font-label text-xs tracking-widest uppercase font-semibold transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,46,106,0.3)] active:scale-95 flex items-center gap-2"
              >
                <Mail className="h-3.5 w-3.5" />
                Send an Email
              </a>

              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-on-primary/25 text-on-primary font-label text-xs tracking-widest uppercase font-medium transition-all duration-200 hover:border-on-primary/50 hover:bg-on-primary/10 active:scale-95"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                GitHub
              </a>

              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-on-primary/25 text-on-primary font-label text-xs tracking-widest uppercase font-medium transition-all duration-200 hover:border-on-primary/50 hover:bg-on-primary/10 active:scale-95"
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
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-label text-[10px] tracking-widest uppercase text-outline">
              Available · {new Date().getFullYear()}
            </span>
          </div>
          <span className="font-label text-[10px] tracking-widest uppercase text-outline">
            {PERSONAL.location} · {PERSONAL.timezone}
          </span>
        </div>
      </div>
    </section>
  )
}
