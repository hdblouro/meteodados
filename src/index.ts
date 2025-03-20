import fs from "fs";
import Meteo from "./models/Meteo";

var meteo = Array<Meteo>(); // cria um array de objetos da classe Meteo vazio

var x: number = 0; // variável necessária para pular a primeira linha de cabeçalho do arquivo CSV

const data = fs.readFileSync('./src/Meteo.csv',
    { encoding: 'utf8', flag: 'r' }).toString().split("\r\n"); // lê e fecha o arquivo CSV dos Dados Metereológicos, 
// colocando-os na variável data linha a linha

data.forEach(linha => { // faz a leitura de cada linha da variável data
    if (x > 0) { // só processa se não for a primeira linha
        var l = linha.split(';'); // quebra a linha nos pontos-e-vírgula gerando um array com cada campo/coluna
        // console.log(l);
        let ano: number = parseInt(l[0].substring(6, 10));
        let mes: number = parseInt(l[0].substring(3, 5)) - 1;
        let dia: number = parseInt(l[0].substring(0, 2));
        const m = new Meteo(
            new Date(ano, mes, dia),
            l[1],
            parseFloat(l[2].replace(",", ".")), // troca a virgula por ponto no valor e converte de string para number
            parseFloat(l[3].replace(",", ".")),
            parseFloat(l[4].replace(",", ".")),
            parseFloat(l[5].replace(",", ".")),
            parseFloat(l[6].replace(",", ".")),
            parseFloat(l[7].replace(",", ".")),
            parseFloat(l[8].replace(",", ".")),
            parseFloat(l[9].replace(",", ".")),
            parseFloat(l[10].replace(",", ".")),
            parseFloat(l[11].replace(",", ".")),
            parseFloat(l[12].replace(",", "."))); // instancia um objeto do Modelo a ser usado
        meteo.push(m); // adiciona o objeto m ao array de objetos meteo
//        console.log(m);
    }
    x++; // incrementa a varíavel de controle de linha
}); // fecha data.forEach

//console.log(meteo.length);
//console.log(x);

// Resolução do Exercício C
// Informar quais os 5 dias, que tiveram as mais altas temperaturas. 
// Se ocorrer empate, listar todas na ordem por dia;

let medias:Meteo[] = Array<Meteo>();
let dia:Date = meteo[0].Data;
let cont:number = 0;
x = 0;
let meteodia:Meteo = new Meteo(dia, "00:00", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

while (x < meteo.length) {
    while (true) {
        meteodia.Temp_C += meteo[x].Temp_C;
        meteodia.Hum += meteo[x].Hum;
        meteodia.Press_Bar += meteo[x].Press_Bar;
        meteodia.TempCabine_C += meteo[x].TempCabine_C;
        meteodia.Charge += meteo[x].Charge;
        meteodia.SR_Wm2 += meteo[x].SR_Wm2;
        meteodia.WindPeak_ms += meteo[x].WindPeak_ms;
        meteodia.WindSpeed_Inst += meteo[x].WindDir_Inst;
        meteodia.WindSpeed_Avg += meteo[x].WindSpeed_Avg;
        meteodia.WindDir_Inst += meteo[x].WindDir_Inst;
        meteodia.WindDir_Avg += meteo[x].WindDir_Avg;
        cont++;
        x++;
        if (x == meteo.length) {
            break;
        } else {
            if (dia.getTime() !== meteo[x].Data.getTime()){
                break;
            }
        }
    }
    
    meteodia.Temp_C /= cont;
    meteodia.Hum /= cont;
    meteodia.Press_Bar /= cont;
    meteodia.TempCabine_C /= cont;
    meteodia.Charge /= cont;
    meteodia.SR_Wm2 /= cont;
    meteodia.WindPeak_ms /= cont;
    meteodia.WindSpeed_Inst /= cont;
    meteodia.WindSpeed_Avg /= cont;
    meteodia.WindDir_Inst /= cont;
    meteodia.WindDir_Avg /= cont;
    medias.push(meteodia);

    if(x<meteo.length){
        dia = meteo[x].Data;
        cont = 0;
        meteodia = new Meteo(dia, "00:00", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
}

// console.log(medias);

function compare(a:Meteo,b:Meteo) {
    if (a.Temp_C > b.Temp_C)
       return -1;
    if (a.Temp_C < b.Temp_C)
      return 1;
    return 0;
  }

 
medias.sort(compare);

var y = 0;
var ant = medias[0].Temp_C;
console.log("<< Exercício C >>\n");
for (x = 0; x < medias.length; x++) {
    console.log("Dia:", medias[x].Data , "Temperatura Média: ", medias[x].Temp_C);
    if(ant != medias[x].Temp_C){
        y++;
        ant = medias[x].Temp_C;
    }
    if(y==5){
        break;
    }
}

/*
// Resolução do Exercícios D e E
// D - Informar o total de prêmios pagos ano a ano, desde 1996
// E - Informar a quantidade total de ganhadores da Sena e o valor total dos prêmios pagos a eles

// Callback function to sort array according to the third column.
// If callback function will return 1, sort() method swap the row, Otherwise not.

function sort_columnWise(
    firstRow: Array<number>,
    secondRow: Array<number>
): number {
    if (firstRow[2] === secondRow[2]) { // coluna Temp_C
        return 0;
    } else {
        if (firstRow[2] > secondRow[2]) {
            return -1;
        }

        return 1;
    }
}

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