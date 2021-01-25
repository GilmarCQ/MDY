const { TipoDocumento, Comportamiento } = require('../config/Sequelize');

const listarTipoDocumento = (req, res) => {
    TipoDocumento.findAll({
        where: { estado: true }
    })
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error));
}

const listarComportamientoMascota = (req, res) => {
    Comportamiento.findAll({
        where: { estado: true },
        attributes: ['id', 'nombre']
    })
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error));
}

module.exports = {
    listarTipoDocumento,
    listarComportamientoMascota
}
