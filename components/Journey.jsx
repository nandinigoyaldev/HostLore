'use client';
import { useState } from 'react';

const STEPS = [
  { num: '01', icon: '🗂️', title: 'Browser Cache', desc: 'Your browser checks if it already has a saved copy of the page. If yes — instant load. No network needed.', detail: 'Browsers store copies of pages you visit (caching). When you revisit, it can serve the saved version in ~0ms instead of fetching everything again. This is why returning to a site feels faster.', timing: '~0ms' },
  { num: '02', icon: '📖', title: 'DNS Lookup', desc: 'DNS translates google.com → 142.250.80.46. Think of it as the internet\'s phonebook.', detail: 'Your browser asks a DNS server: "Where is google.com?" The DNS server replies with an IP address like 142.250.80.46. Without DNS, you\'d have to memorize numbers for every site.', timing: '~20–120ms' },
  { num: '03', icon: '🤝', title: 'TCP Handshake', desc: 'Browser and server agree to talk: SYN → SYN-ACK → ACK. A digital "you there?" "yeah" "cool".', detail: 'Before any data moves, your browser and the server perform a 3-way handshake. SYN: "You there?" SYN-ACK: "Yeah, you?" ACK: "Cool, let\'s talk." This confirms both sides are ready.', timing: '~40–60ms' },
  { num: '04', icon: '🔒', title: 'TLS Encryption', desc: 'For HTTPS, keys are exchanged to encrypt everything. That padlock means something.', detail: 'Your browser and server negotiate a shared secret key. From this point, all data is encrypted. Even if someone intercepts it, they can\'t read it. This is why the padlock icon matters.', timing: '~10–20ms' },
  { num: '05', icon: '📤', title: 'HTTP Request', desc: 'Your browser asks for the page: GET /index.html HTTP/2. A tiny message travels the world.', detail: 'The browser sends a formal request: what page, what browser version, what language you prefer. This small text message (~1KB) travels through fiber optic cables to the server.', timing: '~1ms' },
  { num: '06', icon: '🖥️', title: 'Server Processing', desc: 'The server runs code, queries databases, and builds the HTML page just for you.', detail: 'The server might run PHP, Python, Node.js, or Ruby. It queries a database, processes logic, and assembles an HTML page. Every dynamic page is built fresh on each request.', timing: '~1–100ms' },
  { num: '07', icon: '📡', title: 'Response Travel', desc: 'HTML, CSS, JS split into packets, traveling through undersea cables at light speed.', detail: 'The response is broken into packets that travel through fiber optic cables on the ocean floor. Speed of light in fiber is ~200,000 km/s. A packet from New York to Sydney takes ~80ms.', timing: '~20–200ms' },
  { num: '08', icon: '🎨', title: 'Browser Renders', desc: 'HTML → DOM → CSS → Paint. All in a fraction of a second before you see anything.', detail: 'The browser parses HTML into a DOM tree, applies CSS styles, runs JavaScript, and paints pixels to screen. Modern browsers do this at 60+ frames per second.', timing: '~50–200ms' },
];

export default function Journey() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="journey" className="section">
      <span className="section-number">01</span>
      <div className="container">
        <div className="section-header">
          <div className="section-label">The Journey</div>
          <h2 className="section-title">
            What happens when you hit enter?
          </h2>
          <p className="section-desc">
            8 steps. ~300 milliseconds. One incredible journey from your keyboard to a
            server and back. Click any step to learn more.
          </p>
        </div>

        <div className="journey-timeline">
          {STEPS.map((step, i) => (
            <div key={step.num} className={`timeline-item${expanded === i ? ' expanded' : ''}`}>
              <div className="timeline-line">
                <div className="timeline-dot" style={{ animationDelay: `${i * 0.1}s` }} />
                {i < STEPS.length - 1 && <div className="timeline-connector" />}
              </div>

              <div className="timeline-card" onClick={() => setExpanded(expanded === i ? null : i)} role="button" tabIndex={0}>
                <div className="timeline-header">
                  <span className="timeline-icon">{step.icon}</span>
                  <div>
                    <span className="timeline-num">Step {step.num}</span>
                    <h3 className="timeline-title">{step.title}</h3>
                  </div>
                  <span className="timeline-time">{step.timing}</span>
                </div>
                <p className="timeline-desc">{step.desc}</p>
                {expanded === i && (
                  <div className="timeline-detail">
                    <p>{step.detail}</p>
                  </div>
                )}
                <div className="timeline-expand">
                  <span>{expanded === i ? 'Show less' : 'Learn more'}</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: expanded === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .journey-timeline {
          max-width: 720px;
          margin: 0 auto;
        }
        .timeline-item {
          display: flex;
          gap: 20px;
          margin-bottom: 0;
        }
        .timeline-line {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 28px;
          flex-shrink: 0;
          padding-top: 6px;
        }
        .timeline-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--gradient-primary);
          box-shadow: 0 0 12px rgba(139, 92, 246, 0.4);
          animation: dot-glow 2s infinite;
          flex-shrink: 0;
        }
        @keyframes dot-glow { 0%,100%{box-shadow:0 0 12px rgba(139,92,246,.4)} 50%{box-shadow:0 0 20px rgba(139,92,246,.6)} }
        .timeline-connector {
          width: 2px;
          flex: 1;
          min-height: 24px;
          background: linear-gradient(to bottom, rgba(139, 92, 246, 0.3), rgba(139, 92, 246, 0.05));
        }
        .timeline-card {
          flex: 1;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 20px 24px;
          margin-bottom: 16px;
          cursor: pointer;
          transition: all var(--med);
        }
        .timeline-card:hover {
          border-color: var(--border-accent);
          background: var(--bg-card-alt);
        }
        .timeline-item.expanded .timeline-card {
          border-color: var(--border-accent);
        }
        .timeline-header {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .timeline-icon {
          font-size: 1.8rem;
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-secondary);
          border-radius: 12px;
        }
        .timeline-num {
          font-size: 0.68rem;
          color: var(--purple);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: var(--font-display);
        }
        .timeline-title {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }
        .timeline-time {
          margin-left: auto;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--cyan);
          background: rgba(34, 211, 238, 0.08);
          padding: 4px 10px;
          border-radius: 100px;
          white-space: nowrap;
          flex-shrink: 0;
          border: 1px solid rgba(34, 211, 238, 0.15);
        }
        .timeline-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-top: 10px;
          margin-bottom: 0;
        }
        .timeline-detail {
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid var(--border);
          animation: fadeSlide 0.3s var(--ease-out);
        }
        .timeline-detail p {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.8;
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .timeline-expand {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 12px;
          font-size: 0.76rem;
          color: var(--purple);
          font-weight: 500;
        }

        @media (max-width: 640px) {
          .timeline-card { padding: 16px; }
          .timeline-header { flex-wrap: wrap; }
          .timeline-time { margin-left: 0; }
        }
      `}</style>
    </section>
  );
}
