import type { NextConfig } from "next";

// script-src/style-src allow 'unsafe-inline' because Next.js's App Router
// itself injects inline <script> tags for RSC hydration data and inline
// <style>/<script> for its own runtime — confirmed empirically (headless
// Chrome logged real CSP violations blocking the framework's own hydration
// scripts on every page). The strict alternative (CSP nonces) requires
// *dynamic* rendering on every single page per Next's own docs
// (node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md),
// which would disable static generation across all 186 routes — a severe
// regression not worth it here, especially since this site has no
// user-generated content anywhere (no backend, no CMS, no comments) to
// give inline-script XSS a real injection point. Matches Next's own
// documented "Without Nonces" default example. Every other directive stays
// strict. frame-src is scoped to Google Maps for the /contact embed only.
// See Documents/seo-and-security-hardening.md for the full reasoning.
//
// 'unsafe-eval' is added to script-src in development only, matching
// Next.js's own documented CSP examples exactly (node_modules/next/dist/
// docs/01-app/02-guides/content-security-policy.md) — React uses eval()
// in dev mode to reconstruct server-side error stacks in the browser for
// debugging; it never uses eval() in production. Without this, dev mode
// throws "eval() is not supported in this environment" and breaks.
const isDev = process.env.NODE_ENV === "development";

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "frame-src https://www.google.com",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF/WebP automatically when the browser supports it —
    // next/image already resizes per-device; this just picks a smaller
    // format at equal visual quality, no code elsewhere needs to change.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
        ],
      },
    ];
  },
};

export default nextConfig;
