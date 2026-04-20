"use client"

import { useState } from "react"
import { ExternalLink, Play, CirclePlay, ChevronDown } from "lucide-react"
import { GitHubIcon } from "@/components/ui/icons"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { TechChip } from "@/components/ui/TechChip"
import { VideoModal } from "@/components/ui/VideoModal"
import { Collapsible, CollapsibleTrigger, CollapsibleContent, useCollapsible } from "@/components/ui/collapsible"
import { PROJECTS } from "@/lib/constants"
import type { Project } from "@/lib/types"
import { cn } from "@/lib/utils"

/* ─── Terminal Chrome Header ──────────────────────────────────────────────── */

function TerminalHeader({ filePath, status }: { filePath?: string; status?: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-surface-container-high/60 border-b border-outline-variant/10 shrink-0">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-error/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-tertiary/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/40" />
      </div>
      {filePath && (
        <span className="flex-1 font-label text-[10px] tracking-tighter uppercase text-outline-variant/50 truncate">
          {filePath}
        </span>
      )}
      {status && (
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="font-label text-[9px] tracking-widest uppercase text-primary/70">
            {status}
          </span>
        </div>
      )}
    </div>
  )
}

/* ─── Behind the build — collapsible story panel ─────────────────────────── */

function StoryChevron() {
  const { isOpen } = useCollapsible()
  return <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", isOpen && "rotate-180")} />
}

function StoryPanel({ project, accent = "primary" }: { project: Project; accent?: "primary" | "secondary" }) {
  if (!project.problem && !project.story && !project.challenges?.length) return null

  const accentColor = accent === "secondary" ? "text-secondary/60" : "text-primary/60"
  const dotColor   = accent === "secondary" ? "bg-secondary/70" : "bg-primary/70"
  const hoverStyle = accent === "secondary"
    ? "hover:bg-secondary/8 hover:border-secondary/20 hover:text-on-surface-variant"
    : "hover:bg-primary/8 hover:border-primary/20 hover:text-on-surface-variant"

  return (
    <Collapsible className="mt-4 border-t border-outline-variant/20">
      <CollapsibleTrigger
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "w-full flex items-center justify-between mt-2 mb-0.5 px-2.5 py-1.5 rounded-lg",
          "border border-transparent text-outline transition-all duration-200",
          hoverStyle
        )}
      >
        <div className="flex items-center gap-2">
          <span className={cn("h-1.5 w-1.5 rounded-full shrink-0 animate-pulse", dotColor)} />
          <span className="font-label text-[10px] tracking-widest uppercase">Behind the build</span>
        </div>
        <StoryChevron />
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="pt-2 pb-1 space-y-3.5">
          {project.builtWhen && (
            <div className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-outline/30 shrink-0" />
              <span className="font-label text-[9px] tracking-widest uppercase text-outline/50">{project.builtWhen}</span>
            </div>
          )}
          {project.problem && (
            <div>
              <p className={cn("font-label text-[9px] tracking-widest uppercase mb-1", accentColor)}>The Problem</p>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">{project.problem}</p>
            </div>
          )}
          {project.story && (
            <div>
              <p className="font-label text-[9px] tracking-widest uppercase text-outline/50 mb-1">The Story</p>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">{project.story}</p>
            </div>
          )}
          {project.challenges && project.challenges.length > 0 && (
            <div>
              <p className="font-label text-[9px] tracking-widest uppercase text-outline/50 mb-1.5">Engineering Challenges</p>
              <ul className="space-y-2">
                {project.challenges.map((c, i) => (
                  <li key={i} className="flex gap-2 text-[11px] text-on-surface-variant leading-relaxed">
                    <span className={cn("shrink-0 mt-0.5 font-bold", accentColor)}>›</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

/* ─── Shared action icon row ──────────────────────────────────────────────── */

function ProjectActions({
  project,
  onWatch,
  hoverColor = "primary",
}: {
  project: Project
  onWatch: (p: Project) => void
  hoverColor?: "primary" | "secondary"
}) {
  const hoverCls =
    hoverColor === "secondary"
      ? "hover:text-secondary hover:border-secondary/30"
      : "hover:text-primary hover:border-primary/30"

  return (
    <div className="flex items-center gap-1.5 shrink-0">
      {project.youtubeId && (
        <button
          onClick={(e) => { e.stopPropagation(); onWatch(project) }}
          className={cn("p-1.5 rounded-lg ghost-border text-outline transition-all duration-200", hoverCls)}
          aria-label="Watch demo"
        >
          <CirclePlay className="h-3.5 w-3.5" />
        </button>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn("p-1.5 rounded-lg ghost-border text-outline transition-all duration-200", hoverCls)}
          aria-label="View source"
          onClick={(e) => e.stopPropagation()}
        >
          <GitHubIcon className="h-3.5 w-3.5" />
        </a>
      )}
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn("p-1.5 rounded-lg ghost-border text-outline transition-all duration-200", hoverCls)}
          aria-label="Visit project"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  )
}

/* ─── Featured Card (equal, col-span-6 each) ─────────────────────────────── */

function FeaturedCard({
  project,
  onWatch,
  colSpan = "lg:col-span-6",
  accent = "primary",
}: {
  project: Project
  onWatch: (p: Project) => void
  colSpan?: string
  accent?: "primary" | "secondary"
}) {
  const hoverBorder =
    accent === "secondary"
      ? "hover:border-secondary/25 hover:shadow-[0_24px_48px_rgba(0,0,0,0.5),0_0_40px_rgba(221,183,255,0.06)]"
      : "hover:border-primary/25 hover:shadow-[0_24px_48px_rgba(0,0,0,0.5),0_0_40px_rgba(173,198,255,0.06)]"

  const gradientBg =
    accent === "secondary"
      ? "bg-gradient-to-br from-secondary/10 to-primary/5"
      : "bg-gradient-to-br from-primary/10 to-secondary/5"

  const accentPulse = accent === "secondary" ? "bg-secondary animate-pulse" : "bg-primary animate-pulse"

  const liveBadgeText = accent === "secondary" ? "text-secondary/80" : "text-primary/80"

  const watchBtnCls =
    accent === "secondary"
      ? "bg-secondary text-on-secondary"
      : "bg-primary text-on-primary"

  return (
    <div
      className={cn(
        "group ghost-border rounded-xl overflow-hidden bg-surface-container-low kinetic-shadow flex flex-col transition-all duration-500 hover:scale-[1.01]",
        hoverBorder,
        colSpan
      )}
    >
      <TerminalHeader filePath={project.filePath} status={project.status} />

      {/* Image/visual area */}
      <div className="relative h-44 bg-surface-container overflow-hidden shrink-0">
        <div className={cn("absolute inset-0 opacity-60", gradientBg)} />
        <div className="absolute inset-0 dot-grid opacity-10" />
        {/* Live feed badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 ghost-border rounded-full px-2.5 py-1 bg-surface-container-high/60 backdrop-blur-sm">
          <span className={cn("h-1.5 w-1.5 rounded-full", accentPulse)} />
          <span className={cn("font-label text-[9px] tracking-widest uppercase", liveBadgeText)}>
            {project.status ?? "Live"}
          </span>
        </div>
        {/* Decorative code lines */}
        <div className="absolute bottom-4 left-4 right-4 opacity-20">
          {[60, 80, 45, 70, 35].map((w, i) => (
            <div key={i} className="flex items-center gap-2 mb-1.5">
              <span className="font-label text-[8px] text-outline/60 w-4 text-right">{i + 1}</span>
              <div className="h-1.5 rounded-full bg-on-surface/40" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
        {/* Video hover overlay */}
        {project.youtubeId && (
          <button
            onClick={() => onWatch(project)}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/40 backdrop-blur-sm"
          >
            <div className={cn("flex items-center gap-2 px-5 py-2.5 rounded-full font-label text-[11px] tracking-widest uppercase font-semibold", watchBtnCls)}>
              <Play className="h-3.5 w-3.5 fill-current" /> Watch Demo
            </div>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3
            className={cn(
              "font-headline text-xl font-bold text-on-surface tracking-tight transition-colors duration-300",
              accent === "secondary" ? "group-hover:text-secondary" : "group-hover:text-primary"
            )}
          >
            {project.name}
          </h3>
          <ProjectActions project={project} onWatch={onWatch} hoverColor={accent} />
        </div>
        <p
          className={cn(
            "font-label text-[11px] tracking-wider uppercase mb-2",
            accent === "secondary" ? "text-secondary/70" : "text-primary/70"
          )}
        >
          {project.tagline}
        </p>
        <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-1">
          {project.tech.map((t) => (
            <TechChip key={t} label={t} variant={accent} />
          ))}
        </div>
        <StoryPanel project={project} accent={accent} />
      </div>
    </div>
  )
}

/* ─── Medium Card ─────────────────────────────────────────────────────────── */

function MediumCard({
  project,
  onWatch,
  colSpan,
  accent = "secondary",
}: {
  project: Project
  onWatch: (p: Project) => void
  colSpan: string
  accent?: "primary" | "secondary"
}) {
  const hoverBorder =
    accent === "secondary"
      ? "hover:border-secondary/25 hover:shadow-[0_24px_48px_rgba(0,0,0,0.5),0_0_40px_rgba(221,183,255,0.06)]"
      : "hover:border-primary/25"

  return (
    <div
      className={cn(
        "group ghost-border rounded-xl overflow-hidden bg-surface-container-low kinetic-shadow flex flex-col transition-all duration-500 hover:scale-[1.01]",
        hoverBorder,
        colSpan
      )}
    >
      <TerminalHeader filePath={project.filePath} status={project.status} />

      {/* Visual area */}
      <div className="relative h-24 bg-surface-container overflow-hidden shrink-0">
        <div
          className={cn(
            "absolute inset-0",
            accent === "secondary"
              ? "bg-gradient-to-br from-secondary/8 to-primary/4"
              : "bg-gradient-to-br from-primary/8 to-secondary/4"
          )}
        />
        <div className="absolute inset-0 dot-grid opacity-[0.07]" />
        <span className="absolute bottom-1.5 right-3 font-label text-3xl font-black text-on-surface/[0.04] tracking-tighter select-none">
          {project.id.slice(-2).toUpperCase()}
        </span>
        {project.youtubeId && (
          <button
            onClick={() => onWatch(project)}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background/40 backdrop-blur-sm"
          >
            <div
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-2 rounded-full font-label text-[10px] tracking-widest uppercase font-semibold",
                accent === "secondary" ? "bg-secondary text-on-secondary" : "bg-primary text-on-primary"
              )}
            >
              <Play className="h-3 w-3 fill-current" /> Demo
            </div>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3
            className={cn(
              "font-headline text-base font-bold text-on-surface tracking-tight transition-colors duration-300",
              accent === "secondary" ? "group-hover:text-secondary" : "group-hover:text-primary"
            )}
          >
            {project.name}
          </h3>
          <ProjectActions project={project} onWatch={onWatch} hoverColor={accent} />
        </div>
        <p
          className={cn(
            "font-label text-[10px] tracking-wider uppercase mb-2",
            accent === "secondary" ? "text-secondary/70" : "text-primary/70"
          )}
        >
          {project.tagline}
        </p>
        <p className="text-xs text-on-surface-variant leading-relaxed flex-1 mb-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {project.tech.slice(0, 3).map((t) => (
            <TechChip key={t} label={t} variant={accent} />
          ))}
          {project.tech.length > 3 && (
            <span className="font-label text-[9px] text-outline/60 self-center">
              +{project.tech.length - 3}
            </span>
          )}
        </div>
        <StoryPanel project={project} accent={accent} />
      </div>
    </div>
  )
}

/* ─── Main Section ────────────────────────────────────────────────────────── */

export function ProjectsSection() {
  const [videoProject, setVideoProject] = useState<Project | null>(null)

  const [p0, p1, p2, p3, p4] = PROJECTS

  return (
    <section id="projects" className="relative py-28 px-6 md:px-10 bg-background">
      <div className="absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-secondary/4 blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <SectionLabel className="mb-4">Work</SectionLabel>
            <h2 className="font-headline text-4xl md:text-5xl font-black tracking-tight leading-tight">
              <span className="text-on-surface">Things I&apos;ve</span>{" "}
              <span className="gradient-text">built.</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 ghost-border rounded-full px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-label text-[9px] tracking-widest uppercase text-outline">
              {PROJECTS.length} projects
            </span>
          </div>
        </div>

        {/* Row 1 — ApplyingPal + YOTA, equal spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {p0 && (
            <FeaturedCard
              project={p0}
              onWatch={setVideoProject}
              colSpan=""
              accent="primary"
            />
          )}
          {p1 && (
            <FeaturedCard
              project={p1}
              onWatch={setVideoProject}
              colSpan=""
              accent="secondary"
            />
          )}
        </div>

        {/* Row 2 — three medium cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {p2 && (
            <MediumCard project={p2} onWatch={setVideoProject} colSpan="" accent="primary" />
          )}
          {p3 && (
            <MediumCard project={p3} onWatch={setVideoProject} colSpan="" accent="secondary" />
          )}
          {p4 && (
            <MediumCard project={p4} onWatch={setVideoProject} colSpan="" accent="primary" />
          )}
        </div>
      </div>

      {videoProject?.youtubeId && (
        <VideoModal
          youtubeId={videoProject.youtubeId}
          title={videoProject.name}
          onClose={() => setVideoProject(null)}
        />
      )}
    </section>
  )
}
