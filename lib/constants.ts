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
    builtWhen: "Early 2024",
    problem:
      "Applying to tech jobs means copy-pasting the same details into 50 different form fields across platforms with wildly different layouts — then staring at open-ended questions like 'Why do you want to work here?' for 10 minutes each time. The actual job search gets buried under mindless data entry.",
    story:
      "Built out of personal frustration during a job search. I was spending 3+ hours a day just filling out forms — not writing thoughtful applications, just feeding machines the same data over and over. I wanted a tool that would parse my resume once and handle the boilerplate, so I could focus on the parts that actually matter.",
    challenges: [
      "Reliably detecting form fields across 6+ platforms (each with completely different DOM structures) required a scoring system that evaluates field labels, placeholders, aria attributes, and position — not just brute-force CSS selectors.",
      "Preventing AI hallucinations on open-ended questions was critical for trust. The AI is strictly grounded to the user's own resume data — it can elaborate and rephrase, but it cannot invent experience that isn't there.",
      "Chrome's Manifest V3 replaced persistent background pages with service workers that can be killed at any time. The entire messaging architecture had to be rebuilt to handle worker restarts mid-session without losing state.",
    ],
    tech: ["Chrome Extension", "React", "TypeScript", "OpenAI", "Node.js"],
    url: "https://applyingpal.com",
    youtubeId: "dQw4w9WgXcQ",
    filePath: "src / chrome / applying_pal",
    status: "LIVE",
  },
  {
    id: "yota",
    name: "YOTA",
    tagline: "Autonomous Indian stock trading bot",
    description:
      "An AI-powered trading bot that autonomously identifies opportunities, places trades, and manages positions on Indian markets — including dynamic early exits when trades move against the thesis.",
    builtWhen: "Mid 2024",
    problem:
      "Intraday trading in Indian markets requires watching charts all day, executing trades within seconds, and maintaining strict risk discipline — all while emotions constantly push towards bad decisions. Most retail traders don't lose because their strategy is wrong; they lose because their execution is inconsistent.",
    story:
      "I'd been reading about quantitative trading and wanted to answer one question: can I build a bot that executes better than I would manually? Started by backtesting strategies on 2 years of NIFTY data, then moved to paper trading to validate signals, and eventually deployed live with real (small) capital via Zerodha's Kite API.",
    challenges: [
      "Zerodha's WebSocket tick feed is occasionally lossy under high market volatility. I built a reconciliation layer that cross-checks live ticks against REST API snapshots to ensure no trade signals are missed.",
      "Knowing when to exit early was far harder than entering. Fixed stop-losses don't account for changing market conditions — I built a dynamic system that adjusts thresholds based on real-time ATR (Average True Range) and momentum.",
      "Keeping the Python trading engine in sync with the React P&L dashboard required a reliable WebSocket bridge with graceful reconnection and state replay — losing position state mid-session with live trades open would be catastrophic.",
    ],
    tech: ["Python", "TypeScript", "React", "WebSockets", "Zerodha API"],
    githubUrl: "https://github.com/aashu0148/yota",
    youtubeId: "dQw4w9WgXcQ",
    filePath: "src / trading / yota",
    status: "ACTIVE",
  },
  {
    id: "cricket-fantasy",
    name: "Cricket Fantasy",
    tagline: "Full-stack fantasy cricket platform",
    description:
      "A real-time fantasy cricket app with live player drafts via Socket.io, Google Sign-In, league creation, and an admin panel with full CRUD for tournament and match management.",
    builtWhen: "IPL 2022 Season",
    problem:
      "Platforms like Dream11 are closed systems — you can't run private leagues with custom scoring rules, see raw player stats, or control team size limits. We wanted to run our own fantasy cricket league with friends during IPL with house rules.",
    story:
      "Started as a weekend hack during IPL 2022 when a group of friends wanted a custom league. What began as 'just an MVP for one season' turned into a full platform with real-time live drafts, Google auth, league management, and a proper admin panel built from scratch.",
    challenges: [
      "Synchronous live drafts with multiple people picking simultaneously had race conditions — two users could draft the same player in the same 200ms window. Solved with server-side turn locks and optimistic UI rollbacks on conflict.",
      "Building a full admin panel for tournament/match/player management from scratch revealed how much invisible infrastructure consumer-facing products depend on. This project taught me to always scope the 'boring' backend first.",
    ],
    tech: ["React", "Node.js", "MongoDB", "Socket.io", "Express.js"],
    githubUrl: "https://github.com/aashu0148/cricket-fantasy",
    youtubeId: "dQw4w9WgXcQ",
    filePath: "src / fantasy / cricket",
    status: "STABLE",
  },
  {
    id: "music-sync",
    name: "SyncPlay",
    tagline: "Synchronized social music listening",
    description:
      "A social music-listening platform where multiple users stay perfectly in sync — same song, same timestamp. Includes real-time chat and voice interactions powered by WebSockets and WebRTC.",
    builtWhen: "Mid 2022",
    problem:
      "During and after COVID, listening to music remotely with friends was either expensive (Spotify group sessions), fragmented (everyone drifting to different timestamps), or janky (screen-sharing a browser tab with audio lag). There was no clean 'same song, same moment' experience.",
    story:
      "I wanted to build the music equivalent of Netflix Party — same song, same timestamp, everyone together. The hard part wasn't building the UI; it was achieving millisecond-level sync across clients on completely different networks. That technical challenge is what drew me into the project.",
    challenges: [
      "True playback sync across clients with different network latencies required an NTP-inspired time-offset protocol. Each client continuously measures its clock drift from the server and compensates its playback position — not just 'play at the same time' but 'be at the same exact moment'.",
      "Coordinating WebRTC voice chat alongside Socket.io playback control required careful event ordering to prevent feedback loops where a user's microphone input would inadvertently trigger playback pause events.",
    ],
    tech: ["React", "Node.js", "Socket.io", "WebRTC", "MongoDB"],
    githubUrl: "https://github.com/aashu0148/syncplay",
    youtubeId: "dQw4w9WgXcQ",
    filePath: "src / realtime / syncplay",
    status: "STABLE",
  },
  {
    id: "bug-shooter",
    name: "Bug Shooter",
    tagline: "Multiplayer endless TypeScript game",
    description:
      "An endless competitive multiplayer game built with MERN + Socket.io. Players battle real-time against each other in a bug-shooting arena with live leaderboards and persistent scores.",
    builtWhen: "Late 2021",
    problem:
      "I wanted to deeply understand real-time multiplayer game architecture from first principles — specifically how authoritative server state, client-side prediction, and high-frequency Canvas rendering actually work in practice, not just in theory.",
    story:
      "This started as a learning experiment to understand how games like Agar.io work under the hood. The concept — shoot bugs, compete live on a leaderboard — was deliberately simple enough to build fast, but complex enough to surface all the hard problems of real-time multiplayer.",
    challenges: [
      "Server-authoritative state with client-side prediction is the classic multiplayer tradeoff. Optimistic client updates occasionally diverged from server ground truth, causing 'ghost' entities that would snap to wrong positions. Solved with delta reconciliation and smooth interpolation.",
      "Keeping Canvas rendering smooth at 60fps for multiple simultaneous players required only redrawing dirty regions and batching all draw calls into a single requestAnimationFrame cycle — naive full-canvas redraws caused visible stutters.",
    ],
    tech: ["TypeScript", "React", "Node.js", "Socket.io", "MongoDB"],
    githubUrl: "https://github.com/aashu0148/bug-shooter",
    youtubeId: "dQw4w9WgXcQ",
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
