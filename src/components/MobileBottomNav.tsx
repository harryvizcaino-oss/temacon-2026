import { useState, useCallback } from 'react';
import { Home, CalendarDays, QrCode, Users, Menu, X } from 'lucide-react';

/* ═══════════════════════════════════════════
   MOBILE BOTTOM NAV — tipo App con QR prominente
   ═══════════════════════════════════════════ */

export default function MobileBottomNav() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [qrPulse, setQrPulse] = useState(false);
  const [activeBtn, setActiveBtn] = useState<string | null>(null);

  const scrollTo = useCallback((id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMoreOpen(false);
  }, []);

  const handleQr = () => {
    setQrPulse(true);
    setTimeout(() => setQrPulse(false), 600);
    window.dispatchEvent(new CustomEvent('open-purchase-modal'));
  };

  /* Efecto táctil: scale down al presionar */
  const touchEffect = (name: string) => {
    setActiveBtn(name);
    setTimeout(() => setActiveBtn(null), 200);
  };

  return (
    <>
      {/* ═══ BOTTOM NAV ═══ */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-[9998] md:hidden"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          background: 'rgba(255,255,255,0.75)',
          backgroundBlendMode: 'luminosity',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderTop: '0.5px solid rgba(255,255,255,0.4)',
          boxShadow: '0 -8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
        }}
      >
        <div className="flex items-center justify-around h-14 relative max-w-lg mx-auto">

          {/* INICIO */}
          <button
            onClick={() => { touchEffect('inicio'); scrollTo('#hero'); }}
            className={`flex flex-col items-center gap-0.5 w-14 py-1 bg-transparent border-none cursor-pointer transition-transform duration-150 ${activeBtn === 'inicio' ? 'scale-75' : 'scale-100'}`}
          >
            <Home size={22} className="text-black/60" strokeWidth={1.5} />
            <span className="text-[9px] font-mono tracking-wide text-black/50">Inicio</span>
          </button>

          {/* AGENDA */}
          <button
            onClick={() => { touchEffect('agenda'); scrollTo('#agenda-speakers'); }}
            className={`flex flex-col items-center gap-0.5 w-14 py-1 bg-transparent border-none cursor-pointer transition-transform duration-150 ${activeBtn === 'agenda' ? 'scale-75' : 'scale-100'}`}
          >
            <CalendarDays size={22} className="text-black/60" strokeWidth={1.5} />
            <span className="text-[9px] font-mono tracking-wide text-black/50">Agenda</span>
          </button>

          {/* ═══ QR CENTER — con glow titilante ═══ */}
          <button
            onClick={handleQr}
            className={`
              relative -top-3 flex flex-col items-center justify-center
              w-14 h-14 rounded-full bg-[#E31E24] text-white
              border-4 border-white shadow-lg
              transition-transform duration-150 cursor-pointer
              ${qrPulse ? 'scale-90' : 'scale-100'}
            `}
            style={{ boxShadow: '0 4px 20px rgba(227,30,36,0.4)' }}
          >
            {/* Glow pulse animado */}
            <span className="absolute inset-0 rounded-full animate-ping opacity-30 bg-[#E31E24]" style={{ animationDuration: '2s' }} />
            <span className="absolute -inset-1 rounded-full animate-pulse opacity-20 bg-[#E31E24]" style={{ animationDuration: '3s' }} />
            <QrCode size={22} strokeWidth={2} className="relative z-10" />
            <span className="text-[6px] font-mono tracking-wider mt-0.5 relative z-10">COMPRAR</span>
          </button>

          {/* PERFILES */}
          <button
            onClick={() => { touchEffect('perfiles'); scrollTo('#audience'); }}
            className={`flex flex-col items-center gap-0.5 w-14 py-1 bg-transparent border-none cursor-pointer transition-transform duration-150 ${activeBtn === 'perfiles' ? 'scale-75' : 'scale-100'}`}
          >
            <Users size={22} className="text-black/60" strokeWidth={1.5} />
            <span className="text-[9px] font-mono tracking-wide text-black/50">Perfiles</span>
          </button>

          {/* MÁS */}
          <button
            onClick={() => { touchEffect('mas'); setMoreOpen(true); }}
            className={`flex flex-col items-center gap-0.5 w-14 py-1 bg-transparent border-none cursor-pointer transition-transform duration-150 ${activeBtn === 'mas' ? 'scale-75' : 'scale-100'}`}
          >
            <Menu size={22} className="text-black/60" strokeWidth={1.5} />
            <span className="text-[9px] font-mono tracking-wide text-black/50">M&aacute;s</span>
          </button>

        </div>
      </nav>

      {/* ═══ MORE SHEET ═══ */}
      {moreOpen && (
        <div className="fixed inset-0 z-[9999] md:hidden" onClick={() => setMoreOpen(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-5 pb-8"
            style={{ paddingBottom: 'calc(32px + env(safe-area-inset-bottom, 0px))' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-black/15 rounded-full mx-auto mb-4" />
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-bold">M&aacute;s opciones</h3>
              <button onClick={() => setMoreOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 cursor-pointer border-none">
                <X size={16} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Tracks', emoji: '🔧', action: () => scrollTo('#tracks') },
                { label: 'Speakers', emoji: '🎤', action: () => scrollTo('#speakers') },
                { label: 'Sede', emoji: '📍', action: () => scrollTo('#venue') },
                { label: 'Marcas', emoji: '🏢', action: () => scrollTo('#brands') },
                { label: 'Flujo', emoji: '⚙️', action: () => scrollTo('#flujo') },
                { label: 'FAQ', emoji: '❓', action: () => scrollTo('#faq') },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="flex flex-col items-center gap-2 py-4 rounded-xl bg-[#f7f7f7] hover:bg-[#E31E24]/5 active:scale-95 transition-all cursor-pointer border-none"
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="text-[10px] font-mono text-black/60">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
