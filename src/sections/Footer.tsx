import { Facebook, Instagram, Linkedin } from 'lucide-react';
import type { ComponentType } from 'react';
import type { LucideProps } from 'lucide-react';

/* ═══════════════════════════════════════════
   FOOTER — Compacto: 4 redes sociales + copyright
   ═══════════════════════════════════════════ */

interface SocialLink {
  icon: ComponentType<LucideProps> | 'tiktok';
  label: string;
  href: string;
}

const SOCIALS: SocialLink[] = [
  { icon: Facebook,  label: 'Facebook',  href: 'https://www.facebook.com/share/1CKDii2Eop/?mibextid=wwXIfr' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/tiendacamion' },
  { icon: Linkedin,  label: 'LinkedIn',  href: 'https://www.linkedin.com/company/tiendacamion' },
  { icon: 'tiktok',  label: 'TikTok',    href: 'https://www.tiktok.com/@tiendacamion.com?_r=1&_t=ZS-96jJHIymlQv' },
];

/* TikTok icon SVG */
function TikTokIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .54.04.79.1v-3.5a6.36 6.36 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.24 8.24 0 0 0 4.83 1.55v-3.5a4.85 4.85 0 0 1-1.07-.11z"/>
    </svg>
  );
}

const MAIN_LINKS = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Tracks', href: '#tracks' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'Marcas', href: '#brands' },
  { label: 'Lugar', href: '#venue' },
];

const EXP_LINKS = [
  { label: 'Exploración 3D', href: '#tractocamion' },
  { label: 'Flujo de Mantenimiento', href: '#flujo' },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-temacon-mediumgray">
      <div className="wrapper py-8 lg:py-10 flex flex-col items-center text-center">

        {/* Logo */}
        <a href="#" className="mb-3">
          <img
            src="/logo-tiendacamion-footer.png"
            alt="TEMACON 2026"
            className="h-10 lg:h-12 w-auto object-contain"
          />
        </a>

        {/* Main Menu */}
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mb-2">
          {MAIN_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-medium text-temacon-black hover:text-[#E31E24] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Experiences */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-[9px] font-mono text-temacon-charcoal/40 tracking-wider uppercase">
            Experiencias
          </span>
          <div className="w-6 h-px bg-temacon-charcoal/20" />
          {EXP_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[10px] text-temacon-charcoal/60 hover:text-[#E31E24] transition-colors font-mono"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social Icons — 4: Facebook, Instagram, LinkedIn, TikTok */}
        <div className="flex items-center gap-3 mb-4">
          {SOCIALS.map(({ icon, label, href }) => {
            const isTikTok = icon === 'tiktok';
            const IconComponent = isTikTok ? null : icon as ComponentType<LucideProps>;
            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 bg-temacon-charcoal/10 hover:bg-[#E31E24] rounded-full flex items-center justify-center transition-all group"
              >
                {isTikTok ? (
                  <span className="text-temacon-charcoal group-hover:text-white transition-colors">
                    <TikTokIcon size={14} />
                  </span>
                ) : IconComponent ? (
                  <IconComponent size={15} className="text-temacon-charcoal group-hover:text-white transition-colors" />
                ) : null}
              </a>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-temacon-charcoal/20 mb-3" />

        {/* Copyright */}
        <p className="font-mono text-[9px] text-temacon-charcoal/40 tracking-wider mb-2">
          &copy; 2026 TIENDACAMION. Todos los derechos reservados.
        </p>

        {/* Email */}
        <a
          href="mailto:contacto@tiendacamion.com"
          className="text-xs text-temacon-blue hover:underline"
        >
          contacto@tiendacamion.com
        </a>
      </div>
    </footer>
  );
}
