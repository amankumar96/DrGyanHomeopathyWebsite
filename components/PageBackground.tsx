import Image from "next/image";

/**
 * Full-page botanical background — the provided image (public/images/BG.png),
 * fixed behind all content so it covers the entire page, not just the hero,
 * and stays in place while the page scrolls. Decorative only.
 */
export default function PageBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-[#F3F8EE]">
      <Image src="/images/BG.png" alt="" fill priority className="object-cover object-center" />
    </div>
  );
}
