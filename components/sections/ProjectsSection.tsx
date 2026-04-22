"use client"

import { useState } from "react"
import { ExternalLink, Play, CirclePlay, ChevronDown } from "lucide-react"
import { GitHubIcon } from "@/components/ui/icons"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { TechChip } from "@/components/ui/TechChip"
import { VideoModal } from "@/components/ui/VideoModal"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  useCollapsible,
} from "@/components/ui/collapsible"
import { PROJECTS } from "@/lib/constants"
import type { Project } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useTrackSection } from "@/hooks/useTrackSection"
import {
  trackProjectLink,
  trackProjectDemo,
  trackProjectStoryToggle,
} from "@/lib/analytics"

/* ─── Terminal Chrome Header ──────────────────────────────────────────────── */

function TerminalHeader({
  filePath,
  status,
}: {
  filePath?: string
  status?: string
}) {
  return (
    <div className="flex shrink-0 items-center gap-3 border-b border-outline-variant/10 bg-surface-container-high/60 px-4 py-2.5">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-error/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-tertiary/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/40" />
      </div>
      {filePath && (
        <span className="flex-1 truncate font-label text-[10px] tracking-tighter text-outline-variant/50 uppercase">
          {filePath}
        </span>
      )}
      {status && (
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          <span className="font-label text-[9px] tracking-widest text-primary/70 uppercase">
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
  return (
    <ChevronDown
      className={cn(
        "h-3 w-3 transition-transform duration-200",
        isOpen && "rotate-180"
      )}
    />
  )
}

function StoryPanel({
  project,
  accent = "primary",
}: {
  project: Project
  accent?: "primary" | "secondary"
}) {
  if (!project.problem && !project.story && !project.challenges?.length)
    return null

  const accentColor =
    accent === "secondary" ? "text-secondary/60" : "text-primary/60"
  const dotColor = accent === "secondary" ? "bg-secondary/70" : "bg-primary/70"
  const hoverStyle =
    accent === "secondary"
      ? "hover:bg-secondary/8 hover:border-secondary/20 hover:text-on-surface-variant"
      : "hover:bg-primary/8 hover:border-primary/20 hover:text-on-surface-variant"

  return (
    <Collapsible
      className="mt-auto border-t border-outline-variant/20"
      onOpenChange={(open) => trackProjectStoryToggle(project.name, open)}
    >
      <CollapsibleTrigger
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "mt-2 mb-0.5 flex w-full items-center justify-between rounded-lg px-2.5 py-1.5",
          "border border-transparent text-outline transition-all duration-200",
          hoverStyle
        )}
      >
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "h-1.5 w-1.5 shrink-0 animate-pulse rounded-full",
              dotColor
            )}
          />
          <span className="font-label text-[10px] tracking-widest uppercase">
            Behind the build
          </span>
        </div>
        <StoryChevron />
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="space-y-3.5 pt-2 pb-1">
          {project.builtWhen && (
            <div className="flex items-center gap-1.5">
              <span className="h-1 w-1 shrink-0 rounded-full bg-outline/30" />
              <span className="font-label text-[9px] tracking-widest text-outline/50 uppercase">
                {project.builtWhen}
              </span>
            </div>
          )}
          {project.problem && (
            <div>
              <p
                className={cn(
                  "mb-1 font-label text-[9px] tracking-widest uppercase",
                  accentColor
                )}
              >
                The Problem
              </p>
              <p className="text-[11px] leading-relaxed text-on-surface-variant">
                {project.problem}
              </p>
            </div>
          )}
          {project.story && (
            <div>
              <p className="mb-1 font-label text-[9px] tracking-widest text-outline/50 uppercase">
                The Story
              </p>
              <p className="text-[11px] leading-relaxed text-on-surface-variant">
                {project.story}
              </p>
            </div>
          )}
          {project.challenges && project.challenges.length > 0 && (
            <div>
              <p className="mb-1.5 font-label text-[9px] tracking-widest text-outline/50 uppercase">
                Engineering Challenges
              </p>
              <ul className="space-y-2">
                {project.challenges.map((c, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-[11px] leading-relaxed text-on-surface-variant"
                  >
                    <span
                      className={cn("mt-0.5 shrink-0 font-bold", accentColor)}
                    >
                      ›
                    </span>
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
    <div className="flex shrink-0 items-center gap-1.5">
      {project.youtubeId && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            trackProjectDemo(project.name)
            onWatch(project)
          }}
          className={cn(
            "ghost-border rounded-lg p-1.5 text-outline transition-all duration-200",
            hoverCls
          )}
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
          className={cn(
            "ghost-border rounded-lg p-1.5 text-outline transition-all duration-200",
            hoverCls
          )}
          aria-label="View source"
          onClick={(e) => {
            e.stopPropagation()
            trackProjectLink(project.name, "github")
          }}
        >
          <GitHubIcon className="h-3.5 w-3.5" />
        </a>
      )}
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "ghost-border rounded-lg p-1.5 text-outline transition-all duration-200",
            hoverCls
          )}
          aria-label="Visit project"
          onClick={(e) => {
            e.stopPropagation()
            trackProjectLink(project.name, "live")
          }}
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

  const accentPulse =
    accent === "secondary"
      ? "bg-secondary animate-pulse"
      : "bg-primary animate-pulse"

  const liveBadgeText =
    accent === "secondary" ? "text-secondary/80" : "text-primary/80"

  const watchBtnCls =
    accent === "secondary"
      ? "bg-secondary text-on-secondary"
      : "bg-primary text-on-primary"

  return (
    <div
      className={cn(
        "group ghost-border kinetic-shadow flex flex-col overflow-hidden rounded-xl bg-surface-container-low transition-all duration-500 hover:scale-[1.01]",
        hoverBorder,
        colSpan
      )}
    >
      <TerminalHeader filePath={project.filePath} status={project.status} />

      {/* Image/visual area */}
      <div className="relative h-36 shrink-0 overflow-hidden bg-surface-container sm:h-40 md:h-44">
        <div className={cn("absolute inset-0 opacity-60", gradientBg)} />
        <div className="dot-grid absolute inset-0 opacity-10" />
        {/* Live feed badge */}
        <div className="ghost-border absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-surface-container-high/60 px-2.5 py-1 backdrop-blur-sm">
          <span className={cn("h-1.5 w-1.5 rounded-full", accentPulse)} />
          <span
            className={cn(
              "font-label text-[9px] tracking-widest uppercase",
              liveBadgeText
            )}
          >
            {project.status ?? "Live"}
          </span>
        </div>
        {/* Decorative code lines */}
        <div className="absolute right-4 bottom-4 left-4 opacity-20">
          {[60, 80, 45, 70, 35].map((w, i) => (
            <div key={i} className="mb-1.5 flex items-center gap-2">
              <span className="w-4 text-right font-label text-[8px] text-outline/60">
                {i + 1}
              </span>
              <div
                className="h-1.5 rounded-full bg-on-surface/40"
                style={{ width: `${w}%` }}
              />
            </div>
          ))}
        </div>
        {/* Video hover overlay */}
        {project.youtubeId && (
          <button
            onClick={() => {
              trackProjectDemo(project.name)
              onWatch(project)
            }}
            className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
          >
            <div
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-2.5 font-label text-[11px] font-semibold tracking-widest uppercase",
                watchBtnCls
              )}
            >
              <Play className="h-3.5 w-3.5 fill-current" /> Watch Demo
            </div>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3
            className={cn(
              "font-headline text-xl font-bold tracking-tight text-on-surface transition-colors duration-300",
              accent === "secondary"
                ? "group-hover:text-secondary"
                : "group-hover:text-primary"
            )}
          >
            {project.name}
          </h3>
          <ProjectActions
            project={project}
            onWatch={onWatch}
            hoverColor={accent}
          />
        </div>
        <p
          className={cn(
            "mb-2 font-label text-[11px] tracking-wider uppercase",
            accent === "secondary" ? "text-secondary/70" : "text-primary/70"
          )}
        >
          {project.tagline}
        </p>
        <p className="mb-4 text-sm leading-relaxed text-on-surface-variant">
          {project.description}
        </p>
        <div className="mb-5 flex flex-wrap gap-1.5">
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
        "group ghost-border kinetic-shadow flex flex-col overflow-hidden rounded-xl bg-surface-container-low transition-all duration-500 hover:scale-[1.01]",
        hoverBorder,
        colSpan
      )}
    >
      <TerminalHeader filePath={project.filePath} status={project.status} />

      {/* Visual area */}
      <div className="relative h-20 shrink-0 overflow-hidden bg-surface-container sm:h-24">
        <div
          className={cn(
            "absolute inset-0",
            accent === "secondary"
              ? "bg-gradient-to-br from-secondary/8 to-primary/4"
              : "bg-gradient-to-br from-primary/8 to-secondary/4"
          )}
        />
        <div className="dot-grid absolute inset-0 opacity-[0.07]" />
        <span className="absolute right-3 bottom-1.5 font-label text-3xl font-black tracking-tighter text-on-surface/[0.04] select-none">
          {project.id.slice(-2).toUpperCase()}
        </span>
        {project.youtubeId && (
          <button
            onClick={() => {
              trackProjectDemo(project.name)
              onWatch(project)
            }}
            className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100"
          >
            <div
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3.5 py-2 font-label text-[10px] font-semibold tracking-widest uppercase",
                accent === "secondary"
                  ? "bg-secondary text-on-secondary"
                  : "bg-primary text-on-primary"
              )}
            >
              <Play className="h-3 w-3 fill-current" /> Demo
            </div>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1.5 flex items-start justify-between gap-2">
          <h3
            className={cn(
              "font-headline text-base font-bold tracking-tight text-on-surface transition-colors duration-300",
              accent === "secondary"
                ? "group-hover:text-secondary"
                : "group-hover:text-primary"
            )}
          >
            {project.name}
          </h3>
          <ProjectActions
            project={project}
            onWatch={onWatch}
            hoverColor={accent}
          />
        </div>
        <p
          className={cn(
            "mb-2 font-label text-[10px] tracking-wider uppercase",
            accent === "secondary" ? "text-secondary/70" : "text-primary/70"
          )}
        >
          {project.tagline}
        </p>
        <p className="mb-3 flex-1 text-xs leading-relaxed text-on-surface-variant">
          {project.description}
        </p>
        <div className="mb-4 flex flex-wrap gap-1">
          {project.tech.slice(0, 3).map((t) => (
            <TechChip key={t} label={t} variant={accent} />
          ))}
          {project.tech.length > 3 && (
            <span className="self-center font-label text-[9px] text-outline/60">
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
  const sectionRef = useTrackSection<HTMLElement>("projects")
  const [videoProject, setVideoProject] = useState<Project | null>(null)

  const [p0, p1, p2, p3, p4] = PROJECTS

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-background px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute top-20 left-1/2 h-[250px] w-[250px] -translate-x-1/2 rounded-full bg-secondary/4 blur-[80px] md:h-[500px] md:w-[500px] md:blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between sm:mb-12 sm:items-end">
          <div>
            <SectionLabel className="mb-4">Work</SectionLabel>
            <h2 className="font-headline text-3xl leading-tight font-black tracking-tight sm:text-4xl md:text-5xl">
              <span className="text-on-surface">Things I&apos;ve</span>{" "}
              <span className="gradient-text">built.</span>
            </h2>
          </div>
          <div className="ghost-border hidden items-center gap-2 rounded-full px-3 py-1.5 md:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            <span className="font-label text-[9px] tracking-widest text-outline uppercase">
              {PROJECTS.length} projects
            </span>
          </div>
        </div>

        {/* Row 1 — ApplyingPal + YOTA, equal spotlight */}
        <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {p2 && (
            <MediumCard
              project={p2}
              onWatch={setVideoProject}
              colSpan=""
              accent="primary"
            />
          )}
          {p3 && (
            <MediumCard
              project={p3}
              onWatch={setVideoProject}
              colSpan=""
              accent="secondary"
            />
          )}
          {p4 && (
            <MediumCard
              project={p4}
              onWatch={setVideoProject}
              colSpan=""
              accent="primary"
            />
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
