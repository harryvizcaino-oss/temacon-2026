/**
 * StrategicPartners — Aliados Estratégicos y Organiza
 * Barra de confianza con logos de aliados y organizador.
 * Desktop: horizontal con línea divisoria. Mobile: apilado.
 */

export default function StrategicPartners() {
  return (
    <section className="bg-white py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0">

          {/* ALIADOS ESTRATÉGICOS */}
          <div className="flex-1 flex flex-col items-center lg:items-start lg:pr-12">
            <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.35em] text-black/60 uppercase mb-5 sm:mb-7 text-center lg:text-left">
              ALIADOS ESTRATÉGICOS:
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 lg:gap-10">
              {/* LOGYCA */}
              <div className="flex items-center justify-center">
                <img
                  src="/logo-logyca.png"
                  alt="LOGYCA"
                  className="h-8 sm:h-10 lg:h-11 w-auto object-contain"
                  loading="lazy"
                />
              </div>

              {/* FEDETRANSCARGA */}
              <div className="flex flex-col items-center sm:items-start">
                <svg viewBox="0 0 200 50" className="h-10 sm:h-12 lg:h-14 w-auto" aria-label="FEDETRANSCARGA">
                  {/* Camión estilizado */}
                  <path d="M5 35 L5 20 L25 20 L35 10 L55 10 L55 35 Z" fill="none" stroke="#1a365d" strokeWidth="2"/>
                  <circle cx="18" cy="38" r="5" fill="none" stroke="#1a365d" strokeWidth="2"/>
                  <circle cx="45" cy="38" r="5" fill="none" stroke="#1a365d" strokeWidth="2"/>
                  <line x1="58" y1="35" x2="70" y2="35" stroke="#1a365d" strokeWidth="2"/>
                  {/* FEDE */}
                  <text x="75" y="28" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="16" fill="#1a365d" letterSpacing="2">FEDE</text>
                  {/* T */}
                  <text x="125" y="28" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="16" fill="#E31E24" letterSpacing="2">T</text>
                  {/* RANSCARGA */}
                  <text x="135" y="28" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="16" fill="#1a365d" letterSpacing="1">RANSCARGA</text>
                </svg>
                <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.15em] text-black/50 uppercase mt-1 text-center sm:text-left leading-tight">
                  FEDERACIÓN DE EMPRESARIOS DEL TRANSPORTE DE CARGA
                </span>
              </div>

              {/* 10 años de historia */}
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 60 50" className="h-10 sm:h-12 lg:h-14 w-auto" aria-label="10 años">
                  {/* Bandera de Colombia */}
                  <rect x="8" y="5" width="12" height="20" rx="2" fill="#FFDD00"/>
                  <rect x="8" y="15" width="12" height="8" rx="0" fill="#003893"/>
                  <rect x="8" y="23" width="12" height="6" rx="0" fill="#CE1126"/>
                  {/* Número 10 */}
                  <text x="28" y="28" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="28" fill="#E31E24">10</text>
                  {/* Rayos */}
                  <line x1="48" y1="8" x2="52" y2="4" stroke="#E31E24" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="50" y1="12" x2="56" y2="10" stroke="#E31E24" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="48" y1="18" x2="54" y2="18" stroke="#E31E24" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="50" y1="24" x2="56" y2="26" stroke="#E31E24" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="48" y1="30" x2="52" y2="34" stroke="#E31E24" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="font-mono text-[10px] sm:text-xs tracking-wide text-black/70 whitespace-nowrap">
                  años de historia
                </span>
              </div>
            </div>
          </div>

          {/* Línea divisoria */}
          <div className="hidden lg:block w-px h-24 bg-black/10" />
          <div className="lg:hidden w-16 h-px bg-black/10" />

          {/* ORGANIZA */}
          <div className="flex-1 flex flex-col items-center lg:items-start lg:pl-12">
            <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.35em] text-black/60 uppercase mb-5 sm:mb-7 text-center lg:text-left">
              ORGANIZA:
            </p>

            {/* TIENDACAMION */}
            <div className="flex items-center">
              <svg viewBox="0 0 320 50" className="h-10 sm:h-11 lg:h-12 w-auto" aria-label="TIENDACAMION">
                {/* Rectángulo rojo TIENDA */}
                <rect x="0" y="5" width="155" height="40" rx="3" fill="#E31E24"/>
                {/* Camión icono */}
                <rect x="8" y="22" width="14" height="10" rx="1" fill="white"/>
                <circle cx="12" cy="34" r="3" fill="white"/>
                <circle cx="20" cy="34" r="3" fill="white"/>
                {/* TIENDA */}
                <text x="28" y="32" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="20" fill="white" letterSpacing="3">TIENDA</text>
                {/* CAMION */}
                <text x="165" y="32" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="20" fill="black" letterSpacing="2">CAMION</text>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
