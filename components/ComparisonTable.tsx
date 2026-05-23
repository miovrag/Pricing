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
      { label: "OpenAI compatibility layer", standard: true, premium: true, enterprise: true },
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

/* Tabler Icons — inline SVG, 24×24, 2px stroke */
function IconCircleCheck() {
  return (
    <svg
      width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="var(--cg-success-500)"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </svg>
  );
}

function IconCircleX() {
  return (
    <svg
      width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="var(--cg-gray-300)"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M10 10l4 4m0 -4l-4 4" />
    </svg>
  );
}

function IconChevronDown() {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M6 9l6 6l6 -6" />
    </svg>
  );
}

function IconInfoCircle() {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M12 8l.01 0" />
      <path d="M11 12l1 0l0 4l1 0" />
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
        className="inline-flex items-center justify-center cursor-help"
        style={{ color: "var(--cg-fg-4)" }}
        aria-label={`More info: ${text}`}
      >
        <IconInfoCircle />
      </button>
      {show && (
        <span
          className="absolute z-50 bottom-6 left-1/2 -translate-x-1/2 w-56 px-3 py-2 text-xs leading-5"
          style={{
            background: "var(--cg-bg-card)",
            color: "var(--cg-fg-2)",
            borderRadius: "var(--cg-radius-sm)",
            boxShadow: "0 1px 2.2px rgba(0,0,0,0.25)",
            pointerEvents: "none",
          }}
          role="tooltip"
        >
          {text}
        </span>
      )}
    </span>
  );
}

function Cell({ col, value }: { col: "standard" | "premium" | "enterprise"; value: CellValue }) {
  const isPremium = col === "premium";
  if (typeof value === "boolean") {
    return (
      <td
        className="text-center"
        style={{
          padding: "12px 16px",
          borderLeft: "1px solid var(--cg-divider)",
          background: isPremium ? "rgba(115,103,240,0.025)" : undefined,
          minHeight: 48,
        }}
      >
        <span className="inline-flex justify-center w-full">
          {value ? (
            <span role="img" aria-label="Included"><IconCircleCheck /></span>
          ) : (
            <span role="img" aria-label="Not included"><IconCircleX /></span>
          )}
        </span>
      </td>
    );
  }
  return (
    <td
      className="text-center text-sm"
      style={{
        padding: "12px 16px",
        borderLeft: "1px solid var(--cg-divider)",
        background: isPremium ? "rgba(115,103,240,0.025)" : undefined,
        color: isPremium ? "var(--cg-fg-1)" : "var(--cg-fg-2)",
        fontWeight: isPremium ? 500 : 400,
        fontVariantNumeric: "tabular-nums",
        minHeight: 48,
      }}
    >
      {value}
    </td>
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
    setCollapsed(allOpen ? new Set(SECTIONS.map((s) => s.id)) : new Set());
  };

  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-5xl">

        {/* Section heading + expand-all */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--cg-fg-1)", letterSpacing: "-0.01em" }}
          >
            Compare all features
          </h2>
          <button
            onClick={toggleAll}
            className="text-sm font-medium cursor-pointer transition-colors"
            style={{ color: "var(--cg-primary)" }}
          >
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
        </div>

        {/* Scroll container — overflow on both axes so sticky thead works cross-browser */}
        <div
          className="-mx-2 px-2"
          style={{
            overflowX: "auto",
            overflowY: "auto",
            maxHeight: "72vh",
            borderRadius: "var(--cg-radius-xl)",
            border: "1px solid var(--cg-divider)",
          }}
        >
          <table
            className="w-full border-collapse"
            style={{ minWidth: 600 }}
            aria-label="CustomGPT.ai plan comparison"
          >
            <caption className="sr-only">
              Feature comparison across Standard, Premium, and Enterprise plans. Check marks indicate the feature is included; X marks indicate it is not.
            </caption>

            {/* Sticky column headers */}
            <thead>
              <tr>
                <th
                  scope="col"
                  className="text-left text-sm font-semibold"
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 20,
                    background: "var(--cg-bg-card)",
                    padding: "16px 20px",
                    color: "var(--cg-fg-1)",
                    borderBottom: "2px solid var(--cg-divider)",
                    width: "40%",
                  }}
                >
                  Feature
                </th>
                {(["Standard", "Premium", "Enterprise"] as const).map((plan, i) => (
                  <th
                    key={plan}
                    scope="col"
                    className="text-center text-sm font-semibold"
                    style={{
                      position: "sticky",
                      top: 0,
                      zIndex: 20,
                      background: i === 1 ? "rgba(115,103,240,0.025)" : "var(--cg-bg-card)",
                      padding: "16px",
                      color: i === 1 ? "var(--cg-primary)" : "var(--cg-fg-1)",
                      borderBottom: "2px solid var(--cg-divider)",
                      borderLeft: "1px solid var(--cg-divider)",
                      width: "20%",
                    }}
                  >
                    {plan}
                    {i === 1 && (
                      <span
                        className="block text-xs font-medium mt-1"
                        style={{
                          color: "var(--cg-primary)",
                          background: "var(--cg-primary-100)",
                          borderRadius: "var(--cg-radius-full)",
                          display: "inline-block",
                          padding: "1px 8px",
                          marginLeft: 8,
                        }}
                      >
                        Popular
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Sections — each is a <tbody> for semantic grouping */}
            {SECTIONS.map((section) => {
              const isOpen = !collapsed.has(section.id);
              return (
                <tbody key={section.id}>
                  {/* Section group header */}
                  <tr>
                    <th
                      scope="rowgroup"
                      colSpan={4}
                      className="text-left"
                      style={{
                        background: "var(--cg-gray-50)",
                        borderTop: "1px solid var(--cg-divider)",
                        padding: 0,
                      }}
                    >
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between text-left cursor-pointer transition-colors"
                        style={{
                          padding: "12px 20px",
                          minHeight: 48,
                        }}
                        aria-expanded={isOpen}
                        aria-controls={`section-${section.id}`}
                      >
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "var(--cg-fg-1)" }}
                        >
                          {section.title}
                        </span>
                        <span
                          className="transition-transform duration-200"
                          style={{
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                            color: "var(--cg-fg-3)",
                            display: "inline-flex",
                          }}
                        >
                          <IconChevronDown />
                        </span>
                      </button>
                    </th>
                  </tr>

                  {/* Feature rows */}
                  {isOpen && section.rows.map((row, ri) => (
                    <tr
                      key={ri}
                      id={ri === 0 ? `section-${section.id}` : undefined}
                      style={{ borderTop: "1px solid var(--cg-divider)" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "var(--cg-gray-50)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "";
                      }}
                    >
                      {/* Feature label — th[scope=row] for screen readers */}
                      <th
                        scope="row"
                        className="text-left text-sm font-normal"
                        style={{
                          padding: "12px 20px",
                          color: "var(--cg-fg-2)",
                          fontWeight: 400,
                          minHeight: 48,
                        }}
                      >
                        {row.label}
                        {row.tooltip && <Tooltip text={row.tooltip} />}
                      </th>

                      <Cell col="standard" value={row.standard} />
                      <Cell col="premium" value={row.premium} />
                      <Cell col="enterprise" value={row.enterprise} />
                    </tr>
                  ))}
                </tbody>
              );
            })}
          </table>
        </div>

        <p
          className="md:hidden mt-4 text-xs text-center"
          style={{ color: "var(--cg-fg-4)" }}
        >
          Scroll right to compare all plans
        </p>
      </div>
    </section>
  );
}
