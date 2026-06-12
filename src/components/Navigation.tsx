import { useState, useEffect, useRef, memo } from 'react';
import { Menu, X, ChevronRight, QrCode } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION — Desktop + Mobile menu with all sections
   ═══════════════════════════════════════════════════════════════ */

interface NavSection {
  label: string;
  href: string;
  description?: string;
}

/*─── Las 11 secciones en orden exacto de la pagina ───*/
const ALL_SECTIONS: NavSection[] = [
  { label: 'Inicio', href: '#hero', description: 'Hero principal' },
  { label: 'Evento', href: '#about', description: 'Sobre TEMACON 2026 + LinkedIn' },
  { label: 'Perfiles', href: '#audience', description: '12 perfiles profesionales' },
  { label: 'Flujo', href: '#flujo', description: 'Mantenimiento inteligente' },
  { label: 'Marcas', href: '#brands', description: 'Patrocinadores' },
  { label: '3D', href: '#tractocamion', description: 'Kenworth T800' },
  { label: 'Tracks', href: '#tracks', description: '6 tracks especializados' },
  { label: 'Agenda', href: '#agenda-speakers', description: 'Programa y speakers' },
  { label: 'Sede', href: '#venue', description: 'Bogotá, Colombia' },
  { label: 'Tickets', href: '#pricing', description: 'Adquiere ingreso' },
  { label: 'FAQ', href: '#faq', description: 'Preguntas frecuentes' },
];

const Navigation = memo(function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [onLightSection, setOnLightSection] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  /*─── Scroll detection ───*/
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /*─── Detect if we're over a light-colored section ───*/
  useEffect(() => {
    const checkSection = () => {
      const lightSections = document.querySelectorAll('[data-nav-light]');
      let isLight = false;
      const navBottom = window.scrollY + 80;

      lightSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;
        if (navBottom >= sectionTop && navBottom <= sectionBottom) {
          isLight = true;
        }
      });

      setOnLightSection(isLight);
    };

    window.addEventListener('scroll', checkSection, { passive: true });
    checkSection();
    return () => window.removeEventListener('scroll', checkSection);
  }, []);

  const logoDark = scrolled || onLightSection;

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 flex items-center transition-all duration-500 ${
          scrolled
            ? 'bg-white/60 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="wrapper flex items-center justify-between w-full px-4 sm:px-6">
          {/* Logo — Siempre ROJO */}
          <a href="#" className="flex items-center gap-2 z-10">
            <img
              src="/logo-v2.png"
              alt="TEMACON"
              className="h-8 sm:h-10 lg:h-14 w-auto object-contain transition-all duration-300"
              style={{ filter: 'brightness(0) saturate(100%) invert(16%) sepia(97%) saturate(4950%) hue-rotate(350deg) brightness(93%) contrast(108%)' }}
            />
          </a>

          {/* Desktop Nav — 4 accesos rapidos + 2 botones */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-6">
            <a
              href="#about"
              className="bg-white text-[#0a66c2] border-[2.5px] border-[#0a66c2] px-3 py-1.5 rounded-full text-xs font-bold hover:bg-[#0a66c2] hover:text-white transition-all duration-300 whitespace-nowrap flex items-center gap-1.5"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              Evento LinkedIn
            </a>
            <a href="#audience" className={`relative group text-sm font-medium transition-colors ${logoDark ? 'text-black hover:text-[#E31E24]' : 'text-white hover:text-[#E31E24]'}`}>
              Perfiles
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#E31E24] rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#venue" className={`relative group text-sm font-medium transition-colors ${logoDark ? 'text-black hover:text-[#E31E24]' : 'text-white hover:text-[#E31E24]'}`}>
              Lugar
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#E31E24] rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#brands" className={`relative group text-sm font-medium transition-colors ${logoDark ? 'text-black hover:text-[#E31E24]' : 'text-white hover:text-[#E31E24]'}`}>
              Sponsors
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#E31E24] rounded-full transition-all duration-300 group-hover:w-full" />
            </a>

            {/* CTA buttons — compact group */}
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-black/10">
              <a
                href="#brands"
                className="border border-[#E31E24]/60 text-[#E31E24] px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-[#E31E24] hover:text-white transition-all duration-300 whitespace-nowrap"
              >
                Patrocinar
              </a>
              <a
                href="#pricing"
                className="bg-[#E31E24] text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#c41a20] transition-all duration-300 glow-pulse whitespace-nowrap flex items-center gap-1.5"
              >
                <QrCode size={13} />
                Comprar Ticket
              </a>
            </div>
          </div>

          {/* Mobile Menu Button — Siempre ROJO */}
          <button
            className="lg:hidden p-2 rounded-lg transition-colors text-[#E31E24]"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════
         MOBILE MENU
         ═══════════════════════════════════════════ */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-xl transition-all duration-500"
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-[85vw] max-w-[360px] bg-[#0a0a0a] shadow-2xl transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <img src="/logo-v2.png" alt="TEMACON" className="h-8 object-contain" />
            <button
              className="p-1.5 text-white/60 hover:text-white"
              onClick={() => setMobileOpen(false)}
              aria-label="Cerrar menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content — 13 secciones en orden */}
          <div className="overflow-y-auto flex-1">
            <div className="px-4 pt-3 pb-1 flex items-center justify-between">
              <p className="font-mono text-[8px] text-[#E31E24] tracking-[0.3em] uppercase">
                Secciones
              </p>
              <p className="font-mono text-[8px] text-white/30 tracking-wider">
                {ALL_SECTIONS.length} SECCIONES
              </p>
            </div>
            <div className="px-3 pb-1 space-y-0">
              {ALL_SECTIONS.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 px-2 py-[4px] rounded-lg hover:bg-white/5 transition-colors group"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="font-mono text-[9px] text-white/20 w-4 text-right flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-display text-[13px] group-hover:text-[#E31E24] transition-colors leading-tight">
                      {link.label}
                    </p>
                    {link.description && (
                      <p className="font-mono text-[7px] text-white/30 leading-tight">{link.description}</p>
                    )}
                  </div>
                  <ChevronRight size={12} className="text-white/20 group-hover:text-[#E31E24] transition-colors flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="px-3 py-2 border-t border-white/10 bg-[#0a0a0a] flex flex-col gap-[6px]">
            <a
              href="#brands"
              className="flex items-center justify-center gap-1 border border-[#E31E24]/60 text-[#E31E24] py-[7px] rounded-lg font-display font-semibold text-[12px] leading-tight hover:bg-[#E31E24] hover:text-white transition-all"
              onClick={() => setMobileOpen(false)}
            >
              Quiero Patrocinar
            </a>
            <a
              href="#pricing"
              className="flex items-center justify-center gap-1.5 bg-[#E31E24] text-white py-[8px] rounded-lg font-display font-semibold text-[12px] leading-tight hover:bg-[#c41a20] transition-all glow-pulse"
              onClick={() => setMobileOpen(false)}
            >
              <QrCode size={14} />
              Comprar Ticket
            </a>
            <p className="font-mono text-[7px] text-white/30 text-center leading-tight">
              $399,000 + IVA · 1-2 Sept 2026 · Bogotá
            </p>
          </div>
        </div>
      </div>
    </>
  );
});

export default Navigation;
