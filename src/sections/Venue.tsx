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
  hotel: 'Hilton Bogotá Corferias',
  hotelTime: '5 min caminando',
};

const INFO_CARDS = [
  { icon: MapPin, label: 'Dirección', value: VENUE.address, sub: VENUE.city },
  { icon: Calendar, label: 'Fechas', value: VENUE.dates, sub: '2026' },
  { icon: Clock, label: 'Horario', value: VENUE.hours, sub: 'Ambos días' },
  { icon: Plane, label: 'Aeropuerto', value: VENUE.airport, sub: VENUE.airportTime },
  { icon: Hotel, label: 'Hotel', value: VENUE.hotel, sub: VENUE.hotelTime },
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
      {/* Header — above the image */}
      <div className="text-center pt-12 pb-6">
        <p className="font-mono text-[10px] tracking-[0.4em] text-[#E31E24] uppercase mb-3">
          Centro de Operaciones
        </p>
        <h2 className="font-display text-4xl lg:text-5xl text-black tracking-tight">
          Sede <span className="text-[#E31E24]">TEMACON 2026</span>
        </h2>
        <p className="mt-3 text-sm text-black/50 max-w-md mx-auto">
          1-2 Septiembre 2026 · Bogotá, Colombia
        </p>
      </div>

      {/* ═══════════════════════════════════════════
         Venue Photo
         ═══════════════════════════════════════════ */}
      <div ref={photoRef} className="relative w-full h-[40vh] sm:h-[55vh] lg:h-[60vh]">
        {/* Photo */}
        <img
          src="/venue.jpg"
          alt="Cámara de Comercio de Bogotá Sede Salitre"
          className="w-full h-full object-cover"
        />

        {/* Gradient: mobile sutil, desktop fuerte */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:from-black sm:via-black/30 sm:to-transparent" />
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

        {/* Desktop only: Route info pill */}
        <div className="hidden sm:block absolute top-6 left-5 lg:top-8 lg:left-8">
          <div className="bg-black/70 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2 mb-1">
              <Navigation size={14} className="text-[#E31E24]" />
              <p className="font-mono text-[10px] text-white/50 tracking-wider uppercase">Desde Aeropuerto El Dorado</p>
            </div>
            <p className="font-mono text-[10px] text-white/70">hacia {VENUE.building}</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                <span className="text-[8px] font-bold text-black">G</span>
              </div>
              <span className="font-mono text-[9px] text-white/40">Google Street View · Paso 8 de 8</span>
            </div>
          </div>
        </div>

        {/* Desktop only: Venue name overlay */}
        <div className="hidden sm:block absolute bottom-6 left-5 lg:bottom-8 lg:left-8 max-w-md">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-[#E31E24] rounded-full animate-pulse" />
            <span className="font-mono text-[10px] text-[#E31E24] tracking-wider uppercase">Sede Oficial TEMACON 2026</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
            {VENUE.building}
          </h2>
          <p className="font-display text-lg sm:text-xl text-white/60 mt-1">
            {VENUE.name}
          </p>
          <div className="mt-3 flex items-center gap-2 text-white/40">
            <MapPin size={14} className="text-[#E31E24] flex-shrink-0" />
            <p className="font-mono text-[11px] sm:text-xs">{VENUE.address}, {VENUE.city}</p>
          </div>
        </div>

        {/* Desktop only: Step navigation */}
        <div className="hidden sm:block absolute bottom-6 right-5 lg:bottom-8 lg:right-8">
          <div className="bg-black/70 backdrop-blur-md border border-white/10 rounded-lg px-4 py-3">
            <p className="font-mono text-[10px] text-white/30 mb-2">Paso 8 de 8</p>
            <p className="font-display text-sm text-white">{VENUE.building}</p>
            <p className="font-mono text-[10px] text-white/50 mt-1">{VENUE.address}</p>
            <p className="font-mono text-[10px] text-white/50">{VENUE.city}</p>
            <div className="mt-3 flex items-center gap-2">
              <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-md font-mono text-[10px] text-white/60 transition-colors flex items-center gap-1">
                ← Paso anterior
              </button>
              <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-md font-mono text-[10px] text-white/60 transition-colors flex items-center gap-1">
                ↻ Reiniciar
              </button>
            </div>
          </div>
        </div>

        {/* Mobile only: badge sutil arriba */}
        <div className="sm:hidden absolute top-4 left-4 right-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#E31E24] rounded-full animate-pulse" />
            <span className="font-mono text-[9px] text-[#E31E24] tracking-wider uppercase">Sede Oficial</span>
          </div>
        </div>
      </div>

      {/* Mobile only: Venue info debajo de la foto */}
      <div className="sm:hidden bg-black px-5 py-6">
        <h2 className="font-display text-xl text-white leading-tight">
          {VENUE.building}
        </h2>
        <p className="font-display text-base text-white/60 mt-0.5">
          {VENUE.name}
        </p>
        <div className="mt-2 flex items-center gap-2 text-white/40">
          <MapPin size={12} className="text-[#E31E24] flex-shrink-0" />
          <p className="font-mono text-[10px]">{VENUE.address}, {VENUE.city}</p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
         Info Cards
         ═══════════════════════════════════════════ */}
      <div className="venue-cards-grid wrapper py-10 lg:py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
          {INFO_CARDS.map(({ icon: Icon, label, value, sub }) => (
            <div
              key={label}
              className="venue-card bg-white border border-black/[0.08] rounded-xl p-4 hover:border-[#E31E24]/40 hover:shadow-lg hover:shadow-[#E31E24]/5 transition-all group"
            >
              <div className="w-9 h-9 bg-[#E31E24]/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#E31E24]/20 transition-all">
                <Icon size={16} className="text-[#E31E24]" />
              </div>
              <p className="font-mono text-[8px] text-black/40 tracking-wider uppercase mb-1">{label}</p>
              <p className="text-sm text-black leading-tight">{value}</p>
              <p className="font-mono text-[9px] text-black/50 mt-1">{sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
         BOTTOM: Google Maps Route
         ═══════════════════════════════════════════ */}
      <div ref={mapRef} className="wrapper pb-16 lg:pb-24">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#E31E24] uppercase mb-1">Ruta Recomendada</p>
            <p className="font-display text-lg text-black">{VENUE.airport} → {VENUE.building}</p>
          </div>
          <a
            href="https://www.google.com/maps/dir/Aeropuerto+Internacional+El+Dorado,+Bogot%C3%A1/C%C3%A1mara+de+Comercio+de+Bogot%C3%A1,+Av.+El+Dorado+%2368D-35,+Bogot%C3%A1/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-[#E31E24] hover:bg-white text-white hover:text-[#E31E24] px-4 py-2.5 rounded-lg font-mono text-xs transition-all"
          >
            <ExternalLink size={14} />
            Abrir en Google Maps
          </a>
        </div>

        {/* Route Map Visual + CTA */}
        <div className="relative w-full rounded-xl overflow-hidden border border-black/[0.08] bg-white" style={{ height: 'clamp(300px, 40vh, 450px)' }}>
          {/* Background grid */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(rgba(227,30,36,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(227,30,36,0.4) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />

          {/* Route visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-lg px-8">
              {/* Route line */}
              <div className="relative flex items-center justify-between">
                {/* Line */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-black/10 rounded-full" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-[#E31E24] to-[#ff6b6b] rounded-full transition-all duration-1000" style={{ width: '100%' }} />

                {/* Point 1: Airport */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-10 h-10 bg-[#E31E24] rounded-full flex items-center justify-center border-4 border-white shadow-lg shadow-[#E31E24]/30">
                    <Plane size={16} className="text-white" />
                  </div>
                  <p className="font-mono text-[8px] text-black/50 mt-2 uppercase tracking-wider whitespace-nowrap">El Dorado</p>
                  <p className="font-mono text-[8px] text-black/30">BOG</p>
                </div>

                {/* Point 2: Av. El Dorado */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center border-2 border-black/10">
                    <Navigation size={12} className="text-white/60" />
                  </div>
                  <p className="font-mono text-[7px] text-black/40 mt-2 uppercase tracking-wider whitespace-nowrap">Av. El Dorado</p>
                </div>

                {/* Point 3: CCB */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-10 h-10 bg-[#E31E24] rounded-full flex items-center justify-center border-4 border-white shadow-lg shadow-[#E31E24]/40 animate-pulse">
                    <MapPin size={16} className="text-white" />
                  </div>
                  <p className="font-mono text-[8px] text-[#E31E24] mt-2 uppercase tracking-wider whitespace-nowrap">CCB Salitre</p>
                  <p className="font-mono text-[8px] text-black/30">Venue</p>
                </div>
              </div>

              {/* Distance + Time */}
              <div className="mt-10 flex items-center justify-center gap-6">
                <div className="text-center">
                  <p className="font-display text-2xl text-black">15 min</p>
                  <p className="font-mono text-[8px] text-black/40 uppercase tracking-wider">En taxi / Uber</p>
                </div>
                <div className="w-px h-8 bg-black/10" />
                <div className="text-center">
                  <p className="font-display text-2xl text-black">9.2 km</p>
                  <p className="font-mono text-[8px] text-black/40 uppercase tracking-wider">Distancia</p>
                </div>
                <div className="w-px h-8 bg-black/10" />
                <div className="text-center">
                  <p className="font-display text-2xl text-black">$15-20</p>
                  <p className="font-mono text-[8px] text-black/40 uppercase tracking-wider">USD aprox.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Corner brackets */}
          <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-[#E31E24]/40" />
          <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-[#E31E24]/40" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-[#E31E24]/40" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-[#E31E24]/30" />
        </div>

        {/* CTA Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <a
            href="https://www.google.com/maps/dir/Aeropuerto+Internacional+El+Dorado,+Bogot%C3%A1/C%C3%A1mara+de+Comercio+de+Bogot%C3%A1,+Av.+El+Dorado+%2368D-35,+Bogot%C3%A1/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#E31E24] hover:bg-white text-white hover:text-[#E31E24] px-6 py-3.5 rounded-lg font-mono text-sm transition-all"
          >
            <ExternalLink size={16} />
            Ver ruta en Google Maps
          </a>
          <a
            href="https://www.google.com/maps/place/C%C3%A1mara+de+Comercio+de+Bogot%C3%A1/@4.6483,-74.1093,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-black/10 text-white/70 hover:text-white px-6 py-3.5 rounded-lg font-mono text-sm border border-white/10 transition-all"
          >
            <MapPin size={16} />
            Ver en Street View
          </a>
        </div>
      </div>
    </section>
  );
}
