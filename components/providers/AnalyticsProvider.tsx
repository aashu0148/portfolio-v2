"use client"

import { useEffect } from "react"
import { initMixpanel, trackPageView } from "@/lib/analytics"

export function AnalyticsProvider() {
  useEffect(() => {
    initMixpanel()
    trackPageView()
  }, [])

  return null
}
