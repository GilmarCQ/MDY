const sequelize = require('sequelize');
const { conexion } = require('../config/Sequelize');

const asociacion_model = conexion => {
    let asociacion = conexion.define('asociacion',
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
            estado: {
                type: sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        },
        {
            tableName: 'asociacion',
            timestamps: true
        }
    );
    return asociacion;
}

module.exports = asociacion_model;
