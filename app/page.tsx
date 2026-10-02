import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import DiseaseCard from "@/components/DiseaseCard";
import BlogCard from "@/components/BlogCard";
import TestimonialCard from "@/components/TestimonialCard";
import { getAllDiseases, getAllBlogPosts } from "@/lib/content";

const TRUST_POINTS = [
  {
    icon: "/images/icons/experience-icon.png",
    primary: "Practising since 2003",
    secondary: "Years of trusted care",
  },
  {
    icon: "/images/icons/qualification-icon.png",
    primary: "BHMS, National Homeopathic Medical College, Lucknow",
    secondary: "Qualified & experienced",
  },
  {
    icon: "/images/icons/holistic-care-icon.png",
    primary: "Holistic, individualised consultations",
    secondary: "Care for the whole you",
  },
];

// Real patient reviews, published verbatim as provided — not edited, since
// altering a patient's own words would misrepresent what they actually said.
// Flagged separately for a compliance/legal review before launch: several
// contain specific efficacy claims ("90% cured", "100% relief") that carry
// real regulatory risk under India's Drugs and Magic Remedies Act regardless
// of whose words they are — publishing them is what counts as advertising.
const TESTIMONIALS = [
  {
    name: "Vikas Gupta",
    rating: 5,
    quote:
      "I am truly grateful to Dr. Gyan. After struggling with a digestion problem for four and a half months, I am finally feeling good again. The doctor took the time to truly listen to my concerns and explained everything so clearly. I highly appreciate their expertise and the care they showed throughout my treatment.",
  },
  {
    name: "Somiya Sharma",
    rating: 5,
    quote:
      "I have acne on my face since many years and tried allopathic and ayurvedic medicines but only slight relief. I also tried homeopathy doctor near me but no relief at all. Then I came across Dr Gyan Homeopathy. For first time I realised that I consulted at right place cos he listen my problem patiently and diagnosed the root cause. I got much relief in 2 months of medication. Highly recommended.",
  },
  {
    name: "Anil Harnal",
    rating: 5,
    quote:
      "I have taken treatment for arthritis and thigh pain at Dr Gyan Homeopathy from which I am suffering from many years. Dr Gyan diagnosed my disease accurately and given medicines. I have taken medicines for 8 months and now I am 90% cured and freely walk. Dr Gyan good Homeopathy doctor near me.",
  },
  {
    name: "Rakesh Sharma",
    rating: 5,
    quote:
      "I had taken medicines for moles from many places for 2 years, but there was no effect. Then I came to know about Dr. Gyan. I took medicine from him, and as soon as I started taking it, I saw a significant improvement, and all my moles were cured. This is my personal experience. Dr. Gyan is a very good doctor.",
  },
  {
    name: "Rajesh Sadh",
    rating: 5,
    quote:
      "I have migraine since childhood and taken various medications including allopathy, ayurvedic and even homeopathy but i got slight relief during medication. Then i came to know about Dr Gyan and within one month of treatment by Dr Gyan i got 80% relief in my migraine and now after 8 month i got 100% relief.",
  },
];

const WHY_CHOOSE_US = [
  "Personalised, one-to-one consultation",
  "Holistic approach to care",
  "20+ years of clinical experience",
  "Convenient Vaishali, Ghaziabad location",
];

export default function Home() {
  const diseases = getAllDiseases().slice(0, 6);
  const posts = getAllBlogPosts().slice(0, 3);

  return (
    <>
      <Hero />

      {/* Trust strip — one continuous banner, not separate cards */}
      <section className="px-4 py-6 md:px-6">
        <div className="mx-auto max-w-6xl rounded-3xl bg-leaf-50 px-6 py-2 md:px-10">
          <div className="flex flex-col divide-y divide-[#D6E8CF]/60 md:flex-row md:items-center md:justify-center md:divide-x md:divide-y-0">
            {TRUST_POINTS.map(({ icon, primary, secondary }) => (
              <div
                key={primary}
                className="flex items-center gap-4 py-4 md:px-10 md:py-6 md:first:pl-0 md:last:pr-0"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EAF5E5]">
                  <Image
                    src={icon}
                    alt=""
                    width={36}
                    height={36}
                    className="h-9 w-9 object-contain"
                  />
                </span>
                <div className="text-left">
                  <p className="text-base font-semibold text-forest-800 md:text-lg">{primary}</p>
                  <p className="mt-0.5 text-sm text-ink/60">{secondary}</p>
                </div>
              </div>
            ))}
          </div>
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
              Dr. Gyanesh Sharma is an experienced homeopathic doctor practising since 2003. He
              began his journey in Lucknow and now runs his clinic in Vaishali, Ghaziabad. Dr.
              Sharma is a BHMS graduate from National Homeopathic Medical College, Lucknow, UP,
              with a focus on children&apos;s health, hair and skin conditions, and
              lifestyle-related concerns.
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
      <section className="px-4 py-14 md:px-6">
        <div className="mx-auto max-w-6xl rounded-3xl bg-leaf-100/80 p-6 md:p-10">
          <h2 className="font-heading text-2xl font-semibold text-forest-800">
            Conditions We Treat
          </h2>
          {diseases.length === 0 ? (
            <p className="mt-6 text-sm text-ink/70">Condition pages are being added.</p>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {diseases.map((disease) => (
                <DiseaseCard key={disease.slug} disease={disease} />
              ))}
            </div>
          )}
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

      {/* Testimonials */}
      <section className="px-4 py-14 md:px-6">
        <div className="mx-auto max-w-6xl rounded-3xl bg-leaf-100/80 p-6 md:p-10">
          <h2 className="font-heading text-2xl font-semibold text-forest-800">
            What Our Patients Say
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest news */}
      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <h2 className="font-heading text-2xl font-semibold text-forest-800">Latest News</h2>
        {posts.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-leaf-200 bg-leaf-50 p-6 text-sm text-ink/70">
            Blog posts coming soon.
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
        <Link
          href="/blog"
          className="mt-4 inline-block text-sm font-semibold text-forest-600 hover:text-forest-800"
        >
          View all →
        </Link>
      </section>

      {/* Location & contact */}
      <section className="px-4 py-14 md:px-6">
        <div className="mx-auto max-w-6xl rounded-3xl bg-leaf-100/80 p-6 md:p-10">
          <h2 className="font-heading text-2xl font-semibold text-forest-800">Visit the Clinic</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="aspect-video w-full overflow-hidden rounded-2xl border border-leaf-200">
              <iframe
                title="Clinic location map"
                src="https://www.google.com/maps?q=Kshitij+Complex,+Sector+4,+Vaishali,+Ghaziabad,+Uttar+Pradesh+201010&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                className="border-0"
              />
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
