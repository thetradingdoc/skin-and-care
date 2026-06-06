# iOS Skin & Care Tracker — Launch Todos

**Last updated:** 2026-06-06  
**Scope:** TestFlight-ready Expo patient app (`patient-app/`) — daily photo tracking + care_program subscription.  
**Brand:** Skin & Care · **Bundle ID:** `com.skinandcare.app`

---

## P0 — Git repo + iOS build configuration

- [x] GitHub repo [richiejeremiah/skin-and-care](https://github.com/richiejeremiah/skin-and-care) — brand branch `brand/skin-and-care`
- [x] Push helper — `npm run push:skin-care` → `skin-care` remote `main`
- [x] CI — `.github/workflows/skin-care-mobile.yml` (typecheck + EAS preview on push)
- [x] Runbook — `docs/Brand/SKIN_AND_CARE_REPO.md`
- [x] `patient-app/eas.json` — development, preview, production profiles
- [x] `patient-app/app.json` — name, slug, bundle ID, camera/photo permissions, expo-camera plugin
- [x] `patient-app/.env.example` — production API default for device builds
- [ ] Add `EXPO_TOKEN` secret on skin-and-care GitHub repo (manual)
- [ ] Apple Developer account + App Store Connect app record (manual)
- [ ] `eas build --platform ios --profile preview` (manual or CI after EXPO_TOKEN)
- [ ] `eas submit --platform ios` (manual)

## P1 — Auth and onboarding

- [x] `patient-app/app/sign-in.tsx` — email OTP, Skin & Care brand
- [x] `patient-app/hooks/useRequirePatientSession.ts` — gate Today, Timeline, routine pick
- [x] Account tab → `/sign-in` on sign out / unsigned
- [x] Deep link `patientapp://auth?ticket=…` (existing handoff)

## P2 — care_program billing (backend)

- [x] `care-program-billing-service.js` — checkout + activation
- [x] `POST /api/patient/billing/care-program/checkout`
- [x] Stripe webhook `care_program` activation (server.js existing hook)
- [ ] Set `STRIPE_PRICE_CARE_PROGRAM` in production env (Stripe Dashboard → recurring price)
- [ ] Optional: `CARE_PROGRAM_MONTHLY_CENTS=4900` display pricing

## P3 — Subscription UI (mobile)

- [x] Account tab — tier, pricing, Subscribe via Stripe Checkout (WebBrowser)
- [x] Deep link `patientapp://subscription/success|cancel`
- [x] Wallet link gated on `GET /api/patient/features` (`wallet_enabled`)

## P4 — Polish

- [x] Clinical disclaimer on Today
- [x] Remove dev demo copy from primary sign-in path
- [x] `__tests__/care-program-billing-service.test.js`

## P5 — TestFlight smoke (manual)

Run on physical iPhone against `https://api.callsomo.com`:

1. [ ] Fresh install → Sign in (email OTP)
2. [ ] Pick concern (e.g. acne) → Today loads week/phase
3. [ ] Log photo → celebrate banner → Timeline shows logged day
4. [ ] Compare two photo days
5. [ ] Account → Subscribe → Stripe test card → return → tier `care_program`
6. [ ] Sign out → sign in again → template persists

## P6 — App Store Connect (manual, before public release)

- [ ] Privacy policy URL
- [ ] Terms of service URL
- [ ] Screenshots (Today, capture, Timeline, Account)
- [ ] App Privacy questionnaire (photos, email)
- [ ] Export compliance / encryption declaration

## Env reference

```bash
# patient-app (EAS preview/production)
EXPO_PUBLIC_API_BASE_URL=https://api.callsomo.com

# middleware-platform
STRIPE_SECRET_KEY=sk_...
STRIPE_PRICE_CARE_PROGRAM=price_...
CARE_PROGRAM_MONTHLY_CENTS=4900
```

## Deferred (not this launch)

- Kelly / floating chat on Today
- In-app dermatologist booking
- Android Play Store
- Native video consult
