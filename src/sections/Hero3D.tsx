import { useCountdown } from '@/hooks/useCountdown';
import { memo } from 'react';
import { QrCode } from 'lucide-react';
import AutopartParticles from '@/components/AutopartParticles';

const TARGET_DATE = new Date('2026-09-01T08:00:00');
function pad(n: number) { return n.toString().padStart(2, '0'); }

const Hero3D = memo(function Hero3D() {
  const timeLeft = useCountdown(TARGET_DATE);

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center bg-white overflow-hidden"
      style={{ minHeight: '100svh' }}
    >

      {/* Autopartículas 3D — z-index 1 */}
      <div className="absolute inset-0 z-[1]">
        <AutopartParticles />
      </div>

      {/* ─── CONTENT ─── */}
      <div className="relative z-10 flex flex-col items-center w-full px-4" style={{ pointerEvents: 'none', minHeight: '100svh' }}>

        {/* Spacer para banner + menú fijo */}
        <div className="shrink-0 w-full" style={{ height: '96px' }} />

        {/* TOP: Countdown — nunca se comprime */}
        <div className="shrink-0 flex flex-col items-center text-center mb-3">
          <p className="hidden sm:block font-mono text-[10px] lg:text-xs tracking-[0.3em] text-black/40 uppercase mb-1">
            1-2 Septiembre 2026 · Bogotá, Colombia
          </p>
          <p className="sm:hidden font-mono text-[10px] tracking-[0.3em] text-black/40 uppercase mb-1">
            1-2 Septiembre 2026<br/>Bogotá, Colombia
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
        </div>

        {/* CENTER: Banner — flex-grow pero con min-height controlado */}
        <div className="flex-1 flex items-center justify-center w-full" style={{ minHeight: '0' }}>
          <div className="w-full px-4 sm:px-8 lg:px-12">
            <img
              src="/hero-banner.png"
              alt="TEMACON 2026 — Tecnología, Mantenimiento, Confiabilidad · 1-2 Septiembre 2026 · Aliados: Logyca, Fedetranscarga · Organiza: Tiendacamion"
              className="w-full max-w-[935px] mx-auto object-contain"
              style={{ maxHeight: '45vh' }}
            />
          </div>
        </div>

        {/* BOTTOM: CTA + headline — nunca se comprime */}
        <div className="shrink-0 flex flex-col items-center text-center pb-6 pt-3">

          {/* BOTÓN */}
          <div className="flex items-center justify-center gap-3 mb-4" style={{ pointerEvents: 'auto' }}>
            <a
              href="#pricing"
              className="flex items-center gap-2 bg-[#E31E24] text-white px-6 sm:px-10 py-3 rounded-lg font-display text-base sm:text-lg font-bold hover:bg-[#c41a20] transition-all duration-300 glow-pulse"
            >
              <QrCode size={18} />
              Comprar Ticket
            </a>
          </div>

          {/* ES HORA DE TRANSFORMAR */}
          <div className="hidden sm:block">
            <h1 className="font-display text-3xl lg:text-4xl text-black leading-tight mb-1">
              ES HORA DE <span className="text-[#E31E24]">TRANSFORMAR</span>
            </h1>
            <p className="font-mono text-[9px] lg:text-[10px] text-black/30 tracking-wider">
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
        </div>

      </div>
    </section>
  );
});

export default Hero3D;
