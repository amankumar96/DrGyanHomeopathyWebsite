import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";
import WhatsAppButton from "@/components/WhatsAppButton";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr. Gyan's Homeopathy | Treatment for Everyone",
  description:
    "Homeopathic care in Vaishali, Ghaziabad from Dr. Gyanesh Sharma, BHMS, practising since 2003.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} antialiased`}>
        <PageBackground />
        <Header />
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
