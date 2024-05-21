const fs = require('fs');


const filePath = './data.txt';


const content = 'Je manipule les fichiers avec un module node !';


fs.writeFile(filePath, content, 'utf8', (err) => {
  if (err) {
    console.error("Une erreur s'est produite lors de l'écriture du fichier:", err);
  } else {
    console.log('Le fichier a été écrit avec succès.');
  }
});
