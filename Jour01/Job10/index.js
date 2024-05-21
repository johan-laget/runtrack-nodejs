const url = require('url');
const URL = "https://www.google.com/search?q=nodejs";

const parsedUrl = new url.URL(URL);

const protocol = parsedUrl.protocol;
const hostName = parsedUrl.hostName;
const searchParams = parsedUrl.searchParams;

console.log(`Protocole: ${protocol}`);
console.log(`Nom d'hôte: ${hostName}`);
console.log(`Paramètres de recherche: ${searchParams}`);

parsedUrl.hostName = 'www.laplateforme.io';

parsedUrl.searchParams.append('new param','lang=fr');

console.log(`Nouvelle URL: ${parsedUrl.toString()}`);