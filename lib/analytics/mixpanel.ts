/* ─── Mixpanel Wrapper ───────────────────────────────────────────────────────
 * Thin abstraction over mixpanel-browser.
 * All other code imports from here — if you ever swap providers, only this
 * file needs to change.
 * ──────────────────────────────────────────────────────────────────────────── */

import mixpanel from "mixpanel-browser"

let initialized = false

export function initMixpanel() {
  if (initialized) return
  const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN
  if (!token) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[analytics] NEXT_PUBLIC_MIXPANEL_TOKEN is missing — tracking disabled")
    }
    return
  }

  mixpanel.init(token, {
    track_pageview: false, // we fire our own page_viewed event
    persistence: "localStorage",
    api_host: "https://api-eu.mixpanel.com",
  })
  initialized = true
}

export function isInitialized() {
  return initialized
}

export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (!initialized) return
  mixpanel.track(event, properties)
}

export function identifyUser(id: string, traits?: Record<string, unknown>) {
  if (!initialized) return
  mixpanel.identify(id)
  if (traits) mixpanel.people.set(traits)
}

export function resetUser() {
  if (!initialized) return
  mixpanel.reset()
}
