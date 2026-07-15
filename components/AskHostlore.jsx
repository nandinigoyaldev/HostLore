'use client';
import { useState, useRef, useEffect } from 'react';

const TRENDING = [
  'What is DNS?',
  'VPS vs Shared hosting?',
  'SQL vs NoSQL?',
  'Which platform should I use?',
  'How does HTTPS work?',
];

export default function AskHostlore() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiOnline, setApiOnline] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    fetch('/api/health')
      .then(r => r.json())
      .then(d => setApiOnline(d.status === 'ok'))
      .catch(() => setApiOnline(false));
  }, []);

  async function handleSubmit(q) {
    const query = (q || question).trim();
    if (!query || query.length < 3 || loading) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query }),
      });
      const data = await res.json();
      setResult({ ...data, query });
    } catch {
      setResult({ success: false, query, error: 'Could not reach the server.' });
    }
    setLoading(false);
    setQuestion('');
  }

  return (
    <section id="ask" className="section" style={{ background: '#fdfcfa' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-label">🤖 Ask HostLore</div>
          <h2 className="section-title">
            Got a question? Just ask!
          </h2>
          <p className="section-desc">
            Type any hosting question and we&apos;ll point you to the right topic.
            If we don&apos;t have it yet, we&apos;ll log it for future lessons.
          </p>
        </div>

        <div className="ask-wrapper">
          <div className="ask-status">
            <span className={`ask-dot${apiOnline ? ' online' : ''}`} />
            <span>{apiOnline ? 'AI is online and ready!' : 'AI is offline'}</span>
          </div>

          <div className="ask-box">
            <div className="ask-row">
              <span className="ask-icon">🔍</span>
              <input
                ref={inputRef}
                className="ask-input"
                value={question}
                onChange={e => setQuestion(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="e.g. What's the difference between VPS and shared hosting?"
                disabled={loading}
              />
              <button
                className="ask-btn"
                onClick={() => handleSubmit()}
                disabled={loading || question.trim().length < 3}
              >
                {loading ? '🤔 Thinking...' : 'Ask!'}
              </button>
            </div>
          </div>

          <div className="ask-trending">
            <span className="ask-trending-label">Try asking:</span>
            <div className="ask-chips">
              {TRENDING.map(t => (
                <button
                  key={t}
                  className="ask-chip"
                  onClick={() => {
                    setQuestion(t);
                    inputRef.current?.focus();
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {result && (
            <div className={`ask-result${result.matched ? '' : ' unmatched'}`}>
              {result.matched ? (
                <>
                  <div className="ask-result-icon">✅</div>
                  <h3>Found it!</h3>
                  <p>
                    Your question about <strong>&ldquo;{result.query}&rdquo;</strong> matches
                    our section on <strong>{result.label}</strong>.
                  </p>
                  <a
                    href={'#' + result.section}
                    className="btn btn-primary"
                    onClick={e => {
                      e.preventDefault();
                      document.querySelector('#' + result.section)?.scrollIntoView({ behavior: 'smooth' });
                      setResult(null);
                    }}
                  >
                    Go to {result.label} →
                  </a>
                </>
              ) : (
                <>
                  <div className="ask-result-icon">📝</div>
                  <h3>Not covered yet!</h3>
                  <p>
                    We haven&apos;t written about <strong>&ldquo;{result.query}&rdquo;</strong> yet.
                    We&apos;ve logged your question — it helps us decide what to teach next!
                  </p>
                  {result.issueUrl && (
                    <a href={result.issueUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                      Track on GitHub ↗
                    </a>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .ask-wrapper {
          max-width: 640px;
          margin: 0 auto;
        }
        .ask-status {
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 20px;
          font-family: var(--font-display);
        }
        .ask-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: var(--text-dim);
        }
        .ask-dot.online { background: var(--green); box-shadow: 0 0 8px rgba(0, 184, 148, 0.4); }
        .ask-box {
          background: var(--bg-card);
          border: 2px solid var(--border);
          border-radius: 16px;
          padding: 6px;
          margin-bottom: 18px;
          transition: border-color var(--fast), box-shadow var(--fast);
        }
        .ask-box:focus-within {
          border-color: var(--coral);
          box-shadow: 0 0 0 4px rgba(255, 107, 107, 0.1);
        }
        .ask-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ask-icon { padding-left: 14px; font-size: 1.1rem; flex-shrink: 0; }
        .ask-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--text-primary);
          padding: 14px 4px;
          min-width: 0;
        }
        .ask-input::placeholder { color: var(--text-dim); }
        .ask-btn {
          background: var(--gradient-primary);
          color: #fff;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          white-space: nowrap;
          transition: all var(--fast);
          flex-shrink: 0;
        }
        .ask-btn:hover { transform: scale(1.03); }
        .ask-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        .ask-trending { text-align: center; margin-bottom: 28px; }
        .ask-trending-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 10px;
          display: block;
        }
        .ask-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }
        .ask-chip {
          background: var(--bg);
          border: 2px solid var(--border);
          color: var(--text-secondary);
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 0.82rem;
          cursor: pointer;
          font-family: var(--font-body);
          transition: all var(--fast);
        }
        .ask-chip:hover {
          border-color: var(--purple);
          color: var(--purple);
          background: var(--purple-bg);
        }

        .ask-result {
          background: var(--bg-card);
          border: 2px solid var(--green);
          border-radius: 16px;
          padding: 32px;
          text-align: center;
          animation: popIn 0.35s var(--ease-out);
        }
        .ask-result.unmatched { border-color: var(--yellow); }
        .ask-result-icon { font-size: 2.5rem; margin-bottom: 12px; }
        .ask-result h3 {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .ask-result p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 20px;
          line-height: 1.7;
        }
        .ask-result strong { color: var(--purple); }
        .ask-result .btn { margin: 0 auto; }

        @keyframes popIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (max-width: 640px) {
          .ask-row { flex-wrap: wrap; }
          .ask-btn { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
