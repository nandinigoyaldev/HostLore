'use client';
import { useState, useEffect, useCallback } from 'react';

const SECTIONS_DATA = [
  { id: 'hero', label: 'Welcome', icon: '👋' },
  { id: 'journey', label: 'The Journey', icon: '🚀', steps: 8 },
  { id: 'visualizer', label: 'Network Visualizer', icon: '🌐' },
  { id: 'hosting', label: 'Hosting Types', icon: '🏡', steps: 5 },
  { id: 'databases', label: 'Databases', icon: '🗄️', steps: 3 },
  { id: 'platforms', label: 'Platforms', icon: '🚀', steps: 15 },
  { id: 'quiz', label: 'Quiz', icon: '🧠' },
  { id: 'live-demo', label: 'Live Demo', icon: '⚡' },
  { id: 'ask', label: 'Ask HostLore', icon: '🤖' },
];

export function getProgress() {
  if (typeof window === 'undefined') return { viewed: [], bookmarks: [], quizScores: {} };
  try {
    return JSON.parse(localStorage.getItem('hostlore-progress') || '{"viewed":[],"bookmarks":[],"quizScores":{}}');
  } catch { return { viewed: [], bookmarks: [], quizScores: {} }; }
}

function saveProgress(p) {
  localStorage.setItem('hostlore-progress', JSON.stringify(p));
}

export function markSectionViewed(id) {
  const p = getProgress();
  if (!p.viewed.includes(id)) {
    p.viewed.push(id);
    saveProgress(p);
  }
}

export function toggleBookmark(id) {
  const p = getProgress();
  const idx = p.bookmarks.indexOf(id);
  if (idx > -1) p.bookmarks.splice(idx, 1);
  else p.bookmarks.push(id);
  saveProgress(p);
  return p.bookmarks.includes(id);
}

export function isBookmarked(id) {
  return getProgress().bookmarks.includes(id);
}

export default function ProgressDashboard({ isOpen, onClose }) {
  const [progress, setProgress] = useState({ viewed: [], bookmarks: [], quizScores: {} });
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setProgress(getProgress());
    const visits = JSON.parse(localStorage.getItem('hostlore-visits') || '[]');
    const today = new Date().toDateString();
    if (!visits.includes(today)) {
      visits.push(today);
      localStorage.setItem('hostlore-visits', JSON.stringify(visits));
    }
    let s = 0;
    const d = new Date();
    for (let i = 0; i < 365; i++) {
      const ds = new Date(d.getTime() - i * 86400000).toDateString();
      if (visits.includes(ds)) s++;
      else if (i > 0) break;
    }
    setStreak(s);
  }, [isOpen]);

  if (!isOpen) return null;

  const pct = Math.round((progress.viewed.length / SECTIONS_DATA.length) * 100);
  const totalQuiz = Object.values(progress.quizScores).reduce((s, v) => s + v.total, 0);
  const correctQuiz = Object.values(progress.quizScores).reduce((s, v) => s + v.correct, 0);

  return (
    <>
      <div className="backdrop" onClick={onClose} />
      <div className="dashboard" role="dialog" aria-label="Your Progress">
        <div className="dash-header">
          <h2>📊 Your Progress</h2>
          <button className="dash-close" onClick={onClose}>✕</button>
        </div>

        <div className="dash-body">
          <div className="dash-cards">
            <div className="dash-card">
              <div className="dash-card-value">{pct}%</div>
              <div className="dash-card-label">Sections viewed</div>
              <div className="dash-bar"><div className="dash-bar-fill" style={{ width: `${pct}%` }} /></div>
            </div>
            <div className="dash-card">
              <div className="dash-card-value">{streak}</div>
              <div className="dash-card-label">Day streak</div>
              <div className="dash-emoji">{streak > 0 ? '🔥' : '🌱'}</div>
            </div>
            <div className="dash-card">
              <div className="dash-card-value">{totalQuiz > 0 ? `${Math.round((correctQuiz / totalQuiz) * 100)}%` : '—'}</div>
              <div className="dash-card-label">Quiz accuracy</div>
              <div className="dash-card-sub">{correctQuiz}/{totalQuiz} correct</div>
            </div>
          </div>

          <h3 className="dash-subtitle">📌 Bookmarked</h3>
          {progress.bookmarks.length === 0 ? (
            <p className="dash-empty">Click the ★ on any section to bookmark it</p>
          ) : (
            <div className="dash-bookmarks">
              {progress.bookmarks.map(id => {
                const s = SECTIONS_DATA.find(s => s.id === id);
                return s ? (
                  <button key={id} className="dash-bookmark" onClick={() => { onClose(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }}>
                    <span>{s.icon}</span>
                    <span>{s.label}</span>
                  </button>
                ) : null;
              })}
            </div>
          )}

          <h3 className="dash-subtitle">🗺️ Roadmap</h3>
          <div className="dash-roadmap">
            {SECTIONS_DATA.map((s, i) => {
              const viewed = progress.viewed.includes(s.id);
              const bookmarked = progress.bookmarks.includes(s.id);
              return (
                <button key={s.id} className={`dash-step${viewed ? ' done' : ''}`} onClick={() => { onClose(); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }); }}>
                  <div className="dash-step-num">{viewed ? '✓' : i + 1}</div>
                  <div className="dash-step-info">
                    <span className="dash-step-label">{s.icon} {s.label}</span>
                    {bookmarked && <span className="dash-step-bookmark">★</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .backdrop {
          position: fixed; inset: 0;
          background: var(--bg-overlay);
          z-index: 800;
        }
        .dashboard {
          position: fixed;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          max-width: 420px;
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
        .dash-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid var(--border);
        }
        .dash-header h2 {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 600;
        }
        .dash-close {
          background: none;
          border: none;
          font-size: 1.1rem;
          cursor: pointer;
          color: var(--text-muted);
          padding: 4px 8px;
          border-radius: 6px;
        }
        .dash-close:hover { background: var(--bg-soft); }
        .dash-body {
          padding: 20px 24px;
          overflow-y: auto;
          max-height: calc(80vh - 70px);
        }
        .dash-cards {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
          margin-bottom: 24px;
        }
        .dash-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 14px;
          text-align: center;
        }
        .dash-card-value {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 700;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .dash-card-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-top: 2px;
        }
        .dash-card-sub {
          font-size: 0.7rem;
          color: var(--text-dim);
          margin-top: 2px;
        }
        .dash-bar {
          height: 3px;
          background: var(--bg-soft);
          border-radius: 3px;
          margin-top: 8px;
          overflow: hidden;
        }
        .dash-bar-fill {
          height: 100%;
          background: var(--gradient-primary);
          border-radius: 3px;
          transition: width 0.5s;
        }
        .dash-emoji { font-size: 1.2rem; margin-top: 4px; }
        .dash-subtitle {
          font-family: var(--font-display);
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 10px;
          color: var(--text-secondary);
        }
        .dash-empty {
          font-size: 0.82rem;
          color: var(--text-dim);
          margin-bottom: 20px;
        }
        .dash-bookmarks {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 24px;
        }
        .dash-bookmark {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 0.82rem;
          cursor: pointer;
          font-family: var(--font-body);
          color: var(--text-secondary);
          transition: all var(--fast);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .dash-bookmark:hover { border-color: var(--purple); color: var(--purple); }
        .dash-roadmap {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .dash-step {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          border-radius: 10px;
          border: none;
          background: none;
          cursor: pointer;
          transition: background var(--fast);
          font-family: var(--font-body);
          text-align: left;
        }
        .dash-step:hover { background: var(--bg-soft); }
        .dash-step.done { opacity: 0.7; }
        .dash-step-num {
          width: 26px; height: 26px;
          border-radius: 50%;
          background: var(--bg-soft);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--text-muted);
          flex-shrink: 0;
          font-family: var(--font-display);
        }
        .dash-step.done .dash-step-num { background: var(--green); border-color: var(--green); color: #fff; }
        .dash-step-info {
          flex: 1;
          display: flex;
          justify-content: space-between;
        }
        .dash-step-label {
          font-size: 0.85rem;
          color: var(--text-primary);
        }
        .dash-step-bookmark { color: var(--yellow); font-size: 0.8rem; }

        @media (max-width: 640px) {
          .dash-cards { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
