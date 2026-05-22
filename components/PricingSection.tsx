"use client";

import { useState, useEffect, useRef } from "react";

type Billing = "monthly" | "yearly";

interface Plan {
  id: string;
  name: string;
  tagline: string;
  monthly: number | null;
  yearly: number | null;
  badge?: string;
  highlight?: boolean;
  features: { text: string; note?: string }[];
  cta: string;
  ctaSecondary?: string;
  ctaHref: string;
  trustNote?: string;
}

const PLANS: Plan[] = [
  {
    id: "standard",
    name: "Standard",
    tagline: "Essential tools to launch your AI strategy.",
    monthly: 99,
    yearly: 89,
    features: [
      { text: "10 AI agents" },
      { text: "1,000 conversations / month" },
      { text: "5,000 files per agent" },
      { text: "60M words knowledge storage" },
      { text: "3 team members" },
      { text: "Developer / RAG API" },
    ],
    cta: "Start free trial",
    ctaHref: "#",
    trustNote: "No credit card required · Cancel anytime",
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Advanced AI functionality and scalability.",
    monthly: 499,
    yearly: 449,
    badge: "Most Popular",
    highlight: true,
    features: [
      { text: "25 AI agents" },
      { text: "5,000 conversations / month" },
      { text: "20,000 files per agent" },
      { text: "300M words knowledge storage" },
      { text: "5 team members" },
      { text: "Auto-sync website content" },
      { text: "White-label branding", note: "Remove CustomGPT logo" },
    ],
    cta: "Start free trial",
    ctaHref: "#",
    trustNote: "No credit card required · Cancel anytime",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Your dedicated AI partner for achieving business outcomes.",
    monthly: null,
    yearly: null,
    features: [
      { text: "Custom limits on agents, convos & files" },
      { text: "Forward-deployed engineers" },
      { text: "Bespoke AI agent design & development" },
      { text: "Dedicated Solutions Engineering & Account Team" },
      { text: "Enterprise-grade SSO, RBAC & DPA" },
      { text: "White-glove onboarding & training" },
      { text: "Automated real-time data sync" },
    ],
    cta: "Build my plan",
    ctaSecondary: "Talk to sales",
    ctaHref: "#",
    trustNote: "Custom pricing · Typically $1,500–$5,000/mo",
  },
];

/* Tabler ti-circle-check variant for feature lists */
function FeatureCheck({ onPrimary }: { onPrimary?: boolean }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24"
      fill="none"
      stroke={onPrimary ? "rgba(255,255,255,0.9)" : "var(--cg-success-500)"}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="shrink-0 mt-0.5"
      aria-hidden="true"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </svg>
  );
}

export default function PricingSection() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [stickyVisible, setStickyVisible] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px" }
    );
    if (cardsRef.current) obs.observe(cardsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="text-center pt-16 pb-10 px-6">
        <h1
          className="text-4xl font-bold mb-3"
          style={{ color: "var(--cg-fg-1)", letterSpacing: "-0.02em", lineHeight: 1.2 }}
        >
          Pick your plan. Launch your first AI agent today.
        </h1>
        <p className="text-base mb-8" style={{ color: "var(--cg-fg-3)", lineHeight: "24px" }}>
          7-day free trial &nbsp;·&nbsp; No credit card required &nbsp;·&nbsp; Cancel anytime
        </p>

        {/* Billing toggle */}
        <div
          className="inline-flex items-center rounded-full p-1 gap-1"
          style={{ background: "var(--cg-gray-100)" }}
          role="group"
          aria-label="Billing period"
        >
          {(["monthly", "yearly"] as Billing[]).map((b) => (
            <button
              key={b}
              onClick={() => setBilling(b)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer"
              style={{
                background: billing === b ? "var(--cg-bg-card)" : "transparent",
                color: billing === b ? "var(--cg-fg-1)" : "var(--cg-fg-3)",
                boxShadow: billing === b ? "var(--cg-shadow-sm)" : "none",
              }}
              aria-pressed={billing === b}
            >
              {b === "monthly" ? "Monthly" : "Yearly"}
              {b === "yearly" && (
                <span
                  className="ml-2 px-2 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: "var(--cg-success-100)",
                    color: "var(--cg-success-500)",
                    borderRadius: "var(--cg-radius-full)",
                  }}
                >
                  Save 10%
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Plan cards */}
      <section ref={cardsRef} className="pb-12 px-6">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} billing={billing} />
          ))}
        </div>
      </section>

      {/* Sticky footer bar — appears after cards scroll out */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40"
        style={{
          background: "var(--cg-bg-card)",
          borderTop: "1px solid var(--cg-divider)",
          boxShadow: "var(--cg-shadow-default)",
          transform: stickyVisible ? "translateY(0)" : "translateY(100%)",
          transition: "transform var(--cg-dur-med) var(--cg-ease-out)",
          pointerEvents: stickyVisible ? "auto" : "none",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between gap-4">
          <span className="text-sm font-medium" style={{ color: "var(--cg-fg-2)" }}>
            Ready to get started?
          </span>
          <div className="flex items-center gap-3">
            <a href="#" className="text-sm font-medium" style={{ color: "var(--cg-fg-3)" }}>
              Talk to sales
            </a>
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-semibold transition-colors"
              style={{
                background: "var(--cg-primary)",
                color: "var(--cg-fg-on-primary)",
                borderRadius: "var(--cg-radius-md)",
                boxShadow: "var(--cg-shadow-cta)",
              }}
            >
              Start free trial
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const price = billing === "monthly" ? plan.monthly : plan.yearly;
  const h = plan.highlight;

  return (
    <div
      className="relative flex flex-col p-8 transition-all duration-200"
      style={{
        background: h ? "var(--cg-primary)" : "var(--cg-bg-card)",
        border: h ? "none" : "1px solid var(--cg-divider)",
        borderRadius: "var(--cg-radius-xl)",
        boxShadow: h ? "var(--cg-primary-shadow-lg)" : "var(--cg-shadow-card)",
      }}
    >
      {/* Most Popular badge */}
      {plan.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span
            className="px-4 py-1 text-xs font-semibold whitespace-nowrap"
            style={{
              background: "var(--cg-fg-on-primary)",
              color: "var(--cg-primary)",
              borderRadius: "var(--cg-radius-full)",
            }}
          >
            {plan.badge}
          </span>
        </div>
      )}

      {/* Plan name & tagline */}
      <div className="mb-6">
        <h2
          className="text-lg font-semibold mb-1"
          style={{ color: h ? "var(--on-primary)" : "var(--cg-fg-1)" }}
        >
          {plan.name}
        </h2>
        <p
          className="text-sm"
          style={{ color: h ? "var(--on-primary-muted)" : "var(--cg-fg-3)", lineHeight: "20px" }}
        >
          {plan.tagline}
        </p>
      </div>

      {/* Price */}
      <div className="mb-8">
        {price !== null ? (
          <>
            <div className="flex items-end gap-1">
              <span
                className="text-4xl font-bold leading-none"
                style={{
                  color: h ? "var(--on-primary)" : "var(--cg-fg-1)",
                  letterSpacing: "-0.03em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                ${price}
              </span>
              <span
                className="mb-1 text-sm font-medium"
                style={{ color: h ? "var(--on-primary-muted)" : "var(--cg-fg-3)" }}
              >
                / mo
              </span>
            </div>
            {billing === "yearly" && (
              <p className="mt-1 text-xs" style={{ color: h ? "var(--on-primary-subtle)" : "var(--cg-fg-4)" }}>
                Billed annually
              </p>
            )}
          </>
        ) : (
          <div
            className="text-3xl font-bold"
            style={{ color: "var(--cg-fg-1)", letterSpacing: "-0.02em" }}
          >
            Custom
          </div>
        )}
      </div>

      {/* Feature list */}
      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <FeatureCheck onPrimary={h} />
            <span style={{ color: h ? "var(--on-primary-body)" : "var(--cg-fg-2)" }}>
              {f.text}
              {f.note && (
                <span
                  className="ml-1 text-xs"
                  style={{ color: h ? "var(--on-primary-subtle)" : "var(--cg-fg-4)" }}
                >
                  ({f.note})
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      {/* CTAs */}
      <div className="flex flex-col gap-2">
        <a
          href={plan.ctaHref}
          className="w-full py-3 px-4 text-sm font-semibold text-center transition-all"
          style={{
            borderRadius: "var(--cg-radius-md)",
            ...(h
              ? {
                  background: "var(--cg-fg-on-primary)",
                  color: "var(--cg-primary)",
                  boxShadow: "var(--cg-shadow-sm)",
                }
              : {
                  background: "var(--cg-primary)",
                  color: "var(--cg-fg-on-primary)",
                  boxShadow: "var(--cg-shadow-cta)",
                }),
          }}
        >
          {plan.cta}
        </a>
        {plan.ctaSecondary && (
          <a
            href="#"
            className="w-full py-3 px-4 text-sm font-medium text-center transition-colors"
            style={{
              background: "transparent",
              color: "var(--cg-fg-3)",
              border: "1px solid var(--cg-gray-200)",
              borderRadius: "var(--cg-radius-md)",
            }}
          >
            {plan.ctaSecondary}
          </a>
        )}
        {plan.trustNote && (
          <p
            className="text-center text-xs mt-1"
            style={{ color: h ? "var(--on-primary-subtle)" : "var(--cg-fg-4)" }}
          >
            {plan.trustNote}
          </p>
        )}
      </div>
    </div>
  );
}
