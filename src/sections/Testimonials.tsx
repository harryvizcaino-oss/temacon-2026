import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    name: 'Carlos Mendoza',
    role: 'Director de Flota',
    company: 'Transportes del Norte',
    text: 'Después de implementar el mantenimiento predictivo que aprendí en TEMACON, redujimos el downtime de nuestra flota en un 43%. El ROI fue evidente desde el primer trimestre.',
  },
  {
    name: 'Ana María López',
    role: 'Gerente de Logística',
    company: 'Carga Express Latam',
    text: 'La telemática avanzada y los sensores IoT para transporte de carga cambiaron completamente nuestra operación. Ahora predecimos fallas antes de que ocurran.',
  },
  {
    name: 'Roberto Fernández',
    role: 'Jefe de Mantenimiento',
    company: 'Flotas Pesadas MX',
    text: 'TEMACON nos dio las herramientas para extender la vida útil de nuestros activos rodantes. Nuestro MTBF mejoró un 38% en seis meses.',
  },
  {
    name: 'Patricia Ruiz',
    role: 'Directora de Operaciones',
    company: 'LogiTech Transport',
    text: 'La gestión de confiabilidad aplicada al transporte de carga es un game changer. TEMACON es el único evento que aborda estos temas con profundidad real.',
  },
];

function TypeWriter({ text, isActive, speed = 35 }: { text: string; isActive: boolean; speed?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!isActive) {
      setDisplayed('');
      return;
    }

    let index = 0;
    setDisplayed('');

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayed(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isActive, text, speed]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span>
      {displayed}
      {isActive && (
        <span className={`inline-block w-0.5 h-4 ml-0.5 bg-[#E31E24] align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
      )}
    </span>
  );
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => setIsVisible(true),
      });

      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [isVisible]);

  const t = TESTIMONIALS[activeIndex];

  return (
    <section ref={sectionRef} className="bg-temacon-offwhite page-padding">
      <div className="wrapper">
        <h2
          ref={titleRef}
          className="font-display text-t2 text-temacon-black text-center mb-12 lg:mb-16"
        >
          Lo que dicen los líderes del sector
        </h2>

        <div className="max-w-4xl mx-auto">
          {/* Quote icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#E31E24] rounded-full flex items-center justify-center">
              <Quote size={28} className="text-white" />
            </div>
          </div>

          {/* Testimonial text */}
          <div className="min-h-[120px] flex items-center justify-center">
            <p className="font-display text-t4 lg:text-t3 text-temacon-black text-center leading-snug">
              "<TypeWriter key={activeIndex} text={t.text} isActive={isVisible} speed={30} />"
            </p>
          </div>

          {/* Author */}
          <div className="mt-8 text-center">
            <p className="font-display text-lg text-temacon-black">{t.name}</p>
            <p className="font-mono text-xs text-temacon-charcoal uppercase tracking-wider mt-1">
              {t.role} — {t.company}
            </p>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'bg-[#E31E24] w-8' : 'bg-temacon-charcoal/30 hover:bg-temacon-charcoal/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
