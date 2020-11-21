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
            serie: {
                type: sequelize.TEXT,
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
                allowNull: true
            },
            descripcion: {
                type: sequelize.TEXT,
                allowNull: false
            },
            accionesTomadas: {
                type: sequelize.TEXT,
                allowNull: true
            },
            idSituacion: {
                type: sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
            },
            nombreSituacion: {
                type: sequelize.TEXT,
                allowNull: false,
                defaultValue: 'ENVIADO'
            },
            estado: {
                type: sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        },
        {
            tableName: 'libroIncidencia',
            timestamps: true
        }
    );
    return libroIncidencias;
}

module.exports = libroIncidencias_model;
