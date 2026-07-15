'use client';
import { useEffect, useState, useCallback } from 'react';

const SHORTCUTS = [
  { key: '?', desc: 'Toggle keyboard shortcuts' },
  { key: 's', desc: 'Open search' },
  { key: 'p', desc: 'Open progress dashboard' },
  { key: 'c', desc: 'Open AI Chat' },
  { key: '1', desc: 'Scroll to Journey' },
  { key: '2', desc: 'Scroll to Hosting Types' },
  { key: '3', desc: 'Scroll to Databases' },
  { key: '4', desc: 'Scroll to Platforms' },
  { key: '5', desc: 'Scroll to Quiz' },
  { key: 't', desc: 'Toggle dark/light theme' },
  { key: 'Esc', desc: 'Close any open modal' },
];

export default function Shortcuts({ onSearch, onProgress, onChat, onTheme }) {
  const [showModal, setShowModal] = useState(false);

  const handleKey = useCallback((e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    const key = e.key.toLowerCase();

    switch (key) {
      case '?':
        e.preventDefault();
        setShowModal(p => !p);
        break;
      case 's':
        e.preventDefault();
        onSearch?.();
        break;
      case 'p':
        e.preventDefault();
        onProgress?.();
        break;
      case 'c':
        e.preventDefault();
        onChat?.();
        break;
      case '1':
        e.preventDefault();
        document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case '2':
        e.preventDefault();
        document.getElementById('hosting')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case '3':
        e.preventDefault();
        document.getElementById('databases')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case '4':
        e.preventDefault();
        document.getElementById('platforms')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case '5':
        e.preventDefault();
        document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 't':
        e.preventDefault();
        onTheme?.();
        break;
    }
  }, [onSearch, onProgress, onChat, onTheme]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <>
      {showModal && (
        <>
          <div className="backdrop" onClick={() => setShowModal(false)} />
          <div className="modal">
            <div className="modal-header">
              <h3>⌨️ Keyboard Shortcuts</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              {SHORTCUTS.map(s => (
                <div key={s.key} className="shortcut-row">
                  <kbd className="shortcut-key">{s.key}</kbd>
                  <span className="shortcut-desc">{s.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .backdrop {
          position: fixed; inset: 0;
          background: var(--bg-overlay);
          z-index: 900;
        }
        .modal {
          position: fixed;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          max-width: 360px;
          background: var(--bg-card);
          border: 2px solid var(--border);
          border-radius: 20px;
          box-shadow: var(--shadow-lg);
          z-index: 950;
          animation: popIn 0.2s var(--ease-out);
        }
        @keyframes popIn { from{opacity:0;transform:translate(-50%,-50%) scale(0.9)} to{opacity:1;transform:translate(-50%,-50%) scale(1)} }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 22px;
          border-bottom: 1px solid var(--border);
        }
        .modal-header h3 {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 600;
        }
        .modal-close {
          background: none; border: none;
          font-size: 1rem; cursor: pointer;
          color: var(--text-muted); padding: 2px 6px;
          border-radius: 4px;
        }
        .modal-close:hover { background: var(--bg-soft); }
        .modal-body {
          padding: 16px 22px 22px;
        }
        .shortcut-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 6px 0;
        }
        .shortcut-key {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 30px;
          padding: 3px 8px;
          background: var(--bg-soft);
          border: 1px solid var(--border);
          border-radius: 6px;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-primary);
          text-align: center;
        }
        .shortcut-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
      `}</style>
    </>
  );
}
