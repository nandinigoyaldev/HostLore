'use client';
import { useEffect } from 'react';

/**
 * Client-only component that handles:
 *  - Scroll progress bar
 *  - Journey step reveal (IntersectionObserver)
 *  - Generic .reveal element reveal
 *  - Stat counter animation
 *  - Active nav link highlight
 */
export default function ScrollUI() {
  useEffect(() => {
    // ── Scroll progress ─────────────────────────────────────
    const $bar = document.getElementById('scroll-progress');
    function updateBar() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if ($bar) $bar.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + '%';
    }

    // ── Counter animation ────────────────────────────────────
    function animateCounter(el, target, ms = 1600) {
      const start = performance.now();
      const ease  = t => 1 - Math.pow(1 - t, 3);
      const step  = now => {
        const p = Math.min((now - start) / ms, 1);
        el.textContent = Math.round(ease(p) * target);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target;
      };
      requestAnimationFrame(step);
    }

    // ── Observers ────────────────────────────────────────────
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    const journeyObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const delay = (parseInt(e.target.dataset.step || 1) - 1) * 90;
        setTimeout(() => e.target.classList.add('visible'), delay);
        journeyObs.unobserve(e.target);
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.journey-step').forEach(el => journeyObs.observe(el));

    const counterObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        animateCounter(e.target, parseInt(e.target.dataset.target || '0'));
        counterObs.unobserve(e.target);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-number').forEach(el => counterObs.observe(el));

    // ── Active nav ───────────────────────────────────────────
    const sections   = [...document.querySelectorAll('section[id]')];
    const navLinks   = [...document.querySelectorAll('.nav-link:not(.nav-link-cta)')];
    function highlightNav() {
      const y = window.scrollY + 120;
      sections.forEach(s => {
        if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
          const href = `#${s.id}`;
          navLinks.forEach(a => {
            const active = a.getAttribute('href') === href;
            a.classList.toggle('active', active);
          });
        }
      });
    }

    // ── Scroll listener ──────────────────────────────────────
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      requestAnimationFrame(() => { updateBar(); highlightNav(); ticking = false; });
      ticking = true;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    updateBar();
    highlightNav();

    return () => {
      window.removeEventListener('scroll', onScroll);
      revealObs.disconnect();
      journeyObs.disconnect();
      counterObs.disconnect();
    };
  }, []);

  return (
    <>
      <div id="scroll-progress" role="progressbar" aria-label="Page reading progress" />
      <div id="toast" className="toast" role="status" aria-live="polite" />
    </>
  );
}
