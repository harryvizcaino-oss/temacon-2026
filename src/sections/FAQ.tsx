import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

/* ═══════════════════════════════════════════
   FAQ — Acordeón individual por pregunta
   Estilo limpio: pregunta negrilla, respuesta normal
   ═══════════════════════════════════════════ */

const FAQS = [
  {
    q: '&iquest;Qu&eacute; es TEMACON 2026?',
    a: 'TEMACON 2026 es el Evento de Tecnolog&iacute;a, Mantenimiento y Confiabilidad l&iacute;der para el transporte de carga. Re&uacute;ne a m&aacute;s de 400 profesionales, 12 conferencistas y marcas l&iacute;deres en tecnolog&iacute;a para flotas.',
  },
  {
    q: '&iquest;Cu&aacute;l es la alianza con LOGYCA?',
    a: 'LOGYCA es aliado estrat&eacute;gico de TEMACON 2026 en tres ejes: <strong>comunicaci&oacute;n</strong> del evento a sus redes, <strong>participaci&oacute;n en conferencias acad&eacute;micas</strong> con expertos del sector, y <strong>presencia de marca</strong> en todos los materiales oficiales del evento.',
  },
  {
    q: '&iquest;Qu&eacute; hace Fedetranscarga como aliado?',
    a: 'Fedetranscarga es aliado estrat&eacute;gico de TEMACON 2026 enfocado en: <strong>comunicaci&oacute;n</strong> a la comunidad transportadora, <strong>participaci&oacute;n en conferencias</strong> con l&iacute;deres del gremio, y <strong>presencia de marca</strong> como respaldo institucional del evento.',
  },
  {
    q: '&iquest;Por qu&eacute; deber&iacute;a participar como empresa?',
    a: 'Participar te da 4 ventajas clave: 1) Proyecci&oacute;n nacional ante flotas de toda Colombia. 2) Generaci&oacute;n de negocios directos. 3) Posicionamiento de confianza como referente. 4) Cierre por recomendaci&oacute;n — la venta se define en el taller.',
  },
  {
    q: '&iquest;Qui&eacute;n puede asistir?',
    a: 'Directores de flota, jefes de mantenimiento, ingenieros de confiabilidad, gerentes de log&iacute;stica, t&eacute;cnicos especializados y cualquier profesional del sector transporte de carga.',
  },
  {
    q: '&iquest;Cu&aacute;nto cuesta la entrada?',
    a: 'El precio general es de <strong>$399,000 COP + IVA</strong>. Incluye acceso a los 2 d&iacute;as, todas las conferencias, muestra comercial, coffee breaks, almuerzo tipo BOX y certificado digital.',
  },
  {
    q: '&iquest;Qu&eacute; temas se tratan en los tracks?',
    a: 'Los 7 tracks cubren: Telem&aacute;tica y Flotas Conectadas, Mantenimiento Predictivo con IA, Confiabilidad Vehicular y RCM, Gesti&oacute;n de Flotas y KPIs, Tecnolog&iacute;a en Frenos y Suspensi&oacute;n, Diagn&oacute;stico Electr&oacute;nico y SCR, y Gesti&oacute;n de Llantas y Eficiencia Energ&eacute;tica.',
  },
  {
    q: '&iquest;D&oacute;nde y cu&aacute;ndo se realiza?',
    a: '1-2 de septiembre de 2026 en Bogot&aacute;, Colombia. La sede es la C&aacute;mara de Comercio de Bogot&aacute; en la Avenida El Dorado. Horario: 8:00 AM - 6:00 PM.',
  },
  {
    q: '&iquest;C&oacute;mo patrocinar?',
    a: 'Escr&iacute;benos por WhatsApp al <strong>+57 311 378 2522</strong> o a <strong>contacto@tiendacamion.com</strong>. Ofrecemos diferentes niveles de patrocinio con acceso a la muestra comercial y networking con directores de flota.',
  },
  {
    q: '&iquest;Qu&eacute; es el mantenimiento predictivo?',
    a: 'Es una estrategia que utiliza sensores IoT, telem&aacute;tica y an&aacute;lisis de datos para anticipar fallas. Las flotas que lo implementan reducen en promedio un <strong>30% sus costos operativos</strong>.',
  },
  {
    q: '&iquest;Cu&aacute;les son las tendencias 2026?',
    a: 'IA para mantenimiento predictivo, veh&iacute;culos conectados con telem&aacute;tica avanzada, gesti&oacute;n de flotas en tiempo real, sistemas ADAS, econom&iacute;a circular en repuestos, combustibles alternativos y electrificaci&oacute;n.',
  },
  {
    q: '&iquest;C&oacute;mo me registro?',
    a: 'Haz clic en el bot&oacute;n &ldquo;Comprar Ticket&rdquo; en esta p&aacute;gina. Seleccionas tus tickets, completas tus datos y realizas el pago seguro. Recibir&aacute;s tu pase digital por correo.',
  },
  {
    q: '&iquest;Qu&eacute; marcas participan en la muestra comercial?',
    a: 'Proveedores de telem&aacute;tica y GPS, fabricantes de repuestos, software de gesti&oacute;n de flotas, lubricantes, especialistas en frenos y suspensi&oacute;n, diagn&oacute;stico electr&oacute;nico, y fabricantes de llantas para transporte pesado.',
  },
];

function AccordionItem({ faq, index }: { faq: typeof FAQS[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-black/[0.06] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-3 px-4 lg:px-6 py-3.5 lg:py-4 text-left bg-transparent border-none cursor-pointer group"
      >
        <span className="font-mono text-xs text-[#E31E24]/60 flex-shrink-0 mt-0.5">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span
          className="font-display text-sm lg:text-base text-black/90 leading-snug font-bold flex-1 group-hover:text-[#E31E24] transition-colors"
          dangerouslySetInnerHTML={{ __html: faq.q }}
        />
        <ChevronDown
          size={18}
          className={`flex-shrink-0 text-black/30 group-hover:text-[#E31E24] transition-all duration-300 mt-0.5 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-400 ease-in-out ${open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-4 lg:px-6 pb-4 pt-0">
          <p
            className="text-sm text-black/60 leading-relaxed ml-7 lg:ml-9"
            dangerouslySetInnerHTML={{ __html: faq.a }}
          />
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative bg-[#f7f7f7] overflow-hidden">
      <div className="wrapper py-12 lg:py-16">

        {/* Header */}
        <div className="text-center mb-8 lg:mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <HelpCircle size={14} className="text-[#E31E24]" />
            <p className="font-mono text-[10px] tracking-[0.4em] text-[#E31E24] uppercase">
              Resolvemos tus dudas
            </p>
          </div>
          <h2 className="font-display text-3xl lg:text-4xl text-black tracking-tight">
            Preguntas <span className="text-[#E31E24]">Frecuentes</span>
          </h2>
        </div>

        {/* Acordeón */}
        <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden border border-black/[0.08] bg-white shadow-sm">
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} faq={faq} index={i} />
          ))}
        </div>

        {/* CTA WhatsApp */}
        <div className="text-center mt-8">
          <p className="font-mono text-[10px] text-black/40 tracking-wider mb-3">
            &iquest;M&Aacute;S PREGUNTAS? CONT&Aacute;CTANOS
          </p>
          <a
            href="https://wa.me/573113782522"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#E31E24] text-white px-6 py-2.5 rounded-full font-display text-sm font-semibold hover:bg-white hover:text-[#E31E24] border-2 border-[#E31E24] transition-all"
          >
            Escr&iacute;benos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
