'use client';
const TYPES = [
  {
    icon: '🏠', title: 'Shared Hosting', tagline: 'The budget-friendly starter',
    desc: 'Your site lives on a server with hundreds of others. Super cheap, and if a neighbor gets popular, your site might slow down.',
    best: 'Personal blogs, small static sites',
    cost: 1, setup: 1,
    pros: ['Cheapest option (~$2-10/mo)', 'Provider handles maintenance', 'No technical skills needed'],
    cons: ['Limited resources', 'Can be slow if neighbors spike', 'No root access'],
  },
  {
    icon: '🏗️', title: 'VPS', tagline: 'Your own slice of a server',
    desc: 'A virtual machine with guaranteed resources. You get full control without paying for physical hardware.',
    best: 'Growing sites, web apps, staging',
    cost: 2, setup: 2,
    pros: ['Dedicated resources', 'Root access', 'Good value for money'],
    cons: ['Need some sysadmin skills', '~$5-80/mo', 'You handle security'],
  },
  {
    icon: '🏢', title: 'Dedicated Server', tagline: 'The whole building',
    desc: 'An entire physical server just for you. Maximum power, maximum responsibility, maximum cost.',
    best: 'High-traffic apps, gaming servers',
    cost: 3, setup: 3,
    pros: ['Full hardware control', 'No noisy neighbors', 'Maximum performance'],
    cons: ['Expensive (~$80-500+/mo)', 'Requires serious expertise', 'Overkill for most sites'],
  },
  {
    icon: '☁️', title: 'Cloud Hosting', tagline: 'Elastic and scalable',
    desc: 'Resources scale automatically across global data centers. Pay only for what you use — AWS, GCP, Azure style.',
    best: 'SaaS apps, APIs, variable traffic',
    cost: 2, setup: 3,
    pros: ['Auto-scaling', 'Pay-per-use pricing', 'Global infrastructure'],
    cons: ['Complex pricing', 'Requires devops knowledge', 'Unexpected bills possible'],
  },
  {
    icon: '⚡', title: 'Serverless', tagline: 'Just code, no servers',
    desc: 'Upload functions, not servers. The platform handles scaling, security, maintenance. You pay per execution.',
    best: 'APIs, webhooks, prototypes',
    cost: 1, setup: 2,
    pros: ['No server management', 'Scales to zero', 'Pay per execution'],
    cons: ['Cold starts', 'Limited execution time', 'Vendor lock-in risk'],
  },
];

function Meter({ level, label, activeColor }) {
  return (
    <div className="meter">
      <span className="meter-label">{label}</span>
      <div className="meter-bar">
        {[1, 2, 3].map(i => (
          <div key={i} className={`meter-segment${i <= level ? ' filled' : ''}`} style={i <= level ? { background: activeColor, borderColor: activeColor } : {}} />
        ))}
      </div>
    </div>
  );
}

export default function HostingTypes() {
  return (
    <section id="hosting" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-label">🏡 Hosting Types</div>
          <h2 className="section-title">
            Which hosting fits your project?
          </h2>
          <p className="section-desc">
            From $3 shared hosting to enterprise cloud — here&apos;s how to pick the
            right foundation for your site.
          </p>
        </div>

        <div className="h-grid">
          {TYPES.map(t => (
            <div key={t.title} className="h-card">
              <div className="h-top">
                <span className="h-icon">{t.icon}</span>
                <div>
                  <div className="h-tagline">{t.tagline}</div>
                  <h3 className="h-title">{t.title}</h3>
                </div>
              </div>
              <p className="h-desc">{t.desc}</p>

              <div className="h-meters">
                <Meter level={t.cost} label="Cost" activeColor="#ff6b6b" />
                <Meter level={t.setup} label="Setup" activeColor="#6c5ce7" />
              </div>

              <div className="h-lists">
                <div>
                  <span className="h-list-label" style={{ color: '#00b894' }}>👍 Pros</span>
                  <ul className="h-pros">
                    {t.pros.map(p => <li key={p}>{p}</li>)}
                  </ul>
                </div>
                <div>
                  <span className="h-list-label" style={{ color: '#b2bec3' }}>👎 Cons</span>
                  <ul className="h-cons">
                    {t.cons.map(c => <li key={c}>{c}</li>)}
                  </ul>
                </div>
              </div>

              <div className="h-best">
                <span className="h-best-label">Best for</span>
                <span>{t.best}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .h-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .h-card {
          background: var(--bg-card);
          border: 2px solid var(--border);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          transition: all var(--med);
        }
        .h-card:hover {
          border-color: var(--coral);
          box-shadow: var(--shadow-md);
          transform: translateY(-4px);
        }
        .h-top { display: flex; align-items: center; gap: 14px; margin-bottom: 12px; }
        .h-icon { font-size: 2rem; }
        .h-tagline {
          font-size: 0.78rem;
          color: var(--coral);
          font-weight: 600;
          font-family: var(--font-display);
        }
        .h-title {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .h-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 16px;
          flex: 1;
        }
        .h-meters {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
        }
        .meter {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .meter-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .meter-bar {
          display: flex;
          gap: 3px;
        }
        .meter-segment {
          width: 8px; height: 8px;
          border-radius: 4px;
          background: var(--bg-soft);
          border: 1px solid var(--border);
          transition: all var(--fast);
        }
        .meter-segment.filled { border-color: #ff6b6b; box-shadow: 0 0 4px rgba(255,107,107,.3); }
        .h-lists {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 16px;
        }
        .h-list-label {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          display: block;
          margin-bottom: 6px;
        }
        .h-pros, .h-cons {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .h-pros li, .h-cons li {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.5;
          padding-left: 14px;
          position: relative;
        }
        .h-pros li::before { content: '✓'; position: absolute; left: 0; color: var(--green); }
        .h-cons li::before { content: '✗'; position: absolute; left: 0; color: var(--text-dim); }
        .h-best {
          padding-top: 14px;
          border-top: 2px solid var(--border);
          font-size: 0.82rem;
          color: var(--text-muted);
          display: flex;
          gap: 6px;
          margin-top: auto;
        }
        .h-best-label {
          color: var(--purple);
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .h-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .h-grid { grid-template-columns: 1fr; }
          .h-lists { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
