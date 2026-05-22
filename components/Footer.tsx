const COL = [
  {
    title: "Product",
    links: ["Customer Intelligence", "Custom Deep Research", "Enterprise", "View Pricing Plans"],
  },
  {
    title: "Use Cases",
    links: ["Onboarding & Training", "Internal Search Tool", "Customer Service", "Site Search", "Research Assistance"],
  },
  {
    title: "Company",
    links: ["About Us", "Testimonials", "Partner Program", "Affiliate Program", "Contact Us"],
  },
  {
    title: "Resources",
    links: ["Case Studies", "Blog", "Documentation", "Security & Trust", "GDPR"],
  },
  {
    title: "Dev Resources",
    links: ["RAG API", "SDK", "MCP Server", "OpenAI Compatibility", "Dev Starter Kit"],
  },
];

export default function Footer() {
  return (
    <footer
      className="px-6 pt-16 pb-8"
      style={{ background: "var(--cg-gray-900)", color: "var(--cg-gray-400)" }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Logo + cols */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="10" fill="#7367F0" />
                <text x="8" y="34" fontSize="26" fontWeight="700" fill="white" fontFamily="Inter,sans-serif">G</text>
                <text x="22" y="34" fontSize="26" fontWeight="700" fill="white" fontFamily="Inter,sans-serif" opacity=".65">G</text>
              </svg>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>CustomGPT.ai</span>
            </div>
            <p className="text-xs leading-5" style={{ color: "var(--cg-gray-500)" }}>
              Build powerful AI agents trained on your business content.
            </p>
            <div className="flex gap-3 mt-5">
              {["Twitter", "LinkedIn", "GitHub"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-xs transition-colors"
                  style={{ color: "var(--cg-gray-500)" }}
                  aria-label={s}
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Nav cols */}
          {COL.map((col) => (
            <div key={col.title}>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--cg-gray-400)" }}
              >
                {col.title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs transition-colors"
                      style={{ color: "var(--cg-gray-500)" }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 pt-8 text-xs"
          style={{ borderTop: "1px solid var(--cg-gray-800)", color: "var(--cg-gray-600)" }}
        >
          <p>© 2026 CustomGPT.ai — All rights reserved.</p>
          <div className="flex gap-4">
            {["Terms & Conditions", "Privacy Policy", "Cookie Policy"].map((t) => (
              <a key={t} href="#" className="hover:text-gray-400 transition-colors">
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
