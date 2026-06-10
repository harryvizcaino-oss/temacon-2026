# MEMORIA DEL PROYECTO — TEMACON 2026

## Estado Actual
- **Dominio en vivo:** https://temacon.tiendacamion.com
- **Hosting:** Vercel conectado a GitHub (repo: temacon-2026)
- **Framework:** React 19 + TypeScript + Vite + Tailwind CSS
- **Estado:** PRODUCCION (deployed y funcionando)
- **Ultima actualizacion:** Junio 2026

---

## Stack Tecnologico
- React 19 + TypeScript + Vite
- Tailwind CSS
- Three.js + @react-three/fiber + @react-three/drei (Kenworth T800 3D)
- GSAP + ScrollTrigger (animaciones)
- Canvas 2D (AutopartParticles 3D en Hero y FAQ)
- Lucide React (iconos)
- Lazy loading agresivo de secciones below-the-fold

---

## Secciones del Sitio (14 en orden)

### 1. Hero 3D
- Logo TEMACON con glow rojo
- Countdown animado (dias, horas, min, seg) hasta 1-2 Sept 2026
- Particulas 3D de autopartes (Canvas 2D) con mouse interaction
- **Mobile:** Fecha en 2 lineas ("1-2 Septiembre 2026 / Bogotá, Colombia")
- **Desktop:** Fecha en 1 linea con `·`
- Aliados estrategicos (LOGYCA, FEDETRANSCARGA) + TIENDACAMION organza
- Título: "ES HORA DE TRANSFORMAR"
  - Mobile: "TECNOLOGIA · MANTENIMIENTO · CONFIABILIDAD" (linea 1) + "TRANSPORTE DE CARGA" (linea 2)
  - Desktop: Todo en 1 linea
- CTA: "Adquirir Ingreso Ahora" → #pricing
- Boton "Agregar al calendario"
- Custom cursor (solo desktop)

### 2. Intro / About
- "El evento líder de mantenimiento" — animacion de texto
- Video de fondo del evento real

### 3. Flujo de Mantenimiento Inteligente
- 6 pasos visuales con imagenes (mtto-01 a mtto-06)
- Boton CTA: "Te gustaria implementar algo asi en tu empresa?" → #pricing

### 4. Marcas Confirmadas
- **Carrusel infinito lento** (50s por ciclo)
- 5 marcas con logo nítido: LogiMiles, puntored, RPV-05, RPV-26, TEMACON
- 21 marcas pendientes con efecto **blurred** + badge "Pronto"
- CTA: "Conviertete en Patrocinador" (WhatsApp)
- CTA rojo: "Conoce todas las opciones de vinculacion Aqui" → PDF portafolio
- **NO se muestra numero total de marcas** (solicitud explicita del usuario)

### 5. Hashtag Marquee (banner SEO)
- **NO es seccion navegable** (no tiene ID, no aparece en menu ni SectionIndicator)
- Banner negro con 100+ hashtags moviendose en 3 filas (direcciones alternas)
- Categorias: TEMACON, transporte de carga, mantenimiento, tecnologia, IoT, IA, componentes, Colombia, roles profesionales, sostenibilidad
- Puramente para SEO semantico + visual break entre marcas y asistente

### 6. Perfil del Asistente (Audience)
- **12 perfiles** en grid con iconos y nombres:
  1. Gerentes de Mantenimiento
  2. Jefes de Compras
  3. Jefes de Taller
  4. Coordinadores de Activos
  5. Técnicos Especializados
  6. Jefes de Flota
  7. Directores de Productividad
  8. Jefes de Tecnología
  9. Gerentes de Operaciones
  10. Jefes de Mejora Continua
  11. Coordinadores de Abastecimiento
  12. Líderes de Transformación Digital
- Estadisticas: 400+ Profesionales | 12 Perfiles | 85% Deciden compras
- **Eliminado:** "6 Países" (por solicitud del usuario)

### 7. Kenworth 3D Experience (TractoCamion3D)
- Modelo T800 interactivo con 10 componentes seleccionables
- Vista exploded (partes separadas radialmente)
- **Scroll funciona normalmente** (enableZoom desactivado en OrbitControls)
- Logo Tiendacamion como decal en el capo
- Panel lateral con especificaciones técnicas
- Lazy-loaded (chunk separado de 27KB)

### 8. Tracks (7 pistas)
- Particulas de fondo (ParticleField)
- Lista de 7 tracks especializados

### 9. Speakers
- Carrusel 3D cilíndrico
- 12 speakers con fotos reales
- **Lazy-loaded**

### 10. ¿Por qué Asistir? (Testimonials)
- **12 frases** por perfil profesional, lenguaje colombiano realista
- Ejemplos: "Necesito optimizar el CPK de mi flota", "El dueño me pide mas viajes con los mismos camiones"
- CTA: "Conoce todas las opciones de vinculacion" → PDF
- Boton en nav desktop + mobile: "Por que Asistir" con icono Sparkles

### 11. Agenda
- Timeline de 2 dias con tracks paralelos

### 12. Sede y Alojamiento (Venue)
- Header: "Sede del evento / #TEMACON2026"
- Imagen **real del auditorio** (foto del evento anterior con branding TEMACON)
- Mini-hero con overlays: "Sede Oficial", "1-2 SEPT 2026 · BOGOTA", nombre del auditorio
- Card flotante con info
- **3 hoteles cercanos** con tiempos de caminata
- 6 info boards (mini-hero, ubicacion, auditorio, hoteles, etc.)

### 13. Registro (Pricing)
- Precio: **$399,000 COP + IVA** (corregido de $400,000)
- 5 beneficios incluidos
- PurchaseModal con Zoho Backstage widget (full screen)
- Pantalla "Compra Exitosa" despues del pago
- **scroll-padding-top: 80px** para que el anchor no quede bajo el nav fijo

### 14. LinkedIn Event
- Card azul LinkedIn
- "TEMACON 2026 en LinkedIn" + CTA "Confirmar Asistencia"
- **Orden:** Aparece ANTES de FAQ (Pricing → LinkedIn → FAQ → Footer)

### 15. FAQ
- Banner unico desplegable
- **11 preguntas** categorizadas como "Evento de Tecnologia, Mantenimiento y Confiabilidad"
- Respuestas actualizadas:
  - 400+ profesionales del sector transporte de carga y sus líderes de tecnologia, mantenimiento y confiabilidad
  - 12 conferencistas **nacionales** (corregido de internacionales)
  - Precio: $399,000 COP + IVA
- CTA WhatsApp al final
- Particulas 3D de fondo (AutopartParticles)

### Footer
- Logo TIENDACAMION
- 4 redes sociales: Facebook, Instagram, LinkedIn, TikTok
- Link: "LinkedIn Event" (NO "LinkedIn Strategy" — eso es privado del CEO/CTO)
- Copyright 2026 TIENDACAMION

---

## Integraciones Zoho

### Zoho SalesIQ (Chatbot) — Pendiente de activacion
- Script en `<head>` del index.html (widgetcode: `e0806a1b49b4ef24e1016f11eb08c4eb2f49748f0fdad4230858eadebaebbbb7`)
- **Para que funcione:** El usuario debe agregar el dominio en el panel de Zoho SalesIQ (Settings → Websites)
- Dominios a agregar: `temacon.tiendacamion.com` y `lzhsdwjc7zvqq.kimi.page`

### Zoho Backstage (Tickets/PurchaseModal)
- Widget de venta de tickets integrado en PurchaseModal.tsx
- Full screen modal con React Portal
- Pantalla de "Compra Exitosa" despues del pago

### Zoho PageSense (Analytics)
- Script al final del body para no bloquear LCP

### LinkedIn Insight Tag
- Script en index.html para retargeting y conversion tracking
- LinkedIn Event: https://www.linkedin.com/events/temacon20267468427912283721730

---

## SEO Implementado

### Meta Tags
- Title: "TEMACON 2026 | Evento de Tecnologia, Mantenimiento y Confiabilidad para Transporte de Carga"
- Description optimizada con precio, fecha, lugar
- 60+ keywords incluyendo TEMACON, TEMACON 2026, TEMACON Bogota, Congreso TEMACON
- OG tags con `og:type: event`, imagen 1200x627
- `article:author/publisher` → LinkedIn TIENDACAMION
- `linkedin:eventUrl` → Evento de LinkedIn
- Google Search Console verification

### Schema.org (4 bloques)
1. **Event** — con alternateName, keywords, sameAs (LinkedIn), coordenadas Geo
2. **Event** (segundo, en body) — con imagenes multiples
3. **Organization** — TIENDACAMION vinculada con TEMACON + LinkedIn
4. **FAQPage** — 7 preguntas para rich snippets en Google
5. **Breadcrumbs** — 6 pasos de navegacion

### Sitemap.xml
- 15 URLs incluyendo todas las secciones + LinkedIn Event
- Imagenes con titles y captions
- hreflang para es-CO y es

### Archivos SEO
- `robots.txt` — allow all + sitemap reference
- `/linkedin-strategy.html` — Documento interno del CEO/CTO (NO linkeado en el footer)

---

## Performance Optimizaciones
- Lazy loading de 10 secciones below-the-fold
- Code splitting: Three.js (lazy) y GSAP (separados)
- 19 imagenes comprimidas (-421KB ahorrados)
- Critical CSS inline en `<head>`
- `display=swap` en fuentes Google
- `fetchpriority="high"` en hero images
- DNS prefetch a todos los servicios externos
- React.memo en Navigation y SectionIndicator
- `prefers-reduced-motion` media query

---

## Navegacion

### Desktop
- 6 links: Inicio, Flujo, Sponsors, 3D, Agenda, FAQ
- 3 CTAs agrupados: "Por que Asistir" (rojo) + "Patrocinar" (outline) + "Ingreso" (rojo solido)
- Glassmorphism backdrop-blur-2xl al hacer scroll

### Mobile (hamburguesa)
- Boton destacado arriba: "Por que Asistir +12 razones"
- 14 secciones en lista con numeracion
- 2 CTAs abajo: "Quiero Patrocinar" + "Adquirir Ingreso Ahora"

### Section Indicator (HUD)
- 14 secciones, ancho fijo 72px
- Formato: 01/14 con nombre de seccion actual
- Re-check cada 500ms para secciones lazy-loaded

---

## Datos Importantes
- **Color principal:** #E31E24 (rojo)
- **Fecha evento:** 1-2 de Septiembre 2026
- **Lugar:** Camara de Comercio de Bogota, Av. El Dorado
- **Precio:** $399,000 COP + IVA
- **Conferencistas:** 12 nacionales
- **Tracks:** 7 especializados
- **Asistentes:** 400+ profesionales
- **Perfiles asistente:** 12 roles
- **Email:** contacto@tiendacamion.com
- **WhatsApp:** +57 311 378 2522
- **Redes sociales:** tiendacamion (Facebook, Instagram, LinkedIn, TikTok)
- **LinkedIn Event:** https://www.linkedin.com/events/temacon20267468427912283721730

---

## Archivos Clave
- `/index.html` — SEO, Schema.org, Zoho scripts, Critical CSS
- `/src/App.tsx` — Lazy loading de secciones, orden de secciones
- `/src/components/Navigation.tsx` — Desktop + mobile menu
- `/src/components/SectionIndicator.tsx` — HUD de 14 secciones
- `/src/components/PurchaseModal.tsx` — Modal de compra con Zoho Backstage
- `/public/logo-v2-tight.png` — Logo hero (transparente, recortado)
- `/public/venue.jpg` — Foto real del auditorio
- `/public/aliados-organiza.png` — Aliados estrategicos
- `/public/temacon-portafolio-vinculacion.pdf` — PDF patrocinios
- `/public/linkedin-strategy.html` — Estrategia LinkedIn (privado)
- `/vercel.json` — Config Vercel
- `/MEMORIA.md` — Este archivo
