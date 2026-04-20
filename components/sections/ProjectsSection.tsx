"use client"

import { useState } from "react"
import { ExternalLink, Play, CirclePlay } from "lucide-react"
import { GitHubIcon } from "@/components/ui/icons"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { TechChip } from "@/components/ui/TechChip"
import { VideoModal } from "@/components/ui/VideoModal"
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

/* ─── Featured Card (col-span-8) ─────────────────────────────────────────── */

function FeaturedCard({ project, onWatch }: { project: Project; onWatch: (p: Project) => void }) {
  return (
    <div className="group ghost-border rounded-xl overflow-hidden bg-surface-container-low kinetic-shadow flex flex-col transition-all duration-500 hover:scale-[1.01] hover:border-primary/25 hover:shadow-[0_24px_48px_rgba(0,0,0,0.5),0_0_40px_rgba(173,198,255,0.06)] lg:col-span-8">
      <TerminalHeader filePath={project.filePath} status={project.status} />

      {/* Image/visual area */}
      <div className="relative h-52 bg-surface-container overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/5 opacity-60" />
        <div className="absolute inset-0 dot-grid opacity-10" />
        {/* Live feed badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 ghost-border rounded-full px-2.5 py-1 bg-surface-container-high/60 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="font-label text-[9px] tracking-widest uppercase text-primary/80">Live</span>
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
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary font-label text-[11px] tracking-widest uppercase font-semibold">
              <Play className="h-3.5 w-3.5 fill-current" /> Watch Demo
            </div>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-headline text-2xl font-bold text-on-surface tracking-tight group-hover:text-primary transition-colors duration-300">
            {project.name}
          </h3>
          <ProjectActions project={project} onWatch={onWatch} hoverColor="primary" />
        </div>
        <p className="font-label text-[11px] tracking-wider uppercase text-primary/70 mb-2">
          {project.tagline}
        </p>
        <p className="text-sm text-on-surface-variant leading-relaxed mb-4 flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => <TechChip key={t} label={t} variant="primary" />)}
        </div>
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
  const hoverBorder = accent === "secondary" ? "hover:border-secondary/25 hover:shadow-[0_24px_48px_rgba(0,0,0,0.5),0_0_40px_rgba(221,183,255,0.06)]" : "hover:border-primary/25"

  return (
    <div className={cn(
      "group ghost-border rounded-xl overflow-hidden bg-surface-container-low kinetic-shadow flex flex-col transition-all duration-500 hover:scale-[1.01]",
      hoverBorder,
      colSpan
    )}>
      <TerminalHeader filePath={project.filePath} status={project.status} />

      {/* Visual area */}
      <div className="relative h-28 bg-surface-container overflow-hidden shrink-0">
        <div className={cn(
          "absolute inset-0",
          accent === "secondary" ? "bg-gradient-to-br from-secondary/8 to-primary/4" : "bg-gradient-to-br from-primary/8 to-secondary/4"
        )} />
        <div className="absolute inset-0 dot-grid opacity-[0.07]" />
        <span className="absolute bottom-1.5 right-3 font-label text-3xl font-black text-on-surface/[0.04] tracking-tighter select-none">
          {project.id.slice(-2).toUpperCase()}
        </span>
        {project.youtubeId && (
          <button
            onClick={() => onWatch(project)}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background/40 backdrop-blur-sm"
          >
            <div className={cn(
              "flex items-center gap-1.5 px-3.5 py-2 rounded-full font-label text-[10px] tracking-widest uppercase font-semibold",
              accent === "secondary" ? "bg-secondary text-on-secondary" : "bg-primary text-on-primary"
            )}>
              <Play className="h-3 w-3 fill-current" /> Demo
            </div>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className={cn(
            "font-headline text-lg font-bold text-on-surface tracking-tight transition-colors duration-300",
            accent === "secondary" ? "group-hover:text-secondary" : "group-hover:text-primary"
          )}>
            {project.name}
          </h3>
          <ProjectActions project={project} onWatch={onWatch} hoverColor={accent} />
        </div>
        <p className={cn(
          "font-label text-[10px] tracking-wider uppercase mb-2",
          accent === "secondary" ? "text-secondary/70" : "text-primary/70"
        )}>
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
            <span className="font-label text-[9px] text-outline/60 self-center">+{project.tech.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Wide Row Card ───────────────────────────────────────────────────────── */

function WideCard({
  project,
  onWatch,
  colSpan,
}: {
  project: Project
  onWatch: (p: Project) => void
  colSpan: string
}) {
  return (
    <div className={cn(
      "group ghost-border rounded-xl overflow-hidden bg-surface-container-low kinetic-shadow transition-all duration-500 hover:scale-[1.01] hover:border-outline-variant/30",
      colSpan
    )}>
      <TerminalHeader filePath={project.filePath} status={project.status} />
      <div className="p-5 flex gap-5">
        {/* Decorative side accent */}
        <div className="hidden sm:flex flex-col items-center gap-2 shrink-0">
          <div className="h-10 w-10 rounded-xl ghost-border bg-surface-container flex items-center justify-center group-hover:border-primary/25 transition-colors duration-300">
            <span className="font-label text-xs font-black text-primary/50">{project.id.slice(-2).toUpperCase()}</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <h3 className="font-headline text-lg font-bold text-on-surface group-hover:text-primary transition-colors duration-300">
              {project.name}
            </h3>
            <ProjectActions project={project} onWatch={onWatch} hoverColor="primary" />
          </div>
          <p className="font-label text-[10px] tracking-wider uppercase text-primary/70 mb-2">{project.tagline}</p>
          <p className="text-xs text-on-surface-variant leading-relaxed mb-3">{project.description}</p>
          <div className="flex flex-wrap gap-1">
            {project.tech.map((t) => <TechChip key={t} label={t} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Section ────────────────────────────────────────────────────────── */

export function ProjectsSection() {
  const [videoProject, setVideoProject] = useState<Project | null>(null)

  // Bento slots
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

        {/* Bento grid — Row 1: Featured (8) + Medium stack (4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
          {p0 && <FeaturedCard project={p0} onWatch={setVideoProject} />}

          {/* Right column — two stacked medium cards */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {p1 && <MediumCard project={p1} onWatch={setVideoProject} colSpan="" accent="secondary" />}
            {p2 && <MediumCard project={p2} onWatch={setVideoProject} colSpan="" accent="primary" />}
          </div>
        </div>

        {/* Row 2: Wide (7) + Medium (5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {p3 && <WideCard project={p3} onWatch={setVideoProject} colSpan="lg:col-span-7" />}
          {p4 && <MediumCard project={p4} onWatch={setVideoProject} colSpan="lg:col-span-5" accent="secondary" />}
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
