const express = require('express');
const Sede = require('../controllers/Sede');
const sedeRouter = express.Router();

sedeRouter.get('/listar', Sede.listarSedes);

module.exports = {
    sedeRouter
}
