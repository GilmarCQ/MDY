const Sequelize = require('sequelize');

const personaModel = require('../models/Persona');
const libroIncidenciasModel = require('../models/LibroIncidencias');
const entidadModel = require('../models/Entidad');
const sedeModel = require('../models/Sede');
const personaBeneficiarioModel = require('../models/PersonaBeneficiario');
const asociacionModel = require('../models/Asociacion');
const familiarBeneficiarioModel = require('../models/familiarBeneficiario');
const usuarioModel = require('../models/Usuario');
const moduloModel = require('../models/Modulo');
const paginaModel = require('../models/Pagina');
const tipoDocumentoModel = require('../models/TipoDocumento');
const mascotaModel = require('../models/Mascota');
const propietarioMascotaModel = require('../models/PropietarioMascota');
const comportamientoModel = require('../models/Comportamiento');
const comportamientoMascotaModel = require('../models/ComportamientoMascota');
const observacionModel = require('../models/Observacion');
const mascotaObservacionModel = require('../models/MascotaObservacion');
// const mascotaObservacion = require('../models/MascotaObservacion');

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

const Persona = personaModel(conexion);
const LibroIncidencias = libroIncidenciasModel(conexion);
const Entidad = entidadModel(conexion);
const Sede = sedeModel(conexion);
const PersonaBeneficiario = personaBeneficiarioModel(conexion);
const Asociacion = asociacionModel(conexion);
const FamiliarBeneficiario = familiarBeneficiarioModel(conexion);
const Usuario = usuarioModel(conexion);
const Modulo = moduloModel(conexion);
const Pagina = paginaModel(conexion);
const TipoDocumento = tipoDocumentoModel(conexion);
const Mascota = mascotaModel(conexion);
const PropietarioMascota = propietarioMascotaModel(conexion);
const Comportamiento = comportamientoModel(conexion);
const ComportamientoMascota = comportamientoMascotaModel(conexion);
const Observacion = observacionModel(conexion);
const MascotaObservacion = mascotaObservacionModel(conexion);

Entidad.hasMany(Sede, {foreignKey: 'idEntidad'});
Sede.hasMany(LibroIncidencias, {foreignKey: 'idSede'});
LibroIncidencias.belongsTo(Persona, {foreignKey: 'idPersona'});
// PersonaBeneficiario.hasOne(Asociacion);
Asociacion.hasMany(PersonaBeneficiario, {foreignKey: 'idAsociacion'})
PersonaBeneficiario.belongsTo(Asociacion, {foreignKey: 'idAsociacion'});
// PersonaBeneficiario.hasMany(FamiliarBeneficiario);
// FamiliarBeneficiario.belongsTo(PersonaBeneficiario)
PersonaBeneficiario.hasMany(FamiliarBeneficiario, { foreignKey: 'idTitular'});
FamiliarBeneficiario.belongsTo(PersonaBeneficiario, { foreignKey: 'idTitular'});
PersonaBeneficiario.hasMany(FamiliarBeneficiario, { foreignKey: 'idFamiliar'})
FamiliarBeneficiario.belongsTo(PersonaBeneficiario, { foreignKey: 'idFamiliar'});

Modulo.hasMany(Pagina, { foreignKey: 'idModulo' });
Pagina.belongsTo(Modulo, { foreignKey: 'idModulo' });

Persona.belongsToMany(Mascota, { through: PropietarioMascota, foreignKey: 'idPersona'});
Mascota.belongsToMany(Persona, { through: PropietarioMascota, foreignKey: 'idMascota'});

Mascota.belongsToMany(Comportamiento, { through: ComportamientoMascota, foreignKey: 'idMascota'});
Comportamiento.belongsToMany(Mascota, { through: ComportamientoMascota, foreignKey: 'idComportamiento'});

Mascota.belongsToMany(Observacion, { through: MascotaObservacion, foreignKey: 'idMascota' });
Observacion.belongsToMany(Mascota, { through: MascotaObservacion, foreignKey: 'idObservacion' });

module.exports = {
    Persona: Persona,
    LibroIncidencias: LibroIncidencias,
    Entidad: Entidad,
    Sede: Sede,
    conexion: conexion,
    PersonaBeneficiario: PersonaBeneficiario,
    Asociacion: Asociacion,
    FamiliarBeneficiario: FamiliarBeneficiario,
    Usuario: Usuario,
    Modulo,
    Pagina,
    TipoDocumento,
    Comportamiento,
    Mascota,
    PropietarioMascota,
    ComportamientoMascota,
    Observacion,
    MascotaObservacion
}
