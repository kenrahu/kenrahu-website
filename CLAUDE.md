# kenrahu.com — Project Memory

## Who is Rahul?
- **Name:** Rahul Kendale
- **Role:** AI Audit & Transformation Partner
- **Focus:** Helping small businesses adopt AI the right way — assess first, invest second
- **Email:** rahul@kenrahu.com
- **Domain:** kenrahu.com
- **LinkedIn:** (to be added)
- **Calendly:** https://calendly.com/kendale-rahul/30min

---

## What is this project?
Personal brand website + client pipeline tool. Built from scratch to:
- Establish credibility in AI consulting
- Showcase AI tools (starting with AI Readiness Quiz)
- Generate inbound client inquiries via "Book a Discovery Call" CTA
- Home for future PM/AI tools built with Claude Code

---

## Tech Stack
| Layer | Choice |
|-------|--------|
| Framework | React + Vite |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| Hosting | Vercel |
| Repo | https://github.com/kenrahu/kenrahu-website |
| Domain | kenrahu.com (bought on GoDaddy, DNS pointed to Vercel) |

---

## Design System
| Token | Value | Tailwind Class |
|-------|-------|----------------|
| Background | `#0F0F0F` | `bg-bg` |
| Surface (cards) | `#1A1A1A` | `bg-surface` |
| Accent (indigo) | `#6366F1` | `bg-accent` / `text-accent` |
| Accent hover | `#4F46E5` | `bg-accent-dark` |
| Muted text | `#9CA3AF` | `text-muted` |
| Border | `#2A2A2A` | `border-[#2A2A2A]` |
| Alt section bg | `#111111` | `bg-[#111111]` |

Custom colors are defined in `src/index.css` under `@theme {}` (Tailwind v4 CSS-first config).

---

## File Structure
```
kenrahu-website/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx              ← React Router (/ and /quiz)
    ├── index.css            ← Tailwind v4 @theme config + base styles
    ├── pages/
    │   ├── Home.jsx         ← Landing page (all sections)
    │   └── Quiz.jsx         ← Full quiz page + state machine
    └── components/
        ├── Navbar.jsx       ← Sticky, blur on scroll, mobile hamburger
        ├── Hero.jsx         ← Headline, 2 CTAs, trust stats
        ├── About.jsx        ← Bio, RK avatar placeholder, 3 value bullets
        ├── Services.jsx     ← 3 service cards
        ├── Tools.jsx        ← Tool portfolio cards
        ├── Contact.jsx      ← CTA section
        ├── Footer.jsx       ← Copyright, LinkedIn, "Built with AI"
        └── quiz/
            ├── QuizStart.jsx
            ├── QuizQuestion.jsx
            ├── QuizEmail.jsx
            └── QuizResults.jsx
```

---

## URL Structure
| URL | What |
|-----|------|
| kenrahu.com | Landing page |
| kenrahu.com/quiz | AI Readiness Quiz |
| kenrahu.com/tools/roadmap-prioritizer | Future tool (not built yet) |

---

## Landing Page Sections (in order)
1. **Navbar** — no logo, nav links (About · Services · Tools · Contact), "Book a Call" → Calendly
2. **Hero** — headline, subheadline, Book a Discovery Call + Try Quiz CTAs, trust stats
3. **About** — bio paragraph, RK initials avatar (headshot placeholder), 3 bullets
4. **Services** — 3 cards: AI Readiness Audit · AI Transformation Strategy · AI Tool Building
5. **Tools** — AI Readiness Calculator (live) · ROI Calculator (coming soon) · Roadmap Prioritizer (coming soon)
6. **Contact** — CTA section with Calendly button + email
7. **Footer** — copyright, LinkedIn link, "Built with AI"

---

## AI Readiness Quiz (10 Questions)
- Categories: Strategy, Data Readiness, Team Capability, Tech Infrastructure, Leadership Buy-in, Process Maturity, Budget, Current AI Usage, Risk & Compliance, Measurement
- Scoring: Each answer is 0 / 25 / 75 / 100 — final score is average
- 4 levels: Beginner (0–24) · Developing (25–49) · Ready (50–74) · Advanced (75–100)
- Email capture gate before results screen
- Results show: score ring, level badge, "what this means", numbered action plan, Calendly CTA

---

## Things Still To Do
- [ ] Add real headshot photo (replace RK initials avatar in About.jsx)
- [ ] Add LinkedIn profile URL (Footer.jsx — currently `#linkedin`)
- [ ] Build ROI Calculator tool
- [ ] Build Roadmap Prioritizer tool
- [ ] Add blog / case studies section
- [ ] Set up rahul@kenrahu.com email inbox (domain email via GoDaddy or Google Workspace)

---

## How to Run Locally
```bash
cd kenrahu-website
npm run dev
# → http://localhost:5173
```

## How to Deploy
```bash
git add .
git commit -m "your message"
git push
# Vercel auto-deploys on every push to main
```
