/* ─── Generic Tracking Helpers ────────────────────────────────────────────────
 * Reusable functions that combine event names with structured properties.
 * Components call these instead of reaching for trackEvent directly.
 * ──────────────────────────────────────────────────────────────────────────── */

import { trackEvent } from "./mixpanel"
import { EVENTS } from "./events"

/* ── Page ──────────────────────────────────────────────────────────────────── */

export function trackPageView() {
  trackEvent(EVENTS.PAGE_VIEWED, {
    url: window.location.href,
    referrer: document.referrer || undefined,
    screen_width: window.innerWidth,
    screen_height: window.innerHeight,
  })
}

/* ── Section visibility ───────────────────────────────────────────────────── */

export function trackSectionView(section: string) {
  trackEvent(EVENTS.SECTION_VIEWED, { section })
}

/* ── Navigation ───────────────────────────────────────────────────────────── */

export function trackNavClick(label: string, href: string) {
  trackEvent(EVENTS.NAV_LINK_CLICKED, { label, href })
}

export function trackMobileMenuToggle(opened: boolean) {
  trackEvent(EVENTS.MOBILE_MENU_TOGGLED, { opened })
}

/* ── CTAs ──────────────────────────────────────────────────────────────────── */

export function trackCtaClick(cta: string, section: string) {
  trackEvent(EVENTS.CTA_CLICKED, { cta, section })
}

/* ── Projects ─────────────────────────────────────────────────────────────── */

export function trackProjectLink(
  project: string,
  linkType: "github" | "live" | "demo"
) {
  trackEvent(EVENTS.PROJECT_LINK_CLICKED, { project, link_type: linkType })
}

export function trackProjectDemo(project: string) {
  trackEvent(EVENTS.PROJECT_DEMO_WATCHED, { project })
}

export function trackProjectStoryToggle(project: string, opened: boolean) {
  trackEvent(EVENTS.PROJECT_STORY_TOGGLED, { project, opened })
}

/* ── Experience ───────────────────────────────────────────────────────────── */

export function trackExperienceSelect(company: string, role: string) {
  trackEvent(EVENTS.EXPERIENCE_SELECTED, { company, role })
}

/* ── Social / outbound ────────────────────────────────────────────────────── */

export function trackSocialClick(
  platform: string,
  section: string
) {
  trackEvent(EVENTS.SOCIAL_LINK_CLICKED, { platform, section })
}
