const express = require('express');
const bodyParser = require('body-parser');

const { employeRouter } = require('../routes/Employe');
const { reniecRouter } = require('../routes/Reniec');

class Server {
    constructor() {
        this.app = express();
        this.puerto = process.env.PORT || 5000;
        this.configureBodyParser();
        this.chargeRoutes();
    }

    habilitarCors() {
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers',
                'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTION, PUT, DELETE');
            next();
        });
    }
    configureBodyParser() {
        this.app.use(bodyParser.json());
    }
    chargeRoutes() {
        this.app.get('/', (req, res) => res.status(200).send('La API FUNCIONA... Api Mdy Amachay'));
        this.app.use('/employe', employeRouter);
        this.app.use('/reniec', reniecRouter);
    }
    start() {
        this.app.listen(this.puerto, () => console.log(`Todo operativo en el puerto ${this.puerto}`))
    }
}

module.exports = Server;