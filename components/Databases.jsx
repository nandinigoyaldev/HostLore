'use client';
const DB_TYPES = [
  {
    type: 'SQL', icon: '🗄️', badge: 'Relational', badgeClass: 'sql-badge',
    title: 'PostgreSQL / MySQL / SQLite',
    personality: 'The strict accountant',
    desc: 'Data goes into tables with rigid schemas. Every row has the same columns. ACID compliant — transactions are atomic, consistent, isolated, durable.',
    colors: ['#8b5cf6', '#a78bfa'],
    examples: ['PostgreSQL', 'MySQL', 'SQLite', 'MariaDB'],
    strengths: ['Strong data integrity', 'Complex queries (JOINs)', 'Battle-tested (40+ years)'],
    useCase: 'Banking, ERP, any app where data consistency matters more than flexibility.',
  },
  {
    type: 'NoSQL', icon: '📦', badge: 'Document / Key-Value', badgeClass: 'nosql-badge',
    title: 'MongoDB / Redis / Firebase',
    personality: 'The flexible artist',
    desc: 'No rigid schemas. Store JSON documents, key-value pairs, or graphs. Scale horizontally easily. Great for rapid iteration.',
    colors: ['#38bdf8', '#22d3ee'],
    examples: ['MongoDB', 'Redis', 'Firebase', 'Cassandra'],
    strengths: ['Flexible schema', 'Easy to scale', 'Fast for simple queries'],
    useCase: 'Real-time apps, IoT, catalogs, session stores — where speed and flexibility win.',
  },
  {
    type: 'NewSQL', icon: '⚡', badge: 'Distributed SQL', badgeClass: 'newsql-badge',
    title: 'CockroachDB / PlanetScale / Spanner',
    personality: 'The globetrotter',
    desc: 'SQL with ACID guarantees, but distributed across data centers worldwide. Combines the reliability of SQL with the scale of NoSQL.',
    colors: ['#fbbf24', '#f59e0b'],
    examples: ['CockroachDB', 'PlanetScale', 'Google Spanner', 'YugabyteDB'],
    strengths: ['Global distribution', 'SQL interface', 'Strong consistency at scale'],
    useCase: 'Multi-region apps, SaaS platforms that need SQL consistency worldwide.',
  },
];

export default function Databases() {
  return (
    <section id="databases" className="section">
      <span className="section-number">03</span>
      <div className="container">
        <div className="section-header">
          <div className="section-label">Databases</div>
          <h2 className="section-title">
            SQL, NoSQL, or NewSQL?
          </h2>
          <p className="section-desc">
            Your app needs to store data. The type of database you choose shapes
            everything — performance, scalability, and your sanity.
          </p>
        </div>

        <div className="db-grid">
          {DB_TYPES.map(db => (
            <div key={db.type} className="db-card" style={{ '--accent': db.colors[0], '--accent-faint': `${db.colors[0]}15` }}>
              <div className="db-top">
                <span className="db-icon">{db.icon}</span>
                <span className={`db-badge ${db.badgeClass}`}>{db.badge}</span>
              </div>
              <h3 className="db-title">{db.type}</h3>
              <div className="db-subtitle">{db.title}</div>
              <div className="db-personality">{db.personality}</div>
              <p className="db-desc">{db.desc}</p>

              <div className="db-section">
                <span className="db-section-label">Examples</span>
                <div className="db-chips">
                  {db.examples.map(e => <span key={e} className="db-chip">{e}</span>)}
                </div>
              </div>

              <div className="db-section">
                <span className="db-section-label">Strengths</span>
                <ul className="db-strengths">
                  {db.strengths.map(s => <li key={s}>{s}</li>)}
                </ul>
              </div>

              <div className="db-use-case">
                <strong>Best for:</strong> {db.useCase}
              </div>
            </div>
          ))}
        </div>

        <div className="db-summary">
          <div className="db-summary-inner">
            <h3>The database <span className="gradient-text">truth</span></h3>
            <div className="db-summary-grid">
              <div className="db-summary-item">
                <span className="db-summary-q">Need strict data integrity?</span>
                <span className="db-summary-a">→ <strong>SQL</strong></span>
              </div>
              <div className="db-summary-item">
                <span className="db-summary-q">Need to move fast and iterate?</span>
                <span className="db-summary-a">→ <strong>NoSQL</strong></span>
              </div>
              <div className="db-summary-item">
                <span className="db-summary-q">Need both, globally?</span>
                <span className="db-summary-a">→ <strong>NewSQL</strong></span>
              </div>
              <div className="db-summary-item">
                <span className="db-summary-q">Don&apos;t overthink it?</span>
                <span className="db-summary-a">→ Start with <strong>PostgreSQL</strong> and move when you need to</span>
              </div>
            </div>
            <p className="db-summary-end">Most real-world apps use a mix of all three. There&apos;s no one right answer.</p>
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
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px;
          position: relative;
          overflow: hidden;
          transition: all var(--med);
        }
        .db-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--accent), var(--accent));
        }
        .db-card:hover {
          border-color: rgba(139, 92, 246, 0.3);
          transform: translateY(-4px);
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.1);
        }
        .db-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .db-icon { font-size: 1.8rem; }
        .db-badge {
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 3px 10px;
          border-radius: 100px;
          text-transform: uppercase;
        }
        .sql-badge { background: rgba(139, 92, 246, 0.12); color: #a78bfa; border: 1px solid rgba(139, 92, 246, 0.25); }
        .nosql-badge { background: rgba(56, 189, 248, 0.12); color: #7dd3fc; border: 1px solid rgba(56, 189, 248, 0.25); }
        .newsql-badge { background: rgba(251, 191, 36, 0.12); color: #fcd34d; border: 1px solid rgba(251, 191, 36, 0.25); }
        .db-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 800;
          margin-bottom: 2px;
        }
        .db-subtitle {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-bottom: 4px;
        }
        .db-personality {
          font-size: 0.82rem;
          color: var(--text-dim);
          font-style: italic;
          margin-bottom: 12px;
        }
        .db-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 16px;
        }
        .db-section {
          margin-bottom: 14px;
        }
        .db-section-label {
          font-size: 0.7rem;
          color: var(--text-dim);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          display: block;
          margin-bottom: 6px;
        }
        .db-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }
        .db-chip {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          padding: 3px 10px;
          border-radius: 6px;
        }
        .db-strengths {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .db-strengths li {
          font-size: 0.83rem;
          color: var(--text-secondary);
          line-height: 1.5;
          padding-left: 16px;
          position: relative;
        }
        .db-strengths li::before { content: '→'; position: absolute; left: 0; color: var(--accent); }
        .db-use-case {
          font-size: 0.8rem;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border);
          padding: 10px 14px;
          border-radius: 10px;
          line-height: 1.6;
          margin-top: auto;
        }
        .db-use-case strong { color: var(--text-secondary); }

        .db-summary-inner {
          background: var(--bg-card);
          border: 1px solid var(--border-md);
          border-radius: 16px;
          padding: 36px;
        }
        .db-summary-inner h3 {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 800;
          margin-bottom: 24px;
          text-align: center;
        }
        .db-summary-grid {
          display: grid;
          gap: 10px;
          margin-bottom: 20px;
        }
        .db-summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 10px;
          gap: 12px;
        }
        .db-summary-q {
          font-size: 0.88rem;
          color: var(--text-secondary);
        }
        .db-summary-a {
          font-size: 0.88rem;
          color: var(--text-primary);
          white-space: nowrap;
        }
        .db-summary-a strong { color: var(--purple); }
        .db-summary-end {
          text-align: center;
          font-size: 0.9rem;
          color: var(--text-muted);
          border-top: 1px solid var(--border);
          padding-top: 20px;
        }

        @media (max-width: 900px) {
          .db-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .db-summary-item { flex-direction: column; align-items: flex-start; gap: 4px; }
        }
      `}</style>
    </section>
  );
}
