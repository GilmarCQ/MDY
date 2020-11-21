const { PersonaBeneficiario, Asociacion } = require('../config/Sequelize');

const agregarBeneficiario = (req, res) => {
    const beneficiario = req.body.beneficiario;
    console.log(beneficiario);
    PersonaBeneficiario.findOne({
        where: { estado: true, dni: beneficiario.dni }
    })
    .then(persona => {
        console.log(persona)
        if(persona) {
            console.log(persona);
            res.status(201).json({
                ok: false,
                mensaje: 'La persona ya esta registrada.'
            })
        } else {
            beneficiario.fechaEntrega = new Date();
            let beneficiarioAdd = PersonaBeneficiario.build(beneficiario);
            console.log(persona);
            beneficiarioAdd.save()
                .then(beneficiarioAgregado => {
                    if(beneficiarioAgregado) {
                        res.status(200).json({
                            ok: true,
                            contenido: beneficiarioAgregado,
                            mensaje: 'Beneficiario agredado correctamente.'
                        })
                    } else {
                        res.status(200).json({
                            ok: false,
                            mensaje: 'Ocurrio un error, no se puedo agregar el usuario.'
                        })
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
        where: { estado: true, dni }
    })
    .then(beneficiario => {
        if(beneficiario) {
            res.status(200).json({
                ok: true,
                contenido: beneficiario,
                mensaje: 'Beneficiario encontrado'
            })
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

const eliminarBeneficiario = (req, res) => {

}

const recibirBeneficio = (req, res) => {

}

module.exports = {
    agregarBeneficiario,
    buscarPorDni,
    eliminarBeneficiario,
    recibirBeneficio
}

