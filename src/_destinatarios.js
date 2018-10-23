import store from './store'
//despues usar store.filterList[id] asociada a cada item


export default {
  items: [
    {
      name: 'Comunidad',
      filterId: 1,
      icon: 'fa fa-users'
    },
    {
      name: 'Cooperativas y Org. De la economía social',
      filterId: 2,
      icon: 'fa fa-handshake'
    },
    {
      name: 'Emprendedores',
      filterId: 3,
      icon: 'fa fa-lightbulb',
    },
    {
      name: 'Empresas',
      filterId: 4,
      icon: 'fa fa-american-sign-language-interpreting'
    },
    {
      name: 'Gobierno Nacional',
      filterId: 5,
      icon: 'fa fa-flag'
    },
    {
      name: 'Gobierno Provincial',
      filterId: 6,
      icon: 'fa fa-building'
    },
    {
        name: 'Gobierno Local',
        filterId: 7,
        icon: 'fa fa-university'
    },
    {
        name: 'Organismos de ciencia y tércnica',
        filterId: 8,
        icon: 'fas fa-microscope'
    },
    {
        name: 'Org. No gubernamental (ONG)',
        filterId: 9,
        icon: 'fas fa-hands'
    },
    {
        name: 'Universidades',
        filterId: 10,
        icon: 'fas fa-graduation-cap'
    },
  ]
}
