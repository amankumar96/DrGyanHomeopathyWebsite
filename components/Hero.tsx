import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Full-strength botanical frame, scoped to the hero only. The site-wide
          PageBackground (app/layout.tsx) stays deliberately subtle so it never
          competes with body text elsewhere — see that component's comment. */}
      <Image
        src="/images/hero-bg-minimal.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="relative max-w-xl">
          <h1 className="font-heading text-3xl font-semibold text-forest-800 md:text-5xl">
            Gentle, Personalised Homeopathic Care in Vaishali
          </h1>
          <p className="mt-4 text-base text-ink/80 md:text-lg">
            Treatment for Everyone — Dr. Gyanesh Sharma, BHMS, practising since 2003.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-forest-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-800"
            >
              Book Appointment
            </Link>
            <a
              href="tel:+919871190713"
              className="rounded-full border border-forest-600 px-6 py-3 text-sm font-semibold text-forest-600 transition-colors hover:bg-leaf-100"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
