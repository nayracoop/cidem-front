<template>
	<main role="main">
		<div class="row listado">	   						    
			<the-sidebar></the-sidebar>
			<div class="col-sm-12 col-md-7 offset-md-1" id="list">
				<section>
						<div class="results">
							<aside class="alertresults">Se encontraron {{metadata.total}} resultados para "{{searchQuery}}"</aside>
							<button v-if="previousPage" 
								@click="changepage(previousPage)"> anterior </button> 
							<label>{{metadata.current_page}}</label>
							<button v-if="nextPage" 
								@click="changepage(nextPage)"> siguiente </button>
							<button @click="print(impresion)"> print </button>
							<article v-for="service in services" class="card art" id="impresion">
								<div class="card-body box">
									<h2> {{ service.name }}</h2>
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
import TheSidebar from '@/components/TheSidebar'
import { eventBus } from '@/main.js'

export default {
	name: 'Results',
	data () {
	    return {
	    	services: [],
	    	metadata: [],
	    	links: [],
	    	searchQuery: ''

	    }
	}, 
	components: {
		TheSidebar
	},
	mounted: function mounted(){
    	eventBus.$emit("getFiltros")
  	},
	created() {
		eventBus.$emit('listadoCreated');
		eventBus.$on('servicesChanged', (data) => {
	  		this.services = data.data;
	  		this.metadata = data.meta;
	  		this.links = data.links;
	  	});
		eventBus.$on('searchSubmited', (data) => {
	      this.searchQuery = data;
	    });
	},
	methods: {
		changepage: function (link) {
			eventBus.$emit("changePage",link);
			axios.get(link)
		     .then(response => {
		     	this.services = response.data;
		     	eventBus.changeServices(response.data);
		     })
		     .catch(e => {
		       this.errors.push(e)
		    })   
		},
		print: function () {
			console.log("agregar funcionalidad")

    	}
	},
	computed: {
		previousPage: function (){
			if (this.links.prev) {
				return this.links.prev
			} 
		},
		nextPage: function () {
			if (this.links.next) {
				return this.links.next
			}
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