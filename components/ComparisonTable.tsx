"use client";

import { useState } from "react";

type CellValue = boolean | string;

interface Row {
  label: string;
  tooltip?: string;
  standard: CellValue;
  premium: CellValue;
  enterprise: CellValue;
}

interface Section {
  id: string;
  title: string;
  rows: Row[];
}

const SECTIONS: Section[] = [
  {
    id: "basics",
    title: "Basics",
    rows: [
      { label: "Price / month (billed monthly)", standard: "$99", premium: "$499", enterprise: "Custom" },
      { label: "Price / month (billed annually)", standard: "$89", premium: "$449", enterprise: "Custom" },
      { label: "AI agents", tooltip: "Each agent is a separate AI assistant trained on its own content.", standard: "10", premium: "25", enterprise: "Custom" },
      { label: "AI conversations / month", tooltip: "One conversation = one user exchange with your AI agent.", standard: "1,000", premium: "5,000", enterprise: "Custom" },
      { label: "Files per agent", tooltip: "Documents, PDFs, pages ingested per agent.", standard: "5,000", premium: "20,000", enterprise: "Custom" },
      { label: "Knowledge storage", tooltip: "Total word count across all ingested content.", standard: "60M words", premium: "300M words", enterprise: "Custom" },
      { label: "Team members", standard: "3", premium: "5", enterprise: "Custom" },
      { label: "7-day free trial", standard: true, premium: true, enterprise: false },
    ],
  },
  {
    id: "integrations",
    title: "Integrations",
    rows: [
      { label: "Developer / RAG API", standard: true, premium: true, enterprise: true },
      { label: "SDK", standard: true, premium: true, enterprise: true },
      { label: "OpenAI Compatibility Layer", standard: true, premium: true, enterprise: true },
      { label: "MCP Server", standard: true, premium: true, enterprise: true },
      { label: "Zapier / N8N", standard: true, premium: true, enterprise: true },
      { label: "Auto-sync website content", standard: false, premium: true, enterprise: true },
      { label: "Automated real-time data sync", standard: false, premium: false, enterprise: true },
    ],
  },
  {
    id: "teams",
    title: "Teams",
    rows: [
      { label: "Team seats", standard: "3", premium: "5", enterprise: "Custom" },
      { label: "Role-based permissions", standard: "Basic", premium: "Basic", enterprise: "Advanced RBAC" },
      { label: "Custom SSO", standard: false, premium: false, enterprise: true },
      { label: "Shared agent library", standard: true, premium: true, enterprise: true },
    ],
  },
  {
    id: "security",
    title: "Security",
    rows: [
      { label: "GDPR compliant", standard: true, premium: true, enterprise: true },
      { label: "SOC 2 Type II", standard: true, premium: true, enterprise: true },
      { label: "Data Processing Agreement (DPA)", standard: false, premium: false, enterprise: true },
      { label: "Advanced RBAC", standard: false, premium: false, enterprise: true },
      { label: "Custom SSO / SAML", standard: false, premium: false, enterprise: true },
      { label: "Data residency options", standard: false, premium: false, enterprise: true },
    ],
  },
  {
    id: "branding",
    title: "Branding",
    rows: [
      { label: "Remove CustomGPT branding", standard: false, premium: true, enterprise: true },
      { label: "Custom domain / embed", standard: true, premium: true, enterprise: true },
      { label: "Bespoke AI agent design", standard: false, premium: false, enterprise: true },
    ],
  },
  {
    id: "analytics",
    title: "Analytics",
    rows: [
      { label: "Usage analytics", standard: true, premium: true, enterprise: true },
      { label: "Conversation logs", standard: true, premium: true, enterprise: true },
      { label: "Custom analytics & reporting", standard: false, premium: false, enterprise: true },
    ],
  },
  {
    id: "support",
    title: "Support",
    rows: [
      { label: "Email support", standard: true, premium: true, enterprise: true },
      { label: "Priority support", standard: false, premium: true, enterprise: true },
      { label: "Dedicated account manager", standard: false, premium: false, enterprise: true },
      { label: "White-glove onboarding", standard: false, premium: false, enterprise: true },
      { label: "Forward-deployed engineers", standard: false, premium: false, enterprise: true },
    ],
  },
];

function Check({ yes }: { yes: boolean }) {
  if (yes) {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mx-auto">
        <circle cx="10" cy="10" r="10" fill="var(--cg-success-100)" />
        <path d="M6 10l3 3 5-6" stroke="var(--cg-success-500)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mx-auto">
      <circle cx="10" cy="10" r="10" fill="var(--cg-gray-100)" />
      <path d="M7 13l6-6M13 13L7 7" stroke="var(--cg-gray-400)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Tooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-flex ml-1 align-middle">
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        className="w-4 h-4 rounded-full inline-flex items-center justify-center text-xs font-bold cursor-help"
        style={{ background: "var(--cg-gray-200)", color: "var(--cg-fg-3)" }}
        aria-label={`Info: ${text}`}
      >
        ?
      </button>
      {show && (
        <span
          className="absolute z-50 bottom-6 left-1/2 -translate-x-1/2 w-56 px-3 py-2 rounded-md text-xs leading-4"
          style={{
            background: "#fff",
            color: "var(--cg-fg-2)",
            boxShadow: "0 1px 2.2px rgba(0,0,0,0.25)",
            pointerEvents: "none",
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
}

export default function ComparisonTable() {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const toggleSection = (id: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const allOpen = collapsed.size === 0;
  const toggleAll = () => {
    if (allOpen) {
      setCollapsed(new Set(SECTIONS.map((s) => s.id)));
    } else {
      setCollapsed(new Set());
    }
  };

  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <h2
            style={{ fontSize: 24, fontWeight: 700, color: "var(--cg-fg-1)", letterSpacing: "-0.01em" }}
          >
            Compare all features
          </h2>
          <button
            onClick={toggleAll}
            className="text-sm font-medium transition-colors cursor-pointer"
            style={{ color: "var(--cg-primary)" }}
          >
            {allOpen ? "Collapse all ↑" : "Expand all ↓"}
          </button>
        </div>

        {/* Sticky column header */}
        <div
          className="sticky top-16 z-30 rounded-xl mb-1 hidden md:grid"
          style={{
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            background: "var(--cg-bg-card)",
            border: "1px solid var(--cg-divider)",
            boxShadow: "var(--cg-shadow-sm)",
          }}
        >
          <div className="px-5 py-4" />
          {["Standard", "Premium", "Enterprise"].map((plan, i) => (
            <div
              key={plan}
              className="px-4 py-4 text-center font-semibold text-sm"
              style={{
                color: i === 1 ? "var(--cg-primary)" : "var(--cg-fg-1)",
                borderLeft: "1px solid var(--cg-divider)",
              }}
            >
              {plan}
              {i === 1 && (
                <span
                  className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{ background: "var(--cg-primary-100)", color: "var(--cg-primary)" }}
                >
                  Popular
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Sections */}
        {SECTIONS.map((section) => {
          const open = !collapsed.has(section.id);
          return (
            <div
              key={section.id}
              className="mb-2 rounded-xl overflow-hidden"
              style={{ border: "1px solid var(--cg-divider)" }}
            >
              {/* Section header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors cursor-pointer"
                style={{ background: "var(--cg-gray-50)" }}
                aria-expanded={open}
              >
                <span className="font-semibold text-sm" style={{ color: "var(--cg-fg-1)" }}>
                  {section.title}
                </span>
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  className="transition-transform duration-200"
                  style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <path d="M4 6l4 4 4-4" stroke="var(--cg-fg-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Rows */}
              {open && (
                <div>
                  {section.rows.map((row, ri) => (
                    <div
                      key={ri}
                      className="grid items-center"
                      style={{
                        gridTemplateColumns: "2fr 1fr 1fr 1fr",
                        borderTop: "1px solid var(--cg-divider)",
                      }}
                    >
                      <div className="px-5 py-3.5 text-sm" style={{ color: "var(--cg-fg-2)" }}>
                        {row.label}
                        {row.tooltip && <Tooltip text={row.tooltip} />}
                      </div>
                      {(["standard", "premium", "enterprise"] as const).map((col) => {
                        const val = row[col];
                        return (
                          <div
                            key={col}
                            className="px-4 py-3.5 text-center text-sm"
                            style={{
                              borderLeft: "1px solid var(--cg-divider)",
                              color: "var(--cg-fg-2)",
                              background: col === "premium" ? "rgba(115,103,240,0.02)" : undefined,
                            }}
                          >
                            {typeof val === "boolean" ? (
                              <Check yes={val} />
                            ) : (
                              <span className={col === "premium" ? "font-medium" : ""} style={{ color: col === "premium" ? "var(--cg-fg-1)" : undefined }}>
                                {val}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Mobile note */}
        <p className="md:hidden mt-4 text-xs text-center" style={{ color: "var(--cg-fg-4)" }}>
          Scroll horizontally to compare all plans
        </p>
      </div>
    </section>
  );
}
