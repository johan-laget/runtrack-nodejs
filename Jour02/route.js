// routes.js
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.json');

// Utilitaire pour lire les données
const readData = (callback) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, JSON.parse(data));
    });
};

// Utilitaire pour écrire les données
const writeData = (data, callback) => {
    fs.writeFile(dataPath, JSON.stringify(data, null, 4), 'utf8', (err) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null);
    });
};

const handleRequests = (req, res) => {
    if (req.method === 'GET' && req.url === '/tasks') {
        readData((err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Impossible de lire le fichier des tâches.' }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        });
    } else if (req.method === 'POST' && req.url === '/tasks') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            readData((err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Impossible de lire le fichier des tâches.' }));
                    return;
                }
                const tasks = data.tasks;
                const newTask = JSON.parse(body);
                newTask.id = tasks.length + 1;
                tasks.push(newTask);

                writeData(data, (err) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Impossible d\'écrire dans le fichier des tâches.' }));
                        return;
                    }
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(newTask));
                });
            });
        });
    } else if (req.method === 'PUT' && req.url.startsWith('/tasks/')) {
        const taskId = parseInt(req.url.split('/')[2], 10);
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            readData((err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Impossible de lire le fichier des tâches.' }));
                    return;
                }
                const tasks = data.tasks;
                const taskIndex = tasks.findIndex(task => task.id === taskId);
                if (taskIndex === -1) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Tâche non trouvée.' }));
                    return;
                }
                const updatedTask = JSON.parse(body);
                tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };

                writeData(data, (err) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Impossible d\'écrire dans le fichier des tâches.' }));
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(tasks[taskIndex]));
                });
            });
        });
    } else if (req.method === 'DELETE' && req.url.startsWith('/tasks/')) {
        const taskId = parseInt(req.url.split('/')[2], 10);
        readData((err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Impossible de lire le fichier des tâches.' }));
                return;
            }
            const tasks = data.tasks;
            const taskIndex = tasks.findIndex(task => task.id === taskId);
            if (taskIndex === -1) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Tâche non trouvée.' }));
                return;
            }
            tasks.splice(taskIndex, 1);

            writeData(data, (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Impossible d\'écrire dans le fichier des tâches.' }));
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Tâche supprimée avec succès.' }));
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route non trouvée' }));
    }
};

module.exports = { handleRequests };
