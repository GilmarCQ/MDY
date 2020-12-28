const sequelize = require('sequelize');

const modulo_model = conexion => {
    let modulo = conexion.define('modulo',
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: sequelize.INTEGER,
            allowNull: false
        },
        url: {
            type: sequelize.TEXT,
            allowNull: false
        },
        descripcion: {
            type: sequelize.TEXT,
            allowNull: true
        },
        nombre: {
            type: sequelize.TEXT,
            allowNull: false
        },
        estado: {
            type: sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        tableName: 'modulo',
        timestamps: true
    });
    return modulo;
};
module.exports = modulo_model;
