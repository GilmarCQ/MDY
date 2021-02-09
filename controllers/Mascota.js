const { Mascota, Persona, PropietarioMascota, ComportamientoMascota, Comportamiento } = require('../config/Sequelize');
const { obtenerPdfFichaRegistro } = require('../controllers/Documento');


const registrarMascota = async (req, res) => {
    const { mascota } = req.body;
    const { propietario } = req.body;
    const { propietarioContacto } = req.body;

    const registroMascotas = await verNumeroRegistro(res);
    mascota.registro = registroMascotas + 1;
    mascota.fechaRegistro = new Date();
    console.log(mascota.foto);
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
    const { numeroRegistro } = req.query;

    const respuesta = await buscarMascotaRegistro(res, numeroRegistro);
    const comportamientosMascota = await buscarComportamientosMascota(res, numeroRegistro);
    await obtenerPdfFichaRegistro(res, respuesta, convertirNumeroDigitos(numeroRegistro, 8), enumerarComportamiento(comportamientosMascota));
}
const buscarPorRegistro = async (req, res) => {
    const { numeroRegistro } = req.query;
    Mascota.findOne({
        where: { estado: true, registro: numeroRegistro },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
        .then(mascota => {
            console.log(mascota.foto);
            // const foto = bytesBufferToBase64(mascota.foto);
            // mascota.foto = 'data:image/jpeg;base64,' + foto;
            res.status(200).json(mascota);
        })
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
                        'color', 'tamanio', 'sexo', 'raza', 'esterilizado', 'descripcion', 'estado',]
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
const buscarPropietariosPorRegistro = (req, res) => {
    const { numeroRegistro } = req.query;
    Mascota.findOne({
        where: { estado: true, registro: numeroRegistro },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'estado'],
        },
        include: [
            {
                model: Persona,
                attributes: [
                    'tipoDocumento',
                    'numeroDocumento',
                    'nombres',
                    'apellidoMaterno',
                    'apellidoPaterno',
                    'direccion',
                    'telefono',
                    'sexo',
                    'correo'
                ]
            }
        ]
    })
        .then(mascotas => res.status(200).json(mascotas))
        .catch(error => res.status(500).json(error));
}

/**
 * UTILITARIOS PARA METODOS DE CONTROLADORES
 */

const enumerarComportamiento = (comportamientos) => {

    // console.log(typeof comportamientosLista);
    // for(let a = 0; a < comportamientos.length ; a++ ) {
    //     comportamientosLista.push(comportamientos[a].nombre);
    // }
    var comportamientosLista = Array.from(comportamientos, x => x.nombre);
    console.log(typeof comportamientosLista);
    // console.log(comportamientosLista);
    return comportamientosLista;
}
const buscarComportamientosMascota = async (res, numeroRegistro) => {
    var comportamientos;
    await Mascota.findOne({
        where: { registro: numeroRegistro },
        include: [
            {
                model: Comportamiento,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'estado']
                }
            }
        ],
        attributes: ['id', 'nombre']
    })
        .then(comportamientosMascota => {
            comportamientos = comportamientosMascota.comportamientos;
        })
        .catch(error => res.status(500).json(error))
    return comportamientos;
}
const buscarMascotaRegistro = async (res, numeroRegistro) => {
    var respuesta;
    await Mascota.findOne({
        where: { registro: numeroRegistro, estado: true },
        include: [
            {
                model: Persona,
            }
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'especie', 'estado']
        }
    })
        .then(mascotas => respuesta = mascotas)
        .catch(error => res.status(500).json(error));
    return respuesta;
}
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
    buscarPorRegistro,
    buscarPropietariosPorRegistro
}