const { LibroIncidencias } = require('../config/Sequelize');
const { Persona } = require('../config/Sequelize');

const crearIncidencia = (req, res) => {
    let incidencia = req.body.incidencia;

    Persona.findOne({
        where: { estado: true, tipoDocumento: incidencia.persona.tipoDocumento.toString(), numeroDocumento: incidencia.persona.numeroDocumento }
    })
        .then(persona => {
            LibroIncidencias.findAndCountAll({
                where: { estado: true },
                order: [['correlativo', 'DESC']],
                attributes: ['id', 'correlativo'],
                limit: 1,

            }).then(incidenciaCorrelativo => {
                // console.log(incidenciaCorrelativo.count);
                // console.log(incidenciaCorrelativo.rows[0].dataValues.correlativo);
                (incidenciaCorrelativo.count === 0) ?
                    incidencia.incidencia.correlativo = 1
                    : incidencia.incidencia.correlativo = incidenciaCorrelativo.rows[0].dataValues.correlativo + 1;
                if (persona) {
                    incidencia.incidencia.idPersona = persona.id;
                    let incidenciaBuild = LibroIncidencias.build(incidencia.incidencia);
                    incidenciaBuild.save()
                        .then(incidenciaCreada => {
                            incidenciaCreada.incidencia = incidenciaCreada;
                            incidenciaCreada.persona = persona;
                            res.status(200).json({
                                ok: true,
                                contenido: incidenciaCreada,
                                mensaje: 'La incidencia se creo correctamente'
                            })
                        })
                } else {
                    let personaBuild = Persona.build(incidencia.persona);
                    personaBuild.save()
                        .then(personaCreada => {
                            incidencia.incidencia.idPersona = personaCreada.id;
                            let incidenciaBuild = LibroIncidencias.build(incidencia.incidencia);
                            incidenciaBuild.save()
                                .then(incidenciaCreada => {
                                    incidenciaCreada.incidencia = incidenciaCreada;
                                    incidenciaCreada.persona = personaCreada;
                                    res.status(200).json({
                                        ok: true,
                                        contenido: incidenciaCreada,
                                        mensaje: 'La incidencia se creo correctamente'
                                    })
                                })
                        })
                }
            })
        })
        .catch(error => console.log(error))
}
module.exports = {
    crearIncidencia
}
