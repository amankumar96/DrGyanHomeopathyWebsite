"use client";

import Link from "next/link";
import { useState } from "react";
import type { DiseaseCategoryMenuItem } from "@/lib/content";

const NAV_LINKS_AFTER_DISEASES = [{ href: "/blog", label: "Latest News" }];

export default function Header({
  diseaseCategories,
}: {
  diseaseCategories: DiseaseCategoryMenuItem[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDiseasesOpen, setMobileDiseasesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-leaf-200 bg-leaf-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="font-heading text-lg font-semibold text-forest-800 md:text-xl">
          Dr. Gyan&apos;s Homeopathy
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/about"
            className="text-sm font-medium text-ink transition-colors hover:text-forest-600"
          >
            About
          </Link>

          {/* Diseases — hover dropdown grouped by category */}
          <div className="group relative">
            <Link
              href="/diseases"
              className="flex items-center gap-1 text-sm font-medium text-ink transition-colors hover:text-forest-600"
            >
              Diseases
              <svg viewBox="0 0 12 8" className="h-2.5 w-2.5 fill-current">
                <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </Link>

            {diseaseCategories.length > 0 && (
              <div className="invisible absolute left-1/2 top-full z-50 w-[90vw] max-w-[920px] -translate-x-1/2 pt-3 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100">
                <div className="grid max-h-[80vh] grid-cols-3 gap-x-6 gap-y-6 overflow-y-auto rounded-2xl border border-leaf-200 bg-white p-6 shadow-lg lg:grid-cols-4">
                  {diseaseCategories.map((category) => (
                    <div key={category.name}>
                      <p className="text-xs font-semibold uppercase tracking-wide text-forest-600">
                        {category.name}
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {category.diseases.map((disease) => (
                          <li key={disease.slug}>
                            <Link
                              href={`/diseases/${disease.slug}`}
                              className="text-sm text-ink hover:text-forest-600"
                            >
                              {disease.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      {category.totalCount > category.diseases.length && (
                        <Link
                          href={`/diseases?category=${encodeURIComponent(category.name)}`}
                          className="mt-2 inline-block text-xs font-semibold text-forest-600 hover:text-forest-800"
                        >
                          View all {category.name} ({category.totalCount}) →
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
                <div className="rounded-b-2xl border-x border-b border-leaf-200 bg-leaf-50 px-6 py-3 text-center">
                  <Link href="/diseases" className="text-sm font-semibold text-forest-600 hover:text-forest-800">
                    View all conditions →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {NAV_LINKS_AFTER_DISEASES.map((link) => (
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
          <Link
            href="/about"
            className="rounded px-2 py-2 text-sm font-medium text-ink hover:bg-leaf-100"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>

          {/* Diseases — expandable grouped list */}
          <div>
            <button
              type="button"
              aria-expanded={mobileDiseasesOpen}
              className="flex w-full items-center justify-between rounded px-2 py-2 text-sm font-medium text-ink hover:bg-leaf-100"
              onClick={() => setMobileDiseasesOpen((open) => !open)}
            >
              <Link href="/diseases" onClick={() => setMenuOpen(false)}>
                Diseases
              </Link>
              <span>{mobileDiseasesOpen ? "−" : "+"}</span>
            </button>
            {mobileDiseasesOpen && (
              <div className="ml-2 border-l border-leaf-200 pl-3">
                {diseaseCategories.map((category) => (
                  <div key={category.name} className="py-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-forest-600">
                      {category.name}
                    </p>
                    <ul className="mt-1 space-y-1">
                      {category.diseases.map((disease) => (
                        <li key={disease.slug}>
                          <Link
                            href={`/diseases/${disease.slug}`}
                            className="block rounded px-2 py-1 text-sm text-ink hover:bg-leaf-100"
                            onClick={() => setMenuOpen(false)}
                          >
                            {disease.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {category.totalCount > category.diseases.length && (
                      <Link
                        href={`/diseases?category=${encodeURIComponent(category.name)}`}
                        className="mt-1 block px-2 py-1 text-xs font-semibold text-forest-600"
                        onClick={() => setMenuOpen(false)}
                      >
                        View all {category.name} ({category.totalCount}) →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {NAV_LINKS_AFTER_DISEASES.map((link) => (
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
