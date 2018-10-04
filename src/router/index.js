
import Vue from 'vue'
import Router from 'vue-router'
import Lander from '@/views/Lander'
import Results from '@/views/Results'
import Service from '@/views/Service'


Vue.use(Router);

export default new Router({
  //mode: 'history', //hay que hacer el catch-all en el server para que ande
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
    },
    {
      path: '/service',
      name: 'Service',
      component: Service
    }
  ]
})
