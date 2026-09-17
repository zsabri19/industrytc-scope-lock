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
  noTooltipDiv: !html.body.includes('id="tooltip"'),
  hasDetails: main.body.includes("<details"),
  hasExpandId: main.body.includes("data-expand-id"),
  noBindTooltips: !main.body.includes("bindTooltips"),
  noHoverCopy: !main.body.includes("Hover any") && !main.body.includes("hover a card"),
  hasGuide: main.body.includes("How to use this page"),
  clickCopy: main.body.includes("Click any card"),
  cssHasDetails: css.body.includes("details.expand"),
  noTooltipCss: !css.body.includes(".tooltip {"),
}

console.log(JSON.stringify(report, null, 2))
const failed = Object.entries(report).filter(([k, v]) => {
  if (k.endsWith("Status")) return v !== 200
  if (k.startsWith("no")) return v !== true
  return !v
})
if (failed.length) {
  console.error("FAILED", failed)
  process.exit(1)
}
console.log("SMOKE OK")
