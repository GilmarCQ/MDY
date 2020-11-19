const sequelize = require('sequelize');

const persona_model = conexion => {
    let persona = conexion.define('persona',
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: sequelize.INTEGER,
            allowNull: false
        },
        tipoDocumento: {
            type: sequelize.CHAR(3),
            allowNull: false
        },
        numeroDocumento: {
            type: sequelize.CHAR(15),
            allowNull: false
        },
        nombres: {
            type: sequelize.TEXT,
            allowNull: false
        },
        apellidoPaterno: {
            type: sequelize.TEXT,
            allowNull: false
        },
        apellidoMaterno: {
            type: sequelize.TEXT,
            allowNull: false
        },
        nombreCompleto: {
            type: sequelize.TEXT,
            allowNull: true
        },
        direccion: {
            type: sequelize.TEXT,
            allowNull: false
        },
        direccionAlternativa: {
            type: sequelize.TEXT
        },
        correo: {
            type: sequelize.TEXT
        },
        telefono: {
            type: sequelize.CHAR(10)
        },
        celular: {
            type: sequelize.CHAR(10)
        },
        estado: {
            type: sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        tableName: 'persona',
        timestamps: true
    });
    return persona;
}

module.exports = persona_model;