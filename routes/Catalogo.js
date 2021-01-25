const express = require('express');
const TipoDocumento = require('../controllers/Catalogo');
const ComportamientoMascota = require('../controllers/Catalogo')
const catalogoRouter = express.Router();

catalogoRouter.get('/tipoDocumento', TipoDocumento.listarTipoDocumento);
catalogoRouter.get('/comportamientoMascota', ComportamientoMascota.listarComportamientoMascota)

module.exports = {
    catalogoRouter
}