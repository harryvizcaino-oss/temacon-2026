import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   PERFIL DEL ASISTENTE — 12 flip cards 3D con fotos reales
   Frente: Foto + nombre del perfil (color de fondo)
   Detrás: testimonial "por qué asistiría"
   Desktop: 6 cols (2 filas) | Mobile: 3 cols
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
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
      });
      gsap.from('.flip-card', {
        scrollTrigger: { trigger: gridRef.current, start: 'top 90%' },
        y: 50, opacity: 0, stagger: 0.06, duration: 0.5, ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

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
        <div ref={headerRef} className="text-center mb-6 sm:mb-8">
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
        <div
          ref={gridRef}
          className="grid grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5"
        >
          {PROFILES.map((profile) => (
            <div
              key={profile.role}
              className="flip-card group"
              style={{ perspective: '1000px' }}
            >
              <div
                className="relative w-full transition-transform duration-700 ease-out"
                style={{ transformStyle: 'preserve-3d' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'rotateY(180deg)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'rotateY(0deg)';
                }}
              >
                {/* ── FRONT: Foto + nombre ── */}
                <div
                  className="relative rounded-xl overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    minHeight: '220px',
                    backgroundColor: profile.bg,
                  }}
                >
                  {/* Photo */}
                  <div className="relative w-full aspect-square">
                    <img
                      src={profile.image}
                      alt={profile.role}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Gradient overlay at bottom */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-1/2"
                      style={{
                        background: `linear-gradient(to top, ${profile.bg}, transparent)`,
                      }}
                    />
                    {/* Role name at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3">
                      <h3
                        className="font-display text-[11px] sm:text-sm text-white font-bold leading-tight text-center"
                        style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
                      >
                        {profile.role}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* ── BACK: Testimonial ── */}
                <div
                  className="absolute inset-0 rounded-xl overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    backgroundColor: '#1a1a1a',
                    minHeight: '220px',
                  }}
                >
                  <div className="flex flex-col h-full p-3.5 sm:p-4">
                    <p className="text-white/90 text-[10px] sm:text-xs leading-relaxed flex-1 font-display">
                      &ldquo;{profile.text}&rdquo;
                    </p>
                    <div className="mt-2 pt-2 border-t border-white/10">
                      <p className="font-display text-[9px] sm:text-[10px] tracking-wider uppercase text-[#E31E24] font-bold">
                        {profile.role}
                      </p>
                    </div>
                  </div>
                  {/* Decorative corner */}
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
