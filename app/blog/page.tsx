import Link from "next/link";
import { getAllBlogPosts } from "@/lib/content";
import BlogCard from "@/components/BlogCard";

export const metadata = {
  title: "Latest News | Dr. Gyan's Homeopathy",
  description:
    "Health tips, seasonal advice and clinic news from Dr. Gyan's Homeopathy, Vaishali, Ghaziabad.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: activeCategory } = await searchParams;
  const posts = getAllBlogPosts();
  const categories = Array.from(new Set(posts.map((p) => p.category))).sort();
  const filtered = activeCategory ? posts.filter((p) => p.category === activeCategory) : posts;
  const [featured, ...rest] = filtered;

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <h1 className="font-heading text-3xl font-semibold text-forest-800">Latest News</h1>
      <p className="mt-3 max-w-2xl text-ink/80">
        Health tips, seasonal advice and updates from Dr. Gyanesh Sharma and the clinic.
      </p>

      {posts.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-leaf-200 bg-leaf-100/80 p-6 text-sm text-ink/70">
          No posts yet. Check back soon.
        </p>
      ) : (
        <>
          {categories.length > 1 && (
            <div className="mt-8 flex flex-wrap gap-2">
              <Link
                href="/blog"
                className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                  !activeCategory
                    ? "bg-forest-600 text-white"
                    : "bg-leaf-100 text-forest-800 hover:bg-leaf-200"
                }`}
              >
                All
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/blog?category=${encodeURIComponent(category)}`}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                    activeCategory === category
                      ? "bg-forest-600 text-white"
                      : "bg-leaf-100 text-forest-800 hover:bg-leaf-200"
                  }`}
                >
                  {category}
                </Link>
              ))}
            </div>
          )}

          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="mt-8 flex flex-col gap-2 rounded-3xl border border-leaf-200 bg-leaf-100/80 p-6 transition-shadow hover:shadow-md md:p-8"
            >
              <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-medium text-forest-800">
                {featured.category}
              </span>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-forest-800">
                {featured.title}
              </h2>
              <p className="text-ink/80">{featured.excerpt}</p>
              <span className="mt-2 text-sm font-semibold text-forest-600">Read more →</span>
            </Link>
          )}

          {rest.length > 0 && (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
