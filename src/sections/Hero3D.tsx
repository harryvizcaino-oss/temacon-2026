import { useCountdown } from '@/hooks/useCountdown';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  Truck, Cpu, Wrench, ShieldCheck, Route, Radio, Zap, Activity,
} from 'lucide-react';

const TARGET_DATE = new Date('2026-09-01T08:00:00');
function pad(n: number) { return n.toString().padStart(2, '0'); }

/* ═══════════════════════════════════════════
   CONFIG — 3 orbits (responsive radii)
   ═══════════════════════════════════════════ */
const ORBITS = [
  {
    r: 105, rMobile: 60, speed: 40, color: 'rgba(227,30,36,0.35)',
    items: [
      { Icon: Truck, label: 'TRANSPORTE', offset: 0 },
      { Icon: Cpu, label: 'TECNOLOGÍA', offset: 120 },
      { Icon: Wrench, label: 'MANTENIMIENTO', offset: 240 },
    ],
  },
  {
    r: 175, rMobile: 95, speed: 55, color: 'rgba(227,30,36,0.18)',
    items: [
      { Icon: ShieldCheck, label: 'CONFIABILIDAD', offset: 60 },
      { Icon: Route, label: 'RUTAS', offset: 180 },
      { Icon: Radio, label: 'COMUNICACIÓN', offset: 300 },
    ],
  },
  {
    r: 210, rMobile: 120, speed: 70, color: 'rgba(255,255,255,0.10)',
    items: [
      { Icon: Zap, label: 'EFICIENCIA', offset: 30 },
      { Icon: Activity, label: 'MONITOREO', offset: 210 },
    ],
  },
];

/* ═══════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════ */
export default function Hero3D() {
  const timeLeft = useCountdown(TARGET_DATE);
  const logoRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);

    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        y: 60, opacity: 0, scale: 0.85,
        duration: 1.2, ease: 'power3.out', delay: 0.1,
      });
    });
    return () => { ctx.revert(); window.removeEventListener('resize', check); };
  }, []);

  // Responsive orbit container size
  const orbitSize = isMobile ? 280 : 460;

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
            }}
          />
        ))}
      </div>

      {/* ─── TOP: date + countdown ─── */}
      <div className="relative z-30 flex flex-col items-center text-center pt-20 sm:pt-16 lg:pt-8">
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

      {/* ─── CENTER: GIANT Logo + Orbit System ─── */}
      <div className="relative z-20 flex-1 flex items-center justify-center w-full" style={{ minHeight: 0 }}>
        {/* Orbit container — absolute behind logo */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ width: orbitSize, height: orbitSize }}
        >
          {/* Rings */}
          {ORBITS.map((o, i) => {
            const r = isMobile ? o.rMobile : o.r;
            return (
              <div
                key={`ring-${i}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ width: r * 2, height: r * 2, border: `2px solid ${o.color}` }}
              >
                {/* Tick marks */}
                {Array.from({ length: 12 }).map((_, t) => {
                  const a = (t * 30 * Math.PI) / 180;
                  const tx = Math.cos(a) * r;
                  const ty = Math.sin(a) * r;
                  return (
                    <div
                      key={t}
                      className="absolute w-1 h-1 bg-[#E31E24] rounded-full"
                      style={{ left: `calc(50% + ${tx}px)`, top: `calc(50% + ${ty}px)`, transform: 'translate(-50%,-50%)', opacity: 0.3 }}
                    />
                  );
                })}
              </div>
            );
          })}

          {/* Center hub */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#E31E24] rounded-full opacity-40" />

          {/* Rotating icons */}
          {ORBITS.map((o, oi) => {
            const r = isMobile ? o.rMobile : o.r;
            return (
              <div
                key={`arm-${oi}`}
                className="absolute left-1/2 top-1/2"
                style={{
                  animation: `orbitSpin${oi % 2 === 0 ? '' : 'R'} ${o.speed}s linear infinite`,
                }}
              >
                {o.items.map(({ Icon, label, offset }) => {
                  const a = (offset * Math.PI) / 180;
                  const x = Math.cos(a) * r;
                  const y = Math.sin(a) * r;
                  return (
                    <div
                      key={label}
                      className="absolute flex flex-col items-center"
                      style={{
                        left: x, top: y,
                        transform: 'translate(-50%,-50%)',
                        opacity: mounted ? 1 : 0,
                        transition: 'opacity .6s ease',
                      }}
                    >
                      <div style={{ animation: `orbitSpin${oi % 2 === 0 ? 'R' : ''} ${o.speed}s linear infinite` }}>
                        {/* Tech-styled icon */}
                        <div className="relative group cursor-pointer">
                          <div className="absolute -inset-1.5 sm:-inset-2 bg-[#E31E24]/20 rounded-lg blur-sm group-hover:bg-[#E31E24]/40 transition-all" />
                          <div className="relative w-9 h-9 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-[#0a0a0a] border-2 border-[#E31E24] rounded-lg flex items-center justify-center shadow-lg shadow-[#E31E24]/30 group-hover:shadow-[#E31E24]/60 group-hover:scale-110 transition-all">
                            <Icon size={isMobile ? 14 : 20} className="text-[#E31E24]" />
                          </div>
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#E31E24] rounded-full animate-pulse" />
                        </div>
                        <span className="font-mono text-[5px] sm:text-[6px] lg:text-[7px] text-white/40 tracking-wider block text-center mt-1 bg-black/70 px-1 py-0.5 rounded">
                          {label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* GIANT Logo — 60% of viewport */}
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
          Reserva tu lugar
        </a>
      </div>

      <style>{`
        @keyframes orbitSpin { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
        @keyframes orbitSpinR { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(-360deg); } }
      `}</style>
    </section>
  );
}
