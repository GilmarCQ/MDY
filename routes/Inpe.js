const express = require('express');
const Inpe = require('../controllers/Inpe');
const inpeRouter = express.Router();

inpeRouter.get('/antecedentes', Inpe.getAntecedentes);

module.exports = {
    inpeRouter
}
