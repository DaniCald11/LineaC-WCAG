# Línea C - Microservicio de Verificación WCAG

## Descripción
Microservicio REST enfocado en evaluar la conformidad de contenidos educativos y web respecto a los criterios de accesibilidad **WCAG 2.1**, generando reportes consolidados en formato JSON para el sistema de aprendizaje adaptativo

## Requisitos previos
- Node.js (versión 16 o superior)
- npm

## Instalación y ejecución local

1. Clonar el repositorio:
```
git clone https://github.com/DaniCald11/LineaC-WCAG.git
cd LineaC-WCAG
```

2. Instalar dependencias:
```
npm install
```

3. Iniciar el servidor de desarrollo:
```
npm start
```

4. 
Probar los endpoints REST mínimos:

  Health Check: GET http://localhost:3000/api/v1/verify/health

  Verificación: POST http://localhost:3000/api/v1/verify
