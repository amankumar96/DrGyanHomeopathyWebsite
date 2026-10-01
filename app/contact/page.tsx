import AppointmentForm from "@/components/AppointmentForm";

export const metadata = {
  title: "Contact Us | Dr. Gyan's Homeopathy",
  description:
    "Get in touch with Dr. Gyan's Homeopathy in Vaishali, Ghaziabad — call, WhatsApp, or book an appointment online.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <h1 className="font-heading text-3xl font-semibold text-forest-800">Contact Us</h1>
      <p className="mt-3 max-w-2xl text-ink/80">
        Reach out by phone, WhatsApp or email, or send an appointment request below.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-2xl border border-leaf-200">
            <iframe
              title="Clinic location map"
              src="https://www.google.com/maps?q=Kshitij+Complex,+Sector+4,+Vaishali,+Ghaziabad,+Uttar+Pradesh+201010&output=embed"
              width="100%"
              height="320"
              loading="lazy"
              className="border-0"
            />
          </div>

          <dl className="mt-6 space-y-4 text-sm text-ink">
            <div>
              <dt className="font-semibold text-forest-800">Address</dt>
              <dd className="mt-1">
                Shop No. 9, 1st Floor, Kshitij Complex,
                <br />
                Sector 4, Vaishali, Ghaziabad, Uttar Pradesh 201010
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-forest-800">Phone</dt>
              <dd className="mt-1">
                <a href="tel:+919871190713" className="text-forest-600 hover:text-forest-800">
                  +91 98711 90713
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-forest-800">Email</dt>
              <dd className="mt-1">
                <a
                  href="mailto:care@drgyanshomeopathy.com"
                  className="text-forest-600 hover:text-forest-800"
                >
                  care@drgyanshomeopathy.com
                </a>
              </dd>
            </div>
            <div>
              {/* TODO: confirm exact consultation timings with the clinic */}
              <dt className="font-semibold text-forest-800">Timings</dt>
              <dd className="mt-1 text-ink/70">To be confirmed — please call ahead.</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://wa.me/919871190713"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-forest-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-800"
            >
              Message on WhatsApp
            </a>
            <a
              href="tel:+919871190713"
              className="rounded-full border border-forest-600 px-6 py-3 text-sm font-semibold text-forest-600 transition-colors hover:bg-leaf-100"
            >
              Call Now
            </a>
          </div>

          <div className="mt-6 flex gap-4 text-sm text-forest-600">
            {/* TODO: swap for real social links once provided */}
            <a href="#" aria-label="Facebook" className="hover:text-forest-800">
              Facebook
            </a>
            <a href="#" aria-label="X (Twitter)" className="hover:text-forest-800">
              X
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-forest-800">
              LinkedIn
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-leaf-200 bg-leaf-50 p-6">
          <h2 className="font-heading text-xl font-semibold text-forest-800">
            Request an Appointment
          </h2>
          <p className="mt-2 text-sm text-ink/70">
            We don&apos;t collect detailed medical history here — just enough to get in touch
            with you.
          </p>
          <div className="mt-6">
            <AppointmentForm />
          </div>
        </div>
      </div>
    </section>
  );
}
