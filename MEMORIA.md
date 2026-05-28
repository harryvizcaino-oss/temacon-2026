# MEMORIA DEL PROYECTO — TEMACON 2026

## Resumen Ejecutivo
Landing page completa para el evento **TEMACON 2026** (Tecnologia, Mantenimiento y Confiabilidad para Transporte de Carga), desarrollada con React + TypeScript + Vite. El sitio esta deployado en Vercel con dominio propio temacon.tiendacamion.com.

---

## Contexto del Proyecto
- **Cliente:** Evento TEMACON 2026
- **Fecha del evento:** 1-2 de Septiembre 2026, Bogota, Colombia
- **Enfoque:** Transporte de carga (tractocamiones, flotas, mantenimiento)
- **Publico objetivo:** 400+ profesionales del sector
- **Estado:** Produccion (en vivo)

---

## Stack Tecnologico
- **Framework:** React 19 + TypeScript + Vite
- **Estilos:** Tailwind CSS
- **3D:** Three.js + @react-three/fiber + @react-three/drei
- **Animaciones:** GSAP + ScrollTrigger
- **Efectos visuales:** Canvas 2D (particulas IoT, estrellas)
- **Smooth scroll:** Lenis
- **Iconos:** Lucide React
- **Deploy:** Vercel conectado a GitHub
- **Dominio:** temacon.tiendacamion.com
- **CI/CD:** GitHub Actions (workflow_dispatch)

---

## Estructura del Proyecto (secciones)

### 1. Preloader (src/components/Preloader.tsx)
- Terminal cinematico con animacion de texto tipo hacker
- Safety timeout de 4 segundos maximo
- Se resolvio bug donde bloqueaba el contenido

### 2. Custom Cursor (src/components/CustomCursor.tsx)
- Crosshair industrial rojo
- Deshabilitado en dispositivos touch

### 3. Hero 3D (src/sections/Hero3D.tsx) — Seccion principal
- **Layout en 3 zonas:**
  - TOP: Fecha + countdown compacto
  - CENTER: Logo gigante (~60% de viewport) + 3 anillos orbitantes
  - BOTTOM: Titulo "ES HORA DE TRANSFORMAR" + CTA
- **Logo:** `logo-v2.png` — tamano `w-[75vw] lg:w-[50vw] max-w-[700px]`
- **3 anillos orbitantes CSS** con 8 iconos tecnologicos rotando
  - Inner (Transporte, Tecnologia, Mantenimiento)
  - Middle (Confiabilidad, Rutas, Comunicacion)
  - Outer (Eficiencia, Monitoreo)
- Animacion con `@keyframes orbitSpin` y counter-rotation para iconos
- Estrellas de fondo con CSS animation

### 4. Intro / Tracks (src/sections/Tracks.tsx)
- 4 tracks en acordeones desplegables
- Colores: rojo #E31E24, gris, negro
- Tracks: Telematica e IoT, Mantenimiento Predictivo, Confiabilidad, Gestion de Flotas

### 5. Video Manifesto / Flujo de Mantenimiento (src/sections/FlujoMantenimiento.tsx)
- Narrativa visual de 6 pasos de mantenimiento
- Modern board con senal de datos animada
- Imagenes mtto-01 a mtto-06

### 6. Tractocamion 3D (src/sections/TractoCamion3D.tsx)
- Modelo Kenworth T800 interactivo
- 10 componentes seleccionables con panel lateral de informacion

### 7. Speakers (src/sections/Speakers.tsx)
- Grid CSS (se reemplazo Swiper por problemas de scroll vertical)
- Fotos en carpeta /public/speakers/

### 8. Dashboard / Centro de Control (src/sections/Dashboard.tsx)
- Panel de trafico blanco con placas dinamicas rotando
- Tarjeta informativa de Colombia (reemplazo del globo 3D)

### 9. Pricing (src/sections/Pricing.tsx)
- Dos columnas: Early Bird vs Regular
- Fondo blanco, cards negras con header negro TEMACON + footer rojo
- Toggle entre precios Early Bird y Regular
- Se eliminaron trust badges a peticion del usuario

### 10. Venue (src/sections/Venue.tsx)
- Informacion del lugar en Bogota

### 11. Footer
- Header negro TEMACON + footer rojo TEMACON

---

## Historial de Bugs y Fixes

1. **Preloader bloqueaba contenido** → Simplificado a timeout de 4s
2. **Assets no cargaban (pagina en blanco)** → Corregido base path de `/eventos/temacon/` a `/`
3. **Pricing cards en blanco** → Eliminada animacion GSAP stagger que dejaba cards en opacity 0
4. **Anillos orbitantes no visibles** → Rehice 3 veces (CSS complejo → SVG → CSS puro con position absolute)
5. **Logo no se leia sobre fondo negro** → Cambiado de logo-new.png a logo-temacon.png, luego a logo-v2.png
6. **Speakers Swiper bloqueaba scroll vertical** → Reemplazado por grid CSS
7. **Build TypeScript** → Multiples fixes de variables no usadas

---

## Iteraciones de Diseno (decisiones del usuario)

- Se agregaron 6 features innovadoras: Preloader, Cursor, Tilt Cards, Testimoniales maquina de escribir, Pipeline scroll horizontal, Globo 3D
- Pivot a transporte de carga (todo el contenido reescrito)
- Secciones eliminadas a peticion: Newsletter, Pipeline Scroll, Globo 3D seccion, trust badges
- Hero redisenado ~10 veces segun feedback visual
- Logo aumentado hasta cubrir 60% de la pantalla
- Anillos orbitantes tipo sistema solar agregados

---

## Configuracion de Deploy

### Vercel (vercel.json)
```json
{
  "framework": "vite",
  "buildCommand": "npm install && npx vite build",
  "outputDirectory": "dist",
  "rewrites": [{"source": "/(.*)", "destination": "/index.html"}]
}
```

### GitHub Actions (.github/workflows/deploy.yml)
- Trigger: `workflow_dispatch` (boton manual en GitHub)
- Instala dependencias, hace build, deploya a Vercel con CLI
- Requiere 3 secrets en GitHub: VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID

### Dominio
- **temacon.tiendacamion.com** — configurado via CNAME en Squarespace apuntando a cname.vercel-dns.com
- SSL automatico generado por Vercel

---

## Archivos Clave
- `/logo-v2.png` — Logo principal del hero (DEBE ser transparente)
- `/public/speakers/` — Fotos de speakers
- `/public/brands/` — Logos de marcas patrocinadoras
- `/mtto-01-falla.jpg` a `/mtto-06-ruta.jpg` — Imagenes del flujo de mantenimiento
- `/hero-bg.jpg`, `/hero-fleet.jpg`, `/hero-maintenance.jpg`, `/hero-tech.jpg` — Hero backgrounds
- `/venue.jpg` — Imagen del venue

---

## Comandos Utiles
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para produccion
./deploy.sh      # Build + Commit + Push + Deploy manual
```

---

## Notas para Futuros Cambios
- El base path de Vite debe mantenerse como `/` (no subdirectorios)
- Los assets se sirven desde /public/ y Vite los copia a dist/
- El deploy.sh ya esta configurado y probado
- Si Vercel falla, verificar que los 3 secrets esten configurados en GitHub
- El usuario es muy visual: prefiere screenshots y ajustes iterativos rapidos
- El color principal es #E31E24 (rojo del logo)
