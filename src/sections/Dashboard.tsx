import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingDown, TrendingUp, Truck, Cpu, MapPin, Calendar, Plane } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let i = 0;
    const interval = setInterval(() => { if (i < target) setCount(++i); else clearInterval(interval); }, 20);
    return () => clearInterval(interval);
  }, [isVisible, target]);
  return <span className="tabular-nums">{count}{suffix}</span>;
}

/* ─── Metric Card ─── */
function MetricCard({ icon, label, value, suffix, trend, trendLabel, isVisible }: any) {
  return (
    <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6 lg:p-8 hover:border-[#E31E24]/50 transition-all duration-500 group">
      <div className="flex items-center justify-between mb-6">
        <div className="w-12 h-12 bg-[#E31E24]/10 rounded-xl flex items-center justify-center text-[#E31E24] group-hover:bg-[#E31E24] group-hover:text-white transition-all duration-500">{icon}</div>
        <div className={`flex items-center gap-1 text-sm font-mono ${trend === 'up' ? 'text-green-400' : 'text-[#E31E24]'}`}>
          {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}{trendLabel}
        </div>
      </div>
      <p className="font-mono text-xs text-white/40 uppercase tracking-wider mb-2">{label}</p>
      <p className="font-display text-t4 text-white"><AnimatedCounter target={value} suffix={suffix} isVisible={isVisible} /></p>
    </div>
  );
}

/* ─── Colombia Sede Info ─── */

/* ─── Panel de Control de Tráfico (White Background) ─── */
const PLACA_POOL = [
  { placa: 'SZX-2847', origen: 'Bogotá', destino: 'Medellín' },
  { placa: 'SZW-4451', origen: 'Cartagena', destino: 'Cali' },
  { placa: 'TRX-1103', origen: 'Bucaramanga', destino: 'Bogotá' },
  { placa: 'KWX-5532', origen: 'Cali', destino: 'Barranquilla' },
  { placa: 'MXT-9981', origen: 'Medellín', destino: 'Cartagena' },
  { placa: 'SZA-3209', origen: 'Pereira', destino: 'Bogotá' },
  { placa: 'CRX-7721', origen: 'Manizales', destino: 'Bogotá' },
  { placa: 'QWX-8834', origen: 'Armenia', destino: 'Medellín' },
];

function useRotatingVehicles() {
  const [vehiculos, setVehiculos] = useState(PLACA_POOL.slice(0, 6));
  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % (PLACA_POOL.length - 5);
      setVehiculos(PLACA_POOL.slice(idx, idx + 6));
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  const estados = ['En ruta', 'En ruta', 'Mantenimiento', 'En ruta', 'En ruta', 'Alerta'];
  return vehiculos.map((v, i) => ({
    ...v,
    estado: estados[i] || 'En ruta',
    confiabilidad: `${(88 + Math.random() * 12).toFixed(1)}%`,
    temp: `${Math.floor(78 + Math.random() * 20)}°C`,
    presion: `${Math.floor(95 + Math.random() * 20)} PSI`,
  }));
}

function getEstadoColor(estado: string) {
  switch (estado) {
    case 'En ruta': return 'bg-green-100 text-green-700 border-green-200';
    case 'Mantenimiento': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Alerta': return 'bg-red-100 text-red-700 border-red-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
}

function TrafficControl() {
  const vehiculos = useRotatingVehicles();
  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#E31E24] rounded-xl flex items-center justify-center">
            <Truck size={20} className="text-white" />
          </div>
          <div>
            <p className="font-mono text-xs text-gray-400 uppercase tracking-wider">Control de Tráfico</p>
            <p className="font-display text-lg text-gray-900">Flota en Tiempo Real</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="font-mono text-xs text-green-600">LIVE</span>
        </div>
      </div>

      {/* Stats summary */}
      <div className="flex gap-4 mb-6">
        {[
          { label: 'En ruta', value: '4', color: 'text-green-600 bg-green-50' },
          { label: 'Mantenimiento', value: '1', color: 'text-amber-600 bg-amber-50' },
          { label: 'Alerta', value: '1', color: 'text-red-600 bg-red-50' },
        ].map((s) => (
          <div key={s.label} className={`${s.color} rounded-lg px-3 py-2 flex-1 text-center`}>
            <p className="font-display text-lg font-semibold">{s.value}</p>
            <p className="font-mono text-[10px] uppercase tracking-wider opacity-70">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-3 font-mono text-[10px] text-gray-400 uppercase tracking-wider">Placa</th>
              <th className="text-left py-2 px-3 font-mono text-[10px] text-gray-400 uppercase tracking-wider">Origen</th>
              <th className="text-left py-2 px-3 font-mono text-[10px] text-gray-400 uppercase tracking-wider">Destino</th>
              <th className="text-left py-2 px-3 font-mono text-[10px] text-gray-400 uppercase tracking-wider">Estado</th>
              <th className="text-left py-2 px-3 font-mono text-[10px] text-gray-400 uppercase tracking-wider hidden lg:table-cell">Confiab.</th>
              <th className="text-left py-2 px-3 font-mono text-[10px] text-gray-400 uppercase tracking-wider hidden lg:table-cell">Temp.</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map((v) => (
              <tr key={v.placa} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-3">
                  <span className="font-mono text-sm font-semibold text-gray-900">{v.placa}</span>
                </td>
                <td className="py-3 px-3">
                  <span className="text-sm text-gray-600">{v.origen}</span>
                </td>
                <td className="py-3 px-3">
                  <span className="text-sm text-gray-600">{v.destino}</span>
                </td>
                <td className="py-3 px-3">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-mono border ${getEstadoColor(v.estado)}`}>
                    {v.estado}
                  </span>
                </td>
                <td className="py-3 px-3 hidden lg:table-cell">
                  <span className="font-mono text-sm text-gray-700">{v.confiabilidad}</span>
                </td>
                <td className="py-3 px-3 hidden lg:table-cell">
                  <span className={`font-mono text-sm ${parseInt(v.temp) > 90 ? 'text-red-600' : 'text-gray-700'}`}>{v.temp}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <span className="font-mono text-[10px] text-gray-400">Última actualización: hace 12 segundos</span>
        <span className="font-mono text-[10px] text-gray-400">6 unidades monitoreadas</span>
      </div>
    </div>
  );
}

/* ─── Main Dashboard ─── */
export default function Dashboard() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: sectionRef.current, start: 'top 70%', onEnter: () => setIsVisible(true) });
      gsap.from(titleRef.current, { scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }, y: 40, opacity: 0, duration: 0.8, ease: 'power2.out' });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="dashboard" ref={sectionRef} className="bg-black page-padding overflow-hidden">
      <div className="wrapper">
        <div ref={titleRef} className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-t2 text-white">Centro de Control de Flotas</h2>
          <p className="mt-4 text-base text-white/50 max-w-2xl mx-auto">
            Métricas en vivo del impacto de TEMACON en el transporte de carga latinoamericano.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
          <MetricCard icon={<TrendingDown size={24} />} label="Reducción Downtime" value={43} suffix="%" trend="down" trendLabel="-15% vs 2025" isVisible={isVisible} />
          <MetricCard icon={<TrendingUp size={24} />} label="Eficiencia Combustible" value={28} suffix="%" trend="up" trendLabel="+9% vs 2025" isVisible={isVisible} />
          <MetricCard icon={<Truck size={24} />} label="ROI en Flotas" value={180} suffix="%" trend="up" trendLabel="+38% vs 2025" isVisible={isVisible} />
          <MetricCard icon={<Cpu size={24} />} label="Flotas Conectadas" value={94} suffix="%" trend="up" trendLabel="+16% vs 2025" isVisible={isVisible} />
        </div>

        {/* Sede + Traffic Control */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Colombia Sede Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-mono text-xs text-gray-400 uppercase tracking-wider">Sede del Evento</p>
                <p className="font-display text-2xl text-gray-900 mt-1">Colombia</p>
                <p className="font-mono text-xs text-[#E31E24] mt-1">Primera Edición · TEMACON 2026</p>
              </div>
              <div className="w-12 h-12 bg-[#E31E24] rounded-full flex items-center justify-center shadow-lg">
                <MapPin size={22} className="text-white" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-[#E31E24]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-[#E31E24]" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">Venue</p>
                  <p className="text-sm text-gray-900 font-medium">Centro de Convenciones Ágora, Bogotá</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-[#E31E24]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar size={18} className="text-[#E31E24]" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">Fechas</p>
                  <p className="text-sm text-gray-900 font-medium">1-2 de Septiembre, 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-[#E31E24]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Plane size={18} className="text-[#E31E24]" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">Aeropuerto</p>
                  <p className="text-sm text-gray-900 font-medium">El Dorado (BOG) · 15 min del venue</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Bogotá', 'CDMX', 'Lima', 'Santiago', 'Buenos Aires', 'São Paulo'].map((city) => (
                <span key={city} className={`font-mono text-[10px] px-2 py-1 rounded-full ${city === 'Bogotá' ? 'bg-[#E31E24] text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* Traffic Control Panel — White Background */}
          <TrafficControl />
        </div>
      </div>
    </section>
  );
}
