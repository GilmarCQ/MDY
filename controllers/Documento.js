const PdfPrinter = require('pdfmake');

const fonts = require("../utils/pdf/fonts");
const styles = require("../utils/pdf/styles");
const { content } = require("../utils/pdf/plantillaFichaRegistroMascota");

const obtenerPdfFichaRegistro = async (res) => {
    let docDefinition = { content, styles };
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
