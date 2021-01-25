const fs = require('fs');
const path = require('path')

const convertirArchivoLocalBase64 = async () => {

    var base64 = fs.readFileSync('/images/logo.png', {encoding:'base64' });
    // try {
    //     base64 = await fs.readFileSync(path.resolve(__dirname,'images/logo.png')).toString('base64');
    // } catch (error) {
    //     console.log(error);
    // }
    
    console.log(base64);
}

module.exports = {
    convertirArchivoLocalBase64
}