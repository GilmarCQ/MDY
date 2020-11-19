const sequelize = require('sequelize');

const sede_model = conexion => {
    let sede = conexion.define('sede',
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
            descripcion: {
                type: sequelize.TEXT,
                allowNull: true
            },
            direccion: {
                type: sequelize.TEXT,
                allowNull: true
            },
            estado: {
                type: sequelize.BOOLEAN,
                allowNull: false
            }
        },
        {
            tableName: 'sede',
            timestamps: true
        }
    );
    return sede;
}
module.exports = sede_model;

