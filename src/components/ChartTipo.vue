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
                    label: "Cantidad de servicios por Tipo",   
                    backgroundColor: '#e4B1e6',  
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
                    
                    data: [7,14,5,17,18,9,2,21,8,9,2,2,1,8,9,2,21,8,9,2,2]//this.chartData
            }]
        }, {
            responsive: true,
            maintainAspectRatio: false,
            lineTension: 1,
            scales: {
                xAxes: [{
                    stacked: false,
                    categoryPercentage: 0.4,
                    barPercentage: 0.9
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 25,
                    },
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
                if (this.$store.state.filterList[i].filterType.id === 3){
                    store.dispatch('getAssociatedServices', this.$store.state.filterList[i].id).then(response => {
                        data.push(response.length);
                        if ( data.length === ( this.chartLabels.length)){
                            console.log(data);
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
                if (this.$store.state.filterList[i].filterType.id === 3){
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
