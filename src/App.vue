<template>
  <div id="app" class="container">
    <the-header></the-header>
    <div class="test">
      <router-view/>
    </div>
    <the-footer></the-footer>

  </div>
</template>

<script>
import router from './router'
import axios from 'axios'
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'
import TheSidebar from '@/components/TheSidebar'
import Results from '@/views/Results'
import Lander from '@/views/Lander'
import Service from '@/views/Service'


export default {
  name: 'App',
  data() {
    return {
      childDataLoaded: false,
      errors: [],
    }
  },
  components: {
    TheHeader,
    TheFooter,
    TheSidebar,
    Results,
    Lander
  }, 
  mounted: function mounted(){
    this.getFiltersAvailable();
  },
  created() {
    
  },
  computed: {
    filtersAvailable() {
        return this.$store.state.filtersAvailable;
    },
    searchQuery() {
        return this.$store.state.searchQuery;
    },
    filtersSelected() {
        return this.$store.state.searchQueryFilters;
    },
    selected() {
        return this.$store.state.searchQueryFilters;
    },
    services() {
        return this.$store.state.services;
    }
  },
  methods: {
    /*load: function() {
      this.getFiltersAvailable();
      this.getServices();
    },*/
    getFiltersAvailable: function() {
      this.$store.dispatch('getFiltersAvailable');
    },
    getServices: function() {
     this.$store.dispatch('getServices');
     this.setUrl();
    },
    setUrl: function() {
      history.pushState({ info: `searchQuery ${this.searchQuery}` }, this.searchQuery, `/#/?service=${this.searchQuery}&filter=[${this.filtersSelected}]`)
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
