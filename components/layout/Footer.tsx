import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons"
import { NAV_LINKS, PERSONAL } from "@/lib/constants"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-outline-variant/10 bg-background py-10 px-6 md:px-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-headline text-sm font-black tracking-tighter text-on-surface">
            {PERSONAL.alias}
            <span className="text-primary">.</span>
          </span>
          <span className="font-label text-[10px] tracking-[0.2em] uppercase text-outline">
            {PERSONAL.role}
          </span>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-label text-[10px] tracking-[0.2em] uppercase text-outline hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social + copyright */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-outline hover:text-primary transition-colors duration-200"
              aria-label="GitHub"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-outline hover:text-primary transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
          </div>
          <span className="font-label text-[9px] tracking-[0.15em] uppercase text-outline/60">
            © {year} {PERSONAL.fullName} — All rights reserved
          </span>
        </div>
      </div>
    </footer>
  )
}
