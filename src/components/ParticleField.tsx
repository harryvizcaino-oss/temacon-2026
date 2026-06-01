import { useEffect, useRef } from 'react';

/**
 * ParticleField — Efecto de partículas sutil para fondo de secciones.
 * Versión ligera: menos partículas, sin interacción de mouse, solo movimiento orgánico.
 */

const SYMBOLS = ['\u2B21', '\u2699', '\u25CB', '\u26A1', '\u25CF', '\u25B5'];
const COUNT = 40;

interface P { ch: string; x: number; y: number; vx: number; vy: number; s: number; a: number; }

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const x = c.getContext('2d');
    if (!x) return;
    const p = c.parentElement;
    if (!p) return;

    let W = 0, H = 0, raf = 0;

    function resize() {
      const r = p!.getBoundingClientRect();
      W = r.width; H = r.height;
      const d = Math.min(window.devicePixelRatio || 1, 2);
      c!.width = W * d; c!.height = H * d;
      c!.style.width = W + 'px'; c!.style.height = H + 'px';
      x!.setTransform(d, 0, 0, d, 0, 0);
    }

    const ro = new ResizeObserver(() => resize());
    ro.observe(p); resize();

    const ps: P[] = [];
    for (let i = 0; i < COUNT; i++) {
      ps.push({
        ch: SYMBOLS[(Math.random() * SYMBOLS.length) | 0],
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.1,
        s: 8 + Math.random() * 8,
        a: 0.15 + Math.random() * 0.2,
      });
    }

    let fr = 0;
    function draw() {
      x!.clearRect(0, 0, W, H);

      for (const p of ps) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20 || p.x > W + 20) p.vx *= -1;
        if (p.y < -20 || p.y > H + 20) p.vy *= -1;

        x!.font = `bold ${p.s}px "Courier New",monospace`;
        x!.textAlign = 'center'; x!.textBaseline = 'middle';
        x!.fillStyle = `rgba(227,30,36,${p.a})`;
        x!.fillText(p.ch, p.x, p.y);
      }

      fr++;
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
