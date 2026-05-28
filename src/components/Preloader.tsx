import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

/* ═══════════════════════════════════════════
   12 MODULES — each one = one LED segment
   ═══════════════════════════════════════════ */
const MODULES = [
  { label: 'Telemática', icon: '📡' },
  { label: 'IoT Sensores', icon: '🌐' },
  { label: 'GPS Tracking', icon: '📍' },
  { label: 'Mantenimiento Predictivo', icon: '🔧' },
  { label: 'Confiabilidad Vehicular', icon: '🛡️' },
  { label: 'Gestión de Flotas', icon: '🚛' },
  { label: 'Optimización de Rutas', icon: '🛣️' },
  { label: 'Diagnóstico Remoto', icon: '🔍' },
  { label: 'Análisis de Datos', icon: '📊' },
  { label: 'Cadena de Suministro', icon: '📦' },
  { label: 'Eficiencia Combustible', icon: '⛽' },
  { label: 'TEMACON 2026', icon: '🔴' },
];

const COUNT = MODULES.length;

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const [litCount, setLitCount] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'burst' | 'done'>('loading');

  /*─── Sequential LED animation ───*/
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setLitCount(current);
      if (current >= COUNT) {
        clearInterval(interval);
        setTimeout(() => setPhase('burst'), 200);
      }
    }, 250);

    const safety = setTimeout(() => {
      clearInterval(interval);
      setPhase('burst');
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(safety);
    };
  }, []);

  /*─── BURST phase — smooth exit ───*/
  useEffect(() => {
    if (phase !== 'burst') return;

    const tl = gsap.timeline({
      onComplete: () => {
        // Keep preloader invisible but mounted briefly for smooth transition
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            setPhase('done');
            onComplete();
          },
        });
      },
    });

    // Flash burst
    tl.fromTo(
      burstRef.current,
      { scale: 0, opacity: 1 },
      { scale: 3, opacity: 0, duration: 0.8, ease: 'power2.out' }
    );

    // Logo glows to full brightness then fades
    tl.to(
      logoRef.current,
      {
        filter: 'brightness(1.2) drop-shadow(0 0 80px rgba(227,30,36,1))',
        scale: 1.1,
        duration: 0.4,
        ease: 'power2.out',
      },
      0
    );
  }, [phase, onComplete]);

  /*─── Position LEDs in a circle ───*/
  const getLedPos = (index: number) => {
    const angle = (index * 360) / COUNT - 90; // -90 to start at top
    const rad = (angle * Math.PI) / 180;
    const r = 38; // % from center
    return {
      left: `${50 + r * Math.cos(rad)}%`,
      top: `${50 + r * Math.sin(rad)}%`,
    };
  };

  const progress = Math.min((litCount / COUNT) * 100, 100);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
      style={{ opacity: phase === 'done' ? 0 : 1, transition: 'opacity 0.6s ease', pointerEvents: phase === 'done' ? 'none' : 'auto' }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(227,30,36,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(227,30,36,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient pulse glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#E31E24]/[0.06] blur-[80px]"
        style={{
          animation: 'preloaderPulse 2s ease-in-out infinite',
          opacity: progress / 100,
        }}
      />

      {/* ─── CENTER: Logo + LED Ring ─── */}
      <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px]">
        {/* LED Ring container */}
        <div ref={ringRef} className="absolute inset-0">
          {MODULES.map((mod, i) => {
            const pos = getLedPos(i);
            const isLit = i < litCount;
            const isCurrent = i === litCount && phase === 'loading';

            return (
              <div
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: pos.left, top: pos.top }}
              >
                {/* LED dot */}
                <div
                  className={`
                    w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 transition-all duration-300
                    ${
                      isLit
                        ? 'bg-[#E31E24] border-[#E31E24] shadow-[0_0_12px_rgba(227,30,36,0.8)] scale-110'
                        : isCurrent
                          ? 'bg-[#E31E24]/40 border-[#E31E24]/60 animate-pulse'
                          : 'bg-transparent border-white/10'
                    }
                  `}
                />

                {/* Label — shows when lit or current */}
                <div
                  className={`
                    absolute mt-5 sm:mt-6 whitespace-nowrap text-center transition-all duration-300
                    ${isLit || isCurrent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}
                  `}
                >
                  <p
                    className={`font-mono text-[7px] sm:text-[8px] tracking-wider uppercase ${
                      isLit ? 'text-[#E31E24]' : 'text-white/30'
                    }`}
                  >
                    {mod.label}
                  </p>
                </div>

                {/* Connector line to ring */}
                <div
                  className={`absolute w-px h-6 transition-all duration-500 -z-10 ${
                    isLit ? 'bg-[#E31E24]/40' : 'bg-white/5'
                  }`}
                  style={{ top: '50%' }}
                />
              </div>
            );
          })}

          {/* Faint ring outline */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[76%] h-[76%] rounded-full border border-white/[0.05]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[68%] h-[68%] rounded-full border border-white/[0.03]" />
        </div>

        {/* Logo — center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <img
            ref={logoRef}
            src="/logo-v2.png"
            alt="TEMACON"
            className="w-[140px] sm:w-[180px] object-contain"
            style={{
              filter: `brightness(${0.3 + (progress / 100) * 0.7}) drop-shadow(0 0 ${progress}px rgba(227,30,36,${progress / 200}))`,
              transition: 'filter 0.3s ease',
            }}
          />
        </div>

        {/* BURST overlay */}
        <div
          ref={burstRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-[#E31E24] opacity-0 pointer-events-none"
          style={{ zIndex: 20 }}
        />
      </div>

      {/* ─── BOTTOM: Progress info ─── */}
      <div className="mt-16 sm:mt-20 text-center">
        <p className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase mb-3">
          {phase === 'loading' && litCount < COUNT && (
            <>
              <span className="text-[#E31E24]">{litCount}</span>
              <span className="text-white/20"> / {COUNT} módulos cargados</span>
            </>
          )}
          {phase === 'burst' && (
            <span className="text-[#E31E24] animate-pulse">INICIANDO SISTEMA</span>
          )}
        </p>

        {/* Progress bar */}
        <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-gradient-to-r from-[#E31E24] to-[#ff6b6b] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Current module name */}
        {phase === 'loading' && litCount < COUNT && (
          <p className="mt-3 font-mono text-[10px] text-[#E31E24] animate-pulse">
            {MODULES[litCount].icon} {MODULES[litCount].label}
          </p>
        )}
      </div>

      {/* Corner brackets */}
      <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-[#E31E24]/20" />
      <div className="absolute top-6 right-6 w-8 h-8 border-r border-t border-[#E31E24]/20" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-[#E31E24]/20" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-[#E31E24]/20" />

      <style>{`
        @keyframes preloaderPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.06; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.12; }
        }
      `}</style>
    </div>
  );
}
