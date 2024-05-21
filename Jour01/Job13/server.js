const http = require('http');
const fs = require('fs');
const path = require('path');


const serveFile = (filePath, contentType, response) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            response.writeHead(500);
            response.end('Erreur du serveur interne');
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(data, 'utf-8');
        }
    });
};


const server = http.createServer((req, res) => {
    if (req.url === '/') {
        serveFile(path.join(__dirname, 'index.html'), 'text/html', res);
    } else if (req.url === '/about') {
        serveFile(path.join(__dirname, 'about.html'), 'text/html', res);
    } else {
        serveFile(path.join(__dirname, 'error.html'), 'text/html', res);
    }
});

server.listen(3000, () => {
    console.log('Le serveur est démarré sur le port 3000');
});
