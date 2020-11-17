const { Entidad } = require('../config/Sequelize');

const buscarEntidad = (req, res) => {
    const idEntidad = req.query.idEntidad;
    Entidad.findOne({
        where: { estado: true, id: idEntidad }
    })
    .then(entidadEncontrada => {
        if(entidadEncontrada) {
            res.status(200).json({
                ok: true,
                contenido: entidadEncontrada
            })
        } else {
            res.status(201).json({
                ok: false,
                mensaje: 'No se encontraron registros',
                contenido: ''
            })
        }
    })
    .catch(error => {
        res.status(400).json({
            ok: false,
            mensaje: 'No se encontraron registros',
            contenido: ''
        })
    })
}

module.exports = {
    buscarEntidad
}