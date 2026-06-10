/**
 * Meta Pixel — Helper para eventos de Facebook/Instagram Ads
 * Pixel ID: 688486956674568
 */

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

export function metaEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
}

export function metaCustomEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, params);
  }
}

// Eventos predefinidos
export const MetaPixel = {
  // Evento estándar: usuario vio contenido importante (pricing, speakers, etc.)
  viewContent: (contentName: string, contentCategory?: string) =>
    metaEvent('ViewContent', {
      content_name: contentName,
      content_category: contentCategory || 'TEMACON2026',
      content_ids: ['temacon2026_ticket'],
      content_type: 'product',
      value: 399000,
      currency: 'COP',
    }),

  // Evento estándar: usuario inició checkout
  initiateCheckout: () =>
    metaEvent('InitiateCheckout', {
      content_ids: ['temacon2026_ticket'],
      content_type: 'product',
      value: 399000,
      currency: 'COP',
      num_items: 1,
    }),

  // Evento estándar: compra completada
  purchase: (orderId?: string) =>
    metaEvent('Purchase', {
      content_ids: ['temacon2026_ticket'],
      content_type: 'product',
      value: 399000,
      currency: 'COP',
      num_items: 1,
      order_id: orderId,
    }),

  // Evento estándar: lead (registro de interés)
  lead: (contentName?: string) =>
    metaEvent('Lead', {
      content_name: contentName || 'TEMACON2026_Registration',
    }),

  // Evento personalizado: scroll a sección
  scrollToSection: (sectionName: string) =>
    metaCustomEvent('ScrollToSection', { section: sectionName }),

  // Evento personalizado: click en CTA
  clickCTA: (ctaName: string) =>
    metaCustomEvent('ClickCTA', { cta_name: ctaName }),
};
