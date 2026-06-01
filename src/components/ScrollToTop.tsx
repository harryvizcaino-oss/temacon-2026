import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * ScrollToTop — Botón flotante con ring de progreso
 * Aparece tras 400px de scroll. El ring SVG muestra
 * el progreso de lectura de la página.
 */

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
      setVisible(scrollTop > 400);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const circumference = 2 * Math.PI * 18;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 left-6 z-[80] w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      style={{
        background: 'rgba(10,0,0,0.85)',
        border: '1px solid rgba(227,30,36,0.3)',
        backdropFilter: 'blur(4px)',
      }}
      aria-label="Volver arriba"
    >
      {/* SVG progress ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
        <circle
          cx="20" cy="20" r="18" fill="none"
          stroke="#E31E24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.1s linear' }}
        />
      </svg>
      <ArrowUp size={16} className="text-white/70 relative z-10" />
    </button>
  );
}
