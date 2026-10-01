# Disease images

Each disease has its own folder here, named after its `slug` (the slug is the
filename in `content/diseases/`, without `.mdx`). Drop an image file straight
into the matching folder — any filename, any of `.webp`/`.jpg`/`.jpeg`/`.png`
— and it replaces the placeholder on both the Diseases grid card and the
disease detail page automatically. No renaming, no frontmatter or code
change needed.

Example: for `content/diseases/psoriasis.mdx`, drag an image into
`public/images/diseases/psoriasis/` and it appears on the site on the next
page load (dev) or next build (production).

If a folder somehow ends up with more than one image, the
alphabetically-first filename wins — keep one image per folder to avoid
surprises.

Folders ready for an image (all currently empty, waiting):

- abscess-boils/
- acanthosis-nigricans/
- acne/
- acne-rosacea/
- acromegaly/
- addisons-disease/
- adenoids/
- adhd/
- allergic-rhinitis/
- allergy/
- alopecia-areata/
- alzheimers/
- appendicitis/
- gastritis-acidity/
- psoriasis/

Prefer `.webp`, lazy-loaded automatically by `next/image`. Per guide §21, use
soft lifestyle/illustrative images rather than graphic clinical photos where
possible, and record each image's license/source in
`public/images/credits.md`.
