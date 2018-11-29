<script>
import { Bar  } from 'vue-chartjs'
import store from '../store'

export default {
    extends: Bar,
    props: ['labels', 'data'],
    mounted () {
        this.renderChart({
            labels: this.chartLabels,
            datasets: [{      
                    label: "Cantidad de servicios por Sector",   
                    backgroundColor:
                        '#41B883'
                        /* '#E46651',
                        '#00D8FF',
                        '#DD1B16',
                        '#e4B1e6',  
                        '#00D8FF',
                        '#DD1B16',
                        '#e4B1e6',
                         '#ffB1e6',  
                        '#0068FF',
                        '#001B16',
                        '#e4B128',
                         '#e4B1e6',  
                        '#0017FF',
                        '#DD1B16',
                        '#e4B1e6', */
                    ,
                    data: [7,14,5,17,18,9,2,21,8,9,2,2,1,8,9,2,21,8,9,2,2]//this.chartData
            }]
         }, {
            title: {
                display: true,
                text: 'Cantidad de servicios ofrecidos para cada Sector'
            },
            legend: false,
            responsive: true,
            maintainAspectRatio: false,
            lineTension: 1,
            scales: {
                xAxes: [{
                    stacked: false,
                    categoryPercentage: 0.4,
                    barPercentage: 0.9,
                            type: 'category',
                                  offset: true,


                }],
                yAxes: [{
                    scaleLabel: {
                         display: true,
                        labelString:'Cantidad de servicios',
                    },
                    lineHeight: 0.5,
                    ticks: {
                        beginAtZero: true,
                        max: 25,
                    },
                      type: 'linear',
                    offset: true,
                    drawTicks: true,
                    stacked: false,
                    categoryPercentage: 0.4,
                    barPercentage: 0.2
                }]
            }
        }) 
    },
    computed : {
        chartData() {
            var that = this;
            var data = [];
            for (var i = 0 ; i < this.$store.state.filterList.length; i++){
                if (this.$store.state.filterList[i].filterType.id === 4){
                    store.dispatch('getAssociatedServices', this.$store.state.filterList[i].id).then(response => {
                        data.push(response.length);
                        if ( data.length === ( this.chartLabels.length)){
                            return data;
                        }
                    });
                }
           }
        },
        chartLabels() {
            var that = this;
            var labels = [];
            for (var i = 0 ; i < this.$store.state.filterList.length; i++){
                if (this.$store.state.filterList[i].filterType.id === 4){
                    labels.push(this.$store.state.filterList[i].tag);
                }
            }
            return labels;
        }
    },
    watch: {
        chartData (newValue) {
        this.chart.data.datasets.data = newValue.slice()
        this.chart.update(0)
        }
    }
}
</script>
