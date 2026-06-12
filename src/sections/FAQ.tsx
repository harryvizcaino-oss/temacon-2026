import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/* ═══════════════════════════════════════════
   FAQ — Banner único que despliega todo
   ═══════════════════════════════════════════ */

const FAQS = [
  {
    q: '¿Qué es TEMACON 2026 y por qué es el evento más importante de Tecnología, Mantenimiento y Confiabilidad para el transporte de carga en Colombia?',
    a: 'TEMACON 2026 es el Evento de Tecnología, Mantenimiento y Confiabilidad líder de Latinoamérica para el transporte de carga. Reúne a más de 400 profesionales del sector transporte de carga y sus líderes de tecnología, mantenimiento y confiabilidad, 12 conferencistas nacionales y marcas líderes en tecnología para flotas. Se realiza los días 1 y 2 de septiembre de 2026 en Bogotá, Colombia.',
  },
  {
    q: '¿Por qué debería participar como empresa en TEMACON 2026?',
    a: 'Participar en TEMACON te da 4 ventajas clave: 1) Proyección nacional — Tu marca gana exposición directa ante flotas y empresas de transporte de carga de toda Colombia. 2) Generación de negocios — Abres un canal comercial directo interactuando con usuarios que evalúan y solicitan cotizaciones de repuestos y servicios. 3) Posicionamiento de confianza — Te consolidas como referente prioritario en confiabilidad, colocando tu propuesta como primera opción. 4) Cierre por recomendación — La venta en carga pesada se define en el taller, y cuando el área operativa valida tu solución, la negociación con la alta dirección se acelera y la objeción técnica desaparece.',
  },
  {
    q: '¿Quién puede asistir al Evento de Tecnología, Mantenimiento y Confiabilidad TEMACON 2026?',
    a: 'TEMACON está dirigido a directores de flota, jefes de mantenimiento, ingenieros de confiabilidad, gerentes de logística, técnicos especializados en vehículos pesados, contratistas de transporte y cualquier profesional del sector transporte de carga interesado en tecnología, mantenimiento predictivo y optimización de flotas.',
  },
  {
    q: '¿Cuánto cuesta la entrada al Evento de Tecnología, Mantenimiento y Confiabilidad para transporte de carga TEMACON 2026?',
    a: 'El precio general del evento es de $399,000 COP + IVA. Incluye acceso a los 2 días del evento, todas las conferencias, la muestra comercial, coffee breaks, almuerzo tipo BOX y certificado de participación digital.',
  },
  {
    q: '¿Qué temas se tratan en los tracks del Evento de Tecnología, Mantenimiento y Confiabilidad TEMACON 2026?',
    a: 'Los 7 tracks de TEMACON 2026 cubren: Telemática y Flotas Conectadas, Mantenimiento Predictivo con IA, Confiabilidad Vehicular y RCM, Gestión de Flotas y KPIs, Tecnología en Frenos y Suspensión, Diagnóstico Electrónico y SCR, y Gestión de Llantas y Eficiencia Energética.',
  },
  {
    q: '¿Dónde y cuándo se realiza el Evento de Tecnología, Mantenimiento y Confiabilidad TEMACON 2026?',
    a: 'TEMACON 2026, el Evento de Tecnología, Mantenimiento y Confiabilidad para el transporte de carga, se realiza los días 1 y 2 de septiembre de 2026 en Bogotá, Colombia. La sede es la Cámara de Comercio de Bogotá en la Avenida El Dorado. El horario de apertura es 8:00 AM y cierra a las 6:00 PM.',
  },
  {
    q: '¿Cómo puedo patrocinar el Evento de Tecnología, Mantenimiento y Confiabilidad más importante de Latinoamérica?',
    a: 'Para patrocinar TEMACON 2026, el Evento de Tecnología, Mantenimiento y Confiabilidad para el transporte de carga, puedes contactarnos directamente por WhatsApp al +57 311 378 2522 o escribir a contacto@tiendacamion.com. Ofrecemos diferentes niveles de patrocinio con acceso a la muestra comercial, branding en materiales del evento y oportunidades de networking con directores de flota de las principales empresas de transporte de Colombia.',
  },
  {
    q: '¿Qué es el mantenimiento predictivo y cómo ayuda a reducir costos en flotas de camiones?',
    a: 'El mantenimiento predictivo es una estrategia que utiliza sensores IoT, telemática y análisis de datos para anticipar fallas antes de que ocurran. En TEMACON 2026, el Evento de Tecnología, Mantenimiento y Confiabilidad, aprenderás cómo las flotas que implementan mantenimiento predictivo reducen en promedio un 30% sus costos operativos, disminuyen el downtime y extienden la vida útil de sus vehículos pesados.',
  },
  {
    q: '¿Cuáles son las tendencias de Tecnología, Mantenimiento y Confiabilidad para el transporte de carga en 2026?',
    a: 'Las principales tendencias que se discuten en TEMACON 2026, el Evento de Tecnología, Mantenimiento y Confiabilidad, incluyen: inteligencia artificial para mantenimiento predictivo, vehículos conectados con telemática avanzada, gestión de flotas en tiempo real, sistemas ADAS para camiones, economía circular en repuestos, combustibles alternativos, electrificación de flotas y normativas de emisiones para vehículos pesados en Colombia.',
  },
  {
    q: '¿Cómo me registro para el Evento de Tecnología, Mantenimiento y Confiabilidad TEMACON 2026?',
    a: 'Puedes registrarte directamente en esta página haciendo clic en el botón "Adquirir Ingreso Ahora". El proceso es simple: seleccionas tus tickets, completas tus datos y realizas el pago seguro. Una vez confirmada la compra, recibirás tu pase digital por correo electrónico.',
  },
  {
    q: '¿Qué marcas y empresas participan en la muestra comercial del Evento de Tecnología, Mantenimiento y Confiabilidad TEMACON 2026?',
    a: 'La muestra comercial de TEMACON 2026, el Evento de Tecnología, Mantenimiento y Confiabilidad para el transporte de carga, reúne a las marcas líderes del sector: proveedores de telemática y GPS, fabricantes de repuestos para camiones, empresas de software de gestión de flotas, proveedores de lubricantes, especialistas en frenos y suspensión, empresas de diagnóstico electrónico, y fabricantes de llantas para transporte pesado.',
  },
];

export default function FAQ() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="faq" className="relative bg-white overflow-hidden">

      <div className="relative z-10 wrapper py-16 lg:py-24">

        {/* Banner principal — 1 solo botón que despliega TODO */}
        <div className="max-w-[900px] mx-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full flex items-center justify-between py-5 lg:py-6 px-5 lg:px-8 rounded-2xl border transition-all duration-300 ${
              isOpen
                ? 'bg-[#E31E24] border-[#E31E24]'
                : 'bg-black/[0.03] border-black/[0.08] hover:bg-black/[0.06] hover:border-black/[0.15]'
            }`}
          >
            <div className="text-left">
              <p className="font-mono text-[9px] lg:text-[10px] tracking-[0.4em] text-[#E31E24] uppercase mb-1">
                {isOpen ? 'Cerrar' : 'Haz clic para ver'}
              </p>
              <h2 className={`font-display text-xl sm:text-2xl lg:text-t3 ${isOpen ? 'text-white' : 'text-black'}`}>
                Preguntas <span className={isOpen ? 'text-white' : 'text-[#E31E24]'}>Frecuentes</span>
              </h2>
            </div>
            <ChevronDown
              size={28}
              className={`flex-shrink-0 transition-transform duration-500 ${
                isOpen ? 'rotate-180 text-white' : 'text-black/30'
              }`}
            />
          </button>

          {/* Contenido desplegable — TODAS las preguntas */}
          <div
            className={`overflow-hidden transition-all duration-700 ease-in-out ${
              isOpen ? 'max-h-[3000px] opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'
            }`}
          >
            <div className="rounded-2xl overflow-hidden border border-black/[0.08]">
              {FAQS.map((faq, i) => (
                <div key={i} className="border-b border-black/[0.06] last:border-b-0">
                  {/* Pregunta */}
                  <div className="bg-black/[0.02] px-4 lg:px-6 py-3.5 lg:py-4 flex items-start gap-3">
                    <span className="font-mono text-xs text-[#E31E24]/60 flex-shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="font-display text-sm lg:text-base text-black/90 leading-snug">
                      {faq.q}
                    </p>
                  </div>
                  {/* Respuesta */}
                  <div className="bg-[#E31E24]/5 px-4 lg:px-6 pb-4 pt-1">
                    <p className="text-sm text-black/70 leading-relaxed max-w-4xl ml-7 lg:ml-9">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA WhatsApp */}
            <div className="text-center mt-6">
              <p className="font-mono text-[10px] text-black/40 tracking-wider mb-3">
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
