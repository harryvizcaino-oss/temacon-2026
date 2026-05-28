/**
 * Zoho Integration - Componente maestro que carga todas las integraciones
 *
 * Este componente centraliza:
 * - SalesIQ: Chatbot y live chat
 * - Forms: Formulario de registro
 * - Campaigns: Newsletter signup
 *
 * Las URLs y códigos se configuran via variables de entorno (.env)
 */

import ZohoSalesIQ from './ZohoSalesIQ';
import ZohoRegistrationForm from './ZohoRegistrationForm';
import ZohoNewsletterSignup from './ZohoNewsletterSignup';

// Exportar componentes individuales
export { ZohoSalesIQ, ZohoRegistrationForm, ZohoNewsletterSignup };

// Widget code de SalesIQ desde env
const SALESIQ_WIDGET = import.meta.env.VITE_ZOHO_SALESIQ_WIDGET || '';
const FORM_URL = import.meta.env.VITE_ZOHO_FORM_URL || '';
const CAMPAIGNS_URL = import.meta.env.VITE_ZOHO_CAMPAIGNS_URL || '';

interface ZohoIntegrationProps {
  /** Cargar solo SalesIQ (chatbot) */
  salesIQOnly?: boolean;
  /** Widget code personalizado */
  widgetCode?: string;
  /** URL del formulario */
  formUrl?: string;
  /** URL del newsletter */
  campaignsUrl?: string;
}

export default function ZohoIntegration({
  salesIQOnly = false,
  widgetCode = SALESIQ_WIDGET,
  formUrl = FORM_URL,
  campaignsUrl = CAMPAIGNS_URL,
}: ZohoIntegrationProps) {
  return (
    <>
      {/* SalesIQ siempre activo en todas las paginas */}
      <ZohoSalesIQ widgetCode={widgetCode} />

      {/* Solo renderizar forms si no es modo salesIQOnly */}
      {!salesIQOnly && (
        <>
          {/* El formulario de registro se usa en la seccion #register */}
          <div id="zoho-registration-form" className="hidden">
            <ZohoRegistrationForm iframeUrl={formUrl} />
          </div>

          {/* El newsletter se usa en el footer */}
          <div id="zoho-newsletter-signup" className="hidden">
            <ZohoNewsletterSignup iframeUrl={campaignsUrl} />
          </div>
        </>
      )}
    </>
  );
}
