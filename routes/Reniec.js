const express = require('express');
const Reniec = require('../controllers/Reniec');
const reniecRouter = express.Router();

reniecRouter.get('/consulta', Reniec.getPerson);

module.exports = {
    reniecRouter
}
