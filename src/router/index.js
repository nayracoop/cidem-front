
import Vue from 'vue'
import Router from 'vue-router'
import Lander from '@/views/Lander'
import Results from '@/views/Results'
import Service from '@/views/Service'
import LogIn from '@/views/LogIn'
import Oferta from '@/views/Oferta'
import Contact from '@/views/Contact'
import Referencias from '@/views/Referencias'
import Dashboard from '@/views/Dashboard'



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
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn
    },
     {
      path: '/referencias',
      name: 'Referencias',
      component: Referencias
    },
    {
      path: '/oferta',
      name: 'Oferta',
      component: Oferta
    },
    {
      path: '/contacto',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }

  ]
})
