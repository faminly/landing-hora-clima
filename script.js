// Configuración de la API del clima
const WEATHER_API_KEY = 'tu_api_key_aqui'; // Reemplazar con tu API key de OpenWeatherMap
const BUENOS_AIRES_COORDS = {
    lat: -34.6118,
    lon: -58.3960
};

// Elementos del DOM
const temperatureElement = document.getElementById('temperature');
const weatherDescriptionElement = document.getElementById('weather-description');
const currentTimeElement = document.getElementById('current-time');
const currentDateElement = document.getElementById('current-date');
const contactForm = document.getElementById('contact-form');

// Clases CSS para diferentes condiciones climáticas
const weatherClasses = {
    'Clear': 'weather-sunny',
    'Clouds': 'weather-cloudy',
    'Rain': 'weather-rainy',
    'Drizzle': 'weather-rainy',
    'Thunderstorm': 'weather-rainy',
    'Snow': 'weather-rainy',
    'Mist': 'weather-cloudy',
    'Smoke': 'weather-cloudy',
    'Haze': 'weather-cloudy',
    'Dust': 'weather-cloudy',
    'Fog': 'weather-cloudy',
    'Sand': 'weather-cloudy',
    'Ash': 'weather-cloudy',
    'Squall': 'weather-rainy',
    'Tornado': 'weather-rainy'
};

// Imágenes de fondo para diferentes condiciones climáticas y horarios
const backgroundImages = {
    sunny: {
        morning: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Amanecer soleado
        afternoon: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Día soleado
        evening: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' // Atardecer
    },
    cloudy: {
        morning: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Mañana nublada
        afternoon: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Día nublado
        evening: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' // Atardecer nublado
    },
    rainy: {
        morning: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Lluvia de mañana
        afternoon: 'https://images.unsplash.com/photo-1438449805896-28a666819a20?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Lluvia de día
        evening: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' // Lluvia de noche
    },
    night: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' // Noche estrellada
};

// Función para obtener el clima de Buenos Aires
async function getWeatherData() {
    try {
        // URL de la API de OpenWeatherMap
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${BUENOS_AIRES_COORDS.lat}&lon=${BUENOS_AIRES_COORDS.lon}&appid=${WEATHER_API_KEY}&units=metric&lang=es`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Error al obtener datos del clima');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error obteniendo datos del clima:', error);
        // Datos de ejemplo para desarrollo
        return {
            main: { temp: 22 },
            weather: [{ description: 'Soleado', main: 'Clear' }],
            sys: { sunrise: Date.now() - 6 * 60 * 60 * 1000, sunset: Date.now() + 6 * 60 * 60 * 1000 }
        };
    }
}

// Función para actualizar la información del clima en el DOM
function updateWeatherDisplay(weatherData) {
    const temperature = Math.round(weatherData.main.temp);
    const description = weatherData.weather[0].description;
    
    temperatureElement.textContent = temperature;
    weatherDescriptionElement.textContent = description;
    
    // Aplicar clase CSS basada en el clima
    applyWeatherTheme(weatherData.weather[0].main);
}

// Función para obtener el período del día
function getTimeOfDay() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
        return 'morning';
    } else if (hour >= 12 && hour < 18) {
        return 'afternoon';
    } else {
        return 'evening';
    }
}

// Función para aplicar el tema basado en el clima y hora
function applyWeatherTheme(weatherMain) {
    // Remover clases anteriores
    document.body.classList.remove('weather-sunny', 'weather-cloudy', 'weather-rainy', 'weather-night');
    
    // Verificar si es de noche
    const isNight = checkNightMode();
    
    if (isNight) {
        document.body.classList.add('weather-night');
        updateBackgroundImage(backgroundImages.night, 0.6);
    } else {
        // Aplicar clase basada en el clima
        const weatherClass = weatherClasses[weatherMain] || 'weather-sunny';
        document.body.classList.add(weatherClass);
        
        // Obtener período del día
        const timeOfDay = getTimeOfDay();
        
        // Determinar tipo de clima para las imágenes
        let weatherType = 'sunny';
        if (weatherMain === 'Clouds' || weatherMain === 'Mist' || weatherMain === 'Fog' || 
            weatherMain === 'Haze' || weatherMain === 'Smoke' || weatherMain === 'Dust' || 
            weatherMain === 'Sand' || weatherMain === 'Ash') {
            weatherType = 'cloudy';
        } else if (weatherMain === 'Rain' || weatherMain === 'Drizzle' || weatherMain === 'Thunderstorm' || 
                   weatherMain === 'Snow' || weatherMain === 'Squall' || weatherMain === 'Tornado') {
            weatherType = 'rainy';
        }
        
        // Actualizar imagen de fondo
        const backgroundImage = backgroundImages[weatherType][timeOfDay];
        const overlayOpacity = weatherType === 'sunny' ? 0.2 : weatherType === 'cloudy' ? 0.3 : 0.4;
        updateBackgroundImage(backgroundImage, overlayOpacity);
    }
}

// Función para actualizar la imagen de fondo
function updateBackgroundImage(imageUrl, overlayOpacity) {
    const root = document.documentElement;
    root.style.setProperty('--background-image', `url('${imageUrl}')`);
    root.style.setProperty('--background-overlay', `rgba(0, 0, 0, ${overlayOpacity})`);
}

// Función para verificar si es de noche
function checkNightMode() {
    const now = new Date();
    const currentHour = now.getHours();
    
    // Considerar noche entre las 20:00 y las 6:00
    if (currentHour >= 20 || currentHour < 6) {
        return true;
    } else {
        return false;
    }
}

// Función para actualizar la hora y fecha
function updateTime() {
    const now = new Date();
    
    // Formatear hora
    const timeString = now.toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    
    // Formatear fecha
    const dateString = now.toLocaleDateString('es-AR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    currentTimeElement.textContent = timeString;
    currentDateElement.textContent = dateString;
    
    // Verificar modo nocturno cada minuto
    checkNightMode();
}

// Función para manejar el envío del formulario
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData);
    
    // Simular envío del formulario
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;
    
    // Simular delay de envío
    setTimeout(() => {
        // Mostrar mensaje de éxito
        showNotification('¡Mensaje enviado con éxito! Te responderemos pronto.', 'success');
        
        // Resetear formulario
        event.target.reset();
        
        // Restaurar botón
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Agregar estilos inline para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Función para inicializar la aplicación
async function initializeApp() {
    try {
        // Obtener datos del clima
        const weatherData = await getWeatherData();
        updateWeatherDisplay(weatherData);
        
        // Actualizar hora inicial
        updateTime();
        
        // Configurar intervalos
        setInterval(updateTime, 60000); // Actualizar hora cada minuto
        
        // Configurar formulario
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Configurar botones CTA
        const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                showNotification('¡Gracias por tu interés! Esta funcionalidad estará disponible pronto.', 'info');
            });
        });
        
    } catch (error) {
        console.error('Error inicializando la aplicación:', error);
        showNotification('Error al cargar los datos del clima', 'error');
    }
}

// Función para obtener datos de clima simulados (para desarrollo sin API key)
function getMockWeatherData() {
    const conditions = ['Clear', 'Clouds', 'Rain'];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    const temperature = Math.floor(Math.random() * 30) + 10; // Entre 10 y 40°C
    
    return {
        main: { temp: temperature },
        weather: [{ 
            description: randomCondition === 'Clear' ? 'Soleado' : 
                        randomCondition === 'Clouds' ? 'Nublado' : 'Lluvioso',
            main: randomCondition 
        }],
        sys: { 
            sunrise: Date.now() - 6 * 60 * 60 * 1000, 
            sunset: Date.now() + 6 * 60 * 60 * 1000 
        }
    };
}

// Función para alternar entre datos reales y simulados
function toggleWeatherSource() {
    if (WEATHER_API_KEY === 'tu_api_key_aqui') {
        // Usar datos simulados
        const mockData = getMockWeatherData();
        updateWeatherDisplay(mockData);
        console.log('Usando datos simulados del clima');
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    toggleWeatherSource(); // Usar datos simulados si no hay API key
});

// Función para agregar efectos de parallax suave
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-section, .contact-section');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Función para agregar animaciones de entrada
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    const animatedElements = document.querySelectorAll('.hero-section, .contact-section, .footer');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Agregar efectos adicionales
document.addEventListener('DOMContentLoaded', () => {
    addScrollAnimations();
    // addParallaxEffect(); // Descomentar si quieres efecto parallax
});

// Función para manejar errores de red
window.addEventListener('online', () => {
    showNotification('Conexión restaurada', 'success');
});

window.addEventListener('offline', () => {
    showNotification('Sin conexión a internet', 'error');
});

// Exportar funciones para uso en consola (desarrollo)
window.weatherApp = {
    getWeatherData,
    updateWeatherDisplay,
    applyWeatherTheme,
    showNotification
}; 