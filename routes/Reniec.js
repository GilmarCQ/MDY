const express = require('express');
const Reniec = require('../controllers/Reniec');
const reniecRouter = express.Router();

reniecRouter.get('/consulta', Reniec.getPerson);
reniecRouter.get('/actualizarCredencial', Reniec.actualizarCredencial);

module.exports = {
    reniecRouter
}
