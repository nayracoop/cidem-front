
import Vue from 'vue'
import Router from 'vue-router'
import NotFound404 from '@/views/NotFound404'
import Lander from '@/views/Lander'
import Results from '@/views/Results'
import Service from '@/views/Service'
import Oferta from '@/views/Oferta'
import Contact from '@/views/Contact'
import Referencias from '@/views/Referencias'
import DefaultContainer from '@/containers/DefaultContainer'
import DefaultAdminContainer from '@/containers/DefaultAdminContainer'
import AdminServicios from '@/views/AdminServicios'
import AdminAddServicio from '@/views/AdminAddServicio'
import AdminEditServicio from '@/views/AdminEditServicio'
import AdminFiltros from '@/views/AdminFiltros'
import AdminConsultas from '@/views/AdminConsultas'
import AdminLogin from '@/views/AdminLogin'
import store from '@/store';



Vue.use(Router);


export default new Router({
  mode: 'history', //hay que hacer el catch-all en el server para que ande
  routes: [    
    {
      path: '/admin',
      name: 'Admin',
      redirect: '/admin/servicios',
      component: DefaultAdminContainer,      
      children: [
        {
          path: '/admin/servicios',
          name: 'Servicios' ,
          component: AdminServicios,
          beforeEnter(to, from, next) {
            store.dispatch('getAdminStatus').then(response => {
              if (response =="Authorized"){
                next();
              } else if (response == "Not authorized."){
                next('/admin/login');
              }
            });
          },
        },
        {
          path: '/admin/servicio/add',
          name: 'Crear Servicio' ,
          component: AdminAddServicio,
          beforeEnter(to, from, next) {
            store.dispatch('getAdminStatus').then(response => {
              if (response =="Authorized"){
                next();
              } else if (response == "Not authorized."){
                next('/admin/login');
              }
            });
          },
        },
        {
          path: '/admin/servicio/edit',
          name: 'Editar Servicio' ,
          component: AdminEditServicio,
          beforeEnter(to, from, next) {
            store.dispatch('getAdminStatus').then(response => {
              if (response =="Authorized"){
                next();
              } else if (response == "Not authorized."){
                next('/admin/login');
              }
            });
          },
        },
        {
          path: '/admin/filtros',
          name: 'Filtros',
          component: AdminFiltros,
          beforeEnter(to, from, next) {
            store.dispatch('getAdminStatus').then(response => {
              if (response =="Authorized"){
                next();
              } else if (response == "Not authorized."){
                next('/admin/login');
              }
            });
          },
        },
        {
          path: '/admin/consultas',
          name: 'Consultas' ,
          component: AdminConsultas,
          beforeEnter(to, from, next) {
            store.dispatch('getAdminStatus').then(response => {
              if (response =="Authorized"){
                next();
              } else if (response == "Not authorized."){
                next('/admin/login');
              }
            });
          },
        },
      ]
    },
    {
      path: '/admin/login',
      name: 'Login' ,
      component: AdminLogin
    },
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
          path: '/*',
          name: '404' ,
          component: NotFound404
        }
      ]
    }, 


  ]
})
