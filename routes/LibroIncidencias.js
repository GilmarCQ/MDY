const express = require('express');
const LibroIncidencia = require('../controllers/LibroIncidencias');
const incidenciasRouter = express.Router();

incidenciasRouter.post('/crear', LibroIncidencia.crearIncidencia);

module.exports = {
    incidenciasRouter
}
