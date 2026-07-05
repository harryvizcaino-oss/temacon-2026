import {
  MapPin, Calendar, Clock, Plane, Hotel, Navigation,
} from 'lucide-react';

/* ═══════════════════════════════════════════
   VENUE — Cámara de Comercio Sede Salitre
   ═══════════════════════════════════════════ */
const VENUE = {
  name: 'Auditorio Principal',
  building: 'Cámara de Comercio de Bogotá',
  address: 'Av. El Dorado No. 68D-35, Sede Salitre',
  city: 'Bogotá, Colombia',
  dates: '1-2 de Septiembre, 2026',
  hours: '8:00 AM - 6:00 PM',
  airport: 'Aeropuerto El Dorado (BOG)',
  airportTime: '15 min en taxi',
  hotel: 'GHL Hotel Capital · 5 min',
  hotelTime: 'El más cercano caminando',
};

const INFO_CARDS = [
  { icon: MapPin, label: 'Dirección', value: VENUE.address, sub: VENUE.city },
  { icon: Calendar, label: 'Fechas', value: VENUE.dates, sub: '2026' },
  { icon: Clock, label: 'Horario', value: VENUE.hours, sub: 'Ambos días' },
  { icon: Plane, label: 'Aeropuerto', value: VENUE.airport, sub: VENUE.airportTime },
  { icon: Navigation, label: 'Ruta', value: '15 min desde aeropuerto', sub: '9.2 km · ~$15-20 USD en taxi/Uber' },
  { icon: Navigation, label: 'Transmilenio', value: 'Estación G12', sub: '3 min caminando' },
];

export default function Venue() {
  return (
    <section id="venue" className="relative bg-[#f2f2f2] overflow-hidden" data-nav-light>
      {/* ═══════════════════════════════════════════
         HEADER
         ═══════════════════════════════════════════ */}
      <div className="text-center pt-16 pb-8">
        <p className="font-mono text-[10px] tracking-[0.4em] text-[#E31E24] uppercase mb-3">
          Centro de Operaciones
        </p>
        <h2 className="font-display text-4xl lg:text-5xl text-black tracking-tight">
          Sede del evento
        </h2>
        <p className="font-mono text-xs tracking-[0.2em] text-[#E31E24] mt-2">
          #TEMACON2026
        </p>
      </div>

      {/* ═══════════════════════════════════════════
         MAIN CONTENT — 2 columns
         ═══════════════════════════════════════════ */}
      <div className="wrapper grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 pb-16 lg:pb-24">

        {/* ── COL 1: Venue Photo + overlay ── */}
        <div className="relative h-[28vh] sm:h-[45vh] lg:h-auto min-h-[280px] sm:min-h-[420px] lg:min-h-[560px] rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="/venue-salitre.jpg"
            alt="Cámara de Comercio de Bogotá Sede Salitre — TEMACON 2026"
            className="w-full h-full object-cover"
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

          {/* Top left badge */}
          <div className="absolute top-5 left-5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#E31E24] rounded-full animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#E31E24] uppercase">Sede Oficial</span>
            </div>
          </div>

          {/* Top right dates pill */}
          <div className="absolute top-5 right-5">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-4 py-2">
              <span className="font-mono text-[10px] text-white/70 tracking-wider">1-2 SEPT 2026 · BOGOTÁ</span>
            </div>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-6 left-5 right-5">
            <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight">{VENUE.building}</h3>
            <p className="font-display text-base sm:text-lg text-white/50 mt-1">{VENUE.name}</p>
            <div className="mt-2 flex items-center gap-2">
              <MapPin size={13} className="text-[#E31E24] flex-shrink-0" />
              <p className="font-mono text-[10px] sm:text-xs text-white/50">{VENUE.address}, {VENUE.city}</p>
            </div>
          </div>
        </div>

        {/* ── COL 2: Info cards + Hotels + CTAs ── */}
        <div className="flex flex-col gap-4 lg:gap-5">

          {/* Info Cards grid 3x2 — 3 cols en mobile */}
          <div className="venue-cards-grid">
            <div className="grid grid-cols-3 gap-2 lg:gap-3">
              {INFO_CARDS.map(({ icon: Icon, label, value, sub }) => (
                <div key={label} className="venue-card bg-white border border-black/[0.08] rounded-xl p-2.5 lg:p-3.5 hover:border-[#E31E24]/40 hover:shadow-lg hover:shadow-[#E31E24]/5 transition-all group">
                  <div className="w-7 h-7 lg:w-8 lg:h-8 bg-[#E31E24]/10 rounded-lg flex items-center justify-center mb-1.5 lg:mb-2 group-hover:bg-[#E31E24]/20 transition-all">
                    <Icon size={12} className="lg:w-3.5 lg:h-3.5 text-[#E31E24]" />
                  </div>
                  <p className="font-mono text-[6px] lg:text-[7px] text-black/40 tracking-wider uppercase mb-0.5">{label}</p>
                  <p className="text-[10px] lg:text-xs text-black leading-tight">{value}</p>
                  <p className="font-mono text-[6px] lg:text-[8px] text-black/50 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hotels — 3 cols en mobile */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Hotel size={14} className="text-[#E31E24]" />
              <p className="font-mono text-[9px] tracking-[0.3em] text-[#E31E24] uppercase">Alojamiento Cerca</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <a href="https://www.google.com/maps/place/GHL+Hotel+Capital+Bogot%C3%A1/" target="_blank" rel="noopener noreferrer" className="group bg-white border border-black/[0.08] rounded-xl p-2.5 hover:border-[#E31E24]/40 hover:shadow-lg hover:shadow-[#E31E24]/5 transition-all flex flex-col items-center text-center">
                <div className="w-8 h-8 bg-[#E31E24]/10 rounded-lg flex items-center justify-center mb-1.5 group-hover:bg-[#E31E24]/20 transition-all">
                  <Hotel size={14} className="text-[#E31E24]" />
                </div>
                <p className="font-display text-[10px] lg:text-sm text-black group-hover:text-[#E31E24] transition-colors leading-tight">GHL Capital</p>
                <span className="font-mono text-[7px] text-black/40 mt-0.5">5 min · 400m</span>
                <span className="font-mono text-[7px] bg-[#E31E24]/10 text-[#E31E24] px-1.5 py-0.5 rounded-full mt-1">★★★★</span>
              </a>
              <a href="https://www.google.com/maps/place/Bogota+Marriott+Hotel/" target="_blank" rel="noopener noreferrer" className="group bg-white border border-black/[0.08] rounded-xl p-2.5 hover:border-[#E31E24]/40 hover:shadow-lg hover:shadow-[#E31E24]/5 transition-all flex flex-col items-center text-center">
                <div className="w-8 h-8 bg-[#E31E24]/10 rounded-lg flex items-center justify-center mb-1.5 group-hover:bg-[#E31E24]/20 transition-all">
                  <Hotel size={14} className="text-[#E31E24]" />
                </div>
                <p className="font-display text-[10px] lg:text-sm text-black group-hover:text-[#E31E24] transition-colors leading-tight">Marriott</p>
                <span className="font-mono text-[7px] text-black/40 mt-0.5">6 min · 450m</span>
                <span className="font-mono text-[7px] bg-[#E31E24]/10 text-[#E31E24] px-1.5 py-0.5 rounded-full mt-1">★★★★★</span>
              </a>
              <a href="https://www.google.com/maps/place/Sheraton+Bogota+Hotel/" target="_blank" rel="noopener noreferrer" className="group bg-white border border-black/[0.08] rounded-xl p-2.5 hover:border-[#E31E24]/40 hover:shadow-lg hover:shadow-[#E31E24]/5 transition-all flex flex-col items-center text-center">
                <div className="w-8 h-8 bg-[#E31E24]/10 rounded-lg flex items-center justify-center mb-1.5 group-hover:bg-[#E31E24]/20 transition-all">
                  <Hotel size={14} className="text-[#E31E24]" />
                </div>
                <p className="font-display text-[10px] lg:text-sm text-black group-hover:text-[#E31E24] transition-colors leading-tight">Sheraton</p>
                <span className="font-mono text-[7px] text-black/40 mt-0.5">7 min · 550m</span>
                <span className="font-mono text-[7px] bg-[#E31E24]/10 text-[#E31E24] px-1.5 py-0.5 rounded-full mt-1">★★★★</span>
              </a>
            </div>
          </div>

          {/* CTA Hospedaje */}
          <a href="https://www.google.com/maps/search/hoteles+cerca+C%C3%A1mara+de+Comercio+de+Bogot%C3%A1+Av+El+Dorado/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#E31E24] hover:bg-[#c41a20] text-white py-3 rounded-lg font-mono text-xs transition-all">
            <Hotel size={14} />
            Ver hospedaje cerca
          </a>
        </div>
      </div>
    </section>
  );
}
