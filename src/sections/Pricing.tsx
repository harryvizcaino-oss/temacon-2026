import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Plane, Calendar, MapPin, Clock, QrCode, CheckCircle2, Stamp,
  Luggage, Utensils, Wifi, Award, Users, Video,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { icon: Luggage,      label: 'Acceso total a sesiones' },
  { icon: Utensils,     label: 'Coffee breaks + lunch' },
  { icon: Wifi,         label: 'Material digital del evento' },
  { icon: Award,        label: 'Certificado de participación' },
  { icon: Users,        label: 'Networking presencial' },
  { icon: Video,        label: 'Grabaciones (30 días)' },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [nameInput, setNameInput] = useState('');

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
    <section id="register" ref={sectionRef} className="relative bg-black overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(227,30,36,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(227,30,36,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#E31E24]/[0.04] blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center py-20 lg:py-32 px-5">
        {/* Header */}
        <div className="pricing-header text-center mb-12 lg:mb-16">
          <p className="font-mono text-[10px] tracking-[0.4em] text-[#E31E24] uppercase mb-3">
            Registro Abierto
          </p>
          <h2 className="font-display text-t3 text-white">
            Tu Pase de <span className="text-[#E31E24]">Abordar</span>
          </h2>
          <p className="mt-3 text-sm text-white/40 max-w-md mx-auto">
            Un solo paquete. Toda la experiencia. Asegura tu lugar en TEMACON 2026.
          </p>
        </div>

        {/* ═══════════════════════════════════════════
           BOARDING PASS TICKET
           ═══════════════════════════════════════════ */}
        <div
          ref={ticketRef}
          className="w-full max-w-[900px] relative"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Ticket container */}
          <div className="relative flex flex-col lg:flex-row rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_0_60px_rgba(227,30,36,0.1)] bg-gradient-to-br from-[#111] to-[#0a0a0a]">

            {/* ─── LEFT: Flight Info ─── */}
            <div className="flex-1 p-6 lg:p-10 relative">
              {/* Airline header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#E31E24] rounded-lg flex items-center justify-center">
                    <Plane size={20} className="text-white -rotate-45" />
                  </div>
                  <div>
                    <p className="font-display text-sm text-white font-semibold">TEMACON</p>
                    <p className="font-mono text-[9px] text-white/30 tracking-wider">AIRLINES</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[10px] text-[#E31E24] tracking-wider">CLASE</p>
                  <p className="font-display text-lg text-white">GENERAL</p>
                </div>
              </div>

              {/* Route */}
              <div className="flex items-center gap-4 mb-8">
                <div>
                  <p className="font-mono text-[9px] text-white/30 tracking-wider">ORIGEN</p>
                  <p className="font-display text-3xl text-white">BOG</p>
                  <p className="font-mono text-[10px] text-white/40">Bogotá, CO</p>
                </div>

                {/* Flight path */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full flex items-center gap-2">
                    <div className="h-px flex-1 bg-white/10" />
                    <Plane size={16} className="text-[#E31E24] -rotate-45" />
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <p className="font-mono text-[9px] text-white/30 mt-1">TEMACON 2026</p>
                </div>

                <div className="text-right">
                  <p className="font-mono text-[9px] text-white/30 tracking-wider">DESTINO</p>
                  <p className="font-display text-3xl text-white">T26</p>
                  <p className="font-mono text-[10px] text-white/40">Transformación</p>
                </div>
              </div>

              {/* Flight details grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06]">
                  <Calendar size={14} className="text-[#E31E24] mb-2" />
                  <p className="font-mono text-[9px] text-white/30 tracking-wider">FECHA</p>
                  <p className="font-display text-sm text-white">01-02 SEP</p>
                  <p className="font-mono text-[9px] text-white/30">2026</p>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06]">
                  <Clock size={14} className="text-[#E31E24] mb-2" />
                  <p className="font-mono text-[9px] text-white/30 tracking-wider">HORA</p>
                  <p className="font-display text-sm text-white">08:00 AM</p>
                  <p className="font-mono text-[9px] text-white/30">Apertura</p>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06]">
                  <MapPin size={14} className="text-[#E31E24] mb-2" />
                  <p className="font-mono text-[9px] text-white/30 tracking-wider">GATE</p>
                  <p className="font-display text-sm text-white">ÁGORA</p>
                  <p className="font-mono text-[9px] text-white/30">Bogotá</p>
                </div>
              </div>

              {/* Passenger name input */}
              <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06]">
                <p className="font-mono text-[9px] text-white/30 tracking-wider mb-2">PASAJERO</p>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Escribe tu nombre..."
                  className="w-full bg-transparent font-display text-xl text-white placeholder:text-white/20 outline-none border-b border-white/10 pb-2 focus:border-[#E31E24] transition-colors"
                />
              </div>

              {/* STAMP — appears on hover */}
              <div
                ref={stampRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0"
              >
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-[#E31E24] flex items-center justify-center bg-[#E31E24]/10 backdrop-blur-sm">
                    <div className="text-center">
                      <Stamp size={24} className="text-[#E31E24] mx-auto mb-1" />
                      <p className="font-display text-sm text-[#E31E24] font-bold">CONFIRMED</p>
                      <p className="font-mono text-[7px] text-[#E31E24]/60">TEMACON 2026</p>
                    </div>
                  </div>
                  {/* Rough stamp edges */}
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-[#E31E24] rounded-full"
                      style={{
                        left: `${50 + 46 * Math.cos((i * 22.5 * Math.PI) / 180)}%`,
                        top: `${50 + 46 * Math.sin((i * 22.5 * Math.PI) / 180)}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ─── PERFORATION ─── */}
            <div className="hidden lg:flex flex-col items-center justify-center relative w-8">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-white/10" />
              {/* Half-circles */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-black rounded-full" />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-black rounded-full" />
            </div>

            {/* ─── RIGHT: Price & Features ─── */}
            <div className="lg:w-[320px] p-6 lg:p-10 bg-gradient-to-br from-[#0d0d0d] to-[#080808] relative">
              {/* Scan line animation */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-r-2xl">
                <div
                  className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#E31E24]/30 to-transparent"
                  style={{ animation: 'scanLine 3s linear infinite' }}
                />
              </div>

              {/* Price */}
              <div className="mb-8">
                <p className="font-mono text-[9px] text-white/30 tracking-wider mb-2">PRECIO GENERAL</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-6xl lg:text-7xl text-white tracking-tight">$2,150</span>
                  <span className="font-mono text-sm text-white/30">USD</span>
                </div>
                <p className="font-mono text-[10px] text-white/20 mt-1">IVA incluido</p>
              </div>

              {/* Features as in-flight services */}
              <div className="mb-8">
                <p className="font-mono text-[9px] text-[#E31E24] tracking-wider mb-4">SERVICIOS A BORDO</p>
                <div className="space-y-3">
                  {FEATURES.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-3 group">
                      <div className="w-7 h-7 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 group-hover:border-[#E31E24]/30 group-hover:bg-[#E31E24]/10 transition-all">
                        <Icon size={13} className="text-white/50 group-hover:text-[#E31E24] transition-colors" />
                      </div>
                      <span className="text-sm text-white/60 group-hover:text-white transition-colors">{label}</span>
                      <CheckCircle2 size={12} className="text-[#E31E24] ml-auto flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button className="w-full py-4 bg-[#E31E24] text-white rounded-xl font-display font-semibold text-base hover:bg-white hover:text-[#E31E24] transition-all duration-300 shadow-lg shadow-[#E31E24]/20 flex items-center justify-center gap-2">
                <QrCode size={18} />
                Reservar Ahora
              </button>

              {/* Barcode */}
              <div className="mt-6 flex flex-col items-center">
                <div className="flex gap-[2px] h-10 items-end">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white/30"
                      style={{
                        width: 2 + Math.random() * 3,
                        height: `${40 + Math.random() * 60}%`,
                      }}
                    />
                  ))}
                </div>
                <p className="font-mono text-[8px] text-white/20 tracking-[0.3em] mt-2">TEMACON2026-BOG-001</p>
              </div>
            </div>
          </div>

          {/* Shadow/reflection below ticket */}
          <div
            className="absolute -bottom-8 left-[5%] right-[5%] h-8 rounded-full blur-xl opacity-30"
            style={{ background: 'radial-gradient(ellipse, rgba(227,30,36,0.3) 0%, transparent 70%)' }}
          />
        </div>

        {/* Trust info */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/20">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-[#E31E24]" />
            <span className="font-mono text-[10px] tracking-wider">PAGO SEGURO</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-[#E31E24]" />
            <span className="font-mono text-[10px] tracking-wider">REEMBOLSO HASTA 30 DÍAS ANTES</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-[#E31E24]" />
            <span className="font-mono text-[10px] tracking-wider">FACTURA INCLUIDA</span>
          </div>
        </div>
      </div>

      {/* Scan line keyframe */}
      <style>{`
        @keyframes scanLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </section>
  );
}
