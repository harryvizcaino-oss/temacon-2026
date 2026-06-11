import { useCountdown } from '@/hooks/useCountdown';
import { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import {
  Truck, Cpu, Wrench, ShieldCheck, Route, Radio, Zap, Activity, QrCode, Sparkles,
} from 'lucide-react';
import AutopartParticles from '@/components/AutopartParticles';
import AddToCalendar from '@/components/AddToCalendar';

const TARGET_DATE = new Date('2026-09-01T08:00:00');
function pad(n: number) { return n.toString().padStart(2, '0'); }

const Hero3D = memo(function Hero3D() {
  const timeLeft = useCountdown(TARGET_DATE);
  const logoRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  /* Animación del hero al montar */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, {
        opacity: 0, y: 30,
        duration: 0.8, ease: 'power2.out',
      });
      gsap.from(logoRef.current, {
        y: 60, opacity: 0, scale: 0.85,
        duration: 1.2, ease: 'power3.out', delay: 0.2,
      });
    });
    return () => { ctx.revert(); };
  }, []);

  return (
    <section id="hero" className="relative flex flex-col items-center bg-white" style={{ height: '92dvh', minHeight: '620px' }}>

      {/* Autopartículas 3D — z-index 1, recibe mouse/touch */}
      <div className="absolute inset-0 z-[1]" style={{ pointerEvents: 'auto' }}>
        <AutopartParticles />
      </div>

      {/* ─── CONTENT ─── */}
      <div ref={heroRef} className="relative z-10 flex flex-col items-center h-full w-full px-4" style={{ pointerEvents: 'none' }}>

        {/* Spacer para menú fijo */}
        <div className="shrink-0" style={{ height: '60px' }} />

        {/* TOP: Countdown */}
        <div className="shrink-0 flex flex-col items-center text-center">
          <p className="font-mono text-[10px] lg:text-xs tracking-[0.3em] text-black/40 uppercase mb-1 sm:hidden">
            1-2 Septiembre 2026<br/>Bogotá, Colombia
          </p>
          <p className="hidden sm:block font-mono text-[10px] lg:text-xs tracking-[0.3em] text-black/40 uppercase mb-1">
            1-2 Septiembre 2026 · Bogotá, Colombia
          </p>
          <div className="flex items-center gap-2 sm:gap-3">
            {[
              { v: pad(timeLeft.days), l: 'DÍAS' },
              { v: pad(timeLeft.hours), l: 'HRS' },
              { v: pad(timeLeft.minutes), l: 'MIN' },
              { v: pad(timeLeft.seconds), l: 'SEG' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="bg-black/5 border border-black/10 rounded-lg px-2 py-1 text-center min-w-[36px] sm:min-w-[44px]">
                  <span className="font-display text-base sm:text-lg lg:text-xl text-black tabular-nums leading-none">{item.v}</span>
                  <p className="font-mono text-[5px] sm:text-[6px] text-black/30 uppercase tracking-wider">{item.l}</p>
                </div>
                {i < 3 && <span className="text-black/20 text-sm">:</span>}
              </div>
            ))}
          </div>
          <div className="mt-1" style={{ pointerEvents: 'auto' }}>
            <AddToCalendar variant="pill" />
          </div>
        </div>

        {/* CENTER: Hero Banner — ancho completo */}
        <div className="flex-1 flex items-center justify-center w-full min-h-0">
          <div ref={logoRef} className="w-full px-4 sm:px-8 lg:px-12">
            <img
              src="/hero-banner.png"
              alt="TEMACON 2026 — Tecnología, Mantenimiento, Confiabilidad · 1-2 Septiembre 2026 · Aliados: Logyca, Fedetranscarga · Organiza: Tiendacamion"
              className="w-full max-w-[935px] mx-auto object-contain"
            />
          </div>
        </div>

        {/* BOTTOM: CTA buttons */}
        <div className="shrink-0 flex flex-col items-center text-center pb-5">
          {/* Espacio entre banner y ES HORA DE */}
          <div className="h-6 sm:h-8" />
          <div className="hidden sm:block">
            <h1 className="font-display text-3xl lg:text-4xl text-black leading-tight mb-1">
              ES HORA DE <span className="text-[#E31E24]">TRANSFORMAR</span>
            </h1>
            <p className="font-mono text-[9px] lg:text-[10px] text-black/30 tracking-wider mb-3">
              TECNOLOGÍA · MANTENIMIENTO · CONFIABILIDAD · TRANSPORTE DE CARGA
            </p>
          </div>
          <div className="sm:hidden">
            <h1 className="font-display text-xl text-black leading-tight mb-1">
              ES HORA DE <span className="text-[#E31E24]">TRANSFORMAR</span>
            </h1>
            <p className="font-mono text-[8px] text-black/30 tracking-wider leading-relaxed">
              TECNOLOGÍA · MANTENIMIENTO · CONFIABILIDAD<br/>
              TRANSPORTE DE CARGA
            </p>
          </div>
          <div className="h-3" />
          <div className="flex items-center gap-3" style={{ pointerEvents: 'auto' }}>
            <a
              href="#testimonials"
              className="flex items-center gap-2 bg-white text-black border-2 border-yellow-400 px-4 sm:px-6 py-2.5 rounded-lg font-display text-sm sm:text-base font-semibold hover:bg-yellow-400 hover:text-black transition-all duration-300"
            >
              <Sparkles size={15} className="text-yellow-400 fill-transparent" strokeWidth={2.5} />
              Por que Asistir
            </a>
            <a
              href="#pricing"
              className="flex items-center gap-2 bg-[#E31E24] text-white px-5 sm:px-8 py-2.5 rounded-lg font-display text-sm sm:text-base font-semibold hover:bg-[#c41a20] transition-all duration-300 glow-pulse"
            >
              <QrCode size={16} />
              Comprar Ticket
            </a>
          </div>
        </div>

      </div>
    </section>
  );
});

export default Hero3D;
