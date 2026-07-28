import React, { useState, useEffect, useRef } from 'react';

export default function Hero() {
  return (
    <section className="dot-grid mint-glow-bg" style={{ position: 'relative', overflow: 'hidden', paddingTop: 88, paddingBottom: 96 }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Headline block */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: 760, margin: '0 auto 56px' }}>
          <h1 style={{
            fontWeight: 300,
            fontSize: 64,
            lineHeight: 1.02,
            letterSpacing: '-1.6px',
            color: 'var(--hh-text)',
            margin: '0 0 22px',
            textWrap: 'balance',
          }}>
            AI audits that find <span style={{ color: 'var(--hh-mint)', textShadow: '0 0 22px rgba(126,255,164,0.45)' }}>real bugs.</span><br />
            In hours, not weeks.
          </h1>
          <p style={{
            fontWeight: 300,
            fontSize: 19,
            lineHeight: 1.55,
            color: 'var(--hh-text-muted)',
            maxWidth: 560,
            margin: '0 0 32px',
            textWrap: 'balance',
          }}>
            We audit Solana programs in hours, not weeks. Anchor, native, Pinocchio. Every bug we flag is proved by a working exploit &mdash; so you skip the AI slop and only review real bugs.
          </p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a className="btn btn-primary btn-lg" href="https://app.hackhack.ai" target="_blank" rel="noreferrer" style={{ borderBottom: 'none' }}>Start an audit</a>
            <button className="btn btn-ghost btn-lg" onClick={() => {
              const el = document.getElementById('pricing');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}>View pricing</button>
          </div>
        </div>
      </div>

      {/* Dashboard mock — wider than container; auto-scales to fit viewport */}
      <ScaleFrame designWidth={1240}>
        <DashboardMock />
      </ScaleFrame>
    </section>
  );
}

function ScaleFrame({ designWidth, children }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [innerH, setInnerH] = useState(0);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const outer = outerRef.current;
        const inner = innerRef.current;
        if (!outer || !inner) return;
        const availW = outer.clientWidth;
        const s = Math.min(1, availW / designWidth);
        const h = inner.offsetHeight;
        setScale(s);
        setInnerH(h);
      });
    };
    measure();
    window.addEventListener('resize', measure);
    const t1 = setTimeout(measure, 200);
    const t2 = setTimeout(measure, 800);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1); clearTimeout(t2);
      window.removeEventListener('resize', measure);
    };
  }, [designWidth]);

  return (
    <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
      <div ref={outerRef} style={{ width: '100%' }}>
        <div style={{ height: innerH ? innerH * scale : undefined, overflow: 'hidden' }}>
          <div
            ref={innerRef}
            style={{
              width: designWidth,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

const SEV_COLOR = {
  critical: '#b388ff',
  high:     '#ff8a3d',
  medium:   '#f5b35a',
  low:      '#7effa4',
};

const FINDINGS = [
  { n: 12, sev: 'critical', poc: true, title: 'Missing mint check on deposit allows depositing fake collateral', impact: 'fund-loss' },
  { n: 9,  sev: 'critical', poc: true, title: 'Rounding error in fee distribution allows draining the insurance fund', impact: 'fund-loss' },
  { n: 7,  sev: 'high',     poc: true, title: 'Cross margin transfer skips the maintenance margin check', impact: 'fund-loss' },
  { n: 5,  sev: 'high',     poc: true, title: 'PDA derivation is not validated when generating settlement receipts', impact: 'integrity' },
  { n: 3,  sev: 'medium',   poc: true, title: 'Position open can be denial-of-serviced by front-running the create_account', impact: 'availability' },
];

function DashboardMock() {
  const [activeTab, setActiveTab] = useState('all');
  const [active, setActive] = useState(0);

  const tabCounts = {
    all: 21, unreviewed: 21, critical: 2, high: 3, medium: 5, low: 9, info: 2, report: 21, excluded: 0,
  };

  return (
    <div style={{
      background: 'var(--hh-bg-raised)',
      border: '1px solid var(--hh-border)',
      borderRadius: 10,
      overflow: 'hidden',
      boxShadow: '0 60px 120px -40px rgba(0,0,0,0.85), 0 30px 60px -20px rgba(0,0,0,0.6), 0 0 60px rgba(126,255,164,0.06)',
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '56px 1fr',
    }}>
      <Rail />
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <HeaderStrip />
        <StatsRow />
        <ReviewProgress counts={tabCounts} />
        <FilterStrip active={activeTab} setActive={setActiveTab} counts={tabCounts} />
        <ListAndDetail active={active} setActive={setActive} />
      </div>
    </div>
  );
}

function Rail() {
  return (
    <div style={{
      borderRight: '1px solid var(--hh-border)',
      background: 'var(--hh-bg-sunken)',
      padding: '16px 0',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
    }}>
      <img src="/assets/duck-logo.svg" alt="" style={{ height: 32, width: 'auto', marginBottom: 14 }} />
      <RailItem icon="+" label="new" />
      <RailItem icon="≡" label="audits" active />
      <RailItem icon="$" label="billing" />
      <div style={{ marginTop: 'auto', width: 28, height: 28, borderRadius: '50%', background: 'var(--hh-surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--hh-text)' }}>n</div>
    </div>
  );
}

function RailItem({ icon, label, active }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
      padding: '8px 4px', borderRadius: 6, cursor: 'pointer',
      background: active ? 'rgba(126,255,164,0.10)' : 'transparent',
      border: active ? '1px solid rgba(126,255,164,0.24)' : '1px solid transparent',
      width: 44,
    }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: active ? 'var(--hh-mint)' : 'var(--hh-text-muted)' }}>{icon}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.10em', textTransform: 'uppercase', color: active ? 'var(--hh-mint)' : 'var(--hh-text-dim)' }}>{label}</span>
    </div>
  );
}

function HeaderStrip() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '16px 22px',
      borderBottom: '1px solid var(--hh-border)',
    }}>
      <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 17, color: 'var(--hh-text)' }}>perp-dex</span>
      <button style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '4px 10px', borderRadius: 4,
        background: 'transparent', border: '1px solid var(--hh-border)',
        fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--hh-text-muted)', cursor: 'pointer',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }}>✎</span> Rename
      </button>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '4px 10px', borderRadius: 4,
        background: 'rgba(126,255,164,0.10)', border: '1px solid rgba(126,255,164,0.32)',
        fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--hh-mint)',
      }}>
        <Pulse /> ai audit running
      </span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--hh-text-dim)' }}>
        Created May 12, 2026 · 7:57 PM
      </span>
      <button style={{
        marginLeft: 'auto',
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '5px 12px', borderRadius: 4,
        background: 'transparent', border: '1px solid var(--hh-border)',
        fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--hh-text)', cursor: 'pointer',
      }}>
        ← All audits
      </button>
    </div>
  );
}

function Pulse() {
  return (
    <span style={{
      width: 6, height: 6, borderRadius: '50%', background: '#7effa4',
      boxShadow: '0 0 0 0 rgba(126,255,164,0.6)',
      animation: 'hh-pulse 1.6s ease-out infinite',
    }} />
  );
}

function StatsRow() {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '120px 120px 1fr',
      gap: 28,
      padding: '22px 22px 24px',
      borderBottom: '1px solid var(--hh-border)',
      alignItems: 'center',
    }}>
      <RiskRing score={48} grade="D" />
      <IssuesDonut total={21} counts={{ critical: 2, high: 3, medium: 5, low: 9 }} />
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px 28px',
      }}>
        <Meta label="commit"        value="4e2cd11" mono link />
        <Meta label="repository"    value="perp-dex-main.zip" />
        <Meta label="source archive" value="perp-dex-main.zip" />
        <Meta label="programs"      value="perp" />
        <Meta label="compiled"      value="perp.so" />
        <Meta label="framework"     value="Anchor 0.30" />
      </div>
    </div>
  );
}

function Meta({ label, value, mono, link }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--hh-text-dim)' }}>{label}</span>
      <span style={{
        fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
        fontSize: 13,
        color: link ? 'var(--hh-cyan)' : 'var(--hh-text)',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>{value}</span>
    </div>
  );
}

function useTween(target, duration = 1200, delay = 200) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    let start = 0;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start - delay;
      if (elapsed < 0) { raf = requestAnimationFrame(tick); return; }
      const t = Math.min(1, elapsed / duration);
      setV(target * ease(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, delay]);
  return v;
}

function RiskRing({ score, grade }) {
  const color = score < 40 ? '#b388ff' : score < 70 ? '#f5b35a' : '#7effa4';
  const r = 38, c = 2 * Math.PI * r;
  const animScore = useTween(score, 1300, 200);
  const pct = animScore / 100;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{ position: 'relative', width: 96, height: 96 }}>
        <svg width="96" height="96" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r={r} fill="none" stroke="var(--hh-border)" strokeWidth="4" />
          <circle
            cx="48" cy="48" r={r} fill="none" stroke={color} strokeWidth="4"
            strokeDasharray={`${c * pct} ${c}`} strokeLinecap="round"
            transform="rotate(-90 48 48)"
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 0,
        }}>
          <span style={{ fontWeight: 300, fontSize: 30, color: color, lineHeight: 1, fontFamily: 'var(--font-mono)', fontStyle: 'italic' }}>{animScore > score - 0.5 ? grade : ''}</span>
          <span className="hh-tabular" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--hh-text-dim)', marginTop: 2 }}>{Math.round(animScore)} / 100</span>
        </div>
      </div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color }}>critical</span>
    </div>
  );
}

function IssuesDonut({ total, counts }) {
  const segs = [
    { v: counts.critical, c: '#b388ff' },
    { v: counts.high,     c: '#ff8a3d' },
    { v: counts.medium,   c: '#f5b35a' },
    { v: counts.low,      c: '#7effa4' },
  ];
  const r = 38, c = 2 * Math.PI * r;
  const sum = segs.reduce((a, s) => a + s.v, 0);
  const p = useTween(1, 1300, 350);

  let cursorFull = 0;
  const dashed = segs.map((s) => {
    const fullLen = (s.v / sum) * c;
    const fullStart = cursorFull;
    cursorFull += fullLen;

    const fillTo = p * c;
    let visibleLen = 0;
    if (fillTo > fullStart) {
      visibleLen = Math.min(fullLen, fillTo - fullStart);
    }
    const dash = `${visibleLen} ${c - visibleLen}`;
    const offset = -fullStart;
    return { ...s, dash, offset };
  });

  const animTotal = Math.round(useTween(total, 1100, 350));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{ position: 'relative', width: 96, height: 96 }}>
        <svg width="96" height="96" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r={r} fill="none" stroke="var(--hh-border)" strokeWidth="6" />
          {dashed.map((s, i) => (
            <circle
              key={i} cx="48" cy="48" r={r} fill="none" stroke={s.c} strokeWidth="6"
              strokeDasharray={s.dash} strokeDashoffset={s.offset}
              transform="rotate(-90 48 48)"
              style={{ filter: `drop-shadow(0 0 3px ${s.c})` }}
            />
          ))}
        </svg>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 0,
        }}>
          <span style={{ fontWeight: 300, fontSize: 26, color: 'var(--hh-text)', lineHeight: 1, fontFamily: 'var(--font-mono)' }} className="hh-tabular">{animTotal}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hh-text-dim)', marginTop: 4 }}>issues</span>
        </div>
      </div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hh-text-dim)' }}>by severity</span>
    </div>
  );
}

function ReviewProgress({ counts }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '14px 22px',
      borderBottom: '1px solid var(--hh-border)',
      background: 'rgba(5,8,15,0.3)',
    }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--hh-text-dim)' }}>review progress</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--hh-text)' }} className="hh-tabular">
        0 <span style={{ color: 'var(--hh-text-dim)' }}>/ 21 reviewed ·</span> <span style={{ color: 'var(--hh-orange)' }}>21 open</span>
      </span>
      <div style={{ flex: 1, height: 4, background: 'var(--hh-border)', borderRadius: 2, position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '0%', background: 'var(--hh-mint)', borderRadius: 2 }} />
      </div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--hh-text-dim)' }} className="hh-tabular">0%</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 11 }} className="hh-tabular">
        <span style={{ color: SEV_COLOR.critical }}>{counts.critical} C</span>
        <span style={{ color: SEV_COLOR.high }}>{counts.high} H</span>
        <span style={{ color: SEV_COLOR.medium }}>{counts.medium} M</span>
        <span style={{ color: SEV_COLOR.low }}>{counts.low} L</span>
      </span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--hh-text-muted)' }}>21 in report</span>
      <button style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '5px 12px', borderRadius: 4,
        background: 'transparent', border: '1px solid var(--hh-border)',
        fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--hh-text)', cursor: 'pointer',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }}>↓</span> Download JSON
      </button>
      <button className="btn btn-primary btn-sm">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }}>≡</span> Generate report
      </button>
    </div>
  );
}

function FilterStrip({ active, setActive, counts }) {
  const tabs = [
    { k: 'all',        l: 'All',        n: counts.all,        color: '#7effa4' },
    { k: 'unreviewed', l: 'Unreviewed', n: counts.unreviewed },
    { k: 'critical',   l: 'Critical',   n: counts.critical,   color: SEV_COLOR.critical },
    { k: 'high',       l: 'High',       n: counts.high,       color: SEV_COLOR.high },
    { k: 'medium',     l: 'Medium',     n: counts.medium,     color: SEV_COLOR.medium },
    { k: 'low',        l: 'Low',        n: counts.low,        color: SEV_COLOR.low },
    { k: 'report',     l: 'In report',  n: counts.report },
    { k: 'excluded',   l: 'Excluded',   n: counts.excluded },
  ];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '12px 22px',
      borderBottom: '1px solid var(--hh-border)',
    }}>
      {tabs.map((t) => (
        <button key={t.k} onClick={() => setActive(t.k)} style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '5px 11px', borderRadius: 999,
          background: active === t.k ? 'rgba(126,255,164,0.10)' : 'rgba(235,243,255,0.03)',
          border: '1px solid ' + (active === t.k ? 'rgba(126,255,164,0.32)' : 'var(--hh-border)'),
          fontFamily: 'var(--font-sans)', fontSize: 12, color: active === t.k ? 'var(--hh-text)' : 'var(--hh-text-muted)',
          cursor: 'pointer',
        }}>
          {t.color && <span className="dot" style={{ background: t.color, boxShadow: `0 0 5px ${t.color}` }} />}
          <span>{t.l}</span>
          <span className="hh-tabular" style={{ color: 'var(--hh-text-dim)' }}>· {t.n}</span>
        </button>
      ))}
      <div style={{
        marginLeft: 'auto',
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '5px 10px', borderRadius: 4,
        background: 'var(--hh-bg-sunken)', border: '1px solid var(--hh-border)',
        minWidth: 160,
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--hh-text-dim)' }}>⌕</span>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--hh-text-dim)' }}>Search title…</span>
      </div>
    </div>
  );
}

function ListAndDetail({ active, setActive }) {
  const cur = FINDINGS[active] || FINDINGS[0];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: 360 }}>
      <div style={{ borderRight: '1px solid var(--hh-border)', padding: 14, display: 'flex', flexDirection: 'column', gap: 8, background: 'rgba(5,8,15,0.2)' }}>
        {FINDINGS.map((f, i) => (
          <IssueCard key={f.n} finding={f} active={i === active} onClick={() => setActive(i)} />
        ))}
      </div>
      <IssueDetail finding={cur} />
    </div>
  );
}

function IssueCard({ finding, active, onClick }) {
  const color = SEV_COLOR[finding.sev];
  return (
    <div
      onClick={onClick}
      style={{
        background: active ? 'var(--hh-surface-2)' : 'var(--hh-surface-1)',
        border: `1px solid ${active ? 'var(--hh-mint-border)' : 'var(--hh-border)'}`,
        borderRadius: 6,
        padding: '12px 14px',
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column', gap: 8,
        boxShadow: active ? '0 0 0 1px rgba(126,255,164,0.18) inset' : 'none',
        transition: 'all 120ms ease',
        opacity: active ? 1 : 0.85,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--hh-text-dim)' }}>#{finding.n}</span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 500, letterSpacing: '0.10em', textTransform: 'uppercase',
            padding: '2px 7px', borderRadius: 3,
            background: `${color}1f`, border: `1px solid ${color}55`, color,
          }}>{finding.sev}</span>
        </div>
        {finding.poc && (
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 500, letterSpacing: '0.10em', textTransform: 'uppercase',
            padding: '2px 7px', borderRadius: 3,
            background: 'rgba(126,255,164,0.10)', border: '1px solid rgba(126,255,164,0.32)', color: 'var(--hh-mint)',
          }}>
            ✓ poc
          </span>
        )}
      </div>
      <div style={{ fontSize: 12.5, color: 'var(--hh-text)', lineHeight: 1.4 }}>
        {finding.title}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--hh-text-dim)' }}>
        impact: {finding.impact}
      </div>
    </div>
  );
}

function IssueDetail({ finding }) {
  const color = SEV_COLOR[finding.sev];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', minHeight: 0 }}>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '14px 18px', gap: 12, borderRight: '1px solid var(--hh-border)', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--hh-text-dim)', flexShrink: 0 }}>#{finding.n}</span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 500, letterSpacing: '0.10em', textTransform: 'uppercase',
            padding: '2px 7px', borderRadius: 3,
            background: `${color}1f`, border: `1px solid ${color}55`, color, flexShrink: 0,
          }}>{finding.sev}</span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 500, letterSpacing: '0.10em', textTransform: 'uppercase',
            padding: '2px 7px', borderRadius: 3,
            background: 'rgba(126,255,164,0.10)', border: '1px solid rgba(126,255,164,0.32)', color: 'var(--hh-mint)',
            flexShrink: 0,
          }}>
            ✓ poc confirmed
          </span>
          <button style={{
            marginLeft: 'auto',
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '4px 9px', borderRadius: 4,
            background: 'transparent', border: '1px solid var(--hh-border)',
            fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--hh-text-muted)', cursor: 'pointer',
            whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            ⧉ Copy as text
          </button>
        </div>
        <h3 style={{ fontWeight: 400, fontSize: 16, lineHeight: 1.3, letterSpacing: '-0.1px', color: 'var(--hh-text)', margin: 0 }}>
          {finding.title}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <Chip label="impact" value="fund loss" />
          <Chip label="likelihood" value="high" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'nowrap', minWidth: 0 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hh-text-dim)', marginRight: 4, flexShrink: 0 }}>triage</span>
          <TriageBtn label="✓ Confirm" />
          <TriageBtn label="⚑ Flag" />
          <TriageBtn label="✕ Invalid" />
          <TriageBtn label="◌ Exclude" />
        </div>
        <Section label="summary">
          <code style={{ background: 'var(--hh-surface-2)', padding: '1px 5px', borderRadius: 3, color: 'var(--hh-mint)', fontSize: 11.5 }}>deposit</code> credits the caller&rsquo;s margin balance one-to-one with the transferred amount, but never asserts that <code style={{ background: 'var(--hh-surface-2)', padding: '1px 5px', borderRadius: 3, color: 'var(--hh-cyan)', fontSize: 11.5 }}>deposit_mint</code> equals the protocol&rsquo;s configured collateral mint. An attacker can create a worthless SPL token and deposit any amount to obtain real margin credit, then borrow or open positions against it.
        </Section>
      </div>
      <CodePanel />
    </div>
  );
}

function Chip({ label, value }) {
  return (
    <div style={{
      padding: '8px 12px', borderRadius: 4,
      background: 'var(--hh-bg-sunken)', border: '1px solid var(--hh-border)',
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hh-text-dim)' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--hh-text)', marginTop: 2 }}>{value}</div>
    </div>
  );
}

function TriageBtn({ label }) {
  return (
    <button style={{
      padding: '4px 10px', borderRadius: 4,
      background: 'var(--hh-bg-sunken)', border: '1px solid var(--hh-border)',
      fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--hh-text-muted)', cursor: 'pointer',
      whiteSpace: 'nowrap',
    }}>{label}</button>
  );
}

function Section({ label, children }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hh-text-dim)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12.5, lineHeight: 1.55, color: 'var(--hh-text-muted)' }}>{children}</div>
    </div>
  );
}

function CodePanel() {
  return (
    <div style={{ background: 'var(--hh-bg-sunken)', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 14px', borderBottom: '1px solid var(--hh-border)',
        background: 'var(--hh-surface-1)',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--hh-cyan)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          programs/perp/src/instructions/deposit.rs:64-82
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--hh-text-dim)' }}>open</span>
      </div>
      <div style={{
        padding: '12px 0',
        fontFamily: "'Source Code Pro', var(--font-mono)", fontWeight: 500, fontSize: 11.5, lineHeight: 1.85,
        color: 'var(--hh-text)',
        overflow: 'hidden',
      }}>
        <Cmt n={64}>{'// programs/perp/src/instructions/deposit.rs'}</Cmt>
        <Cmt n={65}>{'// ── Accounts ──────────────────────────'}</Cmt>
        <Code n={66}><K>if</K> !<V>depositor_info</V>.<F>is_signer</F> {'{'}</Code>
        <Code n={67}>{'  '}<K>return</K> <T>Err</T>(<T>PerpError</T>::<F>AccountNotSigner</F>.<F>into</F>());</Code>
        <Code n={68}>{'}'}</Code>
        <Code n={69}> </Code>
        <Code n={70} hl><K>let</K> mint = <T>Mint</T>::<F>try_from</F>(<V>deposit_mint_info</V>)?;</Code>
        <Code n={71} hl><K>let</K> mut margin = <T>MarginAccount</T>::<F>load_mut</F>(<V>margin_info</V>)?;</Code>
        <Code n={72}> </Code>
        <Cmt n={73}>{'// ── Transfer in (mint never checked) ─'}</Cmt>
        <Code n={74}><K>let</K> cpi = <T>CpiContext</T>::<F>new</F>(token_program, <T>Transfer</T> {'{'}</Code>
        <Code n={75}>{'  '}from: depositor_token_account,</Code>
        <Code n={76}>{'  '}to: vault_token_account,</Code>
        <Code n={77}>{'  '}authority: depositor_info,</Code>
        <Code n={78}>{'}'});</Code>
        <Code n={79}><T>token</T>::<F>transfer</F>(cpi, args.amount)?;</Code>
        <Code n={80}> </Code>
        <Code n={81}>margin.balance = margin.balance</Code>
        <Code n={82}>{'  '}.<F>checked_add</F>(args.amount).<F>ok_or</F>(<T>PerpError</T>::<F>MathOverflow</F>)?;</Code>
      </div>
    </div>
  );
}

function Code({ n, hl, children }) {
  return (
    <div style={{
      display: 'block',
      background: hl ? 'rgba(179,136,255,0.10)' : 'transparent',
      borderLeft: hl ? '2px solid #b388ff' : '2px solid transparent',
      paddingLeft: 10, paddingRight: 14,
      whiteSpace: 'pre',
      overflow: 'hidden',
    }}>
      <span style={{ color: '#3b4b6a', display: 'inline-block', width: 26, userSelect: 'none' }} className="hh-tabular">{n}</span>
      {children}
    </div>
  );
}

function Cmt({ n, children }) {
  return (
    <div style={{ display: 'block', paddingLeft: 10, paddingRight: 14, whiteSpace: 'pre', overflow: 'hidden' }}>
      <span style={{ color: '#3b4b6a', display: 'inline-block', width: 26, userSelect: 'none' }} className="hh-tabular">{n}</span>
      <span style={{ color: '#5d6f8a', fontStyle: 'italic' }}>{children}</span>
    </div>
  );
}

function K({ children }) { return <span style={{ color: '#b388ff' }}>{children}</span>; }
function T({ children }) { return <span style={{ color: '#67e4ff' }}>{children}</span>; }
function F({ children }) { return <span style={{ color: '#7effa4' }}>{children}</span>; }
function V({ children }) { return <span style={{ color: 'var(--hh-text)' }}>{children}</span>; }
