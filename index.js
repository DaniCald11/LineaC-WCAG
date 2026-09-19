const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Endpoint de prueba 
app.get('/api/v1/verify/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Microservicio de Verificación WCAG (Línea C)',
    message: 'Endpoint funcional para Sprint 0',
    version: '0.1.0',
    timestamp: new Date().toISOString()
  });
});

// Endpoint base (Simulación inicial)
app.post('/api/v1/verify', (req, res) => {
  const { content } = req.body;
  
  res.json({
    status: 'success',
    evaluatedCriteria: 'WCAG 2.1 - Rule 1.1.1 (Non-text Content)',
    result: 'Mock Evaluation - Pending full rules engine in Sprint 1',
    receivedContent: content || 'No content provided'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});