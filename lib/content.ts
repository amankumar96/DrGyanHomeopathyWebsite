import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

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

export function getAllDiseases(): Disease[] {
  return readMdxDir<DiseaseFrontmatter>(DISEASES_DIR)
    .map((disease) => ({
      ...disease,
      resolvedImage: resolveDiseaseImage(disease.slug),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getDiseaseBySlug(slug: string): Disease | undefined {
  return getAllDiseases().find((disease) => disease.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return readMdxDir<BlogFrontmatter>(BLOG_DIR).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

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
