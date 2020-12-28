const sequelize = require('sequelize');

const  pagina_model = conexion => {
    let pagina = conexion.define('pagina',
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: sequelize.INTEGER,
            allowNull: false
        },
        url: {
            type: sequelize.TEXT,
            allowNull: false
        },
        descripcion: {
            type: sequelize.TEXT,
            allowNull: true
        }
    },
    {
        tableName: 'pagina',
        timestamps: true
    });
    return pagina;
}
module.exports = pagina_model;
