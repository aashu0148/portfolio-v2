/* ─── GitHub Data ─────────────────────────────────────────────────────────── */

export interface ContributionDay {
  date: string
  count: number
  color: string
  intensity: "0" | "1" | "2" | "3" | "4"
}

export interface ContributionYear {
  year: string
  total: number
  range: {
    start: string
    end: string
  }
}

export interface GithubData {
  years: ContributionYear[]
  contributions: ContributionDay[]
}

export interface WeekColumn {
  weekIndex: number
  days: (ContributionDay | null)[]
}

export interface ParsedContributions {
  weeks: WeekColumn[]
  year: string
  total: number
}

/* ─── Experience ──────────────────────────────────────────────────────────── */

export interface ExperienceItem {
  id: string
  role: string
  company: string
  companyUrl?: string
  badge?: string
  period: string
  location: string
  description: string
  highlights: string[]
  learnings: string[]
  feedback?: string
  reasonForLeaving?: string
  tech: string[]
}

/* ─── Projects ────────────────────────────────────────────────────────────── */

export interface Project {
  id: string
  name: string
  tagline: string
  description: string
  problem?: string
  story?: string
  challenges?: string[]
  builtWhen?: string
  tech: string[]
  url?: string
  githubUrl?: string
  youtubeId?: string
  filePath?: string
  status?: string
}

/* ─── Skills ──────────────────────────────────────────────────────────────── */

export interface Skill {
  name: string
  level: "production" | "familiar"
}

export interface SkillCategory {
  category: string
  skills: Skill[]
}

/* ─── Navigation ──────────────────────────────────────────────────────────── */

export interface NavLink {
  label: string
  href: string
}
