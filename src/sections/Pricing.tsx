import { useState, useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Plane, Calendar, MapPin, Clock, QrCode, CheckCircle2, Stamp,
  ShieldCheck, Luggage, Utensils, Award, Users,
} from 'lucide-react';
import PurchaseModal from '@/components/PurchaseModal';
import { MetaPixel } from '@/lib/meta-pixel';
import AutopartParticles from '@/components/AutopartParticles';
import type { LucideIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════
   FEATURES
   ═══════════════════════════════════════════ */
const FEATURES: { icon: LucideIcon; label: string }[] = [
  { icon: Calendar,  label: 'Acceso a 2 días de evento' },
  { icon: Award,     label: 'Acceso total a conferencias y muestra comercial' },
  { icon: Utensils,  label: 'Coffee breaks + Lunch BOX' },
  { icon: Luggage,   label: 'Certificado de Participación' },
  { icon: Users,     label: 'Acceso a Networking especializado' },
];

/* ═══════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════ */
const Pricing = memo(function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const ticketRef  = useRef<HTMLDivElement>(null);
  const stampRef   = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* Meta Pixel: ViewContent cuando pricing es visible */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ticketRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          onEnter: () => MetaPixel.viewContent('Pricing_Ticket', 'TEMACON2026'),
        },
        rotateX: -25, y: 80, opacity: 0,
        duration: 1.2, ease: 'power3.out',
      });
      gsap.to(stampRef.current, {
        scrollTrigger: { trigger: ticketRef.current, start: 'top 60%' },
        opacity: 1, scale: 1, rotation: 0,
        duration: 0.6, delay: 0.8, ease: 'back.out(1.7)',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="relative bg-black overflow-hidden">
      <div className="absolute inset-0 z-[1]" style={{ pointerEvents: 'auto' }}>
        <AutopartParticles />
      </div>
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(227,30,36,0.15) 30px, rgba(227,30,36,0.15) 31px)',
          backgroundSize: '200% 200%',
          animation: 'diagonalSlide 25s linear infinite',
        }}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#E31E24]/[0.04] blur-[100px] pointer-events-none" />
      {/* Background decorative divs closed above */}

      <div className="relative z-10 flex flex-col items-center pt-5 sm:pt-6 lg:pt-8 pb-6 sm:pb-8 px-4 sm:px-5" style={{ pointerEvents: 'none' }}>
        <div className="pricing-header text-center mb-2 sm:mb-3">
          <p className="font-mono text-[8px] lg:text-[9px] tracking-[0.4em] text-[#E31E24] uppercase">
            Registro
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mt-1 leading-tight">
            Adquiere tu <span className="text-[#E31E24]">Ingreso</span>
          </h2>
          <p className="font-mono text-[9px] lg:text-[10px] text-white/30 mt-1 tracking-wider">
            BOLETÍA ABIERTA · AGOTAR EXISTENCIAS · CONFERENCIAS EN INGLÉS Y ESPAÑOL
          </p>
        </div>

        {/* Ticket */}
        <div
          ref={ticketRef}
          className="w-full max-w-[680px] lg:max-w-[900px]"
          style={{ perspective: '1200px' }}
        >
          <div className="relative rounded-xl lg:rounded-2xl overflow-hidden border border-black/[0.08] shadow-[0_0_60px_rgba(227,30,36,0.1)] bg-white">

            {/* ═══ FILA 1: 3 Columnas (desktop) / Visual Tiquete (mobile) ═══ */}
            <div className="flex flex-col lg:flex-row">

              {/* COL 1: Flight Info */}
              <div className="flex-1 p-3 sm:p-4 lg:p-5 relative border-b lg:border-b-0 border-black/[0.06]">
                <div className="flex items-center justify-between mb-2 lg:mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 lg:w-9 lg:h-9 bg-[#E31E24] rounded-lg flex items-center justify-center">
                      <Plane size={16} className="lg:hidden text-white -rotate-45" />
                      <Plane size={18} className="hidden lg:block text-white -rotate-45" />
                    </div>
                    <div>
                      <p className="font-display text-xs text-black font-semibold">TEMACON</p>
                      <p className="font-mono text-[7px] lg:text-[8px] text-black/30 tracking-wider">AIRLINES</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[8px] lg:text-[9px] text-[#E31E24] tracking-wider">CLASE</p>
                    <p className="font-display text-sm lg:text-base text-black">GENERAL</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-2 lg:mb-3">
                  <div>
                    <p className="font-mono text-[7px] text-black/30 tracking-wider">ORIGEN</p>
                    <p className="font-display text-xl lg:text-2xl text-black leading-tight">BOG</p>
                    <p className="font-mono text-[7px] lg:text-[8px] text-black/40">Bogotá, CO</p>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-full flex items-center gap-2">
                      <div className="h-px flex-1 bg-black/10" />
                      <Plane size={14} className="text-[#E31E24] -rotate-45" />
                      <div className="h-px flex-1 bg-black/10" />
                    </div>
                    <p className="font-mono text-[7px] text-black/30 mt-0.5">TEMACON 2026</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[7px] text-black/30 tracking-wider">DESTINO</p>
                    <p className="font-display text-xl lg:text-2xl text-black leading-tight">T26</p>
                    <p className="font-mono text-[7px] lg:text-[8px] text-black/40">Transformación</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1.5 mb-2 lg:mb-3">
                  {[
                    { icon: Calendar, label: 'FECHA', value: '01-02 SEP', sub: '2026' },
                    { icon: Clock,    label: 'HORA',  value: '08:00 AM',  sub: 'Apertura' },
                    { icon: MapPin,   label: 'GATE',  value: 'ÁGORA',     sub: 'Bogotá' },
                  ].map(({ icon: Icon, label, value, sub }) => (
                    <div key={label} className="bg-black/[0.03] rounded-lg p-2 lg:p-2.5 border border-black/[0.06]">
                      <Icon size={10} className="text-[#E31E24] mb-0.5" />
                      <p className="font-mono text-[6px] lg:text-[7px] text-black/30 tracking-wider">{label}</p>
                      <p className="font-display text-[10px] lg:text-xs text-black leading-tight">{value}</p>
                      <p className="font-mono text-[6px] lg:text-[7px] text-black/30">{sub}</p>
                    </div>
                  ))}
                </div>

                {/* Stamp */}
                <div ref={stampRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0">
                  <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full border-4 border-[#E31E24] flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-lg">
                    <div className="text-center">
                      <Stamp size={20} className="text-[#E31E24] mx-auto mb-0.5" />
                      <p className="font-display text-xs text-[#E31E24] font-bold">CONFIRMED</p>
                      <p className="font-mono text-[6px] text-[#E31E24]/60">TEMACON 2026</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SEPARADOR 1-2 */}
              <div className="hidden lg:flex flex-col items-center justify-center relative w-6 flex-shrink-0">
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-black/15" />
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-white rounded-full shadow-sm" />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-white rounded-full shadow-sm" />
              </div>

              {/* COL 2: Qué Incluye (desktop) */}
              <div className="hidden lg:block lg:w-[280px] xl:w-[300px] p-3 sm:p-4 lg:p-5">
                <p className="font-mono text-[6px] lg:text-[7px] text-[#E31E24] tracking-wider mb-2 uppercase">Qué Incluye:</p>
                <div className="space-y-1.5">
                  {FEATURES.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 group">
                      <CheckCircle2 size={12} className="text-[#E31E24] flex-shrink-0" />
                      <div className="w-5 h-5 bg-black/5 rounded flex items-center justify-center border border-black/10 group-hover:border-[#E31E24]/30 group-hover:bg-[#E31E24]/10 transition-all flex-shrink-0">
                        <Icon size={10} className="text-black/40 group-hover:text-[#E31E24] transition-colors" />
                      </div>
                      <span className="text-[10px] lg:text-[11px] text-black/60 group-hover:text-black transition-colors leading-tight">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SEPARADOR 2-3 */}
              <div className="hidden lg:flex flex-col items-center justify-center relative w-6 flex-shrink-0">
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-black/15" />
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-white rounded-full shadow-sm" />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-white rounded-full shadow-sm" />
              </div>

              {/* COL 3: Precio (desktop) */}
              <div className="hidden lg:flex lg:w-[240px] xl:w-[260px] p-3 sm:p-4 lg:p-5 flex-col justify-between">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="font-mono text-[6px] lg:text-[7px] text-black/30 tracking-wider mb-1">PRECIO GENERAL</p>
                  <span className="font-display text-3xl lg:text-4xl text-black tracking-tight">$399,000</span>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span className="font-mono text-xs text-black/40">+ IVA</span>
                    <span className="font-mono text-[10px] text-black/30">COP</span>
                  </div>
                </div>
                <button onClick={() => { MetaPixel.initiateCheckout(); setIsModalOpen(true); }}
                  className="w-full py-2.5 lg:py-3 bg-[#E31E24] text-white rounded-lg font-display font-semibold text-xs hover:bg-black hover:text-white transition-all duration-300 shadow-lg shadow-[#E31E24]/20 flex items-center justify-center gap-1.5 cursor-pointer mt-4"
                  style={{ pointerEvents: 'auto' }}>
                  <QrCode size={14} /> Comprar Ticket
                </button>
              </div>
            </div>

            {/* MOBILE: Grid 2 cols (Qué Incluye + Precio) */}
            <div className="lg:hidden grid grid-cols-2 gap-0 border-t border-black/[0.06]">
              <div className="p-3 border-r border-black/[0.06]">
                <p className="font-mono text-[6px] text-[#E31E24] tracking-wider mb-2 uppercase">Qué Incluye:</p>
                <div className="space-y-1.5">
                  {FEATURES.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <CheckCircle2 size={10} className="text-[#E31E24] flex-shrink-0" />
                      <span className="text-[9px] text-black/60 leading-tight">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-3 flex flex-col items-center justify-center">
                <p className="font-mono text-[6px] text-black/30 tracking-wider mb-1">PRECIO</p>
                <span className="font-display text-2xl text-black tracking-tight">$399,000</span>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="font-mono text-[9px] text-black/40">+ IVA</span>
                  <span className="font-mono text-[8px] text-black/30">COP</span>
                </div>
              </div>
            </div>

            {/* MOBILE: Botón */}
            <div className="lg:hidden p-3 border-t border-black/[0.06]">
              <button onClick={() => { MetaPixel.initiateCheckout(); setIsModalOpen(true); }}
                className="w-full py-3 bg-[#E31E24] text-white rounded-lg font-display font-semibold text-sm hover:bg-black hover:text-white transition-all duration-300 shadow-lg shadow-[#E31E24]/20 flex items-center justify-center gap-1.5 cursor-pointer"
                style={{ pointerEvents: 'auto' }}>
                <QrCode size={16} /> Comprar Ticket
              </button>
            </div>

            {/* ═══ FILA 2: Medios de Pago ═══ */}
            <div className="px-3 sm:px-4 lg:px-5 py-3 bg-gray-50 border-t border-black/[0.06]">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-3 flex-wrap justify-center">
                  <ShieldCheck size={16} className="text-green-500 flex-shrink-0" />
                  <p className="font-mono text-[7px] lg:text-[8px] text-black/40 tracking-wider uppercase">Pago Seguro con Mercado Pago</p>
                  <img src="/mercadopago-horizontal.png" alt="Mercado Pago" className="h-4 lg:h-5 object-contain flex-shrink-0" loading="lazy" />
                </div>

                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <div className="bg-white border border-black/10 rounded-lg px-2 py-1 shadow-sm" title="Visa">
                    <svg viewBox="0 0 48 16" className="h-3 w-auto">
                      <path fill="#1A1F71" d="M17.68 1.5l-4.1 9.8h-2.7L9.5 3.8c-.1-.6-.3-.9-.6-1.1-.7-.5-1.8-.9-2.8-1.2L9.6.1h4.8l2.5 6.7L19.3.1h3.4l-5 1.4zM7.2 1.5L3.5 9.4c-.1.3-.2.5-.2.6 0 .2.1.3.3.4.5.3 1.4.5 2.2.6l-1.8 2H2.1L0 9.9l2.2-5.3C2.5 4 3 3.2 3.6 2.8c.5-.3 1.2-.5 2-.6l1.6-.7z"/>
                      <path fill="#1A1F71" d="M33.5 1.5l-3.3 8.5c-.1.3-.2.5-.2.7h3.1l.3-.8h3.3l.2.8h3.5L37.8 1.5h-4.3zm1.6 2.2l1 3.6h-2.7l1.7-3.6zM28.3 1.5l-2.4 6.2-.3-1.5c-.5-1.6-1.9-2.7-3.5-3.2l2.2 8.5h3.5l4.2-9.9h-3.7z"/>
                      <path fill="#1A1F71" d="M22.5 1.5h-5.2l-.1.4c4 .9 6.6 3.2 7.7 5.8L24 2.6c-.2-.8-.7-1.1-1.5-1.1z"/>
                    </svg>
                  </div>
                  <div className="bg-white border border-black/10 rounded-lg px-2 py-1 shadow-sm" title="Mastercard">
                    <svg viewBox="0 0 48 16" className="h-3 w-auto">
                      <circle cx="16" cy="8" r="7" fill="#EB001B"/>
                      <circle cx="24" cy="8" r="7" fill="#F79E1B"/>
                      <path d="M20 2.5c1.8 1.5 3 3.8 3 5.5s-1.2 4-3 5.5c-1.8-1.5-3-3.8-3-5.5s1.2-4 3-5.5z" fill="#FF5F00"/>
                    </svg>
                  </div>
                  <div className="bg-white border border-black/10 rounded-lg px-2 py-1 shadow-sm" title="PSE">
                    <img src="/pse-logo.png" alt="PSE" className="h-3 object-contain" loading="lazy" />
                  </div>
                  <div className="bg-[#016FD0] rounded-lg px-2 py-1 shadow-sm" title="American Express">
                    <svg viewBox="0 0 48 16" className="h-3 w-auto">
                      <text x="2" y="12" fill="white" fontSize="9" fontWeight="bold" fontFamily="Arial">AMEX</text>
                    </svg>
                  </div>
                  <div className="bg-white border border-black/10 rounded-lg px-2 py-1 shadow-sm" title="Diners Club">
                    <svg viewBox="0 0 48 16" className="h-3 w-auto">
                      <circle cx="8" cy="8" r="7" fill="none" stroke="#004E94" strokeWidth="1"/>
                      <path d="M8 2c3.3 0 6 2.7 6 6s-2.7 6-6 6V2z" fill="#004E94"/>
                    </svg>
                  </div>
                  <div className="bg-white border border-black/10 rounded-lg px-2 py-1 shadow-sm" title="Efecty">
                    <img src="/efecty-logo.png" alt="Efecty" className="h-3 object-contain" loading="lazy" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Shadow */}
          <div className="absolute -bottom-6 left-[5%] right-[5%] h-6 rounded-full blur-xl opacity-30 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(227,30,36,0.3) 0%, transparent 70%)' }}
          />
        </div>

      </div>

      <style>{`
        @keyframes scanLine { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        @keyframes diagonalSlide { 0% { background-position: 0% 0%; } 100% { background-position: 100% 100%; } }
      `}</style>

      <PurchaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
});

export default Pricing;
