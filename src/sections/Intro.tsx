import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   INTRO — Stats with animated counters (count up from 0)
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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const startTime = performance.now();
            const duration = 2000; // 2 seconds

            const animate = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Easing: easeOutQuart — fast start, smooth landing
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
  }, [target]);

  return (
    <span ref={ref}>
      {current}{suffix}
    </span>
  );
}

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
      });
      gsap.from(descRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 30, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power2.out',
      });
      if (statsRef.current) {
        gsap.from(statsRef.current.querySelectorAll('.stat-item'), {
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
          y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="bg-temacon-softgray page-padding" data-nav-light>
      <div className="wrapper">
        {/* Row 1: Title — full width */}
        <h2 ref={titleRef} className="font-display text-t2 text-temacon-black leading-tight">
          El evento líder de Mantenimiento, Tecnología y Confiabilidad para el Transporte de Carga
        </h2>

        {/* Row 2: Description — full width */}
        <p ref={descRef} className="text-base lg:text-lg text-temacon-charcoal leading-relaxed mt-6 lg:mt-8 max-w-3xl">
          TEMACON es el punto de encuentro para profesionales del transporte de carga
          que buscan maximizar la confiabilidad de sus flotas, reducir el downtime y
          optimizar la cadena de suministro. Conecta con la comunidad técnica
          más influyente de Latinoamérica.
        </p>

        {/* Row 3: Stats — single horizontal row that expands */}
        <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 mt-12 lg:mt-16">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-item text-center">
              <p className="font-display text-3xl lg:text-4xl text-temacon-black">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="font-mono text-[9px] text-temacon-charcoal uppercase tracking-wider mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
