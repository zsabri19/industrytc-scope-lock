import http from "http"

const get = (u) =>
  new Promise((res, rej) => {
    http
      .get(u, (r) => {
        let d = ""
        r.on("data", (c) => (d += c))
        r.on("end", () => res({ status: r.statusCode, body: d }))
      })
      .on("error", rej)
  })

const html = await get("http://127.0.0.1:5173/")
const main = await get("http://127.0.0.1:5173/src/main.ts")
const css = await get("http://127.0.0.1:5173/src/style.css")

const report = {
  htmlStatus: html.status,
  mainStatus: main.status,
  cssStatus: css.status,
  hasApp: html.body.includes('id="app"'),
  hasTitle: html.body.includes("Scope-Lock"),
  hasScenarioSelect: main.body.includes("scenario-select"),
  hasTooltips: main.body.includes("data-tip"),
  hasModeToggle: main.body.includes("data-mode"),
  hasAcceptance: main.body.includes("Approve the journey"),
  hasCompare: main.body.includes("tradeoffs"),
  hasDispositions: main.body.includes("QUALIFIED_SELLER"),
  cssHasTeal: css.body.includes("#01a781"),
  mainBytes: main.body.length,
}

console.log(JSON.stringify(report, null, 2))
const ok = Object.entries(report).every(([k, v]) =>
  k.endsWith("Status") ? v === 200 : k === "mainBytes" ? v > 1000 : Boolean(v),
)
process.exit(ok ? 0 : 1)
