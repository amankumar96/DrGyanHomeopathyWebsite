import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF/WebP automatically when the browser supports it —
    // next/image already resizes per-device; this just picks a smaller
    // format at equal visual quality, no code elsewhere needs to change.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
