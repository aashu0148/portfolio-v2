"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { gsap } from "gsap"

interface VideoModalProps {
  youtubeId: string
  title: string
  onClose: () => void
}

export function VideoModal({ youtubeId, title, onClose }: VideoModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose })
    tl.to(dialogRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 10,
      duration: 0.2,
      ease: "power2.in",
    })
    tl.to(backdropRef.current, { opacity: 0, duration: 0.15 }, "-=0.05")
  }

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline()
    tl.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.2 }
    )
    tl.fromTo(
      dialogRef.current,
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power3.out" },
      "-=0.1"
    )

    // Close on Escape
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md md:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div
        ref={dialogRef}
        className="ghost-border kinetic-shadow relative w-full max-w-4xl overflow-hidden rounded-2xl bg-surface-container-low"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-outline-variant/10 bg-surface-container-high/40 px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            <span className="font-label text-[10px] tracking-widest text-outline uppercase">
              {title}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="rounded-lg p-1.5 text-outline transition-all duration-200 hover:bg-surface-container-highest hover:text-on-surface"
            aria-label="Close video"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* YouTube embed */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
