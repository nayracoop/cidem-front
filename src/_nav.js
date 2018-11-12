import store from './store'

var nMessages = store.state.messages.filter(message => message.status === "unread");

export default {
  items: [
    {
      name: 'Dashboard',
      url: '/admin',
      icon: 'icon-speedometer'
    },
    {
      name: 'Consultas',
      url: '/admin/consultas',
      icon: 'icon-envelope',
     /*  badge: {
        variant: 'danger',
        text: nMessages.length.toString()
      } */
    },
    {
      title: true,
      name: 'Servicios',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Administrar Servicios',
      url: '/admin/servicios',
      icon: 'icon-layers'
    },
    {
      name: 'Crear Servicio',
      url: '/admin/servicio/add',
      icon: 'icon-plus'
    },
    {
      title: true,
      name: 'Filtros',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Administrar Filtros',
      url: '/admin/filtros',
      icon: 'fa fa-gear'
    },
  ]
}
