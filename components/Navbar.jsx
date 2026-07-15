'use client';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import Search from './Search';

export default function Navbar() {
  const { theme, toggle, mounted } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#journey', label: 'Journey' },
    { href: '#hosting', label: 'Hosting' },
    { href: '#databases', label: 'Databases' },
    { href: '#platforms', label: 'Platforms' },
    { href: '#quiz', label: 'Quiz' },
  ];

  function handleNav(e, href) {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#hero" className="nav-logo" onClick={e => handleNav(e, '#hero')}>
            <span className="nav-logo-icon">🦎</span>
            <span className="nav-logo-text gradient-text">HostLore</span>
          </a>

          <div className={`nav-menu${menuOpen ? ' open' : ''}`}>
            {links.map(l => (
              <a key={l.href} href={l.href} className="nav-link" onClick={e => handleNav(e, l.href)}>
                {l.label}
              </a>
            ))}
            <button className="nav-icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
              🔍
            </button>
            {mounted && (
              <button className="nav-icon-btn theme-btn" onClick={toggle} aria-label="Toggle theme">
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            )}
            <a href="#ask" className="nav-cta" onClick={e => handleNav(e, '#ask')}>
              Ask Away!
            </a>
          </div>

          <div className="nav-actions">
            <button className="nav-icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
              🔍
            </button>
            {mounted && (
              <button className="nav-icon-btn theme-btn" onClick={toggle} aria-label="Toggle theme">
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            )}
            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(p => !p)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <Search isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <style jsx>{`
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 500;
          padding: 16px 0;
          transition: all var(--fast);
        }
        .nav.scrolled {
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          box-shadow: var(--shadow-sm);
          padding: 10px 0;
        }
        .nav-inner {
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 0 var(--px);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }
        .nav-logo-icon { font-size: 1.5rem; }
        .nav-logo-text {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 700;
        }
        .nav-menu {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 10px;
          transition: all var(--fast);
        }
        .nav-link:hover {
          color: var(--coral);
          background: var(--coral-bg);
        }
        .nav-icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.1rem;
          padding: 6px 8px;
          border-radius: 8px;
          transition: background var(--fast);
          line-height: 1;
        }
        .nav-icon-btn:hover { background: var(--bg-soft); }
        .nav-actions {
          display: none;
          align-items: center;
          gap: 4px;
        }
        .nav-cta {
          background: var(--gradient-primary);
          color: #fff;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 600;
          padding: 8px 20px;
          border-radius: 10px;
          margin-left: 8px;
          transition: all var(--fast);
          font-family: var(--font-display);
        }
        .nav-cta:hover {
          transform: scale(1.05);
          box-shadow: var(--shadow-color);
        }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 3px;
          background: var(--text-secondary);
          border-radius: 3px;
          transition: all var(--fast);
        }
        .hamburger.open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

        @media (max-width: 768px) {
          .nav-actions { display: flex; }
          .nav-menu {
            display: none;
            position: fixed;
            top: 60px; left: 12px; right: 12px;
            background: var(--bg-card);
            border: 2px solid var(--border);
            border-radius: 16px;
            flex-direction: column;
            padding: 12px;
            gap: 4px;
            box-shadow: var(--shadow-lg);
          }
          .nav-menu.open { display: flex; }
          .nav-link { text-align: center; padding: 12px; border-radius: 10px; }
          .nav-cta { text-align: center; margin-left: 0; margin-top: 4px; }
          .nav-icon-btn { display: none; }
          .nav-menu .nav-icon-btn { display: flex; justify-content: center; padding: 10px; }
          .hamburger { display: flex; }
        }
      `}</style>
    </>
  );
}
