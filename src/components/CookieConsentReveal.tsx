import { useEffect } from 'react';

/**
 * CookieConsentReveal
 * 
 * Cuando el preloader termina, este componente:
 * 1. Elimina el CSS que oculta el banner de cookies
 * 2. El banner de PageSense aparece con transicion suave
 */

export default function CookieConsentReveal() {
  useEffect(() => {
    // Small delay to let the preloader fade out first
    const timer = setTimeout(() => {
      const style = document.getElementById('cookie-hide');
      if (style) {
        // Fade in by updating the CSS rules
        style.textContent = `
          .zpconsent-banner,
          .zpcookie-banner,
          [class*="cookie"][class*="banner"],
          [class*="consent"][class*="banner"],
          #cookie-banner,
          #consent-banner,
          .cookie-consent,
          .consent-banner {
            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: auto !important;
            transition: opacity 0.5s ease, visibility 0.5s ease;
          }
        `;
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
