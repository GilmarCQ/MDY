const express = require('express');
const PersonaBeneficiario = require('../controllers/PersonaBeneficiario');
const personaBeneficiarioRouter = express.Router();

personaBeneficiarioRouter.post('/agregar', PersonaBeneficiario.agregarBeneficiario);
personaBeneficiarioRouter.get('/buscar', PersonaBeneficiario.buscarPorNumeroDocumento);
personaBeneficiarioRouter.put('/recibir', PersonaBeneficiario.recibirBeneficio);
personaBeneficiarioRouter.put('/recibir-actualizar', PersonaBeneficiario.actualizarEntregaBeneficio);
personaBeneficiarioRouter.get('/contarPorRango', PersonaBeneficiario.contarBeneficiariosPorFecha);
personaBeneficiarioRouter.get('/contarPorRangoAsociacion', PersonaBeneficiario.contarBeneficiariosPorFechaAsociacion);

module.exports = {
    personaBeneficiarioRouter
}