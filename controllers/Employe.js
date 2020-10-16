const https = require('https');
const http = require('http');
const axios = require('axios')

const getEmploye = (req, res) => {
    axios.get('http://dummy.restapiexample.com/api/v1/employees')
    .then(response => {
        res.status(200).json({
            ok: true,
            contenido: response.data.data
        })
    })
    .catch(error => {
        res.status(500).json({
            ok: false,
            contenido: error
        })
    })
}

module.exports = {
    getEmploye
}
