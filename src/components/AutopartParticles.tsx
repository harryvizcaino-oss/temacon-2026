import { memo, useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════
   AUTOPART PARTICLES 3D — Iconos/emojis flotantes
   Canvas 2D con proyección en perspectiva
   ═══════════════════════════════════════════════════════════════ */

const AUTOPARTES = [
  '⚡','📡','🔧','⚙️','🔌','📟','🚛','⛽',
  '🛣️','🚨','🎛️','🔩','🔨','📊','🛞','🔋',
  '📲','💻','🔬','🔦','🧰','📡','📶','🔍',
  '🛠️','🔭','📈','🔖','📍','📎','🔒','🚦',
];

const MAX_PARTICLES = 160;
const MAX_PARTICLES_MOBILE = 60;

interface P {
  ch: string;
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  rot: number; rotS: number;
  s: number;
}

interface S {
  x: number; y: number; vx: number; vy: number;
  ch: string; a: number; s: number;
}

const AutopartParticles = memo(function AutopartParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const x = c.getContext('2d', { alpha: true });
    if (!x) return;

    let W = 0, H = 0;
    let isVisible = false;
    let fr = 0;
    let mx = -9999, my = -9999, md = false;

    const resize = () => {
      const s = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.round(c.clientWidth * s);
      H = Math.round(c.clientHeight * s);
      c.width = W; c.height = H;
    };

    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? MAX_PARTICLES_MOBILE : MAX_PARTICLES;

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
        s: 14 + Math.random() * 12,
      });
    }

    const ss: S[] = [];

    const draw = () => {
      if (!isVisible) return;
      fr++;
      x.clearRect(0, 0, W, H);

      const focal = 300;
      const cx = W / 2, cy = H / 2;

      if (fr % 90 === 0) ps.sort((a, b) => b.z - a.z);

      for (const p of ps) {
        p.x += p.vx; p.y += p.vy; p.z += p.vz;

        if (p.x < -2500) p.x = 2500; else if (p.x > 2500) p.x = -2500;
        if (p.y < -1800) p.y = 1800; else if (p.y > 1800) p.y = -1800;
        if (p.z < 10) { p.z = 10; p.vz *= -1; }
        if (p.z > 800) { p.z = 800; p.vz *= -1; }

        const sc = focal / (focal + p.z);
        const sx = cx + p.x * sc;
        const sy = cy + p.y * sc;
        const sz = p.s * sc;

        const dMouse = Math.hypot(sx - mx, sy - my);
        const isNearMouse = dMouse < 100 && md;
        const al = Math.max(0.15, Math.min(1, (800 - p.z) / 700));

        if (sx > 80 && sx < W - 80 && sy > 80 && sy < H - 80) {
          x.save();
          x.translate(sx, sy);
          x.rotate(p.rot * (isNearMouse ? 4 : 1));

          if (isNearMouse) {
            x.shadowColor = '#E31E24';
            x.shadowBlur = 25;
            x.fillStyle = `rgba(227,30,36,${Math.min(1, al + 0.4)})`;
          } else {
            x.shadowBlur = 0;
            x.fillStyle = `rgba(200,30,30,${al * 0.85})`;
          }

          x.font = `${sz}px Arial, sans-serif`;
          x.textAlign = 'center';
          x.textBaseline = 'middle';
          x.fillText(p.ch, 0, 0);
          x.restore();

          // Spark burst on mouse near
          if (isNearMouse && Math.random() < 0.2) {
            ss.push({
              x: sx, y: sy,
              vx: (Math.random() - 0.5) * 5,
              vy: (Math.random() - 0.5) * 5 - 3,
              ch: p.ch, a: 1, s: 6 + Math.random() * 8,
            });
          }
        }
      }

      // Connection lines
      for (let i = 0; i < Math.min(ps.length, 25); i++) {
        for (let j = i + 1; j < Math.min(ps.length, 25); j++) {
          const a = ps[i], b = ps[j];
          const pd = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
          if (pd < 200) {
            const aSc = focal / (focal + a.z);
            const bSc = focal / (focal + b.z);
            const aGlow = Math.max(0.15, (800 - a.z) / 700);
            const bGlow = Math.max(0.15, (800 - b.z) / 700);
            x.beginPath();
            x.moveTo(cx + a.x * aSc, cy + a.y * aSc);
            x.lineTo(cx + b.x * bSc, cy + b.y * bSc);
            x.strokeStyle = `rgba(227,30,36,${Math.min(aGlow, bGlow) * 0.2 * (1 - pd / 200)})`;
            x.lineWidth = 0.5;
            x.stroke();
          }
        }
      }

      // Sparks
      for (let i = ss.length - 1; i >= 0; i--) {
        const s = ss[i];
        s.x += s.vx; s.y += s.vy; s.vy += 0.2;
        s.a -= 0.03;
        if (s.a <= 0) { ss.splice(i, 1); continue; }
        x.save();
        x.globalAlpha = s.a;
        x.fillStyle = '#E31E24';
        x.font = `${s.s}px Arial`;
        x.textAlign = 'center'; x.textBaseline = 'middle';
        x.fillText(s.ch, s.x, s.y);
        x.restore();
      }

      requestAnimationFrame(draw);
    };

    // Click explosion
    const onClick = (e: MouseEvent) => {
      const rect = c.getBoundingClientRect();
      const s = Math.min(window.devicePixelRatio || 1, 2);
      const cx = (e.clientX - rect.left) * s;
      const cy = (e.clientY - rect.top) * s;
      for (let i = 0; i < 25; i++) {
        const a = Math.random() * 6.28;
        const v = 3 + Math.random() * 8;
        ss.push({
          x: cx, y: cy,
          vx: Math.cos(a) * v, vy: Math.sin(a) * v - 4,
          ch: AUTOPARTES[(Math.random() * AUTOPARTES.length) | 0],
          a: 1, s: 10 + Math.random() * 14,
        });
      }
    };

    // Touch explosion
    const onTouchStart = (e: TouchEvent) => {
      const rect = c.getBoundingClientRect();
      const s = Math.min(window.devicePixelRatio || 1, 2);
      const touch = e.touches[0];
      const cx = (touch.clientX - rect.left) * s;
      const cy = (touch.clientY - rect.top) * s;
      for (let i = 0; i < 18; i++) {
        const a = Math.random() * 6.28;
        const v = 2 + Math.random() * 6;
        ss.push({
          x: cx, y: cy,
          vx: Math.cos(a) * v, vy: Math.sin(a) * v - 3,
          ch: AUTOPARTES[(Math.random() * AUTOPARTES.length) | 0],
          a: 1, s: 8 + Math.random() * 10,
        });
      }
    };

    const onMM = (e: MouseEvent) => {
      const rect = c.getBoundingClientRect();
      const s = Math.min(window.devicePixelRatio || 1, 2);
      mx = (e.clientX - rect.left) * s;
      my = (e.clientY - rect.top) * s;
    };
    const onMD = () => { md = true; };
    const onMU = () => { md = false; mx = -9999; };
    const onTouchMove = (e: TouchEvent) => {
      const rect = c.getBoundingClientRect();
      const s = Math.min(window.devicePixelRatio || 1, 2);
      mx = (e.touches[0].clientX - rect.left) * s;
      my = (e.touches[0].clientY - rect.top) * s;
    };
    const onTouchEnd = () => { md = false; mx = -9999; };

    c.addEventListener('mousemove', onMM);
    c.addEventListener('mousedown', onMD);
    c.addEventListener('click', onClick);
    window.addEventListener('mouseup', onMU);
    c.addEventListener('touchstart', onTouchStart, { passive: true });
    c.addEventListener('touchmove', onTouchMove, { passive: true });
    c.addEventListener('touchend', onTouchEnd);
    window.addEventListener('resize', resize);

    const startTimer = setTimeout(() => {
      resize();
      isVisible = true;
      ps.sort((a, b) => b.z - a.z);
      draw();
    }, 150);

    return () => {
      clearTimeout(startTimer);
      isVisible = false;
      c.removeEventListener('mousemove', onMM);
      c.removeEventListener('mousedown', onMD);
      c.removeEventListener('click', onClick);
      window.removeEventListener('mouseup', onMU);
      c.removeEventListener('touchstart', onTouchStart);
      c.removeEventListener('touchmove', onTouchMove);
      c.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'block', touchAction: 'pan-y' }} />;
});

export default AutopartParticles;
