"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/**
 * Global scroll-triggered reveal animations.
 * Hero parallax is handled inside HeroSection directly.
 */
export function ScrollAnimations() {
  useEffect(() => {
    // Small delay to ensure DOM is fully painted
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {

        /* ── Section h2 headings fade-up ────────────────────────────────── */
        document.querySelectorAll("#about h2, #projects h2, #contact h2").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 36 },
            {
              opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 82%", once: true },
            }
          )
        })

        /* ── About graph slides in ───────────────────────────────────────── */
        const aboutGraph = document.getElementById("about-graph")
        if (aboutGraph) {
          gsap.fromTo(
            aboutGraph,
            { opacity: 0, y: 50 },
            {
              opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
              scrollTrigger: { trigger: aboutGraph, start: "top 82%", once: true },
            }
          )
        }

        /* ── About stats stagger-in ──────────────────────────────────────── */
        const statCards = document.querySelectorAll("[data-stat-card]")
        if (statCards.length > 0) {
          gsap.fromTo(
            statCards,
            { opacity: 0, scale: 0.88 },
            {
              opacity: 1, scale: 1, duration: 0.4, stagger: 0.07, ease: "back.out(1.5)",
              scrollTrigger: { trigger: "#about", start: "top 58%", once: true },
            }
          )
        }

        /* ── Project cards stagger-in ────────────────────────────────────── */
        const projectCards = document.querySelectorAll("#projects .ghost-border")
        projectCards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 28 },
            {
              opacity: 1, y: 0, duration: 0.55, ease: "power2.out",
              scrollTrigger: { trigger: card, start: "top 88%", once: true },
            }
          )
        })

        /* ── Contact card scale-in ───────────────────────────────────────── */
        const contactCard = document.querySelector("#contact .kinetic-gradient")
        if (contactCard) {
          gsap.fromTo(
            contactCard,
            { opacity: 0, scale: 0.96, y: 30 },
            {
              opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out",
              scrollTrigger: { trigger: "#contact", start: "top 80%", once: true },
            }
          )
        }

        /* ── Experience section header ───────────────────────────────────── */
        const expHeader = document.querySelector("#experience h2")
        if (expHeader) {
          gsap.fromTo(
            expHeader,
            { opacity: 0, y: 36 },
            {
              opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
              scrollTrigger: { trigger: "#experience", start: "top 80%", once: true },
            }
          )
        }

      })

      return () => {
        ctx.revert()
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  return null
}
