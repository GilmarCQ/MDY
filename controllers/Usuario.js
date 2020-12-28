const { msgError, msgSimple, msgValue } = require('./Utils');
const { Usuario } = require('../config/Sequelize');
const jwt = require('jsonwebtoken');
const CrearUsuario = (req, res) => {
    let objUsuario = req.body;
    Usuario.findOne({
        where: { usuario: objUsuario.usuario }
    })
        .then(usuarioEncontrado => {
            if (usuarioEncontrado) {
                msgSimple(res, 200, 'El usuario ya existe', false);
            } else {
                let usuarioCreado = Usuario.build(objUsuario);
                usuarioCreado.setSaltAndHash(objUsuario.password);
                usuarioCreado.save()
                    .then(nuevoUsuario => {
                        msgValue(res, 201, { usuario: nuevoUsuario.usuario }, 'Usuario Creado Exitosamente.')
                    })
            }
        })
        .catch(error => msgError(res, error, 500))
}
const Login = (req, res) => {
    const objUsuario = req.body;
    Usuario.findOne({
        where: {
            usuario: objUsuario.usuario
        }
    })
        .then(usuarioEncontrado => {
            if (usuarioEncontrado) {
                const resultado = usuarioEncontrado.validarPassword(objUsuario.password);
                if (resultado) {
                    let token = usuarioEncontrado.generarJWT();
                    res.status(200).json({
                        ok: true,
                        contenido: {
                            usuario: usuarioEncontrado.usuario,
                            nombres: usuarioEncontrado.nombres,
                            apellidos: usuarioEncontrado.apellidos,
                            tipo: usuarioEncontrado.tipo,
                            usu_reniec: usuarioEncontrado.usu_reniec
                        },
                        mensaje: 'Usuario Logueado Correctamente',
                        token: token
                    })
                } else {
                    msgSimple(res, 404, 'Usuario o contraseña incorrecto.', false);
                }
            } else {
                msgSimple(res, 404, 'Usuario o contraseña incorrecto.', false);
            }
        })
        .catch(error => msgError(res, error, 500))
}
const VerificarToken = (req, res) => {
    const tokenTmp = req.body.token;
    // console.log("VALIDAR TOKEN");
    // console.log(tokenTmp);
    try {
        // verificar si mi token cumple si aun vive, si es valida, si la contraseña concuerda entre otros
        const data = jwt.verify(tokenTmp, 'q@zWSX123456', { algorithm: 'RS256' });
        // console.log("VALIDAR TOKEN");
        // console.log(data);
        msgSimple(res, 201, 'Token correcto.', true);
    } catch (error) {
        console.log(error);
        msgError(res, error, 500)
    }

}

module.exports = {
    CrearUsuario,
    Login,
    VerificarToken
}
