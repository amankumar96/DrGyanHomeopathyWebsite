import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";

/**
 * MDX content loader — the only place in the app that touches the filesystem
 * for content. Pages call these getters, never `fs` directly (see
 * ARCHITECTURE.md "Content pipeline"). Frontmatter shape matches guide §6.
 */

const DISEASES_DIR = path.join(process.cwd(), "content/diseases");
const BLOG_DIR = path.join(process.cwd(), "content/blog");

const IMAGE_EXTENSIONS = new Set([".webp", ".jpg", ".jpeg", ".png"]);

/**
 * Each disease has its own folder (public/images/diseases/<slug>/) — drop
 * any image file in there, any filename, and it's picked up automatically;
 * no renaming to match the slug required. If more than one image is
 * present, the alphabetically-first one wins.
 *
 * The path is built inline (not passed through a shared helper with a `dir`
 * parameter) so Turbopack can statically trace it to this one subfolder —
 * passing a dynamic directory made it conservatively bundle all of
 * `public/` into the server output.
 *
 * Blog posts deliberately don't have an equivalent — Latest News cards are
 * text-only by design, no image slot.
 */
function resolveDiseaseImage(slug: string): string | null {
  const dir = path.join(process.cwd(), "public/images/diseases", slug);
  if (!fs.existsSync(dir)) return null;
  const file = fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort()[0];
  return file ? `/images/diseases/${slug}/${file}` : null;
}

export type Faq = {
  q: string;
  a: string;
};

export type DiseaseFrontmatter = {
  title: string;
  slug: string;
  category: string;
  summary: string;
  image: string;
  imageAlt: string;
  seoTitle: string;
  seoDescription: string;
  lastReviewed: string;
  reviewedBy: string;
  sources: string[];
  related: string[];
  faqs: Faq[];
};

export type Disease = DiseaseFrontmatter & {
  content: string;
  /** Public URL if an uploaded image exists for this slug, else null (render a placeholder). */
  resolvedImage: string | null;
};

export type BlogFrontmatter = {
  title: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  sources: string[];
  reviewedBy: string;
};

export type BlogPost = BlogFrontmatter & {
  content: string;
};

function readMdxDir<T>(dir: string): Array<T & { content: string }> {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return { ...(data as T), content };
    });
}

/** Wrapped in React's cache() so the 163 MDX files are read from disk once
 * per render pass, not once per caller — getDiseaseBySlug, getDiseaseCategoryMenu,
 * getDiseaseSearchIndex, and getSearchIndex all call this independently, and
 * without this a single disease page build could re-read the whole content
 * directory 4-5 times. See Documents/disease-page-caching-and-domain-plan.md. */
export const getAllDiseases = cache((): Disease[] => {
  return readMdxDir<DiseaseFrontmatter>(DISEASES_DIR)
    .map((disease) => ({
      ...disease,
      resolvedImage: resolveDiseaseImage(disease.slug),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
});

export function getDiseaseBySlug(slug: string): Disease | undefined {
  return getAllDiseases().find((disease) => disease.slug === slug);
}

export type CategoryMergeGroup = {
  /** Display name shown in the nav menu and /diseases pills. */
  name: string;
  /** Raw `Disease.category` values (as written in MDX frontmatter) folded
   * into this group. Most entries are 1:1 passthroughs; a few combine two
   * related raw categories (e.g. Skin + Hair) into one display category. */
  sourceCategories: string[];
};

/** Maps the 16 raw disease categories onto 13 user-facing display
 * categories for the nav mega-menu and /diseases filter pills. Edit this
 * array (not the MDX files) to change the menu's taxonomy — see
 * components/Header.tsx and app/diseases/page.tsx, both of which build
 * `?category=<sourceCategories joined by comma>` links from it. */
export const CATEGORY_MERGE_GROUPS: CategoryMergeGroup[] = [
  { name: "Skin & Hair", sourceCategories: ["Skin", "Hair"] },
  {
    name: "Brain, Neurological & Mental Wellness",
    sourceCategories: ["Neurological", "Mental Wellness"],
  },
  { name: "Eye & Ear Care", sourceCategories: ["Eye Care", "Ear Care"] },
  { name: "Digestive", sourceCategories: ["Digestive"] },
  { name: "Respiratory", sourceCategories: ["Respiratory"] },
  { name: "Joints & Muscles", sourceCategories: ["Joints"] },
  { name: "Heart & Circulation", sourceCategories: ["Heart & Circulation"] },
  { name: "Endocrine", sourceCategories: ["Endocrine"] },
  { name: "Kidney & Urinary", sourceCategories: ["Kidney & Urinary"] },
  { name: "Women's Health", sourceCategories: ["Women's Health"] },
  { name: "Men's Health", sourceCategories: ["Men's Health"] },
  { name: "Child Health", sourceCategories: ["Child Health"] },
  { name: "General Health", sourceCategories: ["General Health"] },
];

export type DiseaseCategoryMenuItem = {
  name: string;
  /** Raw categories folded into this entry — needed to build the
   * comma-separated `?category=` link for merged groups (never link using
   * `name`, which is a display label, not a real `Disease.category` value). */
  sourceCategories: string[];
  /** Capped, alphabetical (re-sorted after combining source categories). */
  diseases: { slug: string; title: string }[];
  /** Full count in this category, for "View all X (N)" links. */
  totalCount: number;
};

const DISEASE_MENU_CAP = 6;

/** Diseases grouped by merged display category for the nav mega-menu:
 * capped per category and ordered by total size, most content first — a
 * simple, non-medical-claim ordering. See components/Header.tsx. */
export function getDiseaseCategoryMenu(): DiseaseCategoryMenuItem[] {
  const byCategory: Record<string, { slug: string; title: string }[]> = {};
  for (const disease of getAllDiseases()) {
    byCategory[disease.category] ??= [];
    byCategory[disease.category].push({ slug: disease.slug, title: disease.title });
  }

  return CATEGORY_MERGE_GROUPS.map((group) => {
    // Re-sort after combining — concatenating two already-sorted lists
    // (e.g. Skin + Hair) does not stay alphabetically sorted.
    const combined = group.sourceCategories
      .flatMap((raw) => byCategory[raw] ?? [])
      .sort((a, b) => a.title.localeCompare(b.title));
    return {
      name: group.name,
      sourceCategories: group.sourceCategories,
      totalCount: combined.length,
      diseases: combined.slice(0, DISEASE_MENU_CAP),
    };
  }).sort((a, b) => b.totalCount - a.totalCount);
}

export type DiseaseSearchIndexItem = { slug: string; title: string; category: string };

/** Lightweight disease-only index for the nav dropdown's live search box —
 * distinct from getSearchIndex() below (used by /search), which folds in
 * full MDX body text and is too heavy to ship into the global layout
 * bundle that every page pays for via app/layout.tsx. */
export function getDiseaseSearchIndex(): DiseaseSearchIndexItem[] {
  return getAllDiseases().map((d) => ({ slug: d.slug, title: d.title, category: d.category }));
}

/** Same cache() treatment as getAllDiseases() — see note there. */
export const getAllBlogPosts = cache((): BlogPost[] => {
  return readMdxDir<BlogFrontmatter>(BLOG_DIR).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
});

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((post) => post.slug === slug);
}

export type SearchItem = {
  type: "disease" | "blog";
  slug: string;
  title: string;
  description: string;
  category: string;
  /** Full body text folded in so matches on symptoms etc. (not just the
   * title/summary) still surface — see guide §18 ("Search: disease names,
   * symptoms, blog titles"). */
  searchText: string;
};

/** Combined client-searchable index of every disease + blog post. Built
 * server-side (has filesystem access via the getters above) and passed as
 * a prop into the search page's client component — see app/search/page.tsx. */
export function getSearchIndex(): SearchItem[] {
  const diseases: SearchItem[] = getAllDiseases().map((d) => ({
    type: "disease",
    slug: d.slug,
    title: d.title,
    description: d.summary,
    category: d.category,
    searchText: `${d.title} ${d.summary} ${d.category} ${d.content}`,
  }));
  const posts: SearchItem[] = getAllBlogPosts().map((p) => ({
    type: "blog",
    slug: p.slug,
    title: p.title,
    description: p.excerpt,
    category: p.category,
    searchText: `${p.title} ${p.excerpt} ${p.category} ${p.tags.join(" ")} ${p.content}`,
  }));
  return [...diseases, ...posts];
}
