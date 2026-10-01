import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-forest-800 text-leaf-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <div>
          <p className="font-heading text-lg font-semibold">Dr. Gyan&apos;s Homeopathy</p>
          <p className="mt-1 text-sm text-leaf-200">Treatment for Everyone</p>
          <address className="mt-3 text-sm not-italic text-leaf-100">
            Shop No. 9, 1st Floor, Kshitij Complex, Sector 4,
            <br />
            Vaishali, Ghaziabad, Uttar Pradesh 201010
          </address>
        </div>

        <div>
          <p className="font-semibold">Quick Links</p>
          <nav className="mt-3 flex flex-col gap-2 text-sm text-leaf-100">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/diseases" className="hover:text-white">Diseases</Link>
            <Link href="/blog" className="hover:text-white">Latest News</Link>
            <Link href="/contact" className="hover:text-white">Contact Us</Link>
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/disclaimer" className="hover:text-white">Disclaimer</Link>
          </nav>
        </div>

        <div>
          <p className="font-semibold">Get in Touch</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-leaf-100">
            <a href="tel:+919871190713" className="hover:text-white">+91 98711 90713</a>
            <a href="mailto:care@drgyanshomeopathy.com" className="hover:text-white">
              care@drgyanshomeopathy.com
            </a>
          </div>
          <div className="mt-4 flex gap-4 text-sm text-leaf-100">
            {/* TODO: swap for real social links once provided */}
            <a href="#" aria-label="Facebook" className="hover:text-white">Facebook</a>
            <a href="#" aria-label="X (Twitter)" className="hover:text-white">X</a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="border-t border-leaf-200/20 px-4 py-4 text-center text-xs text-leaf-200 md:px-6">
        © {new Date().getFullYear()} Dr. Gyan&apos;s Homeopathy. All rights reserved.
      </div>
    </footer>
  );
}
