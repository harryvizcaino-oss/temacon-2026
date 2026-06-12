import { useEffect } from 'react';

/* ═══════════════════════════════════════════
   ZOHO DESK ASAP — Widget de soporte
   Se carga debajo de la caja de secciones
   ═══════════════════════════════════════════ */

declare global {
  interface Window {
    ZohoDeskAsapReady: (cb?: (() => void)) => void;
    ZohoDeskAsapReadyStatus?: boolean;
    ZohoDeskAsap__asyncalls?: ((() => void) | null)[];
  }
}

export default function ZohoDesk() {
  useEffect(() => {
    /* Evitar duplicar el script si ya existe */
    if (document.getElementById('zohodeskasapscript')) return;

    const d = document;
    const s = d.createElement('script');
    s.type = 'text/javascript';
    s.id = 'zohodeskasapscript';
    s.defer = true;
    s.src = 'https://desk.zoho.com/portal/api/web/asapApp/1268342000001996001?orgId=913100827';

    const t = d.getElementsByTagName('script')[0];
    if (t && t.parentNode) {
      t.parentNode.insertBefore(s, t);
    }

    window.ZohoDeskAsapReady = function (cb: (() => void) | undefined) {
      const e = (window as any).ZohoDeskAsap__asyncalls = (window as any).ZohoDeskAsap__asyncalls || [];
      if ((window as any).ZohoDeskAsapReadyStatus) {
        if (cb) e.push(cb);
        e.forEach((fn: (() => void) | null) => fn && fn());
        (window as any).ZohoDeskAsap__asyncalls = null;
      } else if (cb) {
        e.push(cb);
      }
    };
  }, []);

  return null;
}
