#!/bin/bash

# Script de construcción para Hora & Clima Landing Page
# Uso: ./build.sh [tag]

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  Hora & Clima - Build Script${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Verificar si Docker está instalado
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker no está instalado. Por favor instala Docker primero."
        exit 1
    fi
}

# Verificar si docker-compose está instalado
check_docker_compose() {
    if ! command -v docker-compose &> /dev/null; then
        print_warning "docker-compose no está instalado. Algunas funcionalidades no estarán disponibles."
    fi
}

# Construir imagen Docker
build_image() {
    local tag=${1:-"latest"}
    print_message "Construyendo imagen Docker con tag: $tag"
    
    docker build -t hora-clima-landing:$tag .
    
    if [ $? -eq 0 ]; then
        print_message "Imagen construida exitosamente"
    else
        print_error "Error al construir la imagen"
        exit 1
    fi
}

# Ejecutar tests básicos
run_tests() {
    print_message "Ejecutando tests básicos..."
    
    # Verificar que los archivos principales existen
    local required_files=("index.html" "styles.css" "script.js")
    
    for file in "${required_files[@]}"; do
        if [ ! -f "$file" ]; then
            print_error "Archivo requerido no encontrado: $file"
            exit 1
        fi
    done
    
    print_message "Tests básicos completados"
}

# Ejecutar contenedor localmente
run_container() {
    local tag=${1:-"latest"}
    local port=${2:-"8080"}
    
    print_message "Ejecutando contenedor en puerto $port"
    
    # Detener contenedor existente si existe
    docker stop hora-clima-app 2>/dev/null || true
    docker rm hora-clima-app 2>/dev/null || true
    
    # Ejecutar nuevo contenedor
    docker run -d \
        --name hora-clima-app \
        -p $port:80 \
        --restart unless-stopped \
        hora-clima-landing:$tag
    
    if [ $? -eq 0 ]; then
        print_message "Contenedor ejecutándose en http://localhost:$port"
        print_message "Para ver logs: docker logs -f hora-clima-app"
        print_message "Para detener: docker stop hora-clima-app"
    else
        print_error "Error al ejecutar el contenedor"
        exit 1
    fi
}

# Ejecutar con docker-compose
run_compose() {
    print_message "Ejecutando con docker-compose..."
    
    docker-compose down 2>/dev/null || true
    docker-compose up -d
    
    if [ $? -eq 0 ]; then
        print_message "Aplicación ejecutándose con docker-compose"
        print_message "Accede en: http://localhost:8080"
        print_message "Para ver logs: docker-compose logs -f"
        print_message "Para detener: docker-compose down"
    else
        print_error "Error al ejecutar docker-compose"
        exit 1
    fi
}

# Limpiar recursos
cleanup() {
    print_message "Limpiando recursos..."
    
    # Detener y remover contenedores
    docker stop hora-clima-app 2>/dev/null || true
    docker rm hora-clima-app 2>/dev/null || true
    
    # Remover imágenes no utilizadas
    docker image prune -f
    
    print_message "Limpieza completada"
}

# Mostrar ayuda
show_help() {
    echo "Uso: $0 [COMANDO] [OPCIONES]"
    echo ""
    echo "Comandos:"
    echo "  build [tag]     Construir imagen Docker (tag opcional, default: latest)"
    echo "  run [tag] [port] Ejecutar contenedor localmente (puerto opcional, default: 8080)"
    echo "  compose         Ejecutar con docker-compose"
    echo "  test            Ejecutar tests básicos"
    echo "  cleanup         Limpiar recursos Docker"
    echo "  help            Mostrar esta ayuda"
    echo ""
    echo "Ejemplos:"
    echo "  $0 build v1.0.0"
    echo "  $0 run v1.0.0 9000"
    echo "  $0 compose"
}

# Función principal
main() {
    print_header
    
    # Verificar dependencias
    check_docker
    check_docker_compose
    
    # Parsear argumentos
    case "${1:-help}" in
        "build")
            build_image "$2"
            ;;
        "run")
            run_container "$2" "$3"
            ;;
        "compose")
            run_compose
            ;;
        "test")
            run_tests
            ;;
        "cleanup")
            cleanup
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

# Ejecutar función principal
main "$@" 