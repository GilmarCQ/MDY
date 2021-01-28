const sequelize = require('sequelize');

const mascota_model = conexion => {
    let mascota = conexion.define('mascota',
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
            edad: {
                type: sequelize.INTEGER,
                allowNull: false
            },
            color: {
                type: sequelize.TEXT,
                allowNull: false
            },
            tamanio: {
                type: sequelize.TEXT,
                allowNull: false
            },
            sexo: {
                type: sequelize.TEXT,
                allowNull: false
            },
            raza: {
                type: sequelize.TEXT,
                allowNull: false
            },
            esterilizado: {
                type: sequelize.BOOLEAN,
                allowNull: false
            },
            descripcion: {
                type: sequelize.TEXT,
                allowNull: false
            },
            foto: {
                type: sequelize.TEXT,
                allowNull: true
            },
            estado: {
                type: sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            especie: {
                type: sequelize.TEXT,
                allowNull: false
            },
            registro: {
                type: sequelize.INTEGER,
                allowNull: false
            },
            foto: {
                type: sequelize.BLOB,
                allowNull: false
            },
            fechaRegistro: {
                type: sequelize.DATEONLY,
                allowNull: false
            },
            estadoRegistro: {
                type: sequelize.TEXT,
                allowNull: false,
                defaultValue: 'ENVIADO'
            },
            fechaRevision: {
                type: sequelize.DATEONLY,
                allowNull: true
            }
        },
        {
            tableName: 'mascota',
            timestamps: true
        }
    );
    return mascota;
};

module.exports = mascota_model;
