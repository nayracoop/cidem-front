<template>			
	<div class="col-12 d-block d-md-none">
		<b-row>
			<button type="button" class="col-12 text-left btn rounded-0 filterbtn" @click="show = true"><i class="fas fa-sliders-h"></i> Filtros</button>
		</b-row>
		<div class="hiddenfilters" :class='{showFilters:show}'>
			<div class="Zbuttons align-items-center">	
				<h2 class="mt-2">Filtros</h2>
			</div>
			<filters-selected class="filters-select mb-2"></filters-selected>
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
							:class="{highlight:selected.includes(filter.id)}">
							<span>
								<i class="far fa-check-square" v-if="selected.includes(filter.id)"></i>
								<i class="far fa-square" v-if="!selected.includes(filter.id)"></i>		
							</span>
							{{filter.name}}
						</dd>
					</div>
				</dl>
			</div>	
		</div>
		<div class="hiddenbtn" :class='{showbtn:show}'>
			<button type="button" class="applybtn btn rounded-0" @click="show =	false">Aplicar</button>
		</div>
	</div>	
</template>

<script>
	import FiltersSelected from '@/components/FiltersSelected'
	export default {
		name: 'FiltersMobile',
		data () {
			return {
				show:false,
				prevFilters :  this.$store.state.searchQueryFilters,
		    }
		},
	
		components: {
		  	FiltersSelected
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
			},
			services: function(){
				return this.$store.state.services.data;
			},    	
			metadata:  function(){
				return this.$store.state.services.meta;
			},

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
		  	 	this.$router.push({ name: 'Results', query:{services: this.$store.state.searchQuery, filters: this.$store.getters.filterArray}});     

			},
		}
}		
</script>
<style scoped>

.filterbtn{
	background-color:#fff;
	font-weight: 700;
	font-size:1.5em;
	margin:0.5em auto;
}

.hiddenfilters{
    position: fixed;
    height:100%;
    width: 100%;
    background: #fff;
    z-index:1;
    top:0;
    left:0;
    transform:translateX(-2000px);
    transition:1s;
    overflow-y:scroll;
}

.hiddenfilters h2{
	text-align:center;
	text-decoration:underline;
	font-weight:700;
}

.showFilters{
	transition:0.5s;
	transform:translateX(0);
}

.filters-select{
	margin:0 33px;
}

.Zbuttons{
	padding:1em 0;
}

.hiddenbtn{
	position: fixed;
    z-index:1;
	left:0;   
    bottom:0;
    transform:translatex(-2000px);
    transition:1s;
}

.showbtn{
	transform:translatex(0px);
	transition:0.5s;
	width:100%;
}

.applybtn{
	background-color: #000;
    color:#fff;
    text-transform: uppercase;
    font-weight: 700;
    border:none; 
    width:100%;
}

.selected{
	font-weight: 600;
}
.highlight{
	font-weight: bold !important;
}

.filter-type{
	font-size:1.25em;
	font-weight:500;
}

.filter-item {
	font-weight: 200;
	font-size: 1em;
	padding: 3px 10px;
	margin: 20px auto;
}

.filter-item:first-child{
	margin:0 auto;
}

.filter-item i{
	font-size:12px;
}

.filters .filter-type:after{
    font-family: 'FontAwesome';
    content: "\f0d7";
    float:right;
}

.filters .collapsed:after{
    content: "\f0da";
}

#filtersid {
	padding:0 40px;
}

#filtersid dt{
	width: 100%;
	margin: auto;
	padding-bottom:1.25em;
}

#filtersid dd{
	padding:0;
	line-height:1.25;
}
</style>					