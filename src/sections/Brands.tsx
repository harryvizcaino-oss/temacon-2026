import { useState } from 'react';
import { Anchor, X, ZoomIn } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   MARCAS CONFIRMADAS — Board fijo de 28 marcas clickeables
   Click en una marca abre modal con imagen ampliada
   ═══════════════════════════════════════════════════════════════ */

interface BrandItem {
  name: string;
  logo: string;
}

const BRANDS: BrandItem[] = [
  { name: 'LogiMiles', logo: '/brands/logimiles.png' },
  { name: 'Puntored', logo: '/brands/puntored.png' },
  { name: 'RPV-05', logo: '/brands/rpv-05.png' },
  { name: 'RPV-26', logo: '/brands/rpv-26.png' },
  { name: 'TEMACON', logo: '/logo-v2.png' },
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
  { name: 'Maxion', logo: '' },
  { name: 'Randon', logo: '' },
  { name: 'Weg', logo: '' },
  { name: 'Dana', logo: '' },
  { name: 'Eaton', logo: '' },
  { name: 'Fleet Complete', logo: '' },
  { name: 'Freightliner', logo: '' },
  { name: 'Meritor', logo: '' },
];

/* Single brand card — clickeable */
function BrandCard({ brand, onClick }: { brand: BrandItem; onClick: () => void }) {
  const hasLogo = brand.logo && brand.logo.length > 0;
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center rounded-xl border transition-all duration-300 overflow-hidden aspect-[3/2] w-full ${
        hasLogo
          ? 'bg-white border-black/[0.08] hover:border-[#E31E24]/50 hover:shadow-lg hover:shadow-[#E31E24]/10 active:scale-95 cursor-zoom-in'
          : 'bg-gray-100 border-black/[0.04] cursor-default'
      }`}
    >
      {hasLogo ? (
        <>
          <img
            src={brand.logo}
            alt={brand.name}
            className="max-w-[80%] max-h-[65%] object-contain"
            loading="lazy"
          />
          <div className="absolute top-1.5 right-1.5 opacity-0 hover:opacity-100 transition-opacity">
            <ZoomIn size={14} className="text-[#E31E24]" />
          </div>
        </>
      ) : (
        <>
          <span
            className="font-display text-xs sm:text-sm tracking-wider text-black/40 text-center px-2 select-none"
            style={{ filter: 'blur(3px)' }}
          >
            {brand.name}
          </span>
          <span className="absolute font-mono text-[7px] tracking-[0.2em] text-black/25 uppercase">
            Pronto
          </span>
        </>
      )}
    </button>
  );
}

/* Modal — muestra marca ampliada */
function BrandModal({ brand, onClose }: { brand: BrandItem | null; onClose: () => void }) {
  if (!brand) return null;
  const hasLogo = brand.logo && brand.logo.length > 0;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Content */}
      <div
        className="relative bg-white rounded-2xl p-6 sm:p-10 max-w-lg w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-black/5 transition-colors"
        >
          <X size={20} className="text-black/40" />
        </button>

        {/* Logo ampliado */}
        <div className="flex flex-col items-center">
          {hasLogo ? (
            <img
              src={brand.logo}
              alt={brand.name}
              className="max-w-full max-h-[200px] sm:max-h-[280px] object-contain"
            />
          ) : (
            <div className="flex flex-col items-center py-8">
              <span
                className="font-display text-2xl sm:text-3xl tracking-wider text-black/30 text-center"
                style={{ filter: 'blur(6px)' }}
              >
                {brand.name}
              </span>
              <span className="font-mono text-[10px] tracking-[0.3em] text-black/30 uppercase mt-2">
                Pronto
              </span>
            </div>
          )}
          <p className="mt-4 font-display text-lg text-black text-center">
            {brand.name}
          </p>
          <p className="font-mono text-[9px] text-black/40 tracking-wider uppercase">
            {hasLogo ? 'Aliado Confirmado' : 'Próximamente'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Brands() {
  const [selectedBrand, setSelectedBrand] = useState<BrandItem | null>(null);

  return (
    <section
      id="brands"
      className="relative bg-white overflow-hidden"
      data-nav-light
      style={{ paddingTop: 50, paddingBottom: 50, scrollMarginTop: 80 }}
    >
      <div className="relative z-10 wrapper px-4 sm:px-5">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
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
            {BRANDS.filter(b => b.logo).length} marcas líderes respaldan TEMACON 2026.
            <span className="block mt-1 text-black/30 font-mono text-[10px] tracking-wider">
              Haz clic en un logo para ampliar
            </span>
          </p>

          {/* CTAs */}
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
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

        {/* ═══ BOARD: Grid fijo de 28 marcas ═══ */}
        {/* Desktop: 7 cols x 4 rows | Tablet: 4 cols | Mobile: 3 cols */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3 lg:gap-4 max-w-6xl mx-auto">
          {BRANDS.map((brand) => (
            <BrandCard
              key={brand.name}
              brand={brand}
              onClick={() => {
                if (brand.logo) setSelectedBrand(brand);
              }}
            />
          ))}
        </div>
      </div>

      {/* Modal de ampliación */}
      {selectedBrand && (
        <BrandModal
          brand={selectedBrand}
          onClose={() => setSelectedBrand(null)}
        />
      )}
    </section>
  );
}
