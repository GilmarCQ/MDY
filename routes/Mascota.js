const express = require('express');
const Mascota = require('../controllers/Mascota');
const mascotaRouter = express.Router();

mascotaRouter.post('/registrar', Mascota.registrarMascota);
mascotaRouter.get('/descargarRegistro', Mascota.buscarFichaRegistro);
mascotaRouter.get('/buscarPorRegistro', Mascota.buscarPorRegistro);
mascotaRouter.get('/buscarPorDocumento', Mascota.buscarPorDocumento);
mascotaRouter.get('/buscarPropietarios', Mascota.buscarPropietariosPorRegistro);
mascotaRouter.get('/buscarObservaciones', Mascota.buscarObservacionesRegistro);
mascotaRouter.post('/aprobarRegistro', Mascota.aprobarRegistro);
mascotaRouter.post('/observarRegistro', Mascota.observarRegistro);

module.exports = {
    mascotaRouter
}


