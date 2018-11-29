<template>
	<div class="selectedfilters">
		<dl v-show="searchQuery" id="search"  v-if="searchQuery !== ' '">
     		<dd>{{searchQuery}} <i @click="removeQuery" class="fas fa-times-circle"></i></dd>
     	</dl>
		<dl v-for="filter in selected" :key="filter.id">
	        <dd alt="filter.name"> {{filter.tag}} <i @click="remove(filter.id)" class="fas fa-times-circle"></i></dd>
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
	        return this.$store.state.searchQueryFilters; //
	    },
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
			
			if (this.$router.history.current.name !== 'Lander'){
				this.$router.push({ name: 'Results', query:{services: this.$store.state.searchQuery, filters: this.$store.getters.filterArray}}); 
			};
	  	},
	  	removeQuery(){
	  		this.searchQuery= " ";
	  		this.$store.dispatch('changeQuerySearch', null);
			this.$store.dispatch('fetchServices');
			if (this.$router.history.current.name !== 'Lander'){
				this.$router.push({ name: 'Results', query:{services: this.$store.state.searchQuery, filters: this.$store.getters.filterArray}}); 
			}
	  	}
	  }
	}
</script>

<style scoped>

.selectedfilters{
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-content: flex-start;
	min-height:3em;
	margin-top:0.25em;
}
.selectedfilters dl{
	margin: 2px 2px;
	transition: all 300ms;
}

.selectedfilters dl dd{
    margin: 2.5px;
    padding: 0.25em 10px;
    border-radius:16px;
  	background-color:#17aae4;
    font-weight: 400;
    font-size:0.95em;
    color:#fff;
}

.selectedfilters i{
    margin-left:10px;
    vertical-align:middle;
    font-size:0.7em;
    cursor:pointer;
}


</style>