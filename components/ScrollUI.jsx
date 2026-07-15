'use client';
import { useEffect } from 'react';

export default function ScrollUI() {
  useEffect(() => {
    const $bar = document.getElementById('scroll-progress');
    function updateBar() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if ($bar) $bar.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + '%';
    }

    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      requestAnimationFrame(() => { updateBar(); ticking = false; });
      ticking = true;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    updateBar();

    return () => {
      window.removeEventListener('scroll', onScroll);
      revealObs.disconnect();
    };
  }, []);

  return (
    <>
      <div id="scroll-progress" role="progressbar" aria-label="Reading progress" />
      <div id="toast" className="toast" role="status" aria-live="polite" />
    </>
  );
}
