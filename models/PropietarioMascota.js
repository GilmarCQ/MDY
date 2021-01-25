const sequelize = require('sequelize');

const propietarioMascota_model = conexion => {
    let propietarioMascota = conexion.define('propietarioMascota',
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
            estado: {
                type: sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        },
        {
            timestamps: true,
            tableName: 'propietarioMascota'
        }
    );
    return propietarioMascota;
}

module.exports = propietarioMascota_model;
