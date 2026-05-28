import { useCountdown } from '@/hooks/useCountdown';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Truck, Cpu, Wrench, ShieldCheck, Route, Radio, Zap, Activity,
} from 'lucide-react';

const TARGET_DATE = new Date('2026-09-01T08:00:00');
function pad(n: number) { return n.toString().padStart(2, '0'); }

/* ═══════════════════════════════════════════
   BOUNCING TECH ICONS — DVD screensaver style
   Each icon bounces diagonally off walls at slow speed
   ═══════════════════════════════════════════ */

interface BouncingIcon {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  startX: string;
  startY: string;
  dx: number;
  dy: number;
  duration: number;
  size: number;
}

const BOUNCING_ICONS: BouncingIcon[] = [
  { Icon: Truck,    label: 'TRANSPORTE',    startX: '5%',  startY: '20%', dx: 40, dy: 30,  duration: 18, size: 22 },
  { Icon: Cpu,      label: 'TECNOLOGÍA',    startX: '85%', startY: '15%', dx: -35, dy: 25, duration: 22, size: 20 },
  { Icon: Wrench,   label: 'MANTENIMIENTO', startX: '10%', startY: '70%', dx: 30, dy: -20, duration: 20, size: 18 },
  { Icon: ShieldCheck, label: 'CONFIABILIDAD', startX: '75%', startY: '75%', dx: -25, dy: -30, duration: 24, size: 20 },
  { Icon: Route,    label: 'RUTAS',         startX: '90%', startY: '45%', dx: -40, dy: 15, duration: 19, size: 16 },
  { Icon: Radio,    label: 'COMUNICACIÓN',  startX: '8%',  startY: '45%', dx: 35, dy: -15, duration: 21, size: 16 },
  { Icon: Zap,      label: 'EFICIENCIA',    startX: '30%', startY: '85%', dx: 20, dy: -35, duration: 23, size: 18 },
  { Icon: Activity, label: 'MONITOREO',     startX: '60%', startY: '88%', dx: -20, dy: -25, duration: 17, size: 16 },
];

/* Single bouncing square icon */
function BouncingSquare({ icon, duration, delay = 0 }: { icon: BouncingIcon; duration: number; delay?: number }) {
  const { Icon, label, startX, startY, dx, dy, size } = icon;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Animate from starting position with diagonal movement
    gsap.fromTo(
      el,
      { left: startX, top: startY, x: 0, y: 0 },
      {
        x: dx * 5,
        y: dy * 5,
        duration: duration,
        ease: 'none',
        repeat: -1,
        yoyo: true,
        delay: delay,
      }
    );
  }, [startX, startY, dx, dy, duration, delay]);

  return (
    <div
      ref={ref}
      className="absolute z-20 hidden sm:flex flex-col items-center group"
      style={{
        left: startX,
        top: startY,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="relative">
        {/* Glow halo */}
        <div className="absolute -inset-2 bg-[#E31E24]/15 rounded-xl blur-md group-hover:bg-[#E31E24]/30 transition-all" />
        {/* Square */}
        <div className="relative w-14 h-14 lg:w-16 lg:h-16 bg-[#0a0a0a] border-2 border-[#E31E24] rounded-xl flex items-center justify-center shadow-lg shadow-[#E31E24]/30 group-hover:shadow-[#E31E24]/60 group-hover:scale-110 transition-all duration-300">
          <Icon size={size} className="text-[#E31E24]" />
        </div>
        {/* Pulsing dot */}
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#E31E24] rounded-full animate-pulse" />
      </div>
      <span className="font-mono text-[6px] lg:text-[7px] text-white/40 tracking-wider mt-2 bg-black/70 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

export default function Hero3D() {
  const timeLeft = useCountdown(TARGET_DATE);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        y: 60, opacity: 0, scale: 0.85,
        duration: 1.2, ease: 'power3.out', delay: 0.3,
      });
    });
    return () => { ctx.revert(); };
  }, []);

  return (
    <section id="hero" className="relative min-h-[100dvh] flex flex-col items-center overflow-hidden bg-black">
      {/* Subtle stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: 1 + Math.random() * 2 + 'px',
              height: 1 + Math.random() * 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: 0.1 + Math.random() * 0.3,
              animationDuration: 2 + Math.random() * 5 + 's',
              animationDelay: Math.random() * 3 + 's',
            }}
          />
        ))}
      </div>

      {/* ═══════════════════════════════════════════
         BOUNCING SQUARES — DVD screensaver style
         ═══════════════════════════════════════════ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {BOUNCING_ICONS.map((icon, i) => (
          <BouncingSquare
            key={icon.label}
            icon={icon}
            duration={icon.duration}
            delay={i * 0.5}
          />
        ))}
      </div>

      {/* ─── TOP: date + countdown ─── */}
      <div className="relative z-30 flex flex-col items-center text-center pt-24 sm:pt-20 lg:pt-24">
        <p className="font-mono text-[10px] lg:text-xs tracking-[0.3em] text-white/40 uppercase mb-2">
          1-2 Septiembre 2026 · Bogotá, Colombia
        </p>

        {/* Countdown — compact */}
        <div className="flex items-center gap-2 sm:gap-3 mb-1">
          {[
            { v: pad(timeLeft.days), l: 'DÍAS' },
            { v: pad(timeLeft.hours), l: 'HRS' },
            { v: pad(timeLeft.minutes), l: 'MIN' },
            { v: pad(timeLeft.seconds), l: 'SEG' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-center min-w-[36px] sm:min-w-[44px]">
                <span className="font-display text-base sm:text-lg lg:text-2xl text-white tabular-nums leading-none">{item.v}</span>
                <p className="font-mono text-[5px] sm:text-[6px] text-white/30 uppercase tracking-wider">{item.l}</p>
              </div>
              {i < 3 && <span className="text-white/20 text-sm">:</span>}
            </div>
          ))}
        </div>
      </div>

      {/* ─── CENTER: GIANT Logo ─── */}
      <div className="relative z-20 flex-1 flex items-center justify-center w-full" style={{ minHeight: 0 }}>
        <div ref={logoRef} className="relative z-30 flex flex-col items-center">
          <img
            src="/logo-v2.png"
            alt="TEMACON 2026"
            className="w-[75vw] lg:w-[50vw] max-w-[700px] object-contain"
            style={{ filter: 'drop-shadow(0 4px 40px rgba(227,30,36,0.5))' }}
          />
        </div>
      </div>

      {/* ─── BOTTOM: title + CTA ─── */}
      <div className="relative z-30 flex flex-col items-center text-center pb-6 sm:pb-8 lg:pb-12 px-4">
        <h1 className="font-display text-2xl sm:text-4xl lg:text-6xl text-white leading-none mb-1">
          ES HORA DE <span className="text-[#E31E24]">TRANSFORMAR</span>
        </h1>
        <p className="font-mono text-[8px] sm:text-[10px] lg:text-xs text-white/30 tracking-wider mb-4 sm:mb-5">
          TECNOLOGÍA · MANTENIMIENTO · CONFIABILIDAD · TRANSPORTE DE CARGA
        </p>
        <a
          href="#register"
          className="bg-[#E31E24] text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full font-display text-sm sm:text-lg font-semibold hover:bg-white hover:text-[#E31E24] transition-all duration-300 shadow-lg shadow-[#E31E24]/30"
        >
          Adquirir Ingreso Ahora
        </a>
      </div>
    </section>
  );
}
