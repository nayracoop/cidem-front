import store from './store'
//despues usar store.filterList[id] asociada a cada item


export default {
  items: [
    {
      name: 'Comunidad',
      filterId: 77,
      icon: 'fa fa-users'
    },
    {
      name: 'Cooperativas y Org. De la economía social',
      filterId: 78,
      icon: 'fa fa-handshake'
    },
    {
      name: 'Emprendedores',
      filterId: 79,
      icon: 'fa fa-lightbulb',
    },
    {
      name: 'Empresas',
      filterId: 87,
      icon: 'fa fa-american-sign-language-interpreting'
    },
    {
      name: 'Gobierno Nacional',
      filterId: 88,
      icon: 'fa fa-flag'
    },
    {
      name: 'Gobierno Provincial',
      filterId: 89,
      icon: 'fa fa-building'
    },
    {
        name: 'Gobierno Local',
        filterId: 90,
        icon: 'fa fa-university'
    },
    {
        name: 'Organismos de ciencia y técnica',
        filterId: 91,
        icon: 'fas fa-microscope'
    },
    {
        name: 'Org. No gubernamental (ONG)',
        filterId: 103,
        icon: 'fas fa-hands'
    },
    {
        name: 'Universidades',
        filterId: 104,
        icon: 'fas fa-graduation-cap'
    },
  ]
}
