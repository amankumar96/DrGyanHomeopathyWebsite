import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllDiseases, getDiseaseBySlug } from "@/lib/content";
import Disclaimer from "@/components/Disclaimer";
import DiseaseCard from "@/components/DiseaseCard";

export function generateStaticParams() {
  return getAllDiseases().map((disease) => ({ slug: disease.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const disease = getDiseaseBySlug(slug);
  if (!disease) return {};
  return {
    title: disease.seoTitle,
    description: disease.seoDescription,
  };
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

export default async function DiseaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const disease = getDiseaseBySlug(slug);
  if (!disease) notFound();

  const allDiseases = getAllDiseases();
  const related = disease.related
    .map((relatedSlug) => allDiseases.find((d) => d.slug === relatedSlug))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 md:px-6">
      <nav aria-label="Breadcrumb" className="text-sm text-ink/60">
        <Link href="/" className="hover:text-forest-600">
          Home
        </Link>{" "}
        &gt;{" "}
        <Link href="/diseases" className="hover:text-forest-600">
          Diseases
        </Link>{" "}
        &gt; <span className="text-ink">{disease.title}</span>
      </nav>

      <h1 className="mt-4 font-heading text-3xl font-semibold text-forest-800 md:text-4xl">
        {disease.title}
      </h1>

      <div className="mt-4 flex flex-wrap gap-3 rounded-2xl border border-leaf-200 bg-leaf-100/80 p-4 text-sm text-forest-800">
        <span>
          <strong>Category:</strong> {disease.category}
        </span>
        <span>
          <strong>Last reviewed:</strong> {disease.lastReviewed}
        </span>
        <span>
          <strong>Reviewed by:</strong> {disease.reviewedBy}
        </span>
      </div>

      <div className="prose-none mt-6">
        <MDXRemote source={disease.content} components={mdxComponents} />
      </div>

      {disease.faqs?.length > 0 && (
        <div className="mt-10">
          <h2 className="font-heading text-2xl font-semibold text-forest-800">FAQs</h2>
          <dl className="mt-4 space-y-4">
            {disease.faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-leaf-200 bg-white p-4">
                <dt className="font-semibold text-forest-800">{faq.q}</dt>
                <dd className="mt-1 text-sm text-ink/80">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className="mt-10">
        <Disclaimer />
      </div>

      {disease.sources?.length > 0 && (
        <div className="mt-6 text-xs text-ink/60">
          <p className="font-semibold">Sources:</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            {disease.sources.map((source) => (
              <li key={source}>
                <a href={source} target="_blank" rel="noopener noreferrer" className="underline">
                  {source}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link
        href="/contact"
        className="mt-8 inline-block rounded-full bg-forest-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-800"
      >
        Book a Consultation
      </Link>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="font-heading text-xl font-semibold text-forest-800">Related Conditions</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <DiseaseCard key={r.slug} disease={r} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
