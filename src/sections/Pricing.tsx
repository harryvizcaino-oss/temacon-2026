import { useState, useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Plane, Calendar, MapPin, Clock, QrCode, CheckCircle2, Stamp,
  ShieldCheck, Luggage, Utensils, Award, Users,
} from 'lucide-react';
import PurchaseModal from '@/components/PurchaseModal';
import { MetaPixel } from '@/lib/meta-pixel';
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
    <section id="pricing" ref={sectionRef} className="relative bg-white overflow-hidden">
      {/* Caja negra con margen blanco igual en todos los lados */}
      <div className="m-3 sm:m-5 lg:m-6 rounded-3xl bg-black relative" style={{ pointerEvents: 'auto' }}>

        {/* Contenido: título + ticket */}
        <div className="relative flex flex-col items-center pt-5 sm:pt-6 lg:pt-7 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-6 lg:px-8">
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
          className="w-full max-w-[1100px]"
          style={{ perspective: '1200px' }}
        >
          <div className="relative rounded-xl lg:rounded-2xl overflow-hidden border border-black/[0.08] shadow-[0_0_60px_rgba(227,30,36,0.1)] bg-white">

            {/* ═══ FILA 1: 3 Columnas (desktop) / Visual Tiquete (mobile) ═══ */}
            <div className="flex flex-col lg:flex-row">

              {/* COL 1: Flight Info */}
              <div className="flex-1 p-4 sm:p-5 lg:p-6 relative border-b lg:border-b-0 border-black/[0.06]">
                <div className="flex items-center justify-between mb-1.5 lg:mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 lg:w-8 lg:h-8 bg-[#E31E24] rounded-lg flex items-center justify-center">
                      <Plane size={14} className="lg:hidden text-white -rotate-45" />
                      <Plane size={16} className="hidden lg:block text-white -rotate-45" />
                    </div>
                    <div>
                      <p className="font-display text-sm text-black font-semibold">TEMACON</p>
                      <p className="font-mono text-[8px] lg:text-[9px] text-black/30 tracking-wider">AIRLINES</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[8px] lg:text-[9px] text-[#E31E24] tracking-wider">CLASE</p>
                    <p className="font-display text-sm lg:text-base text-black">GENERAL</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-1.5 lg:mb-2">
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

                <div className="grid grid-cols-3 gap-1 lg:mb-0">
                  {[
                    { icon: Calendar, label: 'FECHA', value: '01-02 SEP', sub: '2026' },
                    { icon: Clock,    label: 'HORA',  value: '08:00 AM',  sub: 'Apertura' },
                    { icon: MapPin,   label: 'GATE',  value: 'CCB Salitre', sub: 'Bogotá' },
                  ].map(({ icon: Icon, label, value, sub }) => (
                    <div key={label} className="bg-black/[0.03] rounded-lg p-2.5 lg:p-3 border border-black/[0.06]">
                      <Icon size={9} className="text-[#E31E24] mb-0.5" />
                      <p className="font-mono text-[6px] text-black/30 tracking-wider">{label}</p>
                      <p className="font-display text-[9px] lg:text-[10px] text-black leading-tight">{value}</p>
                      <p className="font-mono text-[5px] lg:text-[6px] text-black/30">{sub}</p>
                    </div>
                  ))}
                </div>

                {/* Stamp */}
                <div ref={stampRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-[3px] border-[#E31E24] flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-lg">
                    <div className="text-center">
                      <Stamp size={16} className="text-[#E31E24] mx-auto mb-1" />
                      <p className="font-display text-[10px] lg:text-xs text-[#E31E24] font-bold">CONFIRMED</p>
                      <p className="font-mono text-[6px] text-[#E31E24]/60">TEMACON 2026</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SEPARADOR 1-2 */}
              <div className="hidden lg:flex flex-col items-center justify-center relative w-6 flex-shrink-0">
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-black/15" />
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-white rounded-full shadow-sm backdrop-blur-sm" />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-white rounded-full shadow-sm backdrop-blur-sm" />
              </div>

              {/* COL 2: Precio + Botón (desktop) */}
              <div className="hidden lg:flex lg:w-[280px] xl:w-[320px] p-4 sm:p-5 lg:p-6 flex-col justify-center gap-4">
                <div className="flex flex-col items-center justify-center">
                  <p className="font-mono text-[6px] lg:text-[7px] text-black/30 tracking-wider mb-1">PRECIO GENERAL</p>
                  <span className="font-display text-3xl lg:text-4xl text-black tracking-tight">$399,000</span>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span className="font-mono text-xs text-black/40">+ IVA</span>
                    <span className="font-mono text-[10px] text-black/30">COP</span>
                  </div>
                </div>
                <button onClick={() => { MetaPixel.initiateCheckout(); if((window as any).lintrk)(window as any).lintrk('track',{conversion_id:26968820}); setIsModalOpen(true); }}
                  className="w-full py-3.5 bg-[#22c55e] text-white rounded-lg font-display font-semibold text-sm hover:bg-[#16a34a] transition-all duration-300 glow-pulse-green flex items-center justify-center gap-2 cursor-pointer"
                  style={{ pointerEvents: 'auto' }}>
                  <QrCode size={16} className="flex-shrink-0" />
                  Comprar Ticket
                </button>
              </div>

              {/* SEPARADOR 2-3 */}
              <div className="hidden lg:flex flex-col items-center justify-center relative w-6 flex-shrink-0">
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-black/15" />
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-white rounded-full shadow-sm backdrop-blur-sm" />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-white rounded-full shadow-sm backdrop-blur-sm" />
              </div>

              {/* COL 3: Qué Incluye (desktop) */}
              <div className="hidden lg:block lg:w-[340px] xl:w-[380px] p-4 sm:p-5 lg:p-6">
                <p className="font-mono text-[7px] lg:text-[8px] text-[#E31E24] tracking-wider mb-3 uppercase">Qué Incluye:</p>
                <div className="space-y-2.5">
                  {FEATURES.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 group">
                      <CheckCircle2 size={14} className="text-[#E31E24] flex-shrink-0" />
                      <div className="w-6 h-6 bg-black/5 rounded flex items-center justify-center border border-black/10 group-hover:border-[#E31E24]/30 group-hover:bg-[#E31E24]/10 transition-all flex-shrink-0">
                        <Icon size={12} className="text-black/40 group-hover:text-[#E31E24] transition-colors" />
                      </div>
                      <span className="text-xs lg:text-sm text-black/60 group-hover:text-black transition-colors leading-tight">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MOBILE: Grid 2 cols (Precio+Botón izq + Qué Incluye der) */}
            <div className="lg:hidden grid grid-cols-2 gap-0 border-t border-white/10">
              <div className="p-3 border-r border-black/[0.06] flex flex-col items-center justify-center gap-2">
                <div className="text-center">
                  <p className="font-mono text-[6px] text-black/30 tracking-wider mb-1">PRECIO</p>
                  <span className="font-display text-2xl text-black tracking-tight">$399,000</span>
                  <div className="flex items-center justify-center gap-1 mt-0.5">
                    <span className="font-mono text-[9px] text-black/40">+ IVA</span>
                    <span className="font-mono text-[8px] text-black/30">COP</span>
                  </div>
                </div>
                <button onClick={() => { MetaPixel.initiateCheckout(); if((window as any).lintrk)(window as any).lintrk('track',{conversion_id:26968820}); setIsModalOpen(true); }}
                  className="w-full py-2.5 bg-[#22c55e] text-white rounded-lg font-display font-semibold text-xs hover:bg-[#16a34a] transition-all duration-300 glow-pulse-green flex items-center justify-center gap-1.5 cursor-pointer"
                  style={{ pointerEvents: 'auto' }}>
                  <QrCode size={13} className="flex-shrink-0" />
                  Comprar Ticket
                </button>
              </div>
              <div className="p-3">
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
            </div>

            {/* ═══ FILA 2: Pago Seguro con Mercado Pago — COMPACTO ═══ */}
            <div className="px-3 sm:px-4 lg:px-5 py-3 lg:py-4 bg-gray-50 border-t border-black/[0.06]">
              <div className="flex items-center justify-center gap-2 sm:gap-4 lg:gap-5">
                <ShieldCheck size={22} className="sm:hidden text-green-500 flex-shrink-0" />
                <ShieldCheck size={28} className="hidden sm:block text-green-500 flex-shrink-0" />
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <p className="font-mono text-[10px] sm:text-xs lg:text-sm text-black/40 tracking-wider uppercase whitespace-nowrap">
                    Pago Seguro con
                  </p>
                  <img
                    src="/mercadopago-color.png"
                    alt="Mercado Pago"
                    className="h-8 sm:h-10 lg:h-12 object-contain flex-shrink-0 -my-2"
                    loading="lazy"
                  />
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
