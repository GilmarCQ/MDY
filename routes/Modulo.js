const express = require('express');
const Modulo = require('../controllers/Modulo');
const moduloRouter = express.Router();

moduloRouter.post('/crear', Modulo.crearModulo);
moduloRouter.get('/listar', Modulo.listarModulos);
moduloRouter.get('/pagina/listar', Modulo.listarPaginas);
moduloRouter.put('/pagina/editar', Modulo.editarPagina);
moduloRouter.post('/pagina/crear', Modulo.crearPagina);
moduloRouter.delete('/pagina/eliminar', Modulo.eliminarPagina);

module.exports = {
    moduloRouter
}
