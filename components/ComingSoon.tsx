export default function ComingSoon({ title }: { title: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 text-center md:px-6">
      <h1 className="font-heading text-3xl font-semibold text-forest-800">{title}</h1>
      <p className="mt-3 text-ink/70">This page is part of a later milestone — coming soon.</p>
    </section>
  );
}
