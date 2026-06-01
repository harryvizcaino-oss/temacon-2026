import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Users, Wrench, ShoppingCart, Factory, ClipboardList,
  Settings2, Truck, TrendingUp, Laptop, Briefcase,
  RotateCcw, Package, Sparkles,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   PERFIL DEL ASISTENTE — 12 profiles from TEMACON
   ═══════════════════════════════════════════════════════════════ */

interface Profile {
  role: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const PROFILES: Profile[] = [
  { role: 'Gerentes de Mantenimiento', icon: Wrench },
  { role: 'Jefes de Compras', icon: ShoppingCart },
  { role: 'Jefes de Taller', icon: Factory },
  { role: 'Coordinadores de Activos', icon: ClipboardList },
  { role: 'Técnicos Especializados', icon: Settings2 },
  { role: 'Jefes de Flota', icon: Truck },
  { role: 'Directores de Productividad', icon: TrendingUp },
  { role: 'Jefes de Tecnología', icon: Laptop },
  { role: 'Gerentes de Operaciones', icon: Briefcase },
  { role: 'Jefes de Mejora Continua', icon: RotateCcw },
  { role: 'Coordinadores de Abastecimiento', icon: Package },
  { role: 'Líderes de Transformación Digital', icon: Sparkles },
];

export default function Audience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
      });
      gsap.from('.profile-card', {
        scrollTrigger: { trigger: gridRef.current, start: 'top 95%' },
        y: 30, stagger: 0.05, duration: 0.4, ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="audience"
      ref={sectionRef}
      className="relative bg-[#f2f2f2] overflow-hidden"
      data-nav-light
      style={{ paddingTop: 80, paddingBottom: 80 }}
    >
      <div className="relative z-10 wrapper px-5">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Users size={16} className="text-[#E31E24]" />
            <p className="font-mono text-[10px] tracking-[0.4em] text-[#E31E24] uppercase">
              Networking de Alto Nivel
            </p>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-black tracking-tight">
            Perfil del <span className="text-[#E31E24]">Asistente</span>
          </h2>
          <p className="mt-3 text-sm text-black/40 max-w-lg mx-auto">
            12 perfiles profesionales que tomarán decisiones en TEMACON 2026.
          </p>
        </div>

        {/* 12 Profile Cards — 3x4 grid */}
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 max-w-[900px] mx-auto">
          {PROFILES.map((profile) => {
            const Icon = profile.icon;
            return (
              <div
                key={profile.role}
                className="profile-card group bg-white rounded-2xl border border-black/[0.06] p-5 sm:p-6 flex flex-col items-center text-center hover:border-[#E31E24]/30 hover:shadow-[0_4px_20px_rgba(227,30,36,0.08)] transition-all duration-300"
              >
                {/* Icon in circle */}
                <div className="relative mb-4">
                  {/* Outer ring */}
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-2 border-[#E31E24]/20 flex items-center justify-center group-hover:border-[#E31E24]/50 transition-all duration-300">
                    {/* Inner circle */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#E31E24]/5 flex items-center justify-center">
                      <Icon size={22} className="text-[#E31E24]" />
                    </div>
                  </div>
                  {/* Decorative dot */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#E31E24] rounded-full" />
                </div>

                {/* Role name */}
                <h3 className="font-display text-xs sm:text-sm text-black leading-tight group-hover:text-[#E31E24] transition-colors">
                  {profile.role}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Bottom stats */}
        <div className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          <div className="text-center">
            <p className="font-display text-3xl text-black">400+</p>
            <p className="font-mono text-[9px] text-black/30 uppercase tracking-wider mt-1">Profesionales</p>
          </div>
          <div className="w-px h-8 bg-black/10" />
          <div className="text-center">
            <p className="font-display text-3xl text-[#E31E24]">12</p>
            <p className="font-mono text-[9px] text-black/30 uppercase tracking-wider mt-1">Perfiles</p>
          </div>
          <div className="w-px h-8 bg-black/10" />
          <div className="text-center">
            <p className="font-display text-3xl text-black">85%</p>
            <p className="font-mono text-[9px] text-black/30 uppercase tracking-wider mt-1">Deciden compras</p>
          </div>
          <div className="w-px h-8 bg-black/10" />
          <div className="text-center">
            <p className="font-display text-3xl text-black">6</p>
            <p className="font-mono text-[9px] text-black/30 uppercase tracking-wider mt-1">Paises</p>
          </div>
        </div>
      </div>
    </section>
  );
}
