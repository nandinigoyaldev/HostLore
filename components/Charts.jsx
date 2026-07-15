'use client';

const CHARTS = [
  {
    title: 'Hosting Cost Comparison',
    desc: 'Monthly cost range for different hosting types',
    data: [
      { label: 'Shared', value: 6, color: '#ff6b6b' },
      { label: 'VPS', value: 40, color: '#6c5ce7' },
      { label: 'Dedicated', value: 250, color: '#4ecdc4' },
      { label: 'Cloud', value: 100, color: '#ffd93d' },
      { label: 'Serverless', value: 5, color: '#fd79a8' },
    ],
    unit: '$/mo',
    maxValue: 280,
  },
  {
    title: 'Setup Difficulty',
    desc: 'How much technical skill each hosting type needs (1-10)',
    data: [
      { label: 'Shared', value: 2, color: '#ff6b6b' },
      { label: 'VPS', value: 6, color: '#6c5ce7' },
      { label: 'Dedicated', value: 9, color: '#4ecdc4' },
      { label: 'Cloud', value: 8, color: '#ffd93d' },
      { label: 'Serverless', value: 4, color: '#fd79a8' },
    ],
    unit: '/10',
    maxValue: 10,
  },
  {
    title: 'Database Popularity (2025)',
    desc: 'Relative popularity based on Stack Overflow survey',
    data: [
      { label: 'PostgreSQL', value: 49, color: '#6c5ce7' },
      { label: 'MySQL', value: 39, color: '#4ecdc4' },
      { label: 'SQLite', value: 33, color: '#ffd93d' },
      { label: 'MongoDB', value: 27, color: '#ff6b6b' },
      { label: 'Redis', value: 19, color: '#fd79a8' },
      { label: 'Firebase', value: 14, color: '#00b894' },
    ],
    unit: '%',
    maxValue: 55,
  },
  {
    title: 'Platform Free Tier Generosity',
    desc: 'How generous the free tier is (1-10)',
    data: [
      { label: 'Vercel', value: 8, color: '#fff', textColor: '#000' },
      { label: 'Netlify', value: 7, color: '#38bdf8' },
      { label: 'Cloudflare', value: 9, color: '#fbbf24' },
      { label: 'Railway', value: 6, color: '#6c5ce7' },
      { label: 'Supabase', value: 7, color: '#34d399' },
      { label: 'Render', value: 5, color: '#22d3ee' },
    ],
    unit: '/10',
    maxValue: 10,
  },
];

export default function Charts() {
  return (
    <section id="charts" className="section" style={{ background: 'var(--bg-warm)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-label">📈 Visual Comparisons</div>
          <h2 className="section-title">See the numbers</h2>
          <p className="section-desc">
            Data-driven comparisons to help you make informed decisions about
            hosting, databases, and platforms.
          </p>
        </div>

        <div className="charts-grid">
          {CHARTS.map((chart, ci) => (
            <div key={ci} className="chart-card">
              <div className="chart-header">
                <h3>{chart.title}</h3>
                <p>{chart.desc}</p>
              </div>
              <div className="chart-bars">
                {chart.data.map((d, i) => {
                  const pct = (d.value / chart.maxValue) * 100;
                  return (
                    <div key={i} className="chart-bar-row">
                      <span className="chart-bar-label">{d.label}</span>
                      <div className="chart-bar-track">
                        <div
                          className="chart-bar-fill"
                          style={{
                            width: `${pct}%`,
                            background: d.color,
                            '--delay': `${i * 0.1}s`,
                          }}
                        >
                          <span className="chart-bar-value">
                            {d.value}{chart.unit}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .charts-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .chart-card {
          background: var(--bg-card);
          border: 2px solid var(--border);
          border-radius: 20px;
          padding: 24px;
        }
        .chart-header { margin-bottom: 20px; }
        .chart-header h3 {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .chart-header p {
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .chart-bars {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .chart-bar-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .chart-bar-label {
          width: 80px;
          font-size: 0.78rem;
          color: var(--text-secondary);
          flex-shrink: 0;
          font-weight: 500;
        }
        .chart-bar-track {
          flex: 1;
          height: 24px;
          background: var(--bg-soft);
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }
        .chart-bar-fill {
          height: 100%;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 8px;
          transition: width 0.8s var(--ease-out);
          transition-delay: var(--delay);
          min-width: 40px;
        }
        .chart-bar-value {
          font-size: 0.72rem;
          font-weight: 700;
          color: #fff;
          text-shadow: 0 1px 2px rgba(0,0,0,0.2);
          font-family: var(--font-mono);
        }
        @media (max-width: 768px) {
          .charts-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
