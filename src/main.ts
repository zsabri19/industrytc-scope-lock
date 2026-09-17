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

const app = document.querySelector<HTMLDivElement>("#app")!
const tip = document.querySelector<HTMLDivElement>("#tooltip")!

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
      <div style="display:flex;gap:.5rem;align-items:center">
        <span class="badge-nc">No commercials</span>
        <button class="menu-btn" type="button" data-action="menu">Menu</button>
      </div>
    </header>

    <div class="mobile-nav" id="mobile-nav">
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
      <section class="hero" id="problem">
        <article class="hero-card hero-main">
          <div class="eyebrow">Client awareness submission · v2.0</div>
          <h1>${meta.title}</h1>
          <p class="lede">${meta.subtitle}. Built from the Scope-Lock pack so leadership can <span class="serif">see the impact before approving the path</span>.</p>
          <blockquote class="quote">“${meta.problem}”</blockquote>
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
          <p>${meta.decision}</p>
          <div class="note">${meta.commercial}</div>
        </aside>
      </section>

      <section id="journey">
        <div class="eyebrow">Interactive journey</div>
        <h2>What happens between registration and the next action</h2>
        <p class="lede">Hover any stage to see the consequence of skipping it — or running it without guardrails.</p>

        <div class="mode-bar">
          <div class="toggle" role="tablist" aria-label="Journey mode">
            <button type="button" class="${mode === "today" ? "active warn" : "warn"}" data-mode="today">Today (leak)</button>
            <button type="button" class="${mode === "guarded" ? "active" : ""}" data-mode="guarded">Guarded Phase 1</button>
          </div>
          <div class="hint">Tip: hover a card · “If I don’t…” / “If unguarded…”</div>
        </div>

        <div class="journey-grid">
          ${journey.map((step, i) => journeyCard(step, i)).join("")}
        </div>
      </section>

      <section id="scenarios">
        <div class="eyebrow">Use-case explorer</div>
        <h2>Pick a situation. Compare outcomes.</h2>
        <p class="lede">Dropdown-driven scenarios from the meetings and Scope-Lock boundaries — not hypothetical marketing.</p>

        <div class="scenario-controls">
          <div class="field">
            <label for="scenario-select">Use case</label>
            <select id="scenario-select">
              ${scenarios
                .map(
                  (s) =>
                    `<option value="${s.id}" ${s.id === scenarioId ? "selected" : ""}>${s.title}</option>`,
                )
                .join("")}
            </select>
          </div>
          <div class="persona"><strong>Persona:</strong> ${scenario.persona}</div>
        </div>

        <div class="split">
          <article class="outcome bad">
            <h3><span class="dot bad"></span> ${scenario.without.title}</h3>
            <ul>${scenario.without.points.map((p) => `<li>${p}</li>`).join("")}</ul>
          </article>
          <article class="outcome good">
            <h3><span class="dot good"></span> ${scenario.withGuard.title}</h3>
            <ul>${scenario.withGuard.points.map((p) => `<li>${p}</li>`).join("")}</ul>
          </article>
        </div>

        <div class="verdict">
          <div class="card" data-tip-title="Why this is better" data-tip="${escapeAttr(scenario.betterBecause)}">
            <strong>Why it will be better</strong>
            ${scenario.betterBecause}
          </div>
          <div class="card" data-tip-title="If you skip the guardrails" data-tip="${escapeAttr(scenario.worseIfSkipped)}">
            <strong>Why it won’t be better if skipped</strong>
            ${scenario.worseIfSkipped}
          </div>
        </div>
      </section>

      <section id="tradeoffs">
        <div class="eyebrow">Pros & cons</div>
        <h2>Honest trade-offs — hover for “if / if not”</h2>
        <p class="lede">Every strength has a cost. Scope Lock makes those costs visible before build.</p>
        <div class="compare-grid">
          ${comparisons
            .map(
              (c) => `
            <article class="card compare"
              data-tip-title="${escapeAttr(c.topic)}"
              data-tip="${escapeAttr(`If you do this: ${c.hoverIfDo}\n\nIf you don’t: ${c.hoverIfDont}`)}">
              <div class="topic">${c.topic}</div>
              <div class="pc">
                <div class="pro"><span>Better when</span>${c.pro}</div>
                <div class="con"><span>Risk if misused</span>${c.con}</div>
              </div>
            </article>`,
            )
            .join("")}
        </div>
      </section>

      <section id="scope">
        <div class="eyebrow">Phase 1 boundary</div>
        <h2>What is locked in — and what is not</h2>
        <p class="lede">Hover items for the operating reason. Expansion requires written change control.</p>
        <div class="scope-grid">
          <article class="card scope-list">
            <h3>Included in Phase 1</h3>
            <ul>
              ${scopeIn
                .map(
                  (item) => `
                <li data-tip-title="In scope"
                  data-tip="${escapeAttr(`This is part of the approved Pakistan pilot. Skipping it weakens the controlled journey.`)}">
                  <span class="mark in">✓</span><span>${item}</span>
                </li>`,
                )
                .join("")}
            </ul>
          </article>
          <article class="card scope-list">
            <h3>Explicitly out of scope</h3>
            <ul>
              ${scopeOut
                .map(
                  (item) => `
                <li data-tip-title="Out of scope"
                  data-tip="${escapeAttr(`Not in this lock. Adding it without approval expands chaos — and blocks clean commercials later.`)}">
                  <span class="mark out">×</span><span>${item}</span>
                </li>`,
                )
                .join("")}
            </ul>
          </article>
        </div>
      </section>

      <section id="routes">
        <div class="eyebrow">Disposition model</div>
        <h2>Routes — not unexplained pass/fail</h2>
        <p class="lede">Hover a disposition to see what the AI is allowed to mean by it.</p>
        <div class="disp-grid">
          ${dispositions
            .map(
              (d) => `
            <article class="card disp" data-tip-title="${escapeAttr(d.label)}" data-tip="${escapeAttr(d.tip)}">
              <div><code>${d.code}</code><div style="font-weight:800;margin-top:.35rem">${d.label}</div></div>
              <div>Operational route with recorded reason, owner, next action, and timestamp.</div>
              <div class="route">${d.route}</div>
            </article>`,
            )
            .join("")}
        </div>
      </section>

      <section id="clarity">
        <div class="eyebrow">ClarityOS · 8C</div>
        <h2>Human OS before System OS</h2>
        <p class="lede">Hover each C to internalize the operating lens behind this submission.</p>
        <div class="c-grid">
          ${clarity8c
            .map(
              (c) => `
            <article class="card c-card" data-tip-title="${escapeAttr(c.id + " — " + c.name)}" data-tip="${escapeAttr(c.text)}">
              <div class="cid">${c.id}</div>
              <h3>${c.name}</h3>
              <p>${c.text}</p>
            </article>`,
            )
            .join("")}
        </div>
      </section>

      <section id="risks">
        <div class="eyebrow">Unguarded agent</div>
        <h2>A faster wrong call is still a wrong call</h2>
        <p class="lede">Hover a risk to see why Scope Lock treats it as a pause condition — not a feature.</p>
        <div class="risk-grid">
          ${risks
            .map(
              (r) => `
            <article class="card risk-panel">
              <h3>Risk to the ${r.side.toLowerCase()}</h3>
              <ul style="list-style:none;margin:0;padding:0">
                ${r.items
                  .map(
                    (item) => `
                  <li data-tip-title="If not guardrailed"
                    data-tip="${escapeAttr(`Without journey, knowledge boundary, disposition, and handoff — this risk materializes as brand damage and wasted minutes.`)}">
                    ${item}
                  </li>`,
                  )
                  .join("")}
              </ul>
            </article>`,
            )
            .join("")}
        </div>
        <div class="callout">“First lock the journey. Then validate the evidence. Then submit commercials. Then build, observe, and scale.”</div>
      </section>

      <section id="pack">
        <div class="eyebrow">Architect sequence</div>
        <h2>Seven layers — commercials last</h2>
        <p class="lede">Hover a layer. Layer 07 is a readiness gate only — it contains no pricing.</p>
        <div class="layers">
          ${layers
            .map(
              (l) => `
            <article class="card layer ${l.n === "07" ? "commercial" : ""}"
              data-tip-title="${escapeAttr(l.n + " · " + l.name)}"
              data-tip="${escapeAttr(l.file)}">
              <div class="n">${l.n}</div>
              <div class="name">${l.name}</div>
            </article>`,
            )
            .join("")}
        </div>
      </section>

      <section id="decide">
        <div class="eyebrow">Scope-lock acceptance</div>
        <h2>What “approve” means</h2>
        <p class="lede">Industry TC confirms the following. No commercial commitment is created by this pack.</p>
        <ul class="card accept">
          ${acceptance
            .map(
              (a) => `
            <li><span class="check" aria-hidden="true"></span><span>${a}</span></li>`,
            )
            .join("")}
        </ul>

        <div class="cta">
          <h2>Approve the journey before the quote</h2>
          <p>This awareness site is intentionally non-commercial. It exists so leadership can see why a governed Pakistan pilot beats an unguarded robot — and why expansion is earned by evidence.</p>
          <div class="cta-row">
            <a class="btn btn-primary" href="#problem">Review the problem again</a>
            <a class="btn btn-ghost" href="#scenarios">Revisit a use case</a>
          </div>
        </div>
      </section>
    </main>

    <footer class="foot">
      Industry TC × Global Markets · Scope-Lock Awareness · Sourced from Scope Lock pack layers 01–07 · ${new Date().getFullYear()}
    </footer>
  `

  bind()
}

function journeyCard(step: JourneyStep, index: number) {
  const live = mode === "today" ? step.today : step.guarded
  const tipTitle = mode === "today" ? "If this stays broken" : "If this is not guardrailed"
  const tipBody = mode === "today" ? step.ifSkip : step.ifUnguarded
  return `
    <article class="card step" data-mode="${mode}" tabindex="0"
      data-tip-title="${escapeAttr(tipTitle)}"
      data-tip="${escapeAttr(tipBody)}">
      <div class="step-num">STAGE 0${index + 1}</div>
      <h3>${step.label}</h3>
      <p class="live">${live}</p>
      <div class="alt">${mode === "today" ? "Hover: cost of doing nothing" : "Hover: cost of no guardrail"}</div>
    </article>`
}

function escapeAttr(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
}

function bind() {
  app.querySelectorAll<HTMLButtonElement>("[data-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      mode = btn.dataset.mode as Mode
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
    mobileNav?.classList.toggle("open")
  })
  mobileNav?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => mobileNav.classList.remove("open"))
  })

  bindTooltips(app)
  observeActiveNav()
}

function bindTooltips(root: HTMLElement) {
  const targets = root.querySelectorAll<HTMLElement>("[data-tip]")

  const show = (el: HTMLElement, clientX: number, clientY: number) => {
    const title = el.dataset.tipTitle ?? "Insight"
    const body = el.dataset.tip ?? ""
    tip.hidden = false
    tip.innerHTML = `<strong>${title}</strong>${body.replaceAll("\n", "<br/>")}`
    positionTip(clientX, clientY)
  }

  const hide = () => {
    tip.hidden = true
  }

  targets.forEach((el) => {
    el.addEventListener("mouseenter", (e) => show(el, e.clientX, e.clientY))
    el.addEventListener("mousemove", (e) => {
      if (!tip.hidden) positionTip(e.clientX, e.clientY)
    })
    el.addEventListener("mouseleave", hide)
    el.addEventListener("focus", () => {
      const rect = el.getBoundingClientRect()
      show(el, rect.left + rect.width / 2, rect.top)
    })
    el.addEventListener("blur", hide)
  })
}

function positionTip(x: number, y: number) {
  const pad = 12
  const rect = tip.getBoundingClientRect()
  let left = x
  let top = y
  left = Math.min(Math.max(left, rect.width / 2 + pad), window.innerWidth - rect.width / 2 - pad)
  if (y - rect.height - 20 < pad) {
    tip.style.transform = "translate(-50%, 16px)"
  } else {
    tip.style.transform = "translate(-50%, calc(-100% - 12px))"
  }
  tip.style.left = `${left}px`
  tip.style.top = `${top}px`
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
