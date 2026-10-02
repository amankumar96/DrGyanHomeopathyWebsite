import Link from "next/link";
import type { BlogPost } from "@/lib/content";

export default function BlogCard({
  post,
}: {
  post: Pick<BlogPost, "slug" | "title" | "excerpt" | "category" | "date">;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex flex-col rounded-2xl border border-leaf-200 bg-white p-5 transition-shadow hover:shadow-md"
    >
      <div className="flex items-center gap-3 text-xs text-ink/60">
        <span className="rounded-full bg-leaf-100 px-3 py-1 font-medium text-forest-800">
          {post.category}
        </span>
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </div>
      <h3 className="mt-3 font-heading text-lg font-semibold text-forest-800">{post.title}</h3>
      <p className="mt-2 flex-1 text-sm text-ink/70">{post.excerpt}</p>
      <span className="mt-4 text-sm font-semibold text-forest-600">Read more →</span>
    </Link>
  );
}
