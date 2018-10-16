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
					        	class="filter-item"
					       		:class="{highlight:selected.includes(filter.id)}">{{filter.name}}</dd>
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
		    searchQueryFilters() {
		        return this.$store.state.searchQueryFilters;
		    },
		    filterList(){
      			return this.$store.state.filterList;
		    },
		    filterTypes(){
		      	return this.$store.state.filterTypes;
		    },
		    selected(){
		    	return this.$store.getters.filterArray; 
		    }
		},
		methods: {
		  	filterclick: function(filter) {
		  	 	var result = this.searchQueryFilters.some(function (el){
		  	 		return el.id === filter.id;
		  	 	});
		  	 

		  	 	
		  	 	if (!result) {
		  	 		this.searchQueryFilters.push(filter);
	      			this.$store.dispatch('changeQueryFilters', this.searchQueryFilters); 
		  	 	}else if (result){

		  	 		var end = 0;
			  		var listToDelete = [filter.id];
					for (var i = 0; i < this.searchQueryFilters.length; i++) {
					    var obj = this.searchQueryFilters[i];

					    if (listToDelete.indexOf(obj.id) === -1) {
					        this.searchQueryFilters[end++] = obj;
					    }
					}
					this.searchQueryFilters.splice(end);
		  	 		this.$store.dispatch('changeQueryFilters', this.searchQueryFilters); 

		  	 	}
		  	 	this.$store.dispatch('fetchServices');
		  	 	router.push({ name: 'Results', query:{services: this.$store.state.searchQuery, filters: this.$store.getters.filterArray}});     


	    	},
		}
	}
</script>

<style scoped>
.selected {
	font-weight: 600;
}
.highlight{
	font-weight: bold !important;
}
.filter-item {
	font-weight: 200;
	font-size: 0.9em;
	padding: 3px 10px;
	margin: auto ;
}

</style>