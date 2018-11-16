<template>
	<div class="col-12 col-md-4">
		<aside>			    
			<div class="d-none d-md-block filters" id='filters'>
				<dl v-for="type in filterTypes" :key="type.id">
					<dt class="filter-type collapsed" data-toggle="collapse" :data-target="'#'+type.id" >{{type.name}}</dt>
					<div :id="type.id" class="collapse" data-parent='#filters'>
						<dd 
							v-for="filter in filterList"
							v-if="filter.filterType.id == type.id" 
							:key="filter.id"
							@click="filterclick(filter)"
							class="filter-item"
							:class="{highlight:selected.includes(filter.id)}">{{filter.name}}</dd>
					</div>
				</dl>
			</div>	
		</aside>    						  
	</div>
</template>

<script>
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

.filter-type{
	font-size:1.125em;
	font-weight:500;
}

.filter-item {
	font-weight: 200;
	font-size: 0.95em;
	padding: 3px 10px;
	margin: auto ;
}

.filters .filter-type:after{
    font-family: 'FontAwesome';
    content: "\f0d7";
    margin: 20px;
}

.filters .collapsed:after{
    content: "\f0da";
}

.filters dl dd{
	margin:5px auto;
}

</style>