import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Calendar, Clock, Coffee, Utensils, Users, Mic, Presentation, Network, Award, MoveHorizontal,
} from 'lucide-react';
import TeaserOverlay from '@/components/TeaserOverlay';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   AGENDA + SPEAKERS — Seccion unificada 2 columnas
   Col izq: Agenda con toggle Dia 1 / Dia 2
   Col der: Carrusel 3D de Speakers
   Separador rojo entre columnas
   ═══════════════════════════════════════════════════════════════ */

/*─── Agenda Data ───*/
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
    day: 'Día 1',
    date: '1 de Septiembre',
    items: [
      { time: '07:30', title: 'Registro y Bienvenida', icon: Users, highlight: true },
      { time: '08:30', title: 'Keynote: El Futuro del Transporte de Carga', icon: Mic, highlight: true },
      { time: '10:00', title: 'Coffee Break', icon: Coffee },
      { time: '10:30', title: 'Track Tecnología: IoT y Telemática Avanzada', icon: Presentation, track: 'TECNOLOGIA' },
      { time: '10:30', title: 'Track Mantenimiento: Predictivo con IA', icon: Presentation, track: 'MANTENIMIENTO' },
      { time: '12:30', title: 'Almuerzo de Networking', icon: Utensils },
      { time: '14:00', title: 'Panel: Confiabilidad Vehicular en Flotas Latinas', icon: Mic, highlight: true },
      { time: '15:30', title: 'Demo: Exploración 3D del Tractocamión', icon: Presentation, track: 'TECNOLOGIA' },
      { time: '16:30', title: 'Coffee Break', icon: Coffee },
      { time: '17:00', title: 'Networking: Encuentro de Aliados', icon: Network, highlight: true },
    ],
  },
  {
    day: 'Día 2',
    date: '2 de Septiembre',
    items: [
      { time: '08:00', title: 'Recorrido por el Centro de Control', icon: Presentation, track: 'TECNOLOGIA' },
      { time: '09:00', title: 'Keynote: Transformación Digital en el Transporte', icon: Mic, highlight: true },
      { time: '10:30', title: 'Coffee Break', icon: Coffee },
      { time: '11:00', title: 'Track Confiabilidad: RCM para Camiones', icon: Presentation, track: 'CONFIABILIDAD' },
      { time: '11:00', title: 'Track Tecnologia: Plataformas de Gestion de Flota', icon: Presentation, track: 'TECNOLOGIA' },
      { time: '12:30', title: 'Almuerzo de Clausura', icon: Utensils },
      { time: '14:00', title: 'Workshop: Implementando IoT en tu Flota', icon: Presentation, track: 'TECNOLOGIA' },
      { time: '15:30', title: 'Panel: Casos de Éxito 2025-2026', icon: Mic, highlight: true },
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

/*─── Speakers Data ───*/
interface Speaker {
  name: string;
  role: string;
  company: string;
  image: string;
  country: string;
  flag: string;
  track: 'TECNOLOGÍA' | 'MANTENIMIENTO' | 'CONFIABILIDAD';
}

const SPEAKERS: Speaker[] = [
  { name: 'Carlos Mendoza', role: 'Director de Flota', company: 'Transportes del Norte', image: '/speakers/speaker1.jpg', country: 'Colombia', flag: '🇨🇴', track: 'MANTENIMIENTO' },
  { name: 'Dra. Ana María López', role: 'Especialista en Telemática', company: 'Carga Express Latam', image: '/speakers/speaker2.jpg', country: 'México', flag: '🇲🇽', track: 'TECNOLOGÍA' },
  { name: 'Ing. Roberto Fernández', role: 'Consultor Senior en Confiabilidad', company: 'RCM Flotas MX', image: '/speakers/speaker3.jpg', country: 'México', flag: '🇲🇽', track: 'CONFIABILIDAD' },
  { name: 'Dra. Patricia Ruiz', role: 'Directora de Operaciones', company: 'LogiTech Transport', image: '/speakers/speaker4.jpg', country: 'Colombia', flag: '🇨🇴', track: 'TECNOLOGÍA' },
  { name: 'Ing. Diego Herrera', role: 'Gerente de Mantenimiento', company: 'Flotas Pesadas MX', image: '/speakers/speaker5.jpg', country: 'Chile', flag: '🇨🇱', track: 'MANTENIMIENTO' },
  { name: 'Luis García', role: 'Director de Flota', company: 'Global Logistics', image: '/speakers/speaker6.jpg', country: 'Perú', flag: '🇵🇪', track: 'CONFIABILIDAD' },
  { name: 'Dra. Elena Vargas', role: 'Directora de Logística', company: 'Transporte Inteligente SA', image: '/speakers/speaker7.jpg', country: 'Argentina', flag: '🇦🇷', track: 'TECNOLOGÍA' },
  { name: 'Ing. Miguel Torres', role: 'Especialista en Telemática', company: 'Global Truck Tech', image: '/speakers/speaker8.jpg', country: 'Brasil', flag: '🇧🇷', track: 'MANTENIMIENTO' },
];

const S_COUNT = SPEAKERS.length;
const S_ANGLE_STEP = 360 / S_COUNT;

const TRACK_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  'TECNOLOGÍA':    { bg: 'bg-[#E31E24]/15',  text: 'text-[#E31E24]', border: 'border-[#E31E24]/30' },
  'MANTENIMIENTO': { bg: 'bg-white/8',         text: 'text-white/70',   border: 'border-white/15' },
  'CONFIABILIDAD': { bg: 'bg-[#E31E24]/8',     text: 'text-[#ff6b6b]',  border: 'border-[#E31E24]/20' },
};

export default function AgendaSpeakers() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeDay, setActiveDay] = useState(0);

  /*─── Speakers 3D carousel refs & state ───*/
  const carouselRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, rotation: 0 });
  const rotationProxy = useRef({ value: 0 });
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const autoRotateRef = useRef<ReturnType<typeof gsap.to> | null>(null);

  /*─── Scroll entrance animation ───*/
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 50, opacity: 0, duration: 0.8, ease: 'power2.out',
      });
      gsap.from('.agenda-col', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        x: -40, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.2,
      });
      gsap.from('.speakers-col', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        x: 40, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.3,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /*─── Apply rotation to carousel ───*/
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `rotateY(${rotation}deg)`;
    }
  }, [rotation]);

  /*─── Auto-rotation when idle ───*/
  useEffect(() => {
    const startAutoRotate = () => {
      autoRotateRef.current = gsap.to(rotationProxy.current, {
        value: rotationProxy.current.value + 360,
        duration: 60, ease: 'none', repeat: -1,
        onUpdate: () => setRotation(rotationProxy.current.value),
      });
    };
    const timer = setTimeout(startAutoRotate, 3000);
    return () => { clearTimeout(timer); autoRotateRef.current?.kill(); };
  }, []);

  /*─── Drag handlers ───*/
  const handlePointerDown = useCallback((clientX: number) => {
    setIsDragging(true);
    autoRotateRef.current?.kill();
    dragStart.current = { x: clientX, rotation: rotationProxy.current.value };
    lastXRef.current = clientX;
    velocityRef.current = 0;
  }, []);

  const handlePointerMove = useCallback((clientX: number) => {
    if (!isDragging) return;
    const delta = clientX - dragStart.current.x;
    velocityRef.current = clientX - lastXRef.current;
    lastXRef.current = clientX;
    const newRotation = dragStart.current.rotation + delta * 0.3;
    rotationProxy.current.value = newRotation;
    setRotation(newRotation);
  }, [isDragging]);

  const snapToNearest = useCallback(() => {
    const target = Math.round(rotationProxy.current.value / S_ANGLE_STEP) * S_ANGLE_STEP;
    gsap.to(rotationProxy.current, {
      value: target, duration: 0.6, ease: 'power2.out',
      onUpdate: () => setRotation(rotationProxy.current.value),
    });
  }, []);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    const velocity = velocityRef.current;
    if (Math.abs(velocity) > 0.5) {
      gsap.to(rotationProxy.current, {
        value: rotationProxy.current.value + velocity * 10,
        duration: 0.8, ease: 'power2.out',
        onUpdate: () => setRotation(rotationProxy.current.value),
        onComplete: snapToNearest,
      });
    } else {
      snapToNearest();
    }
  }, [snapToNearest]);

  const currentDay = DAYS[activeDay];

  return (
    <section
      id="agenda-speakers"
      ref={sectionRef}
      className="relative bg-black overflow-hidden select-none"
      style={{ paddingTop: 64, paddingBottom: 64 }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: 'linear-gradient(rgba(227,30,36,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(227,30,36,0.4) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      <div className="relative z-10 wrapper px-5">
        {/* WRAPPER relative para que TeaserOverlay cubra header + grid completo */}
        <div className="relative">

          {/* TeaserOverlay — CAPA POR ENCIMA de toda la seccion */}
          <TeaserOverlay message="Agenda y Speakers" submessage="Muy pronto conoceras a los conferencistas y el programa completo del evento" />

          {/* ═══ HEADER: Agenda y Speakers ═══ */}
          <div ref={headerRef} className="text-center mb-8 lg:mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Calendar size={16} className="text-[#E31E24]" />
              <p className="font-mono text-[10px] tracking-[0.4em] text-[#E31E24] uppercase">
                Programa & Conferencistas
              </p>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Agenda y <span className="text-[#E31E24]">Speakers</span>
            </h2>
            <p className="mt-3 text-sm text-white/40 max-w-lg mx-auto">
              Dos días de contenido intensivo con los mejores conferencistas del sector.
            </p>
          </div>

          {/* ═══ 2 COLUMNAS ═══ */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0 items-start">

            {/* ── COL IZQ: Agenda ── */}
          <div className="agenda-col">
            {/* Day Toggle */}
            <div className="flex items-center justify-center gap-3 mb-6">
              {DAYS.map((d, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDay(i)}
                  className={`px-5 py-2.5 rounded-full font-mono text-xs tracking-wider transition-all duration-300 ${
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
            <div className="max-h-[560px] overflow-y-auto pr-2 scrollbar-thin">
              {currentDay.items.map((item, i) => {
                const Icon = item.icon;
                const trackColor = item.track ? TRACK_COLORS[item.track] : undefined;
                return (
                  <div key={`${activeDay}-${i}`} className={`flex items-start gap-3 pb-4 relative ${i < currentDay.items.length - 1 ? 'border-l border-white/10 ml-5 pl-0' : 'ml-5'}`}>
                    <div className={`absolute -left-2.5 top-0 w-5 h-5 rounded-full flex items-center justify-center ${item.highlight ? 'bg-[#E31E24] shadow-lg shadow-[#E31E24]/30' : trackColor ? 'bg-white/10 border border-white/20' : 'bg-white/5 border border-white/10'}`}>
                      <Icon size={10} className={item.highlight ? 'text-white' : 'text-white/40'} />
                    </div>
                    <div className="flex-shrink-0 w-12 text-right pt-0.5">
                      <span className="font-mono text-[10px] text-white/50">{item.time}</span>
                    </div>
                    <div className={`flex-1 bg-white/[0.03] border rounded-lg px-3 py-2.5 ${item.highlight ? 'border-[#E31E24]/20' : 'border-white/[0.06]'} transition-all`}>
                      {item.track && trackColor && (
                        <span className="font-mono text-[7px] tracking-wider uppercase px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${trackColor}15`, color: trackColor }}>
                          {item.track}
                        </span>
                      )}
                      <p className={`text-xs mt-1 ${item.highlight ? 'text-white font-semibold' : 'text-white/70'}`}>{item.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── SEPARADOR ROJO ── */}
          <div className="hidden lg:flex flex-col items-center justify-center px-6 self-stretch">
            <div className="w-px flex-1 bg-gradient-to-b from-transparent via-[#E31E24] to-transparent" />
          </div>

          {/* ── COL DER: Speakers 3D ── */}
          <div className="speakers-col flex flex-col items-center">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#E31E24] uppercase mb-4 text-center">
              12 Conferencistas Nacionales
            </p>

            {/* 3D Carousel */}
            <div
              className="relative w-full flex items-center justify-center"
              style={{ perspective: '1000px', height: '304px' }}
              onMouseDown={(e) => { e.preventDefault(); handlePointerDown(e.clientX); }}
              onMouseMove={(e) => handlePointerMove(e.clientX)}
              onMouseUp={() => handlePointerUp()}
              onMouseLeave={() => handlePointerUp()}
              onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
              onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
              onTouchEnd={() => handlePointerUp()}
            >
              <div className={`absolute inset-0 z-50 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`} />

              <div
                ref={carouselRef}
                className="relative"
                style={{ width: '220px', height: '240px', transformStyle: 'preserve-3d', transition: isDragging ? 'none' : undefined, margin: '0 auto' }}
              >
                {SPEAKERS.map((speaker, i) => {
                  const angle = i * S_ANGLE_STEP;
                  const radius = 320;
                  return (
                    <div
                      key={i}
                      className="absolute inset-0"
                      style={{
                        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                        backfaceVisibility: 'hidden',
                      }}
                    >
                      <div className={`w-full h-full rounded-xl overflow-hidden border ${TRACK_STYLES[speaker.track]?.border || 'border-white/10'} bg-black/60 backdrop-blur-sm`}>
                        <div className="relative w-full h-40">
                          <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover" loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                          <span className="absolute top-2 right-2 font-mono text-[9px] bg-black/60 text-white/80 px-2 py-0.5 rounded-full backdrop-blur-sm">{speaker.flag}</span>
                        </div>
                        <div className="p-3">
                          <p className="font-display text-sm text-white truncate">{speaker.name}</p>
                          <p className="font-mono text-[9px] text-white/50 mt-0.5">{speaker.role}</p>
                          <p className="font-mono text-[8px] text-white/30 truncate">{speaker.company}</p>
                          <span className={`inline-block mt-1.5 font-mono text-[7px] tracking-wider uppercase px-1.5 py-0.5 rounded-full ${TRACK_STYLES[speaker.track]?.bg} ${TRACK_STYLES[speaker.track]?.text}`}>
                            {speaker.track}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Drag hint */}
            <div className="flex items-center gap-2 mt-4 text-white/20">
              <MoveHorizontal size={14} />
              <span className="font-mono text-[9px] tracking-wider">Arrastra para explorar</span>
            </div>
          </div>
        </div>
        {/* Cierre del wrapper relative del TeaserOverlay */}
        </div>
      </div>
    </section>
  );
}
