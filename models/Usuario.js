const sequelize = require('sequelize');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const usuario_model = conexion => {
    let usuario = conexion.define('usuario',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false
            },
            usuario: {
                type: sequelize.TEXT,
                allowNull: false
            },
            nombres: {
                type: sequelize.STRING(25),
                allowNull: false
            },
            apellidos: {
                type: sequelize.STRING(25),
                allowNull: false
            },
            email: {
                type: sequelize.TEXT,
                allowNull: true
            },
            telefono: {
                type: sequelize.STRING(20),
                allowNull: true
            },
            tipo: {
                type: sequelize.SMALLINT,
                allowNull: false
            },
            usu_reniec: {
                type: sequelize.STRING(8),
                allowNull: true
            },
            hash: {
                type: sequelize.TEXT,
                allowNull: false
            },
            salt: {
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
            tableName: 'usuario',
            timestamps: true
        }
    );
    usuario.prototype.setSaltAndHash = function (password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    }
    usuario.prototype.validarPassword = function(password) {
        let hash_temporal = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
        if (hash_temporal === this.hash) {
            return true
        } else {
            return false
        }
    }
    usuario.prototype.generarJWT = function() {
        let payload = {
            usu_id: this.id,
            usu_nom: `${this.nombres} ${this.apellidos}`,
            usu_tipo: this.tipo,
            usu_reniec: this.usu_reniec
        };
        let token = jwt.sign(payload, 'q@zWSX123456', { expiresIn: '2h' }, { algorithm: 'RS256' });
        return token;
    }

    return usuario;
};

module.exports = usuario_model;
