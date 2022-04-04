class Simulacao
{
    constructor(totaldias)   
    {  
        this.totaldias = totaldias;
        this.larguraSet = 600;
        this.alturaSet = this.larguraSet;
        this.limitMovement = 3;
        this.limitPop = 500;
        this.movProbability = 1;

        this.numIndividuos = 0;
        this.homozigotos11 = 0;
        this.heterozigotos = 0;
        this.homozigotos22 = 0;
        this.fP = 0.5;
        this.fPini = this.fP; //redundante?

        this.selecao11 = 0;
        this.selecao12 = 0;
        this.selecao22 = 0;
        this.individuos = [];
        this.reprodutivos = [];
        this.time = 0;
        this.killtime = 0; 
        this.reproducaoSeletiva = false;
        this.tipoBias = "genotipico" // seleciona com base em fenotipo / "genotipico" ->com base no genótipo
        this.repSeletBias = "1"; // -1 só reproduz com fenótipo diferente, 1 só reproduz com fenótipo igual 
        this.estrutura = false; //se a população está estruturada geograficamente ou não 
        this.quadrantes     
    }
}


