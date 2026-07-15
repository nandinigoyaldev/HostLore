'use client';
const TYPES = [
  {
    icon: '🏠', title: 'Shared Hosting', tagline: 'The budget apartment',
    desc: 'Your site lives on a server with hundreds of others. Cheap, but if a neighbor gets popular, your site slows down.',
    best: 'Personal blogs, small static sites', cost: 1, complexity: 1,
    pros: ['Cheapest option (~$2-10/mo)', 'No maintenance', 'Provider handles security'],
    cons: ['Limited resources', 'Can be slow if neighbors spike', 'No root access'],
  },
  {
    icon: '🏢', title: 'VPS', tagline: 'Your own apartment in a building',
    desc: 'A virtual machine with guaranteed resources. You get root access and full control without paying for physical hardware.',
    best: 'Growing sites, web apps, staging environments', cost: 2, complexity: 2,
    pros: ['Dedicated resources', 'Root access', 'Scalable'],
    cons: ['Requires sysadmin skills', 'More expensive (~$5-80/mo)', 'You handle security'],
  },
  {
    icon: '🏗️', title: 'Dedicated Server', tagline: 'The whole building',
    desc: 'An entire physical server just for you. Maximum power, maximum responsibility, maximum cost.',
    best: 'High-traffic apps, big data, gaming servers', cost: 3, complexity: 3,
    pros: ['Full hardware control', 'No neighbors', 'Maximum performance'],
    cons: ['Expensive (~$80-500+/mo)', 'Requires expertise', 'Overkill for most sites'],
  },
  {
    icon: '☁️', title: 'Cloud Hosting', tagline: 'Elastic and on-demand',
    desc: 'Resources scale automatically across data centers worldwide. Pay only for what you use. AWS, GCP, Azure.',
    best: 'SaaS apps, APIs, variable-traffic sites', cost: 2, complexity: 3,
    pros: ['Auto-scaling', 'Pay-per-use', 'Global data centers'],
    cons: ['Complex pricing', 'Requires devops knowledge', 'Can surprise you on the bill'],
  },
  {
    icon: '⚡', title: 'Serverless', tagline: 'Just code, no servers',
    desc: 'Upload functions, not servers. Platform handles everything — scaling, security, maintenance. You just pay per execution.',
    best: 'APIs, webhooks, event-driven apps, prototypes', cost: 1, complexity: 2,
    pros: ['No server management', 'Auto-scales to zero', 'Pay per execution'],
    cons: ['Cold starts', 'Limited execution time', 'Vendor lock-in risk'],
  },
];

function CostBar({ level }) {
  const labels = ['$', '$$', '$$$'];
  return (
    <div className="cost-bar">
      <span className="cost-label">Cost</span>
      <div className="cost-dots">
        {[1, 2, 3].map(i => (
          <div key={i} className={`cost-dot${i <= level ? ' filled' : ''}`} />
        ))}
      </div>
      <span className="cost-value">{labels[level - 1]}</span>
    </div>
  );
}

function ComplexityBar({ level }) {
  const labels = ['Easy', 'Medium', 'Hard'];
  return (
    <div className="cost-bar">
      <span className="cost-label">Setup</span>
      <div className="cost-dots">
        {[1, 2, 3].map(i => (
          <div key={i} className={`cost-dot complexity${i <= level ? ' filled' : ''}`} />
        ))}
      </div>
      <span className="cost-value">{labels[level - 1]}</span>
    </div>
  );
}

export default function HostingTypes() {
  return (
    <section id="hosting" className="section">
      <span className="section-number">02</span>
      <div className="container">
        <div className="section-header">
          <div className="section-label">Hosting Types</div>
          <h2 className="section-title">
            Which hosting fits your project?
          </h2>
          <p className="section-desc">
            From $3 shared hosting to enterprise cloud — pick the right foundation
            for your site or app.
          </p>
        </div>

        <div className="hosting-grid">
          {TYPES.map(t => (
            <div key={t.title} className="hosting-card card">
              <div className="hosting-icon-wrap">{t.icon}</div>
              <div className="hosting-tagline">{t.tagline}</div>
              <h3 className="hosting-title">{t.title}</h3>
              <p className="hosting-desc">{t.desc}</p>

              <CostBar level={t.cost} />
              <ComplexityBar level={t.complexity} />

              <div className="hosting-lists">
                <div>
                  <span className="hosting-list-label pros-label">👍 Pros</span>
                  <ul className="hosting-pros">
                    {t.pros.map(p => <li key={p}>{p}</li>)}
                  </ul>
                </div>
                <div>
                  <span className="hosting-list-label cons-label">👎 Cons</span>
                  <ul className="hosting-cons">
                    {t.cons.map(c => <li key={c}>{c}</li>)}
                  </ul>
                </div>
              </div>

              <div className="hosting-best">
                <span className="hosting-best-label">Best for</span> {t.best}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hosting-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .hosting-card {
          display: flex;
          flex-direction: column;
          padding: 24px;
        }
        .hosting-icon-wrap {
          font-size: 2rem;
          margin-bottom: 8px;
        }
        .hosting-tagline {
          font-size: 0.78rem;
          color: var(--purple);
          font-style: italic;
          margin-bottom: 4px;
          font-weight: 500;
        }
        .hosting-title {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
        }
        .hosting-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 16px;
          flex: 1;
        }
        .cost-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .cost-label {
          font-size: 0.7rem;
          color: var(--text-dim);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          width: 48px;
          flex-shrink: 0;
        }
        .cost-dots {
          display: flex;
          gap: 4px;
        }
        .cost-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          transition: all var(--fast);
        }
        .cost-dot.filled { background: var(--rose); border-color: var(--rose); box-shadow: 0 0 6px rgba(244, 63, 94, 0.4); }
        .cost-dot.complexity.filled { background: var(--blue); border-color: var(--blue); box-shadow: 0 0 6px rgba(56, 189, 248, 0.4); }
        .cost-value {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .hosting-lists {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin: 16px 0;
        }
        .hosting-list-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          display: block;
          margin-bottom: 6px;
        }
        .pros-label { color: var(--green); }
        .cons-label { color: var(--text-dim); }
        .hosting-pros, .hosting-cons {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .hosting-pros li, .hosting-cons li {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.5;
          padding-left: 12px;
          position: relative;
        }
        .hosting-pros li::before { content: '✓'; position: absolute; left: 0; color: var(--green); }
        .hosting-cons li::before { content: '✗'; position: absolute; left: 0; color: var(--text-dim); }
        .hosting-best {
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid var(--border);
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.5;
        }
        .hosting-best-label {
          color: var(--purple);
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .hosting-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .hosting-grid { grid-template-columns: 1fr; }
          .hosting-lists { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
