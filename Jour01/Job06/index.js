const fs = require('fs');

const fileContent = fs.readFileSync('data.txt', 'utf8');

console.log("Contenu du fichier data.txt :", fileContent);