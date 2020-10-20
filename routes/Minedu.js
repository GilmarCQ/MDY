const express = require('express');
const Minedu = require('../controllers/Minedu');
const mineduRouter = express.Router();

mineduRouter.get('/consulta', Minedu.getGradosTitulos);

module.exports = {
    mineduRouter
}
