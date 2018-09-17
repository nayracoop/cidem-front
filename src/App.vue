<template>
  <div id="app" class="container">
    <the-header></the-header>
    <div class="test">
      <h1>{{title}}</h1>
      <button @click="getipos">testea</button>
      <button @click="test1">chau</button>
      <button @click="test2">hola</button>

      <the-sidebar>
      </the-sidebar>

      
    </div>
    
    <the-footer></the-footer>

  </div>
</template>

<script>
import axios from 'axios'
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'
import TheSidebar from '@/components/TheSidebar'
import { eventBus } from '@/main.js'

export default {
  name: 'App',
  data() {
    return {
      services: null,
      errors: [],
      servicios: null,
      filterTree: null,
      title: 'chau'
    }
  },
  components: {
    TheHeader,
    TheFooter,
    TheSidebar
  },
  created() {
    eventBus.$on('titleChanged', (title) => {
        this.title = title
      })
  },
  methods: {
    getipos: function() {
      axios.get('http://127.0.0.1:8000/api/filter-tree')
      .then(response => (this.filterTree = response.data.data)  )
      .catch(e => {
        this.errors.push(e)
      }) 
      eventBus.$emit('filtrosOfrecidos', this.filterTree)
    },
    test1: function() {
      eventBus.changeTitle('chau')
    },
    test2: function() {
      eventBus.changeTitle('holi')
    }
 
  }
  
}
</script>

<style>

  @font-face {
      font-family: 'Distefano-Sans';
      font-style: normal;
      font-weight: 400;
      src: url('assets/fonts/tipo_-_distefanosans_regular-webfont.woff') format('woff');
  }
/*
  @font-face {
      font-family: 'Distefano-Sans';
      font-style: italic;
      font-weight: 400;
      src: url('../assets/fonts/tipo_-_distefanosans-italic-webfont.woff') format('woff');
  }
*/
  @font-face {
      font-family: 'Distefano-Sans';
      font-style: normal;
      font-weight: 200;
      src: url('assets/fonts/tipo_-_distefanosans_light-webfont.woff') format('woff');
  }
/*
  @font-face {
      font-family: 'Distefano-Sans';
      font-style: italic;
      font-weight: 200;
      src: url('../assets/fonts/tipo_-_distefanosanslightitalic-webfont.woff') format('woff');
  }
*/
  @font-face {
      font-family: 'Distefano-Sans';
      font-style: normal;
      font-weight: 900;
      src: url('assets/fonts/tipo_-_distefanosans-black-webfont.woff') format('woff');
  }

/*
  @font-face {
      font-family: 'Distefano-Sans';
      font-style: italic;
      font-weight: 900;
      src: url('../assets/fonts/tipo_-_distefanosans-blackitalic-webfont.woff') format('woff');
  }
  */

  @font-face {
      font-family: 'Distefano-Sans';
      font-style: normal;
      font-weight: 700;
      src: url('assets/fonts/tipo_-_distefanosans-bold-webfont.woff') format('woff');
  }
/*
  @font-face {
      font-family: 'Distefano-Sans';
      font-style: italic;
      font-weight: 700;
      src: url('../assets/fonts/tipo_-_distefanosans-bolditalic-webfont.woff') format('woff');
  }
  

  @font-face {
      font-family: 'Distefano-Slab';

      font-weight: 900;
      src: url('assets/fonts/tipo_-_distefanoslab-black-webfont.woff') format('woff');
  }

  @font-face {
      font-family: 'Distefano-Slab';
      font-style: italic;
      font-weight: 900;
      src: url('../assets/fonts/tipo_-_distefanoslab-blackitalic-webfont.woff') format('woff');
  }
  */

  @font-face {
      font-family: 'Distefano-Slab';

      font-weight: 700;
      src: url('assets/fonts/tipo_-_distefanoslab-bold-webfont.woff') format('woff');
  }
/*
  @font-face {
      font-family: 'Distefano-Slab';
      font-style: italic;
      font-weight: 700;
      src: url('../assets/fonts/tipo_-_distefanoslab-bolditalic-webfont.woff') format('woff');
  }

  @font-face {
      font-family: 'Distefano-Slab';
      font-style: italic;
      font-weight: 400;
      src: url('../assets/fonts/tipo_-_distefanoslab-italic-webfont.woff') format('woff');
  }

  @font-face {
      font-family: 'Distefano-Slab';

      font-weight: 200;
      src: url('../assets/fonts/tipo_-_distefanoslab-light-webfont.woff') format('woff');
  }

  @font-face {
      font-family: 'Distefano-Slab';
      font-style: italic;
      font-weight: 200;
      src: url('../assets/fonts/tipo_-_distefanoslab-lightitalic-webfont.woff') format('woff');
  }
*/

  @font-face {
      font-family: 'Distefano-Slab';

      font-weight: 400;
      src: url('assets/fonts/tipo_-_distefanoslab-regular-webfont.woff') format('woff');
  }


  body {
    font: normal 100%/1.5 'Distefano-Sans', sans-serif;
    background: #fff;
    color:#000;
  }

  /* buscador */
  .place{
    background-color: #f4f4f4; 
    margin-right: 15px;
  }

  .place::placeholder{
    font-size:0.8em;
  }

  .boton{
    background-color: #000;
    color:#fff;
    text-transform: uppercase;
      font-weight: 700;
  }

  @media (max-width: 576px){
    ul li a{
      display:block;
      margin-bottom:1em;
    }
      .primeralinea h1{
        font-size: 1.750em;
      }

      .segundalinea p{
        font-size: 0.875em;
      }

      .place::placeholder{
        font-size:0.8em;
      }

  }

</style>
