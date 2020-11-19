const {Sede} = require('../config/Sequelize');

/**
 * Lista las sedes de una entidad
 * (GET) parametros idEntidad
 * @param {*} req
 * @param {*} res
 */
const listarSedes = (req, res) => {
    const idEntidad = req.query.idEntidad;
    Sede.findAll({
        where: { idEntidad: idEntidad, estado: true },
        attributes: ['id', 'nombre', 'descripcion', 'direccion']
    })
    .then(sedes => {
        if(sedes) {
            res.status(200).json({
                ok: true,
                contenido: sedes
            })
        } else {
            res.status(404).json({
                ok: false,
                mensaje: 'No se encontro sedes para el id ' + idEntidad,
                contenido: sedes
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            ok:false,
            mensaje: 'Hubo un error al consultar'
        })
    })
}

module.exports = {
    listarSedes
}
