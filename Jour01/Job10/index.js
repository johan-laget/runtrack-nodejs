const { URL } = require('url');

const URLString = "https://www.google.com/search?q=nodejs";

const parsedURL = new URL(URLString);

let protocol = parsedURL.protocol;
let hostname = parsedURL.hostname;
let pathname = parsedURL.pathname;
let searchParams = parsedURL.searchParams;

hostname = "www.laplateforme.io";
searchParams.set('lang', 'fr');

const newURL = protocol+"//"+hostname+pathname+"?"+searchParams.toString();

console.log("Nouvelle URL:", newURL);