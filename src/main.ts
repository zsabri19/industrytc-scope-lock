import "./style.css"
import {
  acceptance,
  clarity8c,
  comparisons,
  dispositions,
  journey,
  layers,
  meta,
  risks,
  scenarios,
  scopeIn,
  scopeOut,
  type JourneyStep,
} from "./data"

type Mode = "today" | "guarded"

let mode: Mode = "guarded"
let scenarioId = scenarios[0].id
const openIds = new Set<string>()

const app = document.querySelector<HTMLDivElement>("#app")!

function isOpen(id: string) {
  return openIds.has(id)
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function detailsCard(opts: {
  id: string
  className?: string
  summary: string
  body: string
}) {
  const open = isOpen(opts.id) ? "open" : ""
  return `
    <details class="card expand ${opts.className ?? ""}" data-expand-id="${opts.id}" ${open}>
      <summary class="expand-summary">
        <div class="expand-summary-main">${opts.summary}</div>
        <span class="expand-chevron" aria-hidden="true"></span>
      </summary>
      <div class="expand-body">${opts.body}</div>
    </details>`
}

function render() {
  const scenario = scenarios.find((s) => s.id === scenarioId) ?? scenarios[0]

  app.innerHTML = `
    <header class="nav">
      <div class="brand">
        <div class="brand-mark">ITC</div>
        <div>Industry TC <span>· Scope Lock</span></div>
      </div>
      <nav class="nav-links" aria-label="Sections">
        <a href="#problem">Problem</a>
        <a href="#journey">Journey</a>
        <a href="#scenarios">Scenarios</a>
        <a href="#tradeoffs">Trade-offs</a>
        <a href="#scope">Scope</a>
        <a href="#routes">Routes</a>
        <a href="#clarity">ClarityOS</a>
        <a href="#risks">Risks</a>
        <a href="#decide">Decide</a>
      </nav>
      <div class="nav-end">
        <span class="badge-nc">No commercials</span>
        <button class="menu-btn" type="button" data-action="menu" aria-expanded="false">Menu</button>
      </div>
    </header>

    <div class="mobile-nav" id="mobile-nav" hidden>
      <a href="#problem">Problem</a>
      <a href="#journey">Journey</a>
      <a href="#scenarios">Scenarios</a>
      <a href="#tradeoffs">Trade-offs</a>
      <a href="#scope">Scope</a>
      <a href="#routes">Routes</a>
      <a href="#clarity">ClarityOS</a>
      <a href="#risks">Risks</a>
      <a href="#decide">Decide</a>
    </div>

    <main class="wrap">
      <div class="guide" role="note">
        <strong>How to use this page</strong>
        <span>Click any card to open more detail underneath it. Nothing floats over the text. Click again to close.</span>
      </div>

      <section class="hero" id="problem">
        <article class="hero-card hero-main">
          <div class="eyebrow">Client awareness submission · v2.0</div>
          <h1>${escapeHtml(meta.title)}</h1>
          <p class="lede">${escapeHtml(meta.subtitle)}. Built from the Scope-Lock pack so leadership can <span class="serif">see the impact before approving the path</span>.</p>
          <blockquote class="quote">“${escapeHtml(meta.problem)}”</blockquote>
          <div class="hero-meta">
            <span class="chip teal">Pakistan pilot</span>
            <span class="chip teal">Urdu + English</span>
            <span class="chip teal">Voice-first</span>
            <span class="chip">Seller-first qualification</span>
            <span class="chip">Human-accountable</span>
          </div>
        </article>
        <aside class="decision">
          <h3>Decision requested</h3>
          <p>${escapeHtml(meta.decision)}</p>
          <div class="note">${escapeHtml(meta.commercial)}</div>
        </aside>
      </section>

      <section id="journey">
        <div class="section-head">
          <div>
            <div class="eyebrow">Interactive journey</div>
            <h2>Registration → next action</h2>
            <p class="lede">Toggle today’s leak vs the guarded Phase 1 path. Click a stage for the consequence of skipping it or leaving it unguarded.</p>
          </div>
        </div>

        <div class="mode-bar">
          <div class="toggle" role="tablist" aria-label="Journey mode">
            <button type="button" role="tab" aria-selected="${mode === "today"}" class="${mode === "today" ? "active warn" : "warn"}" data-mode="today">Today (leak)</button>
            <button type="button" role="tab" aria-selected="${mode === "guarded"}" class="${mode === "guarded" ? "active" : ""}" data-mode="guarded">Guarded Phase 1</button>
          </div>
          <div class="hint">Click a stage card to expand</div>
        </div>

        <div class="journey-grid">
          ${journey.map((step, i) => journeyCard(step, i)).join("")}
        </div>
      </section>

      <section id="scenarios">
        <div class="section-head">
          <div>
            <div class="eyebrow">Use-case explorer</div>
            <h2>Pick a situation. Compare outcomes.</h2>
            <p class="lede">Scenarios from the meetings and Scope-Lock boundaries — not marketing hypotheticals.</p>
          </div>
        </div>

        <div class="scenario-controls">
          <div class="field">
            <label for="scenario-select">Use case</label>
            <select id="scenario-select">
              ${scenarios
                .map(
                  (s) =>
                    `<option value="${s.id}" ${s.id === scenarioId ? "selected" : ""}>${escapeHtml(s.title)}</option>`,
                )
                .join("")}
            </select>
          </div>
          <div class="persona"><strong>Persona</strong><span>${escapeHtml(scenario.persona)}</span></div>
        </div>

        <div class="split">
          <article class="outcome bad">
            <h3><span class="dot bad"></span> ${escapeHtml(scenario.without.title)}</h3>
            <ul>${scenario.without.points.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>
          </article>
          <article class="outcome good">
            <h3><span class="dot good"></span> ${escapeHtml(scenario.withGuard.title)}</h3>
            <ul>${scenario.withGuard.points.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>
          </article>
        </div>

        <div class="verdict">
          <div class="card verdict-card ok-border">
            <strong>Why it will be better</strong>
            <p>${escapeHtml(scenario.betterBecause)}</p>
          </div>
          <div class="card verdict-card warn-border">
            <strong>If you skip the guardrails</strong>
            <p>${escapeHtml(scenario.worseIfSkipped)}</p>
          </div>
        </div>
      </section>

      <section id="tradeoffs">
        <div class="section-head">
          <div>
            <div class="eyebrow">Pros &amp; cons</div>
            <h2>Honest trade-offs</h2>
            <p class="lede">Every strength has a cost. Click a card to see what happens if you do it — and if you don’t.</p>
          </div>
        </div>
        <div class="compare-grid">
          ${comparisons
            .map((c) =>
              detailsCard({
                id: `cmp-${c.id}`,
                className: "compare",
                summary: `
                  <div class="topic">${escapeHtml(c.topic)}</div>
                  <div class="pc">
                    <div class="pro"><span>Better when</span>${escapeHtml(c.pro)}</div>
                    <div class="con"><span>Risk if misused</span>${escapeHtml(c.con)}</div>
                  </div>
                  <div class="tap-hint">Click for if / if-not</div>`,
                body: `
                  <div class="impact-grid">
                    <div class="impact ok">
                      <strong>If you do this</strong>
                      <p>${escapeHtml(c.hoverIfDo)}</p>
                    </div>
                    <div class="impact warn">
                      <strong>If you don’t</strong>
                      <p>${escapeHtml(c.hoverIfDont)}</p>
                    </div>
                  </div>`,
              }),
            )
            .join("")}
        </div>
      </section>

      <section id="scope">
        <div class="section-head">
          <div>
            <div class="eyebrow">Phase 1 boundary</div>
            <h2>What is locked in — and what is not</h2>
            <p class="lede">Click an item for the operating reason. Expansion outside this list needs written change control.</p>
          </div>
        </div>
        <div class="scope-grid">
          <article class="card scope-panel">
            <h3>Included in Phase 1</h3>
            <div class="scope-items">
              ${scopeIn
                .map(
                  (item, i) =>
                    detailsCard({
                      id: `scope-in-${i}`,
                      className: "scope-item",
                      summary: `<span class="mark in">✓</span><span>${escapeHtml(item)}</span>`,
                      body: `<p>Part of the approved Pakistan pilot. Skipping this weakens the controlled journey and makes outcomes harder to measure.</p>`,
                    }),
                )
                .join("")}
            </div>
          </article>
          <article class="card scope-panel">
            <h3>Explicitly out of scope</h3>
            <div class="scope-items">
              ${scopeOut
                .map(
                  (item, i) =>
                    detailsCard({
                      id: `scope-out-${i}`,
                      className: "scope-item",
                      summary: `<span class="mark out">×</span><span>${escapeHtml(item)}</span>`,
                      body: `<p>Not in this lock. Adding it without approval expands chaos and blocks clean commercials later.</p>`,
                    }),
                )
                .join("")}
            </div>
          </article>
        </div>
      </section>

      <section id="routes">
        <div class="section-head">
          <div>
            <div class="eyebrow">Disposition model</div>
            <h2>Routes — not unexplained pass/fail</h2>
            <p class="lede">Click a disposition to see what the AI is allowed to mean by it.</p>
          </div>
        </div>
        <div class="disp-grid">
          ${dispositions
            .map((d) =>
              detailsCard({
                id: `disp-${d.code}`,
                className: "disp",
                summary: `
                  <div class="disp-head">
                    <code>${escapeHtml(d.code)}</code>
                    <div class="disp-label">${escapeHtml(d.label)}</div>
                  </div>
                  <div class="route">${escapeHtml(d.route)}</div>
                  <div class="tap-hint">Click for meaning</div>`,
                body: `<p>${escapeHtml(d.tip)}</p>
                  <p class="muted">Every route records reason, owner, next action, and timestamp.</p>`,
              }),
            )
            .join("")}
        </div>
      </section>

      <section id="clarity">
        <div class="section-head">
          <div>
            <div class="eyebrow">ClarityOS · 8C</div>
            <h2>Human OS before System OS</h2>
            <p class="lede">Click each C for the operating lens behind this submission.</p>
          </div>
        </div>
        <div class="c-grid">
          ${clarity8c
            .map((c) =>
              detailsCard({
                id: `c-${c.id}`,
                className: "c-card",
                summary: `
                  <div class="cid">${escapeHtml(c.id)}</div>
                  <h3>${escapeHtml(c.name)}</h3>
                  <div class="tap-hint">Click to expand</div>`,
                body: `<p>${escapeHtml(c.text)}</p>`,
              }),
            )
            .join("")}
        </div>
      </section>

      <section id="risks">
        <div class="section-head">
          <div>
            <div class="eyebrow">Unguarded agent</div>
            <h2>A faster wrong call is still a wrong call</h2>
            <p class="lede">Click a risk to see why Scope Lock treats it as a pause condition — not a feature.</p>
          </div>
        </div>
        <div class="risk-grid">
          ${risks
            .map(
              (r) => `
            <article class="card risk-panel">
              <h3>Risk to the ${escapeHtml(r.side.toLowerCase())}</h3>
              <div class="risk-items">
                ${r.items
                  .map(
                    (item, i) =>
                      detailsCard({
                        id: `risk-${r.id}-${i}`,
                        className: "risk-item",
                        summary: `<span>${escapeHtml(item)}</span>`,
                        body: `<p>Without journey, knowledge boundary, disposition, and handoff, this becomes brand damage and wasted minutes. Pause and review if it appears in the pilot.</p>`,
                      }),
                  )
                  .join("")}
              </div>
            </article>`,
            )
            .join("")}
        </div>
        <div class="callout">“First lock the journey. Then validate the evidence. Then submit commercials. Then build, observe, and scale.”</div>
      </section>

      <section id="pack">
        <div class="section-head">
          <div>
            <div class="eyebrow">Architect sequence</div>
            <h2>Seven layers — commercials last</h2>
            <p class="lede">Click a layer for its document role. Layer 07 is a readiness gate only — no pricing.</p>
          </div>
        </div>
        <div class="layers">
          ${layers
            .map((l) =>
              detailsCard({
                id: `layer-${l.n}`,
                className: `layer ${l.n === "07" ? "commercial" : ""}`,
                summary: `
                  <div class="n">${escapeHtml(l.n)}</div>
                  <div class="name">${escapeHtml(l.name)}</div>
                  <div class="tap-hint">Details</div>`,
                body: `<p><strong>${escapeHtml(l.file)}</strong></p>
                  <p class="muted">${
                    l.n === "07"
                      ? "Commercial readiness gate only. Contains no price, retainer, or proposal."
                      : "Required before commercials. Agree this layer before moving down the sequence."
                  }</p>`,
              }),
            )
            .join("")}
        </div>
      </section>

      <section id="decide">
        <div class="section-head">
          <div>
            <div class="eyebrow">Scope-lock acceptance</div>
            <h2>What “approve” means</h2>
            <p class="lede">Industry TC confirms the following. No commercial commitment is created by this pack.</p>
          </div>
        </div>
        <ul class="card accept">
          ${acceptance
            .map(
              (a) => `
            <li><span class="check" aria-hidden="true"></span><span>${escapeHtml(a)}</span></li>`,
            )
            .join("")}
        </ul>

        <div class="cta">
          <h2>Approve the journey before the quote</h2>
          <p>This awareness site is intentionally non-commercial. It exists so leadership can see why a governed Pakistan pilot beats an unguarded robot — and why expansion is earned by evidence.</p>
          <div class="cta-row">
            <a class="btn btn-primary" href="#problem">Back to the problem</a>
            <a class="btn btn-ghost" href="#scenarios">Revisit a use case</a>
          </div>
        </div>
      </section>
    </main>

    <footer class="foot">
      Industry TC × Global Markets · Scope-Lock Awareness · Layers 01–07 · ${new Date().getFullYear()}
    </footer>
  `

  bind()
}

function journeyCard(step: JourneyStep, index: number) {
  const live = mode === "today" ? step.today : step.guarded
  const impactTitle = mode === "today" ? "If this stays broken" : "If this is not guardrailed"
  const impactBody = mode === "today" ? step.ifSkip : step.ifUnguarded
  const id = `journey-${step.id}`

  return detailsCard({
    id,
    className: `step mode-${mode}`,
    summary: `
      <div class="step-num">Stage ${String(index + 1).padStart(2, "0")}</div>
      <h3>${escapeHtml(step.label)}</h3>
      <p class="live">${escapeHtml(live)}</p>
      <div class="tap-hint">${mode === "today" ? "Click: cost of doing nothing" : "Click: cost of no guardrail"}</div>`,
    body: `
      <div class="impact ${mode === "today" ? "warn" : "danger"}">
        <strong>${escapeHtml(impactTitle)}</strong>
        <p>${escapeHtml(impactBody)}</p>
      </div>`,
  })
}

function bind() {
  app.querySelectorAll<HTMLDetailsElement>("details[data-expand-id]").forEach((el) => {
    el.addEventListener("toggle", () => {
      const id = el.dataset.expandId
      if (!id) return
      if (el.open) openIds.add(id)
      else openIds.delete(id)
    })
  })

  app.querySelectorAll<HTMLButtonElement>("[data-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      mode = btn.dataset.mode as Mode
      // Keep journey expands, but they re-render with new impact text
      render()
      document.querySelector("#journey")?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  })

  const select = app.querySelector<HTMLSelectElement>("#scenario-select")
  select?.addEventListener("change", () => {
    scenarioId = select.value
    render()
    document.querySelector("#scenarios")?.scrollIntoView({ behavior: "smooth", block: "start" })
  })

  const menuBtn = app.querySelector<HTMLButtonElement>('[data-action="menu"]')
  const mobileNav = app.querySelector<HTMLDivElement>("#mobile-nav")
  menuBtn?.addEventListener("click", () => {
    const open = mobileNav?.hasAttribute("hidden")
    if (!mobileNav || !menuBtn) return
    if (open) {
      mobileNav.removeAttribute("hidden")
      menuBtn.setAttribute("aria-expanded", "true")
    } else {
      mobileNav.setAttribute("hidden", "")
      menuBtn.setAttribute("aria-expanded", "false")
    }
  })
  mobileNav?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      mobileNav.setAttribute("hidden", "")
      menuBtn?.setAttribute("aria-expanded", "false")
    })
  })

  observeActiveNav()
}

function observeActiveNav() {
  const links = Array.from(app.querySelectorAll<HTMLAnchorElement>(".nav-links a"))
  const map = new Map<string, HTMLAnchorElement>()
  links.forEach((a) => map.set(a.getAttribute("href") ?? "", a))

  const sections = Array.from(app.querySelectorAll<HTMLElement>("main section[id]"))
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const id = `#${entry.target.id}`
        links.forEach((l) => l.classList.remove("active"))
        map.get(id)?.classList.add("active")
      })
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 },
  )
  sections.forEach((s) => io.observe(s))
}

render()
