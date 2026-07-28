import React from 'react';

export default function CtaBanner() {
  return (
    <section style={{
      paddingTop: 80, paddingBottom: 80,
      background: 'var(--hh-bg-sunken)',
      borderTop: '1px solid var(--hh-divider)',
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{
            fontWeight: 300,
            fontSize: 40,
            lineHeight: 1.1,
            letterSpacing: '-0.8px',
            color: 'var(--hh-text)',
            margin: '0 0 16px',
            textWrap: 'balance',
          }}>
            Find the exploit before mainnet does.
          </h2>
          <p style={{
            fontSize: 17,
            color: 'var(--hh-text-muted)',
            margin: '0 0 32px',
          }}>
            Drop in your repo. Get verified findings in hours. Skip the AI slop.
          </p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a className="btn btn-primary btn-lg" href="https://app.hackhack.ai" target="_blank" rel="noreferrer" style={{ borderBottom: 'none' }}>Start an audit</a>
            <a className="btn btn-ghost btn-lg" href="https://t.me/robrto" target="_blank" rel="noreferrer" style={{ borderBottom: 'none' }}>Talk to sales</a>
          </div>
        </div>
      </div>
    </section>
  );
}
