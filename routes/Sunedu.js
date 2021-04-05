const express = require('express');
const Sunedu = require('../controllers/Sunedu');
const suneduRouter = express.Router();

mineduRouter.get('/grados', Sunedu.getGradosTitulos);

module.exports = {
    suneduRouter
}
