const express = require('express');
const Asociacion = require('../controllers/Asociacion');
const asociacionRouter = express.Router();

asociacionRouter.get('/listar', Asociacion.listarAsociaciones);

module.exports = {
    asociacionRouter
}