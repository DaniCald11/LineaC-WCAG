const express = require('express');
const app = express();
const cheerio = require('cheerio');
const PORT = process.env.PORT || 3000;

app.use(express.json());

// GET /api/v1/verify/health
app.get('/api/v1/verify/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Microservicio de Verificación WCAG (Línea C)',
    message: 'Endpoint funcional para Sprint 0',
    version: '0.1.0',
    timestamp: new Date().toISOString()
  });
});

// POST /api/v1/verify 
app.post('/api/v1/verify', (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({
      status: "error",
      message: "El campo 'content' es requerido en el cuerpo de la solicitud."
    });
  }

  // Cargar contenido con cheerio
  const $ = cheerio.load(content);
  const images = $('img');
  
  let imagesWithoutAltCount = 0;
  const failingElements = [];

  images.each((_, img) => {
    const altAttr = $(img).attr('alt');
    // Fail si no tiene el atributo alt
    if (altAttr === undefined) {
      imagesWithoutAltCount++;
      failingElements.push($.html(img));
    }
  });

  const totalImages = images.length;
  const isPassed = imagesWithoutAltCount === 0;

  // JSON
  const report = {
    status: "success",
    summary: {
      totalCriteriaEvaluated: 1,
      passed: isPassed ? 1 : 0,
      failed: isPassed ? 0 : 1
    },
    results: [
      {
        criterion: "WCAG 2.1 - 1.1.1 Non-text Content",
        level: "A",
        result: isPassed ? "PASS" : "FAIL",
        justification: isPassed
          ? `Se analizaron ${totalImages} imagen(es) y todas cuentan con el atributo 'alt'.`
          : `Se analizaron ${totalImages} imagen(es) y se encontraron ${imagesWithoutAltCount} sin el atributo 'alt'.`,
        limitations: "El validador verifica automáticamente únicamente la existencia del atributo 'alt'. No evalúa la coherencia del texto descriptivo ni distingue automáticamente imágenes decorativas.",
        details: {
          totalImages: totalImages,
          imagesWithoutAlt: imagesWithoutAltCount,
          failingElements: failingElements
        }
      }
    ]
  };

  return res.json(report);
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});