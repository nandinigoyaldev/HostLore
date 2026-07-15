'use client';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-logo">
              <span className="footer-emoji">🦎</span>{' '}
              <span className="gradient-text">HostLore</span>
            </h3>
            <p>
              Teaching hosting concepts the fun way. No jargon — just clear
              analogies and real-world explanations.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <h4>Learn</h4>
              <a href="#journey">The Journey</a>
              <a href="#hosting">Hosting Types</a>
              <a href="#databases">Databases</a>
              <a href="#platforms">Platforms</a>
            </div>
            <div className="footer-col">
              <h4>Community</h4>
              <a href="#ask">Ask a Question</a>
              <a href="https://github.com/nandinigoyaldev/HostLore" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} HostLore. Built with Next.js + 🧡</p>
          <p>
            Made by{' '}
            <a href="https://github.com/nandinigoyaldev" target="_blank" rel="noopener noreferrer">
              Nandini Goyal
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          border-top: 2px solid var(--border);
          padding: 56px 0 24px;
          background: var(--bg-card-alt);
        }
        .footer-inner {
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 0 var(--px);
        }
        .footer-top {
          display: flex;
          justify-content: space-between;
          gap: 48px;
          margin-bottom: 36px;
          flex-wrap: wrap;
        }
        .footer-brand { max-width: 320px; }
        .footer-emoji { font-size: 1.2rem; }
        .footer-logo {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 700;
        }
        .footer-brand p {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-top: 10px;
          line-height: 1.75;
        }
        .footer-links {
          display: flex;
          gap: 48px;
        }
        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .footer-col h4 {
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-dim);
          margin-bottom: 4px;
        }
        .footer-col a {
          font-size: 0.85rem;
          color: var(--text-muted);
          text-decoration: none;
          transition: color var(--fast);
        }
        .footer-col a:hover { color: var(--coral); }
        .footer-bottom {
          padding-top: 20px;
          border-top: 2px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }
        .footer-bottom p { font-size: 0.82rem; color: var(--text-dim); }
        .footer-bottom a { color: var(--coral); text-decoration: none; }

        @media (max-width: 640px) {
          .footer-top { flex-direction: column; gap: 24px; }
          .footer-links { gap: 32px; }
          .footer-bottom { flex-direction: column; text-align: center; }
        }
      `}</style>
    </footer>
  );
}
