"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/diseases", label: "Diseases" },
  { href: "/blog", label: "Latest News" },
  { href: "/contact", label: "Contact Us" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-leaf-200 bg-leaf-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="font-heading text-lg font-semibold text-forest-800 md:text-xl">
          Dr. Gyan&apos;s Homeopathy
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink transition-colors hover:text-forest-600"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/search"
            aria-label="Search"
            className="text-ink transition-colors hover:text-forest-600"
          >
            🔍
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-forest-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-forest-800"
          >
            Book Appointment
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="text-2xl text-forest-800 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-leaf-200 bg-leaf-50 px-4 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded px-2 py-2 text-sm font-medium text-ink hover:bg-leaf-100"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/search"
            className="rounded px-2 py-2 text-sm font-medium text-ink hover:bg-leaf-100"
            onClick={() => setMenuOpen(false)}
          >
            🔍 Search
          </Link>
          <Link
            href="/contact"
            className="mt-2 rounded-full bg-forest-600 px-4 py-2 text-center text-sm font-semibold text-white"
            onClick={() => setMenuOpen(false)}
          >
            Book Appointment
          </Link>
        </nav>
      )}
    </header>
  );
}
