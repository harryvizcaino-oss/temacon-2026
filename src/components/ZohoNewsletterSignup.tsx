import { useState } from 'react';

/**
 * Zoho Campaigns - Newsletter Signup
 *
 * Pasos para configurar:
 * 1. En Zoho Campaigns, ve a Contacts > List Management
 * 2. Selecciona tu mailing list
 * 3. Click en "Sign-up Form"
 * 4. Personaliza el diseño y campos
 * 5. Copia el código embed (iframe o JavaScript)
 * 6. Reemplaza la variable IFRAME_URL abajo
 */

interface ZohoNewsletterSignupProps {
  iframeUrl?: string;
  height?: string;
}

// URL del iframe de Zoho Campaigns - REEMPLAZAR con la tuya
const IFRAME_URL = import.meta.env.VITE_ZOHO_CAMPAIGNS_URL || '';

export default function ZohoNewsletterSignup({
  iframeUrl = IFRAME_URL,
  height = '400px',
}: ZohoNewsletterSignupProps) {
  const [showConfig, setShowConfig] = useState(false);

  if (!iframeUrl) {
    return (
      <div className="text-center">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-md mx-auto">
          <h4 className="font-display text-lg text-white mb-2">Newsletter TEMACON</h4>
          <p className="text-white/50 text-sm mb-4">
            Recibe actualizaciones del evento directamente en tu email.
          </p>
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="text-[#E31E24] text-sm font-mono hover:underline"
          >
            Configurar en Zoho Campaigns
          </button>
          {showConfig && (
            <div className="mt-4 text-left bg-black/50 rounded-lg p-4 text-xs text-white/70 font-mono space-y-2">
              <p>1. Ve a Zoho Campaigns</p>
              <p>2. Contacts → List Management</p>
              <p>3. Selecciona tu mailing list</p>
              <p>4. More Actions → Sign-up Form</p>
              <p>5. Personaliza y copia el embed code</p>
              <p>6. Pega la URL en VITE_ZOHO_CAMPAIGNS_URL</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <iframe
        src={iframeUrl}
        title="Newsletter TEMACON"
        className="w-full border-0 rounded-xl"
        style={{ height, minHeight: '300px' }}
      />
    </div>
  );
}
