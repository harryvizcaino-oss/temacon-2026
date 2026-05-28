import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, Environment, ContactShadows, PerspectiveCamera, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { X, RotateCcw, ZoomIn, Info } from 'lucide-react';

/* ══════════════════════════════ DATA ══════════════════════════════ */

interface ComponenteData {
  id: string;
  nombre: string;
  descripcion: string;
  specs: { label: string; value: string }[];
  mantenimiento: string;
  color: string;
}

const COMPONENTES: ComponenteData[] = [
  {
    id: 'cabina', nombre: 'Cabina Kenworth T800',
    descripcion: 'Cabina convencional de acero reforzado con diseño aerodinámico optimizado. Cumple con estándares FOPS/ROPS/ECE R29 para máxima seguridad del conductor.',
    specs: [{ label: 'Tipo', value: 'Convencional high-roof' }, { label: 'Suspensión', value: 'Hidráulica / Neumática' }, { label: 'Litera', value: 'Doble comfort' }, { label: 'Aerodinámica', value: 'Spoiler + deflector' }, { label: 'Seguridad', value: 'FOPS / ROPS / ECE R29' }],
    mantenimiento: 'Revisión de amortiguadores cada 200,000 km. Lubricación de bisagras cada 50,000 km. Sellado de cabina cada 100,000 km.',
    color: '#4A90C4',
  },
  {
    id: 'motor', nombre: 'Motor Diesel PACCAR MX-13',
    descripcion: 'Motor de alto rendimiento con inyección electrónica common rail y turboalimentación variable. El corazón del Kenworth T800.',
    specs: [{ label: 'Potencia', value: '510 HP' }, { label: 'Torque', value: '1,850 lb-pie' }, { label: 'Cilindrada', value: '12.9 L' }, { label: 'Cilindros', value: '6 en línea' }, { label: 'Emisiones', value: 'EPA 2021 / Euro VI' }],
    mantenimiento: 'Cambio de aceite cada 50,000 km. Revisión de filtros cada 25,000 km. Análisis de aceite predictivo con IoT.',
    color: '#E31E24',
  },
  {
    id: 'parrilla', nombre: 'Parrilla y Bumper',
    descripcion: 'Parrilla cromada característica Kenworth con marco de acero inoxidable. Bumper reforzado diseñado para protección frontal.',
    specs: [{ label: 'Material', value: 'Acero inoxidable' }, { label: 'Acabado', value: 'Cromado espejo' }, { label: 'Bumper', value: 'Acero reforzado' }, { label: 'Faros', value: 'LED integrados' }, { label: 'Logo', value: 'Emblema rojo Kenworth' }],
    mantenimiento: 'Pulido cromado cada 3 meses. Revisión de faros LED cada servicio. Inspección estructural cada 100,000 km.',
    color: '#C0C0C0',
  },
  {
    id: 'transmision', nombre: 'Transmisión Eaton Fuller',
    descripcion: 'Transmisión manual automatizada de 13 o 18 velocidades con retardador integrado. Cambios precisos para máxima eficiencia.',
    specs: [{ label: 'Tipo', value: 'Manual automatizada' }, { label: 'Velocidades', value: '13 / 18 vel.' }, { label: 'Retardador', value: 'Hidráulico integrado' }, { label: 'Relación', value: '14.93 - 0.73' }, { label: 'Diferencial', value: 'Locking / ABS' }],
    mantenimiento: 'Revisión de aceite cada 300,000 km. Calibración de actuadores cada 150,000 km.',
    color: '#333333',
  },
  {
    id: 'frenos', nombre: 'Sistema de Frenos de Aire',
    descripcion: 'Frenos de aire Bendix con ABS, EBS y ESP. Sistema de frenado de emergencia automático (AEBS) para máxima seguridad.',
    specs: [{ label: 'Tipo', value: 'Aire comprimido dual' }, { label: 'ABS/EBS', value: 'Electrónico integrado' }, { label: 'AEBS', value: 'Emergencia automático' }, { label: 'Disco', value: 'Doble disco por eje' }, { label: 'Vida útil', value: '400,000 - 600,000 km' }],
    mantenimiento: 'Revisión de pastillas cada 80,000 km. Purga de tanques de aire cada 15 días. Prueba de sistema ABS mensual.',
    color: '#E31E24',
  },
  {
    id: 'combustible', nombre: 'Tanques de Combustible',
    descripcion: 'Doble tanque de aluminio pulido con capacidad extendida. Sistema telemático de monitoreo de nivel y consumo en tiempo real.',
    specs: [{ label: 'Capacidad', value: '1,000 L (500+500)' }, { label: 'Material', value: 'Aluminio pulido' }, { label: 'Sensores', value: 'IoT telemático' }, { label: 'Autonomía', value: '3,500 - 4,500 km' }, { label: 'AdBlue', value: 'Tanque separado 80L' }],
    mantenimiento: 'Limpieza cada 200,000 km. Revisión de sensores IoT cada servicio. Control de calidad de combustible.',
    color: '#C0C0C0',
  },
  {
    id: 'escape', nombre: 'Stacks de Escape Dual',
    descripcion: 'Doble stack cromado vertical con sistema de post-tratamiento. SCR + DPF + DOC integrado para cumplimiento EPA 2021.',
    specs: [{ label: 'SCR', value: 'Reductor catalítico' }, { label: 'DPF', value: 'Filtro de partículas' }, { label: 'DOC', value: 'Catalizador oxidante' }, { label: 'Acabado', value: 'Cromado espejo' }, { label: 'AdBlue', value: 'Consumo 3-5% diesel' }],
    mantenimiento: 'Regeneración DPF automática. Revisión SCR cada 500,000 km. Reemplazo sensor NOx cada 300,000 km.',
    color: '#C0C0C0',
  },
  {
    id: 'suspension', nombre: 'Suspensión y Ejes 6x4',
    descripcion: 'Configuración 6x4 con 3 ejes: 1 direccional y 2 tractores. Suspensión neumática con diferencial locking.',
    specs: [{ label: 'Configuración', value: '6x4 Tractor' }, { label: 'Capacidad eje', value: '9,000 - 13,000 kg' }, { label: 'Suspensión', value: 'Neumática / Muelle' }, { label: 'Diferencial', value: 'Locking electrónico' }, { label: 'Capacidad total', value: '36,300 kg GCW' }],
    mantenimiento: 'Revisión de lubricación cada 100,000 km. Alineación cada 150,000 km. Inspección de suspensión cada 50,000 km.',
    color: '#222222',
  },
  {
    id: 'neumaticos', nombre: 'Neumáticos Michelin XZA',
    descripcion: 'Llantas radiales de alta resistencia con sistema TPMS integrado. Diseñados para larga distancia y carga pesada.',
    specs: [{ label: 'Medida', value: '295/80 R22.5' }, { label: 'Capas', value: '18 PR' }, { label: 'TPMS', value: 'Monitoreo en tiempo real' }, { label: 'Vida útil', value: '180,000 - 250,000 km' }, { label: 'Posición', value: 'Dir/Trac/Trailer' }],
    mantenimiento: 'Rotación cada 30,000 km. Alineación y balanceo cada 50,000 km. Revisión TPMS cada servicio.',
    color: '#1A1A1A',
  },
  {
    id: 'quinta', nombre: 'Quinta Rueda JOST',
    descripcion: 'Quinta rueda profesional de acero endurecido para conexión de semirremolque. Sistema de lubricación automática.',
    specs: [{ label: 'Capacidad', value: '20,000 kg' }, { label: 'Material', value: 'Acero endurecido' }, { label: 'Tipo', value: 'JOST JSK 37' }, { label: 'Lubricación', value: 'Automática' }, { label: 'Vida útil', value: '500,000 km' }],
    mantenimiento: 'Lubricación cada 50,000 km. Revisión de contacto cada 100,000 km. Reemplazo de placas cada 300,000 km.',
    color: '#333333',
  },
];

/* ══════════════════════════════ KENWORTH T800 3D ══════════════════════════════ */

function KenworthT800({ selectedId, onSelect, isExploded }: { selectedId: string | null; onSelect: (id: string | null) => void; isExploded: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const [lightsOn, setLightsOn] = useState(false);

  useFrame(() => {
    if (groupRef.current && !selectedId) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  // Real Kenworth colors
  const cabBlue = '#1B3A5C';
  const chrome = '#E8ECF0';
  const chromeDark = '#8A929C';
  const chassisBlack = '#1A1A1A';
  const tireBlack = '#0D0D0D';
  const rimSilver = '#B8C0C8';
  const glassDark = '#0D1B2A';
  const redLight = '#FF1A1A';
  const amberLight = '#FFAA00';
  const grillDark = '#2A2A2A';
  const stepsChrome = '#D0D8E0';

  // Component click wrapper
  function ParteClickable({ componentId, explodedPos, children }: { componentId: string; explodedPos: [number, number, number]; children: React.ReactNode }) {
    const group = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);
    const isSelected = selectedId === componentId;
    const comp = COMPONENTES.find(c => c.id === componentId);

    useFrame(() => {
      if (!group.current) return;
      const target = isExploded ? explodedPos : [0, 0, 0];
      // Smooth interpolation — slower for stable raycasting
      const lerpFactor = 0.04;
      group.current.position.x += (target[0] - group.current.position.x) * lerpFactor;
      group.current.position.y += (target[1] - group.current.position.y) * lerpFactor;
      group.current.position.z += (target[2] - group.current.position.z) * lerpFactor;
    });

    return (
      <group ref={group}
        onClick={(e) => { e.stopPropagation(); onSelect(isSelected ? null : componentId); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      >
        {children}
        {(hovered || isSelected) && (
          <mesh position={[0, 0.5, 0]}><sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#E31E24" transparent opacity={0} />
          </mesh>
        )}
        {hovered && !isSelected && (
          <Html position={[0, 0.4, 0]} center>
            <div className="bg-[#E31E24] text-white px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap shadow-xl pointer-events-none animate-in fade-in">
              {comp?.nombre}
            </div>
          </Html>
        )}
        {isSelected && (
          <Html position={[0, 0.6, 0]} center>
            <div className="flex items-center gap-1.5 bg-white text-[#E31E24] px-3 py-1.5 rounded-full text-xs font-semibold shadow-xl pointer-events-none animate-in zoom-in">
              <Info size={12} />{comp?.nombre}
            </div>
          </Html>
        )}
      </group>
    );
  }

  /* ─── Tienda Logo Decal ─── */
  function LogoDecal({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
    const texture = useTexture('/logo-tienda-decal.png');
    return (
      <mesh position={position} rotation={rotation}>
        <planeGeometry args={[0.5, 0.12]} />
        <meshStandardMaterial
          map={texture}
          transparent
          opacity={0.95}
          emissive="#ffffff"
          emissiveIntensity={0.15}
          emissiveMap={texture}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    );
  }

  /* ─── Tire Component with tread pattern ─── */
  function Tire({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
    const tireRef = useRef<THREE.Mesh>(null);
    return (
      <group position={position} scale={scale}>
        {/* Main tire - rotated correctly so tread faces OUTWARD */}
        <mesh ref={tireRef} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.38, 0.38, 0.22, 32]} />
          <meshStandardMaterial color={tireBlack} metalness={0.05} roughness={0.98} />
        </mesh>
        {/* Tread grooves - visible on the side */}
        {[0.32, 0.28, 0.24, 0.20, 0.16, 0.12].map((r, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[r, 0.008, 4, 32]} />
            <meshStandardMaterial color="#1A1A1A" metalness={0.1} roughness={0.95} />
          </mesh>
        ))}
        {/* Rim */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.24, 16]} />
          <meshStandardMaterial color={rimSilver} metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Rim hub cap */}
        <mesh position={[0, 0, 0.12]}>
          <circleGeometry args={[0.15, 16]} />
          <meshStandardMaterial color={chrome} metalness={0.95} roughness={0.05} side={THREE.DoubleSide} />
        </mesh>
        {/* Lug nuts */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => {
          const angle = (n / 8) * Math.PI * 2;
          return (
            <mesh key={n} position={[Math.cos(angle) * 0.1, Math.sin(angle) * 0.1, 0.13]}>
              <cylinderGeometry args={[0.018, 0.018, 0.02, 6]} />
              <meshStandardMaterial color={chrome} metalness={0.95} roughness={0.05} />
            </mesh>
          );
        })}
        {/* Hub bolts ring */}
        <mesh position={[0, 0, 0.125]}>
          <ringGeometry args={[0.05, 0.055, 16]} />
          <meshStandardMaterial color={chromeDark} metalness={0.8} roughness={0.2} side={THREE.DoubleSide} />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={groupRef} position={[0, 0, 0]} onPointerOver={() => setLightsOn(true)} onPointerOut={() => setLightsOn(false)}>

      {/* ══════ HOOD & MOTOR ══════ */}
      <ParteClickable componentId="motor" explodedPos={[1.2, 0.5, 0]}>
        {/* Hood - long sloped nose */}
        <mesh position={[2.0, 0.9, 0]} castShadow>
          <boxGeometry args={[1.8, 0.55, 1.45]} />
          <meshStandardMaterial color={cabBlue} metalness={0.5} roughness={0.35} />
        </mesh>
        {/* Hood slope front */}
        <mesh position={[2.6, 0.85, 0]} castShadow>
          <boxGeometry args={[0.6, 0.45, 1.35]} />
          <meshStandardMaterial color={cabBlue} metalness={0.5} roughness={0.35} />
        </mesh>
        {/* Hood top ridge */}
        <mesh position={[2.1, 1.22, 0]}>
          <boxGeometry args={[1.6, 0.04, 0.8]} />
          <meshStandardMaterial color={cabBlue} metalness={0.5} roughness={0.35} />
        </mesh>
        {/* Hood side vents */}
        {[-0.7, 0.7].map((z, i) => (
          <mesh key={i} position={[2.0, 0.85, z]}>
            <boxGeometry args={[1.2, 0.08, 0.02]} />
            <meshStandardMaterial color="#152D47" metalness={0.6} roughness={0.3} />
          </mesh>
        ))}
      </ParteClickable>

      {/* ══════ TIENDA LOGO DECAL — Side of hood ══════ */}
      <LogoDecal position={[2.0, 0.88, 0.74]} rotation={[0, 0, 0]} />
      <LogoDecal position={[2.0, 0.88, -0.74]} rotation={[0, Math.PI, 0]} />

      {/* ══════ PARRILLA ══════ */}
      <ParteClickable componentId="parrilla" explodedPos={[2.0, 0.2, 0]}>
        {/* Chrome frame */}
        <mesh position={[2.92, 0.8, 0]}>
          <boxGeometry args={[0.08, 0.7, 1.25]} />
          <meshStandardMaterial color={chrome} metalness={0.95} roughness={0.05} />
        </mesh>
        {/* Grill lines */}
        {[...Array(8)].map((_, i) => (
          <mesh key={i} position={[2.95, 0.52 + i * 0.08, 0]}>
            <boxGeometry args={[0.04, 0.06, 1.15]} />
            <meshStandardMaterial color={i === 3 ? '#E31E24' : grillDark} metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
        {/* Kenworth emblem oval */}
        <mesh position={[2.95, 0.78, 0]}>
          <boxGeometry args={[0.02, 0.1, 0.18]} />
          <meshStandardMaterial color="#E31E24" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Headlights - rectangular with glow */}
        <mesh position={[2.9, 0.55, 0.55]}>
          <boxGeometry args={[0.08, 0.1, 0.2]} />
          <meshStandardMaterial
            color="#e0e8f0"
            emissive={lightsOn ? "#ffffff" : "#8899bb"}
            emissiveIntensity={lightsOn ? 2 : 0.3}
          />
        </mesh>
        <mesh position={[2.9, 0.55, -0.55]}>
          <boxGeometry args={[0.08, 0.1, 0.2]} />
          <meshStandardMaterial
            color="#e0e8f0"
            emissive={lightsOn ? "#ffffff" : "#8899bb"}
            emissiveIntensity={lightsOn ? 2 : 0.3}
          />
        </mesh>
        {/* Bumper */}
        <mesh position={[2.95, 0.35, 0]} castShadow>
          <boxGeometry args={[0.2, 0.3, 1.5]} />
          <meshStandardMaterial color={chrome} metalness={0.95} roughness={0.05} />
        </mesh>
        {/* Bumper fog lights */}
        <mesh position={[2.95, 0.25, 0.5]}>
          <boxGeometry args={[0.05, 0.06, 0.12]} />
          <meshStandardMaterial color="#e0e8f0" emissive={lightsOn ? "#ccddff" : "#667788"} emissiveIntensity={lightsOn ? 1 : 0.2} />
        </mesh>
        <mesh position={[2.95, 0.25, -0.5]}>
          <boxGeometry args={[0.05, 0.06, 0.12]} />
          <meshStandardMaterial color="#e0e8f0" emissive={lightsOn ? "#ccddff" : "#667788"} emissiveIntensity={lightsOn ? 1 : 0.2} />
        </mesh>
        {/* Amber marker lights */}
        {[-0.65, 0, 0.65].map((z, i) => (
          <mesh key={i} position={[2.88, 0.45, z]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial color={amberLight} emissive={amberLight} emissiveIntensity={0.6} />
          </mesh>
        ))}
        {/* Turn signal lights on sides */}
        <mesh position={[2.85, 0.65, 0.72]}>
          <boxGeometry args={[0.06, 0.04, 0.08]} />
          <meshStandardMaterial color={amberLight} emissive={amberLight} emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[2.85, 0.65, -0.72]}>
          <boxGeometry args={[0.06, 0.04, 0.08]} />
          <meshStandardMaterial color={amberLight} emissive={amberLight} emissiveIntensity={0.5} />
        </mesh>
      </ParteClickable>

      {/* ══════ CABINA ══════ */}
      <ParteClickable componentId="cabina" explodedPos={[0, 1.0, 0]}>
        {/* Main cab */}
        <mesh position={[0.3, 1.15, 0]} castShadow>
          <boxGeometry args={[1.4, 1.15, 1.5]} />
          <meshStandardMaterial color={cabBlue} metalness={0.5} roughness={0.35} />
        </mesh>
        {/* Cab roof with sleeper */}
        <mesh position={[0.3, 1.75, 0]}>
          <boxGeometry args={[1.35, 0.05, 1.45]} />
          <meshStandardMaterial color={cabBlue} metalness={0.5} roughness={0.35} />
        </mesh>
        {/* Sleeper back (taller) */}
        <mesh position={[-0.25, 1.3, 0]}>
          <boxGeometry args={[0.2, 0.85, 1.4]} />
          <meshStandardMaterial color={cabBlue} metalness={0.5} roughness={0.35} />
        </mesh>
        {/* Windshield - angled */}
        <mesh position={[1.02, 1.25, 0]} rotation={[0, 0, -0.05]}>
          <boxGeometry args={[0.05, 0.65, 1.2]} />
          <meshStandardMaterial color={glassDark} metalness={0.95} roughness={0.02} transparent opacity={0.5} />
        </mesh>
        {/* Side windows */}
        <mesh position={[0.3, 1.3, 0.76]}>
          <boxGeometry args={[0.8, 0.45, 0.04]} />
          <meshStandardMaterial color={glassDark} metalness={0.95} roughness={0.02} transparent opacity={0.5} />
        </mesh>
        <mesh position={[0.3, 1.3, -0.76]}>
          <boxGeometry args={[0.8, 0.45, 0.04]} />
          <meshStandardMaterial color={glassDark} metalness={0.95} roughness={0.02} transparent opacity={0.5} />
        </mesh>
        {/* Back window */}
        <mesh position={[-0.42, 1.3, 0]}>
          <boxGeometry args={[0.04, 0.45, 1.0]} />
          <meshStandardMaterial color={glassDark} metalness={0.95} roughness={0.02} transparent opacity={0.4} />
        </mesh>
        {/* Door handles chrome */}
        <mesh position={[0.6, 1.0, 0.77]}>
          <boxGeometry args={[0.08, 0.03, 0.03]} />
          <meshStandardMaterial color={chromeDark} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.6, 1.0, -0.77]}>
          <boxGeometry args={[0.08, 0.03, 0.03]} />
          <meshStandardMaterial color={chromeDark} metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Visor */}
        <mesh position={[0.8, 1.52, 0]}>
          <boxGeometry args={[0.5, 0.08, 1.3]} />
          <meshStandardMaterial color={cabBlue} metalness={0.5} roughness={0.35} />
        </mesh>
        {/* Roof lights - 5 marker lights */}
        {[-0.55, -0.25, 0, 0.25, 0.55].map((z, i) => (
          <mesh key={i} position={[0.3, 1.78, z]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial color={amberLight} emissive={amberLight} emissiveIntensity={0.8} />
          </mesh>
        ))}
        {/* Windshield wipers */}
        <mesh position={[1.05, 1.32, 0.3]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.3, 0.01, 0.01]} />
          <meshStandardMaterial color={chassisBlack} metalness={0.3} roughness={0.8} />
        </mesh>
        <mesh position={[1.05, 1.32, -0.3]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.3, 0.01, 0.01]} />
          <meshStandardMaterial color={chassisBlack} metalness={0.3} roughness={0.8} />
        </mesh>
      </ParteClickable>

      {/* ══════ ESPEJOS ══════ */}
      <group>
        {/* Mirror arms */}
        <mesh position={[0.6, 1.15, 0.85]}>
          <cylinderGeometry args={[0.015, 0.015, 0.25, 8]} />
          <meshStandardMaterial color={chromeDark} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.6, 1.15, -0.85]}>
          <cylinderGeometry args={[0.015, 0.015, 0.25, 8]} />
          <meshStandardMaterial color={chromeDark} metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Mirror heads - chrome housing */}
        <mesh position={[0.6, 1.28, 0.92]}>
          <boxGeometry args={[0.08, 0.15, 0.03]} />
          <meshStandardMaterial color={chrome} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.6, 1.28, -0.92]}>
          <boxGeometry args={[0.08, 0.15, 0.03]} />
          <meshStandardMaterial color={chrome} metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* ══════ STACKS ESCAPE ══════ */}
      <ParteClickable componentId="escape" explodedPos={[-1.5, 0.8, 0]}>
        {/* Left stack */}
        <mesh position={[-0.45, 1.4, 0.65]} castShadow>
          <cylinderGeometry args={[0.04, 0.05, 1.3, 16]} />
          <meshStandardMaterial color={chrome} metalness={0.95} roughness={0.05} />
        </mesh>
        {/* Left stack curved cap */}
        <mesh position={[-0.43, 2.08, 0.65]} rotation={[0, 0, -0.4]}>
          <cylinderGeometry args={[0.035, 0.04, 0.12, 16]} />
          <meshStandardMaterial color={chrome} metalness={0.95} roughness={0.05} />
        </mesh>
        {/* Right stack */}
        <mesh position={[-0.45, 1.4, -0.65]} castShadow>
          <cylinderGeometry args={[0.04, 0.05, 1.3, 16]} />
          <meshStandardMaterial color={chrome} metalness={0.95} roughness={0.05} />
        </mesh>
        {/* Right stack curved cap */}
        <mesh position={[-0.43, 2.08, -0.65]} rotation={[0, 0, -0.4]}>
          <cylinderGeometry args={[0.035, 0.04, 0.12, 16]} />
          <meshStandardMaterial color={chrome} metalness={0.95} roughness={0.05} />
        </mesh>
        {/* Horizontal pipes */}
        <mesh position={[0.8, 0.7, 0.65]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.035, 0.035, 2.5, 12]} />
          <meshStandardMaterial color={chromeDark} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.8, 0.7, -0.65]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.035, 0.035, 2.5, 12]} />
          <meshStandardMaterial color={chromeDark} metalness={0.9} roughness={0.1} />
        </mesh>
      </ParteClickable>

      {/* ══════ TANQUES COMBUSTIBLE ══════ */}
      <ParteClickable componentId="combustible" explodedPos={[0, 0.2, 1.2]}>
        {/* Left tank */}
        <mesh position={[0.5, 0.55, 0.68]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 1.4, 32]} />
          <meshStandardMaterial color={chrome} metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Tank straps */}
        {[-0.1, 0.6, 1.1].map((x, i) => (
          <mesh key={i} position={[x, 0.55, 0.68]}>
            <boxGeometry args={[0.03, 0.48, 0.46]} />
            <meshStandardMaterial color={chassisBlack} metalness={0.6} roughness={0.4} />
          </mesh>
        ))}
        {/* Right tank */}
        <mesh position={[0.5, 0.55, -0.68]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 1.4, 32]} />
          <meshStandardMaterial color={chrome} metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Right tank straps */}
        {[-0.1, 0.6, 1.1].map((x, i) => (
          <mesh key={i} position={[x, 0.55, -0.68]}>
            <boxGeometry args={[0.03, 0.48, 0.46]} />
            <meshStandardMaterial color={chassisBlack} metalness={0.6} roughness={0.4} />
          </mesh>
        ))}
        {/* AdBlue tank */}
        <mesh position={[-0.5, 0.4, 0.68]}>
          <cylinderGeometry args={[0.12, 0.12, 0.4, 16]} />
          <meshStandardMaterial color="#2E6FB0" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Tank caps */}
        <mesh position={[1.2, 0.55, 0.68]}>
          <cylinderGeometry args={[0.04, 0.04, 0.08, 8]} />
          <meshStandardMaterial color={chrome} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[1.2, 0.55, -0.68]}>
          <cylinderGeometry args={[0.04, 0.04, 0.08, 8]} />
          <meshStandardMaterial color={chrome} metalness={0.9} roughness={0.1} />
        </mesh>
      </ParteClickable>

      {/* ══════ STEPS ══════ */}
      <ParteClickable componentId="suspension" explodedPos={[0, 0.1, 0]}>
        {/* Steps + axles + suspension — all chassis parts */}
        {[0.8, 0.55, 0.3].map((x, i) => (
          <group key={i}>
            <mesh position={[x, 0.2 + i * 0.12, 0.82]}>
              <boxGeometry args={[0.2, 0.03, 0.15]} />
              <meshStandardMaterial color={stepsChrome} metalness={0.95} roughness={0.05} />
            </mesh>
            <mesh position={[x, 0.2 + i * 0.12, -0.82]}>
              <boxGeometry args={[0.2, 0.03, 0.15]} />
              <meshStandardMaterial color={stepsChrome} metalness={0.95} roughness={0.05} />
            </mesh>
          </group>
        ))}
        {/* Catwalk between tanks */}
        <mesh position={[0.5, 0.78, 0]}>
          <boxGeometry args={[1.0, 0.02, 0.4]} />
          <meshStandardMaterial color={chromeDark} metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Axles */}
        <mesh position={[2.35, 0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 1.4, 16]} />
          <meshStandardMaterial color={chromeDark} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-1.0, 0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 1.45, 16]} />
          <meshStandardMaterial color={chromeDark} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-2.2, 0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 1.45, 16]} />
          <meshStandardMaterial color={chromeDark} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Spring packs */}
        {[-1.0, -2.2].map((x, i) => (
          <group key={i}>
            {[0.5, -0.5].map((z, j) => (
              <mesh key={j} position={[x, 0.42, z]}>
                <boxGeometry args={[0.25, 0.1, 0.15]} />
                <meshStandardMaterial color="#555" metalness={0.5} roughness={0.6} />
              </mesh>
            ))}
          </group>
        ))}
        {/* Differential housing */}
        <mesh position={[-1.0, 0.35, 0]}>
          <boxGeometry args={[0.4, 0.25, 0.3]} />
          <meshStandardMaterial color={chassisBlack} metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[-2.2, 0.35, 0]}>
          <boxGeometry args={[0.4, 0.25, 0.3]} />
          <meshStandardMaterial color={chassisBlack} metalness={0.7} roughness={0.3} />
        </mesh>
      </ParteClickable>

      {/* ══════ CHASSIS ══════ */}
      <group>
        {/* Main rails */}
        <mesh position={[-0.5, 0.38, 0.52]}>
          <boxGeometry args={[4.5, 0.12, 0.12]} />
          <meshStandardMaterial color={chassisBlack} metalness={0.5} roughness={0.7} />
        </mesh>
        <mesh position={[-0.5, 0.38, -0.52]}>
          <boxGeometry args={[4.5, 0.12, 0.12]} />
          <meshStandardMaterial color={chassisBlack} metalness={0.5} roughness={0.7} />
        </mesh>
        {/* Cross members */}
        {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
          <mesh key={i} position={[x, 0.38, 0]}>
            <boxGeometry args={[0.08, 0.08, 1.1]} />
            <meshStandardMaterial color={chassisBlack} metalness={0.5} roughness={0.7} />
          </mesh>
        ))}
        {/* Mud flaps rear */}
        {[-0.6, 0.6].map((z, i) => (
          <mesh key={i} position={[-2.8, 0.25, z]}>
            <boxGeometry args={[0.04, 0.35, 0.3]} />
            <meshStandardMaterial color={chassisBlack} metalness={0.3} roughness={0.9} />
          </mesh>
        ))}
        {/* Rear lights */}
        <mesh position={[-2.85, 0.5, 0.55]}>
          <boxGeometry args={[0.04, 0.1, 0.1]} />
          <meshStandardMaterial color={redLight} emissive={redLight} emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[-2.85, 0.5, -0.55]}>
          <boxGeometry args={[0.04, 0.1, 0.1]} />
          <meshStandardMaterial color={redLight} emissive={redLight} emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* ══════ EJES Y TRANSMISIÓN ══════ */}
      <ParteClickable componentId="transmision" explodedPos={[0.5, 0.2, 0]}>
        {/* Transmission housing */}
        <mesh position={[0.5, 0.48, 0]}>
          <boxGeometry args={[0.5, 0.3, 0.35]} />
          <meshStandardMaterial color={chassisBlack} metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Drive shafts */}
        <mesh position={[1.5, 0.38, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 2.0, 12]} />
          <meshStandardMaterial color={chromeDark} metalness={0.8} roughness={0.2} />
        </mesh>
      </ParteClickable>

      {/* ══════ FRENOS ══════ */}
      <ParteClickable componentId="frenos" explodedPos={[0, 0.2, -1.2]}>
        {/* Brake drums */}
        {[-1.0, -2.2].map((x, wi) => (
          <group key={wi}>
            {[0.52, -0.52].map((z, si) => (
              <mesh key={si} position={[x, 0.35, z + (z > 0 ? 0.1 : -0.1)]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.18, 0.18, 0.08, 16]} />
                <meshStandardMaterial color="#444" metalness={0.7} roughness={0.4} />
              </mesh>
            ))}
          </group>
        ))}
        {/* Air tanks */}
        <mesh position={[-1.0, 0.38, -0.62]}>
          <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
          <meshStandardMaterial color={chrome} metalness={0.85} roughness={0.15} />
        </mesh>
      </ParteClickable>

      {/* ══════ QUINTA RUEDA ══════ */}
      <ParteClickable componentId="quinta" explodedPos={[-1.0, 0.2, 0]}>
        <mesh position={[-1.0, 0.52, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.06, 32]} />
          <meshStandardMaterial color="#3A3A3A" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Fifth wheel platform */}
        <mesh position={[-1.0, 0.46, 0]}>
          <boxGeometry args={[0.8, 0.06, 0.8]} />
          <meshStandardMaterial color={chassisBlack} metalness={0.7} roughness={0.4} />
        </mesh>
      </ParteClickable>

      {/* ══════ NEUMÁTICOS — CORRECTLY ORIENTED ══════ */}
      <ParteClickable componentId="neumaticos" explodedPos={[0, 0.4, 1.0]}>
        {/* Front single axle — tires rotated correctly */}
        <Tire position={[2.35, 0.35, 0.6]} />
        <Tire position={[2.35, 0.35, -0.6]} />

        {/* Rear axle 1 — dual wheels */}
        <Tire position={[-1.0, 0.35, 0.62]} />
        <Tire position={[-1.0, 0.35, -0.62]} />

        {/* Rear axle 2 — dual wheels */}
        <Tire position={[-2.2, 0.35, 0.62]} />
        <Tire position={[-2.2, 0.35, -0.62]} />
      </ParteClickable>

      {/* ══════ GROUND ══════ */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial color="#0d0d0d" metalness={0.3} roughness={0.9} />
      </mesh>
    </group>
  );
}

/* ══════════════════════════════ MAIN ══════════════════════════════ */

export default function TractoCamion3DSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isExploded, setIsExploded] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const selected = COMPONENTES.find(c => c.id === selectedId);

  useEffect(() => { if (selectedId) setPanelOpen(true); }, [selectedId]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="tractocamion" ref={sectionRef} className="bg-[#0a0a0a] page-padding overflow-hidden relative">
      <div className="wrapper">
        <div ref={titleRef} className="text-center mb-8">
          <h2 className="font-display text-t2 text-white">
            Kenworth T800 — Exploración 3D
          </h2>
          <p className="mt-4 text-base text-white/50 max-w-2xl mx-auto">
            Interactúa con cada componente del icónico Kenworth T800. Haz clic en las partes para ver especificaciones técnicas y protocolos de mantenimiento.
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-6">
          <button onClick={() => setIsExploded(!isExploded)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-sm transition-all duration-300 ${isExploded ? 'bg-[#E31E24] text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>
            <ZoomIn size={16} />{isExploded ? 'Vista Normal' : 'Vista Exploded'}
          </button>
          <button onClick={() => { setSelectedId(null); setPanelOpen(false); setIsExploded(false); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-sm bg-white/10 text-white hover:bg-white/20 transition-all duration-300">
            <RotateCcw size={16} />Reset
          </button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mb-6">
          {COMPONENTES.map(c => (
            <button key={c.id} onClick={() => setSelectedId(c.id === selectedId ? null : c.id)}
              className={`flex items-center gap-1.5 transition-all duration-300 ${selectedId === c.id ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}>
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
              <span className="font-mono text-[10px] text-white/70">{c.nombre}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="relative w-full aspect-[16/9] max-h-[700px]">
        <Canvas shadows gl={{ antialias: true, alpha: false }} style={{ background: '#0a0a0a' }}>
          <PerspectiveCamera makeDefault position={[6, 3, 7]} fov={40} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
          <directionalLight position={[-3, 4, -3]} intensity={0.3} />
          <pointLight position={[0, 5, 0]} intensity={0.2} color="#E31E24" />

          <KenworthT800 selectedId={selectedId} onSelect={setSelectedId} isExploded={isExploded} />

          <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={15} blur={2.5} far={6} />
          <Environment preset="city" />

          <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2.1} minPolarAngle={Math.PI / 8}
            minDistance={4} maxDistance={14} autoRotate={!selectedId && !isExploded} autoRotateSpeed={0.8} />
        </Canvas>
      </div>

      {/* Side Panel */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#111] border-l border-[#222] z-50 transform transition-transform duration-500 ease-out overflow-y-auto ${panelOpen && selected ? 'translate-x-0' : 'translate-x-full'}`}>
        {selected && (
          <div className="p-6 lg:p-8">
            <button onClick={() => { setPanelOpen(false); setTimeout(() => setSelectedId(null), 300); }}
              className="absolute top-4 right-4 w-10 h-10 bg-[#222] rounded-full flex items-center justify-center text-white hover:bg-[#E31E24] transition-colors">
              <X size={20} />
            </button>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${selected.color}20` }}>
              <div className="w-8 h-8 rounded-full" style={{ backgroundColor: selected.color }} />
            </div>
            <h3 className="font-display text-3xl text-white mb-2">{selected.nombre}</h3>
            <div className="w-12 h-1 bg-[#E31E24] mb-6" />
            <p className="text-white/70 text-sm leading-relaxed mb-8">{selected.descripcion}</p>
            <div className="mb-8">
              <h4 className="font-mono text-xs text-white/40 uppercase tracking-wider mb-4">Especificaciones Técnicas</h4>
              <div className="space-y-3">
                {selected.specs.map(spec => (
                  <div key={spec.label} className="flex items-center justify-between py-2 border-b border-[#222]">
                    <span className="text-white/50 text-sm">{spec.label}</span>
                    <span className="text-white font-mono text-sm">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-[#222]">
              <h4 className="font-mono text-xs text-[#E31E24] uppercase tracking-wider mb-3">Protocolo de Mantenimiento</h4>
              <p className="text-white/60 text-sm leading-relaxed">{selected.mantenimiento}</p>
            </div>
            <a href="#register" onClick={() => { setPanelOpen(false); setTimeout(() => setSelectedId(null), 300); }}
              className="mt-6 block w-full bg-[#E31E24] text-white text-center py-4 rounded-full font-display font-semibold hover:bg-white hover:text-[#E31E24] transition-all duration-300">
              Aprende más en TEMACON 2026
            </a>
          </div>
        )}
      </div>

      {/* Overlay */}
      {panelOpen && selected && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => { setPanelOpen(false); setTimeout(() => setSelectedId(null), 300); }} />
      )}
    </section>
  );
}
