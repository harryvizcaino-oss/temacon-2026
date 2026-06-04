import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════
   "YO ASISTO PORQUE..." — 12 frases basadas
   en los perfiles de asistentes de TEMACON 2026
   ═══════════════════════════════════════════ */

const TESTIMONIALS = [
  {
    profile: 'Gerente de Mantenimiento',
    text: 'Necesito optimizar el CPK de mi flota, voy a buscar que tecnologias hay para eso.',
  },
  {
    profile: 'Jefe de Compras',
    text: 'Voy a conocer los proveedores de tecnología para camiones más importantes del país. Comparar soluciones en un solo lugar me ahorra meses de investigación.',
  },
  {
    profile: 'Jefe de Taller',
    text: 'Quiero llevarme herramientas de diagnóstico electrónico que me hagan el trabajo más eficiente. Mi equipo necesita capacitarse en las últimas técnicas de reparación.',
  },
  {
    profile: 'Coordinador de Activos',
    text: 'Mi objetivo es extender la vida útil de cada vehículo. Necesito aprender de flotas que ya gestionan sus activos con confiabilidad y datos en tiempo real.',
  },
  {
    profile: 'Técnico Especializado',
    text: 'La capacitación constante es mi prioridad. Quiero dominar los nuevos sistemas de diagnóstico electrónico y telemática que están transformando el sector.',
  },
  {
    profile: 'Jefe de Flota',
    text: 'Busco tecnología de telemática avanzada que me dé visibilidad total de mis vehículos. Reducir costos de combustible y mejorar la seguridad son mis metas.',
  },
  {
    profile: 'Director de Productividad',
    text: 'El dueño me pide más viajes con los mismos camiones. Necesito saber cómo sacarle más rendimiento a la flota sin que vivan parados en el taller.',
  },
  {
    profile: 'Jefe de Tecnología',
    text: 'Me pidieron digitalizar el mantenimiento y compras, y no sé por dónde empezar. IA, softwares de mantenimiento, GPS.. quiero ver qué hacen otras empresas.',
  },
  {
    profile: 'Gerente de Operaciones',
    text: 'Los conductores me reportan fallas en carretera y pierdo horas esperando la grúa o que el de mantenimiento resuelva! Necesito capacitarme mas para preveer estos temas.',
  },
  {
    profile: 'Jefe de Mejora Continua',
    text: 'Voy a buscar que soluciones nuevas hay en el mercado para evaluar como implementarlas en la empresa y optimizar procesos y costos!',
  },
  {
    profile: 'Coordinador de Abastecimiento',
    text: 'La cadena de suministro de repuestos para camiones es compleja. Necesito conocer proveedores confiables y estrategias de abastecimiento que reduzcan tiempos de espera.',
  },
  {
    profile: 'Líder de Transformación Digital',
    text: 'La competencia ya está usando IA para predecir fallas y nosotros seguimos con el mantenimiento en EXCEL. Necesito entender qué tecnología es viable para una flota mediana en Colombia.',
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
    <section id="testimonials" ref={sectionRef} className="bg-temacon-offwhite py-10 lg:py-16" data-nav-light>
      <div className="wrapper">
        <h2
          ref={titleRef}
          className="font-display text-t2 text-temacon-black text-center mb-3"
        >
          ¿Por qué asistir?
        </h2>
        <p className="font-mono text-[10px] tracking-[0.3em] text-[#E31E24] uppercase text-center mb-10 lg:mb-14">
          + de 12 razones por perfil para asistir
        </p>

        <div className="max-w-4xl mx-auto">
          {/* Quote icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#E31E24] rounded-full flex items-center justify-center">
              <Quote size={28} className="text-white" />
            </div>
          </div>

          {/* Testimonial text — fixed height */}
          <div className="h-[140px] sm:h-[160px] lg:h-[180px] flex items-center justify-center overflow-hidden">
            <p className="font-display text-t4 lg:text-t3 text-temacon-black text-center leading-snug line-clamp-4 px-4">
              "<TypeWriter key={activeIndex} text={t.text} isActive={isVisible} speed={30} />"
            </p>
          </div>

          {/* Profile badge — debajo de la frase, más grande */}
          <div className="text-center mt-2 mb-2">
            <span className="inline-block font-display text-sm sm:text-base text-[#E31E24] bg-[#E31E24]/10 px-4 py-1.5 rounded-full">
              {t.profile}
            </span>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8 flex-wrap px-4">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 flex-shrink-0 ${
                  i === activeIndex ? 'bg-[#E31E24] w-6' : 'bg-temacon-charcoal/30 hover:bg-temacon-charcoal/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
