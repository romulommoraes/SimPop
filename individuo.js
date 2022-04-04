class Individuo {
    constructor(fP, larguraSet, alturaSet, limitMovement) {
        this.larguraSet = larguraSet;
        this.alturaSet = alturaSet;
        this.limitMovement = limitMovement;
        this.fP = fP;
        this.alelo1
        this.alelo2
        this.genotipo
        this.fenotipo
        this.position
        this.velocity

        this.color = 0;
        this.size = 5;
        this.idade = round(random(1, 8), 1);
        this.tempoExtra = round(random(-5, 35), 1); //determina o número de gerações que o animal vive a menos ou a mais que o valor base.
        this.reprodutivo = false;

    }

    setGenetica(alelo1, alelo2)
    {
        this.alelo1 = alelo1
        this.alelo2 = alelo2
        this.genotipo = this.alelo1.toString() + this.alelo2.toString();
        if (this.genotipo == "21") this.genotipo = "12"  
        
        if (this.genotipo == "11" || this.genotipo == "12") 
        {
            this.fenotipo = "Vermelho"
        }
        if (this.genotipo == "22") 
        {
            this.fenotipo = "Preto"
        }

    }

    setRandomGenetica()
    {
        var ProbP = this.fP * 100;
        var setAlelo1 = floor(random(1, 101));
        var setAlelo2 = floor(random(1, 101));
        if (setAlelo1 <= ProbP) {
            this.alelo1 = 1;
        }
        if (setAlelo1 > ProbP) {
            this.alelo1 = 2;
        }
        if (setAlelo2 <= ProbP) {
            this.alelo2 = 1;
        }
        if (setAlelo2 > ProbP) {
            this.alelo2 = 2;
        }
        this.genotipo = this.alelo1.toString() + this.alelo2.toString();
        if (this.genotipo == "21") this.genotipo = "12"
        
        if (this.genotipo == "11" || this.genotipo == "12") 
        {
            this.fenotipo = "Vermelho"
        }
        if (this.genotipo == "22") 
        {
            this.fenotipo = "Preto"
        }
    }
    setRandomPosition(tamanhoPop)
    {
        if (tamanhoPop < 100)
        { 
            this.position = createVector(random(50, 200), random(50, 200))
            this.velocity = createVector(random(-0.3,0.4), random(-0.3,0.4))
        }
        else  
        {
        this.position = createVector(random(15, this.larguraSet - 20), random(25, this.alturaSet - 20))
        this.velocity = createVector(random(-0.3,0.4), random(-0.3,0.4))
        }  
        
    }

    setPosition(X, Y)
    {
        this.position = createVector(X, Y)
        this.velocity = createVector(random(-0.3,0.4), random(-0.3,0.4))
    }


    estruturar(estrutura)
    {
        let posit
        if (estrutura == true) 
        {
            if (this.genotipo == "12") 
            {
                posit = createVector(random((this.larguraSet/2)-20, (this.larguraSet/2) + 20), random(25, this.alturaSet - 20))
            }
            if (this.genotipo == "11") 
            {
                posit = createVector(random(15, (this.larguraSet/2) - 20), random(25, this.alturaSet - 20))
            }
            if (this.genotipo == "22") 
            {
                posit = createVector(random(this.larguraSet/2 , this.larguraSet - 20), random(25, this.alturaSet - 20))
            }

        }
        if (estrutura == false)
        {
           posit = createVector(random(15, this.larguraSet - 20), random(25, this.alturaSet - 20))
        }
        this.position = posit
    }


    update() 
    {
       var randMov = floor(random(1,50))
       if (randMov == 1)
       {
        this.mov()
       }       
       this.position.add(this.velocity)
    }

    envelhecer() {
        this.idade = round(this.idade + 0.1, 1);
        if (this.idade % 3 == 0)
        {
           this.reprodutivo = true
        }
    }

    tempoextra() {
        var tempoIncr = this.tempoExtra;
        return tempoIncr;
    }

    verDominancia() {
        var dominancias = 0;
        if (this.alelo1 === 1 && this.alelo2 === 1) {
            dominancias = 11;
        }
        if (this.alelo1 === 2 && this.alelo2 === 2) {
            dominancias = 22;
        }
        if (this.alelo1 != this.alelo2) {
            dominancias = 12;
        }
        return dominancias;
    }

    display() {
        if (this.alelo1 === 1 && this.alelo2 === 1) {
            this.color = 252;
            stroke(252, 0, 0);
        }
        if (this.alelo1 === 2 && this.alelo2 === 2) {
            this.color = 0;
            stroke(0, 0, 0)
        }
        if (this.alelo1 != this.alelo2) {
            this.color = 252;
            stroke(0, 0, 0);
        }
        fill(this.color, 0, 0);
        ellipse(this.position.x, this.position.y, this.size, this.size);
    }

    calculateDistance(other) {
        let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        return d;
    }

    veridade() {
        var idadeInd = this.idade;
        return idadeInd;
    }

    reproduzir(outro) {
        var alelo1Rep; 
        var alelo2Rep;
        var aleloP1 = floor(random(0, 2));
        var aleloP2 = floor(random(0, 2));
        if (aleloP1 === 0) {
            alelo1Rep = this.alelo1;
        }
        if (aleloP1 === 1) {
            alelo1Rep = this.alelo2;
        }
        if (aleloP2 === 0) {
            alelo2Rep = outro.alelo1;
        }
        if (aleloP2 === 1) {
            alelo2Rep = outro.alelo2;
        }
        var genotipo = createVector(alelo1Rep, alelo2Rep);
        return genotipo;
    }


    //cria repulsão dos individuos em relação às paredes
    checkEdges() {
        this.velocity.add(this.Boundaries())
        this.velocity.limit(1)
    }


    mov() 
    {
        var boost = createVector(floor(random(-1, 2))/5, floor(random(-1, 2))/5)
        this.velocity.add(boost);
        this.velocity.limit(0.4)
    } 

    Boundaries()
    {
        var d = 20;
        var desire = createVector(0, 0);
        var steer = createVector(0, 0);

            if (this.position.x < d)
            {
                desire = createVector(2, this.velocity.y);
            }
            else if (this.position.x > this.larguraSet - d)
            {
                desire = createVector(-3, this.velocity.y);
            }
            if (this.position.y < d)
            {
                desire = createVector(this.velocity.x, 3);
            }
            else if (this.position.y > this.alturaSet - d)
            {
                desire = createVector(this.velocity.x, -3);
            }


            if (desire.x != 0 && desire.y != 0)
            {
                desire.normalize();
                desire.mult(2);
                var steer = desire.sub(this.velocity)

                steer.limit(1);
                return steer;
            }
            else
            {
                return steer;
            }
    }


}

