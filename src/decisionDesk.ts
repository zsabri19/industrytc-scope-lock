/** CEO Decision Desk — simple agree / include / comment for Scope Lock Phase 1. */

export type Vote = "unset" | "agree" | "disagree" | "discuss"
export type IncludeVote = "unset" | "include" | "exclude"
export type OutVote = "unset" | "keep_out" | "request_in"
export type Overall = "unset" | "approve" | "approve_changes" | "hold"

export type DeskItem = {
  id: string
  label: string
  plain: string
}

export type DeskState = {
  overall: Overall
  reviewerName: string
  reviewerRole: string
  reviewerEmail: string
  generalComment: string
  include: Record<string, IncludeVote>
  outOfScope: Record<string, OutVote>
  safety: Record<string, Vote>
  stops: Record<string, Vote>
  comments: Record<string, string>
  owners: Record<string, string>
  updatedAt: string | null
  submittedAt: string | null
}

/** Inbox for Decision Desk submissions */
export const SUBMIT_TO = "zeeshan@global-mkts.com"
export const SUBMIT_CC = "ali@global-mkts.com"

export const includeItems: DeskItem[] = [
  {
    id: "geo",
    label: "Pakistan only",
    plain: "Phase 1 runs in Pakistan first — not every country at once.",
  },
  {
    id: "lang",
    label: "Urdu and English only",
    plain: "First language pair for the AI voice calls.",
  },
  {
    id: "leads",
    label: "New registrations & recent interest only",
    plain: "No cold outbound and no old backlog in Phase 1.",
  },
  {
    id: "voice",
    label: "Voice-first response",
    plain: "AI calls first; other channels wait until voice is stable.",
  },
  {
    id: "seller",
    label: "Seller-first qualification",
    plain: "Identify buyers and mixed intent, but prioritize seller onboarding.",
  },
  {
    id: "faq",
    label: "Approved FAQ knowledge only",
    plain: "AI answers only from approved Pakistan Industry TC information.",
  },
  {
    id: "disp",
    label: "Disposition + human handoff",
    plain: "Every call gets a clear route; humans receive a full context packet.",
  },
  {
    id: "measure",
    label: "Baseline measurement & observation",
    plain: "Measure results against today’s 1–2 day callback reality before scaling.",
  },
]

export const outItems: DeskItem[] = [
  {
    id: "countries",
    label: "Other countries",
    plain: "Malaysia, Bangladesh, GCC, US, etc. — later, after Pakistan works.",
  },
  {
    id: "more-lang",
    label: "Extra languages (Punjabi, Arabic, …)",
    plain: "Not in Phase 1. Add only after Urdu/English is stable.",
  },
  {
    id: "cold",
    label: "Cold outbound / old number backlog",
    plain: "Including the historical backlog stays out of this pilot.",
  },
  {
    id: "whatsapp",
    label: "WhatsApp / full email automation",
    plain: "Not the Phase 1 primary channel.",
  },
  {
    id: "autoverify",
    label: "Automatic business verification",
    plain: "Humans keep final verification judgment.",
  },
  {
    id: "logistics",
    label: "Payments, shipping, fulfilment promises",
    plain: "AI must not discuss or promise logistics outcomes.",
  },
  {
    id: "guarantees",
    label: "RFQ / order / revenue guarantees",
    plain: "No guaranteed business outcomes on the first call.",
  },
  {
    id: "xfer",
    label: "Transfer of AI architecture / prompts",
    plain: "Delivery-side architecture stays with the delivery partner in Phase 1.",
  },
]

export const safetyItems: DeskItem[] = [
  {
    id: "disclose",
    label: "AI must say it is an AI assistant",
    plain: "Transparent identity on every first call (Urdu or English).",
  },
  {
    id: "freemium",
    label: "Approved commercial fact only",
    plain:
      "If asked about cost/plans: free start — list/showcase up to 25 products from day one at no cost. Nothing else invented.",
  },
  {
    id: "no-repeat",
    label: "Humans must not re-ask the full conversation",
    plain: "Handoff packet carries the context. Repeating the call destroys trust.",
  },
  {
    id: "stale",
    label: "Stale leads get a different script",
    plain: "Do not treat a day-old lead as if they registered minutes ago.",
  },
  {
    id: "kb",
    label: "Outside FAQ → human handoff",
    plain: "AI does not invent answers on shipping, legal, or complex commercial terms.",
  },
  {
    id: "pause",
    label: "Stop the pilot if safety breaks",
    plain:
      "Pause if the AI promises RFQs/orders, ignores opt-outs, corrupts data, or burns leads.",
  },
]

export const stopItems: DeskItem[] = [
  {
    id: "promise",
    label: "Unsupported commercial promises",
    plain: "Guarantees of RFQs, orders, or revenue.",
  },
  {
    id: "optout",
    label: "Ignoring opt-out or callback requests",
    plain: "Contact preference violations.",
  },
  {
    id: "minutes",
    label: "Usage beyond approved minute boundary",
    plain: "Fiscal and operating overrun without review.",
  },
  {
    id: "routing",
    label: "Material wrong routing / duplicate records",
    plain: "Broken dispositions or corrupt lead data.",
  },
]

export const ownerFields = [
  { id: "business", label: "Business owner" },
  { id: "data", label: "Technical / data owner" },
  { id: "knowledge", label: "Knowledge / FAQ owner" },
  { id: "verification", label: "Human verification owner" },
  { id: "gono", label: "Final go / no-go owner" },
]

const STORAGE_KEY = "itc-scope-lock-ceo-desk-v1"

function emptyMap<T extends string>(items: { id: string }[], value: T): Record<string, T> {
  return Object.fromEntries(items.map((i) => [i.id, value]))
}

export function defaultDeskState(): DeskState {
  return {
    overall: "unset",
    reviewerName: "",
    reviewerRole: "",
    reviewerEmail: "",
    generalComment: "",
    include: emptyMap(includeItems, "unset"),
    outOfScope: emptyMap(outItems, "unset"),
    safety: emptyMap(safetyItems, "unset"),
    stops: emptyMap(stopItems, "unset"),
    comments: {},
    owners: Object.fromEntries(ownerFields.map((o) => [o.id, ""])),
    updatedAt: null,
    submittedAt: null,
  }
}

export function loadDeskState(): DeskState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultDeskState()
    const parsed = JSON.parse(raw) as DeskState
    return { ...defaultDeskState(), ...parsed }
  } catch {
    return defaultDeskState()
  }
}

export function saveDeskState(state: DeskState) {
  state.updatedAt = new Date().toISOString()
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function clearDeskState() {
  localStorage.removeItem(STORAGE_KEY)
}

export type DeskStats = {
  includeYes: number
  includeNo: number
  includeOpen: number
  outConfirmed: number
  outRequested: number
  outOpen: number
  safetyAgree: number
  safetyOpen: number
  safetyDisagree: number
  stopsAck: number
  stopsOpen: number
  commentCount: number
  ownersNamed: number
}

export function deskStats(state: DeskState): DeskStats {
  const vals = <T extends string>(map: Record<string, T>, want: T) =>
    Object.values(map).filter((v) => v === want).length
  const openInclude = Object.values(state.include).filter((v) => v === "unset").length
  const openOut = Object.values(state.outOfScope).filter((v) => v === "unset").length
  const openSafety = Object.values(state.safety).filter((v) => v === "unset").length
  const openStops = Object.values(state.stops).filter((v) => v === "unset").length
  return {
    includeYes: vals(state.include, "include"),
    includeNo: vals(state.include, "exclude"),
    includeOpen: openInclude,
    outConfirmed: vals(state.outOfScope, "keep_out"),
    outRequested: vals(state.outOfScope, "request_in"),
    outOpen: openOut,
    safetyAgree: vals(state.safety, "agree"),
    safetyOpen: openSafety,
    safetyDisagree: vals(state.safety, "disagree") + vals(state.safety, "discuss"),
    stopsAck: vals(state.stops, "agree"),
    stopsOpen: openStops,
    commentCount:
      Object.values(state.comments).filter((c) => c.trim()).length +
      (state.generalComment.trim() ? 1 : 0),
    ownersNamed: Object.values(state.owners).filter((v) => v.trim()).length,
  }
}

export function buildSummaryText(state: DeskState): string {
  const s = deskStats(state)
  const lines: string[] = [
    "Industry TC — Scope Lock CEO Decision Summary",
    `Generated: ${new Date().toLocaleString()}`,
    `Reviewer: ${state.reviewerName || "—"} (${state.reviewerRole || "—"})`,
    `Email: ${state.reviewerEmail || "—"}`,
    `Overall: ${labelOverall(state.overall)}`,
    `Submitted: ${state.submittedAt || "not yet"}`,
    "",
    "IN PHASE 1",
    ...includeItems.map((i) => `- [${state.include[i.id]}] ${i.label}${note(state, i.id)}`),
    "",
    "OUT OF PHASE 1",
    ...outItems.map((i) => `- [${state.outOfScope[i.id]}] ${i.label}${note(state, i.id)}`),
    "",
    "SAFETY RULES",
    ...safetyItems.map((i) => `- [${state.safety[i.id]}] ${i.label}${note(state, i.id)}`),
    "",
    "STOP CONDITIONS",
    ...stopItems.map((i) => `- [${state.stops[i.id]}] ${i.label}${note(state, i.id)}`),
    "",
    "OWNERS",
    ...ownerFields.map((o) => `- ${o.label}: ${state.owners[o.id] || "—"}`),
    "",
    `Open items: include ${s.includeOpen}, out-of-scope ${s.outOpen}, safety ${s.safetyOpen}, stops ${s.stopsOpen}`,
    `Comments: ${s.commentCount}`,
    "",
    "GENERAL COMMENT",
    state.generalComment.trim() || "—",
  ]
  return lines.join("\n")
}

function note(state: DeskState, id: string) {
  const c = state.comments[id]?.trim()
  return c ? ` | Comment: ${c}` : ""
}

function labelOverall(v: Overall) {
  if (v === "approve") return "Approve Phase 1 as proposed"
  if (v === "approve_changes") return "Approve with the changes marked below"
  if (v === "hold") return "Hold — needs discussion"
  return "Not yet selected"
}
