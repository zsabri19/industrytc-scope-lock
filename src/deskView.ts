import {
  buildSummaryText,
  clearDeskState,
  defaultDeskState,
  deskStats,
  includeItems,
  loadDeskState,
  outItems,
  ownerFields,
  saveDeskState,
  safetyItems,
  stopItems,
  type DeskState,
  type IncludeVote,
  type OutVote,
  type Overall,
  type Vote,
} from "./decisionDesk"

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

let state: DeskState = loadDeskState()

export function getDeskState() {
  return state
}

function persist() {
  saveDeskState(state)
}

export function renderDeskPage(root: HTMLElement, baseUrl: string) {
  const s = deskStats(state)
  const openTotal = s.includeOpen + s.outOpen + s.safetyOpen + s.stopsOpen

  root.innerHTML = `
    <header class="nav desk-nav">
      <a class="brand" href="#problem" aria-label="Back to Scope Lock brief">
        <img class="brand-logo" src="${baseUrl}industry-tc-logo.png" alt="Industry TC" width="168" height="37" />
        <span class="brand-tag">Decision Desk</span>
      </a>
      <div class="nav-end">
        <a class="btn btn-ghost-dark" href="#problem">← Brief</a>
        <button class="menu-btn" type="button" data-desk-action="menu" aria-expanded="false">Menu</button>
      </div>
    </header>

    <div class="mobile-nav" id="desk-mobile-nav" hidden>
      <a href="#ceo-overall">Overall decision</a>
      <a href="#ceo-include">Keep in Phase 1</a>
      <a href="#ceo-out">Keep out</a>
      <a href="#ceo-safety">Safety rules</a>
      <a href="#ceo-stops">Stop conditions</a>
      <a href="#ceo-owners">Owners</a>
      <a href="#ceo-summary">Live summary</a>
    </div>

    <main class="wrap desk-wrap">
      <section class="desk-hero">
        <div class="eyebrow">For Industry TC leadership</div>
        <h1>Phase 1 decision desk</h1>
        <p class="lede">
          Simple choices only: keep or remove scope, agree or discuss safety rules, name owners, and leave comments.
          Your selections update the summary on the right in real time. Nothing is submitted to a server — you can copy or download the summary to share.
        </p>
        <div class="desk-progress card">
          <div><span>Open items</span><strong class="${openTotal ? "warn-text" : "ok-text"}">${openTotal}</strong></div>
          <div><span>In scope kept</span><strong>${s.includeYes}/${includeItems.length}</strong></div>
          <div><span>Out-of-scope confirmed</span><strong>${s.outConfirmed}/${outItems.length}</strong></div>
          <div><span>Safety agreed</span><strong>${s.safetyAgree}/${safetyItems.length}</strong></div>
          <div><span>Comments</span><strong>${s.commentCount}</strong></div>
          <div><span>Owners named</span><strong>${s.ownersNamed}/${ownerFields.length}</strong></div>
        </div>
      </section>

      <div class="desk-layout">
        <div class="desk-main">
          <section class="card desk-block" id="ceo-overall">
            <h2>1. Overall decision</h2>
            <p class="desk-help">What do you want to do with this Phase 1 Scope Lock?</p>
            <div class="choice-row" data-group="overall">
              ${overallBtn("approve", "Approve as proposed", state.overall)}
              ${overallBtn("approve_changes", "Approve with changes marked below", state.overall)}
              ${overallBtn("hold", "Hold — needs discussion", state.overall)}
            </div>
            <div class="desk-fields twin">
              <label>Your name
                <input type="text" data-field="reviewerName" value="${escapeHtml(state.reviewerName)}" placeholder="e.g. Tanseer" />
              </label>
              <label>Your role
                <input type="text" data-field="reviewerRole" value="${escapeHtml(state.reviewerRole)}" placeholder="e.g. CEO" />
              </label>
            </div>
            <label class="desk-comment-label">General comment
              <textarea data-field="generalComment" rows="3" placeholder="Optional note for the team…">${escapeHtml(state.generalComment)}</textarea>
            </label>
          </section>

          <section class="card desk-block" id="ceo-include">
            <h2>2. Keep in Phase 1?</h2>
            <p class="desk-help">Tap <strong>Keep</strong> or <strong>Remove</strong> for each item. Add a short comment if you want a change.</p>
            ${includeItems.map((item) => includeRow(item.id, item.label, item.plain, state.include[item.id], state.comments[item.id] || "")).join("")}
          </section>

          <section class="card desk-block" id="ceo-out">
            <h2>3. Keep out of Phase 1?</h2>
            <p class="desk-help">These are proposed exclusions. Confirm they stay out, or request to bring one in.</p>
            ${outItems.map((item) => outRow(item.id, item.label, item.plain, state.outOfScope[item.id], state.comments[item.id] || "")).join("")}
          </section>

          <section class="card desk-block" id="ceo-safety">
            <h2>4. Safety rules</h2>
            <p class="desk-help">Agree, disagree, or mark for discussion. These protect brand trust on the first call.</p>
            ${safetyItems.map((item) => voteRow(item.id, item.label, item.plain, state.safety[item.id], state.comments[item.id] || "", "safety")).join("")}
          </section>

          <section class="card desk-block" id="ceo-stops">
            <h2>5. When we pause the pilot</h2>
            <p class="desk-help">Confirm these stop conditions. If any happen, the rollout pauses for review.</p>
            ${stopItems.map((item) => voteRow(item.id, item.label, item.plain, state.stops[item.id], state.comments[item.id] || "", "stops")).join("")}
          </section>

          <section class="card desk-block" id="ceo-owners">
            <h2>6. Name the owners</h2>
            <p class="desk-help">Phase 1 should not start with blank ownership.</p>
            <div class="desk-fields">
              ${ownerFields
                .map(
                  (o) => `
                <label>${escapeHtml(o.label)}
                  <input type="text" data-owner="${o.id}" value="${escapeHtml(state.owners[o.id] || "")}" placeholder="Full name" />
                </label>`,
                )
                .join("")}
            </div>
          </section>
        </div>

        <aside class="desk-side" id="ceo-summary">
          <div class="card desk-summary sticky-summary">
            <h2>Live summary</h2>
            <p class="desk-help">Updates as you click. Copy or download when ready to share.</p>
            <div class="summary-overall">${escapeHtml(overallLabel(state.overall))}</div>
            <ul class="summary-list">
              <li><strong>${s.includeYes}</strong> items kept in Phase 1</li>
              <li><strong>${s.includeNo}</strong> items removed</li>
              <li><strong>${s.outRequested}</strong> out-of-scope items requested back in</li>
              <li><strong>${s.safetyAgree}</strong> safety rules agreed</li>
              <li><strong>${s.safetyDisagree}</strong> safety items disagreed / discuss</li>
              <li><strong>${openTotal}</strong> still open</li>
            </ul>
            <div class="summary-actions">
              <button type="button" class="btn btn-primary" data-desk-action="copy">Copy summary</button>
              <button type="button" class="btn btn-reset" data-desk-action="download">Download .txt</button>
              <button type="button" class="btn btn-reset" data-desk-action="reset">Clear answers</button>
            </div>
            <p class="summary-note" id="desk-toast" hidden></p>
            ${state.updatedAt ? `<p class="summary-saved">Saved on this device · ${escapeHtml(new Date(state.updatedAt).toLocaleString())}</p>` : `<p class="summary-saved">Answers save automatically on this device</p>`}
          </div>
        </aside>
      </div>
    </main>

    <footer class="foot">Industry TC Decision Desk · Scope Lock Phase 1 · Saved locally in your browser</footer>
  `

  bindDesk(root)
}

function overallBtn(value: Overall, label: string, current: Overall) {
  return `<button type="button" class="choice-btn ${current === value ? "active" : ""}" data-overall="${value}">${escapeHtml(label)}</button>`
}

function includeRow(id: string, label: string, plain: string, vote: IncludeVote, comment: string) {
  return `
    <article class="desk-row" data-row="${id}">
      <div class="desk-row-main">
        <h3>${escapeHtml(label)}</h3>
        <p>${escapeHtml(plain)}</p>
        <div class="choice-row compact">
          <button type="button" class="choice-btn ${vote === "include" ? "active ok" : ""}" data-include="${id}" data-value="include">Keep</button>
          <button type="button" class="choice-btn ${vote === "exclude" ? "active bad" : ""}" data-include="${id}" data-value="exclude">Remove</button>
        </div>
        <label class="mini-comment">Comment
          <input type="text" data-comment="${id}" value="${escapeHtml(comment)}" placeholder="Optional…" />
        </label>
      </div>
    </article>`
}

function outRow(id: string, label: string, plain: string, vote: OutVote, comment: string) {
  return `
    <article class="desk-row" data-row="${id}">
      <div class="desk-row-main">
        <h3>${escapeHtml(label)}</h3>
        <p>${escapeHtml(plain)}</p>
        <div class="choice-row compact">
          <button type="button" class="choice-btn ${vote === "keep_out" ? "active ok" : ""}" data-out="${id}" data-value="keep_out">Keep out</button>
          <button type="button" class="choice-btn ${vote === "request_in" ? "active warn" : ""}" data-out="${id}" data-value="request_in">Request to include</button>
        </div>
        <label class="mini-comment">Comment
          <input type="text" data-comment="${id}" value="${escapeHtml(comment)}" placeholder="Optional…" />
        </label>
      </div>
    </article>`
}

function voteRow(
  id: string,
  label: string,
  plain: string,
  vote: Vote,
  comment: string,
  group: "safety" | "stops",
) {
  return `
    <article class="desk-row" data-row="${id}">
      <div class="desk-row-main">
        <h3>${escapeHtml(label)}</h3>
        <p>${escapeHtml(plain)}</p>
        <div class="choice-row compact">
          <button type="button" class="choice-btn ${vote === "agree" ? "active ok" : ""}" data-vote-group="${group}" data-vote-id="${id}" data-value="agree">Agree</button>
          <button type="button" class="choice-btn ${vote === "discuss" ? "active warn" : ""}" data-vote-group="${group}" data-vote-id="${id}" data-value="discuss">Discuss</button>
          <button type="button" class="choice-btn ${vote === "disagree" ? "active bad" : ""}" data-vote-group="${group}" data-vote-id="${id}" data-value="disagree">Disagree</button>
        </div>
        <label class="mini-comment">Comment
          <input type="text" data-comment="${id}" value="${escapeHtml(comment)}" placeholder="Optional…" />
        </label>
      </div>
    </article>`
}

function overallLabel(v: Overall) {
  if (v === "approve") return "Approve Phase 1 as proposed"
  if (v === "approve_changes") return "Approve with marked changes"
  if (v === "hold") return "Hold — needs discussion"
  return "No overall decision yet"
}

function toast(root: HTMLElement, message: string) {
  const el = root.querySelector<HTMLElement>("#desk-toast")
  if (!el) return
  el.hidden = false
  el.textContent = message
  window.setTimeout(() => {
    el.hidden = true
  }, 2500)
}

function refreshSummary(root: HTMLElement) {
  // Re-render full page to keep summary + progress in sync (simple + reliable for CEO UX)
  renderDeskPage(root, import.meta.env.BASE_URL)
}

function bindDesk(root: HTMLElement) {
  root.querySelectorAll<HTMLButtonElement>("[data-overall]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.overall = btn.dataset.overall as Overall
      persist()
      refreshSummary(root)
    })
  })

  root.querySelectorAll<HTMLButtonElement>("[data-include]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.include!
      state.include[id] = btn.dataset.value as IncludeVote
      persist()
      refreshSummary(root)
    })
  })

  root.querySelectorAll<HTMLButtonElement>("[data-out]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.out!
      state.outOfScope[id] = btn.dataset.value as OutVote
      persist()
      refreshSummary(root)
    })
  })

  root.querySelectorAll<HTMLButtonElement>("[data-vote-group]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.dataset.voteGroup as "safety" | "stops"
      const id = btn.dataset.voteId!
      const value = btn.dataset.value as Vote
      state[group][id] = value
      persist()
      refreshSummary(root)
    })
  })

  root.querySelectorAll<HTMLInputElement>("[data-comment]").forEach((input) => {
    input.addEventListener("input", () => {
      const id = input.dataset.comment!
      state.comments[id] = input.value
      persist()
      // Update live comment count without full remount to keep focus
      const s = deskStats(state)
      const progress = root.querySelectorAll(".desk-progress strong")
      // indices: open, includeYes, outConfirmed, safetyAgree, comments, owners
      if (progress[4]) progress[4].textContent = String(s.commentCount)
      const saved = root.querySelector(".summary-saved")
      if (saved) saved.textContent = `Saved on this device · ${new Date().toLocaleString()}`
    })
  })

  root.querySelectorAll<HTMLInputElement>("[data-field]").forEach((input) => {
    input.addEventListener("input", () => {
      const key = input.dataset.field as "reviewerName" | "reviewerRole" | "generalComment"
      state[key] = input.value
      persist()
      if (key === "generalComment") {
        const s = deskStats(state)
        const progress = root.querySelectorAll(".desk-progress strong")
        if (progress[4]) progress[4].textContent = String(s.commentCount)
      }
    })
  })

  root.querySelectorAll<HTMLInputElement>("[data-owner]").forEach((input) => {
    input.addEventListener("input", () => {
      state.owners[input.dataset.owner!] = input.value
      persist()
      const s = deskStats(state)
      const progress = root.querySelectorAll(".desk-progress strong")
      if (progress[5]) progress[5].textContent = `${s.ownersNamed}/${ownerFields.length}`
    })
  })

  root.querySelector<HTMLButtonElement>('[data-desk-action="copy"]')?.addEventListener("click", async () => {
    const text = buildSummaryText(state)
    try {
      await navigator.clipboard.writeText(text)
      toast(root, "Summary copied — paste into email or WhatsApp.")
    } catch {
      toast(root, "Copy failed — use Download instead.")
    }
  })

  root.querySelector<HTMLButtonElement>('[data-desk-action="download"]')?.addEventListener("click", () => {
    const text = buildSummaryText(state)
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `IndustryTC-ScopeLock-Decision-${new Date().toISOString().slice(0, 10)}.txt`
    a.click()
    URL.revokeObjectURL(url)
    toast(root, "Download started.")
  })

  root.querySelector<HTMLButtonElement>('[data-desk-action="reset"]')?.addEventListener("click", () => {
    if (!confirm("Clear all answers on this device?")) return
    clearDeskState()
    state = defaultDeskState()
    refreshSummary(root)
  })

  const menuBtn = root.querySelector<HTMLButtonElement>('[data-desk-action="menu"]')
  const mobileNav = root.querySelector<HTMLDivElement>("#desk-mobile-nav")
  menuBtn?.addEventListener("click", () => {
    if (!mobileNav || !menuBtn) return
    const open = mobileNav.hasAttribute("hidden")
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
}
