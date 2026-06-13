import { useMemo } from 'react';
import { Anchor } from 'lucide-react';

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

/* Single brand logo — blurred si aun no tiene logo */
function BrandLogo({ brand }: { brand: BrandItem }) {
  const hasLogo = brand.logo && brand.logo.length > 0;
  return (
    <div
      className={`flex items-center justify-center rounded-lg sm:rounded-xl border transition-all duration-300 relative overflow-hidden w-[110px] h-[70px] sm:w-48 sm:h-32 ${
        hasLogo
          ? 'bg-white border-black/[0.06] hover:border-[#E31E24]/40 hover:shadow-[0_4px_24px_rgba(227,30,36,0.08)]'
          : 'bg-gray-100 border-black/[0.03]'
      }`}
    >
      {hasLogo ? (
        <img
          src={brand.logo}
          alt={brand.name}
          className="max-w-[70%] max-h-[55%] object-contain"
          loading="lazy"
        />
      ) : (
        <>
          <span className="font-display text-xs sm:text-lg tracking-wider text-black/50 text-center px-2 sm:px-4 select-none" style={{ filter: 'blur(3px)' }}>
            {brand.name}
          </span>
          <span className="absolute font-mono text-[7px] sm:text-[8px] tracking-[0.2em] text-black/30 uppercase">Pronto</span>
        </>
      )}
    </div>
  );
}

/* Marquee row — desktop only. Mobile: static grid */
function LogoMarquee({ brands, reverse = false }: { brands: BrandItem[]; reverse?: boolean }) {
  const items = useMemo(() => [...brands, ...brands], [brands]);

  return (
    <div className="relative w-full overflow-hidden py-3">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div
        className="flex items-center gap-2 sm:gap-5 w-max"
        style={{ animation: `marquee${reverse ? 'R' : 'L'} 35s linear infinite` }}
      >
        {items.map((brand, i) => (
          <BrandLogo key={`${brand.name}-${i}`} brand={brand} />
        ))}
      </div>

      <style>{`
        @keyframes marqueeL { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes marqueeR { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
      `}</style>
    </div>
  );
}

export default function Brands() {
  const mid = Math.ceil(BRANDS.length / 2);
  const row1 = BRANDS.slice(0, mid);
  const row2 = BRANDS.slice(mid);

  return (
    <section
      id="brands"
      className="relative bg-white overflow-hidden"
      data-nav-light
      style={{ paddingTop: 50, paddingBottom: 50, scrollMarginTop: 80 }}
    >
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-10 px-5">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Anchor size={14} className="text-[#E31E24]" />
            <p className="font-mono text-[10px] tracking-[0.4em] text-[#E31E24] uppercase">
              Aliados Estratégicos
            </p>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-black tracking-tight">
            Marcas <span className="text-[#E31E24]">Confirmadas</span>
          </h2>
          <p className="mt-3 text-sm text-black/40 max-w-md mx-auto">
            Marcas líderes respaldan TEMACON 2026.
          </p>

          {/* CTAs — debajo del texto, antes del carrusel */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/573113782522?text=Hola%20quisiera%20ser%20patrocinador%20en%20TEMACON%202026"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-[#E31E24]/20 text-[#E31E24] px-6 py-2.5 rounded-full font-mono text-xs tracking-wider hover:bg-[#E31E24] hover:text-white hover:border-[#E31E24] transition-all duration-300"
            >
              Conviértete en Patrocinador
            </a>
            <a
              href="/temacon-portafolio-vinculacion.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E31E24] text-white px-6 py-2.5 rounded-full font-mono text-xs tracking-wider hover:bg-white hover:text-[#E31E24] transition-all duration-300 shadow-lg shadow-[#E31E24]/20"
            >
              Conoce todas las opciones de vinculación Aquí
            </a>
          </div>
        </div>

        {/* Row 1 — left */}
        <LogoMarquee brands={row1} />
        {/* Row 2 — right */}
        <LogoMarquee brands={row2} reverse />


      </div>
    </section>
  );
}
