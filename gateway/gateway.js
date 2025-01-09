const http = require('http');
const httpProxy = require('http-proxy');
const port = 5000;

const proxy = httpProxy.createProxyServer({});
const server = http.createServer((req, res) => {
    if (req.url.startsWith('/events')) {
        proxy.web(req, res, { target: 'http://localhost:3000' });
    } else if (req.url.startsWith('/auth')) {
        proxy.web(req, res, { target: 'http://localhost:8000' });
    } else {
        res.statusCode = 404;
        res.end('Route not found');
    }
});

server.listen(port, () => {
    console.log(`Gateway running on port ${port}`);
});
