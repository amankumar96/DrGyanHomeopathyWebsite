const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/Drgyans/" },
  { label: "X", href: "https://x.com/drgyans" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/gyanesh-sharma-5402a316b/" },
];

const THEME = {
  light: "text-forest-600 hover:text-forest-800",
  dark: "text-leaf-100 hover:text-white",
};

/** Single source of truth for the clinic's social links — used in the Footer
 * (every page), the Contact page, and the Home page's "Visit the Clinic"
 * section, so a new/changed link only needs updating here. */
export default function SocialLinks({ theme = "light" }: { theme?: "light" | "dark" }) {
  return (
    <div className="flex gap-4 text-sm">
      {SOCIAL_LINKS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className={THEME[theme]}
        >
          {s.label}
        </a>
      ))}
    </div>
  );
}
