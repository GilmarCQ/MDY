const { Modulo, Pagina } = require('../config/Sequelize');

const crearModulo = (req, res) => {
    const modulo = req.body;
    console.log(modulo);
    Modulo.findOrCreate({
        where: {
            nombre: modulo.nombre
        },
        defaults: modulo
    })
        .then((modulo, created) => {
            res.status(200).json(modulo[0])
        })
        .catch(error => {
            console.log(error);
        });
};
const listarModulos = (req, res) => {
    Modulo.findAll({
        where: {
            estado: true
        },
        attributes: ['id', 'url', 'descripcion', 'nombre']
    })
        .then(modulos => {
            res.status(201).json(modulos);
        })
        .catch(error => {
            res.status(500).json(error)
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

const listarPaginas = (req, res) => {
    const { idModulo } = req.query;
    Pagina.findAll({
        where: {idModulo},
        attributes: ['id', 'url', 'descripcion', 'idModulo']
    })
        .then(paginas => {
            // console.log('PAGINA', paginas);
            res.status(200).json(paginas)
        })
        .catch(error => res.status(500).json(error))
}

const crearPagina = (req, res) => {
    const pagina = req.body;
    // console.log('Pagina', pagina);
    Pagina.create(pagina)
        .then(pagina => res.status(200).json(pagina))
        .catch(error => res.status(500).json(error))
}
const editarPagina = (req, res) => {
    const { pagina } = req.body;
    pagina.save()
        .then(paginaActualizada => {
            res.status(200).json(paginaActualizada);
        })
        .catch(error => {
            res.status(500).json(error);
        })
}
const eliminarPagina = (req, res) => {
    const { idPagina } = req.query;
    Pagina.destroy({
        where: {
            id: idPagina
        }
    })
        .then(pagina => {
            if (pagina) {
                res.status(200).json(pagina)
            } else {
                res.status(201).json({
                    ok: false,
                    mensaje: 'La pagina con id ' + idPagina + ' no existe.'
                })
            }
        })
        .catch(error => {
            res.status(500).json(error);
        })
}


module.exports = {
    crearModulo,
    listarModulos,
    listarPaginas,
    crearPagina,
    editarPagina,
    eliminarPagina
}
