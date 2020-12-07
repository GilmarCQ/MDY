const axios = require("axios");
const URL_API_MIGRACIONES = 'https://ws3.pide.gob.pe/Rest/Migraciones';
const CODIGO_ENTIDAD = 'YURA';
const MAC_ENTIDAD = 'B8:69:F4:C4:F1:59';
const IP_ENTIDAD = '209.45.76.37'
const TIPO_DOCUMENTO = 'CE';

const getExtrajero = (req, res) => {
    const NUMERO_CE = req.query.numeroCE;
    console.log(`${URL_API_MIGRACIONES}/CarnetExtranjeria?strCodInstitucion=${CODIGO_ENTIDAD}&strMac=${MAC_ENTIDAD}&strNroIp=${IP_ENTIDAD}&strNumDocumento=${NUMERO_CE}&strTipoDocumento=${TIPO_DOCUMENTO}`)
    axios.get(`${URL_API_MIGRACIONES}/CarnetExtranjeria?strCodInstitucion=${CODIGO_ENTIDAD}&strMac=${MAC_ENTIDAD}&strNroIp=${IP_ENTIDAD}&strNumDocumento=${NUMERO_CE}&strTipoDocumento=${TIPO_DOCUMENTO}`)
        .then(response => {
            console.log(response.data);
            res.status(200).json({
                ok: true,
                contendio: response.data
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                ok: false,
                contenido: error
            })
        })
}

module.exports =  {
    getExtrajero
}
