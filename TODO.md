# L&M Inventories — Next steps

## 1. Logo (in progress — Robyn)
- Header/footer on every page still use a text-based "L&M" monogram placeholder (the `.brand-mark` circle in `assets/css/styles.css`).
- When the real logo file is ready, swap it in across `index.html`, `about.html`, `services.html`, `fees.html`, `inspectpro.html`, `contact.html` — each has two usages (header + footer).
- Also still no favicon set up anywhere on the site — worth sourcing one at the same time (a square SVG/PNG, 512×512 is safest).
- Note: `inspectpro-mobile/` already has `Inspect Pro Logo.png` and `Inspect Pro favi.png` sitting in its root — worth checking whether those are current/reusable, separate from the `inspectpro-logo.png` already wired into the InspectPro page.

## 2. Deploy to Railway
- Add this site as a new service inside the existing Railway project that already hosts `lmsoftware` (backend + frontend) and `inspectpro-mobile`.
- `lmsoftware` has a working pattern to copy: a `railway.json` per service, `"builder": "NIXPACKS"`. `lminventories` is a single Node/Express app (`server.js` + `public/`), so it'll need its own `railway.json`.
- Environment variables to set in Railway (see `.env.example`): `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `PORT` (Railway sets this automatically).
- Confirm with Robyn which Railway project/environment to attach the new service to before deploying anything.

## 3. DNS / domain cutover
- Only after the Railway deployment is live and Robyn has checked it over.
- Point lminventories.co.uk's DNS at the new Railway deployment.
- Confirm old Canva site handling (redirect vs. just switching DNS) before making changes.

---
Robyn will come back once the logo is ready to pick this up.
