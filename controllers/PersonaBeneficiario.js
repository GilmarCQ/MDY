const { msgError, msgSimple, msgValue } = require('./Utils');
const { PersonaBeneficiario, Asociacion, FamiliarBeneficiario } = require('../config/Sequelize');
const { Op } = require('sequelize');
const moment = require('moment-timezone')

const agregarBeneficiario = (req, res) => {
    const beneficiario = req.body.beneficiario;
    // const beneficiario = req.body.beneficiario;
    console.log(beneficiario);
    PersonaBeneficiario.findOne({
        where: { estado: true, tipoDocumento: beneficiario.tipoDocumento, numeroDocumento: beneficiario.numeroDocumento }
    })
        .then(persona => {
            if (persona) {
                msgSimple(res, 201, 'La persona ya esta registrada en el padrón.', false);
            } else {
                beneficiario.fechaEntrega = new Date();
                let beneficiarioAdd = PersonaBeneficiario.build(beneficiario);
                beneficiarioAdd.save()
                    .then(beneficiarioAgregado => {
                        if (beneficiarioAgregado) {
                            msgValue(res, 200, beneficiarioAgregado, 'Beneficiario agregado correctamente', true)
                        } else {
                            msgSimple(res, 201, 'Ocurrio un error, no se pudo registrar el usuario', false)
                        }
                    })
                    .catch(error => {
                        res.status(200).json({
                            ok: false,
                            mensaje: 'Ocurrio un error, no se puedo agregar el usuario.' + error
                        })
                    })
            }
        })
        .catch(error => console.log(error))
}

const buscarPorNumeroDocumento = (req, res) => {
    const numeroDocumento = req.query.numeroDocumento;
    const tipoDocumento = req.query.tipoDocumento;
    PersonaBeneficiario.findOne({
        where: { estado: true, numeroDocumento, tipoDocumento },
        include: {
            model: Asociacion
        }
    })
        .then(beneficiario => {
            if (beneficiario) {
                msgValue(res, 200, beneficiario, 'Beneficiario encontrado', true);
            } else {
                res.status(201).json({
                    ok: false,
                    mensaje: 'La persona no se encuentra registrada en el padron.'
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                ok: false,
                mensaje: 'Hubo un error en el servidor' + error
            })
        })
}

const actualizarEntregaBeneficio = (req, res) => {
    const beneficiario = req.body;
    PersonaBeneficiario.findOne({
        where: {
            estado: true,
            tipoDocumento: beneficiario.tipoDocumento,
            numeroDocumento: beneficiario.numeroDocumento
        }
    })
    .then(
        beneficiarioEncontrado => {
            if (beneficiarioEncontrado) {
                beneficiarioEncontrado.fechaEntrega = convertFormatMoment(beneficiario.fechaEntrega, '11:00:00');
                beneficiarioEncontrado.estadoEntrega = beneficiario.estadoEntrega;
                beneficiarioEncontrado.usuario = beneficiario.usuario;
                beneficiarioEncontrado.save()
                    .then(benActualizado => res.status(200).json(benActualizado))
                    .catch(error => res.status(500).json(error));
            } else {
                res.status(404).json(beneficiarioEncontrado);
            }
        }
    )
    .catch(error => res.status(500).json(error));
}

const recibirBeneficio = (req, res) => {
    const beneficiarioUpdate = req.body;

    PersonaBeneficiario.findOne({
        where: { estado: true, tipoDocumento: beneficiarioUpdate.tipoDocumento, numeroDocumento: beneficiarioUpdate.numeroDocumento },
        include: {
            model: Asociacion
        }
    })
        .then(beneficiario => {
            if (beneficiarioUpdate.familiares.length === 0) {
                if (beneficiario) {
                    beneficiario.estadoEntrega = beneficiarioUpdate.estadoEntrega;
                    beneficiario.fechaEntrega = beneficiarioUpdate.fechaEntrega;
                    beneficiario.usuario = beneficiarioUpdate.usuario;
                    beneficiario.save()
                        .then(benActualizado => msgValue(res, 200, benActualizado, 'Entrega de canasta asignada correctamente.', true))
                        .catch(error => {
                            res.status(200).json({
                                ok: false,
                                mensaje: 'Ocurrio un error, no se puedo actualizar el usuario.' + error
                            })
                        })
                } else {
                    msgSimple(res, 201, 'La persona no se encuentra registrada en el padrón', false)
                }
            } else {
                let filtrar = async () => {
                    //  Actualiza informacion del Titular
                    // console.log('TITULAR TITULAR TITULAR TITULAR');
                    // console.log(beneficiario);
                    beneficiario.tipoFamiliar = 'TITULAR'
                    await actualizarEntrega(beneficiarioUpdate.fechaEntrega, beneficiarioUpdate.estadoEntrega, beneficiario);
                    // console.log(beneficiarioTitular);
                    var familiaresCarga = [];
                    for (let indice = 0; indice < beneficiarioUpdate.familiares.length; indice++) {
                        familiar = beneficiarioUpdate.familiares[indice];
                        familiar.direccion = beneficiario.direccion;
                        familiar.zona = beneficiario.zona;
                        familiar.manzana = beneficiario.manzana;
                        familiar.lote = beneficiario.lote;
                        familiar.kilometro = beneficiario.kilometro;
                        familiar.comite = beneficiario.comite;
                        familiar.sector = beneficiario.sector;
                        familiar.tipoPoblado = beneficiario.tipoPoblado;
                        familiar.estadoEntrega = beneficiarioUpdate.estadoEntrega;
                        familiar.fechaEntrega = beneficiarioUpdate.fechaEntrega;
                        familiar.usuario = beneficiarioUpdate.usuario;
                        familiar.idAsociacion = beneficiario.idAsociacion;
                        familiar.tipoFamiliar = 'FAMILIAR';

                        //  Busca si el familiar ya existe en la base de datos
                        let familiarFind = await buscarFamiliar(familiar);
                        let familiarSinAsignacion;

                        if (familiarFind) {
                            familiarSinAsignacion = await actualizarEntrega(beneficiarioUpdate.fechaEntrega, beneficiarioUpdate.estadoEntrega, familiarFind, 'FAMILIAR');
                            // console.log(familiarSinAsignacion);
                        } else {
                            familiarSinAsignacion = await crearBeneficiario(familiar);
                        }
                        await asignarFamiliar(
                            beneficiarioUpdate.familiares[indice].tipoFamiliar,
                            beneficiario.id,
                            familiarSinAsignacion.id
                        );
                        familiaresCarga.push(familiarFind);
                    }
                    msgValue(res, 200, familiaresCarga, 'Entrega de canasta asignada correctamente.', true)
                }
                filtrar();
            }
        })
        .catch(error => msgSimple(res, 500, 'Ocurrio un error, no se puedo actualizar el usuario.' + error, false))
}
const crearBeneficiario = async (beneficiarioCrear) => {

    // console.log("FAMILIAR FAMILIAR FAMILIAR FAMILIAR");
    // console.log(beneficiarioCrear);
    let beneficiarioBuild = PersonaBeneficiario.build(beneficiarioCrear);
    let beneficiario = beneficiarioBuild.save()
        .then(beneficiarioCreado => { return beneficiarioCreado })
    return beneficiario;
}
const actualizarEntrega = async (fechaEntrega, estadoEntrega, beneficiarioUpdate, tipoFamiliar = 'TITULAR') => {
    let beneficiario = beneficiarioUpdate.update({
        fechaEntrega: fechaEntrega, estadoEntrega: estadoEntrega, tipoFamiliar: tipoFamiliar
    })
        .then(beneficiarioUpdated => { return beneficiarioUpdated })
    return beneficiario;
}

const asignarFamiliar = async (tipoFamiliar, idTitular, idFamiliar) => {
    let familiarAsignado = new Object();
    familiarAsignado.tipoFamiliar = tipoFamiliar;
    familiarAsignado.idTitular = idTitular;
    familiarAsignado.idFamiliar = idFamiliar;
    // familiarAsignado.tipoDocumentoFamiliar = tipoDocumentoFamiliar;
    // familiarAsignado.numeroDocumentoFamiliar = numeroDocumentoFamiliar;
    console.log('TITULAR TITULAR TITULAR TITULAR');
    console.log(familiarAsignado);
    let familiarAsignacion = await FamiliarBeneficiario.create(familiarAsignado)
        .then(familiar => { return familiar })
        .catch(error => console.log(error))
    return familiarAsignacion;
}
/**
 * Busca familiar si ha sido ingresado o existe en la base de datos actual (padron actual)
 * @param {*} familiar 
 */
const buscarFamiliar = async (familiar) => {
    let familiarCF = await PersonaBeneficiario.findOne({
        where: { estado: true, tipoDocumento: familiar.tipoDocumento, numeroDocumento: familiar.numeroDocumento }
    })
        .then(data => {
            return data
        })
        .catch(error => {
            console.log(error);
        })
    return familiarCF;
}

const contarBeneficiariosPorFecha = (req, res) => {
    const { fechaInicio, fechaFin } = req.query;
    const fechaInicioDate = convertFormatMoment(fechaInicio, '00:00:01');
    const fechaFinDate = convertFormatMoment(fechaFin, '23:59:01');
    PersonaBeneficiario.count({
        where: {
            estado: true,
            estadoEntrega: true,
            fechaEntrega: {
                [Op.between]: [fechaInicioDate, fechaFinDate]
            }
        }
    })
        .then(respuesta => {
            res.status(200).json(respuesta);
        })
        .catch(error => {
            res.status(500).json(error);
        })
}
/**
 * Metodo que convierte una fecha Date a formato compatible
 * @param {*} fecha => fecha a convertir en formato moment
 * @param {*} fechaFlag => flag que indica si es rango de inicio de la fecha (true => 00:00:01 || false => 23:59:01)
 */
const convertFormatMoment = (fecha, hora) => {
    const fechaDate = new Date(fecha);
    return moment
        .utc(`${fechaDate.getFullYear()}-${fechaDate.getMonth() + 1}-${fechaDate.getDate()} ${hora}`)
        .tz('America/Lima')
        .format();
}

const contarBeneficiariosPorFechaAsociacion = (req, res) => {
    const { fechaInicio, fechaFin } = req.query;
    const fechaInicioDate = convertFormatMoment(fechaInicio, '00:00:01');
    const fechaFinDate = convertFormatMoment(fechaFin, '23:59:01');
    PersonaBeneficiario.count({
        include: {
            model: Asociacion
        },
        where: {
            estado: true,
            estadoEntrega: true,
            fechaEntrega: {
                [Op.between]: [fechaInicioDate, fechaFinDate]
            }
        },
        group: ['asociacion.nombre'],
        attributes: ['asociacion.nombre']
    })
        .then(respuesta => {
            PersonaBeneficiario.count({
                where: {
                    estado: true,
                    estadoEntrega: true,
                    fechaEntrega: {
                        [Op.between]: [fechaInicioDate, fechaFinDate]
                    }
                }
            })
            .then(response => {
                res.status(200).json({
                    total: response,
                    lista: respuesta
                })
            })
            // res.status(200).json(respuesta);
        })
        .catch(error => {
            res.status(500).json(error);
        });
}

module.exports = {
    agregarBeneficiario,
    buscarPorNumeroDocumento,
    recibirBeneficio,
    actualizarEntregaBeneficio,
    contarBeneficiariosPorFecha,
    contarBeneficiariosPorFechaAsociacion
}

