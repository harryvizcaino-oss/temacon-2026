#!/bin/bash
set -e

# ============================================================
# TEMACON 2026 - Deploy Script
# Automates: Build -> Commit -> Push -> Vercel Deploy
# ============================================================

echo ""
echo "  ==========================================="
echo "    TEMACON 2026 - DEPLOY AUTOMATICO"
echo "  ==========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Build
echo -e "${BLUE}[1/4] Building project...${NC}"
npm run build
echo -e "${GREEN}     Build completed successfully!${NC}"

# Step 2: Git status
echo ""
echo -e "${BLUE}[2/4] Checking git status...${NC}"
git status --short

# Step 3: Commit
echo ""
echo -e "${BLUE}[3/4] Committing changes...${NC}"
read -p "     Commit message (default: 'Update TEMACON 2026'): " msg
msg=${msg:-"Update TEMACON 2026"}
git add -A
git commit -m "$msg" || echo -e "${YELLOW}     No changes to commit${NC}"

# Step 4: Push
echo ""
echo -e "${BLUE}[4/4] Pushing to GitHub...${NC}"
git push origin main || git push origin master
echo -e "${GREEN}     Push completed!${NC}"

echo ""
echo -e "${GREEN}  ==========================================="
echo -e "    DEPLOY INICIADO EN VERCEL!"
echo -e "  ==========================================="
echo -e "${NC}"
echo -e "  Vercel detectara el push y hara deploy"
echo -e "  automaticamente en ~30-60 segundos."
echo ""
echo -e "  Tu sitio: ${YELLOW}https://temacon.tiendacamion.com${NC}"
echo -e "  Dashboard Vercel: ${YELLOW}https://vercel.com/dashboard${NC}"
echo ""
