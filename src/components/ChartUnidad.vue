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
                    label: 'Cantidad de servicios por Unidad',   
                    backgroundColor:  '#E46651'   ,
                    data: [7,14,5,17,18,9,2,20]//this.chartData
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
                if (this.$store.state.filterList[i].filterType.id === 1){
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
                if (this.$store.state.filterList[i].filterType.id === 1){
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
