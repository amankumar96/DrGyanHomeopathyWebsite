import { Suspense } from "react";
import { getSearchIndex } from "@/lib/content";
import SearchClient from "@/components/SearchClient";

export const metadata = {
  title: "Search | Dr. Gyan's Homeopathy",
  description: "Search conditions treated and the latest news from Dr. Gyan's Homeopathy.",
};

export default function SearchPage() {
  const index = getSearchIndex();

  return (
    <section className="mx-auto max-w-2xl px-4 py-14 md:px-6">
      <h1 className="font-heading text-3xl font-semibold text-forest-800">Search</h1>
      <p className="mt-3 text-ink/80">
        Find a condition we treat or a recent article by name or symptom.
      </p>

      <div className="mt-8">
        <Suspense fallback={null}>
          <SearchClient index={index} />
        </Suspense>
      </div>
    </section>
  );
}
