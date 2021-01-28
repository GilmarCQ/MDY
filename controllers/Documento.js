const PdfPrinter = require('pdfmake');
const fs = require('fs');

const fonts = require("../utils/pdf/fonts");

const obtenerPdfFichaRegistro = (res, respuesta, numeroRegistro, comportamientos) => {
    var propietario, contacto, mascota;
    propietario = respuesta.personas[0];
    contacto = respuesta.personas[1];
    mascota = respuesta;
    let docDefinition = {
        content: [
            {
                table: {
                    widths: [100, '*', 150],
                    body: [
                        [
                            { text: 'logo' },
                            {},
                            { text: `N° de Registro ${numeroRegistro}\nFecha ${mascota.fechaRegistro}`, alignment: 'center', style: 'tableBorder' }
                        ]
                    ]
                },
                layout: 'headerLineOnly'
            },
            {
                text: `FICHA DE REGISTRO DE IDENTIFICACIÓN DE CANES`, alignment: 'center', style: 'header'
            },
            // {
            //     image: 'logo'
            // },
            {
                style: 'tableExample',
                color: '#555',
                table: {
                    widths: ['*', '*'],
                    body: [
                        [
                            { text: 'DATOS DEL PROPIETARIO', colSpan: 2, alignment: 'center', style: 'tableHeader' },
                            {}],
                        [
                            {
                                text: `Apellidos y Nombres:   ${propietario.apellidoPaterno.toUpperCase()} `
                                    + `${propietario.apellidoMaterno.toUpperCase()} ${propietario.nombres.toUpperCase()}`, colSpan: 2, style: 'tableContent'
                            }],
                        [
                            { text: `${propietario.tipoDocumento}:  ${propietario.numeroDocumento}`, style: 'tableContent' },
                            { text: 'Edad', style: 'tableContent' }],
                        [
                            { text: `Sexo:    ${propietario.sexo}`, style: 'tableContent' },
                            { text: `Teléfono / Celular:  ${propietario.telefono}`, style: 'tableContent' }],
                        [
                            { text: `Correo Electrónico:  ${propietario.correo}`, colSpan: 2, style: 'tableContent' }],
                        [
                            { text: `Dirección: ${propietario.direccion}`, colSpan: 2, style: 'tableContent' }],
                        [
                            { text: 'DATOS DE CONTACTO DE EMERGENCIA', colSpan: 2, alignment: 'center', style: 'tableHeader' }, {}],

                        [
                            {
                                text: `Apellidos y Nombres:   ${contacto.apellidoPaterno.toUpperCase()} `
                                    + `${contacto.apellidoMaterno.toUpperCase()} ${contacto.nombres.toUpperCase()}`, colSpan: 2, style: 'tableContent'
                            }],
                        [
                            { text: `${contacto.tipoDocumento}:  ${contacto.numeroDocumento}`, style: 'tableContent' },
                            { text: 'Edad', style: 'tableContent' }],
                        [
                            { text: `Sexo:    ${contacto.sexo}`, style: 'tableContent' },
                            { text: `Teléfono / Celular:  ${contacto.telefono}`, style: 'tableContent' }],
                        [
                            { text: `Correo Electrónico:  ${contacto.correo}`, colSpan: 2, style: 'tableContent' }],
                        [
                            { text: `Dirección: ${contacto.direccion}`, colSpan: 2, style: 'tableContent' }],

                        [
                            { text: 'DATOS DEL CAN', colSpan: 2, alignment: 'center', style: 'tableHeader' }, {}],
                        [
                            { text: `Nombre del Can:    ${respuesta.nombre}`, colSpan: 2, style: 'tableContent' }],
                        [
                            { text: `Edad: ${mascota.edad}, meses`, style: 'tableContent' },
                            { text: `Sexo: ${mascota.sexo}`, style: 'tableContent' }],
                        [
                            { text: `Color: ${mascota.color.toUpperCase()}`, style: 'tableContent' },
                            { text: `Tamaño: ${mascota.tamanio}`, style: 'tableContent' }],
                        [
                            { text: `Raza: ${mascota.raza}`, style: 'tableContent' },
                            { text: `Esterilizado: ${((mascota.esterilizado) ? 'Si' : 'No')}`, style: 'tableContent' }],
                        [
                            { text: 'Comportamiento del Can:\n ', colSpan: 2, style: 'tableContent' }],
                        // [
                        //     { ul: [
                        //         '465'
                        //     ] }],
                        [
                            { text: `Otras características: ${mascota.descripcion}`, colSpan: 2, style: 'tableContent' }
                        ]
                    ]
                },
                layout: 'headerLineOnly'
            },
        ],
        // images: {
        //     // logo: 'https://muniyura.gob.pe/images/utils/LOGO_ESCUDO_HORIZONTAL_120.png'
        //     logo: 'https://picsum.photos/seed/picsum/200/300'
        // },
        styles: {
            header: {
                fontSize: 14,
                bold: true,
                margin: [0, 0, 0, 30]
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            },
            tableHeader: {
                bold: true,
                fontSize: 12,
                color: '#00000',
                margin: [10, 4, 10, 4],
                fillColor: '#f5e92b',
                color: '#000'
            },
            tableContent: {
                bold: true,
                fontSize: 11,
                color: '#00000',
                margin: [10, 2, 10, 2]
            },
            tableBorder: {
                bold: true,
                margin: [0, 0, 0, 50]
            }
        }
    };
    const printer = new PdfPrinter(fonts);
    let pdfDoc = printer.createPdfKitDocument(docDefinition);
    var chunks = []
    var result;

    pdfDoc.on('data', function (chunk) {
        chunks.push(chunk)
    });
    pdfDoc.on('end', function () {
        result = Buffer.concat(chunks)
        res.set('content-type', 'application/pdf');
        res.send(result)
    });
    pdfDoc.end()
}


module.exports = {
    obtenerPdfFichaRegistro
}
