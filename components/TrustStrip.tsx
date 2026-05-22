export default function TrustStrip() {
  return (
    <section className="py-6 px-6" style={{ borderBottom: "1px solid var(--cg-divider)" }}>
      <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-center gap-6 md:gap-10">
        <TrustItem
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" fill="var(--cg-success-100)" stroke="var(--cg-success-500)" strokeWidth="1.5" />
              <path d="M9 12l2 2 4-4" stroke="var(--cg-success-500)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
          label="SOC 2 Compliant"
        />
        <TrustItem
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="4" fill="var(--cg-primary-100)" />
              <text x="5" y="17" fontSize="10" fontWeight="700" fill="var(--cg-primary)" fontFamily="Inter,sans-serif">GDPR</text>
            </svg>
          }
          label="GDPR Ready"
        />
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.5l1.854 3.756 4.146.603-3 2.924.708 4.131L8 10.875l-3.708 1.95.708-4.13L2 5.859l4.146-.603L8 1.5z" fill="#FF9F43" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-medium" style={{ color: "var(--cg-fg-2)" }}>
            4.8 on G2
          </span>
        </div>
        <TrustItem
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z" fill="var(--cg-primary-100)" />
              <path d="M8 12l2.5 2.5L16 9" stroke="var(--cg-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
          label="Cancel anytime"
        />
        <TrustItem
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="6" width="20" height="13" rx="2" fill="var(--cg-primary-100)" />
              <path d="M2 10h20" stroke="var(--cg-primary)" strokeWidth="1.5" />
              <rect x="5" y="13" width="4" height="2.5" rx="1" fill="var(--cg-primary)" opacity=".6" />
            </svg>
          }
          label="No credit card for trial"
        />
      </div>
    </section>
  );
}

function TrustItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-sm font-medium" style={{ color: "var(--cg-fg-2)" }}>
        {label}
      </span>
    </div>
  );
}
