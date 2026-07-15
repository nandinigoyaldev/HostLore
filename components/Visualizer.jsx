'use client';
import { useRef, useEffect } from 'react';

export default function Visualizer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = 400;
    }

    resize();
    window.addEventListener('resize', resize);

    const nodes = [
      { x: 0.1, y: 0.5, label: 'Browser', color: '#ff6b6b', emoji: '🌐' },
      { x: 0.3, y: 0.25, label: 'DNS', color: '#6c5ce7', emoji: '📖' },
      { x: 0.55, y: 0.5, label: 'Server', color: '#4ecdc4', emoji: '🖥️' },
      { x: 0.8, y: 0.7, label: 'Database', color: '#ffd93d', emoji: '🗄️' },
    ];

    const connections = [
      { from: 0, to: 1, color: '#ff6b6b' },
      { from: 0, to: 2, color: '#ff8e53' },
      { from: 1, to: 2, color: '#6c5ce7' },
      { from: 2, to: 3, color: '#4ecdc4' },
      { from: 2, to: 0, color: '#ffd93d' },
    ];

    let activeConn = 0;

    function draw() {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-card').trim();
      ctx.fillStyle = bgColor || '#ffffff';
      ctx.beginPath();
      ctx.roundRect(0, 0, w, h, 20);
      ctx.fill();

      const stroke = getComputedStyle(document.documentElement).getPropertyValue('--border').trim();
      ctx.strokeStyle = stroke || '#e8e7e4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(0, 0, w, h, 20);
      ctx.stroke();

      const pNodes = nodes.map(n => ({
        ...n,
        x: n.x * w,
        y: n.y * h,
      }));

      const activeIdx = Math.floor(time / 100) % connections.length;
      const t = (time % 100) / 100;

      connections.forEach((conn, idx) => {
        const from = pNodes[conn.from];
        const to = pNodes[conn.to];
        const isActive = idx === activeIdx;

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);

        if (isActive) {
          ctx.strokeStyle = conn.color;
          ctx.lineWidth = 3;
          ctx.shadowColor = conn.color;
          ctx.shadowBlur = 10;
        } else {
          ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-dim').trim() || '#b2bec3';
          ctx.lineWidth = 1.5;
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        if (isActive) {
          const px = from.x + (to.x - from.x) * t;
          const py = from.y + (to.y - from.y) * t;
          ctx.beginPath();
          ctx.arc(px, py, 5, 0, Math.PI * 2);
          ctx.fillStyle = conn.color;
          ctx.shadowColor = conn.color;
          ctx.shadowBlur = 15;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      pNodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 32, 0, Math.PI * 2);
        ctx.fillStyle = node.color + '20';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, 32, 0, Math.PI * 2);
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = '24px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.emoji, node.x, node.y);

        ctx.font = '600 11px system-ui';
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim() || '#2d3436';
        ctx.textBaseline = 'top';
        ctx.fillText(node.label, node.x, node.y + 40);
      });

      const labelColor = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim() || '#95a0a5';
      ctx.font = '11px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillStyle = labelColor;
      ctx.fillText('Watch the request flow through the network', w / 2, h - 10);

      time++;
      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section id="visualizer" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-label">🎯 Live Demo</div>
          <h2 className="section-title">
            See the request in motion
          </h2>
          <p className="section-desc">
            Watch data travel between your browser, DNS, servers, and databases in
            real time. Each glowing particle is a piece of your request.
          </p>
        </div>

        <div className="viz-wrapper">
          <canvas ref={canvasRef} />
        </div>
      </div>

      <style jsx>{`
        .viz-wrapper {
          max-width: 800px;
          margin: 0 auto;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }
        canvas {
          display: block;
          width: 100%;
          height: 400px;
        }
        @media (max-width: 640px) {
          canvas { height: 300px; }
        }
      `}</style>
    </section>
  );
}
