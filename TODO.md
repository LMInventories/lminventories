# L&M Inventories — Next steps

## 1. Logo — done, one loose end
- Real logo is wired in (`public/assets/img/logo.png` dark version, `logo-light.png` cream/transparent version for the homepage's floating header state).
- Still no **favicon** set up anywhere on the site — worth sourcing one (a square SVG/PNG, 512×512 is safest) and I'll wire it in.
- Note (still unchecked): `inspectpro-mobile/` already has `Inspect Pro Logo.png` and `Inspect Pro favi.png` sitting in its root — separate from `inspectpro-logo.png` already used on the InspectPro page, worth a look at some point but not blocking anything.

## 2. Deploy to Railway — in progress, blocked on one step

**Confirmed target**: Railway project `steadfast-nurturing` (ID `cc972d4a-e91d-434b-902e-a2ac0b003392`), under the `info@lminventories.co.uk` Railway login — **not** `loyaltytracker` (that's the separate lmsoftware/loyalty project — confirmed this is a different, dedicated project for lminventories).

**Done so far:**
- `railway.json` added (NIXPACKS builder, matching the pattern used elsewhere), `railway link` already points this local folder at `steadfast-nurturing`.
- `.env` created locally with real credentials: `RESEND_API_KEY`, `CONTACT_TO_EMAIL=info@lminventories.co.uk`, `CONTACT_FROM_EMAIL=enquiries@lminventories.co.uk` (domain `lminventories.co.uk` verified in Resend). Tested end-to-end — a real enquiry sent through the local server successfully delivered via Resend.
- Git repo initialized locally and committed (`samples/` and `meridia/` excluded via `.gitignore` — reference material, not needed to run the site).

**Blocked here:** creating the GitHub repo (`LMInventories/lminventories`, public, matching `lmsoftware`/`inspectpro-mobile`'s convention) was refused by the auto-mode permission classifier as a "public surface" action. Needs one of:
- Robyn runs it herself: `gh repo create LMInventories/lminventories --public --source=. --remote=origin --description "L&M Inventories website"` (from `C:\Projects\lminventories`), then tell Claude to push, or
- Robyn grants the permission when prompted / adds a Bash rule for `gh repo create` in settings, and Claude does it.

**Still to do after that:**
- Push the local commit to the new GitHub repo.
- Create a new service in the `steadfast-nurturing` Railway project, connected to that GitHub repo (so it auto-deploys on push).
- Set the same env vars (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`) in Railway's dashboard for that service.
- Deploy, get the generated `*.up.railway.app` URL, Robyn checks it live.

## 3. DNS / domain cutover
- Only after the Railway deployment is live and Robyn has checked it over.
- Point lminventories.co.uk's DNS at the new Railway deployment.
- Confirm old Canva site handling (redirect vs. just switching DNS) before making changes.

---
Robyn will come back to pick this up (either with the GitHub repo created, or ready to grant the permission).
