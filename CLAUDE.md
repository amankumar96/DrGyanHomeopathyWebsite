# CLAUDE.md — Dr Gyan Homeopathy Website

Project rules for any agent or developer (human or AI) working in this repo.
Full build guide: `dr-gyan-homeopathy-website-guide.md` at the repo root (if present) —
this file is the condensed, load-bearing subset: facts and rules that must not drift.

## Clinic facts

- Clinic: Dr Gyan Homeopathy — Tagline: "Treatment for Everyone"
- Doctor: Dr. Gyanesh Sharma, BHMS (National Homeopathic Medical College, Lucknow, UP)
- Practising since 2003 (Lucknow, now Vaishali, Ghaziabad)
- Address: Shop No. 9, 1st Floor, Kshitij Complex, Sector 4, Vaishali, Ghaziabad, UP 201010
- Email: care@drgyanshomeopathy.com — Phone: +91 98711 90713
- Social: Facebook, X (Twitter), LinkedIn

## Design tokens ("Healing Forest")

Defined once in `app/globals.css` under `:root` / `@theme inline`. Never hardcode hex
values in a component — use the Tailwind utilities these generate (`bg-leaf-50`,
`text-forest-800`, `font-heading`, `font-body`, etc.).

| Token | Hex | Use |
|---|---|---|
| leaf-50 | #F3FAF0 | page background |
| leaf-100 | #E4F3DC | alternate section bg, cards |
| leaf-200 | #C8E6B8 | borders, dividers |
| leaf-400 | #7CBF5E | icons, accents |
| forest-600 | #2F7D32 | primary buttons, links |
| forest-800 | #1E4D2B | headings, header/footer bg |
| bark-700 | #5B4636 | bonsai trunk details |
| sunlight | #F6C453 | badges — use sparingly |
| ink | #1F2A24 | body text |

Fonts: `font-heading` (Fraunces) for headings, `font-body` (Inter) for body text.
Keep text contrast at WCAG AA (4.5:1).

## Disease page template (guide §5.4)

Breadcrumb → hero image + quick facts → What is it? → Symptoms → Causes/Risk factors →
How homeopathy approaches it → What remedies are based on → Homeopathy and conventional
treatment → Lifestyle tips → When to see a doctor urgently → FAQs → Disclaimer →
Book-a-consultation CTA → Related diseases/blog posts.

## Medical content guardrails — non-negotiable

1. Frame comparisons as "Homeopathy and Conventional Treatment", never "why homeopathy is
   better than allopathy." No attacking other systems of medicine.
2. No cure guarantees. Use "may help manage", "aims to", "patients often seek homeopathy for".
3. Never advise stopping prescribed medicine. Add: "Continue your current treatment and
   consult your doctor before making changes."
4. Remedy names are never self-medication advice — no dosages; medicines are chosen after
   individual consultation.
5. Be honest about evidence in blog posts (study size, type, limitations). Never state or
   imply "studies show homeopathy is more effective than placebo" — our own research review
   (`content/blog/homeopathy-research-honest-look.mdx`) found the opposite: NHS, the UK
   Parliament Science and Technology Committee, and Australia's NHMRC all found no reliable
   evidence of an effect beyond placebo. This claim appeared in the old site's doctor bio and
   must not be reintroduced.
6. Every disease page needs a red-flag / "seek urgent care" section.
7. Avoid "best doctor" superlatives in our own copy — use "experienced".
8. Doctor sign-off required before any medical page goes live.
9. Every medical page carries the disclaimer (component: `components/Disclaimer.tsx`):
   > The information on this page is for general education and is not a substitute for
   > professional medical advice, diagnosis or treatment. Please consult a qualified doctor
   > about your health. Results vary from person to person.

## Commands

```bash
npm run dev     # local dev server
npm run build   # production build (must pass before merging)
npm run lint    # eslint
npm run start   # run a production build locally
```

## Workflow

- Every content or code change goes through a PR — no direct pushes to `main`.
- See `ARCHITECTURE.md` for how the codebase fits together and how to add a new page/feature.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
