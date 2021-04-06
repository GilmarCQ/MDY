const axios = require('axios');
const URL_API_SUNARP = 'https://ws3.pide.gob.pe/Rest/Sunarp';

const getPJRazonSocial = (req, res) => {
    const body = req.query;
    axios.get(`${URL_API_SUNARP}/PJRazonSocial?razonSocial=${body.nombre}&out=${body.out}`)
        .then(response => {
            res.status(200).json({
                ok: true,
                contenido: response.data
            })
        })
        .catch(error =>
            res.status(500).json({
                ok: false,
                contenido: error
            }))
}
const getPersona = (req, res) => {
    const body = req.query;
    // console.log(`${URL_API_SUNARP}/Titularidad?tipoParticipante=${body.tipo}&apellidoPaterno=${body.apPat}&apellidoMaterno=${body.apMat}&nombres=${body.nombres}&razonSocial=${body.razonSocial}`);
    axios.get(`${URL_API_SUNARP}/Titularidad?tipoParticipante=${body.tipo}&apellidoPaterno=${body.apPat}&apellidoMaterno=${body.apMat}&nombres=${body.nombres}&razonSocial=${body.razonSocial}&out=${body.out}`)
        .then(response => {
            res.status(200).json({
                ok: true,
                contenido: response.data
            })
        })
        .catch(error =>
            res.status(500).json({
                ok: false,
                contenido: error
            }))
}
const getOficinas = (req, res) => {
    const body = req.query;
    axios.get(`${URL_API_SUNARP}/Oficinas?out=${body.out}`)
        .then(response => {
            res.status(200).json({
                ok: true,
                contenido: response.data
            })
        })
        .catch(error =>
            res.status(500).json({
                ok: false,
                contenido: error
            }))
}
const getAsientos = (req, res) => {
    const body = req.query;
    axios.get(`${URL_API_SUNARP}/ListarAsientos?zona=${body.zona}&oficina=${body.oficina}&partida=${body.partida}&registro=${body.registro}&out=${body.out}`)
        .then(response => {
            res.status(200).json({
                ok: true,
                contenido: response.data
            })
        })
        .catch(error =>
            res.status(500).json({
                ok: false,
                contenido: error
            }))
}
const getAsiento = (req, res) => {
    const body = req.query;
    console.log(`${URL_API_SUNARP}/VerAsientos?transaccion=${body.transaccion}&idImg=${body.idImg}&tipo=${body.tipo}&nroTotalPag=${body.totalPag}&nroPagRef=${body.pagRef}&pagina=${body.pagina}&out=${body.out}`);
    axios.get(`${URL_API_SUNARP}/VerAsientos?transaccion=${body.transaccion}&idImg=${body.idImg}&tipo=${body.tipo}&nroTotalPag=${body.totalPag}&nroPagRef=${body.pagRef}&pagina=${body.pagina}&out=${body.out}`)
        .then(response => {
            res.status(200).json({
                ok: true,
                contenido: response.data
            })
        })
        .catch(error =>
            res.status(500).json({
                ok: false,
                contenido: error
            }))
}
const getVehiculo = (req, res) => {
    const body = req.query;
    axios.get(`${URL_API_SUNARP}/VerDetalleRPV?zona=${body.zona}&oficina=${body.oficina}&placa=${body.placa}&out=${body.out}`)
        .then(response => {
            res.status(200).json({
                ok: true,
                contenido: response.data
            })
        })
        .catch(error =>
            res.status(500).json({
                ok: false,
                contenido: error
            }))
}

module.exports = {
    getPJRazonSocial,
    getPersona,
    getOficinas,
    getAsientos,
    getAsiento,
    getVehiculo
}