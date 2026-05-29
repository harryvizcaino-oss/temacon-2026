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

const MAIN_SECTIONS: NavSection[] = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Tracks', href: '#tracks', description: '7 tracks especializados' },
  { label: 'Speakers', href: '#speakers', description: 'Conferencistas confirmados' },
  { label: 'Agenda', href: '#agenda', description: 'Programa de 2 dias' },
  { label: 'Marcas', href: '#brands', description: 'Patrocinadores' },
  { label: 'Lugar', href: '#venue', description: 'Bogota, Colombia' },
];

const EXP_SECTIONS: NavSection[] = [
  { label: 'Exploracion 3D', href: '#tractocamion', description: 'Kenworth T800 interactivo' },
  { label: 'Flujo de Mantenimiento', href: '#flujo', description: 'Sistema en vivo de 6 pasos' },
  { label: 'Perfil del Asistente', href: '#audience', description: '12 perfiles profesionales' },
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

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {MAIN_SECTIONS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`relative group text-sm font-medium transition-colors ${
                  logoDark
                    ? 'text-black hover:text-[#E31E24]'
                    : 'text-white hover:text-[#E31E24]'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#E31E24] rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
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

          {/* Content — compacto para que quepa el boton CTA */}
          <div className="overflow-y-auto flex-1">
            {/* Main sections */}
            <div className="px-3 pt-2 pb-1">
              <p className="font-mono text-[8px] text-[#E31E24] tracking-[0.3em] uppercase mb-1 px-2">
                Secciones Principales
              </p>
              <div className="space-y-0">
                {MAIN_SECTIONS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors group"
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-display text-sm group-hover:text-[#E31E24] transition-colors leading-tight">
                        {link.label}
                      </p>
                      {link.description && (
                        <p className="font-mono text-[8px] text-white/30 leading-tight">{link.description}</p>
                      )}
                    </div>
                    <ChevronRight size={14} className="text-white/20 group-hover:text-[#E31E24] transition-colors flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            <div className="mx-3 h-px bg-white/10 my-1" />

            {/* Experience sections */}
            <div className="px-3 py-1">
              <p className="font-mono text-[8px] text-[#E31E24] tracking-[0.3em] uppercase mb-1 px-2">
                Experiencias
              </p>
              <div className="space-y-0">
                {EXP_SECTIONS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors group"
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-display text-sm group-hover:text-[#E31E24] transition-colors leading-tight">
                        {link.label}
                      </p>
                      {link.description && (
                        <p className="font-mono text-[8px] text-white/30 leading-tight">{link.description}</p>
                      )}
                    </div>
                    <ChevronRight size={14} className="text-white/20 group-hover:text-[#E31E24] transition-colors flex-shrink-0" />
                  </a>
                ))}
              </div>
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
              $400,000 COP · 1-2 Sept 2026 · Bogota
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
