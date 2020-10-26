const sequelize = require('sequelize');

const libroIncidencias_model = conexion => {
    let libroIncidencias = conexion.define('libroIncidencias',
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: sequelize.INTEGER,
            allowNull: false
        },
        correlativo: {
            type: sequelize.INTEGER,
            allowNull: false
        },
        fecha: {
            type: sequelize.DATE,
            allowNull: false
        },
        tipoIncidencia: {
            type: sequelize.INTEGER,
            allowNull: false
        },
        tipoNotificacion: {
            type: sequelize.INTEGER,
            allowNull: false
        },
        direccionNotificacion: {
            type: sequelize.TEXT,
            allowNull: false
        },
        referenciaNotificacion: {
            type: sequelize.TEXT
        },
        estado: {
            type: sequelize.BOOLEAN,
            allowNull: false
        }
    });
    return libroIncidencias;
}

module.exports = libroIncidencias_model;;
