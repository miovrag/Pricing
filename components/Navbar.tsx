"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full transition-shadow"
      style={{
        background: "var(--cg-bg-header)",
        boxShadow: scrolled ? "var(--cg-shadow-sm)" : "none",
        borderBottom: scrolled ? "none" : "1px solid var(--cg-divider)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="10" fill="#7367F0" />
            <text x="8" y="34" fontSize="26" fontWeight="700" fill="white" fontFamily="Inter,sans-serif">G</text>
            <text x="22" y="34" fontSize="26" fontWeight="700" fill="white" fontFamily="Inter,sans-serif" opacity=".65">G</text>
          </svg>
          <span style={{ color: "var(--cg-fg-1)", fontWeight: 700, fontSize: 16, letterSpacing: "-0.01em" }}>
            CustomGPT<span style={{ color: "var(--cg-primary)" }}>.ai</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {["Solutions", "Customers", "Pricing", "Resources"].map((item) => (
            <Link
              key={item}
              href="#"
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors"
              style={{ color: "var(--cg-fg-2)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--cg-primary-8)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="#"
            className="hidden md:block text-sm font-medium transition-colors"
            style={{ color: "var(--cg-fg-2)" }}
          >
            Log in
          </Link>
          <Link
            href="#"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all"
            style={{
              background: "var(--cg-primary)",
              color: "var(--cg-fg-on-primary)",
              borderRadius: "var(--cg-radius-md)",
              boxShadow: "var(--cg-shadow-cta)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--cg-primary-hover)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--cg-primary)";
            }}
          >
            Try for free
          </Link>
        </div>
      </div>
    </header>
  );
}
