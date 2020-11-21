const express = require('express');
const PersonaBeneficiario = require('../controllers/PersonaBeneficiario');
const personaBeneficiarioRouter = express.Router();

personaBeneficiarioRouter.post('/agregar', PersonaBeneficiario.agregarBeneficiario);
personaBeneficiarioRouter.get('/buscar', PersonaBeneficiario.buscarPorDni);
personaBeneficiarioRouter.delete('/eliminar', PersonaBeneficiario.eliminarBeneficiario);
personaBeneficiarioRouter.put('/recibir', PersonaBeneficiario.recibirBeneficio);

module.exports = {
    personaBeneficiarioRouter
}