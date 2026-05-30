import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import ZohoIntegration from '@/components/ZohoIntegration';
import SectionIndicator from '@/components/SectionIndicator';
import CookieConsentReveal from '@/components/CookieConsentReveal';

import Hero3D from '@/sections/Hero3D';
import Intro from '@/sections/Intro';
import FlujoMantenimiento from '@/sections/FlujoMantenimiento';
import Audience from '@/sections/Audience';
import Tracks from '@/sections/Tracks';
import Venue from '@/sections/Venue';
import Pricing from '@/sections/Pricing';
import Agenda from '@/sections/Agenda';
import Testimonials from '@/sections/Testimonials';
import Brands from '@/sections/Brands';
import Footer from '@/sections/Footer';

/* Lazy load heavy 3D and interactive sections */
const TractoCamion3D = lazy(() => import('@/sections/TractoCamion3D'));
const Speakers = lazy(() => import('@/sections/Speakers'));

function SectionLoader() {
  return (
    <div className="min-h-[400px] bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#E31E24] border-t-transparent rounded-full animate-spin" />
        <p className="font-mono text-[10px] text-white/40 tracking-wider uppercase">Cargando...</p>
      </div>
    </div>
  );
}

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = 'auto'; };
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <div className="min-h-screen bg-temacon-offwhite">
      {/* 6. Custom Cursor */}
      <CustomCursor />

      {/* Cookie consent banner — se revela despues del preloader */}
      {preloaderDone && <CookieConsentReveal />}

      {/* Zoho Integration: SalesIQ Chatbot — carga despues del preloader */}
      {preloaderDone && <ZohoIntegration />}

      {/* Section Indicator HUD — arriba del chatbot */}
      {preloaderDone && <SectionIndicator />}

      {/* 1. Preloader */}
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}

      <Navigation />
      <main>
        {/* 2. Hero 3D — Flota Interactiva */}
        <Hero3D />

        {/* Intro */}
        <Intro />

        {/* 3. Flujo de Mantenimiento Dinámico */}
        <FlujoMantenimiento />

        {/* 10. Marcas Confirmadas */}
        <Brands />

        {/* 4. ¿A Quién Vas a Conocer? */}
        <Audience />

        {/* 5. Tractocamión 3D Interactivo — Lazy loaded */}
        <Suspense fallback={<SectionLoader />}>
          <TractoCamion3D />
        </Suspense>

        {/* 6. Tracks */}
        <Tracks />

        {/* 7. Speakers — Lazy loaded */}
        <Suspense fallback={<SectionLoader />}>
          <Speakers />
        </Suspense>

        {/* 9. Testimoniales Máquina de Escribir */}
        <Testimonials />

        {/* 8. Agenda TEMACON 2026 */}
        <Agenda />

        {/* Venue */}
        <Venue />

        {/* Pricing */}
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

export default App;
