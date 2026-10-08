"use client";

import Fuse from "fuse.js";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { SearchItem } from "@/lib/content";

const TYPE_LABEL: Record<SearchItem["type"], string> = {
  disease: "Disease",
  blog: "Latest News",
};

const TYPE_HREF: Record<SearchItem["type"], (slug: string) => string> = {
  disease: (slug) => `/diseases/${slug}`,
  blog: (slug) => `/blog/${slug}`,
};

export default function SearchClient({ index }: { index: SearchItem[] }) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const fuse = useMemo(
    () =>
      new Fuse(index, {
        keys: [
          { name: "title", weight: 0.5 },
          { name: "description", weight: 0.25 },
          { name: "category", weight: 0.1 },
          { name: "searchText", weight: 0.15 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [index],
  );

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    return fuse.search(query).map((r) => r.item);
  }, [fuse, query]);

  // Keep the URL in sync so results are linkable/shareable, without spamming history.
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    const next = params.toString() ? `/search?${params}` : "/search";
    window.history.replaceState(null, "", next);
  }, [query]);

  return (
    <div>
      <input
        type="search"
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search conditions or articles, e.g. &quot;acne&quot; or &quot;sneezing&quot;"
        className="w-full rounded-full border border-leaf-200 bg-white px-6 py-3 text-base text-ink shadow-sm focus:border-forest-600 focus:outline-none focus:ring-1 focus:ring-forest-600"
      />

      {query.trim().length >= 2 && (
        <p className="mt-4 text-sm text-ink/60">
          {results.length === 0
            ? "No matches found."
            : `${results.length} result${results.length === 1 ? "" : "s"} for "${query}"`}
        </p>
      )}

      {results.length > 0 && (
        <ul className="mt-4 space-y-3">
          {results.map((item) => (
            <li key={`${item.type}-${item.slug}`}>
              <Link
                href={TYPE_HREF[item.type](item.slug)}
                className="block rounded-2xl border border-leaf-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-3 text-xs text-ink/60">
                  <span className="rounded-full bg-leaf-100 px-3 py-1 font-medium text-forest-800">
                    {TYPE_LABEL[item.type]}
                  </span>
                  <span>{item.category}</span>
                </div>
                <p className="mt-2 font-heading text-lg font-semibold text-forest-800">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-ink/70">{item.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {query.trim().length >= 2 && results.length === 0 && (
        <p className="mt-2 text-sm text-ink/60">
          Try a different word, or{" "}
          <Link href="/contact" className="font-semibold text-forest-600 hover:text-forest-800">
            contact the clinic
          </Link>{" "}
          directly with your question.
        </p>
      )}
    </div>
  );
}
