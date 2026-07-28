import React from 'react';

export default function Pricing() {
  const tiers = [
    {
      name: 'Full audit',
      price: '$5k',
      cadence: 'per audit',
      blurb: 'A complete audit of your protocol.',
      cta: 'Start an audit',
      ctaStyle: 'btn-primary',
      ctaHref: 'https://app.hackhack.ai',
      features: [
        'All severities, with root-cause analysis',
        'Verified PoC for medium and above',
        'Re-scan after fixes (additional fee)',
        'Signed report (PDF + on-chain)',
        '10% off your next Accretion audit (up to $5k)',
      ],
      featured: true,
    },
    {
      name: 'Custom',
      price: 'Talk to us',
      cadence: '',
      blurb: 'Protocols, exchanges, custodians.',
      cta: 'Contact sales',
      ctaStyle: 'btn-ghost',
      ctaHref: 'https://t.me/robrto',
      features: [
        'Recurring runs',
        'Human support by senior auditors',
        'Audits across multiple programs',
        'Remediation help — we help design the fix',
        'Fix review — we audit your patches',
      ],
      featured: false,
    },
  ];

  return (
    <section id="pricing" style={{ paddingTop: 112, paddingBottom: 112 }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <span className="pill pill-mint" style={{ marginBottom: 14 }}>pricing</span>
          <h2 style={{ fontWeight: 300, fontSize: 44, lineHeight: 1.06, letterSpacing: '-0.88px', color: 'var(--hh-text)', margin: '0 0 14px', textWrap: 'balance' }}>
            One price. No retainer.
          </h2>
          <p style={{ fontSize: 17, color: 'var(--hh-text-muted)', maxWidth: 560, margin: '0 auto' }}>
            A full audit runs $20k to $200k or more, and takes weeks. Ours runs in hours, and credits toward your next one.
          </p>
        </div>

        {/* Comparison strip */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 0,
          maxWidth: 720, margin: '0 auto 56px',
          border: '1px solid var(--hh-border)', borderRadius: 8,
          background: 'var(--hh-surface-1)',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '20px 24px', borderRight: '1px solid var(--hh-border)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--hh-text-dim)', marginBottom: 8 }}>
              full firm audit
            </div>
            <div style={{ fontWeight: 300, fontSize: 28, color: 'var(--hh-text-muted)', lineHeight: 1 }} className="hh-tabular">
              $20k&ndash;$200k+
            </div>
            <div style={{ fontSize: 13, color: 'var(--hh-text-dim)', marginTop: 8 }}>
              weeks &middot; scheduling backlog
            </div>
          </div>
          <div style={{ padding: '20px 24px', background: 'rgba(126,255,164,0.04)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--hh-mint)', marginBottom: 8 }}>
              hackhack ai audit
            </div>
            <div style={{ fontWeight: 300, fontSize: 28, color: 'var(--hh-text)', lineHeight: 1 }} className="hh-tabular">
              $5k <span style={{ fontSize: 13, color: 'var(--hh-text-muted)', marginLeft: 4 }}>flat</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--hh-text-muted)', marginTop: 8 }}>
              hours
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, maxWidth: 760, margin: '0 auto' }}>
          {tiers.map((t, i) => <Tier key={i} {...t} />)}
        </div>

        <div style={{
          maxWidth: 720, margin: '40px auto 0',
          padding: '20px 24px',
          border: '1px solid var(--hh-border)',
          borderRadius: 8,
          background: 'var(--hh-surface-1)',
          display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap',
        }}>
          <img src="/assets/accretion.svg" alt="Accretion" style={{ height: 22, opacity: 0.95 }} />
          <div style={{ width: 1, alignSelf: 'stretch', background: 'var(--hh-divider)' }} />
          <div style={{ flex: '1 1 320px', minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--hh-mint)', marginBottom: 4 }}>
              partner
            </div>
            <div style={{ fontSize: 14, color: 'var(--hh-text)', lineHeight: 1.5 }}>
              We partner with Accretion, a reputable Solana auditing firm. Every paid hackhack audit comes with 10% off an Accretion engagement, up to $5k. For most teams that covers the entire hackhack audit.
            </div>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: 32, fontSize: 13, color: 'var(--hh-text-dim)' }}>
          Bill in USDC if you&rsquo;d rather. We don&rsquo;t haggle. The duck doesn&rsquo;t either.
        </p>
      </div>
    </section>
  );
}

function Tier({ name, price, cadence, blurb, cta, ctaStyle, ctaHref, features, featured }) {
  return (
    <div className={featured ? 'card card-featured' : 'card'} style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '28px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 11, letterSpacing: '0.10em', textTransform: 'uppercase', color: featured ? 'var(--hh-mint)' : 'var(--hh-text-muted)' }}>
          {name}
        </span>
        {featured && <span className="pill pill-mint">most popular</span>}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, minHeight: 44 }}>
        <span style={{ fontWeight: 300, fontSize: 40, letterSpacing: '-0.8px', color: 'var(--hh-text)', lineHeight: 1 }} className="hh-tabular">{price}</span>
        {cadence && <span style={{ fontSize: 14, color: 'var(--hh-text-muted)' }}>{cadence}</span>}
      </div>
      <p style={{ fontSize: 14, color: 'var(--hh-text-muted)', margin: 0 }}>{blurb}</p>
      <a className={`btn ${ctaStyle}`} href={ctaHref} target="_blank" rel="noreferrer" style={{ marginTop: 4, borderBottom: 'none', justifyContent: 'center' }}>
        {cta}
      </a>
      <hr style={{ margin: '4px 0 0', borderTop: '1px solid var(--hh-divider)' }} />
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {features.map((f, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--hh-text)', lineHeight: 1.4 }}>
            <span style={{ color: 'var(--hh-mint)', marginTop: 1 }}>✓</span>{f}
          </li>
        ))}
      </ul>
    </div>
  );
}
