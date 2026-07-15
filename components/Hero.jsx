'use client';
import { useEffect, useState } from 'react';

const FLOW_STEPS = [
  { label: 'You type a URL', icon: '⌨️', color: '#ec4899' },
  { label: 'DNS lookup', icon: '📖', color: '#8b5cf6' },
  { label: 'Server responds', icon: '🖥️', color: '#6366f1' },
  { label: 'Page loads!', icon: '🎉', color: '#38bdf8' },
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
    const t = setInterval(() => setActiveStep(p => (p + 1) % FLOW_STEPS.length), 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero-glow" />
      <div className="hero-glow-2" />

      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Interactive learning platform
          </div>

          <h1 className="hero-title">
            How the web actually
            <br />
            <span className="gradient-text">works</span>
          </h1>

          <p className="hero-subtitle">
            From typing a URL to pixels on screen — HostLore breaks down hosting,
            servers, databases, and deployment with zero jargon and real analogies.
          </p>

          <div className="hero-actions">
            <a href="#journey" className="btn btn-primary" onClick={e => {
              e.preventDefault();
              document.querySelector('#journey')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Start Learning
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
                <span className="hero-stat-label">New topics suggested</span>
              </div>
            </div>
          )}
        </div>

        <div className="hero-visual">
          <div className="flow-diagram">
            {FLOW_STEPS.map((step, i) => (
              <div key={i} className={`flow-step${i === activeStep ? ' active' : ''}${i < activeStep ? ' done' : ''}`}>
                <div className="flow-step-icon">{step.icon}</div>
                <div className="flow-step-label">{step.label}</div>
                {i < FLOW_STEPS.length - 1 && (
                  <div className={`flow-arrow${i < activeStep ? ' done' : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke={i < activeStep ? step.color : 'var(--text-dim)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="flow-hint">Watch what happens when you visit a site</p>
        </div>
      </div>

      <div className="scroll-indicator">
        <span className="scroll-text">Scroll to explore</span>
        <div className="scroll-line" />
      </div>

      <style jsx>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 140px 0 80px;
        }
        .hero-glow {
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 60%);
          top: -200px; right: -100px;
          pointer-events: none;
        }
        .hero-glow-2 {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 60%);
          bottom: -150px; left: -100px;
          pointer-events: none;
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
          background: rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.2);
          color: var(--purple);
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 0.78rem;
          font-weight: 600;
          margin-bottom: 24px;
        }
        .hero-badge-dot {
          width: 6px; height: 6px;
          background: var(--green);
          border-radius: 50%;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.8rem, 5vw, 4.2rem);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.04em;
          margin-bottom: 20px;
        }
        .hero-subtitle {
          font-size: 1.05rem;
          color: var(--text-secondary);
          max-width: 480px;
          line-height: 1.85;
          margin-bottom: 36px;
        }
        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }
        .hero-stats {
          display: flex;
          align-items: center;
          gap: 24px;
          padding-top: 24px;
          border-top: 1px solid var(--border);
        }
        .hero-stat { display: flex; flex-direction: column; }
        .hero-stat-number {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 800;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
        .hero-stat-label {
          font-size: 0.7rem;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-top: 4px;
          white-space: nowrap;
        }
        .hero-stat-divider {
          width: 1px; height: 36px;
          background: var(--border);
          flex-shrink: 0;
        }

        .flow-diagram {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 32px;
          display: flex;
          align-items: center;
          gap: 0;
          position: relative;
        }
        .flow-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex: 1;
          transition: all 0.3s var(--ease-out);
        }
        .flow-step-icon {
          font-size: 2rem;
          transition: transform 0.3s var(--ease-out);
        }
        .flow-step.active .flow-step-icon {
          transform: scale(1.2);
          animation: bounce-icon 0.4s var(--ease-out);
        }
        @keyframes bounce-icon { 0%{transform:scale(1)} 40%{transform:scale(1.3)} 100%{transform:scale(1.2)} }
        .flow-step-label {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 500;
          text-align: center;
          font-family: var(--font-display);
        }
        .flow-step.active .flow-step-label { color: var(--text-primary); }
        .flow-step.done .flow-step-label { color: var(--text-secondary); }
        .flow-arrow {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          opacity: 0.4;
          margin: 0 -4px;
        }
        .flow-arrow.done { opacity: 1; }
        .flow-hint {
          text-align: center;
          font-size: 0.72rem;
          color: var(--text-dim);
          margin-top: 14px;
          font-family: var(--font-display);
        }
        .scroll-indicator {
          position: absolute;
          bottom: 32px; left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0.35;
        }
        .scroll-text {
          font-size: 0.65rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-family: var(--font-display);
        }
        .scroll-line {
          width: 1px; height: 32px;
          background: linear-gradient(to bottom, var(--text-muted), transparent);
          animation: scroll-pulse 2s infinite;
        }
        @keyframes scroll-pulse { 0%,100%{opacity:0.3} 50%{opacity:1} }

        @media (max-width: 900px) {
          .hero-content { grid-template-columns: 1fr; gap: 48px; }
          .hero-visual { order: -1; }
          .hero-subtitle { max-width: 100%; }
          .flow-diagram { padding: 24px 16px; }
          .flow-step-icon { font-size: 1.5rem; }
        }
        @media (max-width: 640px) {
          .hero-stats { gap: 14px; flex-wrap: wrap; }
          .hero-actions { flex-direction: column; }
          .btn { justify-content: center; }
        }
      `}</style>
    </section>
  );
}
