const express = require('express');
const Employe = require('../controllers/Employe');
const employeRouter = express.Router();

employeRouter.get('/listar', Employe.getEmploye);


module.exports = {
    employeRouter
}