import { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Linkedin, Users, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const LINKEDIN_EVENT_URL = 'https://www.linkedin.com/events/temacon20267468427912283721730';

function LinkedInEvent() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="linkedin-event"
      ref={sectionRef}
      className="bg-[#0a66c2] py-12 lg:py-16"
      data-nav-light
    >
      <div className="wrapper">
        <div
          ref={cardRef}
          className="max-w-3xl mx-auto bg-white rounded-2xl p-8 lg:p-10 shadow-2xl text-center"
        >
          {/* LinkedIn badge */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <Linkedin size={20} className="text-[#0a66c2]" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#0a66c2] uppercase font-semibold">
              Evento Oficial en LinkedIn
            </span>
          </div>

          {/* Title */}
          <h2 className="font-display text-t3 lg:text-t2 text-temacon-black mb-3">
            TEMACON 2026 en LinkedIn
          </h2>

          <p className="text-temacon-charcoal/70 mb-6 max-w-lg mx-auto">
            Confirma tu asistencia al evento oficial de TEMACON 2026 en LinkedIn.
            Recibe recordatorios automáticos y conecta con otros profesionales del
            sector transporte de carga antes del evento.
          </p>

          {/* Event details */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8 text-sm text-temacon-charcoal/60">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#E31E24]" />
              1-2 Septiembre 2026
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-[#E31E24]" />
              Bogotá, Colombia
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={14} className="text-[#E31E24]" />
              400+ profesionales
            </span>
          </div>

          {/* CTA */}
          <a
            href={LINKEDIN_EVENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0a66c2] text-white px-8 py-3.5 rounded-full font-display font-bold text-base hover:bg-[#004182] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Linkedin size={18} />
            Confirmar Asistencia en LinkedIn
          </a>

          <p className="font-mono text-[9px] text-temacon-charcoal/40 mt-4 tracking-wider">
            Al confirmar, LinkedIn te enviará recordatorios automáticos del evento
          </p>
        </div>
      </div>
    </section>
  );
}

export default memo(LinkedInEvent);
