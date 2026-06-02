import { useEffect, useRef, useState } from 'react';
import { X, CreditCard, Lock, ExternalLink } from 'lucide-react';

/**
 * PurchaseModal — Widget embebido de Zoho Backstage
 * 
 * Zoho Backstage incluye registro + pago en un solo flujo.
 * El widget se embebe como iframe y maneja todo:
 * - Selección de tickets
 * - Formulario de datos del asistente
 * - Pago (tarjeta, PSE, etc.)
 * - Confirmación y envío de entrada por email
 * 
 * Para configurar:
 * 1. Crear evento en Zoho Backstage
 * 2. Ir a Ticketing > Setup > Embeddable Widget
 * 3. Copiar la URL del widget
 * 4. Pegarla en VITE_ZOHO_BACKSTAGE_WIDGET_URL en .env
 */

// URL del widget embebible de Zoho Backstage
const BACKSTAGE_WIDGET_URL = import.meta.env.VITE_ZOHO_BACKSTAGE_WIDGET_URL || '';

// URL de la página de tickets de Backstage (fallback)
const BACKSTAGE_TICKETS_URL = import.meta.env.VITE_ZOHO_BACKSTAGE_TICKETS_URL || '';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PurchaseModal({ isOpen, onClose }: PurchaseModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasWidget = BACKSTAGE_WIDGET_URL || BACKSTAGE_TICKETS_URL;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-[600px] bg-[#0a0a0a] border border-[#E31E24]/20 shadow-2xl overflow-hidden"
        style={{ maxHeight: '92vh' }}
      >
        {/* Corner brackets */}
        <span className="absolute -top-[2px] -left-[2px] w-3 h-3 border-l-2 border-t-2 border-[#E31E24] z-10" />
        <span className="absolute -top-[2px] -right-[2px] w-3 h-3 border-r-2 border-t-2 border-[#E31E24] z-10" />
        <span className="absolute -bottom-[2px] -left-[2px] w-3 h-3 border-l-2 border-b-2 border-[#E31E24] z-10" />
        <span className="absolute -bottom-[2px] -right-[2px] w-3 h-3 border-r-2 border-b-2 border-[#E31E24] z-10" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#E31E24]/10 rounded-lg flex items-center justify-center">
              <Lock size={16} className="text-[#E31E24]" />
            </div>
            <div>
              <p className="font-display text-sm text-white">Registro y Pago</p>
              <p className="font-mono text-[8px] text-white/40 tracking-wider">Zoho Backstage · Transacción segura</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-white/40 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="relative" style={{ height: '65vh', minHeight: '450px' }}>
          {hasWidget ? (
            <>
              {/* Loading spinner */}
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] z-10">
                  <div className="w-10 h-10 border-2 border-[#E31E24] border-t-transparent rounded-full animate-spin mb-3" />
                  <p className="font-mono text-[10px] text-white/40 tracking-wider">CARGANDO FORMULARIO...</p>
                </div>
              )}
              {/* Backstage Widget iframe */}
              <iframe
                src={BACKSTAGE_WIDGET_URL || BACKSTAGE_TICKETS_URL}
                title="Registro TEMACON 2026 — Zoho Backstage"
                className="w-full h-full border-0"
                onLoad={() => setIsLoading(false)}
                allow="payment"
              />
            </>
          ) : (
            /* Fallback: instrucciones de configuración */
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-16 h-16 bg-[#E31E24]/10 rounded-full flex items-center justify-center mb-4">
                <CreditCard size={28} className="text-[#E31E24]" />
              </div>
              <h3 className="font-display text-xl text-white mb-2">
                REGISTRO <span className="text-[#E31E24]">TEMACON 2026</span>
              </h3>
              <p className="font-mono text-[10px] text-white/40 mb-6 max-w-sm">
                Configura Zoho Backstage para activar el registro y pago integrado.
              </p>

              <div className="text-left bg-white/5 border border-white/10 rounded-xl p-5 w-full max-w-sm space-y-3">
                <p className="font-mono text-[9px] text-[#E31E24] tracking-wider uppercase">Pasos para configurar:</p>
                <ol className="space-y-2 font-mono text-[11px] text-white/60">
                  <li className="flex gap-2">
                    <span className="text-[#E31E24] flex-shrink-0">1.</span>
                    <span>Crea el evento en <strong className="text-white">Zoho Backstage</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#E31E24] flex-shrink-0">2.</span>
                    <span>Configura tickets en <strong className="text-white">Ticketing → Setup</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#E31E24] flex-shrink-0">3.</span>
                    <span>Obtén el <strong className="text-white">Embeddable Widget</strong> URL</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#E31E24] flex-shrink-0">4.</span>
                    <span>Pégalo en <strong className="text-white">VITE_ZOHO_BACKSTAGE_WIDGET_URL</strong></span>
                  </li>
                </ol>
              </div>

              {/* Botón demo que redirige a Backstage */}
              <a
                href="https://backstage.zoho.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-[#E31E24] font-mono text-xs tracking-wider hover:underline"
              >
                Ir a Zoho Backstage <ExternalLink size={12} />
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {['Visa', 'MasterCard', 'PSE', 'Amex'].map((m) => (
              <span key={m} className="text-[8px] font-mono text-white/20 px-2 py-1 bg-white/5 rounded">{m}</span>
            ))}
          </div>
          <p className="font-mono text-[8px] text-white/20">
            $399,000 + IVA · Powered by Zoho Backstage
          </p>
        </div>
      </div>
    </div>
  );
}
