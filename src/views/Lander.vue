<template>
<!---------------- INICIO LANDER ----------------------->
<section class="Lander col-12">
		<!------- TITULO-------->
		<div class="row titlelander"> <!-- primer oracion --> 
	        <div class="col-12">            
	          <h1>Portal de soluciones y servicios tecnológicos</h1>          
	     	</div>            
	    </div>
	    <!------- DESCRIPCION -------->
	    <div class="row sublander"> <!-- segunda oracion -->
	        <div class="col-8 offset-2">            
	          	<p>En este portal se podrá acceder al catálogo de servicios tecnológicos que ofrece la Universidad Nacional de Tres de Febrero.</p>        
	      	</div>
	    </div>         
	    <!------- BUSCADOR DEL LANDER -------->   
	    <search-bar class="col-sm-12 col-md-10 offset-md-1"></search-bar>	  
	    <!------ LINK A VISTA DE TODOS LOS FILTROS ------>
		<div class="linksearch">
			<a href="#">Ver todos</a>
		</div>
		<!--------- LISTA DESTINATARIOS // FUNCIONALIDAD? ---------->	 
	    <div class="icons col-12">
		    <i class="fas fa-building"></i>
		    <i class="far fa-lightbulb"></i>
		    <i class="fas fa-handshake"></i>
		   	<i class="fas fa-hands"></i>
		    <i class="fas fa-graduation-cap"></i>
		    <i class="fas fa-microscope"></i>
		</div>
	</section>
</template>

<script>
import store from '../store'
import router from '../router'
import SearchBar from '@/components/SearchBar'



export default {
  name: 'Lander',
 data () {
    return {
      searchInput: ''
    }
  },
  components:{
  	SearchBar
  },
  computed: {
     searchQuery: function(){
      return this.$store.state.searchQuery;
     },
     filterList(){
      			return this.$store.state.filterList;
	},
	filterTypes(){
		      	return this.$store.state.filterTypes;
	},
  },
  methods: {
    submitSearch: function () {
      this.$store.dispatch('changeQuerySearch', this.searchInput);
      this.$store.dispatch('fetchServices');
      router.push({ name: 'Results', query:{services: this.searchQuery}});     
      //router.push({ name: "Results", query:{services: this.$store.state.searchQuery, filters: this.$store.getters.filterArray}});
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>