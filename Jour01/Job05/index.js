const path = require('path');

const dirPath = './index.js';

const fileName = path.basename(dirPath);
console.log("Nom du fichier :", fileName);

const fileExtension = path.extname(dirPath);
console.log("Extension du fichier :", fileExtension);

const parentFolder = path.dirname(dirPath);
console.log("Répertoire parent :", parentFolder);
