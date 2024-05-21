// server.js
const http = require('http');
const { handleRequests } = require('./route');

const PORT = process.env.PORT || 3000;

const server = http.createServer(handleRequests);

const startServer = () => {
    server.listen(PORT, () => {
        console.log(`Serveur démarré sur le port ${PORT}`);
    });
};

module.exports = { startServer };
