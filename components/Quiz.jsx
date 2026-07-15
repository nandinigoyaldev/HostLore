'use client';
import { useState, useEffect, useCallback } from 'react';

const SECTIONS = [
  {
    id: 'journey', title: 'The Journey',
    questions: [
      { q: 'What does DNS stand for?', opts: ['Domain Name System', 'Digital Network Service', 'Data Node System', 'Domain Naming Standard'], ans: 0 },
      { q: 'How many steps in the TCP handshake?', opts: ['2', '3', '4', '5'], ans: 1 },
      { q: 'What protocol encrypts web traffic?', opts: ['HTTP', 'FTP', 'TLS', 'SMTP'], ans: 2 },
      { q: 'Where are cached pages stored?', opts: ['Server', 'Browser', 'DNS', 'Router'], ans: 1 },
      { q: 'What does the browser build from HTML?', opts: ['JSON', 'CSSOM', 'DOM', 'XML'], ans: 2 },
    ],
  },
  {
    id: 'hosting', title: 'Hosting Types',
    questions: [
      { q: 'Which hosting is cheapest?', opts: ['Dedicated', 'Cloud', 'Shared', 'VPS'], ans: 2 },
      { q: 'Which hosting gives you a full physical machine?', opts: ['Shared', 'VPS', 'Serverless', 'Dedicated'], ans: 3 },
      { q: 'What does VPS stand for?', opts: ['Virtual Private Server', 'Very Powerful Server', 'Virtual Public Service', 'Verified Proxy Server'], ans: 0 },
      { q: 'Which hosting scales to zero when not in use?', opts: ['Dedicated', 'Cloud', 'Serverless', 'Shared'], ans: 2 },
    ],
  },
  {
    id: 'databases', title: 'Databases',
    questions: [
      { q: 'Which type is PostgreSQL?', opts: ['NoSQL', 'NewSQL', 'SQL', 'Graph'], ans: 2 },
      { q: 'Which is best for flexible schemas?', opts: ['SQL', 'NoSQL', 'NewSQL', 'All equal'], ans: 1 },
      { q: 'What does ACID stand for?', opts: ['Atomic, Consistent, Isolated, Durable', 'Auto, Cache, Index, Data', 'Always Consistent In Data', 'Application Controlled Input Data'], ans: 0 },
      { q: 'NewSQL databases are best for?', opts: ['Small blogs', 'Global multi-region apps', 'Static sites', 'Email servers'], ans: 1 },
    ],
  },
  {
    id: 'platforms', title: 'Platforms',
    questions: [
      { q: 'Which platform is built for Next.js?', opts: ['Netlify', 'Vercel', 'Cloudflare', 'GitHub Pages'], ans: 1 },
      { q: 'Which is an open-source Firebase alternative?', opts: ['AWS', 'Railway', 'Supabase', 'Render'], ans: 2 },
      { q: 'Which cloud provider is known for BigQuery?', opts: ['AWS', 'Azure', 'Google Cloud', 'DigitalOcean'], ans: 2 },
      { q: 'Which platform has a free tier that sleeps after inactivity?', opts: ['Vercel', 'Render', 'Supabase', 'Cloudflare'], ans: 1 },
    ],
  },
];

function getScores() {
  if (typeof window === 'undefined') return {};
  try {
    const stored = JSON.parse(localStorage.getItem('hostlore-quiz') || '{}');
    // Also sync to progress
    const progress = JSON.parse(localStorage.getItem('hostlore-progress') || '{"viewed":[],"bookmarks":[],"quizScores":{}}');
    if (JSON.stringify(progress.quizScores) !== JSON.stringify(stored)) {
      progress.quizScores = stored;
      localStorage.setItem('hostlore-progress', JSON.stringify(progress));
    }
    return stored;
  } catch { return {}; }
}

function saveScores(scores) {
  localStorage.setItem('hostlore-quiz', JSON.stringify(scores));
  const progress = JSON.parse(localStorage.getItem('hostlore-progress') || '{"viewed":[],"bookmarks":[],"quizScores":{}}');
  progress.quizScores = scores;
  localStorage.setItem('hostlore-progress', JSON.stringify(progress));
}

export default function Quiz() {
  const [activeSection, setActiveSection] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [scores, setScores] = useState({});
  const [started, setStarted] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  useEffect(() => { setScores(getScores()); }, []);

  const section = SECTIONS[activeSection];
  const question = section?.questions[questionIdx];
  const total = section?.questions.length || 0;
  const sectionScore = scores[section?.id] ?? { correct: 0, total: 0 };

  function handleAnswer(idx) {
    if (selected !== null) return;
    setSelected(idx);
    setShowResult(true);

    const newScores = { ...scores };
    const prev = newScores[section.id] || { correct: 0, total: 0 };
    newScores[section.id] = {
      correct: prev.correct + (idx === question.ans ? 1 : 0),
      total: prev.total + 1,
    };
    setScores(newScores);
    saveScores(newScores);
  }

  function handleNext() {
    if (questionIdx + 1 < total) {
      setQuestionIdx(p => p + 1);
      setSelected(null);
      setShowResult(false);
    } else if (activeSection + 1 < SECTIONS.length) {
      setActiveSection(p => p + 1);
      setQuestionIdx(0);
      setSelected(null);
      setShowResult(false);
    } else {
      setJustCompleted(true);
      window.dispatchEvent(new CustomEvent('quiz-complete'));
      setTimeout(() => {
        setStarted(false);
        setActiveSection(0);
        setQuestionIdx(0);
        setSelected(null);
        setShowResult(false);
        setJustCompleted(false);
      }, 500);
    }
  }

  if (!started) {
    const allCorrect = Object.values(scores).reduce((s, v) => s + v.correct, 0);
    const allTotal = Object.values(scores).reduce((s, v) => s + v.total, 0);
    return (
      <section id="quiz" className="section" style={{ background: 'var(--bg-warm)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-label">🧠 Quiz</div>
            <h2 className="section-title">Test your knowledge</h2>
            <p className="section-desc">
              Think you got it? Take a short quiz on each section and track your
              progress.
            </p>
          </div>

          {allTotal > 0 && (
            <div className="quiz-overall">
              <span className="quiz-overall-score">
                📊 {allCorrect}/{allTotal} across all topics ({allTotal > 0 ? Math.round((allCorrect / allTotal) * 100) : 0}%)
                {allTotal === 17 && <span className="quiz-complete-badge"> 🎉 Complete!</span>}
              </span>
            </div>
          )}

          <div className="quiz-topics">
            {SECTIONS.map((s, i) => {
              const sc = scores[s.id];
              return (
                <button
                  key={s.id}
                  className="quiz-topic"
                  onClick={() => { setActiveSection(i); setStarted(true); setQuestionIdx(0); setSelected(null); setShowResult(false); }}
                >
                  <div className="quiz-topic-title">{s.title}</div>
                  {sc ? (
                    <div className="quiz-topic-score">{sc.correct}/{sc.total} ({Math.round((sc.correct / sc.total) * 100)}%)</div>
                  ) : (
                    <div className="quiz-topic-start">Start →</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <style jsx>{`
          .quiz-overall {
            text-align: center;
            margin-bottom: 28px;
          }
          .quiz-overall-score {
            font-family: var(--font-display);
            font-size: 1.1rem;
            color: var(--text-secondary);
            background: var(--bg-card);
            padding: 10px 24px;
            border-radius: 12px;
            border: 2px solid var(--border);
          }
          .quiz-complete-badge { color: var(--green); }
          .quiz-topics {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            max-width: 500px;
            margin: 0 auto;
          }
          .quiz-topic {
            background: var(--bg-card);
            border: 2px solid var(--border);
            border-radius: 16px;
            padding: 20px 24px;
            cursor: pointer;
            transition: all var(--fast);
            text-align: left;
            font-family: var(--font-body);
          }
          .quiz-topic:hover {
            border-color: var(--coral);
            box-shadow: var(--shadow-md);
            transform: translateY(-2px);
          }
          .quiz-topic-title {
            font-family: var(--font-display);
            font-weight: 600;
            font-size: 1rem;
            color: var(--text-primary);
            margin-bottom: 4px;
          }
          .quiz-topic-score {
            font-size: 0.85rem;
            color: var(--green);
            font-weight: 600;
          }
          .quiz-topic-start {
            font-size: 0.85rem;
            color: var(--purple);
            font-weight: 600;
          }
          @media (max-width: 640px) {
            .quiz-topics { grid-template-columns: 1fr; }
          }
        `}</style>
      </section>
    );
  }

  if (justCompleted) {
    return (
      <section id="quiz" className="section" style={{ background: 'var(--bg-warm)' }}>
        <div className="container" style={{ textAlign: 'center', padding: '60px 0' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎉</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>All quizzes complete!</h2>
          <p style={{ color: 'var(--text-secondary)' }}>You&apos;ve mastered all topics. Check your progress dashboard for your scores.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="section" style={{ background: 'var(--bg-warm)' }}>
      <div className="container">
        <div className="quiz-header">
          <div className="quiz-progress">
            <span className="quiz-section-name">{section.title}</span>
            <span className="quiz-counter">Q{questionIdx + 1}/{total}</span>
          </div>
          <div className="quiz-progress-bar">
            <div className="quiz-progress-fill" style={{ width: `${((questionIdx + 1) / total) * 100}%` }} />
          </div>
        </div>

        <div className="quiz-card">
          <div className="quiz-question">{question.q}</div>
          <div className="quiz-options">
            {question.opts.map((opt, i) => (
              <button
                key={i}
                className={`quiz-option${selected === i ? ' selected' : ''}${showResult && i === question.ans ? ' correct' : ''}${showResult && selected === i && i !== question.ans ? ' wrong' : ''}`}
                onClick={() => handleAnswer(i)}
                disabled={selected !== null}
              >
                <span className="quiz-opt-letter">{String.fromCharCode(65 + i)}</span>
                <span>{opt}</span>
                {showResult && i === question.ans && <span className="quiz-mark">✓</span>}
                {showResult && selected === i && i !== question.ans && <span className="quiz-mark wrong-mark">✗</span>}
              </button>
            ))}
          </div>

          {showResult && (
            <div className="quiz-feedback">
              <button className="btn btn-primary" onClick={handleNext}>
                {questionIdx + 1 < total ? 'Next →' : activeSection + 1 < SECTIONS.length ? 'Next Topic →' : '🎉 Finish!'}
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .quiz-header {
          max-width: 560px;
          margin: 0 auto 20px;
        }
        .quiz-progress {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .quiz-section-name { font-family: var(--font-display); font-weight: 600; color: var(--text-secondary); }
        .quiz-counter { font-size: 0.85rem; color: var(--text-muted); }
        .quiz-progress-bar { height: 4px; background: var(--bg-soft); border-radius: 4px; overflow: hidden; }
        .quiz-progress-fill { height: 100%; background: var(--gradient-primary); border-radius: 4px; transition: width 0.3s var(--ease-out); }
        .quiz-card {
          max-width: 560px; margin: 0 auto;
          background: var(--bg-card); border: 2px solid var(--border);
          border-radius: 20px; padding: 32px;
        }
        .quiz-question { font-family: var(--font-display); font-size: 1.15rem; font-weight: 600; margin-bottom: 24px; }
        .quiz-options { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
        .quiz-option {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 18px; background: var(--bg);
          border: 2px solid var(--border); border-radius: 12px;
          cursor: pointer; font-family: var(--font-body); font-size: 0.9rem;
          color: var(--text-primary); text-align: left;
          transition: all var(--fast);
        }
        .quiz-option:hover:not(:disabled) { border-color: var(--purple); background: var(--purple-bg); }
        .quiz-option.selected { border-color: var(--purple); }
        .quiz-option.correct { border-color: var(--green); background: #d1fae5; color: #065f46; }
        [data-theme="dark"] .quiz-option.correct { background: #064e3b; color: #6ee7b7; }
        .quiz-option.wrong { border-color: var(--coral); background: var(--coral-bg); color: var(--coral); }
        .quiz-opt-letter {
          width: 28px; height: 28px; border-radius: 8px;
          background: var(--bg-soft); display: flex; align-items: center;
          justify-content: center; font-weight: 700; font-size: 0.8rem;
          flex-shrink: 0; font-family: var(--font-display);
        }
        .quiz-mark { margin-left: auto; font-size: 1.1rem; font-weight: 700; color: var(--green); }
        .wrong-mark { color: var(--coral); }
        .quiz-feedback { text-align: center; animation: fadeSlide 0.3s var(--ease-out); }
        @keyframes fadeSlide { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </section>
  );
}
