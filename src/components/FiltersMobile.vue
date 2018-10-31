<template>			
	<div class="col-12 d-block d-md-none">
		<button type="button" class="btn applybtn rounded-0" @click="show = true">Filtros</button>
		<div class="hiddenfilters" :class='{showFilters:show}'>
			<div class="Zbuttons align-items-center">	
				<span class="cruz"><button type="button" class="close" @click="show = false"><i class="fas fa-times cruz"></i></button></span>
				<span class="applybtn"<button type="button" class="applybtn btn rounded-0" @click="show = 	false">Aplicar</button>
			</div>
			<h2>Filtros</h2>
			<div class="filters" id='filtersid'>
				<dl v-for="type in filterTypes" :key="type.id">
					<dt class="filter-type collapsed" data-toggle="collapse" :data-target="'#'+type.id+'H'" >{{type.name}}</dt>
					<div :id="type.id+'H'" class="collapse" data-parent='#filtersid'>
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
		</div>
	</div>	
</template>

<script>
	export default {
		name: 'FiltersMobile',
		data () {
			return {
		    	show:false
		    }
		},
		components: {
		  	
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

.hiddenfilters{
    position: fixed;
    height:100%;
    width: 100%;
    background: #fff;
    z-index:1;
    top:0;
    left:0;
    transform:translatex(-2000px);
    transition:1s;
    overflow-y:scroll;
}

.hiddenfilters h2{
	text-align:center;
	padding-bottom:40px;
}

.showFilters{
	margin-left:0px;
	transition:0.5s;
	transform:translateX(0);
}

.Zbuttons{
	display:flex;
	justify-content:space-between;
	margin:0 40px;
	padding:40px 0;
}

.applybtn{
	background-color: #000;
    color:#fff;
    text-transform: uppercase;
    font-weight: 700;
    border:none;
}

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

.filters {
	margin-left:40px;
}

.filters .filter-type:after{
    font-family: 'FontAwesome';
    content: "\f0d7";
    margin: 20px;
}

.filters .collapsed:after{
    content: "\f0da";
}
</style>					