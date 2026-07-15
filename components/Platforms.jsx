'use client';
const CATEGORIES = [
  {
    label: 'Frontend & JAMstack', icon: '🎨',
    platforms: [
      { icon: '▲', name: 'Vercel', tagline: 'Next.js native', desc: 'Best for Next.js apps. Automatic ISR, edge functions, preview deployments.', free: 'Hobby tier free', best: 'Next.js apps', color: '#fff' },
      { icon: '⊞', name: 'Netlify', tagline: 'JAMstack pioneer', desc: 'Great for static sites and serverless functions. Drag-and-drop deploys.', free: 'Free tier (300 min/mo)', best: 'Static sites, forms', color: '#38bdf8' },
      { icon: '◎', name: 'Cloudflare Pages', tagline: 'Edge-first', desc: 'Deploy to Cloudflare\'s global edge network. Fast, cheap, generous free tier.', free: 'Very generous free tier', best: 'Static & edge apps', color: '#fbbf24' },
      { icon: '◆', name: 'GitHub Pages', tagline: 'Free static hosting', desc: 'Free hosting for static sites directly from GitHub repos. Limited but reliable.', free: 'Completely free', best: 'Docs, portfolio sites', color: '#34d399' },
    ],
  },
  {
    label: 'Backend & Full-stack', icon: '⚙️',
    platforms: [
      { icon: '⬡', name: 'Railway', tagline: 'Deploy anything', desc: 'Full-stack deployment with databases, cron jobs, and private networking.', free: 'Free tier ($5 credit)', best: 'Full-stack apps', color: '#8b5cf6' },
      { icon: '◈', name: 'Render', tagline: 'Heroku alternative', desc: 'Easy deployment for web services, static sites, cron jobs, and databases.', free: 'Free tier (sleeps after inactivity)', best: 'Backend APIs', color: '#22d3ee' },
      { icon: '△', name: 'Supabase', tagline: 'Firebase alternative', desc: 'Open-source backend with PostgreSQL, auth, realtime, and storage.', free: 'Free tier', best: 'Apps needing a backend fast', color: '#34d399' },
      { icon: '○', name: 'DigitalOcean', tagline: 'Simple cloud', desc: 'Droplets (VMs), App Platform (PaaS), managed databases. Developer-friendly pricing.', free: 'No free tier ($6/mo min)', best: 'VPS & managed infra', color: '#6366f1' },
    ],
  },
  {
    label: 'Cloud Providers', icon: '☁️',
    platforms: [
      { icon: 'A', name: 'AWS', tagline: 'The 800-pound gorilla', desc: '200+ services. EC2, Lambda, S3, RDS. Infinite scale, infinite complexity.', free: 'Free tier (12 months)', best: 'Enterprise, any scale', color: '#fbbf24' },
      { icon: 'G', name: 'Google Cloud', tagline: 'Data & ML focused', desc: 'BigQuery, Cloud Run, GKE. Strong in data analytics and machine learning.', free: 'Free tier ($300 credit)', best: 'Data-heavy apps', color: '#38bdf8' },
      { icon: 'A', name: 'Azure', tagline: 'Enterprise Microsoft', desc: 'Best for .NET apps, Active Directory, and enterprise hybrid cloud.', free: 'Free tier ($200 credit)', best: 'Enterprise .NET apps', color: '#6366f1' },
    ],
  },
];

export default function Platforms() {
  return (
    <section id="platforms" className="section">
      <span className="section-number">04</span>
      <div className="container">
        <div className="section-header">
          <div className="section-label">Platforms</div>
          <h2 className="section-title">
            Where should you deploy?
          </h2>
          <p className="section-desc">
            Frontend, backend, or full-stack? Free tier or enterprise? Here&apos;s how
            the most popular platforms compare.
          </p>
        </div>

        {CATEGORIES.map(cat => (
          <div key={cat.label} className="platform-category">
            <div className="platform-category-header">
              <span className="platform-category-icon">{cat.icon}</span>
              <h3>{cat.label}</h3>
            </div>
            <div className="platform-grid">
              {cat.platforms.map(p => (
                <div key={p.name} className="platform-card">
                  <div className="platform-logo-wrap" style={{ background: `${p.color}10`, color: p.color }}>
                    {p.icon}
                  </div>
                  <h4 className="platform-name">{p.name}</h4>
                  <div className="platform-tagline">{p.tagline}</div>
                  <p className="platform-desc">{p.desc}</p>
                  <div className="platform-meta">
                    <span className="platform-free">🆓 {p.free}</span>
                    <span className="platform-best-label">Best: {p.best}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .platform-category { margin-bottom: 48px; }
        .platform-category:last-child { margin-bottom: 0; }
        .platform-category-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
        }
        .platform-category-header h3 {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-secondary);
        }
        .platform-category-icon { font-size: 1.2rem; }
        .platform-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        .platform-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 22px;
          transition: all var(--med);
        }
        .platform-card:hover {
          border-color: var(--border-accent);
          transform: translateY(-3px);
          box-shadow: var(--shadow-glow);
        }
        .platform-logo-wrap {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: 800;
          font-family: var(--font-display);
          margin-bottom: 12px;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .platform-name {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 2px;
        }
        .platform-tagline {
          font-size: 0.75rem;
          color: var(--purple);
          font-style: italic;
          margin-bottom: 10px;
        }
        .platform-desc {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 14px;
        }
        .platform-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding-top: 12px;
          border-top: 1px solid var(--border);
        }
        .platform-free {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--green);
        }
        .platform-best-label {
          font-size: 0.75rem;
          color: var(--text-dim);
        }

        @media (max-width: 1024px) {
          .platform-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .platform-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
