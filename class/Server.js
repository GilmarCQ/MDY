const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// const { employeRouter } = require('../routes/Employe');
const { reniecRouter } = require('../routes/Reniec');
const { inpeRouter } = require('../routes/Inpe');
const { mineduRouter } = require('../routes/Minedu');
const { suneduRouter } = require('../routes/Sunedu');
const { sunarpRouter } = require('../routes/Sunarp');
const { entidadRouter } = require('../routes/Entidad');
const { sedeRouter } = require('../routes/Sede');
const { incidenciasRouter } = require('../routes/LibroIncidencias');
const { asociacionRouter } = require('../routes/Asociacion');
const { personaBeneficiarioRouter } = require('../routes/PersonaBeneficiario');
const { migracionRouter } = require('../routes/Migracion');
const { usuarioRouter } = require('../routes/Usuario');
const { menuRouter } = require('../routes/Menu');
const { moduloRouter } = require('../routes/Modulo');
const { catalogoRouter } = require('../routes/Catalogo');
const { mascotaRouter } = require('../routes/Mascota');
const { conexion } = require('../config/Sequelize');

class Server {
    constructor() {
        this.app = express();
        this.app.use(cors());
        this.puerto = process.env.PORT || 5000;
        // this.habilitarCors();
        this.configureBodyParser();
        this.chargeRoutes();
    }

    habilitarCors() {
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
    }
    configureBodyParser() {
        this.app.use(bodyParser.json());
    }
    chargeRoutes() {
        this.app.get('/', (req, res) => res.status(200).send('La API FUNCIONA... Api Mdy Amachay'));
        this.app.use('/reniec', reniecRouter);
        this.app.use('/inpe', inpeRouter);
        this.app.use('/minedu', mineduRouter);
        this.app.use('/sunedu', suneduRouter);
        this.app.use('/sunarp', sunarpRouter);
        this.app.use('/entidad', entidadRouter);
        this.app.use('/sede', sedeRouter);
        this.app.use('/incidencias', incidenciasRouter);
        this.app.use('/asociacion', asociacionRouter);
        this.app.use('/beneficiario', personaBeneficiarioRouter);
        this.app.use('/migracion', migracionRouter);
        this.app.use('/auth', usuarioRouter);
        this.app.use('/menu', menuRouter);
        this.app.use('/modulo', moduloRouter);
        this.app.use('/catalogo', catalogoRouter);
        this.app.use('/mascota', mascotaRouter);
    }
    start() {
        this.app.listen(this.puerto, () => console.log(`Todo operativo en el puerto ${this.puerto}`));
        conexion.sync({alter: false, force: false}).then(() => {
            console.log("Base de Datos Sincronizada")
        })
    }
}

module.exports = Server;
