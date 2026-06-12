import { useEffect, useState, memo } from 'react';

/* ═══════════════════════════════════════════
   SECTION INDICATOR — HUD Digital Compacto
   11 secciones en orden exacto de la pagina
   1 palabra fija — la caja nunca cambia de tamano
   ═══════════════════════════════════════════ */

const SECTIONS = [
  { id: 'hero',            label: 'Inicio' },
  { id: 'about',           label: 'Evento' },
  { id: 'audience',        label: 'Perfiles' },
  { id: 'flujo',           label: 'Flujo' },
  { id: 'brands',          label: 'Marcas' },
  { id: 'tractocamion',    label: '3D' },
  { id: 'tracks',          label: 'Tracks' },
  { id: 'agenda-speakers', label: 'Agenda' },
  { id: 'venue',           label: 'Sede' },
  { id: 'pricing',         label: 'Tickets' },
  { id: 'faq',             label: 'FAQ' },
];

// NOTE: HashtagMarquee y Footer no tienen ID

function getActiveSection(): number {
  const vh = window.innerHeight;
  const triggerLine = vh * 0.4;

  // Caso especial: cerca del top de la pagina = siempre seccion 1
  if (window.scrollY < 50) return 0;

  // Recorremos de abajo hacia arriba buscando la primera seccion
  // cuyo top este por encima de la linea de trigger
  for (let i = SECTIONS.length - 1; i >= 0; i--) {
    const el = document.getElementById(SECTIONS[i].id);
    // Si el elemento no existe (lazy-loaded aun no montado), lo saltamos
    if (!el) continue;

    const rect = el.getBoundingClientRect();
    if (rect.top <= triggerLine) {
      return i;
    }
  }

  // Fallback: si ninguna seccion califica, estamos en el hero
  return 0;
}

const SectionIndicator = memo(function SectionIndicator() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let raf = 0;
    let lastIdx = -1;

    // Intervalo para detectar cuando secciones lazy-loaded aparecen en el DOM
    let domCheckInterval: ReturnType<typeof setInterval> | null = null;

    const update = () => {
      const idx = getActiveSection();
      if (idx !== lastIdx) {
        lastIdx = idx;
        setActiveIndex(idx);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    // Primer check inmediato
    update();

    window.addEventListener('scroll', onScroll, { passive: true });

    // Re-check cada 500ms para detectar secciones lazy-loaded nuevas
    domCheckInterval = setInterval(update, 500);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
      if (domCheckInterval) clearInterval(domCheckInterval);
    };
  }, []);

  const current = SECTIONS[activeIndex];
  const progress = ((activeIndex + 1) / SECTIONS.length) * 100;
  const totalDots = SECTIONS.length;

  return (
    <div className="fixed z-[9998]" style={{ bottom: '20px', left: '12px' }}>
      <div
        className="relative px-2 py-1.5 sm:px-3 sm:py-2"
        style={{
          background: 'rgba(10,0,0,0.92)',
          border: '1.5px solid rgba(227,30,36,0.6)',
          boxShadow: '0 0 12px rgba(227,30,36,0.15), inset 0 0 20px rgba(227,30,36,0.03)',
          width: '60px',
          height: '60px',
        }}
      >
        {/* Corner brackets */}
        <span className="absolute -top-[2px] -left-[2px] w-1.5 h-1.5 sm:w-2 sm:h-2 border-l-2 border-t-2 border-[#E31E24]"></span>
        <span className="absolute -top-[2px] -right-[2px] w-1.5 h-1.5 sm:w-2 sm:h-2 border-r-2 border-t-2 border-[#E31E24]"></span>
        <span className="absolute -bottom-[2px] -left-[2px] w-1.5 h-1.5 sm:w-2 sm:h-2 border-l-2 border-b-2 border-[#E31E24]"></span>
        <span className="absolute -bottom-[2px] -right-[2px] w-1.5 h-1.5 sm:w-2 sm:h-2 border-r-2 border-b-2 border-[#E31E24]"></span>

        {/* Section name */}
        <p
          className="font-mono text-[5px] tracking-[0.15em] text-[#E31E24]/70 uppercase text-left leading-none truncate"
          style={{ whiteSpace: 'nowrap', height: '8px', overflow: 'hidden' }}
        >
          {current.label}
        </p>

        {/* Counter */}
        <div className="flex items-baseline justify-start gap-0.5 mt-0.5">
          <span
            className="font-mono text-base font-bold text-[#E31E24] leading-none"
            style={{ textShadow: '0 0 10px rgba(227,30,36,0.7)' }}
          >
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <span className="font-mono text-[7px] text-white/20">/</span>
          <span className="font-mono text-[8px] text-white/30">
            {String(totalDots).padStart(2, '0')}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-[2px] bg-white/5 mt-1">
          <div
            className="h-full transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg,#E31E24,#ff4444)',
              boxShadow: '0 0 6px rgba(227,30,36,0.8)',
            }}
          ></div>
        </div>

        {/* Dots */}
        <div className="flex gap-[2px] mt-1 justify-start flex-wrap">
          {SECTIONS.map((_, i) => {
            const isActive = i === activeIndex;
            const isPast = i < activeIndex;
            let dotClass = 'bg-transparent border border-white/10';
            if (isActive) {
              dotClass = 'bg-[#E31E24] border-[#E31E24] shadow-[0_0_4px_rgba(227,30,36,0.8)]';
            } else if (isPast) {
              dotClass = 'bg-[#E31E24]/40 border-[#E31E24]/30';
            }
            return (
              <div
                key={i}
                className={`transition-all duration-300 ${dotClass}`}
                style={{ width: '3px', height: '3px' }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default SectionIndicator;
