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
            tipoFamiliar: {
                type: sequelize.TEXT,
                allowNull: false
            },
            // tipoDocumentoTitular: {
            //     type: sequelize.TEXT,
            //     allowNull: false
            // },
            // numeroDocumentoTitular: {
            //     type: sequelize.TEXT,
            //     allowNull: false
            // },
            // tipoDocumentoFamiliar: {
            //     type: sequelize.TEXT,
            //     allowNull: false
            // },
            // numeroDocumentoFamiliar: {
            //     type: sequelize.TEXT,
            //     allowNull: false
            // }
        },
        {
            tableName: 'familiarBeneficiario',
            timestamps: true
        }
    );
    return familiarBeneficiario;
}
module.exports = familiarBeneficiario_model;
