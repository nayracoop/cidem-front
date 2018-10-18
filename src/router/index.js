
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
import DefaultContainer from '@/containers/DefaultContainer'
import DefaultAdminContainer from '@/containers/DefaultAdminContainer'
import AdminServicios from '@/views/AdminServicios'
import AdminAddServicio from '@/views/AdminAddServicio'
import AdminFiltros from '@/views/AdminFiltros'
import AdminAddFiltro from '@/views/AdminAddFiltro'
import AdminConsultas from '@/views/AdminConsultas'
import AdminConfig from '@/views/AdminConfig'









Vue.use(Router);

export default new Router({
  //mode: 'history', //hay que hacer el catch-all en el server para que ande
  routes: [
    {
      path: '/',
      Name:'Client',
      component: DefaultContainer,
      children: [
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
        }
      ]
    }, 
    {
      path: '/admin',
      name: 'Admin',
      component: DefaultAdminContainer,
      children: [
        {
          path: '/admin',
          name: 'Dashboard' ,
          component: Dashboard
        },
        {
          path: '/admin/servicios',
          name: 'Servicios' ,
          component: AdminServicios
        },
        {
          path: '/admin/servicio/add',
          name: 'Crear Servicio' ,
          component: AdminAddServicio
        },
        {
          path: '/admin/servicio/edit',
          name: 'Editar Servicio' ,
          component: AdminAddServicio
        },
        {
          path: '/admin/filtros',
          name: 'Filtros',
          component: AdminFiltros
        },
        {
          path: '/admin/filtro/add',
          name: 'Crear Filtro' ,
          component: AdminAddFiltro
        },
        {
          path: '/admin/filtro/edit',
          name: 'Editar Filtro' ,
          component: AdminAddFiltro
        },
        {
          path: '/admin/consultas',
          name: 'Consultas' ,
          component: AdminConsultas
        },
        {
          path: '/admin/config',
          name: 'Preferencias' ,
          component: AdminConfig
        },
      ]
    }

  ]
})
