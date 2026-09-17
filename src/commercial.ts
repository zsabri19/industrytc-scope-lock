/** Phase 1 illustrative commercial model — editable calculator defaults from prior R&D. */

export type CommercialState = {
  /** Estimated billable AI talk minutes per month */
  minutesPerMonth: number
  /** Internal telephony/AI cost per minute (USD) */
  costPerMin: number
  /** Target gross margin on calling line (0–95), price = cost / (1 - margin/100) */
  callingMarginPct: number
  /** Optional override of client $/min; null = derive from cost + margin */
  clientRatePerMin: number | null
  /** Advisory / governance hours per month */
  advisoryHours: number
  /** Client advisory rate USD/hour */
  advisoryRate: number
  /** One-time setup fee to client (0 = waive) */
  setupFee: number
  /** Months to amortize setup into monthly view (1–12) */
  setupAmortMonths: number
  /** Overage rate if minutes exceed plan (display only for now) */
  overagePerMin: number
}

export const commercialDefaults: CommercialState = {
  minutesPerMonth: 2700,
  costPerMin: 0.35,
  callingMarginPct: 50,
  clientRatePerMin: null,
  advisoryHours: 14,
  advisoryRate: 150,
  setupFee: 1500,
  setupAmortMonths: 6,
  overagePerMin: 0.6,
}

export type CommercialLine = {
  id: string
  label: string
  unitsLabel: string
  units: number
  rateLabel: string
  rate: number
  amount: number
  note?: string
}

export type CommercialBreakdown = {
  effectiveClientRate: number
  callingCost: number
  callingPrice: number
  callingMarginPctActual: number
  advisoryAmount: number
  setupMonthly: number
  monthlySubtotal: number
  monthlyTotal: number
  phaseMonths: number
  phaseCalling: number
  phaseAdvisory: number
  phaseSetup: number
  phaseTotal: number
  lines: CommercialLine[]
}

export function effectiveClientRate(state: CommercialState): number {
  if (state.clientRatePerMin != null && state.clientRatePerMin > 0) {
    return state.clientRatePerMin
  }
  const m = Math.min(95, Math.max(0, state.callingMarginPct)) / 100
  if (m >= 0.999) return state.costPerMin * 20
  return state.costPerMin / (1 - m)
}

export function computeCommercial(
  state: CommercialState,
  phaseMonths = 3,
): CommercialBreakdown {
  const rate = effectiveClientRate(state)
  const minutes = Math.max(0, state.minutesPerMonth)
  const callingCost = minutes * state.costPerMin
  const callingPrice = minutes * rate
  const callingMarginPctActual =
    callingPrice > 0 ? ((callingPrice - callingCost) / callingPrice) * 100 : 0

  const advisoryAmount = Math.max(0, state.advisoryHours) * Math.max(0, state.advisoryRate)
  const amort = Math.max(1, Math.round(state.setupAmortMonths))
  const setupMonthly = Math.max(0, state.setupFee) / amort

  const monthlySubtotal = callingPrice + advisoryAmount
  const monthlyTotal = monthlySubtotal + setupMonthly

  const phaseCalling = callingPrice * phaseMonths
  const phaseAdvisory = advisoryAmount * phaseMonths
  // Setup is one-time in the phase (not × months)
  const phaseSetup = Math.max(0, state.setupFee)
  const phaseTotal = phaseCalling + phaseAdvisory + phaseSetup

  const lines: CommercialLine[] = [
    {
      id: "calling",
      label: "AI calling / qualification usage",
      unitsLabel: "min / month",
      units: minutes,
      rateLabel: "USD / min",
      rate,
      amount: callingPrice,
      note: `Internal cost basis ${fmtMoney(state.costPerMin)}/min · margin ~${callingMarginPctActual.toFixed(0)}%`,
    },
    {
      id: "advisory",
      label: "Advisory, governance & operating rhythm",
      unitsLabel: "hours / month",
      units: Math.max(0, state.advisoryHours),
      rateLabel: "USD / hour",
      rate: Math.max(0, state.advisoryRate),
      amount: advisoryAmount,
      note: "Weekly reviews, scope control, coaching, observation support",
    },
    {
      id: "setup",
      label: "Setup / implementation (amortized view)",
      unitsLabel: `÷ ${amort} mo`,
      units: 1,
      rateLabel: "USD one-time",
      rate: Math.max(0, state.setupFee),
      amount: setupMonthly,
      note:
        state.setupFee <= 0
          ? "Waived"
          : `One-time ${fmtMoney(state.setupFee)} spread over ${amort} months for monthly view`,
    },
  ]

  return {
    effectiveClientRate: rate,
    callingCost,
    callingPrice,
    callingMarginPctActual,
    advisoryAmount,
    setupMonthly,
    monthlySubtotal,
    monthlyTotal,
    phaseMonths,
    phaseCalling,
    phaseAdvisory,
    phaseSetup,
    phaseTotal,
    lines,
  }
}

export function fmtMoney(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: n % 1 === 0 ? 0 : 2,
  }).format(n)
}

export function fmtNum(n: number, digits = 0): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(n)
}

export function parseNum(raw: string, fallback = 0): number {
  const n = Number(String(raw).replace(/,/g, "").trim())
  return Number.isFinite(n) ? n : fallback
}
