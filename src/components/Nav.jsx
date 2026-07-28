import React, { useState, useEffect } from 'react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkStyle = {
    fontFamily: 'var(--font-sans)',
    fontWeight: 500,
    fontSize: 14,
    color: 'var(--hh-text-muted)',
    cursor: 'pointer',
    padding: '6px 4px',
    transition: 'color 140ms',
    borderBottom: 'none',
  };

  const scroll = (id) => () => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: scrolled ? 'rgba(5,8,15,0.78)' : 'rgba(5,8,15,0.55)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: scrolled ? '1px solid var(--hh-border)' : '1px solid transparent',
      transition: 'all 200ms ease',
    }}>
      <div className="container" style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <a style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', borderBottom: 'none' }} href="#">
            <img src="/assets/duck-logo.svg" alt="hackhack logo" style={{ height: 28, width: 'auto' }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: 22,
              letterSpacing: '0.02em',
              textTransform: 'lowercase',
              color: 'var(--hh-text)',
              lineHeight: 1,
            }}>
              hack<span style={{ color: 'var(--hh-mint)', textShadow: '0 0 14px rgba(126,255,164,0.45)' }}>hack</span>
            </span>
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginLeft: 16 }}>
            <a onClick={scroll('how')} style={linkStyle}>How it works</a>
            <a onClick={scroll('findings')} style={linkStyle}>Findings</a>
            <a onClick={scroll('pricing')} style={linkStyle}>Pricing</a>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a className="btn btn-ghost btn-sm" href="https://app.hackhack.ai" target="_blank" rel="noreferrer" style={{ borderBottom: 'none' }}>Sign in</a>
          <a className="btn btn-primary btn-sm" href="https://app.hackhack.ai" target="_blank" rel="noreferrer" style={{ borderBottom: 'none' }}>Start an audit →</a>
        </div>
      </div>
    </nav>
  );
}
