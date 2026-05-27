import { useState, useEffect, useCallback } from 'react';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import Hero3D from '@/sections/Hero3D';
import Intro from '@/sections/Intro';
import FlujoMantenimiento from '@/sections/FlujoMantenimiento';
import Audience from '@/sections/Audience';
import TractoCamion3D from '@/sections/TractoCamion3D';
import Tracks from '@/sections/Tracks';

import Speakers from '@/sections/Speakers';
import Venue from '@/sections/Venue';
import Pricing from '@/sections/Pricing';
import Agenda from '@/sections/Agenda';
import Testimonials from '@/sections/Testimonials';
import Brands from '@/sections/Brands';
import Footer from '@/sections/Footer';

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

        {/* 4. ¿A Quien Vas a Conocer? */}
        <Audience />

        {/* 5. Tractocamión 3D Interactivo */}
        <TractoCamion3D />

        {/* 6. Tracks */}
        <Tracks />

        {/* 7. Speakers con Tilt Cards */}
        <Speakers />

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
