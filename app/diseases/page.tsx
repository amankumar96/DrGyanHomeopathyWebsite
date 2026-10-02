import Link from "next/link";
import { getAllDiseases } from "@/lib/content";
import DiseaseCard from "@/components/DiseaseCard";

export const metadata = {
  title: "Conditions We Treat | Dr. Gyan's Homeopathy",
  description:
    "Browse the conditions Dr. Gyan's Homeopathy treats, from skin and respiratory health to women's and child health.",
};

export default async function DiseasesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: activeCategory } = await searchParams;
  const diseases = getAllDiseases();
  const categories = Array.from(new Set(diseases.map((d) => d.category))).sort();
  const filtered = activeCategory
    ? diseases.filter((d) => d.category === activeCategory)
    : diseases;

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <h1 className="font-heading text-3xl font-semibold text-forest-800">Conditions We Treat</h1>
      <p className="mt-3 max-w-2xl text-ink/80">
        Dr. Gyanesh Sharma offers individualised homeopathic consultations for a wide range of
        conditions. Browse by category below, or read a specific condition to learn how
        homeopathy approaches it.
      </p>

      {diseases.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-leaf-200 bg-leaf-100/80 p-6 text-sm text-ink/70">
          Condition pages are being added. Check back soon, or{" "}
          <Link href="/contact" className="font-semibold text-forest-600">
            contact the clinic
          </Link>{" "}
          directly with your question.
        </p>
      ) : (
        <>
          {categories.length > 1 && (
            <div className="mt-8 flex flex-wrap gap-2">
              <Link
                href="/diseases"
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
                  href={`/diseases?category=${encodeURIComponent(category)}`}
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

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((disease) => (
              <DiseaseCard key={disease.slug} disease={disease} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
