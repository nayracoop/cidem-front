<template>
	<div class="col-12 col-md-4">
				<aside>
					<div class="titlefilters2 d-block d-md-none">
				    	<button type="button" data-toggle="modal" data-target="#modalwindow">Filtros</button>
					</div>
				    <filters-selected></filters-selected>
					<div class="d-none d-md-block filters" id="filtersid" >
					    <dl v-for="filterType in filtersAvailable">
					    	<dt>{{filterType.type}}</dt>
					        <dd 
					        	v-for="filter in filterType.filters"
					        	@click="filterclick(filter.id,filter.name)"><span>{{filter.id}} </span>{{filter.name}}</dd>
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
	   		filtersSelected() {
		        return this.$store.state.searchQueryFilters;
		    },
		    selected() {
		        return this.$store.state.searchQueryFilters;
		    }
		},
		methods: {
		  	filterclick: function(id,name) {
		  	 	var filter = {id:id, name:name};
		  	 	var result = this.selected.some(function (el){
		  	 		return el.id === id;
		  	 	});
		  	 	
		  	 	if (!result) {
		  	 		this.selected.push(filter);
	      			this.$store.dispatch('changeQueryFilters', this.selected); 
		  	 	}
	    	},
		  }
	}
</script>

<style>

</style>