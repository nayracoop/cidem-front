<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
    props: ['labels', 'data'],
  mounted () {
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          backgroundColor: 
            '#41B883'
          ,
          data: this.data
        }
      ]
    }, {responsive: true, maintainAspectRatio: true})
  }
}
</script>
