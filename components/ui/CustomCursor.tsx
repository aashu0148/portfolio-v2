"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

/* ─── Config ───────────────────────────────────────────────────────────────── */

const BALLS = [
  { size: 13, opacity: 1 },
  { size: 10.5, opacity: 0.8 },
  { size: 8.5, opacity: 0.65 },
  { size: 7, opacity: 0.52 },
  { size: 6, opacity: 0.42 },
  { size: 5, opacity: 0.33 },
  { size: 4, opacity: 0.25 },
  { size: 3, opacity: 0.18 },
] as const

const COUNT = BALLS.length
const LEAD_LERP = 0.28 // lead ball responsiveness
const TRAIL_LERP = 0.18 // each subsequent ball trails at this speed
const INTERACTIVE =
  "a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]"

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

/* ─── Component ────────────────────────────────────────────────────────────── */

export function CustomCursor() {
  const ballRefs = useRef<(HTMLDivElement | null)[]>(
    Array.from({ length: COUNT }, () => null)
  )

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return

    // Working state — plain objects, no React state, so nothing re-renders
    const mouse = { x: -300, y: -300 }
    const positions = Array.from({ length: COUNT }, () => ({
      x: -300,
      y: -300,
    }))
    const flags = { visible: false, hovering: false }

    // Centre all balls on their cursor point once
    ballRefs.current.forEach((el) => {
      if (el) gsap.set(el, { xPercent: -50, yPercent: -50 })
    })

    // ── Event handlers ────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY

      if (!flags.visible) {
        // Fade each ball in to its own target opacity
        ballRefs.current.forEach((el, i) => {
          if (el)
            gsap.to(el, {
              opacity: BALLS[i].opacity,
              duration: 0.4,
              ease: "power2.out",
            })
        })
        flags.visible = true
      }
    }

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(INTERACTIVE)) {
        flags.hovering = true
      }
    }
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(INTERACTIVE)) {
        flags.hovering = false
      }
    }

    const onLeave = () =>
      ballRefs.current.forEach((el) => {
        if (el) gsap.to(el, { opacity: 0, duration: 0.2 })
      })
    const onEnter = () => {
      if (flags.visible)
        ballRefs.current.forEach((el, i) => {
          if (el) gsap.to(el, { opacity: BALLS[i].opacity, duration: 0.2 })
        })
    }

    // ── GSAP ticker loop ──────────────────────────────────────────────────
    const tick = () => {
      // Lead ball — slightly snappier
      positions[0].x = lerp(positions[0].x, mouse.x, LEAD_LERP)
      positions[0].y = lerp(positions[0].y, mouse.y, LEAD_LERP)

      // Each subsequent ball follows the previous one (same lerp → naturally
      // accumulates lag down the chain without needing different values)
      for (let i = 1; i < COUNT; i++) {
        positions[i].x = lerp(positions[i].x, positions[i - 1].x, TRAIL_LERP)
        positions[i].y = lerp(positions[i].y, positions[i - 1].y, TRAIL_LERP)
      }

      ballRefs.current.forEach((el, i) => {
        if (!el) return
        // Lead ball scales up when hovering interactive elements
        const scale = flags.hovering && i === 0 ? 1.8 : 1
        gsap.set(el, { x: positions[i].x, y: positions[i].y, scale })
      })
    }

    document.body.classList.add("cursor-none-fine")

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseover", onOver)
    window.addEventListener("mouseout", onOut)
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)
    gsap.ticker.add(tick)

    return () => {
      document.body.classList.remove("cursor-none-fine")
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseover", onOver)
      window.removeEventListener("mouseout", onOut)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <>
      {BALLS.map(({ size }, i) => (
        <div
          key={i}
          ref={(el) => {
            ballRefs.current[i] = el
          }}
          aria-hidden
          className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full opacity-0 will-change-transform"
          style={{
            width: size,
            height: size,
            backgroundColor: "white",
            // Subtle glow on the lead ball only
            boxShadow: i === 0 ? "0 0 10px 2px rgba(255,255,255,0.35)" : "none",
          }}
        />
      ))}
    </>
  )
}
