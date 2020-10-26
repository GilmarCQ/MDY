const sequelize = require('sequelize');

const entidad_model = conexion => {
    let entidad = conexion.define('entidad',
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: sequelize.INTEGER,
            allowNull: false
        },
        nombre: {
            type: sequelize.TEXT,
            allowNull: false
        },
        ruc: {
            type: sequelize.CHAR(11),
            allowNull: true
        },
        estado: {
            type: sequelize.BOOLEAN,
            allowNull: false
        }
    },
    {
        tableName: 'entidad',
        timestamps: true
    });
    return entidad;
}
module.exports = entidad_model;
