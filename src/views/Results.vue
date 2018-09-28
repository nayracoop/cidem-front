<template>
	<main role="main">
		<div class="row listado">	   						    
			<the-sidebar></the-sidebar>
			<div class="col-sm-12 col-md-7 offset-md-1" id="list">
				<section>
						<div class="results">
							<aside class="alertresults">Se encontraron {{metadata.total}} resultados para "{{searchQuery}}"</aside>
							<button v-if="previousPage" 
								@click="changePage(previousPage)"> anterior </button> 
							<label>{{metadata.current_page}}</label>
							<button v-if="nextPage" 
								@click="changePage(nextPage)"> siguiente </button>
							<button @click="print"> print </button>
							<article v-for="service in services" class="card art">
								<div class="card-body box">
									<h2 @click="viewService(service.id)"> {{ service.name }}</h2>
									<dl>
										<dt>Tipo:</dt>
										<dd>{{service.summary}}</dd>
									</dl>
									<p>{{service.description}}</p>
								</div>
							</article>	
					</div>							
				</section>
			</div>	
		</div>
	</main>
</template>

<script>
import axios from 'axios'
import router from '../router'
import TheSidebar from '@/components/TheSidebar'

export default {
	name: 'Results',
	data () {
	    return {

	    }
	}, 
	components: {
		TheSidebar
	},
	created() {
		console.log("results: querySelected: " + this.querySelected + " (falta pasarlo a store.state.searchQueryFilters)" );
		/* //ESTO VA A FUNCIONAR CUANDO 
		var that = this;
		if (this.querySelected) {
			var selFil = this.filtersAvailable.filter(function(item) { return that.querySelected.indexOf(item.id)});
			console.log(selFil);
		  	this.$store.dispatch('changeQueryFilters', selFil); 
		}
		*/
		this.submitSearch(); 
	},
	computed: {
		services: function(){
        	return this.$store.state.services.data;
		},
    	metadata:  function(){
			return this.$store.state.services.meta;
		},
    	links:  function(){
			return this.$store.state.services.links;
		},
    	searchQuery:  function(){
			//return this.$store.state.searchQuery;
			return this.$route.query.services;
			console.log(this.$route.query.services);
		},
		previousPage: function (){
			if (this.links.prev) {
				return this.links.prev;
			} 
		},
		nextPage: function () {
			if (this.links.next) {
				return this.links.next;
			}
		},
		querySelected: function() {
	    	return this.$route.query.filters; //devuelve solo ID
	    },
	    /*
	    selected: function() {
	        return this.$store.state.searchQueryFilters; //devuelve ID y name
	    },
	    filtersAvailable: function() {
        	return this.$store.state.filtersAvailable;
   		},*/
	},
	methods: {
		changePage: function (link) { 
		   	this.$store.dispatch('changePage', link); 
		},
		print: function () {
			console.log("results: print : agregar funcionalidad")
    	},
    	viewService: function (serviceID) {
			//router.push({ name: 'Service', params:{id: serviceID}});			
			router.push({ name: 'Service', query:{id: serviceID}}); // no pude acceder a los query params desde /service?id=n
		},
		submitSearch: function () {
	      this.$store.dispatch('changeQuerySearch', this.searchQuery);
	      this.$store.dispatch('getServices');
	    }
	}
	
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main{
    margin:30px 0;
}

.listado {
	 outline: 1px solid red !important;
}
 .btnnobtn button {
    border: none;
    background: none;    
    cursor: pointer;
    text-transform: uppercase;
}

 .titlefilters2 button {
    border: none;
    background: none;    
    text-align:left;
    font-size: 1.5em;
    margin:0 auto;
    font-weight: 700;
    cursor: pointer;
}

 .titlefilters1 h2{
    margin-top: 40px;
    margin-right: 25px;
    font-weight:700;
    font-size:1.25em;
/*    text-align: center;*/
}

.modalscreen{
    padding:0;
    margin:0;
    width:100%;
}

.selectedfilters ul{
    padding: 0;
}

.selectedfilters ul li{
    display: inline-block;
    border-radius: 20px;
    padding: 0 0.4em;
    margin:5px 4px;
    background-color:#17aae4;
    color:#fff;
    font-family:'Distefano-Slab';
    font-weight: 400;
    font-size:1.125em;
    text-transform: uppercase;
}

.selectedfilters i{
    margin-left: 1px;
    font-size: 0.75em;
    vertical-align: super;
}

.filters dt{
    font-size:1.125em    
}

.filters dd{
    display: list-item;
    font-weight: 200;
}

.alertresults{
    font-weight: 200;
    padding: 0;
    margin: 0;
    font-size:0.875em;
}

.results h2{
    font-weight: 700;
    font-size: 1.25em;
    color:#17aae4;
}

.box dl dt, 
.box dl dd{   
    display: inline-block;
    font-weight: 200;
    font-size: 0.875em;
}

.results p{
    font-weight: 200;
    font-size: 0.875em;
}

.art{
    background-color:#f4f4f4;  
    margin-bottom: 30px;
}
</style>