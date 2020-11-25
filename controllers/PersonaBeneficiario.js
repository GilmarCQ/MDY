const { msgError, msgSimple, msgValue } = require('./Utils');
const { PersonaBeneficiario, Asociacion, FamiliarBeneficiario } = require('../config/Sequelize');

const agregarBeneficiario = (req, res) => {
    const beneficiario = req.body.beneficiario;
    PersonaBeneficiario.findOne({
        where: { estado: true, dni: beneficiario.dni }
    })
        .then(persona => {
            if (persona) {
                msgSimple(res, 201, 'La persona ya esta registrada', false);
            } else {
                beneficiario.fechaEntrega = new Date();
                let beneficiarioAdd = PersonaBeneficiario.build(beneficiario);
                // console.log(persona);
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
}

const buscarPorDni = (req, res) => {
    const dni = req.query.dni;
    PersonaBeneficiario.findOne({
        where: { estado: true, dni },
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

const eliminarBeneficiario = (req, res) => { }

const recibirBeneficio = (req, res) => {
    const beneficiarioUpdate = req.body;
    console.log(beneficiarioUpdate);
    PersonaBeneficiario.findOne({
        where: { estado: true, dni: beneficiarioUpdate.dni },
        include: {
            model: Asociacion
        }
    })
        .then(beneficiario => {
            console.log('BENEFICIARIO');
            console.log(beneficiarioUpdate.familiares.length);
            if (beneficiarioUpdate.familiares.length === 0) {
                if (beneficiario) {
                    beneficiario.estadoEntrega = beneficiarioUpdate.estadoEntrega;
                    beneficiario.fechaEntrega = beneficiarioUpdate.fechaEntrega;
                    beneficiario.save()
                        .then(benActualizado => msgValue(res, 200, benActualizado, 'Beneficiario Actualizado', true))
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
                    let beneficiarioTitular = await actualizarEntrega(beneficiarioUpdate.fechaEntrega, beneficiarioUpdate.estadoEntrega, beneficiario);
                    console.log(beneficiarioTitular);
                    var familiaresCarga = [];
                    for (let indice = 0; indice < beneficiarioUpdate.familiares.length; indice++) {
                        familiar = beneficiarioUpdate.familiares[indice];
                        console.log("FAMILIAR FAMILIAR FAMILIAR FAMILIAR");
                        console.log(familiar);
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
                        let familiarFind = await buscarFamiliar(familiar);
                        let familiarSinAsignacion;
                        if (familiarFind) {
                            familiarSinAsignacion = await actualizarEntrega(beneficiarioUpdate.fechaEntrega, beneficiarioUpdate.estadoEntrega, familiarFind);
                            console.log(familiarSinAsignacion);
                        } else {
                            familiarSinAsignacion = await crearBeneficiario(familiar);
                        }
                        let familiarAsignacion = await asignarFamiliar(
                            beneficiarioUpdate.familiares[indice].tipo,
                            beneficiario.id,
                            beneficiario.dni,
                            familiarSinAsignacion.id,
                            familiarSinAsignacion.dni
                        );
                        console.log(familiarAsignacion);
                        familiaresCarga.push(familiarFind);
                    }
                    msgValue(res, 200, familiaresCarga, 'Estado de entrega actualizado correctamente', true)
                }
                filtrar();
            }
        })
        .catch(error => msgSimple(res, 500, 'Ocurrio un error, no se puedo actualizar el usuario.' + error, false))
}
const crearBeneficiario = async (beneficiarioCrear) => {
    let beneficiarioBuild = PersonaBeneficiario.build(beneficiarioCrear);
    let beneficiario = beneficiarioBuild.save()
        .then(beneficiarioCreado => { return beneficiarioCreado })
    return beneficiario;
}
const actualizarEntrega = async (fechaEntrega, estadoEntrega, beneficiarioUpdate) => {
    let beneficiario = beneficiarioUpdate.update({
        fechaEntrega: fechaEntrega, estadoEntrega: estadoEntrega
    })
        .then(beneficiarioUpdated => { return beneficiarioUpdated })
    return beneficiario;
}

const asignarFamiliar = async (tipo, idTitular, dniTitular, idFamiliar, dniFamiliar) => {
    let familiarAsignado = new Object();
    familiarAsignado.tipo = tipo;
    familiarAsignado.idTitular = idTitular;
    familiarAsignado.dniTitular = dniTitular;
    familiarAsignado.idFamiliar = idFamiliar;
    familiarAsignado.dniFamiliar = dniFamiliar;

    console.log("ASIGNAR FAMILIAR");
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
        where: { estado: true, dni: familiar.dni },
        defaults: {
            dni: familiar.dni,
            apellidoPaterno: familiar.apellidoPaterno,
            apellidoMaterno: familiar.apellidoMaterno,
            nombres: familiar.nombres,
            direccion: familiar.direccion,
            zona: familiar.zona,
            manzana: familiar.manzana,
            lote: familiar.lote,
            kilometro: familiar.kilometro,
            comite: familiar.comite,
            sector: familiar.sector,
            tipoPoblado: familiar.tipoPoblado,
            estadoCivil: familiar.estadoCivil,
            idAsociacion: familiar.isAsociacion,
            fechaEntrega: familiar.fechaEntrega
        }
    })
        .then(data => {
            return data
        })
        .catch(error => {
            console.log(error);
        })
    return familiarCF;
}
const verDetalle = (req, res) => {
    
 }

module.exports = {
    agregarBeneficiario,
    buscarPorDni,
    eliminarBeneficiario,
    recibirBeneficio,
    verDetalle
}

