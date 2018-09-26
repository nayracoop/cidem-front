
import Vue from 'vue'
import Router from 'vue-router'
import Lander from '@/views/Lander'
import Results from '@/views/Results'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Lander',
      component: Lander
    },
    {
      path: '/results',
      name: 'Results',
      component: Results
    }
  ]
})
