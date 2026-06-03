import { useCountdown } from '@/hooks/useCountdown';
import { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import {
  Truck, Cpu, Wrench, ShieldCheck, Route, Radio, Zap, Activity,
} from 'lucide-react';
import AutopartParticles from '@/components/AutopartParticles';
import AddToCalendar from '@/components/AddToCalendar';

const TARGET_DATE = new Date('2026-09-01T08:00:00');
function pad(n: number) { return n.toString().padStart(2, '0'); }

/* ═══════════════════════════════════════════
   BOUNCING TECH ICONS
   ═══════════════════════════════════════════ */

interface BouncingIcon {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  startX: string;
  startY: string;
  dx: number;
  dy: number;
  duration: number;
  size: number;
}

const BOUNCING_ICONS: BouncingIcon[] = [
  { Icon: Truck,    label: 'TRANSPORTE',    startX: '5%',  startY: '20%', dx: 40, dy: 30,  duration: 18, size: 22 },
  { Icon: Cpu,      label: 'TECNOLOGÍA',    startX: '85%', startY: '15%', dx: -35, dy: 25, duration: 22, size: 20 },
  { Icon: Wrench,   label: 'MANTENIMIENTO', startX: '10%', startY: '70%', dx: 30, dy: -20, duration: 20, size: 18 },
  { Icon: ShieldCheck, label: 'CONFIABILIDAD', startX: '75%', startY: '75%', dx: -25, dy: -30, duration: 24, size: 20 },
  { Icon: Route,    label: 'RUTAS',         startX: '90%', startY: '45%', dx: -40, dy: 15, duration: 19, size: 16 },
  { Icon: Radio,    label: 'COMUNICACIÓN',  startX: '8%',  startY: '45%', dx: 35, dy: -15, duration: 21, size: 16 },
  { Icon: Zap,      label: 'EFICIENCIA',    startX: '30%', startY: '85%', dx: 20, dy: -35, duration: 23, size: 18 },
  { Icon: Activity, label: 'MONITOREO',     startX: '60%', startY: '88%', dx: -20, dy: -25, duration: 17, size: 16 },
];

function BouncingSquare({ icon, duration, delay = 0 }: { icon: BouncingIcon; duration: number; delay?: number }) {
  const { Icon, label, startX, startY, dx, dy, size } = icon;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el, { left: startX, top: startY, x: 0, y: 0 },
      { x: dx * 5, y: dy * 5, duration, ease: 'none', repeat: -1, yoyo: true, delay });
  }, [startX, startY, dx, dy, duration, delay]);

  return (
    <div ref={ref} className="absolute z-20 hidden sm:flex flex-col items-center group"
      style={{ left: startX, top: startY, transform: 'translate(-50%, -50%)' }}>
      <div className="relative">
        <div className="absolute -inset-2 bg-[#E31E24]/15 rounded-xl blur-md group-hover:bg-[#E31E24]/30 transition-all" />
        <div className="relative w-14 h-14 lg:w-14 lg:h-14 bg-[#0a0a0a] border-2 border-[#E31E24] rounded-xl flex items-center justify-center shadow-lg shadow-[#E31E24]/30 group-hover:shadow-[#E31E24]/60 group-hover:scale-110 transition-all duration-300">
          <Icon size={size} className="text-[#E31E24]" />
        </div>
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#E31E24] rounded-full animate-pulse" />
      </div>
      <span className="font-mono text-[6px] lg:text-[7px] text-white/40 tracking-wider mt-2 bg-black/70 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

const Hero3D = memo(function Hero3D() {
  const timeLeft = useCountdown(TARGET_DATE);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        y: 60, opacity: 0, scale: 0.85,
        duration: 1.2, ease: 'power3.out', delay: 0.3,
      });
    });
    return () => { ctx.revert(); };
  }, []);

  return (
    <section id="hero" className="relative flex flex-col items-center bg-black" style={{ height: '92dvh', minHeight: '620px' }}>
      {/* Autopartículas 3D — z-index 1, recibe mouse/touch */}
      <div className="absolute inset-0 z-[1]" style={{ pointerEvents: 'auto' }}>
        <AutopartParticles />
      </div>

      {/* Bouncing squares — z-index 2 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
        {BOUNCING_ICONS.map((icon, i) => (
          <BouncingSquare key={icon.label} icon={icon} duration={icon.duration} delay={i * 0.5} />
        ))}
      </div>

      {/* ─── CONTENT — flexbox, pointer-events-none para que el canvas reciba mouse/click ─── */}
      <div className="relative z-10 flex flex-col items-center h-full w-full px-4" style={{ pointerEvents: 'none' }}>

        {/* Spacer para menú fijo */}
        <div className="shrink-0" style={{ height: '70px' }} />

        {/* TOP: Countdown */}
        <div className="shrink-0 flex flex-col items-center text-center mb-2">
          <p className="font-mono text-[10px] lg:text-xs tracking-[0.3em] text-white/40 uppercase mb-1">
            1-2 Septiembre 2026 · Bogotá, Colombia
          </p>
          <div className="flex items-center gap-2 sm:gap-3">
            {[
              { v: pad(timeLeft.days), l: 'DÍAS' },
              { v: pad(timeLeft.hours), l: 'HRS' },
              { v: pad(timeLeft.minutes), l: 'MIN' },
              { v: pad(timeLeft.seconds), l: 'SEG' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-center min-w-[36px] sm:min-w-[44px]">
                  <span className="font-display text-base sm:text-lg lg:text-xl text-white tabular-nums leading-none">{item.v}</span>
                  <p className="font-mono text-[5px] sm:text-[6px] text-white/30 uppercase tracking-wider">{item.l}</p>
                </div>
                {i < 3 && <span className="text-white/20 text-sm">:</span>}
              </div>
            ))}
          </div>
          <div className="mt-1" style={{ pointerEvents: 'auto' }}>
            <AddToCalendar variant="pill" />
          </div>
        </div>

        {/* CENTER: Logo — grande pero que deje espacio al CTA */}
        <div className="flex-1 flex items-center justify-center w-full min-h-0 my-2">
          <div ref={logoRef}>
            <img
              src="/logo-v2.png"
              alt="TEMACON 2026"
              className="w-[70vw] sm:w-[50vw] lg:w-[36vw] max-w-[480px] object-contain"
              style={{ filter: 'drop-shadow(0 4px 40px rgba(227,30,36,0.5))' }}
            />
          </div>
        </div>

        {/* Aliados barra */}
        <div className="shrink-0 mb-2">
          <div className="bg-white/95 rounded-lg px-4 py-2 shadow-lg">
            <img
              src="/aliados-organiza.png"
              alt="Aliados Estratégicos: LOGYCA, FEDETRANSCARGA, 10 años de historia · Organiza: TIENDACAMION"
              className="w-[70vw] sm:w-[50vw] lg:w-[30vw] max-w-[420px] object-contain"
              style={{ maxHeight: '55px' }}
              loading="lazy"
            />
          </div>
        </div>

        {/* BOTTOM: ES HORA DE + CTA */}
        <div className="shrink-0 flex flex-col items-center text-center pb-5">
          <h1 className="font-display text-xl sm:text-3xl lg:text-4xl text-white leading-tight mb-1">
            ES HORA DE <span className="text-[#E31E24]">TRANSFORMAR</span>
          </h1>
          <p className="font-mono text-[8px] sm:text-[9px] lg:text-[10px] text-white/30 tracking-wider mb-2">
            TECNOLOGÍA · MANTENIMIENTO · CONFIABILIDAD · TRANSPORTE DE CARGA
          </p>
          <a
            href="#pricing"
            className="bg-[#E31E24] text-white px-5 sm:px-8 py-2.5 rounded-full font-display text-sm sm:text-base font-semibold hover:bg-white hover:text-[#E31E24] transition-all duration-300 shadow-lg shadow-[#E31E24]/30"
            style={{ pointerEvents: 'auto' }}
          >
            Adquirir Ingreso Ahora
          </a>
        </div>

      </div>
    </section>
  );
});

export default Hero3D;
