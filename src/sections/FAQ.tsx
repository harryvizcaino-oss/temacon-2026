import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, HelpCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════
   FAQ — Preguntas Frecuentes con SEO
   Keywords: camiones, transporte, mantenimiento,
   tecnología, logística, flotas, Colombia
   ═══════════════════════════════════════════ */

const FAQS = [
  {
    q: '¿Qué es TEMACON 2026 y por qué es el evento más importante de tecnología para camiones en Colombia?',
    a: 'TEMACON 2026 es el evento líder de Latinoamérica dedicado a la tecnología, mantenimiento y confiabilidad para el transporte de carga. Reúne a más de 400 profesionales del sector camionero, 12 conferencistas internacionales y 24 marcas líderes en tecnología para flotas. Se realiza los días 1 y 2 de septiembre de 2026 en Bogotá, Colombia.',
  },
  {
    q: '¿Quién puede asistir al evento de mantenimiento predictivo para flotas de transporte?',
    a: 'TEMACON está dirigido a directores de flota, jefes de mantenimiento, ingenieros de confiabilidad, gerentes de logística, técnicos especializados en vehículos pesados, contratistas de transporte y cualquier profesional del sector camionero interesado en tecnología, mantenimiento predictivo y optimización de flotas.',
  },
  {
    q: '¿Cuánto cuesta la entrada al evento de tecnología para transporte de carga en Bogotá?',
    a: 'El precio general del evento es de $400,000 COP + IVA. Incluye acceso a los 2 días del evento, todas las conferencias, la muestra comercial, coffee breaks, almuerzo tipo BOX y certificado de participación digital.',
  },
  {
    q: '¿Qué temas se tratan en los tracks de mantenimiento y confiabilidad vehicular?',
    a: 'Los 7 tracks de TEMACON 2026 cubren: Telemática y Flotas Conectadas, Mantenimiento Predictivo con IA, Confiabilidad Vehicular y RCM, Gestión de Flotas y KPIs, Tecnología en Frenos y Suspensión, Diagnóstico Electrónico y SCR, y Gestión de Llantas y Eficiencia Energética. Cada track cuenta con conferencistas especializados de Colombia, México, Chile y Brasil.',
  },
  {
    q: '¿Dónde y cuándo se realiza el evento de logística y transporte de carga TEMACON 2026?',
    a: 'TEMACON 2026 se realiza los días 1 y 2 de septiembre de 2026 en Bogotá, Colombia. La sede es la Cámara de Comercio de Bogotá en la Avenida El Dorado. El horario de apertura es 8:00 AM y cierra a las 6:00 PM.',
  },
  {
    q: '¿Cómo puedo patrocinar el evento de tecnología para camiones más importante de Latinoamérica?',
    a: 'Para patrocinar TEMACON 2026, puedes contactarnos directamente por WhatsApp al +57 318 216 0678 o escribir a contacto@tiendacamion.com. Ofrecemos diferentes niveles de patrocinio con acceso a la muestra comercial, branding en materiales del evento y oportunidades de networking con directores de flota de las principales empresas de transporte de Colombia.',
  },
  {
    q: '¿Qué es el mantenimiento predictivo y cómo ayuda a reducir costos en flotas de camiones?',
    a: 'El mantenimiento predictivo es una estrategia que utiliza sensores IoT, telemática y análisis de datos para anticipar fallas antes de que ocurran. En TEMACON 2026 aprenderás cómo las flotas que implementan mantenimiento predictivo reducen en promedio un 30% sus costos operativos, disminuyen el downtime y extienden la vida útil de sus vehículos pesados.',
  },
  {
    q: '¿Cuáles son las tendencias de tecnología para el transporte de carga en 2026?',
    a: 'Las principales tendencias que se discuten en TEMACON incluyen: inteligencia artificial para mantenimiento predictivo, vehículos conectados con telemática avanzada, gestión de flotas en tiempo real, sistemas ADAS para camiones, economía circular en repuestos, combustibles alternativos, electrificación de flotas y normativas de emisiones para vehículos pesados en Colombia.',
  },
  {
    q: '¿Cómo me registro para el evento de transporte de carga TEMACON 2026?',
    a: 'Puedes registrarte directamente en esta página haciendo clic en el botón "Adquirir Ingreso Ahora". El proceso es simple: seleccionas tus tickets, completas tus datos y realizas el pago seguro. Una vez confirmada la compra, recibirás tu pase digital por correo electrónico.',
  },
  {
    q: '¿Qué marcas y empresas participan en la muestra comercial de tecnología para camiones?',
    a: 'La muestra comercial de TEMACON 2026 reúne a las marcas líderes del sector: proveedores de telemática y GPS, fabricantes de repuestos para camiones, empresas de software de gestión de flotas, proveedores de lubricantes, especialistas en frenos y suspensión, empresas de diagnóstico electrónico, y fabricantes de llantas para transporte pesado.',
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-item', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 30, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="relative bg-[#0a0a0a] overflow-hidden" data-nav-light>
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(227,30,36,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(227,30,36,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 wrapper py-16 lg:py-24">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <HelpCircle size={14} className="text-[#E31E24]" />
            <p className="font-mono text-[10px] tracking-[0.4em] text-[#E31E24] uppercase">
              Preguntas Frecuentes
            </p>
          </div>
          <h2 className="font-display text-t3 text-white">
            Todo sobre el <span className="text-[#E31E24]">evento</span>
          </h2>
          <p className="mt-3 text-sm text-white/40 max-w-xl mx-auto">
            Respuestas a las preguntas más comunes sobre TEMACON 2026, el evento de tecnología, 
            mantenimiento y confiabilidad para transporte de carga en Colombia.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-[800px] mx-auto space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="faq-item border border-white/[0.06] rounded-lg overflow-hidden hover:border-[#E31E24]/20 transition-colors"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-3.5 sm:py-4 text-left group"
                aria-expanded={openIdx === i}
              >
                <span className="font-display text-sm sm:text-base text-white/90 group-hover:text-white transition-colors leading-snug">
                  {faq.q}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-[#E31E24] flex-shrink-0 transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openIdx === i ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-4 sm:px-5 pb-4 pt-0">
                  <p className="text-sm text-white/60 leading-relaxed border-t border-white/[0.06] pt-3">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="font-mono text-[10px] text-white/30 tracking-wider mb-3">
            ¿MÁS PREGUNTAS? CONTÁCTANOS
          </p>
          <a
            href="https://wa.me/573182160678"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#E31E24] text-white px-6 py-2.5 rounded-full font-display text-sm font-semibold hover:bg-white hover:text-[#E31E24] transition-all"
          >
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
