const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(morgan('dev'));

// Routing Logic - Proxy requests to internal services
const routes = {
  '/api/team': process.env.PROJECT_SERVICE_URL,
  '/api/auth': process.env.AUTH_SERVICE_URL,
  '/api/projects': process.env.PROJECT_SERVICE_URL,
  '/api/chat': process.env.CHAT_SERVICE_URL,
  '/api/ai': process.env.AI_SERVICE_URL,
};

// Apply proxies
for (const [path, target] of Object.entries(routes)) {
  const rewrite = path === '/api/team' 
    ? { [`^${path}`]: '/team' } 
    : { [`^${path}`]: '' };

  app.use(path, createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: rewrite,
    onError: (err, req, res) => {
      console.error(`Proxy Error for ${path}:`, err.message);
      res.status(502).json({ error: 'Service Unavailable', message: err.message });
    }
  }));
}

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API Gateway is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
});
