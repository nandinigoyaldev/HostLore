'use client';
import { useState } from 'react';

const DEMO_URLS = [
  { url: 'google.com', label: 'Google' },
  { url: 'github.com', label: 'GitHub' },
  { url: 'vercel.com', label: 'Vercel' },
];

function simulateTimings(url) {
  const base = 30 + Math.random() * 100;
  return {
    dns: Math.round(15 + Math.random() * 45),
    tcp: Math.round(10 + Math.random() * 30),
    tls: Math.round(8 + Math.random() * 25),
    ttfb: Math.round(base),
    download: Math.round(20 + Math.random() * 80),
  };
}

export default function LiveDemo() {
  const [customUrl, setCustomUrl] = useState('');
  const [timings, setTimings] = useState(null);
  const [running, setRunning] = useState(false);

  async function runTest(url) {
    const target = url || customUrl;
    if (!target) return;
    setRunning(true);
    setTimings(null);

    const steps = ['dns', 'tcp', 'tls', 'ttfb', 'download'];
    const result = {};
    const total = simulateTimings(target);

    for (const step of steps) {
      await new Promise(r => setTimeout(r, 200 + Math.random() * 300));
      result[step] = { value: total[step], done: step === 'dns' || step === 'tcp' || step === 'tls' || step === 'ttfb' || step === 'download' };
      setTimings({ ...result, total: Object.values(result).reduce((s, v) => s + (v.value || 0), 0) });
    }

    setRunning(false);
  }

  const steps = [
    { key: 'dns', label: 'DNS Lookup', icon: '📖', color: '#6c5ce7' },
    { key: 'tcp', label: 'TCP Handshake', icon: '🤝', color: '#4ecdc4' },
    { key: 'tls', label: 'TLS Negotiation', icon: '🔒', color: '#ffd93d' },
    { key: 'ttfb', label: 'Time to First Byte', icon: '⏱️', color: '#ff6b6b' },
    { key: 'download', label: 'Content Download', icon: '📥', color: '#00b894' },
  ];

  return (
    <section id="live-demo" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-label">⚡ Live Demo</div>
          <h2 className="section-title">Test a real request</h2>
          <p className="section-desc">
            See what happens when a URL is loaded. Simulated but based on real
            network timing patterns.
          </p>
        </div>

        <div className="demo-wrapper">
          <div className="demo-presets">
            <span className="demo-presets-label">Quick test:</span>
            {DEMO_URLS.map(d => (
              <button
                key={d.url}
                className="demo-preset-btn"
                onClick={() => { setCustomUrl(d.url); runTest(d.url); }}
                disabled={running}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div className="demo-input-row">
            <input
              className="demo-input"
              placeholder="example.com"
              value={customUrl}
              onChange={e => setCustomUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && runTest()}
              disabled={running}
            />
            <button
              className="btn btn-primary"
              onClick={() => runTest()}
              disabled={running || !customUrl}
            >
              {running ? 'Testing...' : 'Run Test'}
            </button>
          </div>

          {timings && (
            <div className="demo-results">
              <div className="demo-total">
                Total: <strong>{timings.total}ms</strong>
              </div>
              <div className="demo-steps">
                {steps.map(s => {
                  const data = timings[s.key];
                  if (!data) return null;
                  const pct = timings.total > 0 ? (data.value / timings.total) * 100 : 0;
                  return (
                    <div key={s.key} className="demo-step">
                      <div className="demo-step-header">
                        <span className="demo-step-icon">{s.icon}</span>
                        <span className="demo-step-label">{s.label}</span>
                        <span className="demo-step-value">{data.value}ms</span>
                      </div>
                      <div className="demo-step-bar-bg">
                        <div
                          className="demo-step-bar"
                          style={{ width: `${pct}%`, background: s.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .demo-wrapper {
          max-width: 560px;
          margin: 0 auto;
          background: var(--bg-card);
          border: 2px solid var(--border);
          border-radius: 20px;
          padding: 28px;
        }
        .demo-presets {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .demo-presets-label {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .demo-preset-btn {
          background: var(--bg);
          border: 2px solid var(--border);
          border-radius: 8px;
          padding: 5px 14px;
          font-size: 0.82rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--fast);
          font-family: var(--font-body);
        }
        .demo-preset-btn:hover:not(:disabled) {
          border-color: var(--purple);
          color: var(--purple);
        }
        .demo-input-row {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }
        .demo-input {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid var(--border);
          border-radius: 12px;
          font-size: 0.9rem;
          background: var(--bg);
          color: var(--text-primary);
          font-family: var(--font-mono);
          outline: none;
          transition: border-color var(--fast);
        }
        .demo-input:focus { border-color: var(--purple); }
        .demo-input::placeholder { color: var(--text-dim); }
        .demo-results {
          padding-top: 20px;
          border-top: 2px solid var(--border);
        }
        .demo-total {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 16px;
          font-family: var(--font-display);
        }
        .demo-total strong {
          color: var(--coral);
          font-weight: 700;
        }
        .demo-steps {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .demo-step-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }
        .demo-step-icon { font-size: 1rem; }
        .demo-step-label {
          flex: 1;
          font-size: 0.82rem;
          color: var(--text-secondary);
        }
        .demo-step-value {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-primary);
          font-weight: 600;
        }
        .demo-step-bar-bg {
          height: 6px;
          background: var(--bg-soft);
          border-radius: 6px;
          overflow: hidden;
        }
        .demo-step-bar {
          height: 100%;
          border-radius: 6px;
          transition: width 0.5s var(--ease-out);
        }
      `}</style>
    </section>
  );
}
