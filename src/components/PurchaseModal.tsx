import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Loader2, CheckCircle, Mail, Calendar } from 'lucide-react';
import { MetaPixel } from '@/lib/meta-pixel';

/**
 * PurchaseModal — Widget INLINE de Zoho Backstage
 * Con pantalla de compra exitosa
 */

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PurchaseModal({ isOpen, onClose }: PurchaseModalProps) {
  const [scriptsReady, setScriptsReady] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const scriptsAdded = useRef(false);
  const initAttempts = useRef(0);

  // Reset orderCompleted + Meta Pixel InitiateCheckout cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setOrderCompleted(false);
      MetaPixel.initiateCheckout();
    }
  }, [isOpen]);

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
              // Meta Pixel: Purchase + pantalla de éxito
              MetaPixel.purchase('TEMACON2026_' + Date.now());
              setOrderCompleted(true);
            },
            onClose: function () {
              // Widget cerrado por el usuario
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

  return createPortal(
    <div className="fixed inset-0 z-[10001]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />

      {/* Modal — pt-9 en mobile compensa el banner fijo */}
      <div className="absolute inset-0 pt-9 sm:pt-0 overflow-hidden flex flex-col bg-white">

        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#0a0a0a] border-b border-[#E31E24]/20 shrink-0 z-10">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm sm:text-base text-white">
              TEMACON <span className="text-[#E31E24]">2026</span>
            </span>
            <span className="font-mono text-[8px] sm:text-[10px] text-white/40 tracking-wider">
              · {orderCompleted ? 'COMPRA EXITOSA' : 'ADQUIRIR INGRESO'}
            </span>
          </div>
          <button onClick={onClose} className="p-2 text-white/40 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto relative bg-white">

          {/* Loading */}
          {!scriptsReady && !orderCompleted && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
              <Loader2 size={28} className="text-[#E31E24] animate-spin mb-3" />
              <p className="font-mono text-xs text-black/50 tracking-wider">CARGANDO FORMULARIO...</p>
            </div>
          )}

          {/* ═══════════════════════════════════════════
              PANTALLA DE COMPRA EXITOSA
              ═══════════════════════════════════════════ */}
          {orderCompleted && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-20 p-6 sm:p-10">
              {/* Success icon */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#E31E24]/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={48} className="text-[#E31E24]" />
              </div>

              {/* Title */}
              <h2 className="font-display text-2xl sm:text-3xl text-black text-center mb-3">
                ¡Compra Exitosa!
              </h2>

              {/* Thank you message */}
              <p className="text-sm sm:text-base text-black/60 text-center max-w-md mb-8 leading-relaxed">
                Gracias por ser parte de <strong className="text-[#E31E24]">TEMACON 2026</strong>. Tu registro ha sido procesado correctamente.
              </p>

              {/* Info cards */}
              <div className="w-full max-w-sm space-y-3 mb-8">
                <div className="flex items-start gap-3 bg-black/[0.03] rounded-xl p-4 border border-black/[0.06]">
                  <Mail size={18} className="text-[#E31E24] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-display text-sm text-black font-medium">Revisa tu correo electrónico</p>
                    <p className="text-xs text-black/50 mt-1">
                      Enviaremos tu ticket de activación y toda la información del evento al correo registrado.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-black/[0.03] rounded-xl p-4 border border-black/[0.06]">
                  <Calendar size={18} className="text-[#E31E24] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-display text-sm text-black font-medium">1-2 de Septiembre, 2026</p>
                    <p className="text-xs text-black/50 mt-1">
                      Cámara de Comercio de Bogotá, Sede Salitre. Te esperamos.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Close */}
              <button
                onClick={onClose}
                className="w-full max-w-sm py-3 bg-[#E31E24] text-white rounded-full font-display font-semibold text-sm hover:bg-black hover:text-white transition-all duration-300 shadow-lg shadow-[#E31E24]/20"
              >
                Cerrar
              </button>

              {/* Footer note */}
              <p className="mt-4 font-mono text-[9px] text-black/30 tracking-wider text-center">
                ¿Preguntas? Escríbenos a contacto@tiendacamion.com
              </p>
            </div>
          )}

          {/* Widget container — oculto cuando la orden está completa */}
          <div id="zbs-register-widget-section" className={`w-full min-h-full ${orderCompleted ? 'hidden' : ''}`} />

        </div>
      </div>
    </div>,
    document.body
  );
}
