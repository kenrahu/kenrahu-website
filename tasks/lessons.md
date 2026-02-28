# PRD Generator — Lessons Log

> Add a lesson every time a mistake is corrected during this build.

---

## Session — 2026-02-26

### PRD Generator — Key Decisions
- Use **Gemini API** (`GEMINI_API_KEY`), NOT Anthropic key
- Model: `gemini-1.5-flash` (free tier)
- Rate limit: **3 PRDs per IP per 24 hours** (already coded)
- `GEMINI_API_KEY` has been added to Vercel env vars ✅
- Still pending: verify live on kenrahu.com/tools/prd-generator

### Business Card — Decisions
- Size: Standard 3.5 x 2 inch
- Style: Dark theme (bg `#0F0F0F`, accent `#6366F1`)
- Title: **AI Transformation Partner**
- No headshot photo
- Front: Name, title, tagline, email, kenrahu.com, LinkedIn QR
- Back: 3 services, Calendly QR + link, phone number
- LinkedIn QR: generate via qr-code-generator.com using linkedin.com/in/kendalerahul/
- Design in Canva, print via Vistaprint.in

---

## Session — 2026-02-28

### CRITICAL LESSON — Always commit ALL changed files before ending a session

**What went wrong:**
- Previous session built PRD Generator and marked tasks complete in todo.md
- But only SOME files were committed to git — `Tools.jsx` and `PRDGenerator.jsx` were left uncommitted
- Next session: live site showed old content, PRDGenerator.jsx was missing entirely
- Wasted 30+ mins debugging what was actually a git commit issue

**Rules to follow from now on:**
1. **Before ending ANY session** — always run `git status` to check for uncommitted files
2. **Never mark a task as done** unless the code is committed AND verified live
3. **After every deploy** — check the live site immediately, don't assume it worked
4. **For React Router on Vercel** — always include `vercel.json` with SPA rewrite from day 1:
   ```json
   { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
   ```
5. **Nested routes like `/tools/prd-generator`** need vercel.json — single routes like `/quiz` may work without it
