"use client";

import { useState } from "react";

type AgentCount = "1-5" | "6-25" | "25+" | null;
type NeedsBranding = "no" | "yes" | null;

interface Recommendation {
  plan: string;
  reason: string;
  cta: string;
  href: string;
}

function getRecommendation(agents: AgentCount, branding: NeedsBranding): Recommendation | null {
  if (!agents || !branding) return null;
  if (agents === "25+") {
    return {
      plan: "Enterprise",
      reason: "Custom limits on agents, conversations, and files — plus dedicated engineering support.",
      cta: "Build My Enterprise Plan →",
      href: "#",
    };
  }
  if (agents === "6-25" || branding === "yes") {
    return {
      plan: "Premium",
      reason: "25 agents, 5,000 conversations/month, and white-label branding included.",
      cta: "Start Premium Free Trial →",
      href: "#",
    };
  }
  return {
    plan: "Standard",
    reason: "10 agents, 1,000 conversations/month, and full API access — perfect to start.",
    cta: "Start Standard Free Trial →",
    href: "#",
  };
}

export default function HelpMeChoose() {
  const [agents, setAgents] = useState<AgentCount>(null);
  const [branding, setBranding] = useState<NeedsBranding>(null);
  const recommendation = getRecommendation(agents, branding);

  return (
    <section className="py-16 px-6" style={{ background: "var(--cg-gray-50)" }}>
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <h2
            className="mb-2"
            style={{ fontSize: 24, fontWeight: 700, color: "var(--cg-fg-1)", letterSpacing: "-0.01em" }}
          >
            Not sure which plan fits?
          </h2>
          <p style={{ color: "var(--cg-fg-3)", fontSize: 15 }}>
            Answer two quick questions and we'll point you in the right direction.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* Q1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <StepDot number={1} done={agents !== null} />
              <p className="font-medium" style={{ color: "var(--cg-fg-1)", fontSize: 15 }}>
                How many AI agents do you need?
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pl-10">
              {(["1-5", "6-25", "25+"] as AgentCount[]).map((opt) => (
                <button
                  key={opt!}
                  onClick={() => setAgents(opt)}
                  className="px-5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer"
                  style={{
                    background: agents === opt ? "var(--cg-primary)" : "var(--cg-bg-card)",
                    color: agents === opt ? "#fff" : "var(--cg-fg-2)",
                    border: agents === opt ? "1.5px solid var(--cg-primary)" : "1.5px solid var(--cg-gray-200)",
                    boxShadow: agents === opt ? "var(--cg-primary-shadow-sm)" : "none",
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Q2 */}
          <div style={{ opacity: agents ? 1 : 0.4, transition: "opacity 200ms" }}>
            <div className="flex items-center gap-3 mb-4">
              <StepDot number={2} done={branding !== null} />
              <p className="font-medium" style={{ color: "var(--cg-fg-1)", fontSize: 15 }}>
                Do you need white-label branding? (Remove CustomGPT logo)
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pl-10">
              {(["no", "yes"] as NeedsBranding[]).map((opt) => (
                <button
                  key={opt!}
                  onClick={() => agents && setBranding(opt)}
                  disabled={!agents}
                  className="px-5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer disabled:cursor-default"
                  style={{
                    background: branding === opt ? "var(--cg-primary)" : "var(--cg-bg-card)",
                    color: branding === opt ? "#fff" : "var(--cg-fg-2)",
                    border: branding === opt ? "1.5px solid var(--cg-primary)" : "1.5px solid var(--cg-gray-200)",
                    boxShadow: branding === opt ? "var(--cg-primary-shadow-sm)" : "none",
                  }}
                >
                  {opt === "no" ? "Not right now" : "Yes, I need it"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendation */}
        {recommendation && (
          <div
            className="mt-8 p-6 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            style={{
              background: "var(--cg-primary-8)",
              border: "1.5px solid var(--cg-primary-16)",
            }}
          >
            <div>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--cg-primary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Recommended
              </p>
              <p className="font-semibold mb-1" style={{ color: "var(--cg-fg-1)", fontSize: 17 }}>
                {recommendation.plan} plan
              </p>
              <p className="text-sm" style={{ color: "var(--cg-fg-3)" }}>
                {recommendation.reason}
              </p>
            </div>
            <a
              href={recommendation.href}
              className="inline-flex items-center whitespace-nowrap px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shrink-0"
              style={{
                background: "var(--cg-primary)",
                color: "#fff",
                boxShadow: "var(--cg-primary-shadow-sm)",
              }}
            >
              {recommendation.cta}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function StepDot({ number, done }: { number: number; done: boolean }) {
  return (
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-all"
      style={{
        background: done ? "var(--cg-primary)" : "var(--cg-gray-200)",
        color: done ? "#fff" : "var(--cg-fg-3)",
      }}
    >
      {done ? (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        number
      )}
    </div>
  );
}
