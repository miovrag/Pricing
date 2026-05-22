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
        className="mb-4"
        style={{
          fontSize: "clamp(24px, 3.5vw, 36px)",
          fontWeight: 700,
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
          className="inline-flex items-center px-7 py-3.5 rounded-lg text-sm font-semibold transition-all"
          style={{
            background: "#fff",
            color: "var(--cg-primary)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          }}
        >
          Start my free trial →
        </a>
        <a
          href="#"
          className="inline-flex items-center px-7 py-3.5 rounded-lg text-sm font-semibold transition-all"
          style={{
            background: "transparent",
            color: "#fff",
            border: "1.5px solid rgba(255,255,255,0.45)",
          }}
        >
          Talk to sales about enterprise
        </a>
      </div>
    </section>
  );
}
