const axios = require('axios');

const getPerson = (req, res) => {
    axios.get('https://ws5.pide.gob.pe/Rest/Reniec/Consultar?nuDniConsulta=29552154&nuDniUsuario=72690553&nuRucUsuario=20173809663&password=72690553')
    .then(response => {
        console.log(response);
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
    getPerson
}