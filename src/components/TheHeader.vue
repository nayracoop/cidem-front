<template>
<!---------------- INICIO HEADER PRINCIPAL , ARRIBA DE TODO : ----------------->
  <div class="row align-items-center header">
     <!---- LOGO UNTREF (SE VE SIEMPRE) -------->
    <div class="col-sm-2 col-md-2 col-lg-2">  
         <img @click="goHome" src="../assets/img/logountref.svg" alt="logo-untref">
    </div>
    <!------ BUSCADOR DEL HEADER, SE VE EN TODAS LAS VISTAS MENOS EL LANDER -------->
    <div class="d-none col-md-6 col-lg-6" v-if="this.$route.name !== 'Lander'">
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
    <search-bar class="col-sm-8 col-md-8" v-if="this.$route.name !== 'Lander'"></search-bar>
    <!------ HAMBURGUESA (SE VE SIEMPRE) -------->
    <hamburguer class="col-2 col-md-2 float-right" v-if></hamburguer>
<!---------------- FIN HEADER PRINCIPAL ----------------->
  </div>          
</template>

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
      router.push({name:"Lander"})
    }
    /*,
    setUrl: function() {
      history.pushState({ info: `searchQuery ${this.searchQuery}` }, this.searchQuery, `/#/?service=${this.searchQuery}&filter=[${this.filtersSelected}]`)
-   } */
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{

  margin-top: 1em;
  border-bottom:1px solid rgba(0, 0, 0, 0.2);
  width: 100%;
  padding-bottom: 1em;
}

/*HACER QUE DESAPAREZCA LINEA CON MEDIAQ, HACER EL BUSCADOR MÁS GRANDE CON MEDIAQ*/
.header img{

    height: auto; 
    width: auto; 
    max-width: 150px; 
    max-height: 150px;
}


</style>
