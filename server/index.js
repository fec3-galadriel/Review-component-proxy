const express = require('express');
const app = express();
const PORT = 3000;
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();

const photos = 'http://localhost:3001';
const itemSummary = 'http://localhost:3002';
const relatedProducts = 'http://localhost:3003';
const reviews = 'http://localhost:3004';


app.use('/:id', express.static('./public'));

app.all('/api/photos/:id', (req, res) => {
  proxy.web(req, res, { target: photos })
});

app.all('/api/itemSummary/:id', (req, res) => {
  proxy.web(req, res, { target: itemSummary })
});

app.all('/api/product/:pid', (req, res) => {
  proxy.web(req, res, { target: relatedProducts });
});

app.all('/api/reviews/:id', (req, res) => {
  proxy.web(req, res, { target: reviews })
});

app.listen(PORT, () => console.log(`Proxy server is running on port ${PORT}`));