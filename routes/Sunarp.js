const express = require('express');
const Sunarp = require('../controllers/Sunarp');
const sunarpRouter = express.Router();

sunarpRouter.get('/PJRazonSocial', Sunarp.getPJRazonSocial);
sunarpRouter.get('/titularidadPersona', Sunarp.getPersona);
sunarpRouter.get('/oficinas', Sunarp.getOficinas);
sunarpRouter.get('/asientos', Sunarp.getAsientos);
sunarpRouter.get('/asiento', Sunarp.getAsiento);
sunarpRouter.get('/vehiculo', Sunarp.getVehiculo);

module.exports = {
    sunarpRouter
}
