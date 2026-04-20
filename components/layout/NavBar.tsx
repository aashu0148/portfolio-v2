"use client"

import { useEffect, useRef, useState } from "react"
import { Menu, X, Mail } from "lucide-react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"
import { NAV_LINKS, PERSONAL } from "@/lib/constants"

export function NavBar() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("")
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    let lastY = 0
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY
          const nav = navRef.current
          if (!nav) return

          setScrolled(currentY > 40)

          if (currentY > 120 && currentY > lastY + 5) {
            gsap.to(nav, { y: -80, duration: 0.3, ease: "power2.inOut" })
          } else if (currentY < lastY - 2 || currentY < 80) {
            gsap.to(nav, { y: 0, duration: 0.3, ease: "power2.out" })
          }

          const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""))
          for (const id of [...sectionIds].reverse()) {
            const el = document.getElementById(id)
            if (el && el.getBoundingClientRect().top <= 100) {
              setActiveSection(id)
              break
            }
          }

          lastY = currentY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const id = href.replace("#", "")
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileOpen(false)
  }

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16 px-6 md:px-10 flex items-center justify-between transition-[background,border-color,box-shadow] duration-300",
        scrolled
          ? "glass border-b border-outline-variant/10 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      )}
    >
      {/* Logo */}
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) }}
        className="font-headline text-base font-black tracking-tighter text-on-surface hover:text-primary transition-colors duration-200"
      >
        {PERSONAL.alias}
        <span className="text-primary">.</span>
      </a>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-6">
        {NAV_LINKS.map((link) => {
          const id = link.href.replace("#", "")
          const isActive = activeSection === id
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={cn(
                "font-label text-[10px] tracking-[0.2em] uppercase transition-all duration-200 relative",
                isActive ? "text-on-surface" : "text-outline hover:text-on-surface-variant"
              )}
            >
              {link.label}
              {isActive && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary rounded-full" />
              )}
            </a>
          )
        })}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <a
          href={`mailto:${PERSONAL.email}`}
          className="group relative overflow-hidden px-4 py-2 rounded-lg bg-primary text-on-primary font-label text-[11px] tracking-widest uppercase font-medium transition-all duration-200 hover:shadow-[0_0_20px_rgba(173,198,255,0.4)] active:scale-95 hidden md:flex items-center gap-1.5"
        >
          <Mail className="h-3 w-3 relative z-10" />
          <span className="relative z-10">Hire Me</span>
          <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-200" />
        </a>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-outline hover:text-on-surface transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 glass border-b border-outline-variant/10 py-4 px-6 flex flex-col gap-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-label text-[11px] tracking-[0.2em] uppercase text-on-surface-variant hover:text-on-surface transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${PERSONAL.email}`}
            className="self-start flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-on-primary font-label text-[11px] tracking-widest uppercase font-medium"
          >
            <Mail className="h-3 w-3" />
            Hire Me
          </a>
        </div>
      )}
    </header>
  )
}
