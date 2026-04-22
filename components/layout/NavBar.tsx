"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Menu, X, Mail } from "lucide-react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"
import { NAV_LINKS, PERSONAL } from "@/lib/constants"
import {
  trackNavClick,
  trackMobileMenuToggle,
  trackCtaClick,
} from "@/lib/analytics"

export function NavBar() {
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const desktopNavRef = useRef<HTMLElement>(null)
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([])
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const pillRef = useRef<HTMLSpanElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuBtnRef = useRef<HTMLButtonElement>(null)

  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("")
  const [mobileOpen, setMobileOpen] = useState(false)

  /* ── Pre-paint: hide elements so GSAP reveals them ──────────────────────── */
  useLayoutEffect(() => {
    gsap.set(logoRef.current, { opacity: 0, x: -22, filter: "blur(6px)" })
    gsap.set(linksRef.current.filter(Boolean), { opacity: 0, y: -14 })
    gsap.set(ctaRef.current, { opacity: 0, scale: 0.8, filter: "blur(4px)" })
  }, [])

  /* ── Mount animation ─────────────────────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.05,
      })

      tl.to(logoRef.current, {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 0.75,
      })
        .to(
          linksRef.current.filter(Boolean),
          { opacity: 1, y: 0, stagger: 0.09, duration: 0.5 },
          "-=0.45"
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        )

      /* Breathing dot on the logo */
      gsap.to(dotRef.current, {
        opacity: 0.25,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.2,
      })
    }, navRef)

    return () => ctx.revert()
  }, [])

  /* ── Scroll: hide/reveal + active section tracking ───────────────────────── */
  useEffect(() => {
    let lastY = 0
    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const currentY = window.scrollY
        const nav = navRef.current
        if (!nav) {
          ticking = false
          return
        }

        setScrolled(currentY > 40)

        if (currentY > 120 && currentY > lastY + 5) {
          gsap.to(nav, { y: -80, duration: 0.4, ease: "power2.inOut" })
        } else if (currentY < lastY - 2 || currentY < 80) {
          gsap.to(nav, { y: 0, duration: 0.35, ease: "power3.out" })
        }

        const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""))
        let next = ""
        for (const id of [...sectionIds].reverse()) {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= 100) {
            next = id
            break
          }
        }
        setActiveSection(next)

        lastY = currentY
        ticking = false
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  /* ── Morphing gradient pill indicator ────────────────────────────────────── */
  useEffect(() => {
    const idx = NAV_LINKS.findIndex(
      (l) => l.href.replace("#", "") === activeSection
    )
    const pill = pillRef.current
    const navContainer = desktopNavRef.current
    if (!pill || !navContainer) return

    if (idx === -1 || !activeSection) {
      gsap.to(pill, { opacity: 0, duration: 0.25, ease: "power2.in" })
      return
    }

    const linkEl = linksRef.current[idx]
    if (!linkEl) return

    const lr = linkEl.getBoundingClientRect()
    const nr = navContainer.getBoundingClientRect()
    const x = lr.left - nr.left

    gsap.to(pill, {
      x,
      width: lr.width,
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
    })
  }, [activeSection])

  /* ── Magnetic hover on nav links ─────────────────────────────────────────── */
  useEffect(() => {
    const cleanups: (() => void)[] = []

    linksRef.current.forEach((link) => {
      if (!link) return

      const onMove = (e: MouseEvent) => {
        const r = link.getBoundingClientRect()
        const cx = e.clientX - r.left - r.width / 2
        const cy = e.clientY - r.top - r.height / 2
        gsap.to(link, {
          x: cx * 0.32,
          y: cy * 0.32,
          duration: 0.22,
          ease: "power2.out",
          overwrite: "auto",
        })
      }

      const onLeave = () =>
        gsap.to(link, {
          x: 0,
          y: 0,
          duration: 0.65,
          ease: "elastic.out(1, 0.5)",
          overwrite: "auto",
        })

      link.addEventListener("mousemove", onMove)
      link.addEventListener("mouseleave", onLeave)
      cleanups.push(() => {
        link.removeEventListener("mousemove", onMove)
        link.removeEventListener("mouseleave", onLeave)
      })
    })

    return () => cleanups.forEach((c) => c())
  }, [])

  /* ── Magnetic hover on CTA ───────────────────────────────────────────────── */
  useEffect(() => {
    const cta = ctaRef.current
    if (!cta) return

    const onMove = (e: MouseEvent) => {
      const r = cta.getBoundingClientRect()
      const cx = e.clientX - r.left - r.width / 2
      const cy = e.clientY - r.top - r.height / 2
      gsap.to(cta, {
        x: cx * 0.18,
        y: cy * 0.18,
        duration: 0.28,
        ease: "power2.out",
        overwrite: "auto",
      })
    }

    const onLeave = () =>
      gsap.to(cta, {
        x: 0,
        y: 0,
        duration: 0.75,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto",
      })

    cta.addEventListener("mousemove", onMove)
    cta.addEventListener("mouseleave", onLeave)
    return () => {
      cta.removeEventListener("mousemove", onMove)
      cta.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  /* ── Mobile menu open animation ──────────────────────────────────────────── */
  useEffect(() => {
    const menu = mobileMenuRef.current
    if (!menu || !mobileOpen) return

    gsap.fromTo(
      menu,
      { clipPath: "inset(0 0 100% 0)", opacity: 0.6 },
      {
        clipPath: "inset(0 0 0% 0)",
        opacity: 1,
        duration: 0.38,
        ease: "power3.out",
      }
    )

    const items = menu.querySelectorAll("a")
    gsap.fromTo(
      items,
      { opacity: 0, x: -14 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.07,
        duration: 0.32,
        ease: "power2.out",
        delay: 0.14,
      }
    )
  }, [mobileOpen])

  /* ── Mobile toggle with icon spin ────────────────────────────────────────── */
  const handleMobileToggle = () => {
    const btn = menuBtnRef.current
    if (btn) {
      gsap.fromTo(
        btn,
        { rotate: mobileOpen ? 90 : -90, scale: 0.7 },
        { rotate: 0, scale: 1, duration: 0.42, ease: "back.out(1.7)" }
      )
    }
    trackMobileMenuToggle(!mobileOpen)
    setMobileOpen((prev) => !prev)
  }

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    label: string
  ) => {
    e.preventDefault()
    trackNavClick(label, href)
    document
      .getElementById(href.replace("#", ""))
      ?.scrollIntoView({ behavior: "smooth" })
    setMobileOpen(false)
  }

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between px-4 sm:px-6 md:px-10",
        "transition-[background,border-color,box-shadow] duration-300",
        scrolled
          ? "glass border-b border-outline-variant/10 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      )}
    >
      {/* ── Logo ─────────────────────────────────────────────────────────────── */}
      <a
        ref={logoRef}
        href="#"
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
        className="font-headline text-base font-black tracking-tighter text-on-surface transition-colors duration-200 hover:text-primary"
      >
        {PERSONAL.alias}
        <span ref={dotRef} className="text-primary">
          .
        </span>
      </a>

      {/* ── Desktop nav ──────────────────────────────────────────────────────── */}
      <nav
        ref={desktopNavRef}
        className="relative hidden items-center gap-6 md:flex"
      >
        {/* Gradient pill that morphs between active links */}
        <span
          ref={pillRef}
          className="pointer-events-none absolute -bottom-px h-px rounded-full"
          style={{
            background: "linear-gradient(90deg, #adc6ff 0%, #ddb7ff 100%)",
            boxShadow: "0 0 10px 2px rgba(173,198,255,0.55)",
            opacity: 0,
            left: 0,
            width: 0,
            transformOrigin: "left center",
          }}
        />

        {NAV_LINKS.map((link, i) => {
          const isActive = activeSection === link.href.replace("#", "")
          return (
            <a
              key={link.href}
              ref={(el) => {
                linksRef.current[i] = el
              }}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href, link.label)}
              className={cn(
                "relative pb-0.5 font-label text-[10px] tracking-[0.2em] uppercase",
                "transition-colors duration-300 will-change-transform",
                isActive
                  ? "text-on-surface"
                  : "text-outline hover:text-on-surface-variant"
              )}
            >
              {link.label}
            </a>
          )
        })}
      </nav>

      {/* ── Right side ───────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        <a
          ref={ctaRef}
          href={`mailto:${PERSONAL.email}`}
          onClick={() => trackCtaClick("hire_me", "navbar")}
          className={cn(
            "group relative overflow-hidden rounded-lg bg-primary px-4 py-2 text-on-primary",
            "font-label text-[11px] font-medium tracking-widest uppercase will-change-transform",
            "transition-[box-shadow] duration-200 hover:shadow-[0_0_24px_rgba(173,198,255,0.55)] active:scale-95",
            "hidden items-center gap-1.5 md:flex"
          )}
        >
          <Mail className="relative z-10 h-3 w-3" />
          <span className="relative z-10">Hire Me</span>
          {/* Lift fill */}
          <span className="absolute inset-0 translate-y-full bg-white/10 transition-transform duration-200 group-hover:translate-y-0" />
          {/* Light sweep */}
          <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-[left] duration-500 group-hover:left-full" />
        </a>

        <button
          ref={menuBtnRef}
          onClick={handleMobileToggle}
          className="p-2 text-outline transition-colors duration-200 hover:text-on-surface md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* ── Mobile dropdown ───────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="glass absolute top-full right-0 left-0 flex flex-col gap-4 overflow-hidden border-b border-outline-variant/10 px-4 py-4 sm:px-6 md:hidden"
          style={{ clipPath: "inset(0 0 100% 0)" }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href, link.label)}
              className="font-label text-[11px] tracking-[0.2em] text-on-surface-variant uppercase transition-colors duration-200 hover:text-on-surface"
            >
              {link.label}
            </a>
          ))}
          <a
            target="_blank"
            href={`mailto:${PERSONAL.email}`}
            onClick={() => trackCtaClick("hire_me", "navbar_mobile")}
            className="flex items-center gap-1.5 self-start rounded-lg bg-primary px-4 py-2 font-label text-[11px] font-medium tracking-widest text-on-primary uppercase"
          >
            <Mail className="h-3 w-3" />
            Hire Me
          </a>
        </div>
      )}
    </header>
  )
}
