import { useRef, useState } from 'react';
import { Calendar, Linkedin, Users, MapPin } from 'lucide-react';

const LINKEDIN_EVENT_URL = 'https://www.linkedin.com/events/temacon20267468427912283721730';

/* ═══════════════════════════════════════════════════════════════
   INTRO STATS
   ═══════════════════════════════════════════════════════════════ */

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 2, suffix: '', label: 'Días Intensivos' },
  { value: 400, suffix: '+', label: 'Profesionales del Sector' },
  { value: 12, suffix: '', label: 'Conferencistas Especializados' },
  { value: 6, suffix: '', label: 'Tracks Especializados' },
  { value: 12, suffix: '+', label: 'Horas de Networking' },
  { value: 3, suffix: '', label: 'Keynotes Principales' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(0);
  const hasAnimated = useRef(false);

  useState(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const startTime = performance.now();
            const duration = 2000;

            const animate = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 4);
              const value = Math.floor(eased * target);
              setCurrent(value);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCurrent(target);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  });

  return (
    <span ref={ref}>
      {current}{suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   UNIFIED SECTION — Intro (2/3) + LinkedIn (1/3) on desktop
   Mobile: stacked vertically
   ═══════════════════════════════════════════════════════════════ */

export default function IntroLinkedInUnified() {
  return (
    <section
      id="about"
      className="overflow-hidden"
      style={{ paddingTop: 0, paddingBottom: 0 }}
      data-nav-light
    >
      {/* Desktop: 2 columnas (2/3 negra + 1/3 azul) | Mobile: apiladas */}
      <div className="flex flex-col lg:flex-row">

        {/* ═══ IZQUIERDA: Intro (2/3) — FONDO NEGRO ═══ */}
        <div className="lg:w-2/3 bg-black" style={{ paddingTop: 42, paddingBottom: 42 }}>
          <div className="wrapper lg:pr-8 xl:pr-12">
            {/* Title */}
            <h2 className="font-display text-t2 text-white leading-tight">
              El evento líder de Tecnología, Mantenimiento y Confiabilidad para Camiones y Flotas de Transporte de Carga en Colombia
            </h2>

            {/* Description */}
            <p className="text-base lg:text-lg text-white/60 leading-relaxed mt-4 lg:mt-5 max-w-3xl">
              TEMACON 2026 es el punto de encuentro para profesionales del sector camionero
              que buscan maximizar la confiabilidad de sus flotas, implementar mantenimiento predictivo,
              reducir el downtime y optimizar la cadena de suministro. Conecta con la comunidad técnica
              más influyente de Latinoamérica en tecnología para transporte de carga.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:gap-4 mt-6 lg:mt-8">
              {STATS.map((stat) => (
                <div key={stat.label} className="stat-item text-center">
                  <p className="font-display text-3xl lg:text-4xl text-[#E31E24]">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="font-mono text-[9px] text-white/50 uppercase tracking-wider mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ DERECHA: LinkedIn (1/3) — FONDO AZUL ═══ */}
        <div className="lg:w-1/3 mt-10 lg:mt-0" style={{ paddingTop: 42, paddingBottom: 42, backgroundColor: '#0a66c2' }}>
          <div className="wrapper lg:pl-0">
            <div
              id="linkedin-event"
              className="bg-white rounded-2xl p-5 xl:p-6 shadow-2xl h-full flex flex-col justify-center"
            >
              {/* LinkedIn badge */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <Linkedin size={18} className="text-[#0a66c2]" />
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#0a66c2] uppercase font-semibold">
                  Evento Oficial en LinkedIn
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-xl xl:text-2xl text-temacon-black mb-2 text-center">
                TEMACON 2026 en LinkedIn
              </h3>

              <p className="text-temacon-charcoal/70 mb-4 text-center text-sm leading-relaxed">
                Confirma tu asistencia al evento oficial de TEMACON 2026 en LinkedIn.
                Recibe recordatorios automáticos y conecta con otros profesionales.
              </p>

              {/* Event details */}
              <div className="flex flex-col items-center gap-2 mb-5 text-sm text-temacon-charcoal/60">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-[#E31E24]" />
                  1-2 Septiembre 2026
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-[#E31E24]" />
                  Bogotá, Colombia
                </span>
                <span className="flex items-center gap-1.5">
                  <Users size={13} className="text-[#E31E24]" />
                  400+ profesionales
                </span>
              </div>

              {/* CTA */}
              <a
                href={LINKEDIN_EVENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0a66c2] text-white px-6 py-3 rounded-full font-display font-bold text-sm hover:bg-[#004182] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Linkedin size={16} />
                Confirmar Asistencia
              </a>

              <p className="font-mono text-[8px] text-temacon-charcoal/40 mt-3 tracking-wider text-center">
                LinkedIn te enviará recordatorios automáticos
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
