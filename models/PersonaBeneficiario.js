const sequelize = require('sequelize');

const personaBeneficiario_model = conexion => {
    let personaBeneficiario = conexion.define('personaBeneficiario',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false
            },
            tipoDocumento: {
                type: sequelize.TEXT,
                allowNull: false,
                defaultValue: 'DNI'
            },
            numeroDocumento: {
                type: sequelize.TEXT,
                allowNull: false
            },
            apellidoPaterno: {
                type: sequelize.TEXT,
                allowNull: false
            },
            apellidoMaterno: {
                type: sequelize.TEXT,
                allowNull: false
            },
            nombres: {
                type: sequelize.TEXT,
                allowNull: false
            },
            direccion: {
                type: sequelize.TEXT,
                allowNull: false
            },
            zona: {
                type: sequelize.TEXT,
                allowNull: true
            },
            manzana: {
                type: sequelize.TEXT,
                allowNull: true
            },
            lote: {
                type: sequelize.TEXT,
                allowNull: true
            },
            kilometro: {
                type: sequelize.TEXT,
                allowNull: true
            },
            comite: {
                type: sequelize.TEXT,
                allowNull: true
            },
            sector: {
                type: sequelize.TEXT,
                allowNull: true
            },
            tipoPoblado: {
                type: sequelize.TEXT,
                allowNull: true
            },
            estadoCivil: {
                type: sequelize.TEXT,
                allowNull: true
            },
            estadoEntrega: {
                type: sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            fechaEntrega: {
                type: sequelize.DATE,
                allowNull: false
            },
            estado: {
                type: sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            tipoFamiliar: {
                type: sequelize.TEXT,
                allowNull: false,
                defaultValue: 'TITULAR'
            }
        },
        {
            tableName: 'personaBeneficiario',
            timestamps: true
        }
    );
    return personaBeneficiario;
}

module.exports = personaBeneficiario_model;
