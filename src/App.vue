<template>
  <div id="app">
    <div class="view animated fadeIn">
      <router-view/>
    </div>
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
import DefaultContainer from '@/containers/DefaultContainer'
import DefaultAdminContainer from '@/containers/DefaultAdminContainer'



export default {
  name: 'App',
  data() {
    return {

    }
  },
  components: {
    TheHeader,
    TheFooter,
    TheSidebar,
    Results,
    Lander,
    Service,
    DefaultContainer,
    DefaultAdminContainer
  }, 
  created() {
    this.load();
  },
  mounted: function mounted(){
  

  },
  computed: {
    filterList(){
      return this.$store.state.filterList;
    },
    filterTypes(){
      return this.$store.state.filterTypes;
    },
    searchQuery() {
      return this.$store.state.searchQuery;
    },
    queryFilters() {
        var filtros = [];
        for (var i=0; i < this.$route.query.filters.length; i++){
            var filtri = this.$store.state.filterList.find(function(e){
              return e.id == that .$route.query.filters[i];
            })
            filtros.push(filtri);
        }
        return filtros
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
    load: function(){
      var that = this;
      if (this.$route.query.services) {
        this.$store.dispatch('changeQuerySearch', this.$route.query.services);
      };
      this.$store.dispatch('fetchFilters').then(response =>{ 
          if (this.$route.query.filters) {
              if(this. filterList){
                 var that = this;
                //ARREGLAR ESTO 
                var filtros = [];
                for (var i=0; i < this.$route.query.filters.length; i++){
                    var filtri = this.$store.state.filterList.find(function(e){
                      return e.id == that .$route.query.filters[i];
                    })
                    filtros.push(filtri);
                }
                if (filtros[0]){
                  console.log(filtros);
                  this.$store.dispatch('changeQueryFilters', filtros);
                }
              }
             /*
              var selFil = this.filterList.filter(function(item) { return this.$route.query.filters.includes(item.id)}); 
              console.log("selfil");
              console.log(selFil);
              this.$store.dispatch('changeQueryFilters', selFil); */
          }
          this.$store.dispatch('fetchServices', this.$route.query.filters); //para que este disponible para busquedas especificas, ids de servicios, etc   
      });
      
    }
    /*,
    setUrl: function() {
      history.pushState({ info: `searchQuery ${this.searchQuery}` }, this.searchQuery, `/#/?service=${this.searchQuery}&filter=[${this.filtersSelected}]`)
    } */
  }
  
}

</script>

<style lang="scss" >

  /* Import Bootstrap Vue Styles */
  @import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
  

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

  @font-face {
      font-family: 'Distefano-Slab';

      font-weight: 700;
      src: url('assets/fonts/tipo_-_distefanoslab-bold-webfont.woff') format('woff');
  }


  @font-face {
      font-family: 'Distefano-Slab';

      font-weight: 400;
      src: url('assets/fonts/tipo_-_distefanoslab-regular-webfont.woff') format('woff');
  }

  body {
    font: normal 100%/1.5 'Distefano-Sans', sans-serif;
    background: #fff;
    color:#000;
    margin: auto;
    cursor: default;

  }

a{
  cursor: pointer;
}



</style>
