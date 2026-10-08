import type { Metadata } from "next";
import { Fraunces, Inter, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getDiseaseCategoryMenu, getDiseaseSearchIndex } from "@/lib/content";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Used only for the Hindi/Devanagari portion of a disease page's H1
// (see app/diseases/[slug]/page.tsx) — Fraunces and Inter don't cover
// Devanagari, so without this the script would fall back to whatever
// font (if any) the visitor's own system happens to provide.
const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Dr Gyan Homeopathy | Treatment for Everyone",
  description:
    "Homeopathic care in Vaishali, Ghaziabad from Dr. Gyanesh Sharma, BHMS, practising since 2003.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const diseaseCategories = getDiseaseCategoryMenu();
  const diseaseSearchIndex = getDiseaseSearchIndex();

  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${inter.variable} ${notoDevanagari.variable} antialiased`}
      >
        <PageBackground />
        <Header diseaseCategories={diseaseCategories} diseaseSearchIndex={diseaseSearchIndex} />
        {/* pb-6/10 guarantees clearance above the footer's tree-line decoration
            (see components/Footer.tsx) regardless of a page's own last-section
            padding, so content can never end flush against the footer. */}
        <main className="pb-6 md:pb-10">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
