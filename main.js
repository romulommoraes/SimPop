function setup() {
    let canvas = createCanvas(600, 600);
    background(252, 252, 252);
    canvas.parent('canva');
    startscene();
}

function startscene() {
    draw = function () {
        background(252, 252, 252);
        textSize(20);
        fill(252, 252, 252);
        rect(0, 0, 600, 600);
        fill(0, 0, 0);
        text("Simulador Populacional", 158, 285);
        text("Rômulo Maciel de Moraes Filho", 116, 310);
    }
}
let signalEnding = 1;
let simular = document.getElementById("Alterar");
simular.addEventListener("click", iniciar);

/*-----------------Função Pause e Parar ------------*/
let pause = -1;
let varStop = document.getElementById("abort");
varStop.addEventListener("click", parar);
let varPause = document.getElementById("pause");
varPause.addEventListener("click", pausar);

function iniciar() {
    if (signalEnding == 1) {
        //console.log("iniciar");
        signalEnding = 0;
        if (pause === 1) {
            pause = -1
        }
        loop(); // é importante por causa do pause
        init();
    }
}

function parar() {
    //console.log("parar");
    signalEnding = 1;
    pause = pause * -1;
}

function pausar() {
    //console.log("pausar");
    pause = pause * -1;
    if (pause === 1) {
        noLoop();
    } else {
        loop();
    }
}

function init() {
    const sim = new Simulacao()
    const graph = new Grafico()
   // let quadrantes = []

    //variáveis a serem inseridas
    sim.numIndividuos = constrain(parseInt(document.getElementById('numIndividuos1').value), 2, 1000);
    sim.limitPop = constrain(parseInt(document.getElementById('MaxPop').value), 2, 1000);
    sim.fP = constrain(parseFloat(document.getElementById('freqP').value), 0, 1);
    sim.fPini = sim.fP
    sim.selecao11 = constrain(parseInt(document.getElementById('selxAA').value), 0, 100);
    sim.selecao12 = constrain(parseInt(document.getElementById('selxAa').value), 0, 100);
    sim.selecao22 = constrain(parseInt(document.getElementById('selxaa').value), 0, 100);
    let selRep = parseInt(document.getElementById('selRep').value);
    switch (selRep) {
        case 0:
            sim.reproducaoSeletiva = false
            break;
        case 1:
            sim.reproducaoSeletiva = true
            sim.tipoBias = "fenotipico"
            sim.repSeletBias = 1
            break;
        case 2:
            sim.reproducaoSeletiva = true
            sim.tipoBias = "fenotipico"
            sim.repSeletBias = -1
            break;
        case 3:
            sim.reproducaoSeletiva = true
            sim.tipoBias = "genotipico"
            sim.repSeletBias = 1
            break;
        case 4:
            sim.reproducaoSeletiva = true
            sim.tipoBias = "genotipico"
            sim.repSeletBias = -1
            break;

        default:
            sim.reproducaoSeletiva = false
            break;
    }

    if (isNaN(sim.numIndividuos) === true) {
        sim.numIndividuos = 250;
    }
    if (isNaN(sim.limitPop) === true) {
        sim.limitPop = 500;
    }
    if (isNaN(sim.fP) === true) {
        sim.fP = 0.5;
        sim.fPini = sim.fP;
    }
    if (isNaN(sim.selecao11) === true) {
        sim.selecao11 = 0;
    }
    if (isNaN(sim.selecao12) === true) {
        sim.selecao12 = 0;
    }
    if (isNaN(sim.selecao22) === true) {
        sim.selecao22 = 0;
    }

    draw = function () {
        background(252, 252, 252);
        textSize(20);
        stroke(0, 0, 0);
        fill(255, 255, 255);
        rect(0, 0, 600, 600);
        fill(252, 0, 0);
        rect(250, 290, 95, 25);
        fill(0, 0, 0);
        noStroke();
        text("INICIAR", 262, 310);
    };

    mouseClicked = function () {
        if (mouseX >= 248 && mouseX <= 355 & mouseY >= 290 && mouseY <= 315 && sim.time === 0) {
            sim.time = 0;
            startTime(graph, sim);
        }
    }
    /* -----------------------------------Instancia os Indivíduos--------------------------------------------- */
    for (let i = 0; i < sim.numIndividuos; i++) {
        sim.individuos[i] = new Individuo(sim.fP, sim.larguraSet, sim.alturaSet, sim.limitMovement, sim.estrutura);
        sim.individuos[i].setRandomGenetica()
        sim.individuos[i].setRandomPosition(sim.numIndividuos)

        if (sim.individuos[i].alelo1 === 1 && sim.individuos[i].alelo2 === 1) {
            sim.homozigotos11++;
        }
        if (sim.individuos[i].alelo1 === 2 && sim.individuos[i].alelo2 === 2) {
            sim.homozigotos22++;
        }
        if (sim.individuos[i].alelo1 != sim.individuos[i].alelo2) {
            sim.heterozigotos++;
        }
        //sim.individuos[i].estruturar(sim.estrutura)
    }

    /*
    for (i = 0; i < (sim.alturaSet / 75) * 10; i++) {
        let quad = new QuatreeS(i, sim.individuos);
        quadrantes.Add(quad);
    }
    */


} //init


function startTime(graph, sim) {
    graph.graphFP.splice(0, graph.graphFP.length);
    graph.graphFQ.splice(0, graph.graphFQ.length);
    graph.graphTime.splice(0, graph.graphTime.length);
    graph.graphAA.splice(0, graph.graphAA.length);
    graph.graphAa.splice(0, graph.graphAa.length);
    graph.graphaa.splice(0, graph.graphaa.length);
    graph.criarGrafLinha();
    graph.criarGrafLinha2();
    startSim(graph, sim);
}

/* -----------------------------------Estatística Final--------------------------------------------- */
function endscene(graph, sim) {
    graph.criarGrafLinha();
    graph.criarGrafLinha2();
    draw = function () {
        background(255, 255, 255);
        noStroke();
        textSize(20);
        fill(255, 255, 155);
        rect(0, 0, 599, 599);
        fill(0, 0, 0);
        noStroke();
        text("Simulação Finalizada", 199, 30);
        text("Estatísticas", 245, 160);
        textSize(18);
        text("Configurações", 110, 230);
        textSize(12);
        text("População Inicial", 110, 245);
        text(sim.numIndividuos, 240, 245);
        text("Limite Populacional", 110, 260);
        text(sim.limitPop, 240, 260);
        text("f(p) inicial", 110, 275);
        text(sim.fPini, 240, 275);
        text("Seleção contra AA", 110, 290);
        text(sim.selecao11, 240, 290);
        text("Seleção contra Aa", 110, 305);
        text(sim.selecao12, 240, 305);
        text("Seleção contra aa", 110, 320);
        text(sim.selecao22, 240, 320);
        text("Seleção Sexual", 110, 335);
        text(sim.reproducaoSeletiva, 240, 335);

        if (sim.reproducaoSeletiva == true) 
        {
            text("Tipo de Seleção Sexual", 110, 350);
            text(sim.tipoBias, 240, 350);
            text("Seleção por", 110, 365);
            if (sim.repSeletBias == "1") text("Mesmo tipo", 240, 365);
            if (sim.repSeletBias == "-1") text("Tipo distinto", 240, 365);    
        }

   
        textSize(18);
        text("Resultados", 335, 230);
        textSize(12);
        text("f(p)", 335, 245);
        text(round(sim.fP, 2), 425, 245);
        text("f(q)", 335, 260);
        text(round(1 - sim.fP, 2), 425, 260);
        text("Nº de Gerações", 335, 275);
        text(sim.totaldias, 425, 275);
    }
}


function startSim(graph, sim)     /*-----------------Função Iniciar Simulação ------------*/ {
    let totalIndividuos = sim.individuos.length;
    setInterval(function () {
        if (pause === -1) {
            calcFreq(sim);
            totalIndividuos = sim.individuos.length;
            sim.time++;
            graph.graphTime.push(sim.time);
            graph.graphFP.push(round(sim.fP, 3));
            graph.graphFQ.push(round(1 - sim.fP, 3));
            graph.graphAA.push(sim.homozigotos11);
            graph.graphAa.push(sim.heterozigotos);
            graph.graphaa.push(sim.homozigotos22);
            if (sim.selecao11 != 0 || sim.selecao12 != 0 || sim.selecao22 != 0) {
                selecaoNatural(sim);
            }

        }
    }, 1000)
    setInterval(function () {
        if (pause === -1) {
            morteIdade(sim);
            envelhecimento(sim);
        }
    }, 100);

    draw = function () {
        background(255, 255, 255);
        fill(255, 255, 255);
        stroke(255, 0, 0);
        rect(1, 15, sim.larguraSet - 2, sim.alturaSet - 18);
        fill(0, 0, 0);
        noStroke();
        textSize(13);
        text("Indivíduos", 2, 12);
        text(totalIndividuos + "|", 68, 12);
        text("AA", 100, 12);
        text(sim.homozigotos11, 125, 12);
        text("Aa", 150, 12);
        text(sim.heterozigotos, 170, 12);
        text("aa", 200, 12);
        text(sim.homozigotos22, 220, 12);
        text("f(p).", 390, 12);
        text(round(sim.fP, 2), 415, 12);
        text("f(q)", 450, 12);
        text(round((1 - sim.fP), 2), 475, 12);
        text("Geração", 520, 12);
        text(sim.time, 579, 12);

        if (sim.time === 130) {
            parar();
        }
        /* -----------------------------------Função chamar estatística final--------------------------------------------- 	*/
        if (sim.time > 5 && sim.fP === 1 || sim.time > 5 && sim.fP === 0 || sim.individuos.length === 0) {
            parar();
        }

        if (signalEnding === 1) //sinaliza on off por meio do botão abortar
        {
            calcTotalDias(sim);
            endscene(graph, sim);
        }
        let novos = reproduce(sim)
        for (let i = 0; i < novos.length; i++) {
            if (sim.individuos.length < sim.limitPop) {
                sim.individuos.push(novos[i])
                if (novos[i].genotipo == "11") {
                    sim.homozigotos11++
                }
                if (novos[i].genotipo == "12") {
                    sim.heterozigotos++
                }
                if (novos[i].genotipo == "22") {
                    sim.homozigotos22++
                }
            }
        }

        //sim.individuos = novos.concat(sim.individuos) 
        let arraySize = sim.individuos.length;
        for (let i = 0; i < arraySize; i++) {
            sim.individuos[i].update() //movimenta
            sim.individuos[i].checkEdges() //verifica limites
            sim.individuos[i].display() //atualiza

        }
    } //draw     
}//starsim

function calcFreq(sim) {
    let fH11 = sim.homozigotos11;
    let fHet = sim.heterozigotos;
    sim.fP = (((2 * fH11) + fHet) / (sim.individuos.length * 2))
}


// seleção natural
function selecaoNatural(sim) {
    for (let i = 0; i < sim.individuos.length; i++) {
        let probMorrer = floor(random(0, 101));
        let dominancias = sim.individuos[i].verDominancia(sim.individuos[i]);
        if (dominancias === 11 && probMorrer < sim.selecao11) {
            sim.individuos.splice(i, 1);
            sim.homozigotos11--;
        }
        if (dominancias === 12 && probMorrer < sim.selecao12) {
            sim.individuos.splice(i, 1);
            sim.heterozigotos--;
        }
        if (dominancias === 22 && probMorrer < sim.selecao22) {
            sim.individuos.splice(i, 1);
            sim.homozigotos22--;
        }
    }
}

function reproduce(sim) {

    let arrayNovo = []
    let arraySize = sim.individuos.length;

    for (let i = 0; i < arraySize; i++) {
        if (sim.individuos[i].reprodutivo == true) {
            if (sim.individuos.length < sim.limitPop) {
                let found = false
                for (let j = 0; j < sim.individuos.length; j++) {
                    if (i !== j && sim.individuos[j].reprodutivo == true) {
                        if (found == false) {
                            if (sim.reproducaoSeletiva == true) {
                                //REVER, 
                                if (sim.tipoBias == "fenotipico") {
                                    if (sim.repSeletBias == "-1") {
                                        if (sim.individuos[i].fenotipo != sim.individuos[j].fenotipo) {
                                            found = findMach(sim, i, j, arrayNovo)
                                            if (found == true) {
                                                sim.individuos[i].reprodutivo = false
                                                sim.individuos[j].reprodutivo = false
                                                break
                                            }
                                        }
                                    }
                                    if (sim.repSeletBias == "1") {
                                        if (sim.individuos[i].fenotipo == sim.individuos[j].fenotipo) {
                                            found = findMach(sim, i, j, arrayNovo)
                                            if (found == true) {
                                                sim.individuos[i].reprodutivo = false
                                                sim.individuos[j].reprodutivo = false
                                                break
                                            }
                                        }
                                    }
                                }
                                if (sim.tipoBias == "genotipico") {
                                    if (sim.repSeletBias == "-1") {
                                        if (sim.individuos[i].genotipo != sim.individuos[j].genotipo) {
                                            found = findMach(sim, i, j, arrayNovo)
                                            if (found == true) {
                                                sim.individuos[i].reprodutivo = false
                                                sim.individuos[j].reprodutivo = false
                                                break
                                            }
                                        }
                                    }
                                    if (sim.repSeletBias == "1") {
                                        if (sim.individuos[i].genotipo == sim.individuos[j].genotipo) {
                                            found = findMach(sim, i, j, arrayNovo)
                                            if (found == true) {
                                                sim.individuos[i].reprodutivo = false
                                                sim.individuos[j].reprodutivo = false
                                                break
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                found = findMach(sim, i, j, arrayNovo)
                                if (found == true) {
                                    sim.individuos[i].reprodutivo = false
                                    sim.individuos[j].reprodutivo = false
                                    break
                                }
                            }
                        }
                        else {
                            break
                        }
                    }
                }
            }
            else {
                break
            }
        }
    }
    return arrayNovo
}

function findMach(sim, i, j, arrayNovo) {
    let distanceRep = sim.individuos[i].calculateDistance(sim.individuos[j])
    if (distanceRep <= 7) 
    {
        //if (sim.individuos.length < sim.limitPop)
       // {
           // if (sim.individuos[i].reprodutivo == true && sim.individuos[j].reprodutivo == true) {
                let genotipo = sim.individuos[j].reproduzir(sim.individuos[i])
                let newind = new Individuo(sim.fP, sim.larguraSet, sim.alturaSet, sim.limitMovement)
                newind.setGenetica(genotipo.x, genotipo.y)
                let novoX = sim.individuos[i].position.x + random(-1, 2)
                let novoY = sim.individuos[i].position.y + random(-1, 2)
                newind.setPosition(novoX, novoY)
                arrayNovo.push(newind)
                return true
           // }
       // }
      //  else {
         //   return false
           // }   
    }
    else {
        return false
    }
}



function envelhecimento(sim) {
    let len = sim.individuos.length;
    for (let i = 0; i < len; i++) {
        sim.individuos[i].envelhecer();
    }
}

function morteIdade(sim)  /* ----- Morte por idade ----- */ {
    //tem q ter um loop unico pro splice
    for (let i = 0; i < sim.individuos.length; i++) {
        let idadeInd = sim.individuos[i].veridade();
        let tempoIncr = sim.individuos[i].tempoextra();
        if (idadeInd >= 12 + tempoIncr) {
            let dominancias = sim.individuos[i].verDominancia();
            sim.individuos.splice(i, 1);
            if (dominancias === 11) {
                sim.homozigotos11--;
            }
            if (dominancias === 12) {
                sim.heterozigotos--;
            }
            if (dominancias === 22) {
                sim.homozigotos22--;
            }
            totalIndividuos = sim.individuos.length;
        }
    }
}

function calcTotalDias(sim) {
    sim.totaldias = sim.time;
}


//quadtree

function quadtree(quadrantes, sim) 
{
    for (i = 0; i < quadrantes.length; i++) 
    {
        quadrantes[i].atualizarBoids(sim.individuos);
        if (quadrantes[i].individuos.length > 0) {
            quadrantes[i].vizinhos = quadrantes[i].individuos;
            for (j = 0; j < quadrantes.length; j++) 
            {
                if (quadrantes[i].individuos.length > 0) {
                    //linha
                    if (quadrantes[i].CordX == quadrantes[j].CordX - 1 && quadrantes[i].CordY == quadrantes[j].CordY) {
                        quadrantes[i].vizinhos = vizinhos.concat(quadrantes[j].individuos);
                    }
                    if (quadrantes[i].CordX == quadrantes[j].CordX + 1 && quadrantes[i].CordY == quadrantes[j].CordY) {
                        quadrantes[i].vizinhos = vizinhos.concat(quadrantes[j].individuos);
                    }
                    //coluna
                    if (quadrantes[i].CordY == quadrantes[j].CordY - 1 && quadrantes[i].CordX == quadrantes[j].CordX) {
                        quadrantes[i].vizinhos = vizinhos.concat(quadrantes[j].individuos);
                    }
                    if (quadrantes[i].CordY == quadrantes[j].CordY + 1 && quadrantes[i].CordX == quadrantes[j].CordX) {
                        quadrantes[i].vizinhos = vizinhos.concat(quadrantes[j].individuos);
                    }
                    //diagonais
                    if (quadrantes[i].CordX == quadrantes[j].CordX - 1 && quadrantes[i].CordY == quadrantes[j].CordY - 1) {
                        quadrantes[i].vizinhos = vizinhos.concat(quadrantes[j].individuos);
                    }
                    if (quadrantes[i].CordX == quadrantes[j].CordX + 1 && quadrantes[i].CordY == quadrantes[j].CordY + 1) {
                        quadrantes[i].vizinhos = vizinhos.concat(quadrantes[j].individuos);
                    }
                    if (quadrantes[i].CordX == quadrantes[j].CordX - 1 && quadrantes[i].CordY == quadrantes[j].CordY + 1) {
                        quadrantes[i].vizinhos = vizinhos.concat(quadrantes[j].individuos);
                    }
                    if (quadrantes[i].CordX == quadrantes[j].CordX + 1 && quadrantes[i].CordY == quadrantes[j].CordY - 1) {
                        quadrantes[i].vizinhos = vizinhos.concat(quadrantes[j].individuos);
                    }
                }

                //AÇÕES COM OS INDIVIDUOS DENTRO DOS QUADRANTES

            }
            quadrantes[i].vizinhos = [];
        }
    }
}


