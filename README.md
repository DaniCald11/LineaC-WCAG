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

## Criterios WCAG Evaluados
  - **Criterio 1.1.1 - Contenido no textual (Nivel A)**

    Delimitación automatizable: Detección de etiquetas <img> sin atributo alt.

    Limitaciones: La verificación no evalúa la calidad, significancia o coherencia de la descripción contenida en el atributo alt.

## Endpoints REST:

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
  - **Verificación de contenido - Criterio 1.1.1 (Contenido no textual)**

    > Método: `POST` 

    > URL: http://localhost:3000/api/v1/verify

    > Headers: Content-Type: application/json

    Ejemplo de entrada - **Caso que SI cumple:**
    
    ```
    {
      "content": "<div><img src='logo.png' alt='Logo'><img src='banner.png' alt=''></div>"
    }
    ```

    Ejemplo de salida - **PASS:**

    ```
    {
      "status": "success",
      "summary": {
        "totalCriteriaEvaluated": 1,
        "passed": 1,
        "failed": 0
      },
      "results": [
        {
          "criterion": "WCAG 2.1 - 1.1.1 Non-text Content",
          "level": "A",
          "result": "PASS",
          "justification": "Se analizaron 2 imagen(es) y todas cuentan con el atributo 'alt'.",
          "limitations": "El validador verifica automáticamente únicamente la existencia del atributo 'alt'. No evalúa la coherencia del texto descriptivo ni distingue automáticamente imágenes decorativas.",
          "details": {
            "totalImages": 2,
            "imagesWithoutAlt": 0,
            "failingElements": []
          }
        }
      ]
    }
    ```

    Ejemplo de entrada - **Caso que NO cumple:**
    
    ```
    {
      "content": "<div><img src='imagen1.png'></div>"
    }
    ```

    Ejemplo de salida - **FAIL:**

    ```
    {
      "status": "success",
      "summary": {
        "totalCriteriaEvaluated": 1,
        "passed": 0,
        "failed": 1
      },
      "results": [
        {
          "criterion": "WCAG 2.1 - 1.1.1 Non-text Content",
          "level": "A",
          "result": "FAIL",
          "justification": "Se analizaron 1 imagen(es) y se encontraron 1 sin el atributo 'alt'.",
          "limitations": "El validador verifica automáticamente únicamente la existencia del atributo 'alt'. No evalúa la coherencia del texto descriptivo ni distingue automáticamente imágenes decorativas.",
          "details": {
            "totalImages": 1,
            "imagesWithoutAlt": 1,
            "failingElements": [
              "<img src=\"imagen1.png\">"
            ]
          }
        }
      ]
    }
    ```


      
