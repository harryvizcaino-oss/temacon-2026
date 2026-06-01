import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION — Desktop + Mobile menu with all sections
   ═══════════════════════════════════════════════════════════════ */

interface NavSection {
  label: string;
  href: string;
  description?: string;
}

/*─── Las 12 secciones en orden de aparicion en la pagina ───*/
const ALL_SECTIONS: NavSection[] = [
  { label: 'Inicio', href: '#hero', description: 'Hero principal' },
  { label: 'El evento líder de mantenimiento', href: '#about', description: 'Sobre TEMACON 2026' },
  { label: 'Flujo de Mantenimiento Inteligente', href: '#flujo', description: 'Sistema en vivo de 6 pasos' },
  { label: 'Marcas Confirmadas', href: '#brands', description: 'Patrocinadores del evento' },
  { label: 'Perfil del asistente', href: '#audience', description: '12 perfiles profesionales' },
  { label: 'Kenworth Experience', href: '#tractocamion', description: 'Exploración 3D T800' },
  { label: 'TRACKS', href: '#tracks', description: '7 pistas especializadas' },
  { label: 'Speakers', href: '#speakers', description: 'Conferencistas confirmados' },
  { label: 'Lo que dicen', href: '#testimonials', description: 'Testimonios de lideres' },
  { label: 'Agenda', href: '#agenda', description: 'Programa de 2 días' },
  { label: 'Sede', href: '#venue', description: 'Bogota, Colombia' },
  { label: 'Regístrate', href: '#pricing', description: 'Adquiere tu ingreso' },
];

export default function Navigation() {
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
        className={`fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 flex items-center transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="wrapper flex items-center justify-between w-full px-4 sm:px-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 z-10">
            <img
              src="/logo-v2.png"
              alt="TEMACON"
              className={`h-8 sm:h-10 lg:h-14 w-auto object-contain transition-all duration-300 ${
                logoDark ? 'brightness-0' : 'brightness-100'
              }`}
            />
          </a>

          {/* Desktop Nav — 5 links clave */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
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
              3D Experience
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#E31E24] rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#agenda" className={`relative group text-sm font-medium transition-colors ${logoDark ? 'text-black hover:text-[#E31E24]' : 'text-white hover:text-[#E31E24]'}`}>
              Agenda
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#E31E24] rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#pricing"
              className="bg-[#E31E24] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-black hover:text-white transition-all duration-300"
            >
              Adquirir Ingreso Ahora
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              logoDark ? 'text-black' : 'text-white'
            }`}
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
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-[85vw] max-w-[360px] bg-[#0a0a0a] shadow-2xl transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header — compacto */}
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

          {/* Content — 12 secciones en orden */}
          <div className="overflow-y-auto flex-1">
            {/* Counter header */}
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
                  className="flex items-center gap-3 px-2 py-[6px] rounded-lg hover:bg-white/5 transition-colors group"
                  onClick={() => setMobileOpen(false)}
                >
                  {/* Section number */}
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

          {/* CTA — siempre visible abajo */}
          <div className="px-3 py-3 border-t border-white/10 bg-[#0a0a0a]">
            <a
              href="#pricing"
              className="flex items-center justify-center gap-2 bg-[#E31E24] text-white py-3 rounded-xl font-display font-semibold text-sm hover:bg-white hover:text-[#E31E24] transition-all"
              onClick={() => setMobileOpen(false)}
            >
              Adquirir Ingreso Ahora
            </a>
            <p className="font-mono text-[8px] text-white/30 text-center mt-2">
              $400,000 COP · 1-2 Sept 2026 · Bogotá
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
