const fs = require('fs');

const dirPath = '../';

fs.readdir(dirPath, (err,files) => {
    console.log("Contenu du dossier :", files);
});
