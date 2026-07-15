'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function smoothTo(e, href) {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} aria-label="Main navigation">
      <div className="nav-container">
        <a href="#hero" className="nav-logo" onClick={e => smoothTo(e, '#hero')} aria-label="HostLore home">
          <Image src="/favicon/hostlore.svg" alt="" width={32} height={32} className="logo-img" />
          <span className="logo-text">HostLore</span>
        </a>

        <ul className={`nav-links${open ? ' open' : ''}`} id="nav-links" role="list">
          {[
            ['#journey',       'The Journey'],
            ['#hosting-types', 'Hosting'],
            ['#databases',     'Databases'],
            ['#platforms',     'Platforms'],
          ].map(([href, label]) => (
            <li key={href}>
              <a href={href} className="nav-link" onClick={e => smoothTo(e, href)}>{label}</a>
            </li>
          ))}
          <li>
            <a href="#ask" className="nav-link nav-link-cta" onClick={e => smoothTo(e, '#ask')}>
              Ask HostLore
            </a>
          </li>
        </ul>

        <button
          className={`hamburger${open ? ' open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(p => !p)}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
