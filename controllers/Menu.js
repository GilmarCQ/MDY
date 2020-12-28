const { Usuario } = require('../config/Sequelize');
const { msgError, msgSimple, msgValue } = require('./Utils');
const { Op } = require('sequelize');

const buscarUsuarios = (req, res) => {
    const { order_by, order_dir, size, page, nombre } = req.query;
    const { limit, offset } = getPagination(page, size);
    Usuario.findAndCountAll({
        where: {
            usuario: {
                [Op.like]: `%${nombre}%`
            }
        },
        attributes: ['nombres', 'apellidos', 'usuario', 'usu_reniec'],
        order: [
            [order_by, order_dir]
        ],
        limit,
        // offset
    })
        .then(usuarios => {
            const response = getPagingData(usuarios, page, limit);
            res.status(200).json(response);
        })
        .catch(error => {
            msgError(res, error);
        })
}
const listarUsuarios = (req, res) => {
    const { order_by, order_dir, size, page } = req.query;
    const { limit, offset } = getPagination(page, size);
    Usuario.findAndCountAll({
        attributes: ['nombres', 'apellidos', 'usuario', 'usu_reniec'],
        order: [
            [order_by, order_dir]
        ],
        limit,
        offset
    })
        .then(usuarios => {
            const response = getPagingData(usuarios, page, limit);
            res.status(200).json(response);
        })
        .catch(error => {
            msgError(res, error);
        })
}
const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: usuarios } = data;
    const paginaActual = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, usuarios, totalPages, paginaActual };
};



module.exports = {
    buscarUsuarios,
    listarUsuarios
}