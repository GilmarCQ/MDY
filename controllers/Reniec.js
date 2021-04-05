const axios = require('axios');
const URL_API_RENIEC = 'https://ws5.pide.gob.pe/Rest/Reniec';

const getPerson = (req, res) => {
    const body = req.query;
    // console.log(body);
    axios.get(`${URL_API_RENIEC}/Consultar?nuDniConsulta=${body.dniConsulta}&nuDniUsuario=${body.dniUsuario}&nuRucUsuario=${body.ruc}&password=${body.password}&out=json`)
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
const actualizarCredencial = (req, res) => {
    const body = req.query;
    // console.log(body);
    axios.get(`${URL_API_RENIEC}/ActualizarCredencial?` +
        `credencialAnterior=${body.credencialAnterior}&credencialNueva=${body.credencialNueva}` +
        `&nuDni=${body.nuDni}&nuRuc=${body.nuRuc}&out=json`)
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
    getPerson,
    actualizarCredencial
}