import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveHorizontal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */
interface Speaker {
  name: string;
  role: string;
  company: string;
  image: string;
  country: string;
  flag: string;
  track: 'TECNOLOGÍA' | 'MANTENIMIENTO' | 'CONFIABILIDAD';
}

const SPEAKERS: Speaker[] = [
  { name: 'Carlos Mendoza', role: 'Director de Flota', company: 'Transportes del Norte', image: '/speakers/speaker1.jpg', country: 'Colombia', flag: '🇨🇴', track: 'MANTENIMIENTO' },
  { name: 'Dra. Ana María López', role: 'Especialista en Telemática', company: 'Carga Express Latam', image: '/speakers/speaker2.jpg', country: 'México', flag: '🇲🇽', track: 'TECNOLOGÍA' },
  { name: 'Ing. Roberto Fernández', role: 'Consultor Senior en Confiabilidad', company: 'RCM Flotas MX', image: '/speakers/speaker3.jpg', country: 'México', flag: '🇲🇽', track: 'CONFIABILIDAD' },
  { name: 'Dra. Patricia Ruiz', role: 'Directora de Operaciones', company: 'LogiTech Transport', image: '/speakers/speaker4.jpg', country: 'Colombia', flag: '🇨🇴', track: 'TECNOLOGÍA' },
  { name: 'Ing. Diego Herrera', role: 'Gerente de Mantenimiento', company: 'Flotas Pesadas MX', image: '/speakers/speaker5.jpg', country: 'Chile', flag: '🇨🇱', track: 'MANTENIMIENTO' },
  { name: 'Luis García', role: 'Director de Flota', company: 'Global Logistics', image: '/speakers/speaker6.jpg', country: 'Perú', flag: '🇵🇪', track: 'CONFIABILIDAD' },
  { name: 'Dra. Elena Vargas', role: 'Directora de Logística', company: 'Transporte Inteligente SA', image: '/speakers/speaker7.jpg', country: 'Argentina', flag: '🇦🇷', track: 'TECNOLOGÍA' },
  { name: 'Ing. Miguel Torres', role: 'Especialista en Telemática', company: 'Global Truck Tech', image: '/speakers/speaker8.jpg', country: 'Brasil', flag: '🇧🇷', track: 'MANTENIMIENTO' },
];

const TRACK_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  'TECNOLOGÍA':     { bg: 'bg-[#E31E24]/15',  text: 'text-[#E31E24]', border: 'border-[#E31E24]/30' },
  'MANTENIMIENTO':  { bg: 'bg-white/8',        text: 'text-white/70',   border: 'border-white/15' },
  'CONFIABILIDAD':  { bg: 'bg-[#E31E24]/8',    text: 'text-[#ff6b6b]',  border: 'border-[#E31E24]/20' },
};

const COUNT = SPEAKERS.length;
const ANGLE_STEP = 360 / COUNT;

/* ═══════════════════════════════════════════
   CYLINDRIC CAROUSEL 3D
   ═══════════════════════════════════════════ */
export default function Speakers() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Refs for drag — rotationProxy is an object GSAP can mutate
  const dragStart = useRef({ x: 0, rotation: 0 });
  const rotationProxy = useRef({ value: 0 });
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const autoRotateRef = useRef<ReturnType<typeof gsap.to> | null>(null);

  /*─── Scroll entrance animation ───*/
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 50, opacity: 0, duration: 1, ease: 'power3.out',
      });
      gsap.from(sceneRef.current, {
        scrollTrigger: { trigger: sceneRef.current, start: 'top 85%' },
        y: 80, opacity: 0, duration: 1.2, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /*─── Update active index based on rotation ───*/
  useEffect(() => {
    const normalized = ((rotation % 360) + 360) % 360;
    const rawIndex = Math.round(normalized / ANGLE_STEP) % COUNT;
    setActiveIndex((COUNT - rawIndex) % COUNT);
  }, [rotation]);

  /*─── Apply rotation to carousel ───*/
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `rotateY(${rotation}deg)`;
    }
  }, [rotation]);

  /*─── Auto-rotation when idle ───*/
  useEffect(() => {
    const startAutoRotate = () => {
      autoRotateRef.current = gsap.to(rotationProxy.current, {
        value: rotationProxy.current.value + 360,
        duration: 60,
        ease: 'none',
        repeat: -1,
        onUpdate: () => {
          setRotation(rotationProxy.current.value);
        },
      });
    };

    const timer = setTimeout(startAutoRotate, 3000);
    return () => {
      clearTimeout(timer);
      autoRotateRef.current?.kill();
    };
  }, []);

  /*─── Drag handlers ───*/
  const handlePointerDown = useCallback((clientX: number) => {
    setIsDragging(true);
    autoRotateRef.current?.kill();
    dragStart.current = { x: clientX, rotation: rotationProxy.current.value };
    lastXRef.current = clientX;
    velocityRef.current = 0;
  }, []);

  const handlePointerMove = useCallback((clientX: number) => {
    if (!isDragging) return;
    const delta = clientX - dragStart.current.x;
    velocityRef.current = clientX - lastXRef.current;
    lastXRef.current = clientX;
    const newRotation = dragStart.current.rotation + delta * 0.3;
    rotationProxy.current.value = newRotation;
    setRotation(newRotation);
  }, [isDragging]);

  const snapToNearest = useCallback(() => {
    const step = ANGLE_STEP;
    const target = Math.round(rotationProxy.current.value / step) * step;
    gsap.to(rotationProxy.current, {
      value: target,
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: () => setRotation(rotationProxy.current.value),
    });
  }, []);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    // Inertia
    const velocity = velocityRef.current;
    if (Math.abs(velocity) > 0.5) {
      gsap.to(rotationProxy.current, {
        value: rotationProxy.current.value + velocity * 10,
        duration: 0.8,
        ease: 'power2.out',
        onUpdate: () => setRotation(rotationProxy.current.value),
        onComplete: snapToNearest,
      });
    } else {
      snapToNearest();
    }
  }, [snapToNearest]);

  /*─── Mouse events ───*/
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    handlePointerDown(e.clientX);
  }, [handlePointerDown]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    handlePointerMove(e.clientX);
  }, [handlePointerMove]);

  const onMouseUp = useCallback(() => {
    handlePointerUp();
  }, [handlePointerUp]);

  /*─── Touch events ───*/
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    handlePointerDown(e.touches[0].clientX);
  }, [handlePointerDown]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    handlePointerMove(e.touches[0].clientX);
  }, [handlePointerMove]);

  const onTouchEnd = useCallback(() => {
    handlePointerUp();
  }, [handlePointerUp]);

  /*─── Navigate to specific speaker ───*/
  const goTo = useCallback((index: number) => {
    autoRotateRef.current?.kill();
    const targetRotation = -index * ANGLE_STEP;
    gsap.to(rotationProxy.current, {
      value: targetRotation,
      duration: 0.8,
      ease: 'power3.inOut',
      onUpdate: () => setRotation(rotationProxy.current.value),
    });
  }, []);

  /*─── Get card visibility style based on angle diff ───*/
  const getCardStyle = (index: number) => {
    const cardAngle = index * ANGLE_STEP;
    const normalizedRot = ((rotation % 360) + 360) % 360;
    let diff = Math.abs(cardAngle - normalizedRot);
    if (diff > 180) diff = 360 - diff;

    // Front card (diff near 0) is brightest, back (diff near 180) is dimmest
    const brightness = Math.max(0.25, 1 - diff / 180 * 0.75);
    const scale = Math.max(0.7, 1 - diff / 180 * 0.3);

    return { brightness, scale, diff };
  };

  const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 260 : 420;

  return (
    <section
      id="speakers"
      ref={sectionRef}
      className="relative bg-black overflow-hidden select-none"
      style={{ minHeight: '100vh' }}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(227,30,36,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(227,30,36,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient glow behind cylinder */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E31E24]/[0.03] blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-16 lg:py-24">
        {/* ─── HEADER ─── */}
        <div ref={titleRef} className="text-center mb-8 lg:mb-12 px-5">
          <p className="font-mono text-[10px] tracking-[0.4em] text-[#E31E24] uppercase mb-3">
            8 Líderes Internacionales
          </p>
          <h2 className="font-display text-t3 text-white">
            Expertos en <span className="text-[#E31E24]">Transporte de Carga</span>
          </h2>
          <p className="mt-3 text-sm text-white/40 max-w-md mx-auto">
            Líderes que están transformando la industria del transporte y la logística en Latinoamérica.
          </p>
        </div>

        {/* ─── 3D CYLINDER SCENE ─── */}
        <div
          ref={sceneRef}
          className="relative w-full flex items-center justify-center"
          style={{ perspective: '1200px', height: 'clamp(360px, 55vh, 480px)' } }
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Invisible drag overlay */}
          <div className={`absolute inset-0 z-50 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`} />

          {/* The rotating carousel */}
          <div
            ref={carouselRef}
            className="relative"
            style={{
              width: '280px',
              height: '380px',
              transformStyle: 'preserve-3d',
              transition: isDragging ? 'none' : undefined,
            }}
          >
            {SPEAKERS.map((speaker, i) => {
              const angle = i * ANGLE_STEP;
              const { brightness, scale } = getCardStyle(i);
              const isActive = i === activeIndex;
              const trackStyle = TRACK_STYLES[speaker.track];

              return (
                <div
                  key={speaker.name}
                  className="absolute left-0 top-0"
                  style={{
                    width: '280px',
                    height: '380px',
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div
                    className={`
                      relative w-full h-full rounded-2xl overflow-hidden
                      transition-all duration-500
                      ${isActive ? 'ring-2 ring-[#E31E24] shadow-[0_0_40px_rgba(227,30,36,0.3)]' : 'ring-1 ring-white/10'}
                    `}
                    style={{
                      transform: `scale(${scale})`,
                      filter: `brightness(${brightness})`,
                      background: 'linear-gradient(180deg, #111 0%, #0a0a0a 100%)',
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    {/* Speaker image */}
                    <div className="relative h-[200px] overflow-hidden">
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="w-full h-full object-cover object-top"
                        style={{
                          filter: isActive ? 'grayscale(0)' : 'grayscale(0.4)',
                          transition: 'filter 0.5s ease',
                        }}
                        draggable={false}
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

                      {/* Country flag badge */}
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1.5 border border-white/10">
                        <span className="text-sm">{speaker.flag}</span>
                        <span className="font-mono text-[9px] text-white/50 uppercase tracking-wider">{speaker.country}</span>
                      </div>

                      {/* Track badge */}
                      <div className={`absolute top-3 left-3 ${trackStyle.bg} border ${trackStyle.border} rounded-full px-2.5 py-1`}>
                        <span className={`font-mono text-[8px] ${trackStyle.text} uppercase tracking-wider`}>
                          {speaker.track}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4 lg:p-5">
                      <h3 className="font-display text-lg text-white leading-tight">
                        {speaker.name}
                      </h3>
                      <p className="font-mono text-[10px] text-[#E31E24] mt-1.5 uppercase tracking-wider">
                        {speaker.role}
                      </p>
                      <p className="text-xs text-white/40 mt-1">
                        {speaker.company}
                      </p>

                      {/* Decorative line */}
                      <div className="mt-4 flex items-center gap-2">
                        <div className={`h-[2px] flex-1 rounded-full transition-all duration-500 ${isActive ? 'bg-[#E31E24]' : 'bg-white/10'}`} />
                        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${isActive ? 'bg-[#E31E24] shadow-[0_0_6px_#E31E24]' : 'bg-white/20'}`} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── DRAG HINT ─── */}
        <div className="mt-4 flex items-center gap-2 text-white/20">
          <MoveHorizontal size={16} />
          <span className="font-mono text-[10px] tracking-wider uppercase">
            Arrastra para explorar
          </span>
        </div>

        {/* ─── DOT INDICATORS ─── */}
        <div className="mt-6 flex items-center gap-2">
          {SPEAKERS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`
                rounded-full transition-all duration-300
                ${i === activeIndex
                  ? 'w-6 h-2 bg-[#E31E24] shadow-[0_0_8px_rgba(227,30,36,0.5)]'
                  : 'w-2 h-2 bg-white/15 hover:bg-white/30'
                }
              `}
              aria-label={`Ver speaker ${i + 1}`}
            />
          ))}
        </div>

        {/* ─── ACTIVE SPEAKER INFO BAR ─── */}
        <div className="mt-6 sm:mt-8 lg:mt-10 text-center px-4 sm:px-5">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-white/5 border border-white/10 rounded-full px-4 sm:px-5 py-2 sm:py-2.5">
            <span className="text-base sm:text-lg">{SPEAKERS[activeIndex].flag}</span>
            <span className="text-xs sm:text-sm text-white font-display">{SPEAKERS[activeIndex].name}</span>
            <span className="hidden sm:block w-px h-4 bg-white/15" />
            <span className="font-mono text-[8px] sm:text-[10px] text-[#E31E24] uppercase tracking-wider">
              {SPEAKERS[activeIndex].track}
            </span>
            <span className="hidden sm:block w-px h-4 bg-white/15" />
            <span className="font-mono text-[8px] sm:text-[10px] text-white/40">
              {activeIndex + 1} / {COUNT}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
