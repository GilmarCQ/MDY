const axios = require('axios');
const URL_API_INPE = 'https://ws3.pide.gob.pe/Rest/Inpe';

/**
 * Consulta los anteceentes penales de una persona mediante nombres y apellidos
 */
const getAntecedentes = (req, res) => {
    const body = req.query;
    console.log(body);
    axios.get(`${URL_API_INPE}/AJudiciales?apepat=${body.apPat}&apemat=${body.apMat}&nombres=${body.nombres}&out=json`)
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
    getAntecedentes
}