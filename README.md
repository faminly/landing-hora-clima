# Hora & Clima - Landing Page de Buenos Aires

Una landing page moderna y minimalista que cambia dinámicamente su paleta de colores según el clima y la hora del día en Buenos Aires.

## 🌟 Características

- **Diseño Responsive**: Se adapta perfectamente a todos los dispositivos
- **Fondos Dinámicos**: Imágenes de fondo que cambian automáticamente según:
  - **Clima**: Soleado, Nublado, Lluvioso
  - **Hora del día**: Mañana (5:00-12:00), Tarde (12:00-18:00), Noche (18:00-5:00)
- **Colores Dinámicos**: La paleta de colores cambia automáticamente según:
  - **Clima**: Soleado (naranjas/amarillos), Nublado (grises), Lluvioso (azules)
  - **Hora del día**: Modo nocturno automático entre las 20:00 y 6:00
- **Información en Tiempo Real**: Muestra temperatura, descripción del clima, hora y fecha actual
- **Formulario de Contacto**: Funcional con validación y notificaciones
- **Animaciones Suaves**: Transiciones elegantes y efectos de entrada
- **Moderna UI/UX**: Diseño limpio con tipografía Inter y iconos Font Awesome

## 🚀 Instalación

### Desarrollo Local

1. **Clona el repositorio**:
   ```bash
   git clone <tu-repositorio>
   cd landing-hora-clima
   ```

2. **Abre el archivo `index.html`** en tu navegador web

   O si prefieres usar un servidor local:
   ```bash
   # Con Python 3
   python -m http.server 8000
   
   # Con Node.js (si tienes http-server instalado)
   npx http-server
   
   # Con PHP
   php -S localhost:8000
   ```

3. **Accede a la aplicación** en `http://localhost:8000`

### Despliegue con Docker

1. **Construir la imagen**:
   ```bash
   docker build -t hora-clima-landing .
   ```

2. **Ejecutar el contenedor**:
   ```bash
   docker run -d -p 8080:80 --name hora-clima-app hora-clima-landing
   ```

3. **Accede a la aplicación** en `http://localhost:8080`

### Despliegue con Docker Compose

1. **Ejecutar con docker-compose**:
   ```bash
   docker-compose up -d
   ```

2. **Accede a la aplicación** en `http://localhost:8080`

### Despliegue en Coolify

1. **Conecta tu repositorio** a Coolify
2. **Configura el servicio** con los siguientes parámetros:
   - **Puerto**: 80
   - **Comando**: `nginx -g "daemon off;"`
   - **Health Check**: `curl -f http://localhost/health`
3. **Variables de entorno** (opcionales):
   - `NGINX_HOST`: localhost
   - `NGINX_PORT`: 80
4. **Deploy** la aplicación

La aplicación está optimizada para Coolify y incluye:
- ✅ Health checks automáticos
- ✅ Configuración de nginx optimizada
- ✅ Compresión gzip
- ✅ Headers de seguridad
- ✅ Cache headers para archivos estáticos
- ✅ Manejo de errores personalizado

## ⚙️ Configuración de la API del Clima

Para obtener datos reales del clima, necesitas una API key de OpenWeatherMap:

1. **Regístrate** en [OpenWeatherMap](https://openweathermap.org/api)
2. **Obtén tu API key** gratuita
3. **Edita el archivo `script.js`** y reemplaza:
   ```javascript
   const WEATHER_API_KEY = 'tu_api_key_aqui';
   ```
   con tu API key real:
   ```javascript
   const WEATHER_API_KEY = 'tu_api_key_real_aqui';
   ```

### Datos Simulados (Modo Desarrollo)

Si no tienes una API key, la aplicación funcionará con datos simulados que cambian aleatoriamente cada vez que recargas la página.

## 🎨 Fondos y Paletas de Colores

### Fondos Dinámicos
La aplicación utiliza imágenes de Unsplash que cambian según las condiciones:

- **Soleado**: Amaneceres, días soleados y atardeceres
- **Nublado**: Días con nubes y cielos grises
- **Lluvioso**: Días lluviosos y tormentosos
- **Nocturno**: Noches estrelladas y atardeceres

### Paletas de Colores

#### Clima Soleado
- **Primario**: Naranja cálido (#f39c12)
- **Secundario**: Naranja oscuro (#e67e22)
- **Acento**: Rojo (#e74c3c)

#### Clima Nublado
- **Primario**: Gris azulado (#95a5a6)
- **Secundario**: Gris medio (#7f8c8d)
- **Acento**: Gris oscuro (#34495e)

#### Clima Lluvioso
- **Primario**: Azul (#3498db)
- **Secundario**: Azul oscuro (#2980b9)
- **Acento**: Azul muy oscuro (#2c3e50)

#### Modo Nocturno
- **Fondo**: Negro (#1a1a1a)
- **Superficie**: Gris oscuro (#2d2d2d)
- **Texto**: Blanco (#ecf0f1)
- **Primario**: Azul oscuro (#2c3e50)

## 📱 Responsive Design

La aplicación está optimizada para:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🔧 Personalización

### Cambiar Ubicación

Para cambiar la ubicación de Buenos Aires a otra ciudad, edita las coordenadas en `script.js`:

```javascript
const BUENOS_AIRES_COORDS = {
    lat: -34.6118,  // Cambiar latitud
    lon: -58.3960   // Cambiar longitud
};
```

### Modificar Horarios Nocturnos

Para cambiar las horas del modo nocturno, edita en `script.js`:

```javascript
// Considerar noche entre las 20:00 y las 6:00
if (currentHour >= 20 || currentHour < 6) {
    // Modo nocturno
}
```

### Agregar Nuevas Condiciones Climáticas

Para agregar más condiciones climáticas, edita el objeto `weatherClasses` en `script.js`:

```javascript
const weatherClasses = {
    'Clear': 'weather-sunny',
    'Clouds': 'weather-cloudy',
    'Rain': 'weather-rainy',
    'Snow': 'weather-snowy',  // Nueva condición
    // ... más condiciones
};
```

Y agrega los estilos correspondientes en `styles.css`:

```css
.weather-snowy {
    --primary-color: #ffffff;
    --secondary-color: #bdc3c7;
    --accent-color: #95a5a6;
}
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS y Flexbox/Grid
- **JavaScript ES6+**: Funcionalidad dinámica y manejo de APIs
- **Font Awesome**: Iconos
- **Google Fonts**: Tipografía Inter
- **OpenWeatherMap API**: Datos del clima
- **Docker**: Containerización
- **Nginx**: Servidor web optimizado
- **Coolify**: Plataforma de despliegue

## 📋 Funcionalidades

### Header Dinámico
- Muestra ubicación (Buenos Aires)
- Temperatura actual
- Descripción del clima
- Hora y fecha en tiempo real

### Sección Hero
- Título principal con gradiente dinámico
- Descripción de la ciudad
- Botones de llamada a la acción

### Formulario de Contacto
- Campos: Nombre, Email, Asunto, Mensaje
- Validación HTML5
- Simulación de envío con feedback visual
- Notificaciones de éxito

### Footer
- Información de la empresa
- Enlaces útiles
- Redes sociales
- Copyright

## 🎯 Características Técnicas

- **Performance**: Carga rápida y optimizada
- **Accesibilidad**: Cumple con estándares WCAG
- **SEO**: Meta tags y estructura semántica
- **Cross-browser**: Compatible con navegadores modernos
- **PWA Ready**: Preparada para convertirse en PWA
- **Containerized**: Optimizada para Docker y Coolify
- **Security**: Headers de seguridad configurados
- **Caching**: Headers de caché optimizados
- **Compression**: Compresión gzip habilitada
- **Monitoring**: Health checks y logs configurados

## 🐛 Solución de Problemas

### La API del clima no funciona
- Verifica que tu API key sea válida
- Asegúrate de que la API key tenga permisos para la API gratuita
- Revisa la consola del navegador para errores

### Los colores no cambian
- Verifica que JavaScript esté habilitado
- Revisa que no haya errores en la consola
- Asegúrate de que los archivos CSS y JS se carguen correctamente

### El formulario no funciona
- Verifica que todos los campos estén completos
- Revisa la consola para errores de JavaScript
- Asegúrate de que el navegador soporte FormData

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para proyectos personales y comerciales.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarnos a través del formulario en la aplicación.

---

**¡Disfruta explorando Buenos Aires con colores que cambian con el clima!** 🌤️🌙 