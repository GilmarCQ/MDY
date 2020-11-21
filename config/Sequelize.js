const Sequelize = require('sequelize');

const personaModel = require('../models/Persona');
const libroIncidenciasModel = require('../models/LibroIncidencias');
const entidadModel = require('../models/Entidad');
const sedeModel = require('../models/Sede');
const personaBeneficiarioModel = require('../models/PersonaBeneficiario');
const asociacionModel = require('../models/Asociacion');

const conexion = new Sequelize(
    'mdyDB', 'mdy', 'qazWSX123456', {
        host: '192.168.1.3',
        dialect: 'postgres',
        port: 5432
    }
);
// const conexion = new Sequelize(
//     'mdy_apps', 'postgres', 'root', {
//         host: 'localhost',
//         dialect: 'postgres',
//         port: 5432
//     }
// );

// try {
//     await conexion.authenticate();
//     console.log('La conexion con la base de datos se realizo correctamente.');
// } catch(error) {
//     console.log('No se pudo realizar la conexion con la base de datos', error);
// }

const Persona = personaModel(conexion);
const LibroIncidencias = libroIncidenciasModel(conexion);
const Entidad = entidadModel(conexion);
const Sede = sedeModel(conexion);
const PersonaBeneficiario = personaBeneficiarioModel(conexion);
const Asociacion = asociacionModel(conexion);

Entidad.hasMany(Sede, {foreignKey: 'idEntidad'});
Sede.hasMany(LibroIncidencias, {foreignKey: 'idSede'});
LibroIncidencias.belongsTo(Persona, {foreignKey: 'idPersona'});
// PersonaBeneficiario.hasOne(Asociacion);
PersonaBeneficiario.belongsTo(Asociacion, {foreignKey: 'idAsociacion'});


module.exports = {
    Persona: Persona,
    LibroIncidencias: LibroIncidencias,
    Entidad: Entidad,
    Sede: Sede,
    conexion: conexion,
    PersonaBeneficiario: PersonaBeneficiario,
    Asociacion: Asociacion
}
