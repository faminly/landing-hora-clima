#!/bin/bash

# Script de configuración para desarrollo local
# Uso: ./dev-setup.sh

set -e

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}  Configuración de Desarrollo${NC}"
echo -e "${BLUE}================================${NC}"

# Verificar si existe .env
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}Creando archivo .env...${NC}"
    cp env.example .env
    echo -e "${GREEN}Archivo .env creado. Edítalo para agregar tu API key.${NC}"
else
    echo -e "${GREEN}Archivo .env ya existe.${NC}"
fi

# Verificar si WEATHER_API_KEY está configurada
if grep -q "WEATHER_API_KEY=tu_api_key_aqui" .env; then
    echo -e "${YELLOW}⚠️  IMPORTANTE: Configura tu API key en el archivo .env${NC}"
    echo -e "${YELLOW}   1. Edita el archivo .env${NC}"
    echo -e "${YELLOW}   2. Reemplaza 'tu_api_key_aqui' con tu API key real${NC}"
    echo -e "${YELLOW}   3. Obtén tu API key gratuita en: https://openweathermap.org/api${NC}"
else
    echo -e "${GREEN}✅ API key configurada correctamente${NC}"
fi

echo -e "${BLUE}================================${NC}"
echo -e "${GREEN}Configuración completada!${NC}"
echo -e "${BLUE}================================${NC}"
echo ""
echo -e "${GREEN}Para ejecutar la aplicación:${NC}"
echo -e "  • Desarrollo local: Abre index.html en tu navegador"
echo -e "  • Con Docker: ./build.sh run"
echo -e "  • Con Docker Compose: docker-compose up -d" 