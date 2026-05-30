import { useEffect, useState } from 'react';

/* ═══════════════════════════════════════════
   SECTION INDICATOR — HUD Digital Compacto
   12 secciones en orden de aparicion
   ═══════════════════════════════════════════ */

const SECTIONS = [
  { id: 'hero',          label: 'Inicio' },
  { id: 'about',         label: 'Evento' },
  { id: 'flujo',         label: 'Flujo' },
  { id: 'brands',        label: 'Marcas' },
  { id: 'audience',      label: 'Asistente' },
  { id: 'tractocamion',  label: 'Kenworth' },
  { id: 'tracks',        label: 'Tracks' },
  { id: 'speakers',      label: 'Speakers' },
  { id: 'testimonials',  label: 'Testimonios' },
  { id: 'agenda',        label: 'Agenda' },
  { id: 'venue',         label: 'Sede' },
  { id: 'pricing',       label: 'Registro' },
];

function getActiveSection(): number {
  const vh = window.innerHeight;
  const triggerLine = vh * 0.4;

  for (let i = SECTIONS.length - 1; i >= 0; i--) {
    const el = document.getElementById(SECTIONS[i].id);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= triggerLine) {
        return i;
      }
    }
  }
  return 0;
}

export default function SectionIndicator() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let raf = 0;
    let lastIdx = -1;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const idx = getActiveSection();
        if (idx !== lastIdx) {
          lastIdx = idx;
          setActiveIndex(idx);
        }
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const current = SECTIONS[activeIndex];
  const progress = ((activeIndex + 1) / SECTIONS.length) * 100;

  return (
    <div
      className="fixed z-[9998]"
      style={{ bottom: '78px', right: '16px' }}
    >
      <div
        className="relative px-3 py-2"
        style={{
          background: 'rgba(10,0,0,0.92)',
          border: '1.5px solid rgba(227,30,36,0.6)',
          boxShadow: '0 0 12px rgba(227,30,36,0.15), inset 0 0 20px rgba(227,30,36,0.03)',
          minWidth: '68px',
        }}
      >
        {/* Corner brackets */}
        <span className="absolute -top-[2px] -left-[2px] w-2 h-2 border-l-2 border-t-2 border-[#E31E24]" />
        <span className="absolute -top-[2px] -right-[2px] w-2 h-2 border-r-2 border-t-2 border-[#E31E24]" />
        <span className="absolute -bottom-[2px] -left-[2px] w-2 h-2 border-l-2 border-b-2 border-[#E31E24]" />
        <span className="absolute -bottom-[2px] -right-[2px] w-2 h-2 border-r-2 border-b-2 border-[#E31E24]" />

        {/* Section name */}
        <p className="font-mono text-[7px] tracking-[0.3em] text-[#E31E24]/70 uppercase text-right mb-1">
          {current.label}
        </p>

        {/* Counter */}
        <div className="flex items-baseline justify-end gap-1">
          <span className="font-mono text-xl font-bold text-[#E31E24] leading-none" style={{ textShadow: '0 0 10px rgba(227,30,36,0.7)' }}>
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <span className="font-mono text-[9px] text-white/20">/</span>
          <span className="font-mono text-[10px] text-white/30">
            {String(SECTIONS.length).padStart(2, '0')}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-[2px] bg-white/5 mt-1.5">
          <div
            className="h-full transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg,#E31E24,#ff4444)',
              boxShadow: '0 0 6px rgba(227,30,36,0.8)',
            }}
          />
        </div>

        {/* Dots - 12 compact */}
        <div className="flex gap-[3px] mt-1.5 justify-end flex-wrap max-w-[72px]">
          {SECTIONS.map((_, i) => (
            <div
              key={i}
              className={`transition-all duration-300 ${
                i === activeIndex
                  ? 'bg-[#E31E24] border-[#E31E24] shadow-[0_0_4px_rgba(227,30,36,0.8)]'
                  : i < activeIndex
                    ? 'bg-[#E31E24]/40 border-[#E31E24]/30'
                    : 'bg-transparent border border-white/10'
              }`}
              style={{ width: '5px', height: '5px' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
