import { useEffect, lazy, Suspense } from 'react';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
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
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    // Si hay un hash en la URL, scrollear a esa sección
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    }

    // Handler para anchor links: scroll suave compensando nav fijo
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', href);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-temacon-offwhite">
      <CustomCursor />
      <CookieConsentReveal />
      <SectionIndicator />
      <ScrollToTop />

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
