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

          {/* Desktop Nav — 6 links + 3 CTAs agrupados */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-6">
            <a href="#hero" className={`relative group text-sm font-medium transition-colors ${logoDark ? 'text-black hover:text-[#E31E24]' : 'text-white hover:text-[#E31E24]'}`}>
              Inicio
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#E31E24] rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#flujo" className={`relative group text-sm font-medium transition-colors ${logoDark ? 'text-black hover:text-[#E31E24]' : 'text-white hover:text-[#E31E24]'}`}>
              Flujo
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#E31E24] rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#brands" className={`relative group text-sm font-medium transition-colors ${logoDark ? 'text-black hover:text-[#E31E24]' : 'text-white hover:text-[#E31E24]'}`}>
              Sponsors
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#E31E24] rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#tractocamion" className={`relative group text-sm font-medium transition-colors ${logoDark ? 'text-black hover:text-[#E31E24]' : 'text-white hover:text-[#E31E24]'}`}>
              3D
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#E31E24] rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#agenda" className={`relative group text-sm font-medium transition-colors ${logoDark ? 'text-black hover:text-[#E31E24]' : 'text-white hover:text-[#E31E24]'}`}>
              Agenda
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#E31E24] rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#faq" className={`relative group text-sm font-medium transition-colors ${logoDark ? 'text-black hover:text-[#E31E24]' : 'text-white hover:text-[#E31E24]'}`}>
              FAQ
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
