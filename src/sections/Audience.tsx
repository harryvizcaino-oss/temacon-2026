import { useRef, useEffect, useState, useCallback } from 'react';
import { Users } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   PERFIL DEL ASISTENTE — 12 flip cards 3D con fotos reales
   Frente: Foto + nombre del perfil (color de fondo)
   Detrás: testimonial "por qué asistiría"
   Desktop: 6 cols (2 filas) | Mobile: 3 cols
   
   Efecto especial: al scrollear a la sección, 3 cards giran
   aleatoriamente durante 3 segundos y vuelven a su posición.
   ═══════════════════════════════════════════════════════════════ */

const PROFILES = [
  {
    role: 'Gerente de Mantenimiento',
    image: '/profiles/gerente-mantenimiento.jpg',
    bg: '#E31E24',
    text: 'Necesito optimizar el CPK de mi flota, voy a buscar qué tecnologías hay para eso.',
  },
  {
    role: 'Jefe de Compras',
    image: '/profiles/jefe-compras.jpg',
    bg: '#1B3A5C',
    text: 'Voy a conocer los proveedores de tecnología para camiones más importantes del país. Comparar soluciones en un solo lugar me ahorra meses de investigación.',
  },
  {
    role: 'Jefe de Taller',
    image: '/profiles/jefe-taller.jpg',
    bg: '#2D5A27',
    text: 'Quiero llevarme herramientas de diagnóstico electrónico que me hagan el trabajo más eficiente. Mi equipo necesita capacitarse en las últimas técnicas.',
  },
  {
    role: 'Coordinador de Activos',
    image: '/profiles/coordinador-activos.jpg',
    bg: '#6B3A2A',
    text: 'Mi objetivo es extender la vida útil de cada vehículo. Necesito aprender de flotas que ya gestionan sus activos con confiabilidad y datos en tiempo real.',
  },
  {
    role: 'Técnico Especializado',
    image: '/profiles/tecnico-especializado.jpg',
    bg: '#8B5A00',
    text: 'La capacitación constante es mi prioridad. Quiero dominar los nuevos sistemas de diagnóstico electrónico y telemática que están transformando el sector.',
  },
  {
    role: 'Jefe de Flota',
    image: '/profiles/jefe-flota.jpg',
    bg: '#4A306D',
    text: 'Busco tecnología de telemática avanzada que me dé visibilidad total de mis vehículos. Reducir costos de combustible y mejorar la seguridad son mis metas.',
  },
  {
    role: 'Director de Productividad',
    image: '/profiles/director-productividad.jpg',
    bg: '#0D4F5C',
    text: 'El dueño me pide más viajes con los mismos camiones. Necesito saber cómo sacarle más rendimiento a la flota sin que vivan parados en el taller.',
  },
  {
    role: 'Jefe de Tecnología',
    image: '/profiles/jefe-tecnologia.jpg',
    bg: '#7D1D2D',
    text: 'Me pidieron digitalizar el mantenimiento y no sé por dónde empezar. IA, softwares, GPS... quiero ver qué hacen otras empresas.',
  },
  {
    role: 'Gerente de Operaciones',
    image: '/profiles/gerente-operaciones.jpg',
    bg: '#1D4D35',
    text: 'Los conductores me reportan fallas en carretera y pierdo horas esperando la grúa! Necesito capacitarme más para prever estos temas.',
  },
  {
    role: 'Jefe de Mejora Continua',
    image: '/profiles/jefe-mejora-continua.jpg',
    bg: '#C45C00',
    text: 'Voy a buscar qué soluciones nuevas hay en el mercado para evaluar cómo implementarlas en la empresa y optimizar procesos y costos.',
  },
  {
    role: 'Coordinador de Abastecimiento',
    image: '/profiles/coordinador-abastecimiento.jpg',
    bg: '#3A3A52',
    text: 'La cadena de suministro de repuestos para camiones es compleja. Necesito conocer proveedores confiables y estrategias que reduzcan tiempos de espera.',
  },
  {
    role: 'Líder de Transformación Digital',
    image: '/profiles/lider-transformacion-digital.jpg',
    bg: '#E31E24',
    text: 'La competencia ya usa IA para predecir fallas y nosotros seguimos con mantenimiento en EXCEL. Necesito entender qué tecnología es viable.',
  },
];

export default function Audience() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [autoFlipped, setAutoFlipped] = useState<number[]>([]);
  const hasTriggered = useRef(false);

  /* Auto-flip: cuando la sección entra al viewport, gira 3 cards aleatoriamente */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered.current) {
            hasTriggered.current = true;

            /* Seleccionar 3 índices aleatorios entre 0 y 11 */
            const indices = Array.from({ length: PROFILES.length }, (_, i) => i);
            const shuffled = indices.sort(() => Math.random() - 0.5);
            const selected = shuffled.slice(0, 3);

            setAutoFlipped(selected);

            /* Aplicar transform a las refs */
            selected.forEach((idx) => {
              const el = cardRefs.current[idx];
              if (el) el.style.transform = 'rotateY(180deg)';
            });

            /* Después de 3.5 segundos, devolver a posición original */
            setTimeout(() => {
              selected.forEach((idx) => {
                const el = cardRefs.current[idx];
                if (el) el.style.transform = 'rotateY(0deg)';
              });
              setAutoFlipped([]);
            }, 3500);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  /* Handlers para hover manual */
  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    if (!autoFlipped.includes(idx)) {
      (e.currentTarget as HTMLElement).style.transform = 'rotateY(180deg)';
    }
  }, [autoFlipped]);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    if (!autoFlipped.includes(idx)) {
      (e.currentTarget as HTMLElement).style.transform = 'rotateY(0deg)';
    }
  }, [autoFlipped]);

  return (
    <section
      id="audience"
      ref={sectionRef}
      className="relative bg-[#f2f2f2] overflow-hidden"
      data-nav-light
      style={{ paddingTop: 80, paddingBottom: 80 }}
    >
      <div className="relative z-10 wrapper px-4 sm:px-5">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Users size={16} className="text-[#E31E24]" />
            <p className="font-mono text-[10px] tracking-[0.4em] text-[#E31E24] uppercase">
              Networking de Alto Nivel
            </p>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-black tracking-tight">
            ¿Por qué debería <span className="text-[#E31E24] font-bold">asistir</span> cada <span className="text-[#E31E24] font-bold">Perfil</span>?
          </h2>
          <p className="mt-3 text-sm text-black/40 max-w-lg mx-auto">
            12 perfiles profesionales que tomarán decisiones en TEMACON 2026.
            <span className="block mt-1 text-[#E31E24]/60 font-mono text-[10px] tracking-wider uppercase">
              Pasa el mouse para descubrir por qué asisten
            </span>
          </p>
        </div>

        {/* Grid: 6 cols desktop (2 filas), 3 cols mobile */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
          {PROFILES.map((profile, idx) => (
            <div
              key={profile.role}
              className="group"
              style={{ perspective: '1000px' }}
            >
              <div
                ref={(el) => { cardRefs.current[idx] = el; }}
                className="relative w-full transition-transform duration-700 ease-out"
                style={{ transformStyle: 'preserve-3d' }}
                onMouseEnter={(e) => handleMouseEnter(e, idx)}
                onMouseLeave={(e) => handleMouseLeave(e, idx)}
              >
                {/* ── FRONT: Foto + nombre ── */}
                <div
                  className="relative rounded-xl overflow-hidden w-full"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    aspectRatio: '3/4',
                    backgroundColor: profile.bg,
                  }}
                >
                  <div className="relative w-full h-full">
                    <img
                      src={profile.image}
                      alt={profile.role}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 h-3/5"
                      style={{
                        background: `linear-gradient(to top, ${profile.bg} 10%, transparent)`,
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-2.5">
                      <h3
                        className="font-display text-[10px] sm:text-xs text-white font-bold leading-tight text-center"
                        style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
                      >
                        {profile.role}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* ── BACK: Testimonial ── */}
                <div
                  className="absolute inset-0 rounded-xl overflow-hidden w-full"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    backgroundColor: '#1a1a1a',
                    aspectRatio: '3/4',
                  }}
                >
                  <div className="flex flex-col h-full p-2.5 sm:p-3">
                    <p className="text-white/90 text-[9px] sm:text-[10px] leading-relaxed flex-1 font-display">
                      &ldquo;{profile.text}&rdquo;
                    </p>
                    <div className="mt-1.5 pt-1.5 border-t border-white/10">
                      <p className="font-display text-[8px] sm:text-[9px] tracking-wider uppercase text-[#E31E24] font-bold">
                        {profile.role}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-[#E31E24] rounded-full opacity-60" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ═══ Statement: decision makers ═══ */}
        <div className="mt-8 sm:mt-10 w-full max-w-[1100px] mx-auto px-4">
          <p className="font-display text-[19px] sm:text-[21px] lg:text-[24px] xl:text-[28px] text-black text-center leading-snug sm:leading-tight italic font-bold">
            El <span className="text-[#E31E24] not-italic font-bold">85%</span> de las veces, quienes deciden qué proveedor o marca contratar
          </p>
          <p className="font-display text-[19px] sm:text-[21px] lg:text-[24px] xl:text-[28px] text-black text-center leading-snug sm:leading-tight italic font-bold mt-1">
            son el área de <span className="text-[#E31E24] not-italic font-bold">mantenimiento</span>, <span className="text-[#E31E24] not-italic font-bold">compras</span> o <span className="text-[#E31E24] not-italic font-bold">tecnología</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
