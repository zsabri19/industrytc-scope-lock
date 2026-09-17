/** Content distilled from Scope Lock pack layers 00–07. Non-commercial. */

export const meta = {
  title: "Scope-Lock Awareness",
  subtitle: "Registration-to-Call Orchestration · Pakistan Pilot",
  commercial: "No commercials in this submission. Pricing follows scope approval and evidence confirmation.",
  decision:
    "Approve the scope, sequencing, guardrails, responsibilities, and evidence gates before any commercial proposal is issued.",
  problem: "Registration is happening, but the call is not happening quickly enough.",
  paceLine:
    "Lock the registration-to-call journey once for Pakistan — then build, observe, and decide with evidence. That is the shorter path to a reusable operating model.",
}

/** Client-facing 3-month Scope Lock delivery plan. */
export const timeline = {
  durationMonths: 3,
  thesis:
    "This Scope Lock proposition is a structured three-month Pakistan pilot: agree the journey, build the governed response layer, then measure and decide before expanding.",
  objective:
    "Close the registration-to-call gap with a transparent Urdu/English voice agent, clear dispositions, complete human handoffs, and a measurable baseline — without commercial packaging in this phase.",
  phases: [
    {
      id: "m1",
      band: "Month 1",
      title: "Agree and freeze Phase 1",
      weeks: "Weeks 1–4",
      items: [
        "Confirm Pakistan · Urdu + English · voice-first · new/recent leads only",
        "Approve in-scope / out-of-scope lists and change-control rules",
        "Name owners (business, data, knowledge, verification, go/no-go)",
        "Deliver baseline extracts: volume, callback delay, connect rates",
        "Freeze dispositions, handoff packet, AI disclosure, and approved FAQs",
      ],
    },
    {
      id: "m2",
      band: "Month 2",
      title: "Build and soft-launch",
      weeks: "Weeks 5–8",
      items: [
        "Build the AI filter call inside the locked journey only",
        "Test opt-out, callback, unknown-question, and handoff completeness",
        "Connect lead trigger, timestamps, and outcome logging",
        "Soft-launch Pakistan voice response on the approved population",
        "Run the daily/weekly operating rhythm with CS and delivery",
      ],
    },
    {
      id: "m3",
      band: "Month 3",
      title: "Observe, review, and decide",
      weeks: "Weeks 9–12",
      items: [
        "Hold a controlled observation window (no casual script rewrites)",
        "Review disposition quality, handoff quality, and safety events",
        "Compare results to the Month 1 baseline",
        "Issue scale / revise recommendation for Pakistan",
        "Only then open commercial readiness with verified assumptions",
      ],
    },
  ],
  keepsOnTrack: [
    "Scope lock signed early — Pakistan, languages, channel, exclusions.",
    "Owners named before build starts.",
    "Baseline data provided as exports, not estimates.",
    "No WhatsApp, cold outbound, or new countries during these 12 weeks.",
    "Observation window respected; pause only for safety or material routing failures.",
    "Pricing and packages stay out of Phase 1 until evidence is reviewed.",
  ],
  extendsTimeline: [
    "Baseline or consent data remains unavailable.",
    "Owners stay unnamed; scope changes arrive verbally every week.",
    "Extra languages, channels, or countries are added mid-build.",
    "Observation is skipped or judged before the window closes.",
    "Build is held until a full commercial proposal exists.",
    "An unguarded launch creates complaints and forces a rebuild.",
  ],
}

export const paceCompare = {
  headline: "Why locking scope first is not a slowdown",
  falseFast: {
    title: "Launch the agent immediately",
    feel: "Looks faster on day one",
    outcome: [
      "Calls start before the journey and knowledge boundary are frozen",
      "Warm leads hear fluent but unsupported answers",
      "CS re-asks the full conversation after handoff",
      "Reporting shows minutes — not qualified sellers or next-step completion",
      "The next country inherits the same leak",
      "Time is spent twice: launch, then repair",
    ],
  },
  trueFast: {
    title: "Run the 3-month Scope Lock path",
    feel: "Looks measured — finishes cleaner",
    outcome: [
      "Month 1 freezes the registration-to-call journey for Pakistan",
      "Month 2 builds one governed voice response — once",
      "Month 3 measures outcomes against a real baseline",
      "Expansion is a decision from evidence, not pressure",
      "Commercials can price a verified operating scope",
      "Time is spent once on an asset you can reuse",
    ],
  },
  executiveLine:
    "An unguarded launch can look quick and still cost a longer calendar. A three-month Scope Lock closes the first leak properly — then Industry TC expands from a working Pakistan model, not from a rebuild.",
}

export type JourneyStep = {
  id: string
  label: string
  today: string
  guarded: string
  ifSkip: string
  ifUnguarded: string
}

export const journey: JourneyStep[] = [
  {
    id: "register",
    label: "Registration / interest",
    today: "Lead created; often waits 1–2 days for first human contact.",
    guarded: "Lead event captured with timestamp, source, consent, and unique ID.",
    ifSkip: "No reliable trigger — warm intent evaporates before anyone knows.",
    ifUnguarded: "Agent may call stale or ineligible leads as if they registered today.",
  },
  {
    id: "ack",
    label: "Acknowledgement",
    today: "Email / link often unopened; no clear expectation of contact.",
    guarded: "Expectation-setting message: AI may call; human available; no order promises.",
    ifSkip: "Customer is surprised by a call and may distrust the brand.",
    ifUnguarded: "Acknowledgement overpromises buyers, RFQs, or human review that never happened.",
  },
  {
    id: "call",
    label: "First response",
    today: "Four human agents; sequential callbacks; volume overwhelms capacity.",
    guarded: "Transparent AI filter call in Urdu or English within the approved SLA target.",
    ifSkip: "Warm lead cools; person forgets where they registered.",
    ifUnguarded: "Robotic, wrong-language, or unsupported answers burn the lead faster than delay.",
  },
  {
    id: "qualify",
    label: "Qualification",
    today: "Multiple sequential human calls for profile, verify, catalogue.",
    guarded: "Short checklist: intent, legitimacy, readiness — not the entire platform in one call.",
    ifSkip: "Humans waste time on students, job seekers, and random clicks.",
    ifUnguarded: "AI invents categories, negotiates commercials, or pretends verification is done.",
  },
  {
    id: "route",
    label: "Disposition & next step",
    today: "Unclear ownership between registration and next action.",
    guarded: "Route-based disposition: seller, documents, buyer, close, or human review.",
    ifSkip: "Every lead looks the same — no measurable operating system.",
    ifUnguarded: "Wrong route forces sellers into buyer flows (or the reverse).",
  },
  {
    id: "handoff",
    label: "Human handoff",
    today: "Customer often repeats the full story to the next agent.",
    guarded: "Complete packet: summary, fields, next action, callback time — human never restarts.",
    ifSkip: "Friction returns; trust drops; CS time doubles.",
    ifUnguarded: "Empty handoff → human re-asks → customer feels the AI was pointless.",
  },
]

export type Scenario = {
  id: string
  title: string
  persona: string
  without: { title: string; points: string[] }
  withGuard: { title: string; points: string[] }
  betterBecause: string
  worseIfSkipped: string
}

export const scenarios: Scenario[] = [
  {
    id: "warm-seller",
    title: "Warm seller — registered today",
    persona: "A Pakistan manufacturer registers to list products. Intent is seller-first.",
    without: {
      title: "If you do nothing (today)",
      points: [
        "Callback may take 1–2 days — interest cools.",
        "Profile link often stays unopened.",
        "Human still runs multiple sequential follow-up calls.",
        "No disposition trail to measure what happened.",
      ],
    },
    withGuard: {
      title: "If Phase 1 guarded orchestration runs",
      points: [
        "Rapid transparent AI call confirms registration and seller intent.",
        "Disposition routes to profile / onboarding next step.",
        "Approved guidance only — no RFQ or order promises.",
        "Outcome logged for baseline comparison.",
      ],
    },
    betterBecause:
      "Speed recovers the warm moment without pretending the AI is the whole marketplace.",
    worseIfSkipped:
      "You keep spending human capacity on delayed, repeated conversations with no evidence trail.",
  },
  {
    id: "junk-click",
    title: "Student / random click",
    persona: "Someone registers out of curiosity — not a genuine business.",
    without: {
      title: "If unfiltered human process",
      points: [
        "Agents spend scarce minutes on non-business contacts.",
        "Queue backlog grows for real sellers.",
        "No clean “not currently relevant” close path.",
      ],
    },
    withGuard: {
      title: "If disposition model is used",
      points: [
        "AI classifies and closes respectfully.",
        "Record kept for reporting — not deleted as unexplained judgment.",
        "Human time reserved for verification and exceptions.",
      ],
    },
    betterBecause: "Routing — not judgment — protects both capacity and dignity.",
    worseIfSkipped: "Four agents drown in noise while genuine sellers wait.",
  },
  {
    id: "buyer-mixed",
    title: "Buyer or buyer/seller",
    persona: "A business wants to source — or both buy and sell.",
    without: {
      title: "If forced into seller-only funnel",
      points: [
        "Wrong questions create friction and distrust.",
        "Buyer intent is lost or mishandled.",
        "Platform looks tone-deaf to actual need.",
      ],
    },
    withGuard: {
      title: "If mixed-intent routing exists",
      points: [
        "AI identifies buyer / mixed intent early.",
        "Routes to buyer or human review — not seller-only pressure.",
        "Complex buyer cases escalate with full context.",
      ],
    },
    betterBecause: "Correct next step beats a fast wrong conversation.",
    worseIfSkipped: "You train the market that Industry TC only pushes listings.",
  },
  {
    id: "unguarded-ai",
    title: "Unguarded AI — no knowledge boundary",
    persona: "Any lead reaches an AI that can say anything fluently.",
    without: {
      title: "If the agent is unleashed",
      points: [
        "Unsupported promises about buyers, RFQs, pricing, shipping.",
        "Wrong language or outdated lead scripts.",
        "Opt-outs ignored; complaints rise.",
        "False confidence from call volume, not outcomes.",
      ],
    },
    withGuard: {
      title: "If Scope Lock controls hold",
      points: [
        "Pakistan · Urdu/English · voice-first · approved FAQs only.",
        "Stop conditions pause unsafe behavior.",
        "Humans own verification, exceptions, and commercials.",
        "Evidence gates block premature pricing claims.",
      ],
    },
    betterBecause: "A faster wrong call burns a warm lead faster than a delayed call.",
    worseIfSkipped: "You scale chaos — more minutes, more risk, less trust.",
  },
  {
    id: "stale-lead",
    title: "Stale lead — already a day old",
    persona: "Registration happened yesterday; no successful contact yet.",
    without: {
      title: "If treated like a brand-new registration",
      points: [
        "Script pretends they registered moments ago.",
        "Feels intrusive or confused.",
        "Same failed approach repeats indefinitely.",
      ],
    },
    withGuard: {
      title: "If re-engagement rules apply",
      points: [
        "Acknowledges the time gap.",
        "Confirms whether interest is still active.",
        "Offers human route; respects stop requests.",
      ],
    },
    betterBecause: "Honesty about timing restores trust; spam destroys it.",
    worseIfSkipped: "You convert delay into brand damage.",
  },
  {
    id: "commercial-pressure",
    title: "Commercial question on first call",
    persona: "Lead asks about plans, pricing, or how much it costs on the first touch.",
    without: {
      title: "If AI improvises commercials",
      points: [
        "Invented plan features, discounts, or tiers.",
        "Order / RFQ / revenue promises.",
        "Premature paywall pressure or unsupported upgrade claims.",
      ],
    },
    withGuard: {
      title: "If commercial boundary is frozen",
      points: [
        "Approved factual answer only: Industry TC offers a free starting model — you can list and showcase up to 25 products from day one at no cost.",
        "No negotiation, no invented packages, no order or RFQ guarantees on the first call.",
        "Any further commercial detail (paid tiers, upgrades, special terms) routes to an authorized human owner.",
      ],
    },
    betterBecause:
      "The lead hears one clear, approved platform fact — freemium access to market up to 25 products free from day one — without the agent selling or improvising.",
    worseIfSkipped:
      "The first call becomes a sales pitch or a false promise, and trust is lost before onboarding even starts.",
  },
]

export type CompareItem = {
  id: string
  topic: string
  pro: string
  con: string
  hoverIfDo: string
  hoverIfDont: string
}

export const comparisons: CompareItem[] = [
  {
    id: "speed",
    topic: "Rapid first response",
    pro: "Recovers warm registration intent before it cools.",
    con: "Speed without routing can feel intrusive or wrong.",
    hoverIfDo: "Lead is contacted while the registration moment is still meaningful.",
    hoverIfDont: "1–2 day delay: person forgets the platform; conversion leaks.",
  },
  {
    id: "ai-node",
    topic: "AI as one controlled node",
    pro: "Handles speed, repetition, classification, preparation.",
    con: "Cannot alone fix marketplace liquidity or buyer demand.",
    hoverIfDo: "Humans keep verification, judgment, exceptions, commercials.",
    hoverIfDont: "Team expects a robot to replace the operating system — and fails.",
  },
  {
    id: "disposition",
    topic: "Route-based dispositions",
    pro: "Measurable, reviewable paths instead of pass/fail mystery.",
    con: "Requires discipline to freeze codes and train humans on packets.",
    hoverIfDo: "Every connected call has a reason, owner, and next action.",
    hoverIfDont: "You cannot tell whether volume created value or noise.",
  },
  {
    id: "handoff",
    topic: "Complete human handoff",
    pro: "Customer never repeats the full conversation.",
    con: "Needs packet design before build — not after complaints.",
    hoverIfDo: "CS starts mid-context; trust compounds.",
    hoverIfDont: "AI feels like wasted time; humans re-ask everything.",
  },
  {
    id: "pk-scope",
    topic: "Pakistan · Urdu/English only",
    pro: "Stabilizes one geography and language pair before copy-paste.",
    con: "Feels slow if leadership wants every country at once.",
    hoverIfDo: "Knowledge base stays accurate; quality is observable.",
    hoverIfDont: "Multi-country chaos expands before the first journey works.",
  },
  {
    id: "evidence",
    topic: "Evidence before commercials",
    pro: "Prices verified operating scope — not meeting anecdotes.",
    con: "Delays a quote until baselines are visible.",
    hoverIfDo: "Assumptions are labeled; margins survive contact with reality.",
    hoverIfDont: "Retainer built on ~500/day and 90-sec talk that were never measured.",
  },
]

export const scopeIn = [
  "Pakistan only",
  "Urdu and English only",
  "New registrations & recent-interest leads",
  "Voice-first response",
  "Seller-first qualification + buyer/mixed detection",
  "Approved Pakistan FAQs",
  "Disposition + human handoff",
  "Outcome logging & baseline measurement",
]

export const scopeOut = [
  "Other countries / languages",
  "Cold outbound & 30k backlog",
  "WhatsApp / full email automation",
  "Automatic verification without humans",
  "Payments, shipping, fulfilment",
  "Subscription sales & revenue guarantees",
  "RFQ / order guarantees",
  "Architecture / prompt transfer",
]

export const dispositions = [
  {
    code: "QUALIFIED_SELLER",
    label: "Qualified seller",
    route: "Profile / onboarding",
    tip: "Relevant business, seller intent, ready for next step — not a legal approval.",
  },
  {
    code: "NEEDS_DOCUMENTS",
    label: "Seller needs documents",
    route: "Document guidance / follow-up",
    tip: "Intent is real; information incomplete — guide, don’t invent verification.",
  },
  {
    code: "BUYER_OR_MIXED",
    label: "Buyer or buyer/seller",
    route: "Buyer route or human review",
    tip: "Do not force a seller-only funnel on sourcing intent.",
  },
  {
    code: "NOT_CURRENTLY_RELEVANT",
    label: "Not currently relevant",
    route: "Respectful close",
    tip: "Operational route with a recorded reason — not unexplained rejection.",
  },
  {
    code: "HUMAN_REVIEW",
    label: "Human review",
    route: "Human queue + full packet",
    tip: "Uncertainty, complaints, sensitive or high-value cases always escalate.",
  },
]

export const clarity8c = [
  {
    id: "C1",
    name: "Clarity",
    text: "One problem frame: registration-to-call leakage — not a global AI transformation.",
  },
  {
    id: "C2",
    name: "Conditions",
    text: "Lead data, consent, approved KB, owners, human capacity, Pakistan readiness.",
  },
  {
    id: "C3",
    name: "Control",
    text: "Decision rights, scope freeze, change requests, stop conditions, go/no-go.",
  },
  {
    id: "C4",
    name: "Capability",
    text: "AI: speed & routing. Humans: verification, judgment, exceptions, commercials.",
  },
  {
    id: "C5",
    name: "Calibration",
    text: "Measure baseline and observe the first controlled run before claims.",
  },
  {
    id: "C6",
    name: "Correction",
    text: "Evidence-led changes only — no informal WhatsApp scope drift.",
  },
  {
    id: "C7",
    name: "Continuity",
    text: "Named owners, handoffs, decision logs, operating rhythm beyond one person.",
  },
  {
    id: "C8",
    name: "Coaching",
    text: "AI is governed productivity — not an unexplained replacement of people.",
  },
]

export const risks = [
  {
    id: "lead",
    side: "Lead",
    items: [
      "Call old lead as if new",
      "Intrusive / robotic brand feel",
      "Wrong category or buyer/seller route",
      "Repeat questions after handoff",
      "Ignore opt-out or callback request",
      "Fluent but commercially wrong answers",
    ],
  },
  {
    id: "biz",
    side: "Business",
    items: [
      "More minutes without more qualified sellers",
      "Incorrect data entering the platform",
      "Unsupported buyer/RFQ/shipping claims",
      "Incomplete handoffs",
      "Complaints and opt-outs rise",
      "False confidence from call volume",
    ],
  },
]

export const layers = [
  { n: "01", name: "Governance", file: "ClarityOS Scope-Lock Governance" },
  { n: "02", name: "Evidence", file: "Granola Evidence Register" },
  { n: "03", name: "Workflow", file: "Workflow Architect" },
  { n: "04", name: "Operations", file: "Phase 1 Operations Scope" },
  { n: "05", name: "Onboarding", file: "Phase 1 Onboarding Scope" },
  { n: "06", name: "Executive", file: "Scope-Lock Submission" },
  { n: "07", name: "Commercials", file: "Commercial Readiness Gate (no pricing)" },
]

export const acceptance = [
  "Problem statement matches the meetings",
  "Pakistan is the first controlled geography",
  "Urdu and English are the first language pair",
  "First journey is response & qualification — not global AI rollout",
  "AI is transparent and knowledge-bounded",
  "Dispositions and human handoff are accepted",
  "Out-of-scope list is accepted",
  "Baseline evidence list is accepted",
  "This pack makes no commercial promise",
  "Commercials follow only after scope + evidence confirmation",
]
