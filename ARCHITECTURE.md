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
- `components/*.tsx` — reusable UI. `Header`, `Footer`, `Hero`, `Disclaimer`, `ComingSoon`,
  `DiseaseCard` exist today. Still to be built: `BlogCard`, `AppointmentForm`, `SearchBar`,
  `Breadcrumbs`, `TestimonialCard` — add them here, not inline in a page, so listing and
  detail pages can reuse them.

## Content pipeline

`lib/content.ts` is the only place in the app that touches the filesystem for content. It
reads `content/diseases/*.mdx` / `content/blog/*.mdx` with `gray-matter` (frontmatter →
typed object) and exposes `getAllDiseases()`, `getDiseaseBySlug(slug)`, `getAllBlogPosts()`,
`getBlogPostBySlug(slug)`. Pages call these getters, never `fs` directly — if the content
source ever changes (e.g. a CMS), only `lib/content.ts` changes.

The MDX body (everything after frontmatter) is rendered with `next-mdx-remote/rsc`'s
`<MDXRemote>` in `app/diseases/[slug]/page.tsx`, which maps raw markdown elements (`h2`,
`p`, `ul`, etc.) to styled components inline in that file (`mdxComponents`). Frontmatter
fields that aren't part of the free-form body — `faqs`, `sources`, quick facts — are
rendered separately by the page itself, not through MDX.

`research/` holds raw agent research briefs (markdown) that feed the content-writer agent —
it is never read by the site itself, only by the content pipeline's authors/agents.

## Agents & skills (not yet built)

Guide §7 and §10 define seven Claude Code subagents (research → write → compliance-review →
SEO → build → QA) living in `.claude/agents/`, plus custom skills in `.claude/skills/`
(`disease-page`, `blog-post`, `brand-voice`). When added, the per-disease pipeline is:
`disease-researcher → disease-content-writer → medical-compliance-reviewer → seo-agent →
doctor review (PR) → merge`. Until then, disease content is written directly (still
following the same research-from-authoritative-sources and compliance rules in `CLAUDE.md`).

## How to add a new disease page

A new disease is **not** a new route — `app/diseases/[slug]/page.tsx` already handles every
slug dynamically via `generateStaticParams()`. Adding a disease means adding one MDX file to
`content/diseases/`, following the frontmatter schema in guide §6 (see any existing file
in that folder for a working example) and the 8-section body template in guide §5.4. The
category also needs to already exist or it becomes a new filter pill automatically on
`/diseases` — no code change needed either way. Every medical page must keep the red-flag
section, the `<Disclaimer />` (rendered automatically by the detail page, not something you
add to the MDX), and real `sources` URLs — see `CLAUDE.md` guardrails.

## Current milestone boundary

Built: project scaffold, design tokens, root layout, Header/Footer/Hero (using
`public/images/BG.png` as a full-page fixed background), the trust-strip icons, and the
Diseases section (content pipeline, list page with category filter, detail page template)
with a handful of real, sourced disease pages. Still stubs: About, Blog, Contact, Search —
no forms, no search implementation, no SEO schema, no agents/skills yet. See the guide's
§13 phase table for what's next.
