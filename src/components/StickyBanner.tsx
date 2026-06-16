import { Gift } from 'lucide-react';

/* ═══════════════════════════════════════════
   STICKY BANNER — Compra hoy y reclama regalo
   ═══════════════════════════════════════════ */

export default function StickyBanner() {
  return (
    <a
      href="https://wa.me/573113782522?text=Hola%2C%20quiero%20comprar%20mi%20entrada%20a%20TEMACON%202026%20y%20reclamar%20mi%20regalo"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-0 left-0 right-0 z-[10000] bg-[#E31E24] text-white flex items-center justify-center gap-2 sm:gap-3 px-3 py-1.5 sm:py-2"
    >
      <Gift size={13} className="hidden sm:inline flex-shrink-0" />
      <span className="font-display text-[10px] sm:text-xs tracking-wide">
        <strong>¡Compra hoy tu entrada</strong> y reclama tu regalo con nosotros!
      </span>
      <span className="hidden sm:inline text-white/70 text-[9px] ml-1 border border-white/30 rounded-full px-2 py-0.5 hover:bg-white hover:text-[#E31E24] transition-all">
        Comprar Ahora
      </span>
    </a>
  );
}
