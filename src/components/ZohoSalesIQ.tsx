import { useEffect } from 'react';

/**
 * Zoho SalesIQ - Chatbot & Live Chat Embed
 * 
 * Carga el widget de Zoho SalesIQ via script URL.
 * Solo se renderiza despues de que el preloader termine.
 */

interface ZohoSalesIQProps {
  widgetCode?: string;
}

// URL del widget de Zoho SalesIQ para TEMACON
const WIDGET_SCRIPT_URL = 'https://salesiq.zohopublic.com/widget?wc=siqa4b5821555df5cc54cc2d95913658e0267e96af13f996ac83cfc22c121fd0a94';

export default function ZohoSalesIQ({ widgetCode }: ZohoSalesIQProps) {
  useEffect(() => {
    // Preparar el objeto window.$zoho
    if (!(window as any).$zoho) {
      (window as any).$zoho = {};
    }
    if (!(window as any).$zoho.salesiq) {
      (window as any).$zoho.salesiq = { ready: function(){} };
    }

    // Si hay widgetCode inline, usarlo
    if (widgetCode) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = 'zsiqscript';
      script.defer = true;
      script.innerHTML = widgetCode;
      document.body.appendChild(script);
    } else {
      // Sino, cargar via URL (como estaba en index.html)
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = 'zsiqscript';
      script.src = WIDGET_SCRIPT_URL;
      script.defer = true;
      document.body.appendChild(script);
    }

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

  return null;
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
