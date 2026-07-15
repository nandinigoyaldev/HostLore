'use client';
import { useEffect, useRef } from 'react';

const COLORS = ['#ff6b6b', '#ffd93d', '#4ecdc4', '#6c5ce7', '#fd79a8', '#00b894', '#fdcb6e'];

export default function Confetti() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const handle = (e) => {
      if (e.type === 'quiz-complete') fire();
    };
    window.addEventListener('quiz-complete', handle);
    return () => window.removeEventListener('quiz-complete', handle);
  }, []);

  function fire() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (animRef.current) cancelAnimationFrame(animRef.current);

    const particles = [];
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    for (let i = 0; i < 60; i++) {
      const angle = (Math.PI * 2 * i) / 60 + Math.random() * 0.3;
      const dist = 80 + Math.random() * 120;
      particles.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 10,
        vy: -Math.random() * 12 - 3,
        size: Math.random() * 7 + 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 1,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8,
      });
    }

    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const p of particles) {
        if (p.life <= 0) continue;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;
        p.life -= 0.015;
        p.rot += p.rotSpeed;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      }
      if (alive && frame < 150) {
        frame++;
        animRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    animate();
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  );
}
