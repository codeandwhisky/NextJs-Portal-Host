/* Simple local proxy to route paths to each local Next dev server
   Usage: node local-proxy.js
   Proxies:
     /shell -> http://localhost:5001/
     /home-estimation -> http://localhost:5002/
     /home-market-analyser -> http://localhost:5003/
*/

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/shell', createProxyMiddleware({
  target: 'http://localhost:5001',
  changeOrigin: true,
  pathRewrite: { '^/shell': '/' },
  logLevel: 'warn',
}));

app.use('/home-estimation', createProxyMiddleware({
  target: 'http://localhost:5002',
  changeOrigin: true,
  pathRewrite: { '^/home-estimation': '/' },
  logLevel: 'warn',
}));

app.use('/home-market-analyser', createProxyMiddleware({
  target: 'http://localhost:5003',
  changeOrigin: true,
  pathRewrite: { '^/home-market-analyser': '/' },
  logLevel: 'warn',
}));

app.get('/', (req, res) => res.send('Local proxy running. Use /shell, /home-estimation or /home-market-analyser'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Local proxy listening on http://localhost:${PORT}`);
});
