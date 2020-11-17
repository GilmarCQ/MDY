const Sequelize = require('sequelize');

const personaModel = require('../models/Persona');
const libroIncidenciasModel = require('../models/LibroIncidencias');
const entidadModel = require('../models/Entidad');

const conexion = new Sequelize(
    'mdyDB', 'mdy', 'qazWSX123456', {
        host: '192.168.1.3',
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

const Persona = personaModel(conexion);
const LibroIncidencias = libroIncidenciasModel(conexion);
const Entidad = entidadModel(conexion);

module.exports = {
    Persona: Persona,
    LibroIncidencias: LibroIncidencias,
    Entidad: Entidad,
    conexion: conexion
}
