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
      cta: "Build my Enterprise plan",
      href: "#",
    };
  }
  if (agents === "6-25" || branding === "yes") {
    return {
      plan: "Premium",
      reason: "25 agents, 5,000 conversations/month, and white-label branding included.",
      cta: "Start Premium free trial",
      href: "#",
    };
  }
  return {
    plan: "Standard",
    reason: "10 agents, 1,000 conversations/month, and full API access — perfect to start.",
    cta: "Start Standard free trial",
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
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--cg-fg-1)", letterSpacing: "-0.01em" }}
          >
            Not sure which plan fits?
          </h2>
          <p className="text-base" style={{ color: "var(--cg-fg-3)" }}>
            Answer two quick questions and we&apos;ll point you in the right direction.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* Q1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <StepDot number={1} done={agents !== null} />
              <p className="text-sm font-medium" style={{ color: "var(--cg-fg-1)" }}>
                How many AI agents do you need?
              </p>
            </div>
            <div className="flex flex-wrap gap-2" style={{ paddingLeft: 40 }}>
              {(["1-5", "6-25", "25+"] as AgentCount[]).map((opt) => (
                <button
                  key={opt!}
                  onClick={() => setAgents(opt)}
                  className="px-5 py-2 text-sm font-medium transition-all cursor-pointer"
                  style={{
                    background: agents === opt ? "var(--cg-primary)" : "var(--cg-bg-card)",
                    color: agents === opt ? "var(--cg-fg-on-primary)" : "var(--cg-fg-2)",
                    border: agents === opt
                      ? "1px solid var(--cg-primary)"
                      : "1px solid var(--cg-gray-200)",
                    borderRadius: "var(--cg-radius-md)",
                    boxShadow: agents === opt ? "var(--cg-shadow-cta)" : "none",
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Q2 */}
          <div style={{ opacity: agents ? 1 : 0.4, transition: "opacity var(--cg-dur-med)" }}>
            <div className="flex items-center gap-3 mb-4">
              <StepDot number={2} done={branding !== null} />
              <p className="text-sm font-medium" style={{ color: "var(--cg-fg-1)" }}>
                Do you need white-label branding? (Remove CustomGPT logo)
              </p>
            </div>
            <div className="flex flex-wrap gap-2" style={{ paddingLeft: 40 }}>
              {(["no", "yes"] as NeedsBranding[]).map((opt) => (
                <button
                  key={opt!}
                  onClick={() => agents && setBranding(opt)}
                  disabled={!agents}
                  className="px-5 py-2 text-sm font-medium transition-all cursor-pointer disabled:cursor-default"
                  style={{
                    background: branding === opt ? "var(--cg-primary)" : "var(--cg-bg-card)",
                    color: branding === opt ? "var(--cg-fg-on-primary)" : "var(--cg-fg-2)",
                    border: branding === opt
                      ? "1px solid var(--cg-primary)"
                      : "1px solid var(--cg-gray-200)",
                    borderRadius: "var(--cg-radius-md)",
                    boxShadow: branding === opt ? "var(--cg-shadow-cta)" : "none",
                  }}
                >
                  {opt === "no" ? "Not right now" : "Yes, I need it"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendation card */}
        {recommendation && (
          <div
            className="mt-8 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            style={{
              background: "var(--cg-primary-8)",
              border: "1px solid var(--cg-primary-16)",
              borderRadius: "var(--cg-radius-xl)",
            }}
          >
            <div>
              <p
                className="text-xs font-semibold mb-1"
                style={{
                  color: "var(--cg-primary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Recommended
              </p>
              <p
                className="text-lg font-semibold mb-1"
                style={{ color: "var(--cg-fg-1)" }}
              >
                {recommendation.plan} plan
              </p>
              <p className="text-sm" style={{ color: "var(--cg-fg-3)" }}>
                {recommendation.reason}
              </p>
            </div>
            <a
              href={recommendation.href}
              className="inline-flex items-center whitespace-nowrap px-5 py-3 text-sm font-semibold transition-colors shrink-0"
              style={{
                background: "var(--cg-primary)",
                color: "var(--cg-fg-on-primary)",
                borderRadius: "var(--cg-radius-md)",
                boxShadow: "var(--cg-shadow-cta)",
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
      className="flex items-center justify-center shrink-0 text-xs font-bold transition-all"
      style={{
        width: 28,
        height: 28,
        borderRadius: "var(--cg-radius-full)",
        background: done ? "var(--cg-primary)" : "var(--cg-gray-200)",
        color: done ? "var(--cg-fg-on-primary)" : "var(--cg-fg-3)",
      }}
      aria-hidden="true"
    >
      {done ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l5 5l10 -10" />
        </svg>
      ) : (
        number
      )}
    </div>
  );
}
