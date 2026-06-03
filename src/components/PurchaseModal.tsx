import { useEffect, useRef, useState } from 'react';
import { X, Loader2 } from 'lucide-react';

/**
 * PurchaseModal — Widget INLINE de Zoho Backstage
 * Full-screen modal para compra de tickets
 */

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PurchaseModal({ isOpen, onClose }: PurchaseModalProps) {
  const [scriptsReady, setScriptsReady] = useState(false);
  const scriptsAdded = useRef(false);
  const initAttempts = useRef(0);

  // Cargar scripts de Zoho Backstage
  useEffect(() => {
    if (!isOpen || scriptsAdded.current) return;
    scriptsAdded.current = true;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://static.zohocdn.com/backstage/v1.0/styles/ticket-widget/v1.3/register-widget.min.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://static.zohocdn.com/backstage/v1.0/javascript/ticket-widget/v1.3/register-widget.min.js';
    script.onload = () => setScriptsReady(true);
    document.body.appendChild(script);
  }, [isOpen]);

  // Inicializar widget
  useEffect(() => {
    if (!scriptsReady || !isOpen) return;

    const tryInit = () => {
      if (initAttempts.current > 20) return;
      initAttempts.current++;

      const zbs = (window as any).ZBSCheckOutWidget;
      if (!zbs || !zbs._createWidget) {
        setTimeout(tryInit, 400);
        return;
      }

      try {
        zbs._createWidget(
          {
            eventUrl: 'https://ticketstemacon.tiendacamion.com/embed/TEMACON2026/buyTickets',
            modal: false,
            clickableElements: [],
            ticketClassIdVsSelectorMap: {},
            ticketGroupIdVsSelectorMap: {},
            skipValidation: true,
            widgetOptions: {
              theme: {
                primaryButton: {
                  backgroundColor: '#E31E24',
                  textColor: '#ffffff',
                  borderColor: '#E31E24'
                },
                eventHeader: {
                  backgroundColor: '#1a1a1a',
                  textColor: '#ffffff'
                }
              },
              visibilityOptions: {
                showEventHeader: true,
                showCheckoutProgress: true,
                showBSBranding: false,
                showEventDate: true,
                showEventVenue: true,
                ticketClassIds: [],
                ticketItemGroupIds: []
              },
              messageContents: {
                'lbl.closed': 'Cerrado',
                'lbl.yet.to.start': 'Proximamente',
                'lbl.sales.ended': 'Ventas finalizadas',
                'lbl.unavailable': 'No disponible',
                'lbl.sold.out': 'Agotado',
                'lbl.open': 'Comprar ahora'
              }
            },
            onOrderComplete: function () {
              console.log('Compra completada');
            },
            onClose: function () {
              console.log('Widget cerrado');
            }
          },
          '#zbs-register-widget-section'
        );
      } catch (e) {
        console.error('Error widget:', e);
      }
    };

    setTimeout(tryInit, 600);
  }, [scriptsReady, isOpen]);

  // Cerrar con Escape + bloquear scroll
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-[100vw] h-[100dvh] sm:w-[95vw] sm:h-[95vh] sm:max-w-[1100px] bg-white rounded-none sm:rounded-xl shadow-2xl overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#0a0a0a] border-b border-[#E31E24]/20 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm sm:text-base text-white">TEMACON <span className="text-[#E31E24]">2026</span></span>
            <span className="font-mono text-[8px] sm:text-[10px] text-white/40 tracking-wider">· ADQUIRIR INGRESO</span>
          </div>
          <button onClick={onClose} className="p-2 text-white/40 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Zoho Backstage Widget */}
        <div className="flex-1 overflow-y-auto relative bg-white">

          {/* Loading */}
          {!scriptsReady && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
              <Loader2 size={28} className="text-[#E31E24] animate-spin mb-3" />
              <p className="font-mono text-xs text-black/50 tracking-wider">CARGANDO FORMULARIO...</p>
            </div>
          )}

          {/* Widget container */}
          <div id="zbs-register-widget-section" className="w-full min-h-full" />

        </div>
      </div>
    </div>
  );
}
