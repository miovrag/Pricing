"use client";

import { useState } from "react";

type Billing = "monthly" | "yearly";

interface Addon {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
}

const ADDONS: Addon[] = [
  { id: "queries", name: "Extra conversations", description: "2,500 extra conversations / month", monthlyPrice: 375 },
  { id: "storage", name: "Extra knowledge storage", description: "Add 300M words of storage", monthlyPrice: 300 },
  { id: "documents", name: "Extra files", description: "100,000 extra files / month", monthlyPrice: 100 },
  { id: "agents", name: "Extra agents", description: "25 additional agent slots", monthlyPrice: 100 },
  { id: "seats", name: "Extra team seats", description: "5 additional team member seats", monthlyPrice: 100 },
];

const BASE_PRICES = {
  standard: { monthly: 99, yearly: 89 },
  premium: { monthly: 499, yearly: 449 },
};

/* Tabler ti-alert-triangle */
function IconAlertTriangle() {
  return (
    <svg
      width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="var(--cg-warning-500)"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="shrink-0 mt-1"
      aria-hidden="true"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 9v4" />
      <path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.871l-8.106 -13.534a1.914 1.914 0 0 0 -3.274 0z" />
      <path d="M12 17l.01 0" />
    </svg>
  );
}

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
  const showNudge = basePlan === "standard" && total >= premiumPrice - 20;

  return (
    <section className="py-16 px-6" style={{ background: "var(--cg-gray-50)" }}>
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--cg-fg-1)", letterSpacing: "-0.01em" }}
          >
            Customize your plan with add-ons
          </h2>
          <p className="text-base" style={{ color: "var(--cg-fg-3)" }}>
            Add-ons activate immediately and are billed with your plan.
          </p>
        </div>

        {/* Controls row */}
        <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
          {/* Base plan selector */}
          <div className="flex gap-2" role="group" aria-label="Select base plan">
            {(["standard", "premium"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setBasePlan(p)}
                className="px-4 py-2 text-sm font-medium transition-all cursor-pointer capitalize"
                style={{
                  background: basePlan === p ? "var(--cg-primary)" : "var(--cg-bg-card)",
                  color: basePlan === p ? "var(--cg-fg-on-primary)" : "var(--cg-fg-2)",
                  border: basePlan === p
                    ? "1px solid var(--cg-primary)"
                    : "1px solid var(--cg-gray-200)",
                  borderRadius: "var(--cg-radius-md)",
                }}
                aria-pressed={basePlan === p}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)} base
              </button>
            ))}
          </div>

          {/* Billing toggle */}
          <div
            className="flex gap-1 p-1"
            style={{ background: "var(--cg-gray-200)", borderRadius: "var(--cg-radius-full)" }}
            role="group"
            aria-label="Billing period"
          >
            {(["monthly", "yearly"] as Billing[]).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className="px-4 py-2 text-xs font-medium transition-all cursor-pointer capitalize"
                style={{
                  background: billing === b ? "var(--cg-bg-card)" : "transparent",
                  color: billing === b ? "var(--cg-fg-1)" : "var(--cg-fg-3)",
                  borderRadius: "var(--cg-radius-full)",
                  boxShadow: billing === b ? "var(--cg-shadow-sm)" : "none",
                }}
                aria-pressed={billing === b}
              >
                {b}
                {b === "yearly" && billing === "yearly" && (
                  <span className="ml-2 text-xs" style={{ color: "var(--cg-success-500)" }}>
                    −10%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Add-on cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {ADDONS.map((addon) => {
            const price = billing === "yearly" ? Math.round(addon.monthlyPrice * 0.9) : addon.monthlyPrice;
            const isSelected = selected.has(addon.id);
            return (
              <button
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className="text-left p-5 transition-all cursor-pointer"
                style={{
                  background: isSelected ? "var(--cg-primary-8)" : "var(--cg-bg-card)",
                  border: isSelected
                    ? "1px solid var(--cg-primary)"
                    : "1px solid var(--cg-gray-200)",
                  borderRadius: "var(--cg-radius-xl)",
                  boxShadow: isSelected ? "var(--cg-shadow-cta)" : "var(--cg-shadow-card)",
                }}
                aria-pressed={isSelected}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  {/* Checkbox */}
                  <div
                    className="flex items-center justify-center shrink-0 mt-1"
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "var(--cg-radius-sm)",
                      background: isSelected ? "var(--cg-primary)" : "var(--cg-gray-100)",
                      border: isSelected ? "none" : "1px solid var(--cg-gray-300)",
                    }}
                    aria-hidden="true"
                  >
                    {isSelected && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 12l5 5l10 -10" />
                      </svg>
                    )}
                  </div>
                  {/* Price */}
                  <span
                    className="text-lg font-bold"
                    style={{
                      color: isSelected ? "var(--cg-primary)" : "var(--cg-fg-1)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    ${price}
                    <span className="text-xs font-medium ml-1" style={{ color: "var(--cg-fg-3)" }}>
                      /mo
                    </span>
                  </span>
                </div>
                <p className="text-sm font-semibold mb-1" style={{ color: "var(--cg-fg-1)" }}>
                  {addon.name}
                </p>
                <p className="text-xs" style={{ color: "var(--cg-fg-3)", lineHeight: "16px" }}>
                  {addon.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Total card */}
        <div
          className="p-6"
          style={{
            background: "var(--cg-bg-card)",
            border: "1px solid var(--cg-divider)",
            borderRadius: "var(--cg-radius-xl)",
            boxShadow: "var(--cg-shadow-card)",
          }}
        >
          {/* Premium nudge alert */}
          {showNudge && (
            <div
              className="flex items-start gap-3 p-4 mb-5"
              style={{
                background: "var(--cg-warning-100)",
                border: "1px solid var(--cg-warning-500)",
                borderRadius: "var(--cg-radius-md)",
              }}
              role="alert"
            >
              <IconAlertTriangle />
              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: "var(--cg-fg-1)" }}>
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
              <p
                className="text-xs font-medium mb-1"
                style={{
                  color: "var(--cg-fg-4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Your estimated total
              </p>
              <div className="flex items-end gap-1">
                <span
                  className="text-4xl font-bold"
                  style={{
                    color: "var(--cg-fg-1)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  ${total}
                </span>
                <span className="mb-1 text-sm" style={{ color: "var(--cg-fg-3)" }}>
                  / month
                  {billing === "yearly" && (
                    <span className="ml-1 text-xs" style={{ color: "var(--cg-success-500)" }}>
                      billed annually
                    </span>
                  )}
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
              className="inline-flex items-center px-6 py-3 text-sm font-semibold transition-colors"
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
    </section>
  );
}
