const sequelize = require('sequelize');

const tipoDocumento_model = conexion => {
    let tipoDocumento = conexion.define('tipoDocumento',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false
            },
            nombre: {
                type: sequelize.CHAR(30),
                allowNull: false
            },
            estado: {
                type: sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        },
        {
            tableName: 'tipoDocumento',
            timestamps: true
        }
    );
    return tipoDocumento;
};

module.exports = tipoDocumento_model;
