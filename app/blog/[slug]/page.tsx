import ComingSoon from "@/components/ComingSoon";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ComingSoon title={`Post: ${slug}`} />;
}
