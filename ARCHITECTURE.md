# Architecture

This doc is for a developer picking up this codebase cold. It explains how a request
flows through the app today, where things live, and how the parts still to be built
(content pipeline, agents) will plug in. For *what* to build next and in what order, see
`dr-gyan-homeopathy-website-guide.md`. For brand/content rules, see `CLAUDE.md`.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS v4. No `tailwind.config.ts` — Tailwind v4
is configured in CSS directly (see "Design tokens" below), which is why you won't find a
config file for it.

## Request lifecycle

1. A URL hits a folder under `app/` (file-based routing). E.g. `/diseases/psoriasis` →
   `app/diseases/[slug]/page.tsx`, with `slug = "psoriasis"` passed into `params`.
2. Every route is wrapped by `app/layout.tsx` — this is where fonts (`next/font/google`,
   Fraunces + Inter) are loaded once and exposed as CSS variables, and where the global
   `Header` and `Footer` are rendered so every page gets them for free. A page component
   only needs to render its own content, not chrome.
3. The page composes components from `components/` and (eventually) renders content loaded
   from `content/`.

## Design tokens

Single source of truth: `app/globals.css`. The `:root` block defines the raw hex values
from the "Healing Forest" palette; the `@theme inline` block maps them to Tailwind color
names (`leaf-50`, `forest-800`, etc.) and to the heading/body font variables. To change the
theme, edit this file only — never hardcode a hex value or a `font-family` in a component.

## Components vs. pages

- `app/**/page.tsx` — route-level composition only. Keep these thin.
- `components/*.tsx` — reusable UI. `Header`, `Footer`, `Hero`, `Disclaimer`, `ComingSoon`
  exist today. Still to be built (next milestones): `DiseaseCard`, `BlogCard`,
  `AppointmentForm`, `SearchBar`, `Breadcrumbs`, `TestimonialCard` — add them here, not
  inline in a page, since disease/blog listing and detail pages will reuse them.

## Content pipeline (not yet built)

`content/diseases/*.mdx` and `content/blog/*.mdx` will hold one file per disease/post,
frontmatter format defined in guide §6. The plan is a `lib/content.ts` module that reads
and parses these files at build time (e.g. with `gray-matter` + `next-mdx-remote` or
`@next/mdx`) and exposes typed getters (`getAllDiseases()`, `getDiseaseBySlug(slug)`,
`getAllPosts()`, etc.) — pages call these getters, they never read the filesystem directly.
This keeps the data-access pattern in one place so swapping the content source later (e.g.
a CMS) only touches `lib/content.ts`.

`research/` holds raw agent research briefs (markdown) that feed the content-writer agent —
it is never read by the site itself, only by the content pipeline's authors/agents.

## Agents & skills (not yet built)

Guide §7 and §10 define seven Claude Code subagents (research → write → compliance-review →
SEO → build → QA) living in `.claude/agents/`, plus custom skills in `.claude/skills/`
(`disease-page`, `blog-post`, `brand-voice`). These are introduced once the content pipeline
above exists, because the agents' whole job is to produce and review files in `content/` —
there's nothing for them to operate on before that. When added, the per-disease pipeline is:
`disease-researcher → disease-content-writer → medical-compliance-reviewer → seo-agent →
doctor review (PR) → merge`.

## How to add a new disease page (future walkthrough)

This section will be filled in once `lib/content.ts` and the disease detail template exist.
For now: a new disease is **not** a new route — `app/diseases/[slug]/page.tsx` already
handles every slug dynamically. Adding a disease will mean adding one MDX file to
`content/diseases/`, nothing else.

## Current milestone boundary

What exists right now: project scaffold, design tokens, root layout, Header/Footer/Hero,
a placeholder Home page, and "coming soon" stubs for every other route — enough that
navigation and the visual theme are real, but no disease/blog content, forms, search,
SEO schema, or agents yet. See the guide's §13 phase table for what's next.
