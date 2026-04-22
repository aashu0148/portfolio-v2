/* ─── Analytics Event Names ──────────────────────────────────────────────────
 * Single source of truth for every tracked event.
 * Add new events here — never use raw strings elsewhere.
 * ──────────────────────────────────────────────────────────────────────────── */

export const EVENTS = {
  // Page lifecycle
  PAGE_VIEWED: "page_viewed",

  // Section visibility (fired once per session when a section enters viewport)
  SECTION_VIEWED: "section_viewed",

  // Navigation
  NAV_LINK_CLICKED: "nav_link_clicked",
  MOBILE_MENU_TOGGLED: "mobile_menu_toggled",

  // CTAs
  CTA_CLICKED: "cta_clicked",

  // Projects
  PROJECT_LINK_CLICKED: "project_link_clicked",
  PROJECT_DEMO_WATCHED: "project_demo_watched",
  PROJECT_STORY_TOGGLED: "project_story_toggled",

  // Experience
  EXPERIENCE_SELECTED: "experience_selected",

  // Social / outbound
  SOCIAL_LINK_CLICKED: "social_link_clicked",
} as const

export type EventName = (typeof EVENTS)[keyof typeof EVENTS]
