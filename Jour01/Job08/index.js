const fs = require('fs');

fs.readFile('data.txt', 'utf8', function(err, data) {
    if (err) {
        console.error('Erreur lors de la lecture du fichier:', err);
        return;
    }

    const content = data;
    
    let filteredContent = '';
    for (let i = 0; i < content.length; i += 2) {
        filteredContent += content[i];
    }
    console.log(`Une lettre sur deux du fichier data.txt  : ${filteredContent}`);
});
