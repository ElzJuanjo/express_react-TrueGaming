const express = require('express');
const config = require('./config');
const app = express();
const users= require('./modules/users/routes');

// Configuración
app.set("port", config.app.port);

// Rutas
app.use('/users', users);

module.exports = app;