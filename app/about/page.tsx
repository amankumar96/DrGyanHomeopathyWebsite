import Disclaimer from "@/components/Disclaimer";

export const metadata = {
  title: "About Dr. Gyanesh Sharma | Dr Gyan Homeopathy",
  description:
    "Dr. Gyanesh Sharma, BHMS, practising homeopathy in Vaishali, Ghaziabad since 2003.",
};

const TIMINGS = [
  { day: "Monday – Saturday", hours: "9:30 AM – 1:30 PM" },
  { day: "Monday – Saturday (evening)", hours: "6:00 PM – 9:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 md:px-6">
      <h1 className="font-heading text-3xl font-semibold text-forest-800 md:text-4xl">
        About Dr. Gyanesh Sharma
      </h1>

      <div className="mt-8 grid gap-8 md:grid-cols-[280px_1fr]">
        {/* TODO: real doctor photo pending — never substitute a stock/generic photo for this */}
        <div className="aspect-[4/5] w-full rounded-2xl bg-leaf-200/60" aria-hidden />

        <div className="text-ink/85">
          <p>
            Dr. Gyanesh Sharma is an experienced homeopathic doctor practising in Vaishali,
            Ghaziabad since 2003. He began his journey in Lucknow before setting up his clinic
            in Vaishali, where he continues to practise today.
          </p>
          <p className="mt-4">
            Dr. Sharma is a BHMS graduate from National Homeopathic Medical College, Lucknow,
            Uttar Pradesh. His practice focuses on children&apos;s and infant health, hair and
            skin conditions, lifestyle-related concerns, and seasonal infections, alongside
            general homeopathic consultations across a wide range of conditions.
          </p>
          <p className="mt-4">
            {/* TODO: registration number — never invent; add only once the clinic provides it */}
            Registration number: to be confirmed with the clinic.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-heading text-xl font-semibold text-forest-800">
            Consultation Timings
          </h2>
          <dl className="mt-4 space-y-2 text-sm text-ink">
            {TIMINGS.map((t) => (
              <div key={t.day} className="flex justify-between gap-4 border-b border-leaf-200 pb-2">
                <dt className="font-medium">{t.day}</dt>
                <dd className="text-ink/70">{t.hours}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-forest-800">
            Our Approach to Care
          </h2>
          <p className="mt-4 text-sm text-ink/80">
            Each consultation looks at a patient&apos;s full symptom picture, lifestyle and
            health history, not just a single named condition, with the aim of selecting an
            individualised approach. Homeopathic care is offered as a complement to, not a
            replacement for, conventional medical treatment — patients are always encouraged to
            continue prescribed medication and consult their doctor before making any changes.
          </p>
        </div>
      </div>

      {/* TODO: clinic photos pending — add here once provided */}

      <div className="mt-12">
        <Disclaimer />
      </div>
    </section>
  );
}
