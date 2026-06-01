import { useEffect, useRef } from 'react';

const AUTOPARTES = [
  '\u2B21', '\u2B22', '\u25C6', '\u25A3',
  '\u25CB', '\u25CE', '\u25C9', '\u29BF',
  '\u26A1', '\u2726', '\u2727', '\u2605',
  '\u2699', '\u26ED',
  '\u25CF', '\u25D0', '\u25D1', '\u25D2', '\u25D3', '\u2299',
  '\u25A4', '\u25A5', '\u25A6',
  '\u2263', '\u224B',
  '\u25B5', '\u25B4', '\u25BF', '\u25BE',
  '\u2692', '\u26D3',
];

// Mobile: fewer particles for better performance
const PARTICLE_COUNT = window.innerWidth < 768 ? 80 : 180;
const MOUSE_RADIUS = 200;

interface P {
  ch: string;
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  rot: number; rotS: number;
  s: number;
}

interface S {
  x: number; y: number; vx: number; vy: number;
  ch: string; a: number; s: number; rot: number; rotS: number;
}

export default function AutopartParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const x = c.getContext('2d');
    if (!x) return;
    const p = c.parentElement;
    if (!p) return;

    let W = 0, H = 0, mx = -1000, my = -1000, raf = 0, fr = 0;
    let isVisible = true;
    let isMobile = window.innerWidth < 768;

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

    // Visibility observer — pause when not visible
    const visObs = new IntersectionObserver(
      ([e]) => { isVisible = e.isIntersecting; },
      { threshold: 0 }
    );
    visObs.observe(c);

    // Particles
    const ps: P[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      ps.push({
        ch: AUTOPARTES[(Math.random() * AUTOPARTES.length) | 0],
        x: (Math.random() - 0.5) * 3000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 700 + 30,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.5 - 0.1,
        vz: (Math.random() - 0.5) * 1,
        rot: Math.random() * 6.28,
        rotS: (Math.random() - 0.5) * 0.02,
        s: 16 + Math.random() * 14,
      });
    }

    const ss: S[] = [];
    function spark(sx: number, sy: number) {
      for (let i = 0; i < (isMobile ? 8 : 15); i++) {
        const a = Math.random() * 6.28;
        const v = 3 + Math.random() * 9;
        ss.push({ x: sx, y: sy, vx: Math.cos(a) * v, vy: Math.sin(a) * v,
          ch: AUTOPARTES[(Math.random() * AUTOPARTES.length) | 0],
          a: 1, s: 16 + Math.random() * 14,
          rot: Math.random() * 6.28, rotS: (Math.random() - 0.5) * 0.4 });
      }
    }

    // Events
    const rect = () => c!.getBoundingClientRect();
    const onMove = (e: MouseEvent) => { const r = rect(); mx = e.clientX - r.left; my = e.clientY - r.top; };
    const onLeave = () => { mx = -1000; my = -1000; };
    const onClick = (e: MouseEvent) => { const r = rect(); spark(e.clientX - r.left, e.clientY - r.top); };

    let ta = false;
    const tPos = (e: TouchEvent) => { const r = rect(), t = e.touches[0] || e.changedTouches[0]; return { x: t.clientX - r.left, y: t.clientY - r.top }; };
    const onTS = (e: TouchEvent) => { ta = true; const o = tPos(e); mx = o.x; my = o.y; spark(o.x, o.y); };
    const onTM = (e: TouchEvent) => { if (!ta) return; const o = tPos(e); mx = o.x; my = o.y; };
    const onTE = () => { ta = false; mx = -1000; my = -1000; };

    c.addEventListener('mousemove', onMove);
    c.addEventListener('mouseleave', onLeave);
    c.addEventListener('click', onClick);
    c.addEventListener('touchstart', onTS, { passive: true });
    c.addEventListener('touchmove', onTM, { passive: true });
    c.addEventListener('touchend', onTE);

    function draw() {
      // Skip frames when not visible
      if (!isVisible) {
        raf = requestAnimationFrame(draw);
        return;
      }

      // Trail effect
      x!.fillStyle = 'rgba(0,0,0,0.25)';
      x!.fillRect(0, 0, W, H);

      const cx = W / 2, cy = H / 2;
      const mr2 = MOUSE_RADIUS * MOUSE_RADIUS; // squared for faster compare

      for (const p of ps) {
        p.x += p.vx; p.y += p.vy; p.z += p.vz; p.rot += p.rotS;
        if (p.x < -2500 || p.x > 2500) p.vx *= -1;
        if (p.y < -1800 || p.y > 1800) p.vy *= -1;
        if (p.z < 20 || p.z > 800) p.vz *= -1;

        const sc = 400 / (400 + p.z);
        const sx = cx + p.x * sc, sy = cy + p.y * sc, sz = p.s * sc;
        const dx = sx - mx, dy = sy - my;
        const d2 = dx * dx + dy * dy;
        let gl = 0;

        if (d2 < mr2 && mx > 0) {
          const d = Math.sqrt(d2) || 1;
          gl = 1 - d / MOUSE_RADIUS;
          p.x += (dx / d) * gl * 2.5;
          p.y += (dy / d) * gl * 2.5;
        }
        const al = (0.55 + sc * 0.4) + gl * 0.5;

        if (sx > -60 && sx < W + 60 && sy > -60 && sy < H + 60) {
          x!.save();
          x!.translate(sx, sy);
          x!.rotate(p.rot * gl * 3);
          if (gl > 0.05) {
            x!.shadowColor = '#E31E24';
            x!.shadowBlur = gl * 35;
            x!.fillStyle = `rgba(255,80,80,${Math.min(1, al)})`;
          } else {
            x!.shadowBlur = 0;
            x!.fillStyle = `rgba(220,50,50,${Math.min(1, al * 0.85)})`;
          }
          x!.font = `bold ${sz}px "Courier New",monospace`;
          x!.textAlign = 'center'; x!.textBaseline = 'middle';
          x!.fillText(p.ch, 0, 0); x!.restore();
        }
      }

      // Skip connections on mobile for performance
      if (!isMobile) {
        x!.shadowBlur = 0; x!.lineWidth = 1;
        for (let i = 0; i < ps.length; i++) {
          const a = ps[i], sA = 400 / (400 + a.z), ax = cx + a.x * sA, ay = cy + a.y * sA;
          const aDist = Math.sqrt((ax - mx) ** 2 + (ay - my) ** 2);
          if (aDist >= MOUSE_RADIUS || mx <= 0) continue;
          const aGlow = 1 - aDist / MOUSE_RADIUS;
          for (let j = i + 1; j < ps.length; j++) {
            const b = ps[j], sB = 400 / (400 + b.z), bx = cx + b.x * sB, by = cy + b.y * sB;
            const bDist = Math.sqrt((bx - mx) ** 2 + (by - my) ** 2);
            if (bDist >= MOUSE_RADIUS) continue;
            const bGlow = 1 - bDist / MOUSE_RADIUS, pd = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
            if (pd < 100) {
              x!.strokeStyle = `rgba(255,60,60,${Math.min(aGlow, bGlow) * 0.3 * (1 - pd / 100)})`;
              x!.beginPath(); x!.moveTo(ax, ay); x!.lineTo(bx, by); x!.stroke();
            }
          }
        }
      }

      // Sparks
      for (let i = ss.length - 1; i >= 0; i--) {
        const s = ss[i];
        s.x += s.vx; s.y += s.vy; s.vx *= 0.93; s.vy *= 0.93;
        s.a -= 0.022; s.rot += s.rotS;
        if (s.a <= 0) { ss.splice(i, 1); continue; }
        x!.save(); x!.translate(s.x, s.y); x!.rotate(s.rot);
        x!.shadowColor = '#FF4444'; x!.shadowBlur = 30 * s.a;
        x!.fillStyle = `rgba(255,120,60,${s.a})`;
        x!.font = `bold ${s.s * s.a}px "Courier New",monospace`;
        x!.textAlign = 'center'; x!.textBaseline = 'middle';
        x!.fillText(s.ch, 0, 0); x!.restore();
      }

      fr++;
      if (fr % 30 === 0) ps.sort((a, b) => b.z - a.z); // Sort less frequently

      raf = requestAnimationFrame(draw);
    }

    setTimeout(() => { resize(); ps.sort((a, b) => b.z - a.z); draw(); }, 100);

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); visObs.disconnect();
      c.removeEventListener('mousemove', onMove);
      c.removeEventListener('mouseleave', onLeave);
      c.removeEventListener('click', onClick);
      c.removeEventListener('touchstart', onTS);
      c.removeEventListener('touchmove', onTM);
      c.removeEventListener('touchend', onTE);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'block', touchAction: 'pan-y' }} />;
}
