import { useState } from 'react';

/**
 * Zoho Forms - Formulario de Registro a TEMACON 2026
 *
 * Pasos para configurar:
 * 1. En Zoho Forms, crea un nuevo formulario "Registro TEMACON 2026"
 * 2. Agrega campos: Nombre, Email, Empresa, Cargo, Telefono
 * 3. Ve a Integraciones > Zoho CRM > mapea campos al modulo Leads
 * 4. Agrega campo oculto "Lead Source" con valor "TEMACON 2026 Website"
 * 5. Ve a Compartir > Embed > copia la URL del iframe
 * 6. Reemplaza la variable IFRAME_URL abajo
 */

interface ZohoRegistrationFormProps {
  iframeUrl?: string;
  height?: string;
}

// URL del iframe de Zoho Forms - REEMPLAZAR con la tuya
const IFRAME_URL = import.meta.env.VITE_ZOHO_FORM_URL || '';

export default function ZohoRegistrationForm({
  iframeUrl = IFRAME_URL,
  height = '600px',
}: ZohoRegistrationFormProps) {
  const [showForm, setShowForm] = useState(false);

  // Si no hay iframe URL, mostrar boton que abre modal con instrucciones
  if (!iframeUrl) {
    return (
      <div className="text-center py-12">
        <div className="bg-[#E31E24]/10 border border-[#E31E24]/30 rounded-xl p-8 max-w-lg mx-auto">
          <h3 className="font-display text-xl text-white mb-4">Registro TEMACON 2026</h3>
          <p className="text-white/60 text-sm mb-6">
            El formulario de registro se conectará con Zoho CRM.
            Configúralo en Zoho Forms para activarlo.
          </p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#E31E24] text-white px-8 py-3 rounded-full font-display font-semibold hover:bg-white hover:text-[#E31E24] transition-all"
          >
            Ver instrucciones de configuración
          </button>
          {showForm && (
            <div className="mt-6 text-left bg-black/50 rounded-lg p-4 text-xs text-white/70 font-mono space-y-2">
              <p>1. Ve a Zoho Forms</p>
              <p>2. Crea formulario &quot;Registro TEMACON 2026&quot;</p>
              <p>3. Agrega campos: Nombre, Email, Empresa, Cargo</p>
              <p>4. Integra con Zoho CRM (módulo Leads)</p>
              <p>5. Agrega campo oculto: Lead Source = TEMACON 2026</p>
              <p>6. Compartir → Embed → copia URL iframe</p>
              <p>7. Pega la URL en la variable VITE_ZOHO_FORM_URL</p>
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
        title="Registro TEMACON 2026"
        className="w-full border-0 rounded-xl"
        style={{ height, minHeight: '500px' }}
        allow="geolocation; microphone; camera"
      />
    </div>
  );
}
