import { useEffect } from 'react';

/**
 * Zoho SalesIQ - Chatbot & Live Chat Embed
 *
 * Configuracion requerida en Zoho SalesIQ:
 * 1. Ve a Settings > Brands > [Tu marca] > Installation > Website
 * 2. Copia el codigo de instalacion
 * 3. Extrae el widget code y reemplaza las variables de entorno
 *
 * Para el chatbot (Zobot):
 * - Ve a Settings > Bots > Zobot > Add
 * - Configura el bot con preguntas frecuentes sobre TEMACON
 * - Asocia el bot al brand de tu sitio web
 */

interface ZohoSalesIQProps {
  widgetCode?: string;
}

// Widget code por defecto - REEMPLAZAR con el tuyo de Zoho SalesIQ
const DEFAULT_WIDGET_CODE = import.meta.env.VITE_ZOHO_SALESIQ_WIDGET || '';

export default function ZohoSalesIQ({ widgetCode = DEFAULT_WIDGET_CODE }: ZohoSalesIQProps) {
  useEffect(() => {
    if (!widgetCode) {
      console.warn('[Zoho SalesIQ] No widget code configurado. Ve a Settings > Brands > Installation en Zoho SalesIQ para obtenerlo.');
      return;
    }

    // Insertar el script de Zoho SalesIQ
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'zsiqscript';
    script.defer = true;
    script.innerHTML = widgetCode;
    document.body.appendChild(script);

    // Insertar el div del chat widget
    if (!document.getElementById('zsiqchat')) {
      const chatDiv = document.createElement('div');
      chatDiv.id = 'zsiqchat';
      document.body.appendChild(chatDiv);
    }

    return () => {
      const existingScript = document.getElementById('zsiqscript');
      if (existingScript) document.body.removeChild(existingScript);
      const existingChat = document.getElementById('zsiqchat');
      if (existingChat) document.body.removeChild(existingChat);
    };
  }, [widgetCode]);

  return null; // Este componente no renderiza nada visible
}

// Hook para tracking de acciones personalizadas
export function useZohoTracking() {
  const trackAction = (actionName: string) => {
    if (typeof window !== 'undefined' && (window as any).$zoho && (window as any).$zoho.salesiq) {
      (window as any).$zoho.salesiq.visitor.customaction(actionName);
    }
  };

  return { trackAction };
}
