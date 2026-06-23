import { useEffect, lazy, Suspense } from 'react';

/* ═══════════════════════════════════════════
   EAGER — Solo Hero (LCP < 2s para Meta)
   Todo lo demas lazy-loaded
   ═══════════════════════════════════════════ */
import Navigation from '@/components/Navigation';
import SectionIndicator from '@/components/SectionIndicator';
import ScrollToTop from '@/components/ScrollToTop';
import StickyBanner from '@/components/StickyBanner';
import StickyBottomCTA from '@/components/StickyBottomCTA';
import Hero3D from '@/sections/Hero3D';
import Footer from '@/sections/Footer';

/* ═══════════════════════════════════════════
   LAZY — Todo below-the-fold carga bajo demanda
   Esto reduce el bundle inicial en ~400KB+
   ═══════════════════════════════════════════ */
const IntroLinkedInUnified = lazy(() => import('@/sections/IntroLinkedInUnified'));
const Audience        = lazy(() => import('@/sections/Audience'));
const FlujoMantenimiento = lazy(() => import('@/sections/FlujoMantenimiento'));
const Brands          = lazy(() => import('@/sections/Brands'));
const HashtagMarquee  = lazy(() => import('@/sections/HashtagMarquee'));
const Tracks          = lazy(() => import('@/sections/Tracks'));
const AgendaSpeakers  = lazy(() => import('@/sections/AgendaSpeakers'));
const Venue           = lazy(() => import('@/sections/Venue'));
const Pricing         = lazy(() => import('@/sections/Pricing'));
const FAQ             = lazy(() => import('@/sections/FAQ'));
const ParticleField   = lazy(() => import('@/components/ParticleField'));
const CustomCursor    = lazy(() => import('@/components/CustomCursor'));
const CookieConsentReveal = lazy(() => import('@/components/CookieConsentReveal'));
const WebGLFallback   = lazy(() => import('@/components/WebGLFallback'));
const TractoCamion3D  = lazy(() => import('@/sections/TractoCamion3D'));

function SectionLoader() {
  return (
    <div className="min-h-[300px] bg-temacon-offwhite" aria-hidden="true" />
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

    // Si ?buy=1 en la URL, abrir modal de compra automáticamente (desde QR)
    const params = new URLSearchParams(window.location.search);
    if (params.get('buy') === '1') {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('open-purchase-modal'));
      }, 1500);
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
      <StickyBanner />
      <SectionIndicator />
      <ScrollToTop />

      {/* Decorativos — lazy loaded para no bloquear LCP */}
      <Suspense fallback={null}>
        <CustomCursor />
        <CookieConsentReveal />
      </Suspense>

      <Navigation />
      <main>
        {/* CRITICAL PATH — Solo Hero para LCP < 2s */}
        <Hero3D />

        {/* LAZY — Todo below-the-fold carga bajo demanda */}
        {/* Intro (2/3) + LinkedIn (1/3) unificados en desktop */}
        <Suspense fallback={<SectionLoader />}>
          <IntroLinkedInUnified />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Audience />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <FlujoMantenimiento />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Brands />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <HashtagMarquee />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <WebGLFallback>
            <TractoCamion3D />
          </WebGLFallback>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <div className="relative">
            <ParticleField />
            <Tracks />
          </div>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <AgendaSpeakers />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Venue />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Pricing />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <FAQ />
        </Suspense>
      </main>

      <Footer />

      {/* Sticky bottom CTA — Comprar Ticket verde */}
      <StickyBottomCTA />
    </div>
  );
}

export default App;
