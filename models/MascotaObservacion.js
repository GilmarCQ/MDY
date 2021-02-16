const sequelize = require('sequelize');

const mascotaObservacion_model = conexion => {
    let mascotaObservacion = conexion.define('mascotaObservacion',
        {
            idMascota: {
                type: sequelize.INTEGER,
                allowNull: false
            },
            idObservacion: {
                type: sequelize.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: 'mascotaObservacion',
            timestamps: true
        }
    );
    return mascotaObservacion;
};

module.exports = mascotaObservacion_model;
