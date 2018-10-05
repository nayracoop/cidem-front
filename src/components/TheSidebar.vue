<template>
	<div class="col-12 col-md-4">
				<aside>
					<div class="titlefilters2 d-block d-md-none">
				    	<button type="button" data-toggle="modal" data-target="#modalwindow">Filtros</button>
					</div>
				    <filters-selected></filters-selected>
					<div class="d-none d-md-block filters" id="filtersid" >
					    <dl v-for="type in filterTypes">
					    	<dt>{{type.name}}</dt>
					        <dd 
					        	v-for="filter in filterList"
					        	v-if="filter.filter_type_id == type.id"
					        	@click="filterclick(filter)">{{filter.name}}</dd>
					    </dl>
					</div>
				</aside>    						  
			</div>
</template>

<script>
	import axios from 'axios'
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
		  	filtersAvailable() {
	        	return this.$store.state.filtersAvailable;
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

	    	},
		}
	}
</script>

<style>

</style>