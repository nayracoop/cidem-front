import store from './store'

var nMessages = store.state.messages.filter(message => message.status === "unread");

export default {
  items: [
    {
      name: 'Administrar Servicios',
      url: '/admin/servicios',
      icon: 'icon-layers',
    },
    {
      name: 'Crear Servicio',
      url: '/admin/servicio/add',
      icon: 'icon-plus'
    },
    {
      name: 'Administrar Filtros',
      url: '/admin/filtros',
      icon: 'fa fa-gear'
    },
    {
      name: 'Consultas',
      url: '/admin/consultas',
      icon: 'icon-envelope',
    },
  ]

}
