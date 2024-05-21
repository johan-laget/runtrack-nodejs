const path = require('path');


const filePath = 'C:\\Users\\adamc\\Documents\\La Plateforme\\runtrack-nodeJS\\Jour01\\Job05\\index.js';


const fileName = path.basename(filePath);
console.log('Nom du fichier:', fileName);


const fileExtension = path.extname(filePath);
console.log('Extension du fichier:', fileExtension);


const fileDirectory = path.dirname(filePath);
console.log('Répertoire parent du fichier:', fileDirectory);
