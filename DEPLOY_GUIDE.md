# TEMACON 2026 — Guia de Deploy Automatico

## Estado actual
- **Dominio en vivo:** https://temacon.tiendacamion.com
- **Hosting:** Vercel (conectado a GitHub)
- **Framework:** React + Vite + TypeScript
- **Deploy automatico:** GitHub Actions workflow_dispatch (boton manual)

## Como hacer deploy (para cualquier asistente AI o desarrollador)

### Si ya esta todo configurado en GitHub + Vercel:
1. Asegurate que el codigo este en GitHub: `git push`
2. Ve al repo en GitHub -> tab **Actions**
3. Selecciona **"Deploy to Vercel"**
4. Click **"Run workflow"** -> **"Run workflow"**
5. Listo en ~60 segundos

### Si NO esta configurado (primera vez o se perdio la config):
1. Revisa si existe `.github/workflows/deploy.yml`
2. Si existe, verifica que los secrets esten en GitHub:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
3. Si faltan, siguen las instrucciones abajo.

## Como obtener los secrets de Vercel

### VERCEL_TOKEN
1. Ve a https://vercel.com/account/tokens
2. Create Token -> nombre "GitHub Actions"
3. Copia el token (solo se muestra una vez)

### VERCEL_ORG_ID y VERCEL_PROJECT_ID
1. Ve a tu proyecto en https://vercel.com/dashboard
2. Settings -> General
3. Copia "Project ID" -> es VERCEL_PROJECT_ID
4. Copia "Team ID" o "Personal Account ID" -> es VERCEL_ORG_ID

### Agregar secrets en GitHub
1. Repo -> Settings -> Secrets and variables -> Actions
2. New repository secret (3 veces):
   - VERCEL_TOKEN = [token]
   - VERCEL_ORG_ID = [team/personal ID]
   - VERCEL_PROJECT_ID = [project ID]

## Verificacion rapida
Abre https://temacon.tiendacamion.com y revisa que cargue.

## Historial de cambios importantes
- 2026-05-28: Configuracion inicial de GitHub Actions deploy
- 2026-05-28: Dominio temacon.tiendacamion.com conectado en Vercel
- 2026-05-28: Hero con logo gigante + 3 anillos orbitantes
