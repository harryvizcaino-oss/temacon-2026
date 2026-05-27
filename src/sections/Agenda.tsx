import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Calendar, Clock, Coffee, Utensils, Users, Mic, Presentation, Network, Award,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   AGENDA TEMACON 2026
   ═══════════════════════════════════════════════════════════════ */

interface AgendaItem {
  time: string;
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  track?: string;
  highlight?: boolean;
}

interface DayData {
  day: string;
  date: string;
  items: AgendaItem[];
}

const DAYS: DayData[] = [
  {
    day: 'Dia 1',
    date: '1 de Septiembre',
    items: [
      { time: '07:30', title: 'Registro y Bienvenida', icon: Users, highlight: true },
      { time: '08:30', title: 'Keynote: El Futuro del Transporte de Carga', icon: Mic, highlight: true },
      { time: '10:00', title: 'Coffee Break', icon: Coffee },
      { time: '10:30', title: 'Track Tecnologia: IoT y Telematica Avanzada', icon: Presentation, track: 'TECNOLOGIA' },
      { time: '10:30', title: 'Track Mantenimiento: Predictivo con IA', icon: Presentation, track: 'MANTENIMIENTO' },
      { time: '12:30', title: 'Almuerzo de Networking', icon: Utensils },
      { time: '14:00', title: 'Panel: Confiabilidad Vehicular en Flotas Latinas', icon: Mic, highlight: true },
      { time: '15:30', title: 'Demo: Exploracion 3D del Tractocamion', icon: Presentation, track: 'TECNOLOGIA' },
      { time: '16:30', title: 'Coffee Break', icon: Coffee },
      { time: '17:00', title: 'Networking: Encuentro de Aliados', icon: Network, highlight: true },
    ],
  },
  {
    day: 'Dia 2',
    date: '2 de Septiembre',
    items: [
      { time: '08:00', title: 'Recorrido por el Centro de Control', icon: Presentation, track: 'TECNOLOGIA' },
      { time: '09:00', title: 'Keynote: Transformacion Digital en el Transporte', icon: Mic, highlight: true },
      { time: '10:30', title: 'Coffee Break', icon: Coffee },
      { time: '11:00', title: 'Track Confiabilidad: RCM para Camiones', icon: Presentation, track: 'CONFIABILIDAD' },
      { time: '11:00', title: 'Track Tecnologia: Plataformas de Gestion de Flota', icon: Presentation, track: 'TECNOLOGIA' },
      { time: '12:30', title: 'Almuerzo de Clausura', icon: Utensils },
      { time: '14:00', title: 'Workshop: Implementando IoT en tu Flota', icon: Presentation, track: 'TECNOLOGIA' },
      { time: '15:30', title: 'Panel: Casos de Exito 2025-2026', icon: Mic, highlight: true },
      { time: '16:30', title: 'Ceremonia de Clausura y Certificados', icon: Award, highlight: true },
      { time: '17:30', title: 'Cocktail de Networking', icon: Network },
    ],
  },
];

const TRACK_COLORS: Record<string, string> = {
  'TECNOLOGIA': '#E31E24',
  'MANTENIMIENTO': '#FF6B35',
  'CONFIABILIDAD': '#4ECDC4',
};

export default function Agenda() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 40, duration: 0.8, ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const currentDay = DAYS[activeDay];

  return (
    <section
      id="agenda"
      ref={sectionRef}
      className="relative bg-black overflow-hidden"
      style={{ paddingTop: 80, paddingBottom: 80 }}
    >
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(227,30,36,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(227,30,36,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 wrapper px-5">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Calendar size={16} className="text-[#E31E24]" />
            <p className="font-mono text-[10px] tracking-[0.4em] text-[#E31E24] uppercase">Programa del Evento</p>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Agenda <span className="text-[#E31E24]">TEMACON 2026</span>
          </h2>
          <p className="mt-3 text-sm text-white/40 max-w-lg mx-auto">
            Dos dias de contenido intensivo. Tracks paralelos, keynotes internacionales y networking de alto nivel.
          </p>
        </div>

        {/* Day Toggle */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {DAYS.map((d, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`px-6 py-3 rounded-full font-mono text-xs tracking-wider transition-all duration-300 ${
                i === activeDay
                  ? 'bg-[#E31E24] text-white shadow-lg shadow-[#E31E24]/20'
                  : 'bg-white/5 text-white/40 border border-white/10 hover:border-[#E31E24]/30 hover:text-white/70'
              }`}
            >
              {d.day} — {d.date}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-[700px] mx-auto">
          {currentDay.items.map((item, i) => {
            const Icon = item.icon;
            const trackColor = item.track ? TRACK_COLORS[item.track] : undefined;

            return (
              <div
                key={`${activeDay}-${i}`}
                className={`flex items-start gap-4 sm:gap-6 pb-6 relative ${
                  i < currentDay.items.length - 1 ? 'border-l border-white/10 ml-6 sm:ml-8 pl-0' : 'ml-6 sm:ml-8'
                }`}
              >
                {/* Time dot */}
                <div className={`absolute -left-3 sm:-left-4 top-0 w-6 h-6 rounded-full flex items-center justify-center ${
                  item.highlight
                    ? 'bg-[#E31E24] shadow-lg shadow-[#E31E24]/30'
                    : trackColor
                      ? 'bg-white/10 border border-white/20'
                      : 'bg-white/5 border border-white/10'
                }`}>
                  <Icon size={12} className={item.highlight ? 'text-white' : 'text-white/40'} />
                </div>

                {/* Time */}
                <div className="flex-shrink-0 w-14 sm:w-16 text-right pt-0.5">
                  <span className="font-mono text-xs text-white/50">{item.time}</span>
                </div>

                {/* Content */}
                <div className={`flex-1 bg-white/[0.03] border rounded-xl px-4 py-3 sm:px-5 sm:py-4 ${
                  item.highlight
                    ? 'border-[#E31E24]/20 hover:border-[#E31E24]/40'
                    : 'border-white/[0.06] hover:border-white/10'
                } transition-all duration-300 hover:bg-white/[0.05]`}>
                  <div className="flex items-center gap-2 mb-1">
                    {item.track && trackColor && (
                      <span
                        className="font-mono text-[8px] tracking-wider uppercase px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${trackColor}15`, color: trackColor }}
                      >
                        {item.track}
                      </span>
                    )}
                    {item.highlight && !item.track && (
                      <span className="font-mono text-[8px] text-[#E31E24] tracking-wider uppercase bg-[#E31E24]/10 px-2 py-0.5 rounded-full">
                        Principal
                      </span>
                    )}
                  </div>
                  <h3 className={`font-display text-sm sm:text-base leading-tight ${
                    item.highlight ? 'text-white' : 'text-white/70'
                  }`}>
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <a
            href="#register"
            className="inline-flex items-center gap-2 bg-[#E31E24] text-white px-8 py-4 rounded-full font-display text-base font-semibold hover:bg-white hover:text-[#E31E24] transition-all duration-300 shadow-lg shadow-[#E31E24]/20"
          >
            <Clock size={18} />
            Reserva tu lugar — Cupos limitados
          </a>
          <p className="mt-3 font-mono text-[10px] text-white/30">Programa sujeto a cambios menores</p>
        </div>
      </div>
    </section>
  );
}
