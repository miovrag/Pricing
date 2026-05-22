export default function FooterCTA() {
  return (
    <section
      className="py-20 px-6 text-center"
      style={{ background: "var(--cg-grad-primary)" }}
    >
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-3"
        style={{ color: "rgba(255,255,255,0.65)" }}
      >
        Ready to start?
      </p>
      <h2
        className="text-3xl font-bold mb-4"
        style={{
          color: "#fff",
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
        }}
      >
        Launch your first AI agent today.
      </h2>
      <p className="mb-8 text-base" style={{ color: "rgba(255,255,255,0.75)" }}>
        7-day free trial &nbsp;·&nbsp; No credit card &nbsp;·&nbsp; Cancel anytime
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href="#"
          className="inline-flex items-center px-7 py-4 text-sm font-semibold transition-all"
          style={{
            background: "#fff",
            color: "var(--cg-primary)",
            borderRadius: "var(--cg-radius-md)",
            boxShadow: "var(--cg-shadow-default)",
          }}
        >
          Start free trial
        </a>
        <a
          href="#"
          className="inline-flex items-center px-7 py-4 text-sm font-semibold transition-all"
          style={{
            background: "transparent",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.45)",
            borderRadius: "var(--cg-radius-md)",
          }}
        >
          Talk to sales about Enterprise
        </a>
      </div>
    </section>
  );
}
