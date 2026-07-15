'use client';
import { useState, useRef, useEffect } from 'react';
import Fuse from 'fuse.js';

const SEARCH_DATA = [
  { title: 'Browser Cache', section: 'journey', desc: 'How browsers cache pages for instant reload' },
  { title: 'DNS Lookup', section: 'journey', desc: 'Domain Name System translates URLs to IP addresses' },
  { title: 'TCP Handshake', section: 'journey', desc: 'Three-way handshake between browser and server' },
  { title: 'TLS Encryption', section: 'journey', desc: 'HTTPS encryption and certificate handling' },
  { title: 'HTTP Request', section: 'journey', desc: 'How browsers request pages from servers' },
  { title: 'Server Processing', section: 'journey', desc: 'How servers process requests and build responses' },
  { title: 'Response Travel', section: 'journey', desc: 'How data travels through fiber optic cables' },
  { title: 'Browser Rendering', section: 'journey', desc: 'How browsers parse HTML, CSS, and paint pixels' },
  { title: 'Shared Hosting', section: 'hosting', desc: 'Budget hosting with shared server resources' },
  { title: 'VPS Hosting', section: 'hosting', desc: 'Virtual private server with dedicated resources' },
  { title: 'Dedicated Server', section: 'hosting', desc: 'Entire physical server for one client' },
  { title: 'Cloud Hosting', section: 'hosting', desc: 'Scalable cloud infrastructure (AWS, GCP, Azure)' },
  { title: 'Serverless', section: 'hosting', desc: 'Function-based hosting with auto-scaling' },
  { title: 'SQL Databases', section: 'databases', desc: 'Relational databases like PostgreSQL and MySQL' },
  { title: 'NoSQL Databases', section: 'databases', desc: 'Document and key-value stores like MongoDB' },
  { title: 'NewSQL Databases', section: 'databases', desc: 'Distributed SQL databases like CockroachDB' },
  { title: 'Vercel', section: 'platforms', desc: 'Next.js deployment platform' },
  { title: 'Netlify', section: 'platforms', desc: 'JAMstack hosting with serverless functions' },
  { title: 'Cloudflare Pages', section: 'platforms', desc: 'Edge network hosting platform' },
  { title: 'Railway', section: 'platforms', desc: 'Full-stack deployment platform' },
  { title: 'Supabase', section: 'platforms', desc: 'Open-source Firebase alternative' },
  { title: 'AWS', section: 'platforms', desc: 'Amazon Web Services cloud provider' },
  { title: 'Google Cloud', section: 'platforms', desc: 'GCP cloud platform' },
];

const fuse = new Fuse(SEARCH_DATA, {
  keys: ['title', 'desc'],
  threshold: 0.4,
  includeScore: true,
});

export default function Search({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  function handleInput(value) {
    setQuery(value);
    if (value.trim().length < 2) {
      setResults([]);
      return;
    }
    const res = fuse.search(value);
    setResults(res.slice(0, 8));
  }

  function handleSelect(section) {
    onClose();
    const el = document.querySelector('#' + section);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (!isOpen) return null;

  return (
    <>
      <div className="search-backdrop" onClick={onClose} />
      <div className="search-modal" role="dialog" aria-label="Search">
        <div className="search-input-wrap">
          <span className="search-icon">🔍</span>
          <input
            ref={inputRef}
            className="search-input"
            placeholder="Search all topics..."
            value={query}
            onChange={e => handleInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Escape') onClose();
              if (e.key === 'Enter' && results.length > 0) handleSelect(results[0].item.section);
            }}
          />
          <button className="search-close" onClick={onClose}>ESC</button>
        </div>

        {results.length > 0 && (
          <div className="search-results">
            {results.map((r, i) => (
              <button
                key={i}
                className="search-result-item"
                onClick={() => handleSelect(r.item.section)}
              >
                <div className="search-result-title">{r.item.title}</div>
                <div className="search-result-desc">{r.item.desc}</div>
                <span className="search-result-section">{r.item.section}</span>
              </button>
            ))}
          </div>
        )}

        {query.length >= 2 && results.length === 0 && (
          <div className="search-empty">
            No results for &ldquo;{query}&rdquo;
          </div>
        )}
      </div>

      <style jsx>{`
        .search-backdrop {
          position: fixed;
          inset: 0;
          background: var(--bg-overlay);
          z-index: 900;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        .search-modal {
          position: fixed;
          top: 80px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 560px;
          background: var(--bg-card);
          border: 2px solid var(--border);
          border-radius: 20px;
          box-shadow: var(--shadow-lg);
          z-index: 950;
          overflow: hidden;
          animation: slideDown 0.25s var(--ease-out);
        }
        @keyframes slideDown { from{opacity:0;transform:translateX(-50%) translateY(-20px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
        .search-input-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border);
        }
        .search-icon { font-size: 1.2rem; flex-shrink: 0; }
        .search-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--text-primary);
        }
        .search-input::placeholder { color: var(--text-dim); }
        .search-close {
          font-size: 0.7rem;
          color: var(--text-muted);
          background: var(--bg-soft);
          border: 1px solid var(--border);
          padding: 3px 8px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          font-family: var(--font-mono);
        }
        .search-results {
          max-height: 320px;
          overflow-y: auto;
          padding: 8px;
        }
        .search-result-item {
          display: block;
          width: 100%;
          text-align: left;
          padding: 12px 14px;
          border-radius: 10px;
          border: none;
          background: none;
          cursor: pointer;
          transition: background var(--fast);
          font-family: var(--font-body);
        }
        .search-result-item:hover { background: var(--bg-soft); }
        .search-result-title {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.9rem;
          font-family: var(--font-display);
        }
        .search-result-desc {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 2px;
        }
        .search-result-section {
          display: inline-block;
          margin-top: 4px;
          font-size: 0.65rem;
          color: var(--purple);
          background: var(--purple-bg);
          padding: 1px 8px;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-weight: 600;
        }
        .search-empty {
          padding: 32px;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.9rem;
        }
      `}</style>
    </>
  );
}
