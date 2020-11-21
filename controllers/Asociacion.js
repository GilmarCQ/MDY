const { Asociacion } = require('../config/Sequelize');

const listarAsociaciones = (req, res) => {
    Asociacion.findAll({
        where: { estado: true },
        attributes: ['id', 'nombre']
    })
    .then(asociaciones => {
        if(asociaciones) {
            res.status(200).json({
                ok: true,
                contenido: asociaciones,
                mensaje: 'Consulta realizada'
            })
        } else {
            res.status(201).json({
                ok: false,
                mensaje: 'No se encontraron registros'
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            ok: false,
            mensaje: 'Ha ocurrido un error' + error
        })
    })
}

module.exports = {
    listarAsociaciones
}

