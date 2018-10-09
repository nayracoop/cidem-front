<template>
<!---------------- INICIO LANDER ----------------------->
<section class="Lander col-12">
		<!------- TITULO-------->
		
		<div class="row titleLander"> <!-- primer oracion --> 
	        <div class="col-12">            
	          <h1>{{title}}</h1>          
	     	</div>            
	    </div>
	    <!------- DESCRIPCION -------->
	    <div class="row subLander"> <!-- segunda oracion -->
	        <div class="col-8 offset-2">            
	          	<p>{{subtitle}}</p>        
	      	</div>
	    </div>         
	    <!------- BUSCADOR DEL LANDER -------->   
	    <div class="row searcher">
	    	<SearchBar class="col-sm-12 col-md-10 offset-md-1"></SearchBar>
	    </div>	  
	    <!------ LINK A VISTA DE TODOS LOS FILTROS ------>
		<div class="all_icons">
			<a href="#">{{all}}</a>
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
      searchInput: '',
      title:'Portal de soluciones y servicios tecnológicos',
      subtitle:'En este portal se podrá acceder al catálogo de servicios tecnológicos que ofrece la Universidad Nacional de Tres de Febrero.',
      all:'Ver todos'
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
.Lander{
    padding-top:1em;     
}

.titleLander h1{
    text-align: center;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 2.25em;
}

.subLander p{
    margin-top:20px;
    text-align:center;
    font-size: 1.5em;
    color: #4a4a4a;
    font-family:'DistefanoSlab-Regular','DistefanoSlab';
}

.searcher{
    margin-top: 50px;
}

.searcherbtn{
    background-color: #000;
    color:#fff;
    text-transform: uppercase;
    font-weight: 700;
}

.searcherbtn:hover{
    background-color:#333333;
    color:#fff; 
    transition: 0.2s;   
}

.searcherbox{
    background-color: #f4f4f4; 
}

.landerresults{
    margin-top:15px;
}

.landerresults p{
    display: inline-flex;
    border-radius: 20px;
    padding: 0.2em 0.6em;
    margin-bottom:8px;
    margin-right: 10px;
    background-color:#17aae4;
    color:#fff;
    font-family:'Distefano-Slab';
    font-weight: 400;
    font-size:0.8em;
    text-transform: uppercase;
}

.Filterarrow{
    margin-left:4px;
}

.landerresults i{
    margin-left: 1px;
    font-size: 0.5em;
    vertical-align: super;
}

.landerHiddenF button{
    display:flex;
    justify-content: space-between;
}

.scrollable-menu li{
    margin:8px 4px;
}
.scrollable-menu{
    max-height: 200px;
    overflow-x: hidden;
    max-width: 93%;
}

.scrollable-menu li:hover{
    background-color:#f1f1f1; 
}

.scrollable-menu li:active{
    background-color:#17aae4;
}

.all_icons{
    margin-top: 50px;
    text-align: center;
}
.icons{
    text-align: center;
}

.icons i{
    padding:5px 5px;
    font-size: 40px;
    margin:30px 25px;
    color:#000;
}

.icons i:hover{
    text-shadow: 10px 2px grey;
    transition: 0.2s;
    cursor:pointer;
}

.all_icons a{
    font-style: italic;
    font-size: 1.1313em;
}

.lupa{
    margin:3px auto;
}
</style>