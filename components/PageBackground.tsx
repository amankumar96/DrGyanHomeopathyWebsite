import Image from "next/image";

/**
 * Site-wide ambient botanical background — the same image as the Hero
 * (public/images/BG.png), fixed behind all content so every page feels
 * framed, not just the hero.
 *
 * Deliberately low opacity. This is `fixed`, so unlike a normal background
 * it stays pinned at the same screen position through every scroll position
 * on every page — meaning whatever text happens to sit near an edge is
 * contrast-fighting this layer the whole time, not just once. At full
 * strength that made edge-adjacent body text (e.g. the Contact page's
 * address block) hard to read. Hero.tsx layers its own full-strength copy
 * of the same image locally for the one place a strong botanical frame is
 * meant to be a focal element.
 */
export default function PageBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 bg-[#F3F8EE] opacity-25"
    >
      <Image src="/images/BG.png" alt="" fill priority className="object-cover object-center" />
    </div>
  );
}
