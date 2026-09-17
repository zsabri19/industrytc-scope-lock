import "./style.css"
import {
  commercialDefaults,
  computeCommercial,
  fmtMoney,
  fmtNum,
  parseNum,
  type CommercialState,
} from "./commercial"
import {
  acceptance,
  clarity8c,
  comparisons,
  dispositions,
  journey,
  layers,
  meta,
  paceCompare,
  risks,
  scenarios,
  scopeIn,
  scopeOut,
  timeline,
  type JourneyStep,
} from "./data"

type Mode = "today" | "guarded"

let mode: Mode = "guarded"
let scenarioId = scenarios[0].id
const openIds = new Set<string>()
let commercial: CommercialState = { ...commercialDefaults }

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
      <a class="brand" href="#problem" aria-label="Industry TC Scope Lock">
        <img class="brand-logo" src="${import.meta.env.BASE_URL}industry-tc-logo.png" alt="Industry TC" width="168" height="37" />
        <span class="brand-tag">Scope Lock</span>
      </a>
      <nav class="nav-links" aria-label="Sections">
        <a href="#problem">Problem</a>
        <a href="#pace">Timeline</a>
        <a href="#journey">Journey</a>
        <a href="#scenarios">Scenarios</a>
        <a href="#tradeoffs">Trade-offs</a>
        <a href="#scope">Scope</a>
        <a href="#routes">Routes</a>
        <a href="#clarity">ClarityOS</a>
        <a href="#risks">Risks</a>
        <a href="#commercial">Commercial</a>
        <a href="#decide">Decide</a>
      </nav>
      <div class="nav-end">
        <span class="badge-nc">Illustrative commercials</span>
        <button class="menu-btn" type="button" data-action="menu" aria-expanded="false">Menu</button>
      </div>
    </header>

    <div class="mobile-nav" id="mobile-nav" hidden>
      <a href="#problem">Problem</a>
      <a href="#pace">Timeline</a>
      <a href="#journey">Journey</a>
      <a href="#scenarios">Scenarios</a>
      <a href="#tradeoffs">Trade-offs</a>
      <a href="#scope">Scope</a>
      <a href="#routes">Routes</a>
      <a href="#clarity">ClarityOS</a>
      <a href="#risks">Risks</a>
      <a href="#commercial">Commercial</a>
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
            <span class="chip teal">3-month Scope Lock</span>
            <span class="chip">Human verification retained</span>
          </div>
        </article>
        <aside class="decision">
          <h3>Decision requested</h3>
          <p>${escapeHtml(meta.decision)}</p>
          <div class="note">${escapeHtml(meta.commercial)}</div>
        </aside>
      </section>

      <section id="pace">
        <div class="section-head">
          <div>
            <div class="eyebrow">Scope Lock timeline</div>
            <h2>Three-month Phase 1 plan</h2>
            <p class="lede">${escapeHtml(timeline.thesis)}</p>
          </div>
        </div>

        <div class="pace-banner card">
          <p class="pace-line serif">“${escapeHtml(meta.paceLine)}”</p>
          <p class="pace-objective">${escapeHtml(timeline.objective)}</p>
        </div>

        <div class="pace-bands">
          <article class="card pace-band ok-border">
            <div class="pace-kicker">Proposed duration</div>
            <h3>${timeline.durationMonths} months</h3>
            <p>Pakistan · Urdu + English · voice-first registration response and qualification.</p>
          </article>
          <article class="card pace-band">
            <div class="pace-kicker">Phase 1 outcome</div>
            <h3>Decide with evidence</h3>
            <p>Measured results vs baseline — then scale, revise, or open commercials.</p>
          </article>
        </div>

        <div class="timeline-grid timeline-three">
          ${timeline.phases
            .map(
              (m) => `
            <article class="card timeline-card">
              <div class="timeline-band">${escapeHtml(m.band)} · ${escapeHtml(m.weeks)}</div>
              <h3>${escapeHtml(m.title)}</h3>
              <ul>${m.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </article>`,
            )
            .join("")}
        </div>

        <div class="split pace-conditions">
          ${detailsCard({
            id: "pace-on-track",
            className: "condition-card",
            summary: `<div class="topic">What keeps the 3-month plan on track</div><div class="tap-hint">Click to open</div>`,
            body: `<ul class="plain-list">${timeline.keepsOnTrack.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>`,
          })}
          ${detailsCard({
            id: "pace-extends",
            className: "condition-card",
            summary: `<div class="topic">What extends the timeline beyond 3 months</div><div class="tap-hint">Click to open</div>`,
            body: `<ul class="plain-list">${timeline.extendsTimeline.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>`,
          })}
        </div>

        <div class="section-head pace-exec-head">
          <div>
            <div class="eyebrow">Executive view</div>
            <h2>${escapeHtml(paceCompare.headline)}</h2>
            <p class="lede">Locking the journey before the agent scales is how Industry TC avoids rebuilding the same leak in every country.</p>
          </div>
        </div>

        <div class="split">
          <article class="outcome bad">
            <h3><span class="dot bad"></span> ${escapeHtml(paceCompare.falseFast.title)}</h3>
            <p class="feel">${escapeHtml(paceCompare.falseFast.feel)}</p>
            <ul>${paceCompare.falseFast.outcome.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>
          </article>
          <article class="outcome good">
            <h3><span class="dot good"></span> ${escapeHtml(paceCompare.trueFast.title)}</h3>
            <p class="feel">${escapeHtml(paceCompare.trueFast.feel)}</p>
            <ul>${paceCompare.trueFast.outcome.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>
          </article>
        </div>

        <div class="callout pace-callout">${escapeHtml(paceCompare.executiveLine)}</div>
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
            <h2>Operating lens for Phase 1</h2>
            <p class="lede">Click each C for the governance sequence behind this Scope Lock.</p>
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
                      ? "Commercial readiness gate. Use the Phase 1 calculator on this page as an illustrative model until evidence confirms volume."
                      : "Required before commercials. Agree this layer before moving down the sequence."
                  }</p>`,
              }),
            )
            .join("")}
        </div>
      </section>

      ${commercialSection()}

      <section id="decide">
        <div class="section-head">
          <div>
            <div class="eyebrow">Scope-lock acceptance</div>
            <h2>What “approve” means</h2>
            <p class="lede">Industry TC confirms the operating scope first. Commercial figures below are illustrative until baseline evidence is confirmed.</p>
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
          <h2>Approve the journey — then lock the numbers</h2>
          <p>Agree the three-month Scope Lock path. Use the commercial calculator as a working model; finalize price after volume and duration evidence is confirmed.</p>
          <div class="cta-row">
            <a class="btn btn-primary" href="#commercial">Review Phase 1 commercials</a>
            <a class="btn btn-ghost" href="#pace">See the 3-month timeline</a>
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

function commercialSection() {
  const c = commercial
  const derived = c.clientRatePerMin == null
  return `
      <section id="commercial">
        <div class="section-head">
          <div>
            <div class="eyebrow">Phase 1 commercials</div>
            <h2>Usage + advisory retainer model</h2>
            <p class="lede">Editable working model for the Pakistan pilot. Change units, rates, fees, or margin — totals update live. Not a locked quote until evidence confirms volume and talk time.</p>
          </div>
        </div>

        <div class="guide commercial-guide" role="note">
          <strong>Illustrative</strong>
          <span>Leadership enters calls and average talk time. Billable minutes are calculated: <em>calls/day × working days × (talk seconds ÷ 60)</em>. Defaults match prior Seed R&amp;D (~90 sec filter · ~2,700 min/mo).</span>
        </div>

        <div class="commercial-layout">
          <form class="card commercial-inputs" id="commercial-form" autocomplete="off">
            <h3>Model inputs</h3>
            <p class="field-note">Start with call volume and duration — minutes are derived. Leave “Client rate / min” blank to price calling from cost + margin.</p>

            <div class="input-block-label">Call volume → billable minutes</div>
            <div class="input-grid">
              <label class="field">
                <span>Connected calls / day</span>
                <input type="number" min="0" step="1" name="callsPerDay" value="${c.callsPerDay}" />
                <small>Answered / connected calls</small>
              </label>
              <label class="field">
                <span>Working days / month</span>
                <input type="number" min="1" max="31" step="1" name="workingDaysPerMonth" value="${c.workingDaysPerMonth}" />
                <small>Usually 22–26</small>
              </label>
              <label class="field">
                <span>Avg talk duration (seconds)</span>
                <input type="number" min="0" step="5" name="avgTalkSeconds" value="${c.avgTalkSeconds}" />
                <small>Filter design band ~90 sec</small>
              </label>
            </div>

            <div class="input-block-label">Pricing &amp; fees</div>
            <div class="input-grid">
              <label class="field">
                <span>Internal cost / min (USD)</span>
                <input type="number" min="0" step="0.01" name="costPerMin" value="${c.costPerMin}" />
                <small>Cost basis</small>
              </label>
              <label class="field">
                <span>Calling margin %</span>
                <input type="number" min="0" max="95" step="1" name="callingMarginPct" value="${c.callingMarginPct}" ${derived ? "" : "disabled"} />
                <small>Used when client rate is blank</small>
              </label>
              <label class="field">
                <span>Client rate / min (USD)</span>
                <input type="number" min="0" step="0.01" name="clientRatePerMin" value="${c.clientRatePerMin ?? ""}" placeholder="Auto from margin" />
                <small>Override · blank = auto</small>
              </label>
              <label class="field">
                <span>Advisory hours / month</span>
                <input type="number" min="0" step="0.5" name="advisoryHours" value="${c.advisoryHours}" />
                <small>Unit: hours</small>
              </label>
              <label class="field">
                <span>Advisory rate / hour (USD)</span>
                <input type="number" min="0" step="5" name="advisoryRate" value="${c.advisoryRate}" />
                <small>Service fee</small>
              </label>
              <label class="field">
                <span>Setup fee one-time (USD)</span>
                <input type="number" min="0" step="50" name="setupFee" value="${c.setupFee}" />
                <small>0 = waive</small>
              </label>
              <label class="field">
                <span>Setup amortize (months)</span>
                <input type="number" min="1" max="12" step="1" name="setupAmortMonths" value="${c.setupAmortMonths}" />
                <small>For monthly view only</small>
              </label>
              <label class="field">
                <span>Overage rate / min (USD)</span>
                <input type="number" min="0" step="0.01" name="overagePerMin" value="${c.overagePerMin}" />
                <small>If minutes exceed plan</small>
              </label>
            </div>

            <div class="commercial-actions">
              <button type="button" class="btn btn-reset" data-action="reset-commercial">Reset to Seed defaults</button>
            </div>
          </form>

          <div id="commercial-results">
            ${commercialResultsHtml()}
          </div>
        </div>
      </section>`
}

function commercialResultsHtml() {
  const b = computeCommercial(commercial, timeline.durationMonths)
  const v = b.volume
  return `
            <div class="card commercial-results">
              <h3>Volume bridge</h3>
              <div class="volume-bridge">
                <div class="vb-step">
                  <span>Calls / day</span>
                  <strong>${fmtNum(commercial.callsPerDay, 0)}</strong>
                </div>
                <div class="vb-op">×</div>
                <div class="vb-step">
                  <span>Days / month</span>
                  <strong>${fmtNum(commercial.workingDaysPerMonth, 0)}</strong>
                </div>
                <div class="vb-op">=</div>
                <div class="vb-step">
                  <span>Calls / month</span>
                  <strong>${fmtNum(v.callsPerMonth, 0)}</strong>
                </div>
                <div class="vb-op">×</div>
                <div class="vb-step">
                  <span>Avg talk</span>
                  <strong>${fmtNum(commercial.avgTalkSeconds, 0)}s <em>(${fmtNum(v.avgTalkMinutes, 2)} min)</em></strong>
                </div>
                <div class="vb-op">=</div>
                <div class="vb-step highlight">
                  <span>Billable minutes / month</span>
                  <strong>${fmtNum(v.billableMinutes, 0)}</strong>
                </div>
              </div>
              <p class="volume-formula">Formula: <code>calls/day × working days × (avg talk seconds ÷ 60) = billable minutes</code></p>

              <h3 class="segments-title">Phase 1 segments</h3>
              <div class="comm-table-wrap">
                <table class="comm-table">
                  <thead>
                    <tr>
                      <th>Segment</th>
                      <th>Units</th>
                      <th>Rate</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${b.lines
                      .map(
                        (line) => `
                      <tr>
                        <td>
                          <strong>${escapeHtml(line.label)}</strong>
                          ${line.note ? `<div class="line-note">${escapeHtml(line.note)}</div>` : ""}
                        </td>
                        <td>${fmtNum(line.units, line.id === "calling" ? 0 : line.id === "advisory" ? 1 : 0)} <span class="unit">${escapeHtml(line.unitsLabel)}</span></td>
                        <td>${fmtMoney(line.rate)} <span class="unit">${escapeHtml(line.rateLabel)}</span></td>
                        <td class="amount">${fmtMoney(line.amount)}</td>
                      </tr>`,
                      )
                      .join("")}
                  </tbody>
                </table>
              </div>

              <div class="comm-totals">
                <div class="total-row">
                  <span>Monthly calling + advisory</span>
                  <strong>${fmtMoney(b.monthlySubtotal)}</strong>
                </div>
                <div class="total-row">
                  <span>Monthly view (incl. setup amort.)</span>
                  <strong>${fmtMoney(b.monthlyTotal)}</strong>
                </div>
                <div class="total-row phase">
                  <span>Phase 1 total (${b.phaseMonths} months)</span>
                  <strong>${fmtMoney(b.phaseTotal)}</strong>
                </div>
                <p class="phase-breakdown">
                  ${fmtMoney(b.phaseCalling)} calling
                  + ${fmtMoney(b.phaseAdvisory)} advisory
                  + ${fmtMoney(b.phaseSetup)} setup (one-time)
                </p>
              </div>

              <div class="comm-meta">
                <div><span>Effective client rate</span><strong>${fmtMoney(b.effectiveClientRate)} / min</strong></div>
                <div><span>Calling cost basis</span><strong>${fmtMoney(b.callingCost)} / mo</strong></div>
                <div><span>Calling margin</span><strong>~${fmtNum(b.callingMarginPctActual, 0)}%</strong></div>
                <div><span>Overage reference</span><strong>${fmtMoney(commercial.overagePerMin)} / min</strong></div>
              </div>
            </div>`
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

  bindCommercial()
  observeActiveNav()
}

function bindCommercial() {
  const form = app.querySelector<HTMLFormElement>("#commercial-form")
  if (!form) return

  const syncFromForm = () => {
    const fd = new FormData(form)
    const rateRaw = String(fd.get("clientRatePerMin") ?? "").trim()
    commercial = {
      callsPerDay: parseNum(String(fd.get("callsPerDay")), commercial.callsPerDay),
      workingDaysPerMonth: parseNum(String(fd.get("workingDaysPerMonth")), commercial.workingDaysPerMonth),
      avgTalkSeconds: parseNum(String(fd.get("avgTalkSeconds")), commercial.avgTalkSeconds),
      costPerMin: parseNum(String(fd.get("costPerMin")), commercial.costPerMin),
      callingMarginPct: parseNum(String(fd.get("callingMarginPct")), commercial.callingMarginPct),
      clientRatePerMin: rateRaw === "" ? null : parseNum(rateRaw, 0),
      advisoryHours: parseNum(String(fd.get("advisoryHours")), commercial.advisoryHours),
      advisoryRate: parseNum(String(fd.get("advisoryRate")), commercial.advisoryRate),
      setupFee: parseNum(String(fd.get("setupFee")), commercial.setupFee),
      setupAmortMonths: parseNum(String(fd.get("setupAmortMonths")), commercial.setupAmortMonths),
      overagePerMin: parseNum(String(fd.get("overagePerMin")), commercial.overagePerMin),
    }

    const marginInput = form.querySelector<HTMLInputElement>('input[name="callingMarginPct"]')
    if (marginInput) marginInput.disabled = commercial.clientRatePerMin != null

    const results = app.querySelector("#commercial-results")
    if (results) results.innerHTML = commercialResultsHtml()
  }

  form.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", syncFromForm)
    input.addEventListener("change", syncFromForm)
  })

  app.querySelector<HTMLButtonElement>('[data-action="reset-commercial"]')?.addEventListener("click", () => {
    commercial = { ...commercialDefaults }
    render()
    document.querySelector("#commercial")?.scrollIntoView({ behavior: "smooth", block: "start" })
  })
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
