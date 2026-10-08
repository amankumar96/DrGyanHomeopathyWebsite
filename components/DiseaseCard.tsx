import Image from "next/image";
import Link from "next/link";
import type { Disease } from "@/lib/content";

export default function DiseaseCard({
  disease,
}: {
  disease: Pick<Disease, "slug" | "title" | "summary" | "category" | "imageAlt" | "resolvedImages">;
}) {
  const thumbnail = disease.resolvedImages[0] ?? null;
  return (
    <Link
      href={`/diseases/${disease.slug}`}
      className="flex flex-col overflow-hidden rounded-2xl border border-leaf-200 bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full bg-leaf-200/60">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={disease.imageAlt}
            fill
            className="object-cover"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-center text-xs text-forest-800/50">
            Image coming soon
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="w-fit rounded-full bg-leaf-100 px-3 py-1 text-xs font-medium text-forest-800">
          {disease.category}
        </span>
        <h3 className="mt-3 font-heading text-lg font-semibold text-forest-800">{disease.title}</h3>
        <p className="mt-2 flex-1 text-sm text-ink/70">{disease.summary}</p>
        <span className="mt-4 text-sm font-semibold text-forest-600">Learn more →</span>
      </div>
    </Link>
  );
}
