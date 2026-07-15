'use client';
import { useEffect, useState } from 'react';

const STEPS = [
  { icon: '⌨️', label: 'Type URL', color: '#ff6b6b' },
  { icon: '📖', label: 'DNS Lookup', color: '#6c5ce7' },
  { icon: '🤝', label: 'Connect', color: '#4ecdc4' },
  { icon: '🖥️', label: 'Server', color: '#fd79a8' },
  { icon: '🎉', label: 'Page!', color: '#ffd93d' },
];

export default function Hero() {
  const [stats, setStats] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.json())
      .then(d => setStats(d))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveStep(p => (p + 1) % STEPS.length), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero-bg-shape hero-shape-1" />
      <div className="hero-bg-shape hero-shape-2" />
      <div className="hero-bg-shape hero-shape-3" />

      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-badge">
            <span>🦎</span> Interactive learning platform
          </div>

          <h1 className="hero-title">
            How the web
            <br />
            <span className="gradient-text">actually works</span>
          </h1>

          <p className="hero-subtitle">
            From typing a URL to pixels on screen — learn about hosting, servers,
            databases, and deployment with fun analogies and zero jargon.
          </p>

          <div className="hero-actions">
            <a href="#journey" className="btn btn-primary" onClick={e => {
              e.preventDefault();
              document.querySelector('#journey')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Start Learning
              <span className="btn-arrow">→</span>
            </a>
            <a href="#ask" className="btn btn-secondary" onClick={e => {
              e.preventDefault();
              document.querySelector('#ask')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Ask a Question
            </a>
          </div>

          {stats && (
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-number">{stats.total || 0}</span>
                <span className="hero-stat-label">Questions answered</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-number">{stats.matched || 0}</span>
                <span className="hero-stat-label">Matched to topics</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-number">{stats.unmatched || 0}</span>
                <span className="hero-stat-label">Suggested topics</span>
              </div>
            </div>
          )}
        </div>

        <div className="hero-visual">
          <div className="flow-card">
            <div className="flow-card-header">
              <span className="flow-card-dot" style={{ background: '#ff6b6b' }} />
              <span className="flow-card-dot" style={{ background: '#ffd93d' }} />
              <span className="flow-card-dot" style={{ background: '#4ecdc4' }} />
              <span className="flow-card-title">hostlore.app</span>
            </div>
            <div className="flow-steps">
              {STEPS.map((step, i) => (
                <div key={i} className={`flow-step${i === activeStep ? ' active' : ''}`}>
                  <div className="flow-icon" style={{ background: `${step.color}15`, color: step.color }}>
                    {step.icon}
                  </div>
                  <div className="flow-label">{step.label}</div>
                  {i < STEPS.length - 1 && (
                    <div className={`flow-line${i < activeStep ? ' done' : ''}`}>
                      <div className="flow-line-inner" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-hint">
        <span>↓ Scroll to explore</span>
      </div>

      <style jsx>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 120px 0 60px;
        }
        .hero-bg-shape {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .hero-shape-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(255, 107, 107, 0.08) 0%, transparent 60%);
          top: -150px; right: -100px;
        }
        .hero-shape-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(108, 92, 231, 0.06) 0%, transparent 60%);
          bottom: -100px; left: -100px;
        }
        .hero-shape-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(78, 205, 196, 0.06) 0%, transparent 60%);
          top: 40%; left: 50%;
        }
        .hero-content {
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 0 var(--px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          width: 100%;
          position: relative;
          z-index: 1;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--coral-bg);
          border: 2px solid rgba(255, 107, 107, 0.2);
          color: var(--coral);
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 20px;
          font-family: var(--font-display);
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.8rem, 5vw, 4.2rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
        }
        .hero-subtitle {
          font-size: 1.05rem;
          color: var(--text-secondary);
          max-width: 480px;
          line-height: 1.85;
          margin-bottom: 32px;
        }
        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }
        .btn-arrow { transition: transform var(--fast); }
        .btn-primary:hover .btn-arrow { transform: translateX(4px); }
        .hero-stats {
          display: flex;
          align-items: center;
          gap: 24px;
          padding-top: 20px;
          border-top: 2px solid var(--border);
        }
        .hero-stat { display: flex; flex-direction: column; }
        .hero-stat-number {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 700;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
        .hero-stat-label {
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-top: 4px;
          white-space: nowrap;
          font-weight: 500;
        }
        .hero-stat-divider {
          width: 1px; height: 36px;
          background: var(--border);
          flex-shrink: 0;
        }

        .flow-card {
          background: var(--bg-card);
          border: 2px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }
        .flow-card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 18px;
          background: var(--bg-soft);
          border-bottom: 2px solid var(--border);
        }
        .flow-card-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
        }
        .flow-card-title {
          margin-left: 4px;
          font-size: 0.8rem;
          color: var(--text-muted);
          font-family: var(--font-display);
        }
        .flow-steps {
          padding: 28px;
          display: flex;
          align-items: center;
        }
        .flow-step {
          display: flex;
          align-items: center;
          gap: 0;
          flex: 1;
        }
        .flow-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          transition: all 0.3s var(--ease-out);
          flex-shrink: 0;
        }
        .flow-step.active .flow-icon {
          transform: scale(1.15);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .flow-label {
          display: none;
          position: absolute;
          bottom: -28px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--text-muted);
          white-space: nowrap;
          font-family: var(--font-display);
        }
        .flow-step.active .flow-label { color: var(--coral); }
        .flow-line {
          flex: 1;
          height: 3px;
          margin: 0 4px;
          background: var(--bg-soft);
          border-radius: 3px;
          position: relative;
          overflow: hidden;
        }
        .flow-line-inner {
          height: 100%;
          width: 0%;
          background: var(--gradient-primary);
          border-radius: 3px;
          transition: width 0.3s var(--ease-out);
        }
        .flow-line.done .flow-line-inner { width: 100%; }
        .scroll-hint {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.8rem;
          color: var(--text-muted);
          font-family: var(--font-display);
          animation: bounce 2s infinite;
        }
        @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-8px)} }

        @media (max-width: 900px) {
          .hero-content { grid-template-columns: 1fr; gap: 40px; }
          .hero-visual { order: -1; }
          .hero-subtitle { max-width: 100%; }
          .flow-steps { padding: 20px; }
        }
        @media (max-width: 640px) {
          .hero-stats { gap: 14px; flex-wrap: wrap; }
          .hero-actions { flex-direction: column; }
          .btn { justify-content: center; }
          .flow-icon { width: 42px; height: 42px; font-size: 1.1rem; }
        }
      `}</style>
    </section>
  );
}
