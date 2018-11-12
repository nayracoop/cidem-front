<template>
	<main role="main">
		<div class="d-inline">
			<filters-mobile></filters-mobile>
			<filters-selected class="col-12 m-2"></filters-selected>
		</div>
		<div class="row listado">
			<the-sidebar class="d-print-none"></the-sidebar>
			<div class="col-sm-12 col-md-7 offset-md-1" id="list">
				<section>
					<div v-if="services" class="results">
						<div class="row">
							<div class="col-12 navfile">
								<a @click="changePage(previousPage)"><i class="fas fa-angle-double-left"></i><span class="d-none  d-md-inline">Anterior</span></a>
								<p>Pagina {{metadata.current_page}} / {{metadata.last_page}}</p>
								<a @click="changePage(nextPage)"><span class="d-none d-md-inline">Siguiente</span><i class="fas fa-angle-double-right"></i></a>
								<span class="printbtn d-none d-md-block"><button @click="print"><i class="fas fa-print"></i></button></span>	
							</div>
						</div>

						<aside class="alertresults">Se encontraron {{metadata.total}} resultados<span v-if="searchQuery"> para "{{searchQuery}}" </span></aside>

							<article v-if="printing === false" v-for="service in services" :key="service.id" class="card art">
								<div class="box" >
									<h2 @click="viewService(service.id)"> {{ service.name }}</h2>
									<dl>
										<dt>Destinatarios:</dt>
										<dd><span v-for="filter in service.filters" v-if="filter.filterType.id === 5" >{{filter.name}} <span v-if="service.filters.length > 1">, </span> </span></dd>

									</dl>
									<dl>
										<dt>Tipo:</dt>
										<dd><span v-for="filter in service.filters" v-if="filter.filterType.id === 3" >{{filter.name}} <span v-if="service.filters.length > 1">, </span> </span></dd>
									</dl>
									<dl>
										<dt>Sector:</dt>
										<dd><span v-for="filter in service.filters" v-if="filter.filterType.id === 4" >{{filter.name}} <span v-if="service.filters.length > 1">, </span> </span></dd>
									</dl>
								</div>
							</article>
							<article v-if="printing === true" v-for="service in fullServices" :key="service.id" class="card art">
								<div class="box">
									<h2 @click="viewService(service.id)"> {{ service.name }}</h2>
									<dl>
										<dt>Destinatarios:</dt>
										<dd><span v-for="filter in service.filters" v-if="filter.filterType.id === 5" :key="filter.id" >{{filter.name}} <span v-if="service.filters.length > 1">, </span> </span></dd>

									</dl>
									<dl>
										<dt>Tipo:</dt>
										<dd><span v-for="filter in service.filters" v-if="filter.filterType.id === 3" :key="filter.id" >{{filter.name}} <span v-if="service.filters.length > 1">, </span> </span></dd>
									</dl>
									<dl>
										<dt>Sector:</dt>
										<dd><span v-for="filter in service.filters" v-if="filter.filterType.id === 4" :key="filter.id" >{{filter.name}} <span v-if="service.filters.length > 1">, </span> </span></dd>

									</dl>
									<dl>
										<dt>Teléfono</dt>
										<dd>{{service.phone}}</dd>
									</dl>
								</div>
							</article>		
					</div>						
				</section>
			</div>	
		</div>
	</main>
</template>

<script>
import vue from 'Vue'
import axios from 'axios'
import router from '../router'
import store from '../store'
import FiltersSelected from '@/components/FiltersSelected'
import FiltersMobile from '@/components/FiltersMobile'
import TheSidebar from '@/components/TheSidebar'

export default {
	beforeRouteEnter (to, from, next) {
		console.log(store.state.searchQueryFilters);
		next();
	},
	name: 'Results',
	data () {
	    return {
			printing: false,
			render: true,
			loading: false,
			hide:false
	    }
	}, 
	components: {
		TheSidebar,
		FiltersSelected,
		FiltersMobile
	},
	created() {
		vue.nextTick();
		
	},
	mounted(){
		
	},
	computed: {
		services: function(){
        	return this.$store.state.services.data;
		},
		serviceFilters(){
			return this.$store.getters.serviceFiltersNames;
		},
		fullServices: function(){
        	return this.$store.state.fullServices.data;
		},
    	metadata:  function(){
			return this.$store.state.services.meta;
		},
    	links:  function(){
			return this.$store.state.services.links;
		},
    	searchQuery:  function(){
			return this.$store.state.searchQuery;
		},
		previousPage: function (){
			if (this.$store.state.services.links.prev) {
				return this.$store.state.services.links.prev;
			} 
		},
		nextPage: function () {
			if (this.$store.state.services.links.next) {
				return this.$store.state.services.links.next;
			}
		},
		querySelected: function() {
	    	return this.$route.query.filters;
	    }
	},
	methods: {
		changePage: function (link) { 
		   	this.$store.dispatch('changePage', link); 
		},
		print: function () {
			this.loading = true;
			this.printing = true;
			this.$store.dispatch('fetchFullServices', this.metadata.total).then(()=>{
				this.loading = false;
				window.print();
				this.printing = false;
			}); 

    	},
    	viewService: function (serviceID) {
			//router.push({ name: 'Service', params:{id: serviceID}});			
			router.push({ name: 'Service', query:{id: serviceID}}); // no pude acceder a los query params desde /service?id=n
			this.$store.dispatch('fetchFullServices', this.metadata.total); 
		}
	}
	
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main{
    margin:0;
}

 .btnnobtn button {
    border: none;
    background: none;    
    cursor: pointer;
    text-transform: uppercase;
}

.navfile{
	text-align:center;
}

.printbtn{
	float:right;
}

.navfile a,
.navfile p{
	display:inline-block;
}

.navfile p{
	margin:0 40px;
}

.alertresults{
    font-weight: 200;
    padding: 0;
    margin: 10px 0;
    font-size:0.875em;
}

.results h2{
    font-weight: 700;
    font-size: 1.25em;
    color:#111111;
    transition: 0.1s;
    margin-bottom:30px;
}

.results h2:hover{
	color:#17aae4;
	cursor: pointer;
}

.box {
	padding:1.5em 1em;
}
.box dl{
	margin-bottom:5px;
}

.box dl:last-child{
	margin-bottom:0;
}

.box dl dt, 
.box dl dd{   
    font-size: 0.875em;
}

.box dl dt{
	font-weight:400;
}

.box dl dd{
	font-weight:200;
	margin-bottom:0;
}

.results p{
    font-weight: 200;
    font-size: 0.875em;
}

.art{
    background-color:#f4f4f4;  
    margin-bottom: 30px;
}

@media screen and (max-width: 576px){

	.box dl dd,
	.box dl dt{
		display:inline-block
	}

}
@media print {
	#list {
		padding: 0px;
		margin: auto;
		width: 110%;
	}
	.results {
		width: 100%;
		margin: auto;
	}

	.results .card .box {

		border: 3px solid black;
		width: 100%;
		margin: auto;
		left: 0;
		right: 0;
	}

	#list .results .card .box .dt{
		display: inline;
	}
	#list .results .card .box .dd{
		display: inline;
	}

}
</style>