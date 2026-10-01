import ComingSoon from "@/components/ComingSoon";

export default async function DiseaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ComingSoon title={`Disease: ${slug}`} />;
}
