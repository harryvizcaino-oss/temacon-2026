import { useState, useCallback } from 'react';
import { Home, CalendarDays, QrCode, Users, Menu, X, MessageCircle } from 'lucide-react';

export default function MobileBottomNav() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [qrPulse, setQrPulse] = useState(false);

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

  return (
    <>
      {/* ─── BOTTOM NAV ─── */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-[9998] bg-white/95 backdrop-blur-md border-t border-black/5 md:hidden"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
        }}
      >
        <div className="flex items-center justify-around h-16 relative max-w-lg mx-auto">

          {/* Inicio */}
          <button onClick={() => scrollTo('#hero')} className="flex flex-col items-center gap-0.5 w-14 py-1 bg-transparent border-none cursor-pointer">
            <Home size={22} className="text-black/60" strokeWidth={1.5} />
            <span className="text-[9px] font-mono tracking-wide text-black/50">Inicio</span>
          </button>

          {/* Agenda */}
          <button onClick={() => scrollTo('#agenda')} className="flex flex-col items-center gap-0.5 w-14 py-1 bg-transparent border-none cursor-pointer">
            <CalendarDays size={22} className="text-black/60" strokeWidth={1.5} />
            <span className="text-[9px] font-mono tracking-wide text-black/50">Agenda</span>
          </button>

          {/* ─── QR CENTER ─── */}
          <button
            onClick={handleQr}
            className={`
              relative -top-5 flex flex-col items-center justify-center
              w-16 h-16 rounded-full bg-[#E31E24] text-white
              border-4 border-white shadow-lg
              transition-transform cursor-pointer
              ${qrPulse ? 'scale-90' : 'scale-100'}
            `}
            style={{ boxShadow: '0 4px 20px rgba(227,30,36,0.4)' }}
          >
            <QrCode size={26} strokeWidth={2} />
            <span className="text-[7px] font-mono tracking-wider mt-0.5">COMPRAR</span>
          </button>

          {/* Perfiles */}
          <button onClick={() => scrollTo('#audience')} className="flex flex-col items-center gap-0.5 w-14 py-1 bg-transparent border-none cursor-pointer">
            <Users size={22} className="text-black/60" strokeWidth={1.5} />
            <span className="text-[9px] font-mono tracking-wide text-black/50">Perfiles</span>
          </button>

          {/* Más */}
          <button onClick={() => setMoreOpen(true)} className="flex flex-col items-center gap-0.5 w-14 py-1 bg-transparent border-none cursor-pointer">
            <Menu size={22} className="text-black/60" strokeWidth={1.5} />
            <span className="text-[9px] font-mono tracking-wide text-black/50">M&aacute;s</span>
          </button>

        </div>
      </nav>

      {/* ─── FAB WHATSAPP ─── */}
      <a
        href="https://wa.me/573113782522?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20TEMACON%202026"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-[9997] md:hidden flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg"
        style={{
          right: '16px',
          bottom: 'calc(72px + env(safe-area-inset-bottom, 0px))',
          boxShadow: '0 4px 15px rgba(37,211,102,0.4)',
        }}
      >
        <MessageCircle size={22} fill="white" strokeWidth={0} />
      </a>

      {/* ─── MORE SHEET ─── */}
      {moreOpen && (
        <div
          className="fixed inset-0 z-[9999] md:hidden"
          onClick={() => setMoreOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Sheet */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-5 pb-8"
            style={{ paddingBottom: 'calc(32px + env(safe-area-inset-bottom, 0px))' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="w-10 h-1 bg-black/15 rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-bold">M&aacute;s opciones</h3>
              <button
                onClick={() => setMoreOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 cursor-pointer border-none"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Tracks', icon: '🔧', action: () => scrollTo('#tracks') },
                { label: 'Speakers', icon: '🎤', action: () => scrollTo('#speakers') },
                { label: 'Sede', icon: '📍', action: () => scrollTo('#venue') },
                { label: 'Marcas', icon: '🏢', action: () => scrollTo('#brands') },
                { label: 'Flujo', icon: '⚙️', action: () => scrollTo('#flujo') },
                { label: 'FAQ', icon: '❓', action: () => scrollTo('#faq') },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="flex flex-col items-center gap-2 py-4 rounded-xl bg-[#f7f7f7] hover:bg-[#E31E24]/5 transition-colors cursor-pointer border-none"
                >
                  <span className="text-2xl">{item.icon}</span>
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
