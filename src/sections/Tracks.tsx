import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TRACKS = [
  {
    id: 1,
    title: 'Confiabilidad de Flotas \u0026 Gestión de Activos Rodantes',
    description: 'RCM aplicado a transporte, análisis de fallos vehiculares, gestión del ciclo de vida de camiones y remolques, ISO 55000 para flotas. Maximiza el uptime de tu operación.',
    topics: ['RCM para Flotas', 'Análisis de Fallos Vehiculares', 'Gestión de Ciclo de Vida', 'ISO 55000 en Transporte'],
  },
  {
    id: 2,
    title: 'Telemática Avanzada \u0026 IoT Vehicular',
    description: 'GPS inteligente, sensores de monitoreo en tiempo real, plataformas de gestión de flotas, OBD-II avanzado. La conectividad que transforma el transporte.',
    topics: ['Telemática y GPS Avanzado', 'Sensores IoT para Camiones', 'OBD-II y Diagnóstico Remoto', 'Plataformas de Gestión de Flotas'],
  },
  {
    id: 3,
    title: 'Mantenimiento Predictivo \u0026 Inteligencia Artificial',
    description: 'Machine Learning para predicción de fallas, análisis de vibraciones en ejes y motores, monitoreo de temperatura de frenos, IA para optimización de rutas.',
    topics: ['ML para Predicción de Fallas', 'Análisis de Vibraciones', 'Monitoreo de Frenos', 'IA para Rutas'],
  },
  {
    id: 4,
    title: 'Eficiencia de Combustible \u0026 Sostenibilidad',
    description: 'Optimización del consumo de combustible, vehículos eléctricos e híbridos para carga, emisiones y compliance ambiental, economía circular en flotas.',
    topics: ['Optimización de Combustible', 'Vehículos Eléctricos de Carga', 'Compliance Ambiental', 'Huella de Carbono'],
  },
  {
    id: 5,
    title: 'Seguridad Vial \u0026 Gestión de Riesgos',
    description: 'Sistemas ADAS para camiones, gestión de conductores, seguridad en cadenas de suministro, normativas SCT y DOT. Protege tu flota y tu equipo.',
    topics: ['ADAS para Flotas', 'Gestión de Conductores', 'Normativas SCT/DOT', 'Seguridad en Rutas'],
  },
  {
    id: 6,
    title: 'Cadena de Suministro \u0026 Last Mile',
    description: 'Optimización de rutas de entrega, distribución urbana, gestión de almacenes (WMS), trazabilidad de carga. La última milla como ventaja competitiva.',
    topics: ['Optimización de Rutas', 'Distribución Urbana', 'WMS', 'Trazabilidad de Carga'],
  },
];

function TrackAccordion({ track, isOpen, onToggle }: { track: typeof TRACKS[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-temacon-charcoal/20">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between py-5 lg:py-6 px-4 lg:px-6 transition-colors duration-300 ${
          isOpen ? 'bg-[#E31E24] text-white' : 'bg-[#333333] hover:bg-[#555555]'
        }`}
      >
        <span className="font-display text-t5 lg:text-t4 text-white text-left">{track.title}</span>
        <ChevronDown size={28} className={`text-white transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-[#E31E24] px-4 lg:px-6 pb-6">
          <p className="text-base text-white/90 leading-relaxed max-w-3xl">{track.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {track.topics.map((topic) => (
              <span key={topic} className="bg-white text-temacon-black px-3 py-1.5 rounded-full text-xs font-mono">{topic}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Tracks() {
  const [openId, setOpenId] = useState<number | null>(1);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, { scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }, y: 40, opacity: 0, duration: 0.8, ease: 'power2.out' });
      if (listRef.current) {
        gsap.from(listRef.current.children, { scrollTrigger: { trigger: listRef.current, start: 'top 85%' }, y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="tracks" ref={sectionRef} className="bg-temacon-offwhite page-padding" data-nav-light>
      <div className="wrapper">
        <h2 ref={titleRef} className="font-display text-t2 text-temacon-black text-center mb-12 lg:mb-16">
          Tracks especializados para el Transporte de Carga
        </h2>
        <div ref={listRef} className="rounded-2xl overflow-hidden">
          {TRACKS.map((track) => (
            <TrackAccordion key={track.id} track={track} isOpen={openId === track.id} onToggle={() => setOpenId(openId === track.id ? null : track.id)} />
          ))}
        </div>
      </div>
    </section>
  );
}
