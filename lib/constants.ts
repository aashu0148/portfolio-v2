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
  email: "yesitsanshul@gmail.com",
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
    period: "Jan 2025 — present",
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
      "Thinking about system architecture before touching code saves far more time than any refactor ever can",
      "Owning a complete product surface (Marketplace) taught me how to reason in user flows, not just components",
      "YC-backed startups move at a pace that forces you to be comfortable shipping 80% solutions and iterating fast",
    ],
    feedback:
      "Praised for moving fast without sacrificing code quality, and for proactively improving DX across the codebase with shared abstractions.",
    // reasonForLeaving:
    //   "Had to leave due to a serious health issue (typhoid) and required extended bed rest. VectorShift could not accommodate a leave of that length, so I had to step away.",
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
      "Working directly with founders teaches you to think from a product lens, not just a dev lens — understanding the why behind every feature changes the quality of your decisions",
    ],
    feedback:
      "Praised for strong work ethic and the ability to move very fast. Early on, received constructive feedback to communicate more openly about work in progress — took that forward and it became a consistent strength from that point on.",
    reasonForLeaving:
      "The company ran out of funding and had to shut down. The entire development team was relieved as there was no remaining runway. Permar shut down fully within the following six months.",
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
      "Working closely with founders forces you to think beyond the code — understanding what users actually want, and why a feature is being built, makes you a far better engineer",
      "User feedback loop is tightest when you build something people use daily — extension reviews and uninstall reasons were my best product insights",
    ],
    feedback:
      "Known for shipping quickly and reliably — the go-to engineer for anything that needed to be done fast without cutting corners.",
    reasonForLeaving:
      "The company ran out of runway and all developers were relieved. About a year later, Hushl pivoted to focus on human-centric AI, but at the time there was no funding left to continue.",
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
      "Applying to tech jobs means copy-pasting the same details into 50 different form fields across platforms with wildly different layouts — then staring at open-ended questions like 'Why do you want to work here?' for 10 minutes each time. Tools to solve this already existed, but ones with a proper AI touch were expensive enough that building my own and using my own API key ended up being ~50% cheaper.",
    story:
      "Built out of personal frustration during a job search. I was spending 2+ hours a day just filling out forms — not writing thoughtful applications, just feeding machines the same data over and over. Existing tools either lacked AI or cost too much. I wanted something that would parse my resume once, autofill the routine fields, and let AI generate accurate answers to open-ended questions — grounded entirely in my own experience. I also wanted features the existing tools didn't have, so building my own made complete sense.",
    challenges: [
      "Reliably detecting form fields across 6+ platforms (each with completely different DOM structures) required a scoring system that evaluates field labels, placeholders, aria attributes, and position — not just brute-force CSS selectors.",
      "Preventing AI hallucinations on open-ended questions was critical for trust. The AI is strictly grounded to the user's own resume data — it can elaborate and rephrase, but it cannot invent experience that isn't there.",
      "Curating job listings was surprisingly hard — scraping Google directly requires paid services. I was low on funds and didn't want to pay for it, so I built a lightweight companion extension that runs autonomously on the user's own machine, scrapes Google for job listings locally (avoiding blocks since it's the user's own browser), and then individually scrapes each listing to inject the final structured job data into the system.",
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
      "I started trading and quickly realised my emotions were costing me money — taking trades for the wrong reasons, second-guessing solid setups, and holding losers too long. The problem wasn't the strategy; it was the human executing it. I wanted a system that could think clearly about every trade, free from emotional bias.",
    story:
      "I'd wanted to build an automated trading bot for a long time. When AI came along, it felt like the right time — because the hard part wasn't just automation, it was reasoning about why a trade should or shouldn't be taken. YOTA is built as a multi-agent system: Scout identifies stock opportunities, YOTA (Your Own Trading Assistant) is the main decision-making brain, and Pilot monitors open positions and manages exits or stop-loss adjustments. Every trade decision is revisited against live market regime, past data, and indicator values before execution. I use Zerodha for order placement. Current win rate is around 45% — not great yet, but it's an ongoing project I'm actively working to improve.",
    challenges: [
      "Zerodha's WebSocket tick feed is occasionally lossy under high market volatility. I built a reconciliation layer that cross-checks live ticks against REST API snapshots to ensure no trade signals are missed.",
      "Getting the AI to reliably reason through trade decisions — factoring in market regime, momentum, and past data — without hallucinating false confidence required careful prompt engineering and multi-step verification before any order is placed.",
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
      "A friend wanted to run a private draft-style fantasy cricket league within their group — a format not widely available on any mainstream platform. They needed a real-time draft room where multiple people could pick players in snake order, with all the edge cases handled properly.",
    story:
      "Built as a freelance project for a friend's group. The core ask was a live draft system — multiple people joining a room, picking players in snake order, and keeping everything fair. It grew into a full platform with real-time draft rounds, league management, an admin panel, in-room chat, and a constant activity notifier so everyone always knows what's happening in the room.",
    challenges: [
      "Live drafts in snake order with multiple participants had race conditions — two users could pick the same player in the same window. Solved with server-side turn locks and optimistic UI rollbacks on conflict.",
      "Edge cases multiplied quickly: a participant not joining on time, someone leaving mid-draft, disconnecting and reconnecting. Every scenario needed a defined fallback so the draft could continue without breaking for others.",
      "There was no voice chat — just a text room — so players needed constant real-time context about what was happening. Built a persistent activity notifier that broadcasts every action in the room: picks made, players joining or leaving, timers expiring, and more.",
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
      "During the COVID lockdown, I was feeling isolated — my friends were far away and I wanted to listen to music with them. Playing it over a video call had too much audio lag and felt wrong. Spotify hadn't introduced their synced listening feature yet, so there was no clean way to do this.",
    story:
      "Built during the lockdown, specifically because I missed listening to music with friends and there was no good tool for it at the time. This was before Spotify released their own synced listening — I built it because the problem was real and nothing existed to solve it. The core challenge was keeping everyone perfectly in sync: same song, same timestamp, regardless of network conditions.",
    challenges: [
      "Storing songs was tricky — I didn't want to spend any money. I hacked around it by distributing songs across multiple Firebase Storage accounts (each acting as a separate bucket), with each song's link stored in the database pointing to whichever bucket it lives in.",
      "Streaming songs in sync across clients with different network latencies required an NTP-inspired time-offset protocol. Each client measures its clock drift from the server and compensates playback position continuously — not just 'start at the same time' but 'be at the same exact moment'.",
      "Voice chat was the trickiest feature — still in beta, it required careful coordination between WebRTC and the Socket.io playback events to avoid feedback loops and audio issues. Normal text chat was also included in the room.",
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
      "When vibe-coding was new, I wanted to see how far AI could take a project from scratch. The answer: a bare minimum single-player version in 15 minutes. The moment I tried to make it multiplayer, the AI completely fell apart — the architecture decisions it needed to make were too interconnected for it to handle autonomously.",
    story:
      "Started as a vibe-coded experiment — gave AI full control to see what it could build. It got a basic version working fast, but as soon as multiplayer complexity entered the picture, the AI lost coherence. I had to step in, do all the structural changes myself, and then use AI as an assistant — telling it exactly what to build within the architecture I'd already laid out. The result was a fully functional multiplayer bug-shooting game where up to 5-6 players can join, compete in real time, and have their high scores recorded.",
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
