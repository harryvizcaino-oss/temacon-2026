import { memo } from 'react';

/* ═══════════════════════════════════════════
   HASHTAG MARQUEE — SEO + Visual break
   100+ hashtags de transporte de carga
   ═══════════════════════════════════════════ */

const HASHTAGS = [
  // Nucleo TEMACON
  '#TEMACON2026', '#TEMACON', '#Tiendacamion', '#TransporteDeCarga', '#TecnologiaCamiones',
  '#MantenimientoVehicular', '#ConfiabilidadVehicular', '#FlotasConectadas', '#Telematica',
  '#MantenimientoPredictivo', '#IA', '#Bogota', '#Colombia',
  // Mantenimiento
  '#MantenimientoPreventivo', '#MantenimientoCorrectivo', '#RCM', '#GestionDeFlotas',
  '#KPIs', '#CostoPorKilometro', '#CPK', '#VidaUtil', '#Downtime',
  '#DiagnosticoElectronico', '#Scanner', '#Fallas', '#Reparaciones',
  // Tecnologia
  '#IoT', '#InteligenciaArtificial', '#BigData', '#MachineLearning',
  '#VehiculosConectados', '#GPS', '#RastreoSatelital', '#Sensores',
  '#SoftwareDeFlotas', '#Digitalizacion', '#TransformacionDigital',
  // Componentes
  '#Llantas', '#Frenos', '#Suspension', '#Motor', '#Transmision',
  '#SistemaSCR', '#AdBlue', '#Escape', '#FiltroDeParticulas',
  '#Lubricantes', '#Aceite', '#Refrigerante', '#Baterias',
  // Sector
  '#TransporteDeCarga', '#Camiones', '#Tractocamion', '#CargaPesada',
  '#Logistica', '#CadenaDeSuministro', '#OperadorLogistico',
  '#IndustriaCamionera', '#SectorTransporte', '#Autopartes',
  '#Repuestos', '#Taller', '#Mecanico', '#Conductor',
  // Eficiencia y sostenibilidad
  '#EficienciaCombustible', '#Combustible', '#Diesel', '#Ahorro',
  '#Sostenibilidad', '#Emisiones', '#Euro6', '#NormativasAmbientales',
  // Negocio
  '#Productividad', '#Rentabilidad', '#ROI', '#TotalCostOfOwnership',
  '#TCO', '#Optimizacion', '#MejoraContinua', '#Lean',
  // Colombia
  '#Fedetranscarga', '#Mintransporte', '#Andi', '#CamaraDeComercio',
  '#Bogota', '#Medellin', '#Cali', '#Barranquilla',
  // Roles
  '#GerenteDeFlota', '#JefeDeMantenimiento', '#IngenieroDeConfiabilidad',
  '#DirectorDeOperaciones', '#JefeDeTaller', '#TecnicoEspecializado',
  // Eventos
  '#Congreso', '#Conferencia', '#Networking', '#EventoB2B',
  '#ExpoCamiones', '#Seminario', '#Capacitacion', '#Certificacion',
  // Adicionales
  '#SeguridadVial', '#Riesgos', '#Seguros', '#Normas',
  '#ISO', '#Calidad', '#Innovacion', '#Tendencias2026',
  '#FuturoDelTransporte', '#VehiculosAutonomos', '#Electromovilidad',
];

/* Split into rows for alternating directions */
const ROW_SIZE = Math.ceil(HASHTAGS.length / 3);
const ROWS = [
  HASHTAGS.slice(0, ROW_SIZE),
  HASHTAGS.slice(ROW_SIZE, ROW_SIZE * 2),
  HASHTAGS.slice(ROW_SIZE * 2),
];

/* Single hashtag pill */
function HashTagPill({ tag, variant }: { tag: string; variant: number }) {
  const colors = [
    'text-[#E31E24] bg-[#E31E24]/10 border-[#E31E24]/20',
    'text-white/70 bg-white/5 border-white/10',
    'text-white/40 bg-white/[0.03] border-white/5',
  ];
  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full border font-mono text-[11px] sm:text-xs whitespace-nowrap flex-shrink-0 ${colors[variant % 3]}`}
    >
      {tag}
    </span>
  );
}

/* Single marquee row */
function MarqueeRow({
  tags,
  reverse = false,
  speed = 30,
}: {
  tags: string[];
  reverse?: boolean;
  speed?: number;
}) {
  // Triple the tags for seamless loop
  const items = [...tags, ...tags, ...tags];

  return (
    <div className="relative w-full overflow-hidden py-1.5">
      <div
        className="flex items-center gap-2 w-max"
        style={{
          animation: `marqueeHashtag${reverse ? 'R' : 'L'} ${speed}s linear infinite`,
        }}
      >
        {items.map((tag, i) => (
          <HashTagPill key={`${tag}-${i}`} tag={tag} variant={i} />
        ))}
      </div>
    </div>
  );
}

function HashtagMarquee() {
  return (
    <section
      className="bg-black py-8 sm:py-10 overflow-hidden"
      data-nav-light
      aria-label="Hashtags relacionados con TEMACON 2026"
    >
      {/* Top edge fade */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-5 px-4">
        <p className="font-mono text-[9px] tracking-[0.4em] text-[#E31E24]/70 uppercase">
          Lo que mueve la industria
        </p>
      </div>

      {/* Row 1 — left */}
      <MarqueeRow tags={ROWS[0]} reverse={false} speed={45} />
      {/* Row 2 — right */}
      <MarqueeRow tags={ROWS[1]} reverse speed={55} />
      {/* Row 3 — left */}
      <MarqueeRow tags={ROWS[2]} reverse={false} speed={40} />

      <style>{`
        @keyframes marqueeHashtagL {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(-66.666%); }
        }
        @keyframes marqueeHashtagR {
          0% { transform: translateX(-66.666%); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}

export default memo(HashtagMarquee);
