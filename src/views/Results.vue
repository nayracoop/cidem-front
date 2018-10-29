<template>
	<main role="main">
		<filters-selected class="col-10 offset-md-1"></filters-selected>
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

						<aside class="alertresults">Se encontraron {{metadata.total}} resultados para "{{searchQuery}}"</aside>

							<article v-if="printing === false" v-for="service in services" :key="service.id" class="card art">
								<div class="card-body box" >
									<h2 @click="viewService(service.id)"> {{ service.name }}</h2>
									<dl>
										<dt>Destinatarios:</dt>
										<dd>{{service.summary}}</dd>
									</dl>
									<dl>
										<dt>Tipo:</dt>
										<dd>{{service.summary}}</dd>
									</dl>
									<dl>
										<dt>Sector:</dt>
										<dd>{{service.summary}}</dd>
									</dl>
								</div>
							</article>
							<article v-if="printing === true" v-for="service in fullServices" :key="service.id" class="card art">
								<div class="card-body box ">
									<h2 @click="viewService(service.id)"> {{ service.name }}</h2>
									<dl>
										<dt>Destinatarios:</dt>
										<dd>{{service.summary}}</dd>
									</dl>
									<dl>
										<dt>Tipo:</dt>
										<dd>{{service.summary}}</dd>
									</dl>
									<dl>
										<dt>Sector:</dt>
										<dd>{{service.summary}}</dd>
									</dl>
									<dl>
										<dt>Teléfono</dt>
										<dd>4887-6783</dd>
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

import TheSidebar from '@/components/TheSidebar'

export default {
	beforeRouteEnter (to, from, next) {
		next();
	},
	name: 'Results',
	data () {
	    return {
			printing: false,
			render: true,
			loading: false
	    }
	}, 
	components: {
		TheSidebar,
		FiltersSelected
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
    margin: 10px 0;
    font-size:0.875em;
}

.results h2{
    font-weight: 700;
    font-size: 1.25em;
    color:#111111;
    transition: 0.1s;
}
.results h2:hover{
	color:#17aae4;
	cursor: pointer;
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