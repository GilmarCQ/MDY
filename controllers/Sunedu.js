const axios = require('axios');
const URL_API_SUNEDU = 'https://ws3.pide.gob.pe/Rest/Sunedu';

const getGradosTitulos = (req, res) => {
    const body = req.query;
    console.log(body);
    axios.get(`${URL_API_SUNEDU}/Grados?usuario=${body.usuario}&clave=${body.clave}&idEntidad=${body.idEntidad}`
        + `&fecha=${body.fecha}&hora=${body.hora}&mac_wsServer=${body.mac_wsServer}&ip_wsServer=${body.ip_wsUser}`
        + `&ip_wsUser=${body.fecha}&tipDocIdentidad=${body.hora}&nroDocIdentidad=${body.mac_wsServer}&out=json`)
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
    getGradosTitulos
}