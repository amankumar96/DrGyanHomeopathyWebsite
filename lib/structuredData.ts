import type { Disease, Faq } from "./content";

/**
 * SEO/structured-data helpers — mirrors lib/content.ts's "one module owns a
 * concern" pattern. Every canonical URL, OG URL, and JSON-LD @id in the app
 * should go through getSiteUrl() so there is exactly one place to update
 * once a production domain is chosen (set NEXT_PUBLIC_SITE_URL on the
 * hosting platform; no code change needed at that point).
 */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.drgyanshomeopathy.com";
}

/** Clinic facts — kept in sync with CLAUDE.md "Clinic facts" and
 * app/contact/page.tsx. Update both places together if these ever change. */
export const CLINIC_INFO = {
  name: "Dr Gyan Homeopathy",
  telephone: "+919871190713",
  email: "care@drgyanshomeopathy.com",
  streetAddress: "Shop No. 9, 1st Floor, Kshitij Complex, Sector 4",
  addressLocality: "Ghaziabad",
  addressRegion: "UP",
  postalCode: "201010",
  addressCountry: "IN",
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:30", closes: "13:30" },
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "18:00", closes: "21:00" },
  ],
};

/** Business-level schema — render this once, on the homepage only. Repeating
 * identical LocalBusiness/MedicalBusiness JSON-LD on all 172+ disease pages
 * would be noise, not signal. */
export function getLocalBusinessSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: CLINIC_INFO.name,
    url: siteUrl,
    telephone: CLINIC_INFO.telephone,
    email: CLINIC_INFO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: CLINIC_INFO.streetAddress,
      addressLocality: CLINIC_INFO.addressLocality,
      addressRegion: CLINIC_INFO.addressRegion,
      postalCode: CLINIC_INFO.postalCode,
      addressCountry: CLINIC_INFO.addressCountry,
    },
    openingHoursSpecification: CLINIC_INFO.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
  };
}

/** Per-disease-page schema — reuses frontmatter already written for the
 * page itself, never introduces new facts. */
export function getMedicalWebPageSchema(disease: Disease) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: disease.title,
    url: `${siteUrl}/diseases/${disease.slug}`,
    lastReviewed: disease.lastReviewed,
    reviewedBy: {
      "@type": "Person",
      name: disease.reviewedBy,
    },
    about: {
      "@type": "MedicalCondition",
      name: disease.title,
    },
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      name: CLINIC_INFO.name,
      url: siteUrl,
    },
  };
}

/** FAQPage schema from the same faqs[] already rendered visibly on the page
 * — keeps structured data provably consistent with on-page content. Returns
 * null when there are no FAQs, matching the page's own `faqs?.length > 0`
 * rendering guard. */
export function getFaqPageSchema(faqs: Faq[] | undefined) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

/** Props for a <script type="application/ld+json"> tag. `<` is escaped to
 * its unicode form as defense-in-depth against the string "</script>"
 * appearing inside serialized data (e.g. a disease title or FAQ answer)
 * breaking out of the script tag — low risk here since all source data is
 * repo-authored, never user input, but cheap to guard anyway. */
export function jsonLdScriptProps(data: object) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, "\\u003c") },
  };
}
