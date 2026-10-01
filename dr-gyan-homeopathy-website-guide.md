# Dr. Gyan's Homeopathy — Website Design & Build Guide

> Treatment for Everyone
> Build guide for designing and developing the clinic website with **Claude Design**, **Claude Code** and **GitHub**.

---

## 1. Project Overview

| Item | Detail |
|---|---|
| Clinic name | Dr. Gyan's Homeopathy |
| Doctor | Dr. Gyanesh Sharma, BHMS (Homeopathic Medical College, Lucknow) |
| Practising since | 2005 (started in Lucknow, now in Vaishali, Ghaziabad) |
| Tagline | Treatment for Everyone |
| Address | Shop No. 9, 1st Floor, Kshitij Complex, Sector 4, Vaishali, Ghaziabad, Uttar Pradesh 201010 |
| Email | care@drgyanshomeopathy.com |
| Phone | +91 98711 90713 |
| Social | Facebook, X (Twitter), LinkedIn |

**Goals**
1. Build trust in Dr. Sharma's experience (20+ years of practice).
2. Help patients learn about conditions and how homeopathy approaches them.
3. Turn visitors into appointments (call, WhatsApp, booking form).
4. Rank locally for searches like "homeopathy doctor Vaishali Ghaziabad".

---

## 2. Tools & Platforms

| Purpose | Tool | Why |
|---|---|---|
| Visual design, mockups, design system | **Claude Design** | Create the design system (colors, fonts, components) and page mockups; iterate visually before code |
| Development | **Claude Code** | Builds the site from the design, runs agents, writes and tests code |
| Repository & version control | **GitHub** | Source code, pull requests, issues, Actions for CI |
| Framework | **Next.js 15 (App Router) + TypeScript** | Fast, SEO-friendly static pages; easy content from Markdown |
| Styling | **Tailwind CSS** | Design tokens map directly from Claude Design |
| Content | **MDX files** in the repo (`/content/diseases`, `/content/blog`) | Agents write content as files; every change is reviewed in a PR |
| Search | **Pagefind** (static search) or **Fuse.js** | Header search bar works without a server |
| Forms | Formspree / Web3Forms, or a Next.js API route + email | Appointment & contact forms |
| Hosting | **Vercel** (free tier) or Netlify, connected to GitHub | Auto-deploy on every merge to `main` |
| Maps | Google Maps embed | Clinic location on Contact page |
| Analytics | Google Analytics 4 + Google Search Console | Traffic and SEO tracking |
| Images | Licensed stock (Unsplash, Pexels, Freepik), custom illustrations | See image rules in §9 |
| Testing | Playwright (screenshots, flows), Lighthouse (performance/accessibility) | Quality gate before launch |

---

## 3. Design System (build first in Claude Design)

### 3.1 Theme — "Healing Forest"
A calm, natural, leafy feel: light green backgrounds, soft foliage, bonsai leaves framing the top-right corner, gentle forest textures. Clean and trustworthy, not cluttered.

### 3.2 Color Palette

| Token | Hex | Use |
|---|---|---|
| `--leaf-50` | `#F3FAF0` | Main page background (light leafy green) |
| `--leaf-100` | `#E4F3DC` | Section alternate background, cards |
| `--leaf-200` | `#C8E6B8` | Borders, dividers, subtle highlights |
| `--leaf-400` | `#7CBF5E` | Icons, accents, hover states |
| `--forest-600` | `#2F7D32` | Primary buttons, links |
| `--forest-800` | `#1E4D2B` | Headings, header/footer background |
| `--bark-700` | `#5B4636` | Bonsai trunk accents, small details |
| `--sunlight` | `#F6C453` | Highlight badges ("New", "Book Now" glow) — use sparingly |
| `--ink` | `#1F2A24` | Body text |
| `--white` | `#FFFFFF` | Cards, form fields |

> Keep text contrast at WCAG AA (4.5:1). Dark green text on light green background passes; light green text on light background does not.

### 3.3 Typography
- **Headings:** *Fraunces* or *Cormorant Garamond* (organic serif, feels natural and classic)
- **Body:** *Nunito Sans* or *Inter* (clean, readable)
- **Hindi support (optional):** *Noto Sans Devanagari*
- Base size 16–18px, line height 1.6

### 3.4 Background & Decoration
- **Top-right corner:** bonsai branch with leaves (SVG/PNG with transparency), fixed to the hero section, gently overlapping the header. Subtle sway animation (CSS `transform: rotate` 1–2°, slow) — disabled for `prefers-reduced-motion`.
- **Page background:** `--leaf-50` with a very faint leaf-vein / foliage texture (5–8% opacity).
- **Section dividers:** soft wave or leaf-edge SVG shapes between sections.
- **Footer:** deep forest green (`--forest-800`) with a silhouette of a tree line along its top edge.
- **Floating leaves:** a few small, slow-drifting leaves in the hero only (keep performance light).
- **Cards:** white or `--leaf-100`, rounded corners (16px), soft shadow, small leaf icon accent.

### 3.5 Components to design in Claude Design
- Header (logo, nav, search, "Book Appointment" button) + mobile hamburger menu
- Hero banner
- Disease card (image, name, short line, "Learn more")
- Blog card (thumbnail, category tag, date, title, excerpt)
- Buttons (primary, secondary, outline), tags/badges
- Testimonial card
- Appointment form, contact form
- Breadcrumbs, pagination
- Footer (contact details, quick links, social icons, copyright)
- Disclaimer box (used on every disease and blog page)

**Claude Design prompt to start:**
> Create a design system called "Healing Forest" for Dr. Gyan's Homeopathy, a homeopathy clinic in Vaishali, Ghaziabad. Light leafy green backgrounds, bonsai tree leaves in the top-right corner, calm forest and nature vibes, trustworthy and clean. Use the palette and fonts in this guide. Include header, hero, disease card, blog card, buttons, forms and footer components.

Then ask Claude Design for page mockups (Home, About, Diseases list, Disease detail, Blog list, Blog post, Contact), mobile and desktop.

---

## 4. Site Map & Header

```
Header: [Logo]  Home | About | Diseases | Latest News | Contact Us   [🔍 Search]  [Book Appointment]
```

| Page | URL |
|---|---|
| Home | `/` |
| About | `/about` |
| Diseases (list) | `/diseases` |
| Disease detail | `/diseases/[slug]` e.g. `/diseases/psoriasis` |
| Latest News / Blog (list) | `/blog` |
| Blog post | `/blog/[slug]` |
| Contact Us | `/contact` |
| Search results | `/search?q=` |
| Privacy Policy, Disclaimer | `/privacy`, `/disclaimer` |

**Header behaviour**
- Sticky on scroll, background becomes slightly opaque white-green with blur.
- Search bar searches disease names, symptoms and blog titles; shows suggestions as the user types.
- On mobile: logo + search icon + hamburger; "Book Appointment" becomes a floating button. Add a floating **WhatsApp / Call** button bottom-right.

---

## 5. Page Templates

### 5.1 Home
1. **Hero** — bonsai leaves top-right; headline ("Gentle, Personalised Homeopathic Care in Vaishali"); sub-line with tagline; buttons: *Book Appointment*, *Call Now*.
2. **Trust strip** — "Practising since 2005", "BHMS, Lucknow", patients treated (only if accurate), conditions covered.
3. **About preview** — doctor photo + short bio + "Read More".
4. **Conditions we treat** — 6–8 disease cards + "View all".
5. **Why choose us** — personalised consultation, holistic approach, experienced doctor, convenient location.
6. **Testimonials** — real patient reviews only, with consent (or embed Google reviews).
7. **Latest news** — 3 newest blog cards.
8. **Location & contact** — map, address, timings, phone.
9. **Footer.**

### 5.2 About
- Doctor's photo, full bio (journey from Lucknow to Vaishali, BHMS education, years of practice), registration number with the state homeopathy board, clinic photos, consultation timings, philosophy of care.

### 5.3 Diseases (list page)
- Intro paragraph + search/filter by category (Skin, Respiratory, Digestive, Joints, Women's Health, Child Health, Lifestyle, Mental Wellness, Hair).
- Grid of **disease cards**: image, name, one-line description, "Learn more →".
- Responsive: 3–4 columns desktop, 2 tablet, 1 mobile.

**Starter disease list (expand later):** Psoriasis, Eczema, Acne, Vitiligo, Hair Fall, Allergic Rhinitis, Asthma, Sinusitis, Migraine, Arthritis, Gastritis/Acidity, IBS, Thyroid, PCOS, Kidney Stones, Piles, Warts, Anxiety & Stress, Insomnia, Childhood Recurrent Colds.

### 5.4 Disease Detail Page (template)
```
Breadcrumb: Home > Diseases > Psoriasis
[Hero image]  Psoriasis
Quick facts box (category, common in, reading time)

1. What is [Disease]?
2. Symptoms
3. Causes & Risk Factors
4. How Homeopathy Approaches [Disease]
5. What Homeopathic Medicines Are Based On
6. Homeopathy and Conventional Treatment (see §8 guardrails)
7. Lifestyle & Self-care Tips
8. When to See a Doctor Urgently
9. FAQs (4–6)
[Disclaimer box]
[Book a Consultation CTA]
Related diseases (3 cards) | Related blog posts
```

### 5.5 Latest News / Blog
- List page: featured post at top, then grid of cards; filter by category (Research, Seasonal Health, Clinic News, Wellness Tips).
- Post page: title, author (Dr. Gyanesh Sharma), date, reading time, content, **sources/references list**, share buttons, related posts, CTA.

### 5.6 Contact Us
- Address, email, phone (click-to-call), WhatsApp link, timings, Google Map embed, contact/appointment form (name, phone, preferred date, concern), social links.

---

## 6. Content File Format

Each disease is one MDX file so agents can write it and you can review it in a pull request.

`content/diseases/psoriasis.mdx`
```yaml
---
title: "Psoriasis"
slug: "psoriasis"
category: "Skin"
summary: "A long-term skin condition causing red, scaly patches."
image: "/images/diseases/psoriasis.webp"
imageAlt: "Illustration of skin layers affected by psoriasis"
seoTitle: "Psoriasis Treatment with Homeopathy in Vaishali, Ghaziabad"
seoDescription: "Learn about psoriasis symptoms, causes and how homeopathic care works at Dr. Gyan's Homeopathy, Vaishali."
lastReviewed: "2026-10-01"
reviewedBy: "Dr. Gyanesh Sharma, BHMS"
sources:
  - "https://www.who.int/..."
  - "https://www.nhs.uk/..."
related: ["eczema", "vitiligo"]
faqs:
  - q: "Is psoriasis contagious?"
    a: "No..."
---
## What is Psoriasis?
...
```

`content/blog/[slug].mdx` uses: `title, slug, date, author, category, excerpt, coverImage, tags, sources, reviewedBy`.

---

## 7. Agents (Claude Code subagents)

Create these in `.claude/agents/` in the repo. Each is a Markdown file with frontmatter (`name`, `description`, `tools`) and instructions.

| # | Agent | Job | Tools |
|---|---|---|---|
| 1 | **disease-researcher** | Reads reliable sources about a disease (WHO, NHS, MedlinePlus, Mayo Clinic, PubMed, CCRH — Central Council for Research in Homoeopathy, Ministry of AYUSH) and produces a research brief with facts and source links | WebSearch, WebFetch, Write |
| 2 | **disease-content-writer** | Turns the brief into the disease MDX page using the template in §5.4, in simple patient-friendly English (optional Hindi version) | Read, Write |
| 3 | **medical-compliance-reviewer** | Checks every page against the guardrails in §8: no cure claims, no "stop your medicine", disclaimer present, sources cited, red-flag symptoms included. Flags anything for the doctor | Read, Edit |
| 4 | **blog-research-writer** | Finds recent homeopathy research and health news, summarises it accurately (including study size and limitations), writes blog drafts with references | WebSearch, WebFetch, Write |
| 5 | **seo-agent** | Writes meta titles/descriptions, schema markup (`MedicalClinic`, `Physician`, `MedicalWebPage`, `FAQPage`, `Article`), internal links, local SEO for Vaishali/Ghaziabad | Read, Edit |
| 6 | **frontend-builder** | Builds components and pages from the Claude Design mockups in Next.js + Tailwind | Read, Write, Edit, Bash |
| 7 | **qa-accessibility-tester** | Runs Playwright screenshots on mobile/desktop, Lighthouse, checks contrast, alt text, broken links, form submission | Bash, Read |

**Example agent file — `.claude/agents/disease-researcher.md`**
```markdown
---
name: disease-researcher
description: Researches a named disease from reliable medical and homeopathy sources and writes a research brief for the content writer.
tools: WebSearch, WebFetch, Write
---
You research one disease at a time for Dr. Gyan's Homeopathy.

1. Gather facts from authoritative sources: WHO, NHS, MedlinePlus, Mayo Clinic, PubMed, CCRH, Ministry of AYUSH.
2. Cover: definition, symptoms, causes/risk factors, diagnosis, red-flag symptoms needing urgent care,
   how homeopathy approaches the condition (individualised case-taking, constitutional prescribing),
   commonly referenced remedies in homeopathic literature, and the state of research evidence (be honest about quality).
3. Record a source URL for every factual claim.
4. Save to research/diseases/<slug>.md. Do not write marketing copy.
```

**Example agent file — `.claude/agents/medical-compliance-reviewer.md`**
```markdown
---
name: medical-compliance-reviewer
description: Reviews disease and blog content for medical-safety and advertising compliance before publishing.
tools: Read, Edit
---
Check each page for:
- No claims of guaranteed cure, "permanent cure", "100% results", or "no side effects ever".
- No advice to stop or replace prescribed medicines; always "continue your current treatment and consult your doctor".
- No disparaging other systems of medicine.
- Red-flag symptoms and "seek urgent care" section present.
- Specific remedy names are described as examples from homeopathic literature, never as self-medication dosing.
- Disclaimer present. Sources listed. "Reviewed by Dr. Gyanesh Sharma" field filled only after his sign-off.
Output a checklist with PASS/FIX per item and fix wording issues directly.
```

**Pipeline per disease:**
`disease-researcher → disease-content-writer → medical-compliance-reviewer → seo-agent → Dr. Sharma reviews PR → merge → auto-deploy`

**Prompt to run in Claude Code:**
> Use the disease-researcher agent for "Psoriasis", then the disease-content-writer to create content/diseases/psoriasis.mdx, then the medical-compliance-reviewer and seo-agent. Open a pull request titled "Add Psoriasis page" for review.

---

## 8. Medical Content Guardrails (important)

Health websites in India are subject to the **Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954**, the **Consumer Protection Act** and the ethics rules of the **National Commission for Homoeopathy** on advertising by practitioners. Search engines also rank health ("Your Money or Your Life") content strictly. So:

1. **Reframe "Why homeopathy over allopathy"** as **"Homeopathy and Conventional Treatment"** — explain what homeopathy offers (individualised, holistic consultation; gentle approach; can be used alongside conventional care) without attacking other medicine or telling patients to choose one over the other. This protects the clinic legally and builds more trust.
2. **No cure guarantees.** Use "may help manage", "aims to", "patients often seek homeopathy for".
3. **Never advise stopping prescribed medicine.** Add: "Continue your current treatment and consult your doctor before making changes."
4. **Remedy names are not self-medication advice.** No dosages; say medicines are chosen after individual consultation.
5. **Be honest about evidence.** Blog posts on research should mention study size, type and limitations.
6. **Red-flag section on every disease page** (e.g., chest pain, breathing difficulty, high fever in infants → emergency care).
7. **Avoid "Best doctor" superlatives** in your own copy (the current site uses "Best homeopathic Doctor" — consider "Experienced homeopathic doctor").
8. **Doctor sign-off required** before any medical page goes live.
9. **Disclaimer on every medical page:**
   > The information on this page is for general education and is not a substitute for professional medical advice, diagnosis or treatment. Please consult a qualified doctor about your health. Results vary from person to person.

---

## 9. Images & Media

- Prefer **illustrations or soft lifestyle photos** over graphic clinical photos of skin conditions (less distressing, more on-brand).
- Use only **licensed images** (Unsplash, Pexels, paid stock, or commissioned). Keep a `credits.md`.
- Bonsai leaves, leaf textures and tree-line footer: SVG for sharpness and small size.
- Export as **WebP/AVIF**, lazy-load below the fold, always add `alt` text.
- Use real photos of Dr. Sharma and the clinic on Home, About and Contact — they build the most trust.
- Testimonials: real patients, written consent, no before/after cure claims.

---

## 10. Skills (Claude Code)

| Skill | Use |
|---|---|
| `frontend-design` (built-in) | Distinctive, non-template visual implementation of the Healing Forest theme |
| **Custom: `disease-page`** | Template + rules from §5.4 and §8 so every disease page is consistent |
| **Custom: `blog-post`** | Blog structure, citation format, research-summary rules |
| **Custom: `brand-voice`** | Tone: warm, calm, simple English, respectful of all medicine, no hype |

Create custom skills with the `skill-creator` skill, stored in `.claude/skills/<name>/SKILL.md`.

---

## 11. Repository Structure

```
dr-gyan-homeopathy/
├── .claude/
│   ├── agents/           # 7 agents from §7
│   ├── skills/           # disease-page, blog-post, brand-voice
│   └── settings.json
├── CLAUDE.md             # project rules: brand, palette, guardrails, commands
├── app/
│   ├── layout.tsx        # header, footer, fonts, background
│   ├── page.tsx          # Home
│   ├── about/page.tsx
│   ├── diseases/page.tsx
│   ├── diseases/[slug]/page.tsx
│   ├── blog/page.tsx
│   ├── blog/[slug]/page.tsx
│   ├── contact/page.tsx
│   └── search/page.tsx
├── components/           # Header, SearchBar, DiseaseCard, BlogCard, Hero, Footer, Disclaimer, AppointmentForm
├── content/
│   ├── diseases/*.mdx
│   └── blog/*.mdx
├── research/             # agent research briefs (not published)
├── public/images/        # bonsai.svg, leaf-texture.svg, diseases/, blog/, doctor/
├── styles/globals.css    # design tokens
├── tailwind.config.ts
└── README.md
```

**`CLAUDE.md` should include:** clinic details (§1), palette & fonts (§3), page template (§5.4), guardrails (§8), commands (`npm run dev`, `npm run build`, `npm run lint`, `npx playwright test`), and "every content change goes through a PR".

---

## 12. GitHub Workflow

1. Create repo `dr-gyan-homeopathy` (private).
2. Branches: `main` (live), `dev` (staging), feature branches `feat/header`, `content/psoriasis`.
3. Every agent change → **pull request** → Vercel preview link → Dr. Sharma reviews content → merge.
4. GitHub Actions: lint, type-check, build, link check on each PR.
5. Issues/Project board for tracking: Design, Build, Content, SEO, Launch.
6. Protect `main`: require 1 approval before merge.

---

## 13. Build Phases

| Phase | Work | Tool | Output |
|---|---|---|---|
| 1. Discovery | Collect logo, doctor photos, registration no., timings, disease list, testimonials | You + Doctor | Assets folder |
| 2. Design system | Palette, fonts, components, bonsai/leaf assets | Claude Design | Healing Forest design system |
| 3. Mockups | All pages, mobile + desktop; review with doctor | Claude Design | Approved designs |
| 4. Setup | Repo, Next.js, Tailwind, `CLAUDE.md`, agents, skills | Claude Code + GitHub | Running skeleton |
| 5. Build | Header, search, layouts, pages, forms | Claude Code (frontend-builder) | Working site on preview URL |
| 6. Content | 10 disease pages first, then 3–5 blogs | Agents 1–5 + doctor review | MDX content |
| 7. SEO | Schema, sitemap, robots.txt, Google Business Profile link | seo-agent | SEO-ready site |
| 8. QA | Mobile, speed (Lighthouse 90+), accessibility, forms | qa-accessibility-tester | Test report |
| 9. Launch | Connect domain drgyanshomeopathy.com, GA4, Search Console | Vercel | Live site |
| 10. Ongoing | 2 blog posts/month, add diseases, review pages yearly | Agents + doctor | Fresh content |

---

## 14. Launch Checklist

- [ ] All pages responsive (320px → 1440px)
- [ ] Bonsai decoration doesn't cover text on mobile
- [ ] Search finds diseases and blog posts
- [ ] Click-to-call and WhatsApp work on phones
- [ ] Forms deliver to care@drgyanshomeopathy.com
- [ ] Every disease/blog page: disclaimer, sources, doctor-reviewed date
- [ ] No cure-guarantee or comparative-attack wording
- [ ] Image licences recorded; alt text everywhere
- [ ] Lighthouse: Performance, Accessibility, SEO ≥ 90
- [ ] Sitemap submitted; Google Business Profile updated with website link
- [ ] Privacy Policy & Disclaimer pages live
- [ ] Social links updated (Facebook, X, LinkedIn)
