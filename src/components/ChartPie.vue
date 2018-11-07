<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: {
    labels: [],
    data: []
  },
  mounted () {
    this.renderChart({
      labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs', 'cidem'],
      datasets: [
        {
          backgroundColor: [
            '#41B883',
            '#E46651',
            '#00D8FF',
            '#DD1B16',
            '#e4B1e6',

          ],
          data: [40, 20, 30, 10, 20]
        }
      ]
    }, {responsive: true, maintainAspectRatio: true})
  }
}
</script>
