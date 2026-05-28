import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Ticket, Calendar, MapPin } from 'lucide-react';
import ZohoRegistrationForm from '@/components/ZohoRegistrationForm';

gsap.registerPlugin(ScrollTrigger);

/**
 * Registration Section - Formulario de registro con Zoho Forms
 *
 * Se integra con Zoho CRM via Zoho Forms.
 * Configurar VITE_ZOHO_FORM_URL en .env
 */

const FORM_URL = import.meta.env.VITE_ZOHO_FORM_URL || '';

export default function Registration() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="register"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, #E31E24 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-12 lg:mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-[#E31E24] uppercase">
            Inscripciones Abiertas
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mt-4 mb-6">
            RESERVA TU <span className="text-[#E31E24]">LUGAR</span>
          </h2>
          <p className="font-mono text-sm text-white/50 max-w-2xl mx-auto">
            Completa el formulario y asegura tu participacion en el evento de tecnologia
            y mantenimiento mas importante de la industria de transporte de carga.
          </p>

          {/* Info cards */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { icon: Calendar, label: '1-2 Septiembre 2026' },
              { icon: MapPin, label: 'Bogota, Colombia' },
              { icon: Ticket, label: 'Cupo Limitado' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2"
              >
                <Icon size={16} className="text-[#E31E24]" />
                <span className="font-mono text-xs text-white/70">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Zoho Form */}
        <div className="max-w-3xl mx-auto">
          {FORM_URL ? (
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-[#E31E24] to-[#b71a20] px-6 py-4">
                <h3 className="font-display text-lg text-white">
                  Formulario de Registro — TEMACON 2026
                </h3>
                <p className="font-mono text-[10px] text-white/70 mt-1">
                  Los datos se sincronizan automaticamente con nuestro CRM
                </p>
              </div>
              <div className="p-6">
                <ZohoRegistrationForm iframeUrl={FORM_URL} height="650px" />
              </div>
            </div>
          ) : (
            <ZohoRegistrationForm />
          )}
        </div>

        {/* Trust badges */}
        <div className="mt-12 text-center">
          <p className="font-mono text-[10px] text-white/30 tracking-wider">
            Powered by Zoho Forms → CRM | Tus datos estan protegidos
          </p>
        </div>
      </div>
    </section>
  );
}
