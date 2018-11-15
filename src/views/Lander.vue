<template>
<!---------------- INICIO LANDER ----------------------->
<section class="Lander col-12 animated fadeIn">
		<!------- TITULO-------->
		
		<div class="row titleLander"> <!-- primer oracion --> 
	        <div class="col-12">            
	          <h1>{{title}}</h1>          
	     	</div>            
	    </div>
	    <!------- DESCRIPCION -------->
	    <div class="row subLander"> <!-- segunda oracion -->
	        <div class="col-12 col-md-8 offset-md-2">            
	          	<p>{{subtitle}}</p>        
	      	</div>
	    </div>
        <!------ TAGS FILTROS -------->
		<filters-selected class="col-12 p-0 col-lg-10 offset-lg-1"></filters-selected>
	    <!------- BUSCADOR DEL LANDER -------->
      <dropdown class="d-block d-md-none"></dropdown>   
	    <div class="row searcher">
	    	<SearchBar class="col-12 col-lg-10 offset-lg-1"></SearchBar>
        </div>	  




	    <!------ LINK A VISTA DE TODOS LOS FILTROS ------>

		<!--------- LISTA DESTINATARIOS // FUNCIONALIDAD? ---------->	 
	<div class="row dest">  
        <h5 class="col-lg-1 col-12 text-center">Destinatarios:</h5>
        <div class="icons offset-md-2 col-md-8 offset-lg-0 col-lg-10 col-12">
                <i  v-for="destinatario in destinatarios" 
                    :key="destinatario.id" 
                    :class="destinatario.icon" 
                    class="fa-xs"
                    v-b-tooltip.hover  
                    :title="destinatario.name"
                    @click="searchDestinatario(destinatario.filterId)"></i>
        </div>  
    </div> 
        <div class="row">
      <div class="all_icons">
          <a @click="verTodos()">Ver Todos</a>
      </div>
    </div> 
	</section>
</template>

<script>
import destinatarios from '@/_destinatarios'
import store from '../store'
import router from '../router'
import SearchBar from '@/components/SearchBar'
import Dropdown from '@/components/Dropdown'
import FiltersSelected from '@/components/FiltersSelected'


export default {
  name: 'Lander',
 data () {
    return {
      searchInput: '',
      destinatarios: destinatarios.items,
      title:'Portal de soluciones y servicios tecnológicos',
      subtitle:'En este portal se podrá acceder al catálogo de servicios tecnológicos que ofrece la Universidad Nacional de Tres de Febrero.',
    }
  },
  components:{
  	SearchBar,
    Dropdown,
    FiltersSelected
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
    verTodos: function () {
        this.$store.dispatch('changeQueryFilters', []);
        this.$store.dispatch('changeQuerySearch', null);
        this.$store.dispatch('fetchServices');
        router.push({ name: "Oferta"});
    },
    searchDestinatario: function (destId) {
        var filtro = this.$store.state.filterList.find(function(e){
            return e.id === destId;
        });
        this.$store.dispatch('changeQuerySearch', null);
        this.$store.dispatch('changeQueryFilters', [filtro]);
        this.$store.dispatch('fetchServices');
        router.push({ name: 'Results', query:{filters: destId}});   
    }   
  }
}
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.titleLander h1{
    margin-top: 1em;
    text-align: center;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 2.25em;
}

.subLander p{
    margin-top:20px;
    text-align:center;
    font-size: 1.2em;
    color: #4a4a4a;
    font-family:'DistefanoSlab-Regular','DistefanoSlab';
}

.searcher{
    margin-top: 20px;
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

.dest{
  margin-top:70px;
  margin-bottom:40px;
}

.all_icons{
    margin: 0 auto;
    padding-bottom:20px;
    text-align: center;
    text-decoration:underline;
}

.icons{
    text-align: center;
}

.icons i{
    padding:5px 5px;
    font-size: 30px;
    margin:10px 15px;
    color:#000;
    position:relative;
    transition:0.2s;
    top:0;
    border-bottom:solid white;
}

.icons i:hover{
    transition:0.3s;
    position:relative;
    top:-5px;
    cursor:pointer;
    border-bottom:solid #17aae4;
}


.lupa{
    margin:3px auto;
}

@media screen and (max-width:576px){
  .titleLander h1{
      margin-bottom: 1em;
      font-size: 1.625em;
      text-align:left;
  }
  .subLander p{
      margin-bottom:1em;
      text-align:left;
      font-size: 1em;
      font-family:'DistefanoSlab-Regular','DistefanoSlab';
      margin-top:0px;
  }


  .dest{
      margin-top:70px;
 	  margin-bottom:20px;
	}

  .dest h5{
      font-size: 1.125em;
  }

  .all_icons{
      margin:30px auto;
  }

  .icons i{
      font-size: 30px;
      margin:15px;
      color:#000;
      position:relative;
      transition:0.2s;
      top:0;
      border-bottom:solid white;
  }

}
</style>