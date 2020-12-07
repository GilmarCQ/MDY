const express = require('express');
const Migracion = require('../controllers/Migracion');
const migracionRouter = express.Router();

migracionRouter.get('/consulta', Migracion.getExtrajero);

module.exports = { migracionRouter }

