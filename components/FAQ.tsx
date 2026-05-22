"use client";

import { useState } from "react";

const FAQS = [
  {
    question: "Is a credit card required for the free trial?",
    answer:
      "No credit card is required. You get full access to your chosen plan for 7 days — completely free. If you decide not to continue, nothing happens. If you want to keep going, you'll add payment at that point.",
  },
  {
    question: "What counts as an AI conversation?",
    answer:
      "One conversation = one complete user exchange with your AI agent (a question and its AI-generated response). Conversations are pooled across all your agents, so a plan with 1,000 conversations/month means 1,000 total across all agents.",
  },
  {
    question: "What happens if I hit my monthly conversation limit?",
    answer:
      "You'll receive a warning notification before you reach your limit — never a surprise overage. Once you hit the limit, new conversations are paused until your billing period resets or you add the Extra Conversations add-on. You're never charged automatically.",
  },
  {
    question: "Can I upgrade my plan mid-month without losing data?",
    answer:
      "Yes. You can upgrade at any time and your agents, content, and conversation history are all preserved. You're only charged the prorated difference for the remainder of the billing period.",
  },
  {
    question: "What does Enterprise pricing typically look like?",
    answer:
      "Enterprise pricing is custom and depends on your usage, team size, and required features. Most Enterprise customers start around $1,500–$5,000/month. Book a 15-minute call with our team and we'll put together a plan that fits your specific outcomes and budget.",
  },
  {
    question: "What is 'knowledge storage' (words stored)?",
    answer:
      "Knowledge storage is the total number of words across all the content your agents have ingested — documents, PDFs, website pages, etc. Standard includes 60M words (~120 full-length books), and Premium includes 300M words (~600 books).",
  },
  {
    question: "Are conversations shared across my agents?",
    answer:
      "Yes. Your monthly conversation quota is shared across all agents in your account, not per agent. This gives you flexibility to allocate usage where it's needed most.",
  },
  {
    question: "Can I remove the 'Powered by CustomGPT' branding?",
    answer:
      "White-label branding (removing the CustomGPT logo and watermark) is available on Premium and Enterprise plans. Standard plan agents display the CustomGPT branding.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "Standard and Premium plans accept major credit cards. Enterprise plans also support wire transfer and ACH billing. All payments are processed securely through Stripe.",
  },
  {
    question: "What is CustomGPT's refund policy?",
    answer:
      "We offer a 7-day free trial so you can fully evaluate the product before committing. After a paid plan starts, refunds are handled on a case-by-case basis. Contact support within 7 days of a charge if you believe an error was made.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<Set<number>>(new Set([0, 1, 2]));

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <section className="py-16 px-6" style={{ borderTop: "1px solid var(--cg-divider)" }}>
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <h2
            style={{ fontSize: 24, fontWeight: 700, color: "var(--cg-fg-1)", letterSpacing: "-0.01em" }}
          >
            Frequently asked questions
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          {FAQS.map((faq, i) => {
            const isOpen = open.has(i);
            return (
              <div
                key={i}
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid var(--cg-divider)" }}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-start justify-between gap-4 px-6 py-4 text-left transition-colors cursor-pointer"
                  style={{ background: isOpen ? "var(--cg-primary-8)" : "var(--cg-bg-card)" }}
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-medium text-sm leading-5"
                    style={{ color: isOpen ? "var(--cg-primary)" : "var(--cg-fg-1)" }}
                  >
                    {faq.question}
                  </span>
                  <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    className="transition-transform duration-200 shrink-0 mt-0.5"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <path
                      d="M4 6l4 4 4-4"
                      stroke={isOpen ? "var(--cg-primary)" : "var(--cg-fg-3)"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {isOpen && (
                  <div
                    className="px-6 pb-5 pt-1 text-sm leading-6"
                    style={{ color: "var(--cg-fg-2)", borderTop: "1px solid var(--cg-primary-16)" }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm" style={{ color: "var(--cg-fg-3)" }}>
            Still have questions?{" "}
            <a href="#" className="font-medium" style={{ color: "var(--cg-primary)" }}>
              Book a 15-min call with an expert →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
