import { useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Anchor } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   MARCAS CONFIRMADAS — Carrusel de Logos Enormes
   ═══════════════════════════════════════════════════════════════ */

interface BrandItem {
  name: string;
  logo: string;
}

const BRANDS: BrandItem[] = [
  { name: 'LogiMiles', logo: '/brands/logimiles.png' },
  { name: 'puntored', logo: '/brands/puntored.png' },
  { name: 'RPV-05', logo: '/brands/rpv-05.png' },
  { name: 'RPV-26', logo: '/brands/rpv-26.png' },
  { name: 'Volvo', logo: '' },
  { name: 'Kenworth', logo: '' },
  { name: 'Michelin', logo: '' },
  { name: 'Shell', logo: '' },
  { name: 'Bosch', logo: '' },
  { name: 'Continental', logo: '' },
  { name: 'Cummins', logo: '' },
  { name: 'WABCO', logo: '' },
  { name: 'ZF', logo: '' },
  { name: 'BPW', logo: '' },
  { name: 'Petrobras', logo: '' },
  { name: 'Haldex', logo: '' },
  { name: 'Hino', logo: '' },
  { name: 'Fleetboard', logo: '' },
  { name: 'Sascar', logo: '' },
  { name: 'TEMACON', logo: '/logo-v2.png' },
  { name: 'Maxion', logo: '' },
  { name: 'Randon', logo: '' },
  { name: 'Weg', logo: '' },
  { name: 'Dana', logo: '' },
  { name: 'Eaton', logo: '' },
  { name: 'Fleet Complete', logo: '' },
];

/* Single brand logo — large and visible */
function BrandLogo({ brand }: { brand: BrandItem }) {
  const hasLogo = brand.logo && brand.logo.length > 0;
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center bg-white rounded-xl border border-black/[0.06] hover:border-[#E31E24]/40 hover:shadow-[0_4px_24px_rgba(227,30,36,0.08)] transition-all duration-300"
      style={{ width: 220, height: 140 }}
    >
      {hasLogo ? (
        <img
          src={brand.logo}
          alt={brand.name}
          className="max-w-[75%] max-h-[60%] object-contain"
          loading="lazy"
        />
      ) : (
        <span className="font-display text-lg tracking-wider text-black/70 text-center px-4">
          {brand.name}
        </span>
      )}
    </div>
  );
}

/* Marquee row */
function LogoMarquee({ brands, reverse = false }: { brands: BrandItem[]; reverse?: boolean }) {
  const items = useMemo(() => [...brands, ...brands, ...brands], [brands]);

  return (
    <div className="relative w-full overflow-hidden py-3">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div
        className="flex items-center gap-5 w-max"
        style={{ animation: `marquee${reverse ? 'R' : 'L'} 50s linear infinite` }}
      >
        {items.map((brand, i) => (
          <BrandLogo key={`${brand.name}-${i}`} brand={brand} />
        ))}
      </div>

      <style>{`
        @keyframes marqueeL { 0% { transform: translateX(-33.333%); } 100% { transform: translateX(-66.666%); } }
        @keyframes marqueeR { 0% { transform: translateX(-66.666%); } 100% { transform: translateX(-33.333%); } }
      `}</style>
    </div>
  );
}

export default function Brands() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const mid = Math.ceil(BRANDS.length / 2);
  const row1 = BRANDS.slice(0, mid);
  const row2 = BRANDS.slice(mid);

  return (
    <section
      id="brands"
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      data-nav-light
      style={{ paddingTop: 80, paddingBottom: 80 }}
    >
      <div className="relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 px-5">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Anchor size={14} className="text-[#E31E24]" />
            <p className="font-mono text-[10px] tracking-[0.4em] text-[#E31E24] uppercase">
              Aliados Estrategicos
            </p>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-black tracking-tight">
            Marcas <span className="text-[#E31E24]">Confirmadas</span>
          </h2>
          <p className="mt-3 text-sm text-black/40 max-w-md mx-auto">
            24 marcas lideres respaldan TEMACON 2026.
          </p>
        </div>

        {/* Row 1 — left */}
        <LogoMarquee brands={row1} />
        {/* Row 2 — right */}
        <LogoMarquee brands={row2} reverse />

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <a
            href="https://wa.me/573113782522?text=Hola%20quisiera%20ser%20patrocinador%20en%20TEMACON%202026"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-[#E31E24]/20 text-[#E31E24] px-8 py-3.5 rounded-full font-mono text-xs tracking-wider hover:bg-[#E31E24] hover:text-white hover:border-[#E31E24] transition-all duration-300"
          >
            Conviertete en Patrocinador
          </a>
          <a
            href="/temacon-portafolio-vinculacion.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#E31E24] text-white px-8 py-3.5 rounded-full font-mono text-xs tracking-wider hover:bg-white hover:text-[#E31E24] transition-all duration-300 shadow-lg shadow-[#E31E24]/20"
          >
            Conoce todas las opciones de vinculacion Aqui
          </a>
        </div>
      </div>
    </section>
  );
}
