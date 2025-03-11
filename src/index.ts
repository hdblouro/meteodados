import fs from "fs";
import Meteo from "./models/Meteo";

const meteo = Array<Meteo>(); // cria um array de objetos da classe Meteo vazio

var x: number = 0; // variável necessária para pular a primeira linha de cabeçalho do arquivo CSV

const data = fs.readFileSync('./src/Meteo.csv',
    { encoding: 'utf8', flag: 'r' }).toString().split("\r\n"); // lê e fecha o arquivo CSV dos Dados Metereológicos, 
// colocando-os na variável data linha a linha

data.forEach(linha => { // faz a leitura de cada linha da variável data
    if (x > 0) { // só processa se não for a primeira linha
        var l = linha.split(';'); // quebra a linha nos pontos-e-vírgula gerando um array com cada campo/coluna
        //        console.log(l);
        let ano: number = parseInt(l[0].substring(6, 10));
        let mes: number = parseInt(l[0].substring(3, 5)) - 1;
        let dia: number = parseInt(l[0].substring(0, 2));
        const m = new Meteo(
            new Date(ano,mes,dia),
            l[1],
            parseFloat(l[2].replace(",",".")), // troca a virgula por ponto no valor e converte de string para number
            parseFloat(l[3].replace(",",".")),
            parseFloat(l[4].replace(",",".")),
            parseFloat(l[5].replace(",",".")),
            parseFloat(l[6].replace(",",".")),
            parseFloat(l[7].replace(",",".")),
            parseFloat(l[8].replace(",",".")),
            parseFloat(l[9].replace(",",".")),
            parseFloat(l[10].replace(",",".")),
            parseFloat(l[11].replace(",",".")),
            parseFloat(l[12].replace(",","."))); // instancia um objeto do Modelo a ser usado
        meteo.push(m); // adiciona o objeto m ao array de objetos meteo
        console.log(m);
    }
    x++; // incrementa a varíavel de controle de linha
}); // fecha data.forEach

console.log(meteo.length);
console.log(x);

/*
// Resolução do Exercício C
// Informar quais as 6 dezenas mais sorteadas, inclusive a quantidade de vezes. 
// Se ocorrer empate, listar todas na ordem de classificação;

var dezenas: number[][] = [];

for (x = 0; x < 60; x++) {
    dezenas[x] = [];
    dezenas[x].push(x+1);
    dezenas[x].push(0);
}

mega.forEach(m => { // faz a leitura de cada objeto Mega do array mega colocando-o em m
    //    console.log("Concurso:", m.concurso);
    dezenas[m.dez1 - 1][1]++; // somatório da 1ª dezena sorteada na posição específica do array
    dezenas[m.dez2 - 1][1]++; // somatório da 2ª dezena sorteada na posição específica do array
    dezenas[m.dez3 - 1][1]++; // somatório da 3ª dezena sorteada na posição específica do array
    dezenas[m.dez4 - 1][1]++; // somatório da 4ª dezena sorteada na posição específica do array
    dezenas[m.dez5 - 1][1]++; // somatório da 5ª dezena sorteada na posição específica do array
    dezenas[m.dez6 - 1][1]++; // somatório da 6ª dezena sorteada na posição específica do array
}); // fecha mega.forEach

dezenas.sort(sort_columnWise);

// Callback function to sort array according to the third column.
// If callback function will return 1, sort() method swap the row, Otherwise not.
function sort_columnWise(
    firstRow: Array<number>,
    secondRow: Array<number>
): number {
    if (firstRow[1] === secondRow[1]) {
        return 0;
    } else {
        if (firstRow[1] > secondRow[1]) {
            return -1;
        }

        return 1;
    }
}

var y = 0;
var ant = dezenas[0][0];
console.log("<< Exercício C >>\n");
for (x = 0; x < 60; x++) {
    console.log("Dezena", dezenas[x][0] , ":", dezenas[x][1]);
    if(ant != dezenas[x][0]){
        y++;
    }
    if(y==6){
        break;
    }
}

// Resolução do Exercícios D e E
// D - Informar o total de prêmios pagos ano a ano, desde 1996
// E - Informar a quantidade total de ganhadores da Sena e o valor total dos prêmios pagos a eles

console.log("\n<< Exercício D >>\n");

var ano: number[] = [];
var total: number = 0.0;
var ganhadores: number = 0;

for(x=0;x<29;x++){
    ano.push(0.0);
}

mega.forEach(sorteio =>{
    ano[parseInt(sorteio.data.substring(6,10))-1996] += sorteio.premio;
    total += sorteio.premio;
    ganhadores += sorteio.ganhadores;
})

for(x=0;x<29;x++){
    console.log("Ano:",x+1996,ano[x].toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}));
}

console.log("\n<< Exercício E >>\n");

console.log("Total Ganhadores:", ganhadores);
console.log("Total Prêmios Pagos:", total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}));

// Resolução do Exercício F
// Informar os 3 maiores prêmios pagos, a quantidade de ganhadores e quanto cada um recebeu

var premios: number[][] = [];
var w = 0;
mega.forEach(m => { // faz a leitura de cada objeto Mega do array mega colocando-o em m
    premios[w] = []; // inicializa a linha do array premio
    premios[w].push(m.ganhadores); // coloca na primeira coluna a quantidade de ganhadores do sorteio
    premios[w].push(m.premio); // coloca na segunda coluna o valor do prêmio
    w++;
}); // fecha mega.forEach

premios.sort(sort_columnWise);

// lista os três primeiros maiores prêmios pagos

console.log("\n<< Exercício F >>\n");
for (var i = 0; i < 3; i++) {
    console.log(i+1,"º Prêmio: ", premios[i][1].toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}));
    console.log("Ganhadores: ",premios[i][0]);
    if(premios[i][1] > 0){
        console.log("Divisão: ", (premios[i][1]/premios[i][0]).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}),"\n");        
    }
}

// Resolução do Exercício G
// Informar o ano com maior número de apostas.

console.log("\n<< Exercício G >>\n");

var apostas: number[] = [];

for(x=0;x<29;x++){
    apostas.push(0);
}

mega.forEach(sorteio =>{
    apostas[parseInt(sorteio.data.substring(6,10))-1996] += sorteio.apostas;
})

var anoapostas:number = 0;
var quant:number = 0;

for(x=0;x<29;x++){
    if (apostas[x]>quant){
        quant = apostas[x];
        anoapostas = 1996+x;
    }
}

console.log("Ano:",anoapostas);
console.log("Apostas:", quant.toLocaleString('pt-BR', {style: 'decimal', minimumFractionDigits: 0}));
*/