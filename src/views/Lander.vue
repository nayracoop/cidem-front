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
	    <div class="d-none d-md-inline col-md-6 col-lg-6 offset-3">
	      	<div class="input-group">
		        <input 
		          type="text" 
		          class="form-control rounded-0 place" 
		          placeholder="Buscar servicios, instituciones..." 
		          aria-label="Recipient's username" 
		          aria-describedby="button-addon2"
		          v-model="searchInput"
		          @keyup.enter="submitSearch">
		        <div class="input-group-append boton">
		          <a class="btn btn-outline-secondary rounded-0 boton" @click="submitSearch">Buscar</a>
		        </div>
	      	</div>                  
	    </div>
	    <!------- FILTROS DE LANDER (UN COMPONENTE APARTE) -------->
	    <div class="row">
	    	<!------ COMPONENTE FILTRO DROPDOWN UNICO------>
		    <div  v-for="type in filterTypes" class="col-10 offset-2 selectes">
		      	<div class="col-3 uno">
			          <label>{{type.name}}</label>
			          <select 
			          	class="select" 
			          	placeholder=""
			          	v-for="filter in filterList"
					    v-if="filter.filter_type_id == type.id">
			            <option>{{filter.name}}</option>
			          </select>
		        </div>
		    </div>
	    </div>  
	    <!------ LINK A VISTA DE TODOS LOS FILTROS ------>
		<div class="linksearch">
			<a href="#">Ver todos</a>
		</div>
		<!--------- LISTA DESTINATARIOS // FUNCIONALIDAD? ---------->													 
	    <div class="icons">
		    <a href="#"><i class="fas fa-building"></i></a>
		    <a href="#"><i class="far fa-lightbulb"></i></a>
		    <a href="#"><i class="fas fa-handshake"></i></a>
		    <a href="#"><i class="fas fa-hands"></i></a>
		    <a href="#"><i class="fas fa-graduation-cap"></i></a>
		    <a href="#"><i class="fas fa-microscope"></i></a>
		</div>				
	</section>
</template>

<script>
import store from '../store'
import router from '../router'


export default {
  name: 'Lander',
 data () {
    return {
      searchInput: ''
    }
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
      console.log("ook")       
    },
    filterList(){
      			return this.$store.state.filterList;
	},
	filterTypes(){
		      	return this.$store.state.filterTypes;
	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>