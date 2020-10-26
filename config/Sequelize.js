const Sequelize = require('sequelize');

const personaModel = require('../models/Persona');
const libroIncidenciasModel = require('../models/LibroIncidencias');
const entidadModel = require('../models/Entidad');

const conexion = new Sequelize(
    'mdy_apps', 'postgres', 'root', {
        host: 'localhost',
        dialect: 'postgres',
        port: 5432
    }
);

// try {
//     await conexion.authenticate();
//     console.log('La conexion con la base de datos se realizo correctamente.');
// } catch(error) {
//     console.log('No se pudo realizar la conexion con la base de datos', error);
// }

const persona = personaModel(conexion);
const libroIncidencias = libroIncidenciasModel(conexion);
const entidad = entidadModel(conexion);

module.exports = {
    conexion: conexion
}
