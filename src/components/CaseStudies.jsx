import React, { useState } from 'react';

export default function CaseStudies() {
  const cases = [
    {
      protocol: 'Ellipsis (Phoenix)',
      logo: '/assets/ellipsis.svg',
      tag: 'critical',
      tagColor: '#e63b4a',
      headline: 'Critical bug on Phoenix.',
      body: 'A missing account check let an attacker steal funds from other users.',
      meta: 'disclosed Q1 2026',
    },
    {
      protocol: 'Squads',
      logo: '/assets/squads.svg',
      tag: 'bounty',
      tagColor: '#7effa4',
      headline: 'Bounty on the Squads smart account program.',
      body: 'Multiple issues in the smart account program allowed bypasses of invariants.',
      meta: 'disclosed Q2 2026',
    },
    {
      protocol: 'Jupiter',
      logo: '/assets/jupiter.svg',
      tag: 'bounty',
      tagColor: '#7effa4',
      headline: 'DoS in Jupiter borrow/lend.',
      body: 'A denial-of-service issue allowing an attacker to lock users in their borrow/lend positions.',
      meta: 'disclosed Q1 2026',
    },
  ];
  return (
    <section style={{
      paddingTop: 96, paddingBottom: 96,
      borderTop: '1px solid var(--hh-divider)',
    }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 40, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 600 }}>
            <span className="pill pill-mint" style={{ marginBottom: 14 }}>real findings</span>
            <h2 style={{ fontWeight: 300, fontSize: 40, lineHeight: 1.06, letterSpacing: '-0.8px', color: 'var(--hh-text)', margin: 0, textWrap: 'balance' }}>
              Bugs we&rsquo;ve already found, on protocols you know.
            </h2>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {cases.map((c, i) => <CaseCard key={i} {...c} />)}
        </div>
      </div>
    </section>
  );
}

function CaseCard({ protocol, logo, tag, tagColor, headline, body, meta }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--hh-surface-1)',
        border: `1px solid ${hover ? 'var(--hh-mint-border)' : 'var(--hh-border)'}`,
        borderRadius: 8,
        padding: '24px 24px 22px',
        display: 'flex', flexDirection: 'column', gap: 14,
        transition: 'all 200ms cubic-bezier(.2,.8,.2,1)',
        boxShadow: hover
          ? '0 30px 45px -30px rgba(0,0,0,0.7), 0 18px 36px -18px rgba(5,8,15,0.6), 0 0 18px rgba(126,255,164,0.10)'
          : '0 1px 2px rgba(0,0,0,0.4)',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          {logo && (
            <span style={{
              width: 28, height: 28, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(235,243,255,0.05)', border: '1px solid var(--hh-border)', borderRadius: 4,
              flexShrink: 0,
            }}>
              <img src={logo} alt="" style={{ maxWidth: 18, maxHeight: 18, objectFit: 'contain' }} />
            </span>
          )}
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 12, color: 'var(--hh-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{protocol}</span>
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase',
          padding: '2px 8px', borderRadius: 3,
          background: `${tagColor}1f`, border: `1px solid ${tagColor}55`, color: tagColor,
          display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0,
        }}>
          <span className="dot" style={{ background: tagColor, boxShadow: `0 0 6px ${tagColor}` }} />
          {tag}
        </span>
      </div>
      <h3 style={{ fontWeight: 400, fontSize: 19, lineHeight: 1.25, letterSpacing: '-0.18px', color: 'var(--hh-text)', margin: 0 }}>
        {headline}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--hh-text-muted)', margin: 0 }}>
        {body}
      </p>
      <div style={{ marginTop: 'auto', paddingTop: 6, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--hh-text-dim)' }}>
        {meta}
      </div>
    </div>
  );
}
