import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: '15+', label: 'Expertos Internacionales' },
  { value: '2', label: 'Días Intensivos' },
  { value: '400+', label: 'Profesionales del Sector' },
  { value: '10+', label: 'Talleres Prácticos' },
];

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <h2 ref={titleRef} className="font-display text-t2 text-temacon-black">
            El evento líder de Mantenimiento, Tecnología y Confiabilidad para el Transporte de Carga
          </h2>
          <p ref={descRef} className="text-base lg:text-lg text-temacon-charcoal leading-relaxed">
            TEMACON es el punto de encuentro para profesionales del transporte de carga 
            que buscan maximizar la confiabilidad de sus flotas, reducir el downtime y 
            optimizar la cadena de suministro. Únete a expertos internacionales, descubre 
            casos de éxito en gestión de activos rodantes y conecta con la comunidad técnica 
            más influyente de Latinoamérica.
          </p>
        </div>
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 mt-16 lg:mt-24">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-item text-center lg:text-left">
              <p className="font-display text-t2 text-temacon-black">{stat.value}</p>
              <p className="font-mono text-xs text-temacon-charcoal uppercase tracking-wider mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
