<template>
	<div class="selectedfilters">
		<dl v-show="searchQuery" id="search">
     		<dd>{{searchQuery}} <i @click="removeQuery" class="fas fa-times cruz"></i></dd>
     	</dl>
		<dl v-for="filter in selected">
	        <dd alt="filter.name"> {{filter.slug}} <i @click="remove(filter.id)" class="fas fa-times cruz"></i></dd>
     	</dl>
     	
	</div>	
</template>

<script>
import router from '../router'


	export default {
	  name: 'FiltersSelected',
	  data () {
	  	return {
	  		
	  	}
	  },
	  created() {
	  	
	  },
	  computed: {
  		searchQuery() {
	        //if (this.$store.state.searchQuery) {
	        	return this.$store.state.searchQuery;
	    	//} else {
	    	//	return null;
	    	//}
	    },
		filterList(){
  			return this.$store.state.filterList;
	    },
	    selected() {
	        return this.$store.state.searchQueryFilters; //devuelve ID y name
	    },
	    querySelected() {
	    	return  this.$route.query.filters; //devuelve solo ID
	    }
	  },
	  methods: {
	  	remove(id){
	  		var end = 0;
	  		var listToDelete = [id];
			for (var i = 0; i < this.selected.length; i++) {
			    var obj = this.selected[i];

			    if (listToDelete.indexOf(obj.id) === -1) {
			        this.selected[end++] = obj;
			    }
			}
			this.selected.splice(end);
			this.$store.dispatch('changeQueryFilters', this.selected);
			this.$store.dispatch('fetchServices');
			router.push({ name: 'Results', query:{services: this.$store.state.searchQuery, filters: this.$store.getters.filterArray}}); 
	  	},
	  	removeQuery(){
	  		this.searchQuery= " ";
	  		this.$store.dispatch('changeQuerySearch', null);
	  		this.$store.dispatch('fetchServices');
	  		router.push({ name: 'Results', query:{services: this.$store.state.searchQuery, filters: this.$store.getters.filterArray}}); 

	  	}
	  }
	}
</script>

<style scoped>
#search dd{
	font-style: italic; 
	background-color: #000000;
}
.selectedfilters{
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-content: flex-start;
}
.selectedfilters dl{
	margin: 5px 5px;
	transition: all 300ms;
}

/*
.selectedfilters dl dt{
	display: inline;
	font-weight: 200;
	font-size:1.125em;
}*/
.selectedfilters dl dd{
    margin-left: 5px;

    padding: 0.3em 0.4em;
    background-color:#17aae4;
    color:#fff;
    font-family:'Distefano-Slab';
    font-weight: 400;
    font-size:0.9em;
    text-transform: uppercase;
}

.selectedfilters i{
    margin-left: 5px;
    font-size: 0.75em;
    vertical-align: super;
}

.cruz {
	float: right;
	margin-top: 7px;
}

</style>