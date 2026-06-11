import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MapPin, Calendar, Clock, Plane, Hotel, Navigation,
  ExternalLink,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(photoRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        y: 50, duration: 1, ease: 'power3.out',
      });
      gsap.from(mapRef.current, {
        scrollTrigger: { trigger: mapRef.current, start: 'top 85%' },
        y: 40, duration: 0.8, ease: 'power2.out',
      });
      gsap.from('.venue-card', {
        scrollTrigger: { trigger: '.venue-cards-grid', start: 'top 90%' },
        y: 30, stagger: 0.08, duration: 0.5, ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="venue" ref={sectionRef} className="relative bg-[#f2f2f2] overflow-hidden" data-nav-light>
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
      <div ref={photoRef} className="wrapper grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 pb-16 lg:pb-24">

        {/* ── COL 1: Venue Photo + overlay ── */}
        <div className="relative h-[45vh] sm:h-[55vh] lg:h-auto min-h-[420px] lg:min-h-[560px] rounded-2xl overflow-hidden shadow-2xl">
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
        <div ref={mapRef} className="flex flex-col gap-4 lg:gap-5">

          {/* Info Cards grid 2x3 */}
          <div className="venue-cards-grid">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 lg:gap-3">
              {INFO_CARDS.map(({ icon: Icon, label, value, sub }) => (
                <div key={label} className="venue-card bg-white border border-black/[0.08] rounded-xl p-3.5 hover:border-[#E31E24]/40 hover:shadow-lg hover:shadow-[#E31E24]/5 transition-all group">
                  <div className="w-8 h-8 bg-[#E31E24]/10 rounded-lg flex items-center justify-center mb-2 group-hover:bg-[#E31E24]/20 transition-all">
                    <Icon size={14} className="text-[#E31E24]" />
                  </div>
                  <p className="font-mono text-[7px] text-black/40 tracking-wider uppercase mb-0.5">{label}</p>
                  <p className="text-xs text-black leading-tight">{value}</p>
                  <p className="font-mono text-[8px] text-black/50 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hotels */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Hotel size={14} className="text-[#E31E24]" />
              <p className="font-mono text-[9px] tracking-[0.3em] text-[#E31E24] uppercase">Alojamiento Cerca</p>
            </div>
            <div className="space-y-2">
              <a href="https://www.google.com/maps/place/GHL+Hotel+Capital+Bogot%C3%A1/" target="_blank" rel="noopener noreferrer" className="group bg-white border border-black/[0.08] rounded-xl p-3.5 hover:border-[#E31E24]/40 hover:shadow-lg hover:shadow-[#E31E24]/5 transition-all flex items-center justify-between">
                <div>
                  <p className="font-display text-sm text-black group-hover:text-[#E31E24] transition-colors">GHL Hotel Capital</p>
                  <div className="flex items-center gap-1.5 text-black/40 mt-0.5">
                    <Navigation size={11} className="text-[#E31E24]" />
                    <span className="font-mono text-[9px]">5 min caminando · 400 m</span>
                  </div>
                </div>
                <span className="font-mono text-[9px] bg-[#E31E24]/10 text-[#E31E24] px-2 py-0.5 rounded-full flex-shrink-0">★★★★</span>
              </a>
              <a href="https://www.google.com/maps/place/Bogota+Marriott+Hotel/" target="_blank" rel="noopener noreferrer" className="group bg-white border border-black/[0.08] rounded-xl p-3.5 hover:border-[#E31E24]/40 hover:shadow-lg hover:shadow-[#E31E24]/5 transition-all flex items-center justify-between">
                <div>
                  <p className="font-display text-sm text-black group-hover:text-[#E31E24] transition-colors">Bogota Marriott Hotel</p>
                  <div className="flex items-center gap-1.5 text-black/40 mt-0.5">
                    <Navigation size={11} className="text-[#E31E24]" />
                    <span className="font-mono text-[9px]">6 min caminando · 450 m</span>
                  </div>
                </div>
                <span className="font-mono text-[9px] bg-[#E31E24]/10 text-[#E31E24] px-2 py-0.5 rounded-full flex-shrink-0">★★★★★</span>
              </a>
              <a href="https://www.google.com/maps/place/Sheraton+Bogota+Hotel/" target="_blank" rel="noopener noreferrer" className="group bg-white border border-black/[0.08] rounded-xl p-3.5 hover:border-[#E31E24]/40 hover:shadow-lg hover:shadow-[#E31E24]/5 transition-all flex items-center justify-between">
                <div>
                  <p className="font-display text-sm text-black group-hover:text-[#E31E24] transition-colors">Sheraton Bogotá Hotel</p>
                  <div className="flex items-center gap-1.5 text-black/40 mt-0.5">
                    <Navigation size={11} className="text-[#E31E24]" />
                    <span className="font-mono text-[9px]">7 min caminando · 550 m</span>
                  </div>
                </div>
                <span className="font-mono text-[9px] bg-[#E31E24]/10 text-[#E31E24] px-2 py-0.5 rounded-full flex-shrink-0">★★★★</span>
              </a>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-2">
            <a href="https://www.google.com/maps/search/hoteles+cerca+C%C3%A1mara+de+Comercio+de+Bogot%C3%A1+Av+El+Dorado/" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#E31E24] hover:bg-[#c41a20] text-white py-3 rounded-lg font-mono text-xs transition-all">
              <Hotel size={14} />
              Ver más hoteles
            </a>
            <a href="https://www.google.com/maps/dir/Aeropuerto+Internacional+El+Dorado,+Bogot%C3%A1/C%C3%A1mara+de+Comercio+de+Bogot%C3%A1,+Av.+El+Dorado+%2368D-35,+Bogot%C3%A1/" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-black/5 text-black/70 hover:text-black py-3 rounded-lg font-mono text-xs border border-black/10 transition-all">
              <ExternalLink size={14} />
              Ruta desde aeropuerto
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
