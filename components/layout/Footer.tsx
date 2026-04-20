import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons"
import { NAV_LINKS, PERSONAL } from "@/lib/constants"
import { Mail } from "lucide-react"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-outline-variant/10 bg-background px-4 py-8 sm:px-6 sm:py-10 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        {/* Brand */}
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span className="font-headline text-sm font-black tracking-tighter text-on-surface">
            {PERSONAL.alias}
            <span className="text-primary">.</span>
          </span>
          <span className="font-label text-[10px] tracking-[0.2em] text-outline uppercase">
            {PERSONAL.role}
          </span>
        </div>

        {/* Nav */}
        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-label text-[10px] tracking-[0.2em] text-outline uppercase transition-colors duration-200 hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social + copyright */}
        <div className="flex flex-col items-center gap-2 md:items-end">
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL.email}
              target="_blank"
              rel="noopener noreferrer"
              className="text-outline transition-colors duration-200 hover:text-primary"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-outline transition-colors duration-200 hover:text-primary"
              aria-label="GitHub"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-outline transition-colors duration-200 hover:text-primary"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
          </div>
          <span className="font-label text-[9px] tracking-[0.15em] text-outline/60 uppercase">
            © {year} {PERSONAL.fullName} — All rights reserved
          </span>
        </div>
      </div>
    </footer>
  )
}
