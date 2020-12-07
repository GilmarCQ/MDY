const express = require('express');
const Usuario = require('../controllers/Usuario');
const usuarioRouter = express.Router();

usuarioRouter.post('/registrar',Usuario.CrearUsuario);
usuarioRouter.post('/login',Usuario.Login);
usuarioRouter.post('/token',Usuario.VerificarToken);

module.exports = {usuarioRouter};