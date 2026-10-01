import Link from "next/link";
import type { Disease } from "@/lib/content";

export default function DiseaseCard({ disease }: { disease: Pick<Disease, "slug" | "title" | "summary" | "category"> }) {
  return (
    <Link
      href={`/diseases/${disease.slug}`}
      className="flex flex-col rounded-2xl border border-leaf-200 bg-white p-5 transition-shadow hover:shadow-md"
    >
      <span className="w-fit rounded-full bg-leaf-100 px-3 py-1 text-xs font-medium text-forest-800">
        {disease.category}
      </span>
      <h3 className="mt-3 font-heading text-lg font-semibold text-forest-800">{disease.title}</h3>
      <p className="mt-2 flex-1 text-sm text-ink/70">{disease.summary}</p>
      <span className="mt-4 text-sm font-semibold text-forest-600">Learn more →</span>
    </Link>
  );
}
