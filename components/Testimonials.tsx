const TESTIMONIALS = [
  {
    quote:
      "The AI chatbot is trained on all of our business information and content, and it understands our customers' needs and preferences like no human ever could.",
    name: "Venkat Kolluri",
    role: "CEO",
    company: "Cidewalk",
    initials: "VK",
  },
  {
    quote:
      "We needed a Generative AI platform that would provide trustworthy responses based on our own content, without any hallucination problems.",
    name: "Doug Williams",
    role: "Product Lead",
    company: "Martin Trust Center for MIT Entrepreneurship",
    initials: "DW",
  },
  {
    quote:
      "Our team is now able to provide personalized and informed recommendations to customers, leading to increased sales and customer satisfaction.",
    name: "Mike Moloney",
    role: "Founder",
    company: "FilterGrade",
    initials: "MM",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--cg-primary)" }}
          >
            Customer stories
          </p>
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--cg-fg-1)", letterSpacing: "-0.01em" }}
          >
            Trusted by teams who ship AI fast
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-5"
              style={{
                padding: "24px",
                background: "var(--cg-bg-card)",
                border: "1px solid var(--cg-divider)",
                borderRadius: "var(--cg-radius-xl)",
                boxShadow: "var(--cg-shadow-card)",
              }}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.75l-3.09 1.76.59-3.44L2 4.635l3.455-.505L7 1z"
                      fill="var(--cg-warning-500)"
                    />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p
                className="flex-1 text-sm leading-6"
                style={{ color: "var(--cg-fg-2)", fontStyle: "italic" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
                  style={{ background: "var(--cg-primary-100)", color: "var(--cg-primary)" }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--cg-fg-1)" }}>
                    {t.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--cg-fg-3)" }}>
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
