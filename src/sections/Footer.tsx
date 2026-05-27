const NAV_LINKS = [
  { label: 'Inicio', href: '#' },
  { label: 'Agenda', href: '#tracks' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Registro', href: '#register' },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-temacon-mediumgray">
      <div className="wrapper py-16 lg:py-24">
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-10 border-b border-temacon-charcoal/20">
          <div className="bg-white rounded-xl px-6 py-3 shadow-sm">
            <img
              src="/logo-v2.png"
              alt="TEMACON"
              className="h-14 w-auto object-contain"
            />
          </div>
          <nav className="flex flex-wrap gap-6 lg:gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-temacon-black hover:text-temacon-blue transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom Row */}
        <div className="pt-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <p className="text-sm text-temacon-charcoal">
            © 2026 TEMACON. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap gap-4 lg:gap-6 text-sm">
            <a
              href="mailto:info@temacon.com"
              className="text-temacon-blue hover:underline"
            >
              info@temacon.com
            </a>
            <a
              href="mailto:registro@temacon.com"
              className="text-temacon-blue hover:underline"
            >
              registro@temacon.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
