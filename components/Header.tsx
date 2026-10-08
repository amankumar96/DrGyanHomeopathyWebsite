"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import type { DiseaseCategoryMenuItem, DiseaseSearchIndexItem } from "@/lib/content";

const NAV_LINKS_AFTER_DISEASES = [{ href: "/blog", label: "Latest News" }];

const CATEGORY_ICONS: Record<string, string> = {
  "Skin & Hair": "/images/icons/category-skin-hair.png",
  "Brain, Neurological & Mental Wellness": "/images/icons/category-brain-neuro-mental.png",
  "Eye & Ear Care": "/images/icons/category-eye-ear.png",
  Digestive: "/images/icons/category-digestive.png",
  Respiratory: "/images/icons/category-respiratory.png",
  "Joints & Muscles": "/images/icons/category-joints-muscles.png",
  "Heart & Circulation": "/images/icons/category-heart-circulation.png",
  Endocrine: "/images/icons/category-endocrine.png",
  "Kidney & Urinary": "/images/icons/category-kidney-urinary.png",
  "Women's Health": "/images/icons/category-womens-health.png",
  "Men's Health": "/images/icons/category-mens-health.png",
  "Child Health": "/images/icons/category-child-health.png",
  "General Health": "/images/icons/category-general-health.png",
};

/** Presentation-only: avoids a lonely single card in the last row of a
 * 4-column grid when the category count isn't divisible by 4 (13 % 4 === 1).
 * Categories arrive sorted by totalCount desc, so the last item is always
 * the smallest — move it into the first row instead of letting it trail
 * alone. No-op for any category count that already divides evenly. */
function layoutOrder(categories: DiseaseCategoryMenuItem[]) {
  if (categories.length % 4 !== 1) return categories;
  const reordered = [...categories];
  const smallest = reordered.pop();
  if (!smallest) return reordered;
  reordered.splice(2, 0, smallest);
  return reordered;
}

function CategoryCard({ category }: { category: DiseaseCategoryMenuItem }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-leaf-200 bg-leaf-50/60 p-4">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-leaf-100">
          {CATEGORY_ICONS[category.name] && (
            <Image
              src={CATEGORY_ICONS[category.name]}
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
          )}
        </span>
        <p className="font-heading text-sm font-semibold text-forest-800">{category.name}</p>
      </div>
      <ul className="mt-3 flex-1 space-y-1.5">
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
          href={`/diseases?category=${encodeURIComponent(category.sourceCategories.join(","))}`}
          className="mt-2 inline-block text-xs font-semibold text-forest-600 hover:text-forest-800"
        >
          View all {category.name} ({category.totalCount}) →
        </Link>
      )}
    </div>
  );
}

function MenuSearchResults({
  results,
  query,
  onNavigate,
}: {
  results: DiseaseSearchIndexItem[];
  query: string;
  onNavigate?: () => void;
}) {
  if (results.length === 0) {
    return (
      <div className="pt-5 text-sm text-ink/70">
        No matches for &quot;{query}&quot;.{" "}
        <Link
          href={`/search?q=${encodeURIComponent(query)}`}
          className="font-semibold text-forest-600 hover:text-forest-800"
          onClick={onNavigate}
        >
          Try a full search →
        </Link>
      </div>
    );
  }
  return (
    <ul className="mt-5 space-y-1">
      {results.map((item) => (
        <li key={item.slug}>
          <Link
            href={`/diseases/${item.slug}`}
            onClick={onNavigate}
            className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-ink hover:bg-leaf-100"
          >
            <span>{item.title}</span>
            <span className="text-xs text-ink/50">{item.category}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Header({
  diseaseCategories,
  diseaseSearchIndex,
}: {
  diseaseCategories: DiseaseCategoryMenuItem[];
  diseaseSearchIndex: DiseaseSearchIndexItem[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDiseasesOpen, setMobileDiseasesOpen] = useState(false);
  const [menuQuery, setMenuQuery] = useState("");
  const [desktopDiseasesOpen, setDesktopDiseasesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pure CSS :hover doesn't know when a client-side navigation happens —
  // clicking a disease link leaves the cursor sitting over the panel, so
  // without this the dropdown stayed visibly open on the destination page
  // until the mouse moved. Close everything whenever the route changes.
  // Adjusted during render (React's recommended pattern for "reset state
  // when a prop changes") rather than in a useEffect, so it takes effect
  // in the same render as the navigation instead of one tick later.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setDesktopDiseasesOpen(false);
    setMenuOpen(false);
    setMobileDiseasesOpen(false);
    setMenuQuery("");
  }

  const openDesktopDiseases = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDesktopDiseasesOpen(true);
  };

  // Small delay before closing so moving the cursor from the "Diseases"
  // trigger down into the wide panel — which, now that it's centered on the
  // viewport instead of anchored under the trigger, isn't always a
  // straight line — doesn't drop hover and close the menu mid-move.
  const scheduleCloseDesktopDiseases = () => {
    closeTimer.current = setTimeout(() => {
      setDesktopDiseasesOpen(false);
      setMenuQuery("");
    }, 250);
  };

  const totalDiseaseCount = useMemo(
    () => diseaseCategories.reduce((sum, c) => sum + c.totalCount, 0),
    [diseaseCategories],
  );

  const fuse = useMemo(
    () =>
      new Fuse(diseaseSearchIndex, {
        keys: [
          { name: "title", weight: 0.8 },
          { name: "category", weight: 0.2 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [diseaseSearchIndex],
  );

  const menuResults = useMemo(
    () =>
      menuQuery.trim().length < 2
        ? []
        : fuse.search(menuQuery).slice(0, 8).map((r) => r.item),
    [fuse, menuQuery],
  );

  const goToFullSearch = () => {
    if (menuQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(menuQuery)}`);
    }
  };

  const orderedCategories = useMemo(() => layoutOrder(diseaseCategories), [diseaseCategories]);

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setMenuQuery("");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-leaf-200 bg-leaf-50/90 backdrop-blur">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="font-heading text-lg font-semibold text-forest-800 md:text-xl">
          Dr Gyan Homeopathy
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/about"
            className="text-sm font-medium text-ink transition-colors hover:text-forest-600"
          >
            About
          </Link>

          {/* Diseases — hover mega-menu: search + merged category cards.
              Open/close is JS-controlled (not pure CSS group-hover): the
              panel centers on the viewport via the header row's wider
              `relative` container above, not under this small trigger, so
              a plain CSS hover gap between the two would drop the hover
              state before the cursor reaches the panel. A short close
              delay plus an explicit close-on-navigate effect (above) fixes
              both the hover-gap flicker and the panel staying open after
              clicking a disease link. */}
          <div onMouseEnter={openDesktopDiseases} onMouseLeave={scheduleCloseDesktopDiseases}>
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
              <div
                className={`absolute left-1/2 top-full z-50 w-[92vw] max-w-[1560px] -translate-x-1/2 pt-3 transition-opacity ${
                  desktopDiseasesOpen ? "visible opacity-100" : "invisible opacity-0"
                }`}
              >
                <div className="max-h-[80vh] overflow-y-auto rounded-2xl border border-leaf-200 bg-white p-6 shadow-lg">
                  <div className="flex flex-wrap items-center gap-4 border-b border-leaf-200 pb-4">
                    <input
                      type="text"
                      value={menuQuery}
                      onChange={(e) => setMenuQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && goToFullSearch()}
                      placeholder="Search diseases or conditions..."
                      aria-label="Search diseases or conditions"
                      className="min-w-[240px] flex-1 rounded-full border border-leaf-200 bg-leaf-50 px-5 py-2.5 text-sm text-ink focus:border-forest-600 focus:outline-none focus:ring-1 focus:ring-forest-600"
                    />
                    <Link
                      href="/diseases"
                      className="shrink-0 text-sm font-semibold text-forest-600 hover:text-forest-800"
                    >
                      All Conditions ({totalDiseaseCount}) →
                    </Link>
                  </div>

                  {menuQuery.trim().length >= 2 ? (
                    <MenuSearchResults results={menuResults} query={menuQuery} />
                  ) : (
                    <div className="grid grid-cols-2 gap-5 pt-5 lg:grid-cols-4">
                      {orderedCategories.map((category) => (
                        <CategoryCard key={category.name} category={category} />
                      ))}
                    </div>
                  )}
                </div>
                <div className="rounded-b-2xl border-x border-b border-leaf-200 bg-leaf-100 px-6 py-4 text-center">
                  <p className="text-sm font-medium text-forest-800">
                    Browse all conditions we treat, from skin to systemic care.
                  </p>
                  <Link
                    href="/diseases"
                    className="mt-2 inline-block rounded-full bg-forest-600 px-5 py-2 text-sm font-semibold text-white hover:bg-forest-800"
                  >
                    View All Conditions ({totalDiseaseCount}) →
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
            onClick={closeMobileMenu}
          >
            About
          </Link>

          {/* Diseases — expandable: search + merged category list */}
          <div>
            <button
              type="button"
              aria-expanded={mobileDiseasesOpen}
              className="flex w-full items-center justify-between rounded px-2 py-2 text-sm font-medium text-ink hover:bg-leaf-100"
              onClick={() => setMobileDiseasesOpen((open) => !open)}
            >
              <Link href="/diseases" onClick={closeMobileMenu}>
                Diseases
              </Link>
              <span>{mobileDiseasesOpen ? "−" : "+"}</span>
            </button>
            {mobileDiseasesOpen && (
              <div className="ml-2 border-l border-leaf-200 pl-3">
                <div className="flex items-center gap-2 py-2">
                  <input
                    type="text"
                    value={menuQuery}
                    onChange={(e) => setMenuQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && goToFullSearch()}
                    placeholder="Search diseases or conditions..."
                    aria-label="Search diseases or conditions"
                    className="w-full rounded-full border border-leaf-200 bg-white px-4 py-2 text-sm text-ink focus:border-forest-600 focus:outline-none focus:ring-1 focus:ring-forest-600"
                  />
                </div>

                {menuQuery.trim().length >= 2 ? (
                  <MenuSearchResults
                    results={menuResults}
                    query={menuQuery}
                    onNavigate={closeMobileMenu}
                  />
                ) : (
                  diseaseCategories.map((category) => (
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
                              onClick={closeMobileMenu}
                            >
                              {disease.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      {category.totalCount > category.diseases.length && (
                        <Link
                          href={`/diseases?category=${encodeURIComponent(category.sourceCategories.join(","))}`}
                          className="mt-1 block px-2 py-1 text-xs font-semibold text-forest-600"
                          onClick={closeMobileMenu}
                        >
                          View all {category.name} ({category.totalCount}) →
                        </Link>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {NAV_LINKS_AFTER_DISEASES.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded px-2 py-2 text-sm font-medium text-ink hover:bg-leaf-100"
              onClick={closeMobileMenu}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/search"
            className="rounded px-2 py-2 text-sm font-medium text-ink hover:bg-leaf-100"
            onClick={closeMobileMenu}
          >
            🔍 Search
          </Link>
          <Link
            href="/contact"
            className="mt-2 rounded-full bg-forest-600 px-4 py-2 text-center text-sm font-semibold text-white"
            onClick={closeMobileMenu}
          >
            Book Appointment
          </Link>
        </nav>
      )}
    </header>
  );
}
