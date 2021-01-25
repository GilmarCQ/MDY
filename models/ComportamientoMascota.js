const sequelize = require('sequelize');

const comportamientoMascota_model = conexion => {
    let comportamientoMascota = conexion.define('comportamientoMascota',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false
            },
            estado: {
                type: sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        },
        {
            timestamps: true,
            tableName: 'comportamientoMascota'
        }
    );
    return comportamientoMascota;
}

module.exports = comportamientoMascota_model;
