import { useEffect, useRef, useState, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Plane, Calendar, MapPin, Clock, QrCode, CheckCircle2, Stamp,
  Luggage, Utensils, Award, Users,
} from 'lucide-react';
import PurchaseModal from '@/components/PurchaseModal';
import AutopartParticles from '@/components/AutopartParticles';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { icon: Calendar,     label: 'Acceso a 2 días de evento' },
  { icon: Luggage,      label: 'Acceso total a conferencias y muestra comercial' },
  { icon: Utensils,     label: 'Coffee breaks + Lunch BOX' },
  { icon: Award,        label: 'Certificado de Participación' },
  { icon: Users,        label: 'Acceso a Networking especializado' },
];

const Pricing = memo(function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pricing-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
      });
      gsap.from(ticketRef.current, {
        scrollTrigger: { trigger: ticketRef.current, start: 'top 85%' },
        y: 60, opacity: 0, scale: 0.95,
        duration: 1, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* Stamp animation */
  useEffect(() => {
    if (!stampRef.current) return;
    if (hovered) {
      gsap.fromTo(stampRef.current,
        { scale: 2, opacity: 0, rotation: -30 },
        { scale: 1, opacity: 1, rotation: -12, duration: 0.4, ease: 'back.out(2)' }
      );
    } else {
      gsap.to(stampRef.current, { scale: 1.5, opacity: 0, duration: 0.2 });
    }
  }, [hovered]);

  return (
    <section id="pricing" ref={sectionRef} className="relative bg-black overflow-hidden">
      {/* Autopartículas 3D */}
      <div className="absolute inset-0 z-[1]" style={{ pointerEvents: 'auto' }}>
        <AutopartParticles />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(227,30,36,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(227,30,36,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#E31E24]/[0.04] blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center pt-5 sm:pt-6 lg:pt-8 pb-6 sm:pb-8 px-4 sm:px-5" style={{ pointerEvents: 'none' }}>
        {/* Header — compacto */}
        <div className="pricing-header text-center mb-2 sm:mb-3">
          <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] text-[#E31E24] uppercase mb-2">
            Registro Abierto
          </p>
          <h2 className="font-display text-t3 text-white leading-tight">
            Tu Pase de <span className="text-[#E31E24]">Abordar</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-white/40 max-w-md mx-auto">
            Un solo paquete. Toda la experiencia. Asegura tu lugar en TEMACON 2026.
          </p>
        </div>

        {/* ═══════════════════════════════════════════
           BOARDING PASS TICKET — ultra compacto
           ═══════════════════════════════════════════ */}
        <div
          ref={ticketRef}
          className="w-full max-w-[900px] relative"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Ticket container */}
          <div className="relative flex flex-col lg:flex-row rounded-xl lg:rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_0_60px_rgba(227,30,36,0.1)] bg-gradient-to-br from-[#111] to-[#0a0a0a]">

            {/* ─── LEFT: Flight Info ─── */}
            <div className="flex-1 p-3 sm:p-4 lg:p-5 relative">
              {/* Airline header — compact */}
              <div className="flex items-center justify-between mb-2 lg:mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 lg:w-9 lg:h-9 bg-[#E31E24] rounded-lg flex items-center justify-center">
                    <Plane size={16} className="lg:hidden text-white -rotate-45" />
                    <Plane size={18} className="hidden lg:block text-white -rotate-45" />
                  </div>
                  <div>
                    <p className="font-display text-xs text-white font-semibold">TEMACON</p>
                    <p className="font-mono text-[7px] lg:text-[8px] text-white/30 tracking-wider">AIRLINES</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[8px] lg:text-[9px] text-[#E31E24] tracking-wider">CLASE</p>
                  <p className="font-display text-sm lg:text-base text-white">GENERAL</p>
                </div>
              </div>

              {/* Route — compact */}
              <div className="flex items-center gap-3 mb-2 lg:mb-3">
                <div>
                  <p className="font-mono text-[7px] text-white/30 tracking-wider">ORIGEN</p>
                  <p className="font-display text-xl lg:text-2xl text-white leading-tight">BOG</p>
                  <p className="font-mono text-[7px] lg:text-[8px] text-white/40">Bogotá, CO</p>
                </div>

                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full flex items-center gap-2">
                    <div className="h-px flex-1 bg-white/10" />
                    <Plane size={14} className="text-[#E31E24] -rotate-45" />
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <p className="font-mono text-[7px] text-white/30 mt-0.5">TEMACON 2026</p>
                </div>

                <div className="text-right">
                  <p className="font-mono text-[7px] text-white/30 tracking-wider">DESTINO</p>
                  <p className="font-display text-xl lg:text-2xl text-white leading-tight">T26</p>
                  <p className="font-mono text-[7px] lg:text-[8px] text-white/40">Transformación</p>
                </div>
              </div>

              {/* Flight details grid — compact */}
              <div className="grid grid-cols-3 gap-1.5 mb-2 lg:mb-3">
                {[
                  { icon: Calendar, label: 'FECHA', value: '01-02 SEP', sub: '2026' },
                  { icon: Clock,    label: 'HORA',  value: '08:00 AM',  sub: 'Apertura' },
                  { icon: MapPin,   label: 'GATE',  value: 'ÁGORA',     sub: 'Bogotá' },
                ].map(({ icon: Icon, label, value, sub }) => (
                  <div key={label} className="bg-white/[0.03] rounded-lg p-2 lg:p-2.5 border border-white/[0.06]">
                    <Icon size={10} className="text-[#E31E24] mb-0.5" />
                    <p className="font-mono text-[6px] lg:text-[7px] text-white/30 tracking-wider">{label}</p>
                    <p className="font-display text-[10px] lg:text-xs text-white leading-tight">{value}</p>
                    <p className="font-mono text-[6px] lg:text-[7px] text-white/30">{sub}</p>
                  </div>
                ))}
              </div>

              {/* STAMP */}
              <div
                ref={stampRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0"
              >
                <div className="relative">
                  <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full border-4 border-[#E31E24] flex items-center justify-center bg-[#E31E24]/10 backdrop-blur-sm">
                    <div className="text-center">
                      <Stamp size={20} className="text-[#E31E24] mx-auto mb-0.5" />
                      <p className="font-display text-xs text-[#E31E24] font-bold">CONFIRMED</p>
                      <p className="font-mono text-[6px] text-[#E31E24]/60">TEMACON 2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── PERFORATION ─── */}
            <div className="hidden lg:flex flex-col items-center justify-center relative w-6">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-white/10" />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-black rounded-full" />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-black rounded-full" />
            </div>

            {/* ─── RIGHT: Price & Features ─── */}
            <div className="lg:w-[260px] xl:w-[280px] p-3 sm:p-4 lg:p-5 bg-gradient-to-br from-[#0d0d0d] to-[#080808] relative">
              {/* Scan line */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-r-2xl">
                <div
                  className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#E31E24]/30 to-transparent"
                  style={{ animation: 'scanLine 3s linear infinite' }}
                />
              </div>

              {/* Price — ultra compact */}
              <div className="mb-2 lg:mb-3">
                <p className="font-mono text-[6px] lg:text-[7px] text-white/30 tracking-wider mb-0.5">PRECIO GENERAL</p>
                <div className="flex items-baseline gap-1 flex-wrap">
                  <span className="font-display text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">$399,000</span>
                  <span className="font-mono text-[10px] lg:text-xs text-white/40">+ IVA</span>
                  <span className="font-mono text-[9px] lg:text-[10px] text-white/30">COP</span>
                </div>
              </div>

              {/* Features — ultra compact */}
              <div className="mb-2 lg:mb-3">
                <p className="font-mono text-[6px] lg:text-[7px] text-[#E31E24] tracking-wider mb-1">SERVICIOS A BORDO</p>
                <div className="space-y-0.5">
                  {FEATURES.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5 group">
                      <div className="w-4 h-4 bg-white/5 rounded flex items-center justify-center border border-white/10 group-hover:border-[#E31E24]/30 group-hover:bg-[#E31E24]/10 transition-all flex-shrink-0">
                        <Icon size={9} className="text-white/50 group-hover:text-[#E31E24] transition-colors" />
                      </div>
                      <span className="text-[10px] lg:text-[11px] text-white/60 group-hover:text-white transition-colors leading-tight">{label}</span>
                      <CheckCircle2 size={9} className="text-[#E31E24] ml-auto flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2 lg:py-2.5 bg-[#E31E24] text-white rounded-lg font-display font-semibold text-xs hover:bg-white hover:text-[#E31E24] transition-all duration-300 shadow-lg shadow-[#E31E24]/20 flex items-center justify-center gap-1.5 cursor-pointer"
                style={{ pointerEvents: 'auto' }}
              >
                <QrCode size={14} />
                Adquirir Ingreso Ahora
              </button>

              {/* Barcode — visible xl+ only */}
              <div className="hidden xl:flex mt-2 flex-col items-center">
                <div className="flex gap-[2px] h-5 items-end">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white/30"
                      style={{
                        width: 1.5 + Math.random() * 2,
                        height: `${40 + Math.random() * 60}%`,
                      }}
                    />
                  ))}
                </div>
                <p className="font-mono text-[6px] text-white/20 tracking-[0.3em] mt-0.5">TEMACON2026-BOG-001</p>
              </div>
            </div>
          </div>

          {/* Shadow below */}
          <div
            className="absolute -bottom-6 left-[5%] right-[5%] h-6 rounded-full blur-xl opacity-30"
            style={{ background: 'radial-gradient(ellipse, rgba(227,30,36,0.3) 0%, transparent 70%)' }}
          />
        </div>

      </div>

      {/* Scan line keyframe */}
      <style>{`
        @keyframes scanLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>

      <PurchaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
});

export default Pricing;
