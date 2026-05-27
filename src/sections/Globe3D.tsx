import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── CITIES ── */
const CITIES = [
  { name: 'México City', lat: 19.43, lon: -99.13, speaker: 'Carlos Mendoza', role: 'Director de Flota' },
  { name: 'Guadalajara', lat: 20.67, lon: -103.35, speaker: 'Ana López', role: 'Gerente Logística' },
  { name: 'Monterrey', lat: 25.69, lon: -100.32, speaker: 'Roberto Fernández', role: 'Jefe Mantenimiento' },
  { name: 'Bogotá', lat: 4.71, lon: -74.07, speaker: 'Patricia Ruiz', role: 'Directora Operaciones' },
  { name: 'Lima', lat: -12.05, lon: -77.04, speaker: 'Diego Herrera', role: 'Gerente Flota' },
  { name: 'Santiago', lat: -33.45, lon: -70.67, speaker: 'María González', role: 'Directora Logística' },
  { name: 'Buenos Aires', lat: -34.60, lon: -58.38, speaker: 'Juan Pérez', role: 'Especialista Telemática' },
  { name: 'São Paulo', lat: -23.55, lon: -46.63, speaker: 'Lucía Silva', role: 'Consultora Flotas' },
];

/* ── Convert lat/lon to 3D ── */
function latLonToVec3(lat: number, lon: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

/* ── Globe Mesh ── */
function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Earth sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.2}
          roughness={0.8}
          emissive="#0d0d1a"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Grid lines */}
      <mesh>
        <sphereGeometry args={[3.01, 32, 32]} />
        <meshBasicMaterial
          color="#E31E24"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* City pins */}
      {CITIES.map((city) => {
        const pos = latLonToVec3(city.lat, city.lon, 3.05);
        return <CityPin key={city.name} position={pos} city={city} />;
      })}

      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[3.3, 32, 32]} />
        <meshBasicMaterial
          color="#E31E24"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

/* ── City Pin ── */
function CityPin({ position, city }: { position: [number, number, number]; city: typeof CITIES[0] }) {
  const [hovered, setHovered] = useState(false);
  const pinRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (pinRef.current) {
      const scale = hovered ? 1.5 : 1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1;
      pinRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={pinRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color="#E31E24"
          emissive="#ff0000"
          emissiveIntensity={hovered ? 0.8 : 0.4}
        />
      </mesh>

      {/* Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.1, 32]} />
        <meshBasicMaterial color="#E31E24" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {hovered && (
        <Html position={[0, 0.15, 0]} center>
          <div className="bg-[#E31E24] text-white px-3 py-2 rounded-lg text-xs font-mono whitespace-nowrap shadow-xl">
            <div className="font-display text-sm">{city.name}</div>
            <div className="text-white/70 text-[10px]">{city.speaker} · {city.role}</div>
          </div>
        </Html>
      )}
    </group>
  );
}

/* ── Scene ── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, 0, 5]} intensity={0.3} color="#E31E24" />
      <Globe />
    </>
  );
}

/* ── Main Component ── */
export default function Globe3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black page-padding overflow-hidden">
      <div className="wrapper">
        <div ref={titleRef} className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-t2 text-white">
            Red Latinoamericana
          </h2>
          <p className="mt-4 text-base text-white/50 max-w-2xl mx-auto">
            Expertos en transporte de carga de toda Latinoamérica se reunen en TEMACON 2026.
            Explora el globo interactivo.
          </p>
        </div>

        <div className="relative w-full aspect-[16/9] max-h-[600px]">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: true }}
          >
            <color attach="background" args={['#000']} />
            <fog attach="fog" args={['#000', 10, 20]} />
            <Scene />
          </Canvas>
        </div>

        {/* City list */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 lg:gap-6">
          {CITIES.map((city) => (
            <div key={city.name} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#E31E24]" />
              <span className="font-mono text-xs text-white/60">{city.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
