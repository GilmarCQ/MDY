const axios = require('axios');
const URL_API_MINEDU = 'https://ws3.pide.gob.pe/Rest/Minedu';

const getGradosTitulos = (req, res) => {
    const body = req.query;
    console.log(body);
    axios.get(`${URL_API_MINEDU}/Titulo?nroDocumento=${body.dni}&out=${body.out}`)
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