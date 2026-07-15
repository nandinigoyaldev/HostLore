'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#journey', label: 'Journey' },
    { href: '#hosting', label: 'Hosting' },
    { href: '#databases', label: 'Databases' },
    { href: '#platforms', label: 'Platforms' },
  ];

  function handleNav(e, href) {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#hero" className="nav-logo" onClick={e => handleNav(e, '#hero')}>
          <Image src="/favicon/hostlore.svg" alt="" width={28} height={28} />
          <span className="nav-logo-text gradient-text">HostLore</span>
        </a>

        <div className={`nav-menu${menuOpen ? ' open' : ''}`}>
          {links.map(l => (
            <a key={l.href} href={l.href} className="nav-link" onClick={e => handleNav(e, l.href)}>
              {l.label}
            </a>
          ))}
          <a href="#ask" className="nav-cta" onClick={e => handleNav(e, '#ask')}>
            Ask AI
          </a>
        </div>

        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(p => !p)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span /><span /><span />
        </button>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 500;
          padding: 16px 0;
          transition: all var(--fast);
          border-bottom: 1px solid transparent;
        }
        .navbar.scrolled {
          background: rgba(12, 12, 34, 0.88);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom-color: var(--border);
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
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nav-logo img {
          width: 28px;
          height: 28px;
        }
        .nav-logo-text {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 800;
        }
        .nav-menu {
          display: flex;
          align-items: center;
          gap: 2px;
        }
        .nav-link {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          padding: 8px 14px;
          border-radius: 8px;
          transition: all var(--fast);
        }
        .nav-link:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.04);
        }
        .nav-cta {
          background: var(--gradient-primary);
          color: #fff;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 8px 18px;
          border-radius: 8px;
          margin-left: 8px;
          transition: opacity var(--fast);
        }
        .nav-cta:hover { opacity: 0.9; }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 6px;
        }
        .hamburger span {
          display: block;
          width: 20px;
          height: 2px;
          background: var(--text-muted);
          border-radius: 2px;
          transition: all var(--fast);
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        @media (max-width: 768px) {
          .hamburger { display: flex; }
          .nav-menu {
            display: none;
            position: fixed;
            top: 60px; left: 0; right: 0;
            background: rgba(12, 12, 34, 0.97);
            backdrop-filter: blur(24px);
            flex-direction: column;
            padding: 12px;
            border-bottom: 1px solid var(--border);
            gap: 2px;
          }
          .nav-menu.open { display: flex; }
          .nav-link { text-align: center; padding: 12px; }
          .nav-cta { text-align: center; margin-left: 0; margin-top: 4px; }
        }
      `}</style>
    </nav>
  );
}
