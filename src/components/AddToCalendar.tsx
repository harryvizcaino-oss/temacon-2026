import { CalendarPlus } from 'lucide-react';

/**
 * AddToCalendar — Genera y descarga un archivo .ics
 * para agregar TEMACON 2026 al calendario del usuario.
 */

const EVENT = {
  title: 'TEMACON 2026 — Tecnología, Mantenimiento y Confiabilidad',
  start: '20260901T080000',  // 1 Sept 2026, 8:00 AM Colombia
  end: '20260902T180000',    // 2 Sept 2026, 6:00 PM
  location: 'Bogotá, Colombia',
  description: 'El evento líder de tecnología, mantenimiento y confiabilidad para el transporte de carga en Latinoamérica. 7 tracks, 8+ speakers internacionales, 24 marcas líderes.',
  url: 'https://temacon.tiendacamion.com',
};

function generateICS(): string {
  const uid = `temacon-2026-${Date.now()}@tiendacamion.com`;
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//TIENDACAMION//TEMACON 2026//ES',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART;TZID=America/Bogota:${EVENT.start}`,
    `DTEND;TZID=America/Bogota:${EVENT.end}`,
    `SUMMARY:${EVENT.title}`,
    `DESCRIPTION:${EVENT.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${EVENT.location}`,
    `URL:${EVENT.url}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:Recordatorio TEMACON 2026',
    'TRIGGER:-P1D',  // 1 día antes
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export default function AddToCalendar({ variant = 'button' }: { variant?: 'button' | 'pill' }) {
  const handleDownload = () => {
    const ics = generateICS();
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'TEMACON-2026.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (variant === 'pill') {
    return (
      <button
        onClick={handleDownload}
        className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white/70 hover:text-[#E31E24] hover:border-[#E31E24]/30 transition-all duration-300"
      >
        <CalendarPlus size={14} className="text-[#E31E24]" />
        <span className="font-mono text-[11px] tracking-wider uppercase">Agregar al calendario</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 bg-[#E31E24] text-white px-5 py-2.5 rounded-lg font-mono text-xs tracking-wider uppercase hover:bg-[#b71a20] transition-all duration-300 hover:shadow-[0_0_20px_rgba(227,30,36,0.3)]"
    >
      <CalendarPlus size={14} />
      Agregar al calendario
    </button>
  );
}
