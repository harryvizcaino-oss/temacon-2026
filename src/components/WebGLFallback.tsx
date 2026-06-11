import { useState, useEffect, type ReactNode } from 'react';
import { Cpu } from 'lucide-react';

/**
 * WebGLFallback — Detecta soporte WebGL antes de cargar componentes 3D
 * Si WebGL no está disponible (Safari iOS con restrictions, etc),
 * muestra un fallback visual en vez de un crash.
 */

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch {
    return false;
  }
}

interface WebGLFallbackProps {
  children: ReactNode;
  fallbackMessage?: string;
}

export default function WebGLFallback({
  children,
  fallbackMessage = 'Experiencia 3D no disponible en este dispositivo',
}: WebGLFallbackProps) {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    setHasWebGL(isWebGLAvailable());
  }, []);

  // While checking, render children (they'll handle their own Suspense)
  if (hasWebGL === null) {
    return <>{children}</>;
  }

  if (!hasWebGL) {
    return (
      <div className="relative bg-black overflow-hidden flex flex-col items-center justify-center min-h-[50vh] py-16">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(227,30,36,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(227,30,36,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
            <Cpu size={28} className="text-white/40" />
          </div>
          <h3 className="font-display text-2xl text-white mb-2">
            Experiencia 3D
          </h3>
          <p className="font-mono text-xs text-white/40 tracking-wider max-w-sm">
            {fallbackMessage}
          </p>
          <p className="font-mono text-[10px] text-[#E31E24]/60 tracking-wider mt-3 uppercase">
            Usa Chrome o Firefox en desktop para la experiencia completa
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
