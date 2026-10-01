import Link from "next/link";
import Hero from "@/components/Hero";

const TRUST_POINTS = [
  "Practising since 2005",
  "BHMS, Homeopathic Medical College, Lucknow",
  "Holistic, individualised consultations",
];

// TODO: replace with real disease list via DiseaseCard once content/diseases MDX exists
const CONDITION_PLACEHOLDERS = [
  "Skin Conditions",
  "Respiratory Health",
  "Digestive Health",
  "Joint & Mobility",
  "Women's Health",
  "Child Health",
];

const WHY_CHOOSE_US = [
  "Personalised, one-to-one consultation",
  "Holistic approach to care",
  "20+ years of clinical experience",
  "Convenient Vaishali, Ghaziabad location",
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Trust strip */}
      <section className="border-y border-leaf-200 bg-leaf-100">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-center text-sm font-medium text-forest-800 md:flex-row md:justify-center md:gap-10 md:px-6">
          {TRUST_POINTS.map((point) => (
            <span key={point}>{point}</span>
          ))}
        </div>
      </section>

      {/* About preview */}
      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="aspect-[4/3] w-full rounded-2xl bg-leaf-200/60" aria-hidden />
          <div>
            <h2 className="font-heading text-2xl font-semibold text-forest-800">
              About Dr. Gyanesh Sharma
            </h2>
            <p className="mt-3 text-ink/80">
              {/* TODO: real bio pending doctor-provided details (guide §5.2) */}
              Placeholder bio — Dr. Sharma has been practising homeopathy since 2005, starting in
              Lucknow and now serving patients in Vaishali, Ghaziabad.
            </p>
            <Link
              href="/about"
              className="mt-4 inline-block text-sm font-semibold text-forest-600 hover:text-forest-800"
            >
              Read More →
            </Link>
          </div>
        </div>
      </section>

      {/* Conditions we treat */}
      <section className="bg-leaf-100 py-14">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-heading text-2xl font-semibold text-forest-800">
            Conditions We Treat
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {CONDITION_PLACEHOLDERS.map((condition) => (
              <div
                key={condition}
                className="rounded-2xl border border-leaf-200 bg-white p-5 text-center text-sm font-medium text-ink"
              >
                {condition}
              </div>
            ))}
          </div>
          <Link
            href="/diseases"
            className="mt-6 inline-block text-sm font-semibold text-forest-600 hover:text-forest-800"
          >
            View all →
          </Link>
        </div>
      </section>

      {/* Why choose us */}
      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <h2 className="font-heading text-2xl font-semibold text-forest-800">Why Choose Us</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {WHY_CHOOSE_US.map((reason) => (
            <li
              key={reason}
              className="rounded-2xl border border-leaf-200 bg-leaf-50 p-4 text-sm text-ink"
            >
              {reason}
            </li>
          ))}
        </ul>
      </section>

      {/* Testimonials — placeholder until real, consented reviews are provided */}
      <section className="bg-leaf-100 py-14">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-heading text-2xl font-semibold text-forest-800">
            What Our Patients Say
          </h2>
          <div className="mt-6 rounded-2xl border border-leaf-200 bg-white p-6 text-sm text-ink/70">
            {/* TODO: replace with real testimonials (written consent required, guide §9) */}
            Patient testimonials will appear here once provided with written consent.
          </div>
        </div>
      </section>

      {/* Latest news */}
      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <h2 className="font-heading text-2xl font-semibold text-forest-800">Latest News</h2>
        <div className="mt-6 rounded-2xl border border-leaf-200 bg-leaf-50 p-6 text-sm text-ink/70">
          {/* TODO: replace with 3 latest BlogCards once content/blog MDX pipeline exists */}
          Blog posts coming soon.
        </div>
        <Link
          href="/blog"
          className="mt-4 inline-block text-sm font-semibold text-forest-600 hover:text-forest-800"
        >
          View all →
        </Link>
      </section>

      {/* Location & contact */}
      <section className="bg-leaf-100 py-14">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-heading text-2xl font-semibold text-forest-800">Visit the Clinic</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="aspect-video w-full rounded-2xl bg-leaf-200/60" aria-hidden>
              {/* TODO: Google Maps embed (guide §5.6) */}
            </div>
            <div className="text-sm text-ink">
              <p className="font-semibold">Shop No. 9, 1st Floor, Kshitij Complex,</p>
              <p>Sector 4, Vaishali, Ghaziabad, Uttar Pradesh 201010</p>
              <p className="mt-3">
                <a href="tel:+919871190713" className="font-semibold text-forest-600">
                  +91 98711 90713
                </a>
              </p>
              <p>
                <a href="mailto:care@drgyanshomeopathy.com" className="text-forest-600">
                  care@drgyanshomeopathy.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
