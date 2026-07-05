import { useEffect, useState, memo } from 'react';

/* ═══════════════════════════════════════════
   SECTION INDICATOR — Solo Desktop
   Mobile: oculto (usamos botón Inicio)
   ═══════════════════════════════════════════ */

const SECTIONS = [
  { id: 'hero',            label: 'Inicio' },
  { id: 'about',           label: 'Evento' },
  { id: 'audience',        label: 'Perfiles' },
  { id: 'pricing',         label: 'Tickets' },
  { id: 'brands',          label: 'Marcas' },
  { id: 'tractocamion',    label: '3D' },
  { id: 'tracks',          label: 'Tracks' },
  { id: 'agenda-speakers', label: 'Agenda' },
  { id: 'venue',           label: 'Sede' },
  { id: 'faq',             label: 'FAQ' },
];

function getActiveSection(): number {
  const vh = window.innerHeight;
  const triggerLine = vh * 0.4;
  if (window.scrollY < 50) return 0;
  for (let i = SECTIONS.length - 1; i >= 0; i--) {
    const el = document.getElementById(SECTIONS[i].id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (rect.top <= triggerLine) return i;
  }
  return 0;
}

const SectionIndicator = memo(function SectionIndicator() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let raf = 0;
    let lastIdx = -1;

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

    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const current = SECTIONS[activeIndex];
  const progress = ((activeIndex + 1) / SECTIONS.length) * 100;
  const totalDots = SECTIONS.length;

  /* Solo Desktop — en mobile usamos el botón Inicio */
  return (
    <div className="fixed z-[9998] hidden md:block" style={{ bottom: '20px', left: '12px' }}>
      <div
        className="relative px-2 py-1.5"
        style={{
          background: 'rgba(10,0,0,0.92)',
          border: '1.5px solid rgba(227,30,36,0.6)',
          boxShadow: '0 0 12px rgba(227,30,36,0.15), inset 0 0 20px rgba(227,30,36,0.03)',
          width: '60px',
          height: '60px',
        }}
      >
        {/* Corners */}
        <span className="absolute -top-[2px] -left-[2px] w-2 h-2 border-l-2 border-t-2 border-[#E31E24]" />
        <span className="absolute -top-[2px] -right-[2px] w-2 h-2 border-r-2 border-t-2 border-[#E31E24]" />
        <span className="absolute -bottom-[2px] -left-[2px] w-2 h-2 border-l-2 border-b-2 border-[#E31E24]" />
        <span className="absolute -bottom-[2px] -right-[2px] w-2 h-2 border-r-2 border-b-2 border-[#E31E24]" />

        <p className="font-mono text-[5px] tracking-[0.15em] text-[#E31E24]/70 uppercase text-left leading-none truncate">
          {current.label}
        </p>
        <div className="flex items-baseline justify-start gap-0.5 mt-0.5">
          <span className="font-mono text-base font-bold text-[#E31E24] leading-none" style={{ textShadow: '0 0 10px rgba(227,30,36,0.7)' }}>
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <span className="font-mono text-[7px] text-white/20">/</span>
          <span className="font-mono text-[8px] text-white/30">{String(totalDots).padStart(2, '0')}</span>
        </div>
        <div className="w-full h-[2px] bg-white/5 mt-1">
          <div className="h-full transition-all duration-500 ease-out" style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#E31E24,#ff4444)', boxShadow: '0 0 6px rgba(227,30,36,0.8)' }} />
        </div>
        <div className="flex gap-[2px] mt-1 justify-start flex-wrap">
          {SECTIONS.map((_, i) => {
            const isActive = i === activeIndex;
            const isPast = i < activeIndex;
            let dotClass = 'bg-transparent border border-white/10';
            if (isActive) dotClass = 'bg-[#E31E24] border-[#E31E24] shadow-[0_0_4px_rgba(227,30,36,0.8)]';
            else if (isPast) dotClass = 'bg-[#E31E24]/40 border-[#E31E24]/30';
            return <div key={i} className={`transition-all duration-300 ${dotClass}`} style={{ width: '3px', height: '3px' }} />;
          })}
        </div>
      </div>
    </div>
  );
});

export default SectionIndicator;
