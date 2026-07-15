'use client';
const DB_TYPES = [
  {
    type: 'SQL', icon: '🗄️', badge: 'Relational', badgeClass: 'badge-sql',
    subtitle: 'PostgreSQL · MySQL · SQLite',
    personality: 'The strict accountant 🧮',
    desc: 'Data goes into rigid tables. Every row has the same columns. ACID compliant — transactions are reliable and consistent.',
    color: '#6c5ce7',
    bgColor: '#f0eeff',
    examples: ['PostgreSQL', 'MySQL', 'SQLite', 'MariaDB'],
    strengths: ['Strong data integrity', 'Complex queries (JOINs)', '40+ years of battle testing'],
    useCase: 'Banking, ERP, any app where consistency matters more than flexibility.',
  },
  {
    type: 'NoSQL', icon: '📦', badge: 'Document / Key-Value', badgeClass: 'badge-nosql',
    subtitle: 'MongoDB · Redis · Firebase',
    personality: 'The flexible artist 🎨',
    desc: 'No rigid schemas. Store JSON, key-value pairs, or graphs. Easy to scale horizontally. Great for rapid iteration.',
    color: '#4ecdc4',
    bgColor: '#e8faf8',
    examples: ['MongoDB', 'Redis', 'Firebase', 'Cassandra'],
    strengths: ['Flexible schema', 'Easy to scale', 'Fast for simple queries'],
    useCase: 'Real-time apps, IoT, session stores — where speed and flexibility win.',
  },
  {
    type: 'NewSQL', icon: '⚡', badge: 'Distributed SQL', badgeClass: 'badge-newsql',
    subtitle: 'CockroachDB · PlanetScale · Spanner',
    personality: 'The globetrotter 🌍',
    desc: 'SQL with ACID guarantees, distributed across data centers worldwide. Best of both worlds.',
    color: '#ffd93d',
    bgColor: '#fffbe6',
    examples: ['CockroachDB', 'PlanetScale', 'Google Spanner', 'YugabyteDB'],
    strengths: ['Global distribution', 'SQL interface', 'Consistency at scale'],
    useCase: 'Multi-region apps, SaaS platforms needing SQL consistency worldwide.',
  },
];

export default function Databases() {
  return (
    <section id="databases" className="section" style={{ background: '#fdfcfa' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-label">🗄️ Databases</div>
          <h2 className="section-title">
            SQL, NoSQL, or NewSQL?
          </h2>
          <p className="section-desc">
            Your database choice shapes everything — performance, scalability, and
            your daily sanity. Here&apos;s how they compare.
          </p>
        </div>

        <div className="db-grid">
          {DB_TYPES.map(db => (
            <div key={db.type} className="db-card" style={{ borderTopColor: db.color }}>
              <div className="db-top">
                <span className="db-icon">{db.icon}</span>
                <span className={`db-badge ${db.badgeClass}`} style={{ background: `${db.color}15`, color: db.color, borderColor: `${db.color}30` }}>
                  {db.badge}
                </span>
              </div>
              <h3 className="db-type">{db.type}</h3>
              <div className="db-subtitle">{db.subtitle}</div>
              <div className="db-personality">{db.personality}</div>
              <p className="db-desc">{db.desc}</p>

              <div className="db-section">
                <div className="db-section-label">Examples</div>
                <div className="db-chips">
                  {db.examples.map(e => (
                    <span key={e} className="db-chip">{e}</span>
                  ))}
                </div>
              </div>

              <div className="db-section">
                <div className="db-section-label">Strengths</div>
                <ul className="db-strengths">
                  {db.strengths.map(s => (
                    <li key={s}><span className="db-strength-dot" style={{ background: db.color }} />{s}</li>
                  ))}
                </ul>
              </div>

              <div className="db-use">
                <strong>Best for:</strong> {db.useCase}
              </div>
            </div>
          ))}
        </div>

        <div className="db-truth">
          <div className="db-truth-inner">
            <h3>The database <span className="gradient-text">truth</span></h3>
            <div className="db-truth-grid">
              <div className="db-truth-row">
                <span>Need strict data integrity?</span>
                <span className="db-truth-ans">→ <strong>SQL</strong></span>
              </div>
              <div className="db-truth-row">
                <span>Moving fast and iterating?</span>
                <span className="db-truth-ans">→ <strong>NoSQL</strong></span>
              </div>
              <div className="db-truth-row">
                <span>Need both, globally?</span>
                <span className="db-truth-ans">→ <strong>NewSQL</strong></span>
              </div>
              <div className="db-truth-row">
                <span>Don&apos;t overthink it?</span>
                <span className="db-truth-ans">→ Start with <strong>PostgreSQL</strong></span>
              </div>
            </div>
            <p className="db-truth-end">Most apps use a mix of all three. There&apos;s no single right answer.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .db-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }
        .db-card {
          background: var(--bg-card);
          border: 2px solid var(--border);
          border-top: 4px solid #6c5ce7;
          border-radius: 20px;
          padding: 28px;
          transition: all var(--med);
        }
        .db-card:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-4px);
        }
        .db-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .db-icon { font-size: 2rem; }
        .db-badge {
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 4px 12px;
          border-radius: 100px;
          text-transform: uppercase;
          border: 1px solid;
        }
        .db-type {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 2px;
        }
        .db-subtitle {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-bottom: 4px;
        }
        .db-personality {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-style: italic;
          margin-bottom: 12px;
        }
        .db-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 16px;
        }
        .db-section { margin-bottom: 14px; }
        .db-section-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 6px;
        }
        .db-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .db-chip {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-secondary);
          background: var(--bg-soft);
          padding: 3px 10px;
          border-radius: 6px;
        }
        .db-strengths {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .db-strengths li {
          font-size: 0.83rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .db-strength-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .db-use {
          font-size: 0.8rem;
          color: var(--text-muted);
          background: var(--bg-soft);
          border-: 1px solid var(--border);
          padding: 10px 14px;
          border-radius: 10px;
          line-height: 1.6;
          margin-top: auto;
        }
        .db-use strong { color: var(--text-secondary); }

        .db-truth-inner {
          background: var(--bg-card);
          border: 2px solid var(--border);
          border-radius: 20px;
          padding: 36px;
        }
        .db-truth-inner h3 {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 24px;
          text-align: center;
        }
        .db-truth-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }
        .db-truth-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 18px;
          background: var(--bg);
          border-radius: 12px;
          gap: 12px;
          flex-wrap: wrap;
        }
        .db-truth-row span:first-child {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .db-truth-ans {
          font-size: 0.9rem;
          color: var(--text-primary);
          white-space: nowrap;
        }
        .db-truth-ans strong { color: var(--purple); }
        .db-truth-end {
          text-align: center;
          font-size: 0.9rem;
          color: var(--text-muted);
          border-top: 2px solid var(--border);
          padding-top: 20px;
        }

        @media (max-width: 900px) {
          .db-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
