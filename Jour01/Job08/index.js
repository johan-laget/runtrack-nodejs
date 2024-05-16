const fs = require('fs');

fs.readFile('data.txt', 'utf8', (err, data) => {
    let newContent = '';
    for (let i = 0; i < data.length; i += 2) {
        newContent += data[i];
    }
    console.log("Une lettre sur deux du fichier data.txt :", newContent);
});
