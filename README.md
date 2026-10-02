# Línea C - Microservicio de Verificación WCAG

## Descripción
Microservicio REST enfocado en evaluar la conformidad de contenidos educativos y web respecto a los criterios de accesibilidad **WCAG 2.1**, generando reportes consolidados en formato JSON para el sistema de aprendizaje adaptativo

## Requisitos previos
- Node.js (versión 18 o superior)
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
     npm run dev
     ```
   O usa `npm start` para producción. Por defecto, el servicio se ejecuta en el puerto 3000 (configurable mediante la variable de entorno PORT).



4. Probar los endpoints REST mínimos:

    - **Health Check** 
  
      > Método: `GET`

      > URL: http://localhost:3000/api/v1/verify/health

      **Ejemplo de respuesta:**

      ```
      {
        "status": "ok",
        "service": "Microservicio de Verificación WCAG (Línea C)",
        "message": "Endpoint funcional para Sprint 0",
        "version": "0.1.0",
        "timestamp": "2026-10-02T02:12:53.315Z"
      }
      ```
    - **Verificación de contenido**

      > Método: `POST` 

      > URL: http://localhost:3000/api/v1/verify

      > Headers: Content-Type: application/json

      **Ejemplo de solicitud:**
    
      ```
      {
        "content": "contenido o HTML a evaluar"
      }
      ```

      **Ejemplo de respuesta:**

      ```
      {
        "status": "success",
        "evaluatedCriteria": "WCAG 2.1 - Rule 1.1.1 (Non-text Content)",
        "result": "Mock Evaluation - Pending full rules engine in Sprint 1",
        "receivedContent": "contenido o HTML a evaluar"
      }
      ```
      
