const fs = require('fs'); fs.readFileSync('data.txt', 'utf8', function(err, data) 

{const content = data;   console.log(`Contenu du fichier data.txt : ${content}`); });