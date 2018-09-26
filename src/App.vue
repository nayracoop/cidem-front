<template>
  <div id="app" class="container">
    <the-header></the-header>
    <div class="test">
      <router-view/>
    </div>
    <button @click="rutiar">rutiar</button>
    <button @click="pressed">cambiar</button>
    <h1>{{ test }}</h1>
    <the-footer></the-footer>

  </div>
</template>

<script>
import axios from 'axios'
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'
import TheSidebar from '@/components/TheSidebar'
import Results from '@/views/Results'
import Lander from '@/views/Lander'
import { eventBus } from '@/main.js'

export default {
  name: 'App',
  data() {
    return {
      childDataLoaded: false,
      services: null,
      errors: [],
      filterTree: null,
      searchQuery: '',
      filtersSelected: [],
      selected: []
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
    this.getData();
  },
  created() {
    eventBus.$on('searchSubmited', (data) => {
      this.load();
      this.searchQuery = data;
    });
    eventBus.$on('getFiltros', () => (this.getipos()));
    eventBus.$on('filtersChanged', (data) => {
      this.selected = data;
      var filters = [];
       for (var i = 0; i < (this.selected.length); i++){
          filters.push(this.selected[i].id);
        } 
        this.filtersSelected = filters;
        this.setUrl();
    });
  },
  computed: {
    test() {
        return this.$store.getters.capitalize;
      }
  },
  methods: {
    getData: function(){
      var _this = this; 
      axios.get('http://127.0.0.1:8000/api/services')
      .then(response => {_
        this.services = response.data;
        eventBus.changeServices(_this.services);
      })
      .catch(e => {
        _this.errors.push(e)
      }) 
      

       axios.get('http://127.0.0.1:8000/api/filter-tree')
      .then(response => {
        _this.filterTree = response.data.data;
        eventBus.$emit('filtrosOfrecidos', _this.filterTree);
      })
      .catch(e => {
        _this.errors.push(e)
      });
    },
    getipos: function() {
      const that = this;
      axios.get('http://127.0.0.1:8000/api/filter-tree')
      .then(response => (that.filterTree = response.data.data)  )
      .catch(e => {
        this.errors.push(e)
      }) 
      eventBus.$emit('filtrosOfrecidos', that.filterTree)
    },
    getservicios: function() {
      eventBus.changeServices(this.services);
      axios.get('http://127.0.0.1:8000/api/services',  {
        params: {
          service: this.searchQuery,
          filters: this.filtersSelected
        }
      })
      .then(response => {
        this.services = response.data;
        this.setUrl();
      })
      .catch(e => {
        this.errors.push(e)
      }) 
    },
    load: function() {
      this.getipos();
      this.getservicios();
    },
    setUrl: function() {
      history.pushState({ info: `searchQuery ${this.searchQuery}` }, this.searchQuery, `/#/?service=${this.searchQuery}&filter=[${this.filtersSelected}]`)
    },
    rutiar: function() {
      axios.post('http://127.0.0.1:8000/api/services/3/filters/1')
      .then(response => {
        this.services = response.data;
        this.setUrl();
      })
      .catch(e => {
        this.errors.push(e)
      })     
    },
    pressed: function() {
      this.$store.dispatch('changeTest', "holaea");
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
