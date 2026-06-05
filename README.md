# PFood — Demo Prototype

A clickable, single-page **pitch prototype** for **PFood**. It renders inside a
centered phone frame on a dark backdrop so it reads well on a projector during a
live demo.

> ⚠️ This is a **demo, not a real app.** All data is hard-coded — no backend, no
> database, no real AI.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (default http://localhost:5173).

## The demo flow (4 screens)

Tap to move forward; every screen has a back button.

0. **Nearby** — list of 4 cafés near you (Bình Thạnh) with live "busy-ness"
   status dots. Tap **Goodhouse**.
1. **Venue** — Goodhouse is your usual spot, but it's **Full right now** (90%).
   Tap **Find me a backup**.
2. **AI backup** *(the wow moment)* — PFood instantly suggests **The Study Nook**:
   seats available, matched to how you like to study (Quiet · Power outlets ·
   Student-friendly price), plus a **−20% coupon (PFOOD20)**. Tap **Get directions**.
3. **Directions** — a simple map placeholder with an SVG route ("5 min walk")
   and the coupon. Tap **Mark as used** → it flips to **Redeemed ✓** to illustrate
   redemption/attribution tracking. Tap **Back to start** to reset.

## Presenter tip

The core "wow" is **Screen 1 → Screen 2**: the usual spot is full, and PFood
rescues you with a tailored backup + coupon. Open the demo on Screen 0 and
rehearse that tap sequence so it lands cleanly.

## Tech

- React 18 + Vite
- Tailwind CSS
- Font: Be Vietnam Pro (falls back to Inter)
