<template>
	<div class="col-12 col-md-4">
				<aside>
					<div class="d-block d-md-none">
				    	<button type="button" data-toggle="modal" data-target="#modalwindow">Filtros</button>
					</div>				    
					<div class="d-none d-md-block filters" >
					    <dl v-for="type in filterTypes">
					    	<dt class="filter-type">{{type.name}}</dt>
					        <dd 
					        	v-for="filter in filterList"
					        	v-if="filter.filterType.id == type.id" 
					        	@click="filterclick(filter)"
					        	class="filter-item">{{filter.name}}</dd>
					    </dl>
					</div>
				</aside>    						  
			</div>
</template>

<script>
	import axios from 'axios'
	import router from '../router'
  	import FiltersSelected from '@/components/FiltersSelected'

	export default {
		name: 'TheSidebar',
		data () {
			return {
		    }
		},
		components: {
		  	FiltersSelected
		},
		created() {
		 
		},
		computed: {
		  	searchQuery() {
		        return this.$store.state.searchQuery;
		    },
		    selected() {
		        return this.$store.state.searchQueryFilters;
		    },
		    filterList(){
      			return this.$store.state.filterList;
		    },
		    filterTypes(){
		      	return this.$store.state.filterTypes;
		    },
		},
		methods: {
		  	filterclick: function(filter) {
		  	 	var result = this.selected.some(function (el){
		  	 		return el.id === filter.id;
		  	 	});
		  	 	
		  	 	if (!result) {
		  	 		this.selected.push(filter);
	      			this.$store.dispatch('changeQueryFilters', this.selected); 
		  	 	}
		  	 	this.$store.dispatch('fetchServices');
		  	 	router.push({ name: 'Results', query:{services: this.$store.state.searchQuery, filters: this.$store.getters.filterArray}});     


	    	},
		}
	}
</script>

<style>
.filter-type {

	
}
.filter-item {
	font-weight: 200;
	font-size: 0.9em;
	padding: 3px 10px;
	margin: auto ;
}

</style>