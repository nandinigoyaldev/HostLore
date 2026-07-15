'use client';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import Search from './Search';
import ProgressDashboard from './ProgressDashboard';
import AIChat from './AIChat';
import Cheatsheet from './Cheatsheet';
import Shortcuts from './Shortcuts';
import { markSectionViewed } from './ProgressDashboard';

export default function Navbar() {
  const { theme, toggle, mounted } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [progressOpen, setProgressOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [cheatOpen, setCheatOpen] = useState(false);

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
    { href: '#charts', label: 'Charts' },
  ];

  function handleNav(e, href) {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace('#', '');
    markSectionViewed(id);
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
            <div className="nav-divider" />
            <button className="nav-icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search" title="Search (s)">
              🔍
            </button>
            <button className="nav-icon-btn" onClick={() => setProgressOpen(true)} aria-label="Progress" title="Progress (p)">
              📊
            </button>
            <button className="nav-icon-btn" onClick={() => setChatOpen(true)} aria-label="AI Chat" title="AI Chat (c)">
              💬
            </button>
            <button className="nav-icon-btn" onClick={() => setCheatOpen(true)} aria-label="Cheatsheet" title="Cheatsheet">
              📄
            </button>
            {mounted && (
              <button className="nav-icon-btn theme-btn" onClick={toggle} aria-label="Toggle theme" title="Toggle theme (t)">
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            )}
          </div>

          <div className="nav-actions">
            <button className="nav-icon-btn" onClick={() => setSearchOpen(true)}>🔍</button>
            <button className="nav-icon-btn" onClick={() => setProgressOpen(true)}>📊</button>
            <button className="nav-icon-btn" onClick={() => setChatOpen(true)}>💬</button>
            {mounted && (
              <button className="nav-icon-btn theme-btn" onClick={toggle}>
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
      <ProgressDashboard isOpen={progressOpen} onClose={() => setProgressOpen(false)} />
      <AIChat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      <Cheatsheet isOpen={cheatOpen} onClose={() => setCheatOpen(false)} />
      <Shortcuts
        onSearch={() => setSearchOpen(true)}
        onProgress={() => setProgressOpen(true)}
        onChat={() => setChatOpen(true)}
        onTheme={toggle}
      />

      <style jsx>{`
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 500;
          padding: 14px 0;
          transition: all var(--fast);
        }
        .nav.scrolled {
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          box-shadow: var(--shadow-sm);
          padding: 8px 0;
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
        .nav-logo-icon { font-size: 1.4rem; }
        .nav-logo-text {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 700;
        }
        .nav-menu {
          display: flex;
          align-items: center;
          gap: 2px;
        }
        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          padding: 7px 13px;
          border-radius: 8px;
          transition: all var(--fast);
        }
        .nav-link:hover {
          color: var(--coral);
          background: var(--coral-bg);
        }
        .nav-divider {
          width: 1px; height: 20px;
          background: var(--border);
          margin: 0 6px;
        }
        .nav-icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          padding: 5px 7px;
          border-radius: 6px;
          transition: background var(--fast);
          line-height: 1;
        }
        .nav-icon-btn:hover { background: var(--bg-soft); }
        .nav-actions {
          display: none;
          align-items: center;
          gap: 2px;
        }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
          border-radius: 6px;
        }
        .hamburger span {
          display: block;
          width: 20px;
          height: 2.5px;
          background: var(--text-secondary);
          border-radius: 2px;
          transition: all var(--fast);
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }

        @media (max-width: 900px) {
          .nav-actions { display: flex; }
          .nav-menu {
            display: none;
            position: fixed;
            top: 56px; left: 12px; right: 12px;
            background: var(--bg-card);
            border: 2px solid var(--border);
            border-radius: 16px;
            flex-direction: column;
            padding: 10px;
            gap: 2px;
            box-shadow: var(--shadow-lg);
          }
          .nav-menu.open { display: flex; }
          .nav-link { text-align: center; padding: 10px; border-radius: 8px; width: 100%; }
          .nav-divider { display: none; }
          .nav-icon-btn { display: none; }
          .nav-menu .nav-icon-btn {
            display: flex;
            justify-content: center;
            padding: 10px;
            width: 100%;
            font-size: 1.1rem;
          }
          .hamburger { display: flex; }
        }
      `}</style>
    </>
  );
}
