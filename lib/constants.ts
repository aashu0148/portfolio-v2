import type { NavLink, ExperienceItem, Project, SkillCategory } from "./types"

/* ─── Personal ───── */

export const PERSONAL = {
  name: "Anshul",
  fullName: "Anshul Sharma",
  alias: "Anshul",
  role: "Frontend Engineer",
  tagline:
    "Building intuitive UIs and AI-driven tools with a sharp eye for craft.",
  bio: "Frontend engineer with 4+ years building scalable web applications. I specialize in creating intuitive UIs and AI-driven tools — from no-code builders and agentic chat UIs to real-time dashboards and Chrome extensions. I thrive in lean, fast-paced teams where individual impact is visible and shipping matters.",
  email: "aashu.1st@gmail.com",
  github: "https://github.com/aashu0148",
  linkedin: "https://linkedin.com/in/aashu0148",
  website: "https://anshul-sharma.in",
  location: "India",
  timezone: "IST (UTC+5:30)",
} as const

/* ─── Navigation ─── */

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

/* ─── Experience ─── */

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "vectorshift",
    role: "Frontend Engineer",
    company: "Vectorshift",
    companyUrl: "https://vectorshift.ai",
    badge: "YC S23",
    period: "Jan 2025 — Mar 2025",
    location: "Remote",
    description:
      "Led the frontend revamp of a no-code AI workflow builder used by teams to build and deploy AI pipelines without writing code.",
    highlights: [
      "Generalized 100+ unique node types into a single config-driven system, eliminating per-node boilerplate and making additions a one-liner",
      "Built an agentic chatbot UI supporting 1,000+ message conversations with sub-100ms interaction times via virtualized rendering and incremental state updates",
      "Developed real-time analytics dashboards showing pipeline execution metrics, latency breakdowns, and error traces",
      "Owned the Marketplace frontend end-to-end — browse, preview, fork, and deploy community templates — driving 40%+ template adoption among new users",
    ],
    learnings: [
      "Config-driven UI architecture scales dramatically better than component-per-feature as a product grows",
      "Performance in chat UIs is non-negotiable — virtualization and incremental appending are table stakes at scale",
      "Owning a complete product surface (Marketplace) taught me how to think in user flows, not just components",
      "YC-backed startups move at a pace that forces you to be comfortable shipping 80% solutions and iterating fast",
    ],
    feedback:
      "Praised for moving fast without sacrificing code quality, and for proactively improving DX across the codebase with shared abstractions.",
    reasonForLeaving:
      "Short contract engagement — wrapped up after the planned scope was delivered. Positive experience overall.",
    tech: [
      "React",
      "TypeScript",
      "WebSockets",
      "Zustand",
      "Tailwind CSS",
      "FastAPI",
    ],
  },
  {
    id: "permar",
    role: "Founding Frontend Engineer",
    company: "Permar AI",
    companyUrl: "https://permar.ai",
    period: "Apr 2023 — Dec 2024",
    location: "Remote",
    description:
      "First frontend hire at an AI-powered no-code website builder — built core product from scratch and shaped the entire frontend architecture.",
    highlights: [
      "Built a Framer-like drag-and-drop website builder with AI-driven creation and editing — every layout, component, and style was configurable via a custom property panel",
      "Designed and implemented a high-performance SSR/edge renderer that served published websites with near-instant load times and perfect Core Web Vitals",
      "Built an AI-powered blog editor on top of Lexical with real-time AI suggestions, inline rewrites, and SEO scoring",
      "Established the entire frontend architecture: monorepo, shared design system, CI/CD pipeline, and review conventions",
    ],
    learnings: [
      "Building a no-code builder forces you to deeply understand how component trees, layout systems, and state machines actually work",
      "Being a founding engineer means your decisions compound — bad abstractions early cost weeks later",
      "SSR and edge rendering require thinking about data fetching, caching, and hydration as first-class concerns, not afterthoughts",
      "Working directly with founders taught me how to translate business goals into technical bets",
    ],
    feedback:
      "Recognized for exceptional ownership — described as 'the person who made the product real' by the founding team.",
    reasonForLeaving:
      "Company pivoted away from the website builder towards a narrower enterprise use case that didn't align with the frontend-heavy work I was doing.",
    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "Lexical",
      "Tailwind CSS",
      "Firebase",
      "Node.js",
    ],
  },
  {
    id: "hushl",
    role: "Software Engineer",
    company: "Hushl",
    companyUrl: "https://hushl.in",
    period: "May 2022 — Apr 2023",
    location: "Remote",
    description:
      "Early employee at a social content platform — owned the Chrome extension product from zero to 5,000+ installs.",
    highlights: [
      "Built and shipped a Chrome extension for LinkedIn and X (Twitter) that surfaced relevant conversation starters and reply suggestions powered by AI",
      "Delivered the full MVP — from concept to published extension — in ~20 days, including the content script, popup UI, background worker, and backend integration",
      "Grew the extension to 5,000+ organic installs with no paid acquisition",
      "Built the core web app alongside the extension, sharing auth state and user preferences between both surfaces",
    ],
    learnings: [
      "Chrome extensions have uniquely constrained environments — content scripts, service workers, CSP rules, and manifest v3 quirks require careful architecture",
      "Speed of execution at an early startup is a skill in itself — shipping a working product in 20 days required cutting scope ruthlessly while keeping quality intact",
      "User feedback loop is tightest when you build something people use daily — extension reviews and uninstall reasons were my best product insights",
    ],
    feedback:
      "Known for shipping quickly and reliably — the go-to engineer for anything that needed to be done fast without cutting corners.",
    reasonForLeaving:
      "Pursued a more technically challenging role with higher growth potential.",
    tech: [
      "React",
      "TypeScript",
      "Chrome Extensions",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
  },
]

/* ─── Skills ─────── */

export const SKILLS: SkillCategory[] = [
  {
    category: "Core",
    skills: [
      { name: "TypeScript / JavaScript", level: "production" },
      { name: "React.js / Next.js", level: "production" },
      { name: "HTML, CSS, Tailwind", level: "production" },
    ],
  },
  {
    category: "State & Data",
    skills: [
      { name: "Zustand / Redux", level: "production" },
      { name: "React Query", level: "production" },
      { name: "Socket.io / WebSockets", level: "production" },
      { name: "Firebase / MongoDB", level: "production" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js / Express.js", level: "production" },
      { name: "Stripe / Razorpay", level: "production" },
      { name: "Chrome Extensions", level: "production" },
    ],
  },
  {
    category: "Familiar",
    skills: [
      { name: "NestJS", level: "familiar" },
      { name: "PostgreSQL / TypeORM", level: "familiar" },
      { name: "Python (scripting)", level: "familiar" },
      { name: "Puppeteer / E2E", level: "familiar" },
    ],
  },
]

/* ─── Projects ─── */

export const PROJECTS: Project[] = [
  {
    id: "applying-pal",
    name: "Applying Pal",
    tagline: "Apply to tech jobs 10× faster",
    description:
      "A Chrome extension + web app that auto-fills job applications using AI. Supports 6+ platforms (LinkedIn, Greenhouse, Lever, Ashby, Workable, Indeed), parses your resume on install, and generates tailored answers to custom application questions.",
    tech: ["Chrome Extension", "React", "TypeScript", "OpenAI", "Node.js"],
    url: "https://applyingpal.com",
    filePath: "src / chrome / applying_pal",
    status: "LIVE",
  },
  {
    id: "yota",
    name: "YOTA",
    tagline: "Autonomous Indian stock trading bot",
    description:
      "An AI-powered stock market trading bot that autonomously identifies opportunities, places trades, and manages positions on Indian markets — including early exits when trades move against the thesis.",
    tech: ["Python", "TypeScript", "React", "WebSockets", "Zerodha API"],
    githubUrl: "https://github.com/aashu0148/yota",
    filePath: "src / trading / yota",
    status: "ACTIVE",
  },
  {
    id: "cricket-fantasy",
    name: "Cricket Fantasy",
    tagline: "Full-stack fantasy cricket platform",
    description:
      "A real-time fantasy cricket app with live player drafts via Socket.io, Google Sign-In, league creation, and an admin panel with full CRUD for tournament and match management.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io", "Express.js"],
    githubUrl: "https://github.com/aashu0148/cricket-fantasy",
    filePath: "src / fantasy / cricket",
    status: "STABLE",
  },
  {
    id: "music-sync",
    name: "SyncPlay",
    tagline: "Synchronized social music listening",
    description:
      "A social music-listening platform where multiple users stay perfectly in sync — same song, same timestamp. Includes real-time chat and voice interactions powered by WebSockets.",
    tech: ["React", "Node.js", "Socket.io", "WebRTC", "MongoDB"],
    githubUrl: "https://github.com/aashu0148/syncplay",
    filePath: "src / realtime / syncplay",
    status: "STABLE",
  },
  {
    id: "bug-shooter",
    name: "Bug Shooter",
    tagline: "Multiplayer endless TypeScript game",
    description:
      "An endless competitive multiplayer game built with MERN + Socket.io. Players battle real-time against each other in a bug-shooting arena with live leaderboards.",
    tech: ["TypeScript", "React", "Node.js", "Socket.io", "MongoDB"],
    githubUrl: "https://github.com/aashu0148/bug-shooter",
    filePath: "src / game / bug_shooter",
    status: "STABLE",
  },
]

/* ─── About Stats ── */

export const ABOUT_STATS = [
  { label: "Years of experience", value: "4+" },
  { label: "Projects shipped", value: "15+" },
  { label: "GitHub contributions", value: "11k+" },
  { label: "Lines of code", value: "∞" },
]
