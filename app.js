const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline');

const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

rl.question('Palabra ---> ', (respuesta) => {
var palabra = respuesta;
rl.close();
var div = '--------------------------------------------------'
var url = 'https://www.wordreference.com/definicion/' + palabra;
console.log('\n' + div)
axios.get(url)
.then(response => {
const $ = cheerio.load(response.data);
$('li').each(function() {
var texto = $(this).text();
texto = texto.replace(/^\s+/, '');
if (texto.includes('m. y f.') || (texto.includes('m.')) || (texto.includes('f.'))) {
function dividirTexto(texto, palabrasPorLinea = 8) {
const palabras = texto.split(' ');
let resultado = '';
for (let i = 0; i < palabras.length; i++) {
if (i > 0 && i % palabrasPorLinea === 0) {
resultado += '\n'; 
}
resultado += palabras[i] + ' ';
}
return resultado.trim();
}

console.log(dividirTexto(texto) + '\n' + div);
}
});
})
.catch(error => {
console.log("error:", error);
});
});
