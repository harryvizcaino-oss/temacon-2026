import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import AutopartParticles from '@/components/AutopartParticles';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════
   FAQ — Banner único que despliega todo
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
    a: 'Para patrocinar TEMACON 2026, puedes contactarnos directamente por WhatsApp al +57 311 378 2522 o escribir a contacto@tiendacamion.com. Ofrecemos diferentes niveles de patrocinio con acceso a la muestra comercial, branding en materiales del evento y oportunidades de networking con directores de flota de las principales empresas de transporte de Colombia.',
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
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="relative bg-[#0a0a0a] overflow-hidden" data-nav-light>
      {/* Autopartículas 3D */}
      <div className="absolute inset-0 z-[1]" style={{ pointerEvents: 'auto' }}>
        <AutopartParticles />
      </div>

      <div className="relative z-10 wrapper py-16 lg:py-24" style={{ pointerEvents: 'none' }}>

        {/* Banner principal — 1 solo botón que despliega TODO */}
        <div ref={titleRef} className="max-w-[900px] mx-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full flex items-center justify-between py-5 lg:py-6 px-5 lg:px-8 rounded-2xl border transition-all duration-300 ${
              isOpen
                ? 'bg-[#E31E24] border-[#E31E24]'
                : 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15]'
            }`}
            style={{ pointerEvents: 'auto' }}
          >
            <div className="text-left">
              <p className="font-mono text-[9px] lg:text-[10px] tracking-[0.4em] text-[#E31E24] uppercase mb-1">
                {isOpen ? 'Cerrar' : 'Haz clic para ver'}
              </p>
              <h2 className="font-display text-xl sm:text-2xl lg:text-t3 text-white">
                Preguntas <span className={isOpen ? 'text-white' : 'text-[#E31E24]'}>Frecuentes</span>
              </h2>
            </div>
            <ChevronDown
              size={28}
              className={`flex-shrink-0 transition-transform duration-500 ${
                isOpen ? 'rotate-180 text-white' : 'text-white/40'
              }`}
            />
          </button>

          {/* Contenido desplegable — TODAS las preguntas */}
          <div
            className={`overflow-hidden transition-all duration-700 ease-in-out ${
              isOpen ? 'max-h-[3000px] opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'
            }`}
          >
            <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
              {FAQS.map((faq, i) => (
                <div key={i} className="border-b border-white/[0.06] last:border-b-0">
                  {/* Pregunta */}
                  <div className="bg-white/[0.03] px-4 lg:px-6 py-3.5 lg:py-4 flex items-start gap-3">
                    <span className="font-mono text-xs text-[#E31E24]/60 flex-shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="font-display text-sm lg:text-base text-white/90 leading-snug">
                      {faq.q}
                    </p>
                  </div>
                  {/* Respuesta */}
                  <div className="bg-[#E31E24]/10 px-4 lg:px-6 pb-4 pt-1">
                    <p className="text-sm text-white/70 leading-relaxed max-w-4xl ml-7 lg:ml-9">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA WhatsApp */}
            <div className="text-center mt-6" style={{ pointerEvents: 'auto' }}>
              <p className="font-mono text-[10px] text-white/30 tracking-wider mb-3">
                ¿MÁS PREGUNTAS? CONTÁCTANOS
              </p>
              <a
                href="https://wa.me/573113782522"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#E31E24] text-white px-6 py-2.5 rounded-full font-display text-sm font-semibold hover:bg-white hover:text-[#E31E24] transition-all"
              >
                Escríbenos por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
