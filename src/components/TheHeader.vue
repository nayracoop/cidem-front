<template>

  <div class="row align-items-center header justify-content-between" :class="{divide:this.$route.name !== 'Lander'}">
    <div class="col-3 col-sm-2 col-md-2 col-lg-2">  
         <img @click="goHome" src="../assets/img/logountref.svg" alt="logo-untref">
    </div>   
    <div class="d-none col-col-md-6 col-lg-6" v-if="this.$route.name !== 'Lander'">
      <div class="input-group">
        <input 
          type="text" 
          class="form-control rounded-0 place" 
          placeholder="Buscar servicios, instituciones..." 
          aria-label="search" 
          aria-describedby="button-addon2"
          v-model="searchInput"
          @keyup.enter="submitSearch">
        <div class="input-group-append boton">
          <a class="btn btn-outline-secondary rounded-0 boton" @click="submitSearch">Buscar</a>
        </div>
      </div>                  
    </div>
    <search-bar class="col-7 col-sm-8 col-md-8" v-if="this.$route.name !== 'Lander'"></search-bar>
    <!------ HAMBURGUESA (SE VE SIEMPRE) -------->
    <hamburguer class="col-2 col-md-2" v-if></hamburguer>
  </div>          
</template>
<!-- -------------- FIN HEADER PRINCIPAL -----------------> -->

<script>
import router from '../router'
import store from '../store'
import Hamburguer from '@/components/Hamburguer'
import SearchBar from '@/components/SearchBar'


export default {
  name: 'TheHeader',
  data () {
    return {
      searchInput: ''
    }
  },
  components: {
    Hamburguer,
    SearchBar
  },
  computed: {
     searchQuery: function(){
      return this.$store.state.searchQuery;
     }
  },
  methods: {
    submitSearch: function () {
      this.$store.dispatch('changeQuerySearch', this.searchInput);
      this.$store.dispatch('fetchServices');
      router.push({ name: 'Results', query:{services: this.searchQuery}});     
      //router.push({ name: "Results", query:{services: this.$store.state.searchQuery, filters: this.$store.getters.filterArray}});
    },
    goHome: function () {
	  	this.$store.dispatch('changeQuerySearch', null);
      this.$store.dispatch('changeQueryFilters', []);
      router.push({name:"Lander"})
    }
    /*,
    setUrl: function() {
      history.pushState({ info: `searchQuery ${this.searchQuery}` }, this.searchQuery, `/#/?service=${this.searchQuery}&filter=[${this.filtersSelected}]`)
-   } */
  }
}

</script>
<style scoped>
.divide{
    border-bottom:1px solid rgba(0, 0, 0, 0.2);
}
.header{
  margin: auto;
  margin-top: 0.5em;
  width: 100%;
  padding-bottom: 1em;
}

.header img{
    height: auto; 
    width: auto; 
    max-width: 150px; 
    max-height: 150px;
}

</style>
