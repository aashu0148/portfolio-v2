"use client"

import { useEffect, useRef } from "react"
import { trackSectionView } from "@/lib/analytics"

/**
 * Fires a `section_viewed` event once when the target element
 * becomes visible in the viewport (default threshold: 30%).
 *
 * Usage:
 *   const ref = useTrackSection("hero")
 *   <section ref={ref} ...>
 */
export function useTrackSection<T extends HTMLElement = HTMLElement>(
  section: string,
  threshold = 0.3
) {
  const ref = useRef<T>(null)
  const tracked = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || tracked.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true
          trackSectionView(section)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [section, threshold])

  return ref
}
