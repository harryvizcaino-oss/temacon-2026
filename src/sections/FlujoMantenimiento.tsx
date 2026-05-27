import { useEffect, useRef, useState, useCallback } from 'react';
import { AlertTriangle, Warehouse, Wrench, Cpu, ShieldCheck, Route, Radio, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   FLUJO DE MANTENIMIENTO — MODERN BOARD
   Desktop: Canvas con partículas animadas
   Mobile: Lista vertical apilada
   ═══════════════════════════════════════════════════════════════ */

interface NodoFlujo {
  id: string;
  titulo: string;
  icono: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  x: number;
  y: number;
  color: string;
  estado: string;
  metricas: { label: string; value: string }[];
}

const NODOS: NodoFlujo[] = [
  { id: 'falla', titulo: 'FALLA REPORTADA', icono: AlertTriangle, x: 0.08, y: 0.25, color: '#E31E24', estado: 'CRÍTICO', metricas: [{ label: 'Alerta', value: 'P0B45' }, { label: 'Unidad', value: 'KW-4451' }] },
  { id: 'taller', titulo: 'INGRESO TALLER', icono: Warehouse, x: 0.25, y: 0.65, color: '#FF8800', estado: 'RECIBIDO', metricas: [{ label: 'Taller', value: 'TEM-01' }, { label: 'ETA', value: '8 min' }] },
  { id: 'diagnostico', titulo: 'DIAGNÓSTICO', icono: Wrench, x: 0.42, y: 0.25, color: '#4A90C4', estado: 'ANALIZANDO', metricas: [{ label: 'Sensores', value: '12/12 OK' }, { label: 'Presión', value: '85 PSI' }] },
  { id: 'tecnologia', titulo: 'IoT + TELEMÁTICA', icono: Cpu, x: 0.59, y: 0.65, color: '#00C853', estado: 'CONECTANDO', metricas: [{ label: 'Señal', value: '-67 dBm' }, { label: 'Latencia', value: '12 ms' }] },
  { id: 'pruebas', titulo: 'PRUEBAS OK', icono: ShieldCheck, x: 0.76, y: 0.25, color: '#00B0FF', estado: 'VERIFICADO', metricas: [{ label: 'Tests', value: '15/15 ✓' }, { label: 'Confiab.', value: '99.7%' }] },
  { id: 'ruta', titulo: 'SALE A RUTA', icono: Route, x: 0.93, y: 0.65, color: '#76FF03', estado: 'OPERATIVO', metricas: [{ label: 'Downtime', value: '-43%' }, { label: 'Status', value: 'ONLINE' }] },
];

const CONEXIONES = [
  { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 },
  { from: 3, to: 4 }, { from: 4, to: 5 },
];

interface ParticulaFlujo {
  x: number; y: number; fromX: number; fromY: number; toX: number; toY: number;
  progress: number; speed: number; color: string; size: number; connectionIndex: number;
}

function MiniDashboardNode({ nodo, isActive, index }: { nodo: NodoFlujo; isActive: boolean; index: number }) {
  const Icon = nodo.icono;
  return (
    <div className={`relative flex flex-col items-center gap-2 transition-all duration-700 ${isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-40'}`}>
      {isActive && (
        <div className="absolute -inset-4 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl border-2 opacity-0" style={{ color: nodo.color, animation: `signalWave 2s ease-out ${index * 0.3}s infinite` }} />
        </div>
      )}
      <div className="relative bg-[#0d0d0d] border rounded-xl p-3 lg:p-4 w-full max-w-[180px] lg:w-[180px]" style={{ borderColor: isActive ? nodo.color : '#333', boxShadow: isActive ? `0 0 20px ${nodo.color}30, inset 0 0 20px ${nodo.color}08` : 'none' }}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: nodo.color, boxShadow: `0 0 6px ${nodo.color}` }} />
            <span className="font-mono text-[9px] lg:text-[10px] tracking-wider" style={{ color: nodo.color }}>{nodo.estado}</span>
          </div>
          <Radio size={10} className="text-white/20" />
        </div>
        <div className="flex justify-center my-2 lg:my-3">
          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${nodo.color}15` }}>
            <Icon size={20} className="lg:w-6 lg:h-6" style={{ color: nodo.color }} />
          </div>
        </div>
        <h4 className="font-display text-[10px] lg:text-xs text-white text-center leading-tight mb-2">{nodo.titulo}</h4>
        <div className="space-y-1">
          {nodo.metricas.map((m) => (
            <div key={m.label} className="flex items-center justify-between">
              <span className="font-mono text-[8px] lg:text-[9px] text-white/30">{m.label}</span>
              <span className="font-mono text-[9px] lg:text-[10px]" style={{ color: nodo.color }}>{m.value}</span>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full" style={{ backgroundColor: nodo.color, opacity: isActive ? 0.6 : 0.1, boxShadow: isActive ? `0 0 8px ${nodo.color}` : 'none' }} />
      </div>
    </div>
  );
}

/* ─── Mobile vertical step card ─── */
function MobileStep({ nodo, index, isLast }: { nodo: NodoFlujo; index: number; isLast: boolean }) {
  const Icon = nodo.icono;
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-full bg-[#111] border rounded-xl p-4 relative overflow-hidden"
        style={{ borderColor: nodo.color + '40', boxShadow: `0 0 15px ${nodo.color}15` }}
      >
        {/* Pulse glow */}
        <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full animate-pulse" style={{ background: `radial-gradient(circle, ${nodo.color}20 0%, transparent 70%)` }} />

        <div className="flex items-center gap-3 relative z-10">
          {/* Step number */}
          <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${nodo.color}20`, border: `1px solid ${nodo.color}40` }}>
            <Icon size={18} style={{ color: nodo.color }} />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: nodo.color }} />
              <span className="font-mono text-[9px] tracking-wider" style={{ color: nodo.color }}>{nodo.estado}</span>
            </div>
            <h4 className="font-display text-sm text-white">{nodo.titulo}</h4>
          </div>

          {/* Metrics */}
          <div className="text-right flex-shrink-0">
            {nodo.metricas.map((m) => (
              <div key={m.label} className="flex items-center gap-2 justify-end">
                <span className="font-mono text-[8px] text-white/30">{m.label}</span>
                <span className="font-mono text-[10px]" style={{ color: nodo.color }}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ backgroundColor: nodo.color, opacity: 0.4 }} />
      </div>

      {/* Arrow down (if not last) */}
      {!isLast && (
        <div className="flex flex-col items-center py-2">
          <div className="w-px h-6" style={{ background: `linear-gradient(to bottom, ${nodo.color}60, ${NODOS[index + 1].color}60)` }} />
          <ChevronDown size={16} style={{ color: NODOS[index + 1].color }} />
          <div className="w-px h-2" style={{ backgroundColor: `${NODOS[index + 1].color}40` }} />
        </div>
      )}
    </div>
  );
}

export default function FlujoMantenimiento() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const particlesRef = useRef<ParticulaFlujo[]>([]);
  const nodePositionsRef = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const updateNodePositions = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    nodePositionsRef.current = NODOS.map((n) => ({ x: n.x * rect.width, y: n.y * rect.height }));
  }, []);

  /*─── Desktop Canvas Animation ───*/
  useEffect(() => {
    if (isMobile) return; // Skip canvas on mobile
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      updateNodePositions();
    };

    resize();
    window.addEventListener('resize', resize);

    const spawnParticle = (connIdx: number) => {
      const conn = CONEXIONES[connIdx];
      const pos = nodePositionsRef.current;
      if (!pos[conn.from] || !pos[conn.to]) return;
      const colors = ['#E31E24', '#FF8800', '#4A90C4', '#00C853', '#00B0FF', '#76FF03', '#ffffff', '#E31E24', '#ffffff'];
      particlesRef.current.push({
        x: pos[conn.from].x, y: pos[conn.from].y,
        fromX: pos[conn.from].x, fromY: pos[conn.from].y,
        toX: pos[conn.to].x, toY: pos[conn.to].y,
        progress: 0, speed: 0.006 + Math.random() * 0.008,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 2 + Math.random() * 3, connectionIndex: connIdx,
      });
    };

    let lastSpawn = 0;

    const animate = (time: number) => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      const pos = nodePositionsRef.current;
      if (pos.length === 0) { animFrame = requestAnimationFrame(animate); return; }

      // Draw connection lines
      CONEXIONES.forEach((conn, ci) => {
        const from = pos[conn.from]; const to = pos[conn.to];
        if (!from || !to) return;
        ctx.beginPath(); ctx.moveTo(from.x, from.y); ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = 'rgba(227, 30, 36, 0.2)'; ctx.lineWidth = 3; ctx.stroke();
        const dashOffset = -(time * 0.08 + ci * 50) % 40;
        ctx.beginPath(); ctx.setLineDash([10, 10]); ctx.lineDashOffset = dashOffset;
        ctx.moveTo(from.x, from.y); ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = 'rgba(227, 30, 36, 0.5)'; ctx.lineWidth = 2; ctx.stroke(); ctx.setLineDash([]);
        const midX = (from.x + to.x) / 2; const midY = (from.y + to.y) / 2;
        const angle = Math.atan2(to.y - from.y, to.x - from.x);
        ctx.save(); ctx.translate(midX, midY); ctx.rotate(angle);
        ctx.beginPath(); ctx.moveTo(-8, -5); ctx.lineTo(0, 0); ctx.lineTo(-8, 5);
        ctx.strokeStyle = `rgba(227, 30, 36, ${0.3 + Math.sin(time * 0.003 + ci) * 0.2})`; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
        if (isVisible) {
          const glowRadius = 8 + Math.sin(time * 0.004 + ci * 2) * 4;
          const gradient = ctx.createRadialGradient(to.x, to.y, 0, to.x, to.y, glowRadius * 2);
          gradient.addColorStop(0, `rgba(227, 30, 36, ${0.15 + Math.sin(time * 0.003 + ci) * 0.1})`);
          gradient.addColorStop(1, 'rgba(227, 30, 36, 0)');
          ctx.beginPath(); ctx.arc(to.x, to.y, glowRadius * 2, 0, Math.PI * 2);
          ctx.fillStyle = gradient; ctx.fill();
        }
      });

      if (time - lastSpawn > 300) {
        for (let i = 0; i < 4; i++) spawnParticle(Math.floor(Math.random() * CONEXIONES.length));
        lastSpawn = time;
      }

      particlesRef.current = particlesRef.current.filter((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) return false;
        const ease = p.progress < 0.5 ? 4 * p.progress * p.progress * p.progress : 1 - Math.pow(-2 * p.progress + 2, 3) / 2;
        p.x = p.fromX + (p.toX - p.fromX) * ease;
        p.y = p.fromY + (p.toY - p.fromY) * ease;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 5);
        gradient.addColorStop(0, p.color + 'DD'); gradient.addColorStop(0.3, p.color + '66'); gradient.addColorStop(1, p.color + '00');
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2); ctx.fillStyle = gradient; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fillStyle = '#ffffff'; ctx.fill();
        const trailLength = 20;
        const dx = (p.toX - p.fromX) * p.speed * trailLength;
        const dy = (p.toY - p.fromY) * p.speed * trailLength;
        const gradient2 = ctx.createLinearGradient(p.x, p.y, p.x - dx, p.y - dy);
        gradient2.addColorStop(0, p.color + 'CC'); gradient2.addColorStop(1, p.color + '00');
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - dx, p.y - dy);
        ctx.strokeStyle = gradient2; ctx.lineWidth = p.size; ctx.stroke();
        return true;
      });

      CONEXIONES.forEach((conn, ci) => {
        const from = pos[conn.from]; const to = pos[conn.to];
        if (!from || !to) return;
        const t = (Math.sin(time * 0.002 + ci * 1.5) + 1) / 2;
        const lx = from.x + (to.x - from.x) * t; const ly = from.y + (to.y - from.y) * t;
        const labels = ['DATA', 'SYNC', 'ALERT', 'OK', 'PING', 'LIVE'];
        ctx.save(); ctx.font = 'bold 10px "IBM Plex Mono", monospace';
        ctx.fillStyle = `rgba(227, 30, 36, ${0.25 + Math.sin(time * 0.004 + ci) * 0.15})`;
        ctx.textAlign = 'center'; ctx.fillText(labels[ci], lx, ly - 10); ctx.restore();
      });

      animFrame = requestAnimationFrame(animate);
    };

    animFrame = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(animFrame); window.removeEventListener('resize', resize); };
  }, [updateNodePositions, isVisible, isMobile]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.2 });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="flujo" ref={sectionRef} className="bg-[#0a0a0a] page-padding overflow-hidden relative">
      <style>{`
        @keyframes signalWave { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.5); opacity: 0; } }
      `}</style>
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(227,30,36,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(227,30,36,0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      <div className="wrapper relative">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-2 h-2 bg-[#E31E24] rounded-full animate-pulse" />
            <span className="font-mono text-xs text-[#E31E24] uppercase tracking-[0.3em]">Sistema en Vivo · TEMACON v2026</span>
          </div>
          <h2 className="font-display text-2xl sm:text-t2 text-white">Flujo de Mantenimiento Inteligente</h2>
          <p className="mt-4 text-sm sm:text-base text-white/40 max-w-2xl mx-auto px-4">
            Señales de datos viajando en tiempo real a través del proceso completo de mantenimiento predictivo del transporte de carga.
          </p>
        </div>

        {/* ═══ MOBILE: Vertical Steps ═══ */}
        {isMobile && (
          <div className="flex flex-col items-center max-w-sm mx-auto">
            {NODOS.map((nodo, i) => (
              <MobileStep key={nodo.id} nodo={nodo} index={i} isLast={i === NODOS.length - 1} />
            ))}
          </div>
        )}

        {/* ═══ DESKTOP: Canvas Flow ═══ */}
        {!isMobile && (
          <div ref={containerRef} className="relative w-full overflow-x-auto overflow-y-hidden" style={{ height: '500px', minWidth: '900px' }}>
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />
            <div className="absolute inset-0" style={{ zIndex: 2 }}>
              {NODOS.map((nodo, i) => (
                <div key={nodo.id} className="absolute" style={{ left: `${nodo.x * 100}%`, top: `${nodo.y * 100}%`, transform: 'translate(-50%, -50%)' }}>
                  <MiniDashboardNode nodo={nodo} isActive={isVisible} index={i} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Metrics Bar */}
        <div className="mt-6 sm:mt-8 lg:mt-12 grid grid-cols-2 lg:grid-cols-6 gap-2 sm:gap-3">
          {[
            { label: 'Flujo de Datos', value: '1,247 pkt/s', color: '#E31E24' },
            { label: 'Latencia Red', value: '12 ms', color: '#FF8800' },
            { label: 'Sensores Activos', value: '847/847', color: '#4A90C4' },
            { label: 'Conexión IoT', value: '5G · -67dBm', color: '#00C853' },
            { label: 'Confiabilidad', value: '99.7%', color: '#00B0FF' },
            { label: 'Uptime Flota', value: '99.2%', color: '#76FF03' },
          ].map((m) => (
            <div key={m.label} className="bg-[#111] border border-[#222] rounded-xl p-2 sm:p-3 text-center">
              <p className="font-mono text-[8px] sm:text-[10px] text-white/30 uppercase tracking-wider mb-1">{m.label}</p>
              <p className="font-display text-xs sm:text-sm lg:text-base" style={{ color: m.color }}>{m.value}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 sm:mt-12 text-center">
          <a href="#register" className="inline-flex items-center gap-2 bg-[#E31E24] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-display text-sm sm:text-lg font-semibold hover:bg-white hover:text-[#E31E24] transition-all duration-300 shadow-lg shadow-[#E31E24]/20">
            <Cpu size={18} className="sm:w-5 sm:h-5" />Implementa este flujo en tu flota
          </a>
        </div>
      </div>
    </section>
  );
}
