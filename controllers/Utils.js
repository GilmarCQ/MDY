const msgError = (res, error, msgNumber = 500) => {
    res.status(msgNumber).json({
        ok: false,
        contenido: error,
        mensaje: "Ocurrio un error en el servidor" + error
    })
}
const msgSimple = (res, msgNumber, msgDescription, msgEstado) => {
    res.status(msgNumber).json({
        ok: msgEstado,
        mensaje: msgDescription
    })
}
/**
 * Mensaje de res.status()
 * @param {*} res 
 * @param {* Numero} msgNumber }
 * @param {*} msgContenido 
 * @param {*} msgDescription 
 * @param {*} msgEstado 
 */
const msgValue = (res, msgNumber, msgContenido, msgDescription, msgEstado = true) => {
    res.status(msgNumber).json({
        ok: msgEstado,
        contenido: msgContenido,
        mensaje: msgDescription
    })
}
module.exports = {
    msgError,
    msgSimple,
    msgValue
}