import React from 'react';

export default function Findings() {
  return (
    <section id="findings" style={{
      paddingTop: 112, paddingBottom: 112,
      background: 'var(--hh-bg-sunken)',
      borderTop: '1px solid var(--hh-divider)',
      borderBottom: '1px solid var(--hh-divider)',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'center' }}>
          <div>
            <span className="pill pill-ruby" style={{ marginBottom: 14 }}>
              <span className="dot" style={{ background: '#e63b4a' }} />critical · arbitrary signer
            </span>
            <h2 style={{ fontWeight: 300, fontSize: 40, lineHeight: 1.08, letterSpacing: '-0.8px', color: 'var(--hh-text)', margin: '0 0 16px', textWrap: 'balance' }}>
              Every bug, proved by exploit.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--hh-text-muted)', margin: '0 0 22px' }}>
              Most AI tools flood your inbox with maybes. We don&rsquo;t. Every bug we flag is paired with a synthesized proof-of-concept that runs against your program and a root-cause walk-through. Anything we can&rsquo;t exploit gets dropped or downgraded to a note &mdash; so the bugs you review are bugs we proved.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--hh-text-muted)' }}>
              <div><span style={{ color: 'var(--hh-mint)' }}>›</span> proof-of-concept exploit, verified</div>
              <div><span style={{ color: 'var(--hh-mint)' }}>›</span> detailed root-cause walk-through</div>
              <div><span style={{ color: 'var(--hh-mint)' }}>›</span> context-aware to your program</div>
              <div><span style={{ color: 'var(--hh-mint)' }}>›</span> Solana primitive + CWE</div>
            </div>
            <div style={{ marginTop: 28, padding: '14px 16px', border: '1px solid var(--hh-border)', borderRadius: 6, background: 'rgba(126,255,164,0.04)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--hh-mint)', marginBottom: 6 }}>signal, not slop</div>
              <div style={{ fontWeight: 300, fontSize: 24, color: 'var(--hh-text)', lineHeight: 1.2 }}>Stop wading through AI noise.</div>
              <div style={{ fontSize: 13, color: 'var(--hh-text-muted)', marginTop: 6 }}>
                Our validation engine drops any candidate that can&rsquo;t produce a working PoC. The list you see is the list of bugs worth your time.
              </div>
            </div>
          </div>
          <FindingCard />
        </div>
      </div>
    </section>
  );
}

function FindingCard() {
  return (
    <div style={{
      background: '#02050a',
      border: '1px solid var(--hh-border)',
      borderRadius: 8,
      overflow: 'hidden',
      boxShadow: '0 30px 60px -20px rgba(0,0,0,0.75), 0 14px 28px -14px rgba(0,0,0,0.5)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid var(--hh-border)', background: 'var(--hh-surface-1)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--hh-text)' }}>
          <span style={{ color: 'var(--hh-text-dim)' }}>HH-3148 ·</span> withdraw_vault/src/lib.rs
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          <span className="pill pill-mint">poc ✓</span>
          <span className="pill pill-ruby">
            <span className="dot" style={{ background: '#e63b4a' }} /> critical
          </span>
        </div>
      </div>

      {/* Vulnerable code */}
      <div style={{ padding: '12px 16px 4px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--hh-text-dim)' }}>vulnerable</span>
      </div>
      <div style={{
        margin: 0, padding: '8px 16px 16px',
        fontFamily: "'Source Code Pro', var(--font-mono)", fontWeight: 500, fontSize: 12.5, lineHeight: 1.85,
        color: 'var(--hh-text)',
      }}>
        <Line n="34"><K>#[derive(Accounts)]</K></Line>
        <Line n="35"><K>pub struct</K> <T>Withdraw</T>{`<'info> {`}</Line>
        <Line n="36" hl>{`    `}<S c="#5d6f8a" italic>{'// authority is never constrained as a signer'}</S></Line>
        <Line n="37" hl>{`    #[`}<S c="#7effa4">account</S>{`(mut)]`}</Line>
        <Line n="38" hl>{`    `}<K>pub</K>{` vault: `}<T>Account</T>{`<'info, `}<T>Vault</T>{`>,`}</Line>
        <Line n="39">{`    `}<K>pub</K>{` authority: `}<T>AccountInfo</T>{`<'info>,`}</Line>
        <Line n="40">{`    `}<K>pub</K>{` token_program: `}<T>Program</T>{`<'info, `}<T>Token</T>{`>,`}</Line>
        <Line n="41">{`}`}</Line>
      </div>

      {/* Root cause */}
      <div style={{ borderTop: '1px solid var(--hh-border)', padding: '12px 16px 4px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--hh-mint)' }}>root cause</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--hh-text-dim)' }}>cwe-862 · solana/signer</span>
      </div>
      <div style={{
        margin: 0, padding: '4px 16px 16px',
        fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 12.5, lineHeight: 1.55,
        color: 'var(--hh-text-muted)',
      }}>
        <code style={{ background: 'var(--hh-surface-2)', padding: '1px 5px', borderRadius: 3, color: 'var(--hh-cyan)', fontSize: 11.5 }}>authority</code> is declared as <code style={{ background: 'var(--hh-surface-2)', padding: '1px 5px', borderRadius: 3, color: 'var(--hh-cyan)', fontSize: 11.5 }}>AccountInfo</code>, which performs no signer check. Anchor only enforces the signer constraint when the field is typed <code style={{ background: 'var(--hh-surface-2)', padding: '1px 5px', borderRadius: 3, color: 'var(--hh-mint)', fontSize: 11.5 }}>Signer</code> or bound by <code style={{ background: 'var(--hh-surface-2)', padding: '1px 5px', borderRadius: 3, color: 'var(--hh-mint)', fontSize: 11.5 }}>has_one</code>. The <code style={{ background: 'var(--hh-surface-2)', padding: '1px 5px', borderRadius: 3, color: 'var(--hh-mint)', fontSize: 11.5 }}>#[account(mut)]</code> macro does not, so any account can be supplied as the withdrawal authority and drain the vault.
      </div>

      {/* PoC */}
      <div style={{ borderTop: '1px solid var(--hh-border)', padding: '12px 16px 4px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--hh-cyan)' }}>proof-of-concept</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--hh-text-dim)' }}>tests/poc/HH-3148.ts</span>
      </div>
      <div style={{
        margin: 0, padding: '8px 16px 16px',
        fontFamily: "'Source Code Pro', var(--font-mono)", fontWeight: 500, fontSize: 12, lineHeight: 1.85,
        color: 'var(--hh-text)',
      }}>
        <Line n="12">{`  `}<K>const</K>{` attacker = `}<T>Keypair</T>{`.generate();`}</Line>
        <Line n="13">{`  `}<K>await</K>{` program.methods.`}<S c="#7effa4">withdraw</S>{`(`}<S c="#f5b35a">amount</S>{`)`}</Line>
        <Line n="14">{`    .accounts({ vault, authority: attacker.publicKey })`}</Line>
        <Line n="15">{`    .rpc(); `}<S c="#5d6f8a" italic>{'// drained without victim signature'}</S></Line>
      </div>

      <div style={{ borderTop: '1px solid var(--hh-border)', padding: '12px 16px', background: 'rgba(126,255,164,0.04)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--hh-mint)' }}>verified ✓</span>
        <span style={{ fontFamily: "'Source Code Pro', var(--font-mono)", fontSize: 12, color: 'var(--hh-text-muted)' }}>
          exploit lands in 0.42s · vault drained
        </span>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--hh-cyan)', cursor: 'pointer' }}>open finding →</span>
      </div>
    </div>
  );
}

function Line({ n, hl, children }) {
  return (
    <div style={{
      display: 'block',
      background: hl ? 'rgba(230,59,74,0.16)' : 'transparent',
      borderLeft: hl ? '2px solid #e63b4a' : '2px solid transparent',
      paddingLeft: 8, marginLeft: -10,
      whiteSpace: 'pre',
      overflow: 'hidden',
    }}>
      <span style={{ color: '#3b4b6a', display: 'inline-block', width: 28, userSelect: 'none' }} className="hh-tabular">{n}</span>
      {children}
    </div>
  );
}

function K({ children }) { return <span style={{ color: '#b388ff' }}>{children}</span>; }
function T({ children }) { return <span style={{ color: '#67e4ff' }}>{children}</span>; }
function S({ c, italic, children }) { return <span style={{ color: c, fontStyle: italic ? 'italic' : 'normal' }}>{children}</span>; }
