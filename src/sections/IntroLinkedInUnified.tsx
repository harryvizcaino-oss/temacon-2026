import { useRef, useState, useEffect, useCallback } from 'react';
import { Calendar, Linkedin, Users, MapPin, QrCode } from 'lucide-react';

const LINKEDIN_EVENT_URL = 'https://www.linkedin.com/events/temacon20267468427912283721730';

/* ═══════════════════════════════════════════════════════════════
   INTRO STATS — Contadores animados que funcionan SIEMPRE
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
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const duration = 1800;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [target]);

  return <>{value}{suffix}</>;
}

/* ═══════════════════════════════════════════════════════════════
   UNIFIED SECTION — Intro (3/5) + LinkedIn (2/5) on desktop
   ═══════════════════════════════════════════════════════════════ */

export default function IntroLinkedInUnified() {
  return (
    <section
      id="about"
      className="overflow-hidden"
      style={{ paddingTop: 0, paddingBottom: 0 }}
      data-nav-light
    >
      {/* Desktop: 2 columnas (3/5 negra + 2/5 azul) | Mobile: apiladas */}
      <div className="flex flex-col lg:flex-row">

        {/* ═══ IZQUIERDA: Intro (3/5) — FONDO NEGRO ═══ */}
        <div className="lg:w-3/5 bg-black flex flex-col justify-center" style={{ paddingTop: 36, paddingBottom: 36 }}>
          <div className="wrapper lg:pr-6 xl:pr-10">
            {/* Title */}
            <h2 className="font-display text-xl lg:text-2xl xl:text-3xl text-white leading-tight">
              El evento líder de Tecnología, Mantenimiento y Confiabilidad para el transporte de carga en Colombia
            </h2>

            {/* Description */}
            <p className="text-sm lg:text-base text-white/60 leading-relaxed mt-3 max-w-2xl">
              TEMACON 2026 reúne a profesionales del sector camionero para maximizar la confiabilidad de flotas,
              implementar mantenimiento predictivo y reducir el downtime.
            </p>

            {/* Stats — 2 filas de 3, números grandes */}
            <div className="grid grid-cols-3 gap-3 lg:gap-4 mt-6">
              {STATS.slice(0, 3).map((stat) => (
                <div key={stat.label} className="stat-item text-center">
                  <p className="font-display text-4xl lg:text-5xl text-[#E31E24]">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="font-mono text-[9px] text-white/50 uppercase tracking-wider mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3 lg:gap-4 mt-3">
              {STATS.slice(3).map((stat) => (
                <div key={stat.label} className="stat-item text-center">
                  <p className="font-display text-4xl lg:text-5xl text-[#E31E24]">
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

        {/* ═══ DERECHA: LinkedIn (2/5) — FONDO AZUL, centrado ═══ */}
        <div className="lg:w-2/5 mt-10 lg:mt-0 flex items-center justify-center" style={{ paddingTop: 36, paddingBottom: 36, backgroundColor: '#0a66c2' }}>
          <div className="wrapper lg:px-4 w-full max-w-[380px] mx-auto">
            <div
              id="linkedin-event"
              className="bg-white rounded-2xl p-5 xl:p-6 flex flex-col justify-center overflow-hidden"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}
            >
              {/* LinkedIn badge */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <Linkedin size={18} className="text-[#0a66c2]" />
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#0a66c2] uppercase font-bold">
                  Evento Oficial en LinkedIn
                </span>
              </div>

              {/* Title — NEGRILLA */}
              <h3 className="font-display text-xl xl:text-2xl text-temacon-black mb-2 text-center font-bold">
                TEMACON 2026 en LinkedIn
              </h3>

              <p className="text-temacon-charcoal/70 mb-4 text-center text-sm leading-relaxed">
                Confirma tu asistencia al evento oficial de TEMACON 2026 en LinkedIn.
                Recibe recordatorios automáticos y conecta con otros profesionales.
              </p>

              {/* Event details */}
              <div className="flex flex-col items-center gap-2 mb-5 text-sm text-temacon-charcoal/60">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar size={13} className="text-[#E31E24]" />
                  1-2 Septiembre 2026
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin size={13} className="text-[#E31E24]" />
                  Bogotá, Colombia
                </span>
                <span className="flex items-center gap-1.5 font-bold text-[#0a66c2]">
                  <Users size={13} />
                  +280 Tomadores de Decisión
                </span>
              </div>

              {/* CTA Confirmar */}
              <a
                href={LINKEDIN_EVENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0a66c2] text-white px-6 py-3 rounded-full font-display font-bold text-sm hover:bg-[#004182] transition-all duration-300"
              >
                <Linkedin size={16} />
                Confirmar Asistencia
              </a>

              {/* CTA Comprar Ticket — fondo blanco, borde azul, glow pulse */}
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0a66c2] border-[2.5px] border-[#0a66c2] px-6 py-3 rounded-full font-display font-bold text-sm hover:bg-[#0a66c2] hover:text-white transition-all duration-300 glow-pulse-linkedin mt-2.5"
              >
                <QrCode size={16} />
                Comprar Ticket
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
