const jwt = require('jsonwebtoken');

verificarToken = (token)=>{
    try{
        // verificar si mi token cumple si aun vive, si es valida, si la contraseña concuerda entre otros
        let data = jwt.verify(token,'q@zWSX123456',{algorithm: 'RS256'});
        return data;
    }catch(error){
        return null;
    }
}

wachiman = (req,res,next)=>{
    // compruebo si me estan mandando por medio de los headers un campo authorization
    if(req.headers.authorization){
        let token = req.headers.authorization.split(' ')[1];
        let resultado = verificarToken(token);
        if (resultado){
            next();
        }else{
            res.status(401).json({
                ok: false,
                mensaje: 'No esta autorizado para realizar la solicitud'
            })
        }
    }else{
        res.status(401).json({
            ok: false,
            mensaje: 'Necesitas estar autenticado para realizar esta solicitud'
        })
    }
}
module.exports={
    verificarToken,
    wachiman
}

const TIPO_INCIDENCIA = [
    {
        id          :   1,
        descripcion : 'Reclamo'
    },
    {
        id          :   2,
        descripcion : 'Orientación'
    },
    {
        id          :   3,
        descripcion : 'Sugerencia'
    },
    {
        id          :   4,
        descripcion : 'Denuncia'
    }
]

module.exports = {
    TIPO_INCIDENCIA,
    wachiman,
    verificarToken
}