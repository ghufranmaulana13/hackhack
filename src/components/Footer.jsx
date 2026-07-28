import React from 'react';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--hh-divider)', paddingTop: 48, paddingBottom: 48, background: 'var(--hh-bg-sunken)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <a style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderBottom: 'none' }} href="#">
            <img src="/assets/duck-logo.svg" alt="" style={{ height: 28, width: 'auto' }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontStyle: 'italic', fontWeight: 500,
              fontSize: 22, letterSpacing: '0.02em', textTransform: 'lowercase',
              color: 'var(--hh-text)', lineHeight: 1,
            }}>
              hack<span style={{ color: 'var(--hh-mint)', textShadow: '0 0 14px rgba(126,255,164,0.45)' }}>hack</span>
            </span>
          </a>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--hh-text-dim)' }}>
            © 2026 Decoy Research Incorporated · made on solana
          </span>
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 18 }}>
          <a href="https://x.com/hackhackai" target="_blank" rel="noopener noreferrer" aria-label="hackhack on X" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 28, height: 28, borderRadius: 4,
            border: '1px solid var(--hh-border)', color: 'var(--hh-text-muted)',
            borderBottom: '1px solid var(--hh-border)',
            transition: 'all 140ms ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--hh-mint)'; e.currentTarget.style.borderColor = 'var(--hh-mint-border)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--hh-text-muted)'; e.currentTarget.style.borderColor = 'var(--hh-border)'; }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--hh-text-dim)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span className="dot dot-mint" />
            all systems normal
          </span>
        </div>
      </div>
    </footer>
  );
}
