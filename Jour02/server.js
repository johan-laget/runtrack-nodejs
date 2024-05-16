const express = require('express');
const app = express();

app.use(express.json());

const routes = require('./routes');
app.use('/tasks', routes);

module.exports = app;