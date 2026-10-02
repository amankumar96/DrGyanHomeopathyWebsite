"use client";

import { useRef } from "react";
import TestimonialCard from "./TestimonialCard";

type Testimonial = {
  name: string;
  rating: number;
  quote: string;
};

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction === "right" ? amount : -amount, behavior: "smooth" });
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => scroll("left")}
          aria-label="Previous review"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-leaf-200 bg-white text-forest-600 transition-colors hover:bg-leaf-100"
        >
          <Chevron direction="left" />
        </button>
        <button
          type="button"
          onClick={() => scroll("right")}
          aria-label="Next review"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-leaf-200 bg-white text-forest-600 transition-colors hover:bg-leaf-100"
        >
          <Chevron direction="right" />
        </button>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((t) => (
          <div key={t.name} data-card className="w-[280px] shrink-0 snap-start sm:w-[340px]">
            <TestimonialCard {...t} />
          </div>
        ))}
      </div>
    </div>
  );
}
