const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    console.log('yo')
    app.use(
        '/api',
        createProxyMiddleware({
        target: 'http://localhost:8999/',
        secure: false
        })
    );
};