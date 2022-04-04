class Grafico
{
    constructor()
    {
        this.graphFP = [];
        this.graphFQ = [];
        this.graphAA = [];
        this.graphAa = [];
        this.graphaa = [];
        this.graphTime = [];
    }

    criarGrafLinha() {
        var ctxLine = document.getElementById('grafico').getContext('2d');
        var chartLine = new Chart(ctxLine, {
            type: 'line',
    
            data: {
                labels: this.graphTime,
                datasets: [{
                    label: 'FP',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 0, 0)',
                    fill: false,
                    lineTension: 0,
                    borderWidth: 1,
					pointRadius: 2,
                    data: this.graphFP
                },
                {
                    label: 'FQ',
                    backgroundColor: 'rgb(0, 0, 0)',
                    borderColor: 'rgb(0, 0, 0)',
                    fill: false,
                    lineTension: 0,
                    borderWidth: 1,
					pointRadius: 2,
                    data: this.graphFQ
                }            
            ],
            },    
            options: {
                scales: {
                    xAxes: [{
						ticks: {
							fontSize: 9
						}
					}],
                    yAxes: [{
                            display: true,
                            ticks: {
                                beginAtZero: true,
                                steps: 20,
                                stepSize: 0.05,
                                fontSize: 9,
                                max: 1
                            }
                        }]
                    },
            }
        });
    
    }

    criarGrafLinha2() {
        var ctxLine = document.getElementById('graficow').getContext('2d');
        var chartLine = new Chart(ctxLine, {
            type: 'line',
    
            data: {
                labels: this.graphTime,
                datasets: [{
                    label: 'AA',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 0, 0)',
                    fill: false,
                    lineTension: 0,
                    borderWidth: 1,
					pointRadius: 2,
                    data: this.graphAA
                },
                {
                    label: 'Aa',
                    backgroundColor: 'rgb(100, 0, 0)',
                    borderColor: 'rgb(100, 0, 0)',
                    fill: false,
                    lineTension: 0,
                    borderWidth: 1,
					pointRadius: 2,
                    data: this.graphAa
                },
                {
                    label: 'aa',
                    backgroundColor: 'rgb(0, 0, 0)',
                    borderColor: 'rgb(0, 0, 0)',
                    fill: false,
                    lineTension: 0,
                    borderWidth: 1,
					pointRadius: 2,
                    data: this.graphaa
                }
            
            ],
            },    
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            fontSize: 9
                        }
                }],
                    yAxes: [{
                            display: true,
                            ticks: {
                                beginAtZero: true,
                                steps: 50,
                                fontSize: 9,
                                max: this.limitPop
                            }
                        }]
                    },
            }
        });
    
    }
}