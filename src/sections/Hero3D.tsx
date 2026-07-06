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
    >

      {/* Autopartículas 3D — z-index 1 */}
      <div className="absolute inset-0 z-[1]">
        <AutopartParticles />
      </div>

      {/* ─── CONTENT ─── */}
      <div className="relative z-10 flex flex-col items-center w-full px-4" style={{ pointerEvents: 'none' }}>

        {/* Spacer para menú fijo — reducido en mobile */}
        <div className="shrink-0 w-full h-[72px] sm:h-[88px] lg:h-[96px]" />

        {/* TOP: Countdown — compacto */}
        <div className="shrink-0 flex flex-col items-center text-center">
          <p className="hidden sm:block font-mono text-[10px] lg:text-xs tracking-[0.3em] text-black/40 uppercase mb-1">
            1-2 Septiembre 2026 &middot; Bogot&aacute;, Colombia
          </p>
          <p className="sm:hidden font-mono text-[10px] tracking-[0.3em] text-black/40 uppercase mb-1">
            1-2 Septiembre 2026<br/>Bogot&aacute;, Colombia
          </p>
          <div className="flex items-center gap-2 sm:gap-3">
            {[
              { v: pad(timeLeft.days), l: 'D&Iacute;AS' },
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

        {/* CENTER: Banner */}
        <div className="flex-shrink-0 w-full py-2 sm:py-4">
          <div className="w-full px-2 sm:px-8 lg:px-12">
            <img
              src="/hero-banner.png"
              alt="TEMACON 2026"
              className="w-full max-w-[800px] mx-auto object-contain"
              style={{ maxHeight: '38vh' }}
            />
          </div>
        </div>

        {/* BOTTOM: CTA + headline */}
        <div className="shrink-0 flex flex-col items-center text-center pb-4 sm:pb-6">

          {/* BOTONES */}
          <div className="flex items-center justify-center gap-3 mb-2 sm:mb-3" style={{ pointerEvents: 'auto' }}>
            <a
              href="#pricing"
              className="flex items-center gap-2 bg-[#E31E24] text-white px-5 sm:px-10 py-2.5 sm:py-3 rounded-lg font-display text-sm sm:text-lg font-bold hover:bg-[#c41a20] transition-all duration-300 glow-pulse"
            >
              <QrCode size={16} className="sm:w-[18px] sm:h-[18px]" />
              Comprar Ticket
            </a>
            <a
              href="https://www.linkedin.com/events/7468427912283721730"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#0A66C2] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-display text-sm sm:text-base font-semibold hover:bg-[#004182] transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              Ver en LinkedIn
            </a>
          </div>

          {/* ES HORA DE TRANSFORMAR */}
          <div className="hidden sm:block">
            <h1 className="font-display text-2xl lg:text-4xl text-black leading-tight mb-1">
              ES HORA DE <span className="text-[#E31E24]">TRANSFORMAR</span>
            </h1>
            <p className="font-mono text-[9px] lg:text-[10px] text-black/30 tracking-wider">
              TECNOLOG&Iacute;A &middot; MANTENIMIENTO &middot; CONFIABILIDAD &middot; TRANSPORTE DE CARGA
            </p>
          </div>
          <div className="sm:hidden">
            <h1 className="font-display text-lg text-black leading-tight mb-1">
              ES HORA DE <span className="text-[#E31E24]">TRANSFORMAR</span>
            </h1>
            <p className="font-mono text-[7px] text-black/30 tracking-wider leading-relaxed">
              TECNOLOG&Iacute;A &middot; MANTENIMIENTO &middot; CONFIABILIDAD<br/>
              TRANSPORTE DE CARGA
            </p>
          </div>
        </div>

      </div>
    </section>
  );
});

export default Hero3D;
