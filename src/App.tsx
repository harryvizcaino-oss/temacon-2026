import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import ZohoIntegration from '@/components/ZohoIntegration';
import SectionIndicator from '@/components/SectionIndicator';
import CookieConsentReveal from '@/components/CookieConsentReveal';
import ScrollToTop from '@/components/ScrollToTop';

/* ═══════════════════════════════════════════
   EAGER — Critical path (First Contentful Paint)
   Hero3D, Intro, FlujoMantenimiento = above the fold
   ═══════════════════════════════════════════ */
import Hero3D from '@/sections/Hero3D';
import Intro from '@/sections/Intro';
import FlujoMantenimiento from '@/sections/FlujoMantenimiento';
import Footer from '@/sections/Footer';

/* ═══════════════════════════════════════════
   LAZY — Below the fold (loaded on demand)
   Reduces initial bundle by ~60KB+ gzipped
   ═══════════════════════════════════════════ */
const Brands        = lazy(() => import('@/sections/Brands'));
const Audience      = lazy(() => import('@/sections/Audience'));
const TractoCamion3D= lazy(() => import('@/sections/TractoCamion3D'));
const Tracks        = lazy(() => import('@/sections/Tracks'));
const Speakers      = lazy(() => import('@/sections/Speakers'));
const Testimonials  = lazy(() => import('@/sections/Testimonials'));
const Agenda        = lazy(() => import('@/sections/Agenda'));
const Venue         = lazy(() => import('@/sections/Venue'));
const Pricing       = lazy(() => import('@/sections/Pricing'));
const FAQ           = lazy(() => import('@/sections/FAQ'));
const LinkedInEvent = lazy(() => import('@/sections/LinkedInEvent'));
const HashtagMarquee = lazy(() => import('@/sections/HashtagMarquee'));

/* Componentes que se usan dentro de secciones lazy */
const ParticleField = lazy(() => import('@/components/ParticleField'));

function SectionLoader() {
  return (
    <div className="min-h-[400px] bg-temacon-offwhite flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#E31E24] border-t-transparent rounded-full animate-spin" />
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
      <CustomCursor />

      {preloaderDone && <CookieConsentReveal />}
      {preloaderDone && <ZohoIntegration />}
      {preloaderDone && <SectionIndicator />}
      {preloaderDone && <ScrollToTop />}

      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}

      <Navigation />
      <main>
        {/* CRITICAL PATH — eager loaded */}
        <Hero3D />
        <Intro />
        <FlujoMantenimiento />

        {/* LAZY — below the fold */}
        <Suspense fallback={<SectionLoader />}>
          <Brands />
        </Suspense>

        {/* Hashtag Marquee — SEO + visual break */}
        <Suspense fallback={<SectionLoader />}>
          <HashtagMarquee />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Audience />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <TractoCamion3D />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <div className="relative">
            <ParticleField />
            <Tracks />
          </div>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <div className="relative">
            <ParticleField />
            <Speakers />
          </div>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Agenda />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Venue />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Pricing />
        </Suspense>

        {/* LinkedIn Event — antes de FAQ */}
        <Suspense fallback={<SectionLoader />}>
          <LinkedInEvent />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <FAQ />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;
