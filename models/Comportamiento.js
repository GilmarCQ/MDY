const sequelize = require('sequelize');

const comportamiento_model = conexion => {
    let comportamiento = conexion.define('comportamiento',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER
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
            tableName: 'comportamiento',
            timestamps: true
        }
    )
    return comportamiento;
}
module.exports = comportamiento_model;

