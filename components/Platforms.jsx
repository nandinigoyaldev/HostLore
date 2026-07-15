'use client';
const CATEGORIES = [
  {
    label: 'Frontend & Static Sites', icon: '🎨',
    platforms: [
      { icon: '▲', name: 'Vercel', tagline: 'Best for Next.js', desc: 'Automatic ISR, edge functions, preview deploys. The Next.js native platform.', color: '#fff', bg: '#000', free: 'Generous free tier', best: 'Next.js apps' },
      { icon: '⊞', name: 'Netlify', tagline: 'JAMstack pioneer', desc: 'Great for static sites and serverless functions. Drag-and-drop deploys from Git.', color: '#38bdf8', bg: '#e0f2fe', free: 'Free tier (300 min/mo)', best: 'Static sites, forms' },
      { icon: '◎', name: 'Cloudflare Pages', tagline: 'Edge-first hosting', desc: 'Deploy to Cloudflare\'s global edge network. Fast, cheap, generous free tier.', color: '#fbbf24', bg: '#fef3c7', free: 'Very generous free tier', best: 'Static & edge apps' },
      { icon: '◆', name: 'GitHub Pages', tagline: 'Free & simple', desc: 'Free hosting from GitHub repos. Limited but perfect for docs and portfolios.', color: '#34d399', bg: '#d1fae5', free: 'Completely free', best: 'Docs, portfolio' },
    ],
  },
  {
    label: 'Backend & Full-Stack', icon: '⚙️',
    platforms: [
      { icon: '⬡', name: 'Railway', tagline: 'Deploy anything', desc: 'Full-stack with databases, cron jobs, and private networking. Developer-friendly.', color: '#8b5cf6', bg: '#ede9fe', free: 'Free tier ($5 credit)', best: 'Full-stack apps' },
      { icon: '◈', name: 'Render', tagline: 'Heroku alternative', desc: 'Easy deployment for web services, static sites, and databases. Sleeps on free tier.', color: '#22d3ee', bg: '#cffafe', free: 'Free tier (sleeps after inactivity)', best: 'Backend APIs' },
      { icon: '△', name: 'Supabase', tagline: 'Firebase alternative', desc: 'Open-source backend with PostgreSQL, auth, realtime, and storage.', color: '#34d399', bg: '#d1fae5', free: 'Free tier', best: 'Apps needing a backend fast' },
      { icon: '○', name: 'DigitalOcean', tagline: 'Simple cloud', desc: 'Droplets (VMs), App Platform, managed databases. Developer-friendly pricing.', color: '#6366f1', bg: '#e0e7ff', free: 'No free tier ($6/mo min)', best: 'VPS & managed infra' },
    ],
  },
  {
    label: 'Cloud Providers', icon: '☁️',
    platforms: [
      { icon: 'A', name: 'AWS', tagline: 'The 800-lb gorilla', desc: '200+ services — EC2, Lambda, S3, RDS. Infinite scale, infinite complexity.', color: '#fbbf24', bg: '#fef3c7', free: 'Free tier (12 months)', best: 'Enterprise, any scale' },
      { icon: 'G', name: 'Google Cloud', tagline: 'Data & ML focused', desc: 'BigQuery, Cloud Run, GKE. Strong in data analytics and machine learning.', color: '#38bdf8', bg: '#e0f2fe', free: 'Free tier ($300 credit)', best: 'Data-heavy apps' },
      { icon: 'A', name: 'Azure', tagline: 'Enterprise Microsoft', desc: 'Best for .NET apps, Active Directory, and enterprise hybrid cloud.', color: '#6366f1', bg: '#e0e7ff', free: 'Free tier ($200 credit)', best: 'Enterprise .NET apps' },
    ],
  },
];

export default function Platforms() {
  return (
    <section id="platforms" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-label">🚀 Platforms</div>
          <h2 className="section-title">
            Where should you deploy?
          </h2>
          <p className="section-desc">
            Frontend, backend, or full-stack? Free tier or enterprise? Here&apos;s how
            the most popular platforms stack up.
          </p>
        </div>

        {CATEGORIES.map(cat => (
          <div key={cat.label} className="cat">
            <div className="cat-header">
              <span className="cat-icon">{cat.icon}</span>
              <h3>{cat.label}</h3>
            </div>
            <div className="p-grid">
              {cat.platforms.map(p => (
                <div key={p.name} className="p-card">
                  <div className="p-logo" style={{ background: p.bg, color: p.color }}>
                    {p.icon}
                  </div>
                  <h4 className="p-name">{p.name}</h4>
                  <div className="p-tagline">{p.tagline}</div>
                  <p className="p-desc">{p.desc}</p>
                  <div className="p-meta">
                    <span className="p-free">🆓 {p.free}</span>
                    <span className="p-best">Best: {p.best}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .cat { margin-bottom: 44px; }
        .cat:last-child { margin-bottom: 0; }
        .cat-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
          padding-bottom: 12px;
          border-bottom: 2px solid var(--border);
        }
        .cat-header h3 {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .cat-icon { font-size: 1.2rem; }
        .p-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        .p-card {
          background: var(--bg-card);
          border: 2px solid var(--border);
          border-radius: 16px;
          padding: 22px;
          transition: all var(--med);
        }
        .p-card:hover {
          border-color: var(--purple);
          box-shadow: var(--shadow-md);
          transform: translateY(-3px);
        }
        .p-logo {
          width: 40px; height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: 800;
          font-family: var(--font-display);
          margin-bottom: 12px;
        }
        .p-name {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 2px;
        }
        .p-tagline {
          font-size: 0.76rem;
          color: var(--purple);
          font-weight: 600;
          margin-bottom: 8px;
          font-family: var(--font-display);
        }
        .p-desc {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 14px;
        }
        .p-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding-top: 12px;
          border-top: 2px solid var(--border);
        }
        .p-free {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--green);
        }
        .p-best {
          font-size: 0.76rem;
          color: var(--text-muted);
        }

        @media (max-width: 1024px) {
          .p-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .p-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
