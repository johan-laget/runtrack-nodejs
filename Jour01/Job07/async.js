const fs = require('fs').promises; 

async function readData() {
    try {
        const data = await fs.readFile('data.txt', 'utf8');
        console.log(`Contenu du fichier data.txt : ${data}`);
    } catch (err) {
        console.error('Erreur lors de la lecture du fichier:', err);
    }
}

readData();
