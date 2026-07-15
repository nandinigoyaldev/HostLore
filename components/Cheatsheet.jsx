'use client';
import { useState } from 'react';

const TOPICS = [
  { section: '🚀 The Journey', items: [
    'Browser Cache — local copies load instantly (~0ms)',
    'DNS Lookup — URL → IP address (~20-120ms)',
    'TCP Handshake — SYN → SYN-ACK → ACK (~40-60ms)',
    'TLS Encryption — HTTPS key exchange (~10-20ms)',
    'HTTP Request — GET /page HTTP/2 (~1ms)',
    'Server Processing — code → query → build (~1-100ms)',
    'Response Travel — fiber optic packets (~20-200ms)',
    'Browser Render — HTML → DOM → Paint (~50-200ms)',
  ]},
  { section: '🏡 Hosting Types', items: [
    'Shared — cheapest, shared resources (~$2-10/mo)',
    'VPS — dedicated VM, root access (~$5-80/mo)',
    'Dedicated — entire physical server (~$80-500+/mo)',
    'Cloud — auto-scaling, pay-per-use (AWS/GCP/Azure)',
    'Serverless — functions, no server management',
  ]},
  { section: '🗄️ Databases', items: [
    'SQL — rigid schemas, ACID, complex queries (PostgreSQL, MySQL)',
    'NoSQL — flexible, scalable, fast (MongoDB, Redis, Firebase)',
    'NewSQL — distributed SQL, global scale (CockroachDB, Spanner)',
  ]},
  { section: '🚀 Platforms', items: [
    'Vercel — best for Next.js, ISR, edge functions',
    'Netlify — JAMstack, serverless functions',
    'Cloudflare Pages — edge network, generous free tier',
    'Railway — full-stack, databases, cron jobs',
    'Supabase — open-source Firebase alternative',
    'AWS — 200+ services, enterprise scale',
    'Google Cloud — BigQuery, data/ML focused',
    'Azure — enterprise .NET, Active Directory',
  ]},
];

export default function Cheatsheet({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="backdrop" onClick={onClose} />
      <div className="sheet" role="dialog" aria-label="Cheatsheet">
        <div className="sheet-header">
          <h2>📄 HostLore Cheatsheet</h2>
          <button className="sheet-close" onClick={onClose}>✕</button>
        </div>
        <div className="sheet-body">
          {TOPICS.map(t => (
            <div key={t.section} className="sheet-section">
              <h3 className="sheet-section-title">{t.section}</h3>
              <ul className="sheet-list">
                {t.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
          <p className="sheet-print" onClick={() => window.print()}>
            🖨️ Print this page
          </p>
        </div>
      </div>

      <style jsx>{`
        .backdrop {
          position: fixed; inset: 0;
          background: var(--bg-overlay);
          z-index: 800;
        }
        .sheet {
          position: fixed;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          max-width: 480px;
          max-height: 80vh;
          background: var(--bg-card);
          border: 2px solid var(--border);
          border-radius: 20px;
          box-shadow: var(--shadow-lg);
          z-index: 850;
          overflow: hidden;
          animation: popIn 0.25s var(--ease-out);
        }
        @keyframes popIn { from{opacity:0;transform:translate(-50%,-50%) scale(0.9)} to{opacity:1;transform:translate(-50%,-50%) scale(1)} }
        .sheet-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid var(--border);
        }
        .sheet-header h2 {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 600;
        }
        .sheet-close {
          background: none; border: none;
          font-size: 1rem; cursor: pointer;
          color: var(--text-muted); padding: 2px 6px;
          border-radius: 4px;
        }
        .sheet-close:hover { background: var(--bg-soft); }
        .sheet-body {
          padding: 20px 24px;
          overflow-y: auto;
          max-height: calc(80vh - 70px);
        }
        .sheet-section { margin-bottom: 20px; }
        .sheet-section-title {
          font-family: var(--font-display);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--coral);
          margin-bottom: 8px;
        }
        .sheet-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .sheet-list li {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.5;
          padding-left: 16px;
          position: relative;
        }
        .sheet-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--purple);
        }
        .sheet-print {
          text-align: center;
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid var(--border);
          font-size: 0.85rem;
          color: var(--purple);
          cursor: pointer;
          font-weight: 600;
        }
        .sheet-print:hover { opacity: 0.8; }

        @media print {
          .backdrop, .sheet-close, .sheet-print { display: none; }
          .sheet { box-shadow: none; border: 1px solid #ddd; }
        }
      `}</style>
    </>
  );
}
