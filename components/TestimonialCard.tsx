function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill={filled ? "var(--sunlight)" : "none"}
      stroke={filled ? "var(--sunlight)" : "currentColor"}
      strokeWidth={filled ? 0 : 1}
      aria-hidden="true"
    >
      <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L10 1.5z" />
    </svg>
  );
}

export default function TestimonialCard({
  name,
  rating,
  quote,
}: {
  name: string;
  rating: number;
  quote: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-leaf-200 bg-white p-5">
      <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} filled={i < rating} />
        ))}
      </div>
      <p className="mt-3 flex-1 text-sm text-ink/80">&ldquo;{quote}&rdquo;</p>
      <p className="mt-4 text-sm font-semibold text-forest-800">{name}</p>
    </div>
  );
}
