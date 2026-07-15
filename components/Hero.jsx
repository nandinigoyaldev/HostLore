'use client';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.json())
      .then(d => setStats(d))
      .catch(() => {});
  }, []);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg" />
      <div className="hero-inner">
        <div className="hero-left">
          <div className="hero-badge">
            <span className="hero-dot" />
            Interactive learning platform
          </div>

          <h1 className="hero-title">
            How the web<br />
            <span className="hero-title-grad">actually works</span>
          </h1>

          <p className="hero-desc">
            From typing a URL to pixels on screen — learn about hosting, servers,
            databases, and deployment with fun analogies and zero jargon.
          </p>

          <div className="hero-btns">
            <a href="#journey" className="btn btn-primary" onClick={e => { e.preventDefault(); document.querySelector('#journey')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Start Learning →
            </a>
            <a href="#ask" className="btn btn-secondary" onClick={e => { e.preventDefault(); document.querySelector('#ask')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Ask a Question
            </a>
          </div>

          {stats && (
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-num">{stats.total || 0}</span>
                <span className="hero-stat-lbl">Questions answered</span>
              </div>
              <div className="hero-stat-div" />
              <div className="hero-stat">
                <span className="hero-stat-num">{stats.matched || 0}</span>
                <span className="hero-stat-lbl">Matched to topics</span>
              </div>
              <div className="hero-stat-div" />
              <div className="hero-stat">
                <span className="hero-stat-num">{stats.unmatched || 0}</span>
                <span className="hero-stat-lbl">Suggested topics</span>
              </div>
            </div>
          )}
        </div>

        <div className="hero-right">
          <div className="hero-card">
            <div className="hero-card-header">
              <span className="hero-card-dot" style={{ background: '#ff6b6b' }} />
              <span className="hero-card-dot" style={{ background: '#ffd93d' }} />
              <span className="hero-card-dot" style={{ background: '#4ecdc4' }} />
              <span className="hero-card-url">hostlore.app</span>
            </div>
            <div className="hero-card-body">
              <div className="hero-flow">
                <div className="hero-flow-item">
                  <div className="hero-flow-icon">⌨️</div>
                  <div className="hero-flow-bar a" />
                </div>
                <div className="hero-flow-item">
                  <div className="hero-flow-icon">📖</div>
                  <div className="hero-flow-bar b" />
                </div>
                <div className="hero-flow-item">
                  <div className="hero-flow-icon">🤝</div>
                  <div className="hero-flow-bar c" />
                </div>
                <div className="hero-flow-item">
                  <div className="hero-flow-icon">🖥️</div>
                  <div className="hero-flow-bar d" />
                </div>
                <div className="hero-flow-item">
                  <div className="hero-flow-icon">🎉</div>
                </div>
              </div>
              <div className="hero-flow-labels">
                <span>Type</span>
                <span>DNS</span>
                <span>Connect</span>
                <span>Server</span>
                <span>Done!</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll">↓ Scroll to explore</div>

      <style jsx>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 120px 0 60px;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse at 80% 20%, rgba(255, 107, 107, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, rgba(108, 92, 231, 0.06) 0%, transparent 50%);
        }
        .hero-inner {
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
        .hero-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--green);
          animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.8rem, 5vw, 4.2rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
        }
        .hero-title-grad {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-desc {
          font-size: 1.05rem;
          color: var(--text-secondary);
          max-width: 480px;
          line-height: 1.85;
          margin-bottom: 32px;
        }
        .hero-btns {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }
        .hero-stats {
          display: flex;
          align-items: center;
          gap: 24px;
          padding-top: 20px;
          border-top: 2px solid var(--border);
        }
        .hero-stat { display: flex; flex-direction: column; }
        .hero-stat-num {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 700;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-stat-lbl {
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-top: 4px;
          font-weight: 500;
        }
        .hero-stat-div {
          width: 1px; height: 36px;
          background: var(--border);
        }

        .hero-card {
          background: var(--bg-card);
          border: 2px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }
        .hero-card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 18px;
          background: var(--bg-soft);
          border-bottom: 2px solid var(--border);
        }
        .hero-card-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
        }
        .hero-card-url {
          margin-left: 4px;
          font-size: 0.8rem;
          color: var(--text-muted);
          font-family: var(--font-display);
        }
        .hero-card-body {
          padding: 32px 28px;
        }
        .hero-flow {
          display: flex;
          align-items: center;
          gap: 0;
        }
        .hero-flow-item {
          display: flex;
          align-items: center;
          flex: 1;
        }
        .hero-flow-icon {
          width: 48px; height: 48px;
          border-radius: 12px;
          background: var(--bg-soft);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          flex-shrink: 0;
          animation: iconPulse 3s ease-in-out infinite;
        }
        .hero-flow-item:nth-child(1) .hero-flow-icon { animation-delay: 0s; }
        .hero-flow-item:nth-child(2) .hero-flow-icon { animation-delay: 0.6s; }
        .hero-flow-item:nth-child(3) .hero-flow-icon { animation-delay: 1.2s; }
        .hero-flow-item:nth-child(4) .hero-flow-icon { animation-delay: 1.8s; }
        .hero-flow-item:nth-child(5) .hero-flow-icon { animation-delay: 2.4s; }
        @keyframes iconPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 107, 107, 0); }
          10% { transform: scale(1.15); box-shadow: 0 0 20px rgba(255, 107, 107, 0.2); }
          20% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 107, 107, 0); }
        }
        .hero-flow-bar {
          flex: 1;
          height: 3px;
          margin: 0 4px;
          background: var(--bg-soft);
          border-radius: 3px;
          position: relative;
          overflow: hidden;
        }
        .hero-flow-bar::after {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--gradient-primary);
          border-radius: 3px;
          animation: barFill 3s ease-in-out infinite;
        }
        .hero-flow-bar.a::after { animation-delay: 0.3s; }
        .hero-flow-bar.b::after { animation-delay: 0.9s; }
        .hero-flow-bar.c::after { animation-delay: 1.5s; }
        .hero-flow-bar.d::after { animation-delay: 2.1s; }
        @keyframes barFill {
          0% { width: 0%; opacity: 0; }
          20% { width: 100%; opacity: 1; }
          80% { width: 100%; opacity: 1; }
          100% { width: 0%; opacity: 0; }
        }
        .hero-flow-labels {
          display: flex;
          margin-top: 12px;
          padding: 0 0 0 4px;
        }
        .hero-flow-labels span {
          flex: 1;
          font-size: 0.65rem;
          color: var(--text-dim);
          font-family: var(--font-display);
          text-align: center;
        }
        .hero-flow-labels span:last-child { color: var(--green); }

        .hero-scroll {
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
          .hero-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero-right { order: -1; }
          .hero-desc { max-width: 100%; }
          .hero-card-body { padding: 24px 20px; }
        }
        @media (max-width: 640px) {
          .hero-stats { gap: 14px; flex-wrap: wrap; }
          .hero-btns { flex-direction: column; }
          .btn { justify-content: center; }
          .hero-flow-icon { width: 40px; height: 40px; font-size: 1.1rem; }
        }
      `}</style>
    </section>
  );
}
