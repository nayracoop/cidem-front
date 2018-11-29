<template>
  <div id="app">
    <div class="view animated fadeIn">
      <router-view/>
    </div>
  </div>
</template>

<script>
import router from './router'
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'
import TheSidebar from '@/components/TheSidebar'
import Results from '@/views/Results'
import Lander from '@/views/Lander'
import Service from '@/views/Service'
import DefaultContainer from '@/containers/DefaultContainer'
import DefaultAdminContainer from '@/containers/DefaultAdminContainer'

const SERVER_PATH = process.env.SERVER_PATH;


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
        this.$route.query.filters.forEach(function(element){
           var filtri = this.$store.state.filterList.find(function(e){
              return e.id == that .$route.query.filters[i];
            })
            filtros.push(filtri);
        });
        /* for (var i=0; i < this.$route.query.filters.length; i++){
            var filtri = this.$store.state.filterList.find(function(e){
              return e.id == that .$route.query.filters[i];
            })
            filtros.push(filtri);
        } */
        return filtros
    },
    services() {
        return this.$store.state.services;
    }
  },
  methods: {

      load: function(){
        var that = this;
        if (this.$route.query.services) {
          this.$store.dispatch('changeQuerySearch', this.$route.query.services);
        };
        this.$store.dispatch('fetchFilters').then(() =>{ 

          if (this.$route.query.filters) {
              if(this. filterList){
                var filtros = [];
                if (Array.isArray(this.$route.query.filters)) {
                  this.$route.query.filters.forEach(function(element){
                    var filtri = that.$store.state.filterList.find(function(e){
                        return e.id == element;
                      })
                      filtros.push(filtri);
                  });
                  this.$store.dispatch('changeQueryFilters', filtros).then(() => {
                         this.$store.dispatch('fetchServices', this.$route.query.filters);
                  });;

                } else {
                    var filtri = this.$store.state.filterList.find(function(e){
                        return e.id == that .$route.query.filters;
                      })
                      filtros.push(filtri);                  

                  this.$store.dispatch('changeQueryFilters', filtros).then(() => {
                         this.$store.dispatch('fetchServices', this.$route.query.filters);
                  });;
                }

              }
          } else {
              this.$store.dispatch('fetchServices', this.$route.query.filters);
          }
          

      });
      
    }

  }
  
}

</script>

<style lang="scss" >

  /* Import Bootstrap Vue Styles */
  @import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
 
  body.body-front {
    background: #fff;
    margin: auto;
    cursor: default;
  }

a{
  cursor: pointer;
}

</style>
