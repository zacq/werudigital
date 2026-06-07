# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Weru Connect** — a Next.js 15 mobile-first QR-code landing page for Weru Digital (Kenyan TV/radio broadcaster). Users scan a QR code and land here to watch live TV, listen to radio, shop, and subscribe. Deployed on Netlify at `werudigital.co.ke`.

## Commands

```bash
npm run dev      # start dev server (Turbopack) — usually on :3001 if :3000 is taken
npm run build    # production build
npm run lint     # ESLint
node generate-qr.mjs  # regenerate the branded anniversary QR PNG (root folder)
```

No test suite is configured.

## Architecture

Single-page app. `src/app/page.tsx` composes all sections top-to-bottom — this is the only place section order is controlled.

```
src/
  app/
    layout.tsx        # fonts (Geist, Nunito, Geist Mono via next/font/google), metadata
    page.tsx          # section composition + LeadCaptureModal mount
    globals.css       # Tailwind v4, brand CSS vars, glass utility classes, glow helpers
  components/
    sections/         # full-width page sections (Hero, QuickAccess, LiveContent, ...)
    ui/               # reusable primitives (GlassButton, GlassTile, SpinningGlobe, ...)
```

### Glass system
Four reusable CSS classes in `globals.css` — never recreate inline:
- `.glass` — standard dark card
- `.glass-sm` — lighter, smaller blur (used in header strip)
- `.glass-strong` — heavy blur for modals/overlays
- `.glass-light` — for use on coloured (orange/red) section backgrounds

### Brand palette (CSS vars in globals.css)
`--color-weru-orange: #f97d00` · `--color-weru-red: #C8102E` · `--color-weru-gold: #FACC15`
Gold gradient for metallic text: `linear-gradient(180deg, #FFE78A, #FFC93C, #F5A300, #D87A00, #A94F00)`

### Typography
- **Nunito ExtraBold 800** (`var(--font-nunito)`) — logo wordmark and sales carousel text
- **Geist Sans** — body default
- Apply via `fontFamily: "var(--font-nunito), 'Nunito', sans-serif"` in inline styles

### Animation
All motion uses **Framer Motion** — no CSS `transition` or `animation` classes for interactive elements. `useAnimationFrame` for frame-driven loops (see `SpinningGlobe.tsx`). `AnimatePresence` with `mode="wait"` for enter/exit swaps.

### Key components
- **`Hero`** — full-screen section with `SpinningGlobe` logo badge, 7-slide sales carousel (auto-advances 4 s, `AnimatePresence` fade+slide, dot indicators)
- **`LiveContent`** — Shop teaser: live countdown to `LAUNCH_DATE`, WhatsApp waitlist CTA, blurred product previews. Change `LAUNCH_DATE` constant when launch date changes.
- **`LeadCaptureModal`** — auto-shows after 1.5 s. Two localStorage keys control suppression: `weru_lead_captured` (permanent) and `weru_popup_dismissed` (7-day cooldown). Backend stub in `handleSubmit` — Phase 3 will wire to `/api/subscribe` + Airtable.
- **`SpinningGlobe`** — frame-driven 3D globe using `useAnimationFrame`; longitude meridians animated via `Math.cos(angle)` for real sphere math.
- **`GlassButton`** — three variants: `primary`, `secondary`, `pill`. Always use this instead of raw `<a>` or `<button>` for CTAs.
- **`AdZone`** — rotating sponsored slots (auto-carousel, 4 s). Edit the `ads` array to change partner content.

### Deployment
Netlify + `@netlify/plugin-nextjs`. `next.config.ts` sets `output: "standalone"`. Push to `master` → auto-deploys to `werudigital.co.ke`.

### QuizPromo section (`src/components/sections/QuizPromo.tsx`)
Three animated promotional cards linking to `https://werudigital.co.ke/quiz`.

- **Card 1** — "10 for 10: Castle Escape" — active link, CTA reads `Start Quiz →`
- **Card 2** — "2 Bales of Lea Premium Unga" (Lea Premium) — **currently disabled** (no href, `cursor-default`), CTA reads `Coming Soon`. When the user provides a link: add `href`, set `target="_blank"`, change CTA label back to **`Play & Win →`**
- **Card 3** — "Win a Ksh 5,000 Yetu Sacco Account" (Yetu Sacco) — **currently disabled** (no href, `cursor-default`), CTA reads `Coming Soon`. When the user provides a link: add `href`, set `target="_blank"`, change CTA label back to **`Join Now →`**

### QR code
`generate-qr.mjs` (project root) generates `werudigital-qr-anniversary.png` — a branded 900×900 PNG using the `qrcode` + `sharp` packages. The Weru Logo is embedded as base64 from `Weru Logo.png`. Run with `node generate-qr.mjs` whenever the QR target URL or design changes.
