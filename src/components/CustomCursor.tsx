import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check for touch device
    if ('ontouchstart' in window) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    let frame: number;
    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.15;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.15;

      if (cursor) {
        cursor.style.transform = `translate(${posRef.current.x - 20}px, ${posRef.current.y - 20}px)`;
      }

      trailRefs.current.forEach((trail, i) => {
        if (trail) {
          const tx = posRef.current.x - 3;
          const ty = posRef.current.y - 3;
          trail.style.transform = `translate(${tx}px, ${ty}px)`;
          trail.style.opacity = String(0.4 - i * 0.08);
        }
      });

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    window.addEventListener('mousemove', handleMove);

    // Hide on interactive elements
    const handleEnter = () => cursor?.classList.add('cursor-hover');
    const handleLeave = () => cursor?.classList.remove('cursor-hover');

    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <>
      {/* Trail particles */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) trailRefs.current[i] = el; }}
          className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#E31E24] pointer-events-none z-[9998]"
          style={{ opacity: 0 }}
        />
      ))}

      {/* Main crosshair cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] cursor-crosshair-main"
      >
        {/* Horizontal line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#E31E24]" />
        {/* Vertical line */}
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-[#E31E24]" />
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 bg-[#E31E24] rounded-full" />
        {/* Outer ring */}
        <div className="absolute inset-0 border border-[#E31E24]/30 rounded-full" />
      </div>

      <style>{`
        .cursor-crosshair-main.cursor-hover .absolute:last-child {
          transform: scale(1.5);
          border-color: rgba(227, 30, 36, 0.6);
          transition: all 0.3s ease;
        }
        @media (pointer: coarse) {
          .cursor-crosshair-main { display: none; }
        }
      `}</style>
    </>
  );
}
