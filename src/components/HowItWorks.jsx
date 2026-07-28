import React, { useState, useEffect } from 'react';

export default function HowItWorks() {
  const steps = [
    {
      n: '01',
      label: 'connect',
      title: 'Point us at your repo.',
      body: 'Paste a GitHub repo, or drop in your Solana program directory. Anchor, native, Pinocchio. We pull the IDL, dependencies, and build manifest. No agent, no infrastructure.',
      visual: <ConnectVisual />,
    },
    {
      n: '02',
      label: 'scan',
      title: 'We hunt and verify.',
      body: 'A validation engine tuned for Solana semantics surfaces candidate bugs, deduplicates them, and tries to exploit each one with a synthesized PoC. Anything we can’t exploit gets dropped or downgraded — so the bugs you see are bugs we proved.',
      visual: <ScanVisual />,
    },
    {
      n: '03',
      label: 'review',
      title: 'You review real bugs.',
      body: 'Open a short queue of vetted findings, each with a working exploit and a root-cause walk-through. No slog through hundreds of LLM maybes to find the two bugs that actually matter.',
      visual: <ReviewVisual />,
    },
  ];

  return (
    <section id="how" style={{ paddingTop: 112, paddingBottom: 112, borderTop: '1px solid var(--hh-divider)' }}>
      <div className="container">
        <div style={{ marginBottom: 56, maxWidth: 720 }}>
          <span className="pill pill-cyan" style={{ marginBottom: 14 }}>how it works</span>
          <h2 style={{ fontWeight: 300, fontSize: 44, lineHeight: 1.06, letterSpacing: '-0.88px', color: 'var(--hh-text)', margin: '0 0 14px', textWrap: 'balance' }}>
            Three steps. From repo to vetted bugs.
          </h2>
          <p style={{ fontSize: 17, color: 'var(--hh-text-muted)', margin: 0, maxWidth: 560 }}>
            We do not pad your inbox with maybes. The bugs we flag come with proof &mdash; a working exploit and a root-cause walk-through.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {steps.map((s, i) => <StepCard key={i} {...s} />)}
        </div>
      </div>
    </section>
  );
}

function StepCard({ n, label, title, body, visual }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--hh-surface-1)',
        border: `1px solid ${hover ? 'var(--hh-mint-border)' : 'var(--hh-border)'}`,
        borderRadius: 8,
        padding: 0,
        transition: 'all 200ms cubic-bezier(.2,.8,.2,1)',
        boxShadow: hover
          ? '0 30px 45px -30px rgba(0,0,0,0.7), 0 18px 36px -18px rgba(5,8,15,0.6), 0 0 18px rgba(126,255,164,0.10)'
          : '0 1px 2px rgba(0,0,0,0.4)',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div style={{
        height: 180,
        background: 'var(--hh-bg-sunken)',
        borderBottom: '1px solid var(--hh-border)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {visual}
      </div>
      <div style={{ padding: '22px 24px 26px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 11, letterSpacing: '0.10em', color: 'var(--hh-mint)' }}>{n}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 11, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--hh-text-muted)' }}>{label}</span>
        </div>
        <h3 style={{ fontWeight: 400, fontSize: 22, lineHeight: 1.2, letterSpacing: '-0.22px', color: 'var(--hh-text)', margin: '0 0 12px' }}>
          {title}
        </h3>
        <p style={{ fontWeight: 400, fontSize: 14, lineHeight: 1.6, color: 'var(--hh-text-muted)', margin: 0 }}>
          {body}
        </p>
      </div>
    </div>
  );
}

function ConnectVisual() {
  return (
    <div style={{
      position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: 8, padding: 18,
    }}>
      <div style={{
        width: '100%', maxWidth: 280,
        background: 'var(--hh-bg-raised)', border: '1px solid var(--hh-border)', borderRadius: 4,
        padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8,
        fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--hh-text-muted)',
      }}>
        <span style={{ color: 'var(--hh-text-dim)' }}>github.com/</span>
        <span style={{ color: 'var(--hh-text)' }}>orca/withdraw_vault</span>
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--hh-text-dim)', letterSpacing: '0.10em',
      }}>or</div>
      <div style={{
        width: '100%', maxWidth: 280,
        border: '1px dashed var(--hh-border-strong)', borderRadius: 4,
        padding: '12px 14px', textAlign: 'center',
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--hh-text-muted)',
      }}>
        drop ./programs here
      </div>
    </div>
  );
}

function ScanVisual() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(x => (x + 1) % 100), 60);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: 'absolute', inset: 0, padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
      <ScanRow label="analyze program" pct={Math.min(100, tick * 4)} />
      <ScanRow label="find bugs" pct={Math.min(100, Math.max(0, (tick - 8) * 4))} />
      <ScanRow label="deduplicate" pct={Math.min(100, Math.max(0, (tick - 18) * 2.4))} />
      <ScanRow label="verify with poc" pct={Math.min(100, Math.max(0, (tick - 35) * 1.8))} active />
    </div>
  );
}

function ScanRow({ label, pct, active }) {
  const done = pct >= 100;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 10.5 }}>
      <span style={{ color: done ? 'var(--hh-mint)' : (active ? 'var(--hh-cyan)' : 'var(--hh-text-dim)'), width: 12 }}>
        {done ? '✓' : (pct > 0 ? '◐' : '○')}
      </span>
      <span style={{ color: done ? 'var(--hh-text)' : 'var(--hh-text-muted)', width: 100 }}>{label}</span>
      <div style={{ flex: 1, height: 3, background: 'var(--hh-border)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          width: `${pct}%`, height: '100%',
          background: done ? 'var(--hh-mint)' : 'var(--hh-cyan)',
          transition: 'width 80ms linear',
          boxShadow: done ? '0 0 8px rgba(126,255,164,0.5)' : '0 0 6px rgba(103,228,255,0.4)',
        }} />
      </div>
    </div>
  );
}

function ReviewVisual() {
  const items = [
    { id: 'HH-3148', sev: 'critical', sevColor: '#b388ff', title: 'missing signer check' },
    { id: 'HH-3144', sev: 'high',     sevColor: '#ff8a3d', title: 'rounding drains insurance fund' },
    { id: 'HH-3141', sev: 'medium',   sevColor: '#f5b35a', title: 'front-runnable account init' },
  ];
  return (
    <div style={{
      position: 'absolute', inset: 0, padding: 14,
      display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6,
    }}>
      {items.map((it) => (
        <div key={it.id} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '7px 10px', borderRadius: 4,
          background: 'var(--hh-bg-raised)', border: '1px solid var(--hh-border)',
          fontFamily: 'var(--font-mono)', fontSize: 10.5,
          minWidth: 0,
        }}>
          <span style={{ color: 'var(--hh-text-dim)', flexShrink: 0 }}>{it.id}</span>
          <span style={{
            padding: '1px 6px', borderRadius: 3,
            background: `${it.sevColor}1f`, border: `1px solid ${it.sevColor}55`, color: it.sevColor,
            fontSize: 9, fontWeight: 500, letterSpacing: '0.10em', textTransform: 'uppercase',
            flexShrink: 0,
          }}>{it.sev}</span>
          <span style={{
            color: 'var(--hh-text)', flex: 1, minWidth: 0,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{it.title}</span>
          <span style={{
            padding: '1px 6px', borderRadius: 3,
            background: 'rgba(126,255,164,0.10)', border: '1px solid rgba(126,255,164,0.32)', color: 'var(--hh-mint)',
            fontSize: 9, fontWeight: 500, letterSpacing: '0.10em', textTransform: 'uppercase',
            flexShrink: 0,
          }}>poc ✓</span>
        </div>
      ))}
    </div>
  );
}
