'use client';
import { useState } from 'react';

const STEPS = [
  {
    num: '01', icon: '🗂️', title: 'Browser Cache', emoji: '⚡',
    desc: 'Your browser checks if it already has a copy saved. If yes — instant load!',
    detail: 'Browsers store copies of pages you visit. When you come back, it serves the saved version instantly instead of fetching everything again. That\'s why returning to a site feels so fast.',
    timing: '~0ms',
  },
  {
    num: '02', icon: '📖', title: 'DNS Lookup', emoji: '📞',
    desc: 'DNS translates google.com → 142.250.80.46. The phonebook of the internet.',
    detail: 'Your browser asks a DNS server: "Where is google.com?" It replies with an IP address. Without DNS, you\'d memorize numbers like 142.250.80.46 for every website.',
    timing: '~20–120ms',
  },
  {
    num: '03', icon: '🤝', title: 'TCP Handshake', emoji: '👋',
    desc: 'Browser and server do a 3-way handshake: "You there?" "Yeah, you?" "Cool."',
    detail: 'Before any data moves, both sides confirm they\'re ready. SYN: "You there?" SYN-ACK: "Yeah, you?" ACK: "Cool, let\'s talk." Three messages, under 60ms.',
    timing: '~40–60ms',
  },
  {
    num: '04', icon: '🔒', title: 'TLS Encryption', emoji: '🔐',
    desc: 'Keys are exchanged to encrypt everything. That padlock icon actually means something.',
    detail: 'Your browser and server negotiate a shared secret key. All data from here is encrypted — even if intercepted, no one can read it.',
    timing: '~10–20ms',
  },
  {
    num: '05', icon: '📤', title: 'HTTP Request', emoji: '✉️',
    desc: 'Browser asks: "GET /index.html please!" A tiny message travels the world.',
    detail: 'A small text message (~1KB) with your request, browser type, and language preference. Travels through fiber optic cables at the speed of light.',
    timing: '~1ms',
  },
  {
    num: '06', icon: '🖥️', title: 'Server Processing', emoji: '⚙️',
    desc: 'Server runs code, queries databases, builds your page fresh. Every time.',
    detail: 'The server processes your request — it might run Node.js, Python, or PHP. It queries databases, runs logic, and assembles an HTML page just for you.',
    timing: '~1–100ms',
  },
  {
    num: '07', icon: '📡', title: 'Response Travel', emoji: '🌊',
    desc: 'HTML splits into packets, traveling through undersea cables at light speed.',
    detail: 'Your page is broken into packets and sent through fiber optic cables on the ocean floor. At 200,000 km/s, a packet crosses the Atlantic in ~30ms.',
    timing: '~20–200ms',
  },
  {
    num: '08', icon: '🎨', title: 'Browser Renders', emoji: '🖼️',
    desc: 'HTML → DOM → CSS → Paint. All in a fraction of a second.',
    detail: 'The browser parses HTML into a DOM tree, applies CSS styles, runs JavaScript, and paints pixels. All that in under 200ms, 60+ times per second.',
    timing: '~50–200ms',
  },
];

export default function Journey() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="journey" className="section" style={{ background: '#fdfcfa' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-label">🚀 The Journey</div>
          <h2 className="section-title">
            What happens when you hit enter?
          </h2>
          <p className="section-desc">
            8 steps. ~300 milliseconds. An incredible journey from your keyboard to a
            server and back. Click any step to peek under the hood.
          </p>
        </div>

        <div className="journey">
          {STEPS.map((step, i) => (
            <div key={step.num} className={`journey-item${expanded === i ? ' expanded' : ''}`}>
              <div className="journey-line">
                <div className="journey-dot">{step.num}</div>
                {i < STEPS.length - 1 && <div className="journey-connector" />}
              </div>

              <div
                className="journey-card"
                onClick={() => setExpanded(expanded === i ? null : i)}
                role="button"
                tabIndex={0}
              >
                <div className="journey-card-top">
                  <div className="journey-icon">{step.icon}</div>
                  <div className="journey-info">
                    <div className="journey-num">Step {step.num}</div>
                    <h3 className="journey-title">{step.title}</h3>
                  </div>
                  <div className="journey-timing">{step.timing}</div>
                </div>

                <p className="journey-desc">{step.desc}</p>

                {expanded === i && (
                  <div className="journey-detail">
                    <div className="journey-detail-icon">{step.emoji}</div>
                    <p>{step.detail}</p>
                  </div>
                )}

                <div className="journey-expand">
                  <span>{expanded === i ? '▲ Show less' : '▼ Learn more'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .journey {
          max-width: 720px;
          margin: 0 auto;
        }
        .journey-item {
          display: flex;
          gap: 20px;
        }
        .journey-line {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 40px;
          flex-shrink: 0;
          padding-top: 4px;
        }
        .journey-dot {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: var(--gradient-primary);
          color: #fff;
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
          flex-shrink: 0;
        }
        .journey-connector {
          width: 3px;
          flex: 1;
          min-height: 16px;
          background: linear-gradient(to bottom, rgba(255, 107, 107, 0.3), rgba(255, 107, 107, 0.05));
          border-radius: 3px;
        }
        .journey-card {
          flex: 1;
          background: var(--bg-card);
          border: 2px solid var(--border);
          border-radius: 16px;
          padding: 20px 24px;
          margin-bottom: 14px;
          cursor: pointer;
          transition: all var(--med);
        }
        .journey-card:hover {
          border-color: var(--coral);
          box-shadow: var(--shadow-md);
        }
        .journey-item.expanded .journey-card {
          border-color: var(--coral);
          background: #fff;
        }
        .journey-card-top {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .journey-icon {
          font-size: 1.6rem;
          flex-shrink: 0;
          width: 44px; height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-soft);
          border-radius: 12px;
        }
        .journey-info { flex: 1; }
        .journey-num {
          font-size: 0.65rem;
          color: var(--coral);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-family: var(--font-display);
        }
        .journey-title {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }
        .journey-timing {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--teal);
          background: var(--teal-bg);
          padding: 4px 10px;
          border-radius: 8px;
          white-space: nowrap;
          flex-shrink: 0;
          font-weight: 500;
        }
        .journey-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-top: 10px;
          margin-bottom: 0;
        }
        .journey-detail {
          margin-top: 12px;
          padding: 16px;
          background: var(--coral-bg);
          border-radius: 12px;
          display: flex;
          gap: 12px;
          align-items: flex-start;
          animation: popIn 0.3s var(--ease-out);
        }
        .journey-detail-icon { font-size: 1.4rem; flex-shrink: 0; }
        .journey-detail p {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.8;
          margin: 0;
        }
        @keyframes popIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .journey-expand {
          margin-top: 10px;
          font-size: 0.8rem;
          color: var(--coral);
          font-weight: 600;
          font-family: var(--font-display);
        }

        @media (max-width: 640px) {
          .journey-card { padding: 16px; }
          .journey-card-top { flex-wrap: wrap; }
          .journey-timing { margin-left: 0; }
          .journey-line { width: 32px; }
          .journey-dot { width: 30px; height: 30px; font-size: 0.65rem; }
        }
      `}</style>
    </section>
  );
}
