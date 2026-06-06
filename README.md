# Skin & Care — daily skin tracking app

**Brand repo:** [github.com/richiejeremiah/skin-and-care](https://github.com/richiejeremiah/skin-and-care)  
**Platform upstream:** [github.com/richiejeremiah/somo-platform](https://github.com/richiejeremiah/somo-platform) (branch `brand/skin-and-care`)  
**API:** `https://api.callsomo.com` (shared Somo middleware)

Skin & Care is a consumer iOS app for daily photo tracking, concern-based routines (acne, anti-aging, hyperpigmentation, barrier repair, rosacea), and optional `care_program` subscription.

This repository is a **full mirror** of the Somo monorepo on the `brand/skin-and-care` branch — same middleware, agents, and tooling — so Cursor agents and platform code stay in one tree while the product ships from this repo.

---

## Quick start (mobile)

```bash
cd patient-app
cp .env.example .env
npm ci
npx expo start
```

Production API is set in `.env.example` and EAS profiles (`preview` / `production`).

## Push workflow

```bash
git checkout brand/skin-and-care
# ... commit changes ...
npm run push:skin-care          # → skin-and-care GitHub main (TestFlight CI)
git push origin brand/skin-and-care   # optional backup on somo-platform
```

See [`docs/Brand/SKIN_AND_CARE_REPO.md`](docs/Brand/SKIN_AND_CARE_REPO.md) for merge cadence, EAS, and multi-brand template.

## iOS / TestFlight

| Step | Command / doc |
|------|----------------|
| EAS profiles | `patient-app/eas.json` |
| Launch checklist | `todos/pending/IOS_SKINCARE_TRACKER_LAUNCH_TODOS.md` |
| Preview build | `cd patient-app && eas build --platform ios --profile preview` |
| App Store submit | `eas submit --platform ios --profile production` (after ASC setup) |

Bundle ID: `com.skinandcare.app`

## Middleware (shared platform)

Local API for development:

```bash
npm ci --prefix middleware-platform
npm start --prefix middleware-platform
```

Middleware **production deploy** runs from **somo-platform `main`**, not from this repo. Consumer apps only point at `api.callsomo.com`.

## Repo layout

| Path | Purpose |
|------|---------|
| `patient-app/` | Expo React Native app (Skin & Care) |
| `middleware-platform/` | Shared API (care_program billing, patient auth, routines) |
| `livekit-agents/` | Voice agents (platform) |
| `unified-dashboard/` | Provider / business dashboards (Somo brand) |
| `docs/Brand/` | Brand runbooks including this repo workflow |

## Contributing

Platform-wide changes: merge `origin/main` into `brand/skin-and-care` weekly. Skin & Care–only changes stay on this branch and push to `skin-care` remote only.
