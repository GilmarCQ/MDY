const sequelize = require('sequelize');
const { conexion } = require('../config/Sequelize');

const familiarBeneficiario_model = conexion => {
    let familiarBeneficiario = conexion.define('familiarBeneficiario',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false
            },
            tipo: {
                type: sequelize.TEXT,
                allowNull: false
            },
            dniTitular: {
                type: sequelize.CHAR(8),
                allowNull: false
            },
            dniFamiliar: {
                type: sequelize.CHAR(8),
                allowNull: false
            }
        },
        {
            tableName: 'familiarBeneficiario',
            timestamps: true
        }
    );
    return familiarBeneficiario;
}
module.exports = familiarBeneficiario_model;
