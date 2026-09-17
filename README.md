# Industry TC — Scope-Lock Awareness

Interactive client submission site for the **Registration-to-Call · Pakistan Pilot** scope lock.

**Non-commercial.** No pricing. Commercials follow scope approval and evidence confirmation.

**Live (GitHub Pages):** https://zsabri19.github.io/industrytc-scope-lock/

> Private repository. Pages visitors need GitHub access to this repo (invite collaborators), or switch the repo to public for an open client link.

## Source

Content is distilled from the Scope Lock pack (layers 01–07): governance → evidence → workflow → operations → onboarding → executive → commercial readiness gate.

## Brand

Accent aligned to Industry TC marketplace teal: `#01A781`.

## Run locally

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## Deploy

Pushes to `main` run `.github/workflows/deploy-pages.yml` and publish the Vite `dist/` output to GitHub Pages.

## What the client can explore

- Journey toggle: **Today (leak)** vs **Guarded Phase 1** with hover consequences
- Use-case dropdown scenarios (warm seller, junk, buyer/mixed, unguarded AI, stale lead, commercial pressure)
- Pros / cons with “if you do / if you don’t” popovers
- In-scope / out-of-scope lists
- Disposition routes
- ClarityOS 8C
- Unguarded-agent risks
- Acceptance checklist for scope approval
