import { QrCode } from 'lucide-react';

/* ═══════════════════════════════════════════
   STICKY BOTTOM CTA — Barra fija abajo
   Comprar Ticket verde + Mercado Pago
   ═══════════════════════════════════════════ */

export default function StickyBottomCTA() {
  return (
    <a
      href="#pricing"
      className="fixed bottom-0 left-0 right-0 z-[9997] bg-[#22c55e] text-white flex items-center justify-center gap-2 sm:gap-3 px-4 py-3 hover:bg-[#16a34a] transition-all duration-300 glow-pulse-green shadow-[0_-4px_20px_rgba(34,197,94,0.4)]"
    >
      <QrCode size={18} className="flex-shrink-0" />
      <span className="font-display font-bold text-sm sm:text-base">
        Comprar Ticket
      </span>
      <span className="text-white/60 text-[10px] sm:text-xs">
        $399,000 <span className="text-white/40">COP</span>
      </span>
      <span className="hidden sm:inline text-white/40">|</span>
      <span className="hidden sm:flex items-center gap-1.5 text-xs font-medium">
        Pago seguro con
        <img
          src="/mercadopago-banner.png"
          alt="Mercado Pago"
          className="h-5 w-auto object-contain"
        />
      </span>
    </a>
  );
}
