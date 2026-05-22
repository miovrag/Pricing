"use client";

import { useState } from "react";

type Billing = "monthly" | "yearly";

interface Addon {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  unit: string;
}

const ADDONS: Addon[] = [
  { id: "queries", name: "Extra conversations", description: "2,500 extra AI conversations / month", monthlyPrice: 375, unit: "2,500 convos" },
  { id: "storage", name: "Extra knowledge storage", description: "Add 300M words of storage", monthlyPrice: 300, unit: "300M words" },
  { id: "documents", name: "Extra files", description: "100,000 extra files / month", monthlyPrice: 100, unit: "100K files" },
  { id: "agents", name: "Extra agents", description: "25 additional agent slots", monthlyPrice: 100, unit: "25 agents" },
  { id: "seats", name: "Extra team seats", description: "5 additional team member seats", monthlyPrice: 100, unit: "5 seats" },
];

const BASE_PRICES = {
  standard: { monthly: 99, yearly: 89 },
  premium: { monthly: 499, yearly: 449 },
};

export default function AddonsCalculator() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [basePlan, setBasePlan] = useState<"standard" | "premium">("standard");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleAddon = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const basePrice = BASE_PRICES[basePlan][billing];
  const addonTotal = Array.from(selected).reduce((sum, id) => {
    const addon = ADDONS.find((a) => a.id === id);
    if (!addon) return sum;
    return sum + (billing === "yearly" ? Math.round(addon.monthlyPrice * 0.9) : addon.monthlyPrice);
  }, 0);
  const total = basePrice + addonTotal;

  const premiumPrice = BASE_PRICES.premium[billing];
  const showPremiumNudge = basePlan === "standard" && total >= premiumPrice - 20;

  return (
    <section className="py-16 px-6" style={{ background: "var(--cg-gray-50)" }}>
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h2
            className="mb-2"
            style={{ fontSize: 24, fontWeight: 700, color: "var(--cg-fg-1)", letterSpacing: "-0.01em" }}
          >
            Customize your plan with add-ons
          </h2>
          <p style={{ color: "var(--cg-fg-3)", fontSize: 15 }}>
            Add-ons activate immediately and are billed with your plan.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
          {/* Base plan picker */}
          <div className="flex gap-2">
            {(["standard", "premium"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setBasePlan(p)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer capitalize"
                style={{
                  background: basePlan === p ? "var(--cg-primary)" : "var(--cg-bg-card)",
                  color: basePlan === p ? "#fff" : "var(--cg-fg-2)",
                  border: basePlan === p ? "1.5px solid var(--cg-primary)" : "1.5px solid var(--cg-gray-200)",
                }}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)} base
              </button>
            ))}
          </div>

          {/* Billing toggle */}
          <div className="flex gap-1 rounded-full p-1" style={{ background: "var(--cg-gray-200)" }}>
            {(["monthly", "yearly"] as Billing[]).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className="px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer capitalize"
                style={{
                  background: billing === b ? "#fff" : "transparent",
                  color: billing === b ? "var(--cg-fg-1)" : "var(--cg-fg-3)",
                  boxShadow: billing === b ? "var(--cg-shadow-sm)" : "none",
                }}
              >
                {b}
                {b === "yearly" && billing === "yearly" && (
                  <span className="ml-1.5 text-xs" style={{ color: "var(--cg-success-500)" }}>−10%</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Add-on cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {ADDONS.map((addon) => {
            const price = billing === "yearly" ? Math.round(addon.monthlyPrice * 0.9) : addon.monthlyPrice;
            const isSelected = selected.has(addon.id);
            return (
              <button
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className="text-left p-5 rounded-xl transition-all duration-150 cursor-pointer"
                style={{
                  background: isSelected ? "var(--cg-primary-8)" : "var(--cg-bg-card)",
                  border: isSelected ? "1.5px solid var(--cg-primary)" : "1.5px solid var(--cg-gray-200)",
                  boxShadow: isSelected ? "var(--cg-primary-shadow-sm)" : "var(--cg-shadow-card)",
                }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center transition-all mt-0.5 shrink-0"
                    style={{
                      background: isSelected ? "var(--cg-primary)" : "var(--cg-gray-100)",
                      border: isSelected ? "none" : "1.5px solid var(--cg-gray-300)",
                    }}
                  >
                    {isSelected && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span
                    className="font-bold text-lg"
                    style={{ color: isSelected ? "var(--cg-primary)" : "var(--cg-fg-1)" }}
                  >
                    ${price}
                    <span className="text-xs font-medium ml-0.5" style={{ color: "var(--cg-fg-3)" }}>/mo</span>
                  </span>
                </div>
                <p className="font-semibold text-sm mb-1" style={{ color: "var(--cg-fg-1)" }}>
                  {addon.name}
                </p>
                <p className="text-xs leading-4" style={{ color: "var(--cg-fg-3)" }}>
                  {addon.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Total + nudge */}
        <div
          className="rounded-xl p-6"
          style={{
            background: "var(--cg-bg-card)",
            border: "1px solid var(--cg-divider)",
            boxShadow: "var(--cg-shadow-card)",
          }}
        >
          {showPremiumNudge && (
            <div
              className="flex items-start gap-3 p-4 rounded-lg mb-5"
              style={{ background: "var(--cg-warning-100)", border: "1px solid var(--cg-warning-500)" }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 mt-0.5">
                <path d="M9 1.5L16.5 15H1.5L9 1.5z" fill="var(--cg-warning-100)" stroke="var(--cg-warning-500)" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M9 7v4M9 13v.5" stroke="var(--cg-warning-500)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--cg-fg-1)" }}>
                  Consider upgrading to Premium at ${premiumPrice}/mo
                </p>
                <p className="text-xs" style={{ color: "var(--cg-fg-3)" }}>
                  Your current total is close to Premium pricing — and Premium also includes white-label branding, more agents, and 5× more conversations.
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs font-medium mb-1" style={{ color: "var(--cg-fg-4)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Your estimated total
              </p>
              <div className="flex items-end gap-1">
                <span
                  className="font-bold"
                  style={{ fontSize: 36, color: "var(--cg-fg-1)", letterSpacing: "-0.03em", lineHeight: 1 }}
                >
                  ${total}
                </span>
                <span className="mb-1 text-sm" style={{ color: "var(--cg-fg-3)" }}>
                  / month
                  {billing === "yearly" && <span className="ml-1 text-xs" style={{ color: "var(--cg-success-500)" }}>billed annually</span>}
                </span>
              </div>
              {selected.size > 0 && (
                <p className="text-xs mt-1" style={{ color: "var(--cg-fg-4)" }}>
                  {basePlan.charAt(0).toUpperCase() + basePlan.slice(1)} ${basePrice} + {selected.size} add-on{selected.size > 1 ? "s" : ""} ${addonTotal}
                </p>
              )}
            </div>
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 rounded-lg text-sm font-semibold transition-colors"
              style={{
                background: "var(--cg-primary)",
                color: "#fff",
                boxShadow: "var(--cg-primary-shadow-sm)",
              }}
            >
              Start Free Trial →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
