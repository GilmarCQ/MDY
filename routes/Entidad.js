const express = require('express');
const Entidad = require('../controllers/Entidad');
const entidadRouter = express.Router();

entidadRouter.get('/buscar', Entidad.buscarEntidad);

module.exports = {
    entidadRouter
}
