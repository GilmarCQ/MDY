const sequelize = require('sequelize');

const documento_model = conexion => {
    let documento = conexion.define('documento',
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
            archivo: {
                type: sequelize.BLOB,
                allowNull: false
            },
            fechaCreacion: {
                type: sequelize.DATEONLY,
                allowNull: false
            }
        },
        {
            timestamps: true,
            tableName: 'documento'
        }
    );
    return documento;
};

module.exports = documento_model;
