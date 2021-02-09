const sequelize = require('sequelize');

const observacion_model = conexion => {
    let observacion = conexion.define('observacion',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false
            },
            asunto: {
                type: sequelize.TEXT,
                allowNull: false
            },
            descripcion: {
                type: sequelize.TEXT,
                allowNull: false
            },
            estado: {
                type: sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            fechaEmision: {
                type: sequelize.DATEONLY,
                allowNull: true
            }
        },
        {
            tableName: 'observacion',
            timestamp: true
        }
    );
    return observacion;
}

module.exports = observacion_model;
