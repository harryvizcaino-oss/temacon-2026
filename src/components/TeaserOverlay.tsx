import { EyeOff } from 'lucide-react';

/**
 * TeaserOverlay — Muestra contenido borroso con "Conoce más pronto"
 * Usar cuando la info aún no está confirmada pero queremos mostrar teaser
 */

interface TeaserOverlayProps {
  message?: string;
  submessage?: string;
}

export default function TeaserOverlay({
  message = 'Conoce mas pronto',
  submessage = 'Estamos preparando algo increible para ti',
}: TeaserOverlayProps) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
      {/* Backdrop blur */}
      <div
        className="absolute inset-0 backdrop-blur-md bg-black/40"
        style={{ backdropFilter: 'blur(8px)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4">
          <EyeOff size={28} className="text-white/60" />
        </div>
        <h3 className="font-display text-3xl lg:text-4xl text-white mb-2">
          {message}
        </h3>
        <p className="font-mono text-xs text-white/40 tracking-wider max-w-sm">
          {submessage}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <div className="w-2 h-2 bg-[#E31E24] rounded-full animate-pulse" />
          <span className="font-mono text-[10px] text-[#E31E24] tracking-wider uppercase">
            Proximamente
          </span>
        </div>
      </div>
    </div>
  );
}
