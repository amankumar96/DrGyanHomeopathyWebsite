# Disease images

Drop an image file here named exactly after the disease's `slug` (the slug is
the filename in `content/diseases/`, without `.mdx`). Any of `.webp`, `.jpg`,
`.jpeg`, `.png` works — no code or frontmatter change needed. The site checks
for a matching file at build/request time; if found, it replaces the
placeholder on both the Diseases grid card and the disease detail page
automatically.

Example: for `content/diseases/psoriasis.mdx`, add `psoriasis.webp` (or
`.jpg`/`.png`) right here and it appears on the site on the next page load —
no restart needed in dev, picked up on the next build in production.

Current slugs waiting for an image:

- abscess-boils
- acanthosis-nigricans
- acne
- acne-rosacea
- acromegaly
- addisons-disease
- adenoids
- adhd
- allergic-rhinitis
- allergy
- alopecia-areata
- alzheimers
- appendicitis
- gastritis-acidity
- psoriasis

Prefer `.webp`, lazy-loaded automatically by `next/image`. Per guide §21, use
soft lifestyle/illustrative images rather than graphic clinical photos where
possible, and record each image's license/source in
`public/images/credits.md`.
