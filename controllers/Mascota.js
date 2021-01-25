const { Mascota, Persona, PropietarioMascota, ComportamientoMascota } = require('../config/Sequelize');
const { obtenerPdfFichaRegistro } = require('../controllers/Documento');

const registrarMascota = async (req, res) => {
    const { mascota } = req.body;
    const { propietario } = req.body;
    const { propietarioContacto } = req.body;

    const registroMascotas = await verNumeroRegistro(res);
    mascota.registro = registroMascotas + 1;
    mascota.fechaRegistro = new Date();
    const mascotaCreado = await agregarMascota(mascota, res);
    const personaProp = await buscarAgregarPersona(propietario);
    const personaContacto = await buscarAgregarPersona(propietarioContacto);

    await agregarPropietario(propietario.tipo, personaProp.id, mascotaCreado.id);
    await agregarPropietario(propietarioContacto.tipo, personaContacto.id, mascotaCreado.id);

    for (let indice = 0; indice < mascota.comportamientos.length; indice++) {
        const comportamiento = mascota.comportamientos[indice];
        await agregarComportamiento(mascotaCreado.id, comportamiento.id);
    }

    res.status(200).json({
        contenido: 'El can fue registrado correctamente con numero de registro ' + convertirNumeroDigitos(registroMascotas + 1, 8),
        ok: true
    })
}

const buscarFichaRegistro = async (req, res) => {
    const numeroregistro = req.query;
    obtenerPdfFichaRegistro(res);

    // res.send('PDF DESCARGADO');
}

const buscarPorRegistro = (req, res) => {
    const { numeroRegistro } = req.query;
    Mascota.findOne({
        where: { estado: true, registro: numeroRegistro },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'foto']
        }
    })
        .then(mascotas => res.status(200).json(mascotas))
        .catch(error => res.status(500).json(error));
}
const buscarPorDocumento = (req, res) => {
    const { tipoDocumento, numeroDocumento } = req.query;
    Persona.findAll({
        where: { tipoDocumento, numeroDocumento, estado: true },
        include: [
            {
                model: Mascota,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'foto', 'propietarioMascota', 'edad',
                    'color', 'tamanio', 'sexo', 'raza', 'esterilizado', 'descripcion', 'estado', ]
                }
            }
        ],
        attributes: ['id', 'tipoDocumento', 'numeroDocumento', 'nombres', 'apellidoPaterno', 'apellidoMaterno', 'correo', 'telefono']
    })
        .then(personas => {
            res.status(200).json(personas)
        })
        .catch(error => res.status(500).json(error));
}


/**
 * UTILITARIOS PARA METODOS DE CONTROLADORES
 */

const convertirNumeroDigitos = (numero, numeroDigitos) => {
    let numeroCadena = numero.toString();
    var cadena = numeroCadena;
    for (let indice = numeroCadena.length; indice < numeroDigitos; indice++) {
        cadena = '0' + cadena;
    }
    return cadena;
}
const verNumeroRegistro = async (res) => {
    var registros;
    await Mascota.count()
        .then(cantidad => {
            registros = cantidad;
        })
        .catch(error => res.status(500).json(error));
    return registros;
}
const agregarComportamiento = async (idMascota, idComportamiento, res) => {
    const comportamientoMascota = {
        idMascota, idComportamiento
    }
    const comportamientoMascotaBuild = ComportamientoMascota.build(comportamientoMascota);
    await comportamientoMascotaBuild.save()
        .then(comportamientoMascotaSave => { return comportamientoMascotaSave })
        .catch(error => res.status(500).json(error));
}
const agregarPropietario = async (tipo, idPersona, idMascota, res) => {
    const propietario = {
        tipo, idPersona, idMascota
    }
    const propietarioBuild = PropietarioMascota.build(propietario);
    propietarioReturn = await propietarioBuild.save()
        .then(personaSave => { return personaSave })
        .catch(error => res.status(500).json(error));
}
const buscarAgregarPersona = async (persona, res) => {
    var personaReturn;
    await Persona.findOne({
        where: {
            estado: true, numeroDocumento: persona.numeroDocumento, tipoDocumento: persona.tipoDocumento
        }
    })
        .then(personaFind => {
            if (!personaFind) {
                let personaBuild = Persona.build(persona);
                let personaCreada = personaBuild.save()
                    .then(personaSave => { return personaSave })
                    .catch(error => res.status(500).json(error));
                personaReturn = personaCreada;
            } else {
                personaReturn = personaFind;
            }
        });
    return personaReturn
}
const agregarMascota = async (mascota, res) => {
    var mascotaReturn;
    let mascotaCrear = Mascota.build(mascota);
    await mascotaCrear.save()
        .then(mascotaCreada => {
            mascotaReturn = mascotaCreada;
        })
        .catch(error => res.status(500).json(error));
    return mascotaReturn;
}

module.exports = {
    registrarMascota,
    buscarFichaRegistro,
    buscarPorDocumento,
    buscarPorRegistro
}