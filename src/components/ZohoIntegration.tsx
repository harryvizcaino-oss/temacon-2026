/**
 * Zoho Integration — Solo SalesIQ Chatbot
 * Se carga lazy despues del preloader para no bloquear LCP
 */
import { useEffect } from 'react';

export default function ZohoIntegration() {
  useEffect(() => {
    const init = () => {
      try {
        const d = document;
        const w = window as any;
        w.$zoho = w.$zoho || {};
        w.$zoho.salesiq = w.$zoho.salesiq || {
          widgetcode: 'e0806a1b49b4ef24e1016f11eb08c4eb2f49748f0fdad4230858eadebaebbbb7',
          values: {},
          ready: function () {},
        };
        const s = d.createElement('script');
        s.type = 'text/javascript';
        s.id = 'zsiqscript';
        s.defer = true;
        s.src = 'https://salesiq.zohopublic.com/widget';
        const t = d.getElementsByTagName('script')[0];
        t.parentNode?.insertBefore(s, t);
      } catch (_e) {
        // Silenciar errores de carga de Zoho
      }
    };

    // Delay para no competir con recursos críticos
    const timer = setTimeout(init, 2000);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
