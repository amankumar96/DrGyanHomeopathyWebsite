import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/content";
import BlogCard from "@/components/BlogCard";

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Dr Gyan Homeopathy`,
    description: post.excerpt,
  };
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="mt-10 font-heading text-2xl font-semibold text-forest-800" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="mt-6 font-heading text-xl font-semibold text-forest-800" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => <p className="mt-4 text-ink/85" {...props} />,
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-ink/85" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => <li {...props} />,
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold text-forest-800" {...props} />
  ),
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllBlogPosts();
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 md:px-6">
      <nav aria-label="Breadcrumb" className="text-sm text-ink/60">
        <Link href="/" className="hover:text-forest-600">
          Home
        </Link>{" "}
        &gt;{" "}
        <Link href="/blog" className="hover:text-forest-600">
          Latest News
        </Link>{" "}
        &gt; <span className="text-ink">{post.title}</span>
      </nav>

      <span className="mt-4 inline-block w-fit rounded-full bg-leaf-100 px-3 py-1 text-xs font-medium text-forest-800">
        {post.category}
      </span>
      <h1 className="mt-3 font-heading text-3xl font-semibold text-forest-800 md:text-4xl">
        {post.title}
      </h1>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink/60">
        <span>By {post.author}</span>
        <span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </span>
        <span>{readingTime(post.content)} min read</span>
        {post.reviewedBy && <span>Reviewed by {post.reviewedBy}</span>}
      </div>

      <div className="mt-6">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>

      {post.sources?.length > 0 && (
        <div className="mt-10 text-xs text-ink/60">
          <p className="font-semibold">Sources:</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            {post.sources.map((source) => (
              <li key={source}>
                <a href={source} target="_blank" rel="noopener noreferrer" className="underline">
                  {source}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href="/contact"
          className="rounded-full bg-forest-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-800"
        >
          Book a Consultation
        </Link>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(post.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-forest-600 px-6 py-3 text-sm font-semibold text-forest-600 transition-colors hover:bg-leaf-100"
        >
          Share on WhatsApp
        </a>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="font-heading text-xl font-semibold text-forest-800">Related Posts</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
