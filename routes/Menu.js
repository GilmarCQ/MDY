const express = require('express');
const Menu = require('../controllers/Menu');
const menuRouter = express.Router();

menuRouter.get('/buscar', Menu.buscarUsuarios);
menuRouter.get('/listar', Menu.listarUsuarios);

module.exports = {
    menuRouter
}
