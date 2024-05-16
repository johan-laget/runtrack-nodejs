const http = require('http');
const fs = require('fs');

const host = 'localhost';
const port = 8888;

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    switch (req.url) {
        case "/":
            fs.readFile(__dirname + '/index.html', (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error loading index.html');
                    return;
                }
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            });
        break
        case "/about":
            fs.readFile(__dirname + '/about.html', (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error loading about.html');
                    return;
                }
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            });
        break
        default:
            res.writeHead(404);
            res.end("ERREUR 404: La page que vous avez demandé est introuvable");
        break
    }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
