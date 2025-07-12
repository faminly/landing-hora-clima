#!/bin/bash

# Script de entrada para procesar variables de entorno
set -e

echo "Procesando variables de entorno..."

# Verificar si WEATHER_API_KEY está definida
if [ -n "$WEATHER_API_KEY" ]; then
    echo "Configurando API key del clima..."
    # Reemplazar la API key en script.js
    sed -i "s/const WEATHER_API_KEY = 'tu_api_key_aqui';/const WEATHER_API_KEY = '$WEATHER_API_KEY';/g" /usr/share/nginx/html/script.js
    echo "API key configurada correctamente"
else
    echo "WARNING: WEATHER_API_KEY no está definida. La aplicación usará datos simulados."
    # Asegurar que el placeholder esté presente para que funcione el modo simulado
    sed -i "s/const WEATHER_API_KEY = 'tu_api_key_aqui';/const WEATHER_API_KEY = 'tu_api_key_aqui';/g" /usr/share/nginx/html/script.js
fi

# Ejecutar el comando original
exec "$@" 