const fs = require('fs');

const newContent = "Je manipule les fichiers avec un module node !";

fs.writeFile('data.txt', newContent, (err) => {
    console.log("Le fichier a été modifié avec succès !");
    const fileContent = fs.readFileSync('data.txt', 'utf8');
    console.log("Contenu du fichier data.txt :", fileContent);
});
