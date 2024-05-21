const fs = require('fs');
const path = require('path');


async function listDirectories() {
    console.log('Contenu du répertoire courant :'); 
    try {
        const files = await fs.promises.readdir('./', { withFileTypes: true }); 
        files.forEach(dirent => {
            if (dirent.isDirectory()) { 
                console.log(dirent.name); 
            }
        });
    } catch (error) {
        console.error('Erreur lors de la lecture du répertoire:', error);
    }
}

listDirectories(); 
