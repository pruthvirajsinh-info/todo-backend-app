import express, { type Application, type Request, type Response } from 'express';

const app: Application = express();
const PORT = process.env.PORT || 4001;

// ... other middleware and routes

// Health check route
app.get('/health', (req: Request, res: Response) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'Ok',
    timestamp: new Date().toISOString()
  };

  try {
    res.status(200).json(healthcheck);
  } catch (error) {
    // Log the error for debugging
    console.error('Health check failed:', error);
    healthcheck.message = 'Service Unavailable';
    res.status(503).json(healthcheck);
  }
});

// ... other error handling middleware

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} : http://localhost:${PORT}/health`);
});
