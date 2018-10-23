<template>
	<div class="d-lg-flex input-group"> <!-- buscador principal -->
		<div 
		class="input-group-prepend d-none d-sm-none d-md-block"
		 v-for="type in filterTypes"
		 v-if="type.id !== 2">  
			<button 
				class="btn dropwdown-btn btn-outline-secondary rounded-0" 
				type="button" 
				data-toggle="dropdown">{{type.name}}<span class="filterarrow"><i class="fas fa-caret-down"></i></span></button>
			<ul class="dropdown-menu dropdown-menu-center scrollable-menu" role="menu" aria-expanded="false">
				<li  
					v-for="filter in filterList"
					v-if="filter.filterType.id == type.id" 
					:class="{highlight:selected.includes(filter.id)}"
					@click="filterclick(filter, $event)">{{filter.name}}</li>
			</ul>
		</div>
		
		<input type="text" 
			class="form-control d-lg-block rounded-0 searcherbox" 
			:placeholder="placeholder" 
			aria-label="Recipient's username" 
			aria-describedby="button-addon2"
			v-model="searchInput"
          	@keyup.enter="submitSearch">

		<div class="input-group-append" v-if="this.$route.name !== 'Lander'">
			<button class="btn rounded searcherbtn rounded-0" type="button"  @click="submitSearch">
			<i class="d block d-md-none fa fa-search lupa"></i><span class="d-none d-md-block">Buscar</span></button>
		</div>
		<div class="d-none d-lg-block input-group-append" v-if="this.$route.name == 'Lander'">
			<button class="btn rounded searcherbtn rounded-0" type="button"  @click="submitSearch">
			<i class="d block d-md-none fa fa-search lupa"></i><span class="d-none d-md-block">Buscar</span></button>
		</div>
		<div class="d-block d-lg-none input-group btnalone" v-if="this.$route.name == 'Lander'">
			<button class="btn rounded d-lg-block rounded-0 searcherbtn" type="button"  @click="submitSearch">
			Buscar</button>
		</div>	 		 	
	</div>	
		
</template>

<script>
	import store from '../store'
	import router from '../router'

	export default{
		name: 'SearchBar',
		data:function(){
			return{
				searchInput: '',
				window: {
					width: 0,
					height: 0
				}
			}
		},
		created(){
			window.addEventListener('resize', this.handleResize);
   			this.handleResize();
		},
		destroyed() {
			window.removeEventListener('resize', this.handleResize);
		},
		computed: {
			searchQuery: function(){
		      return this.$store.state.searchQuery;
		    },
		    searchQueryFilters() {
		        return this.$store.state.searchQueryFilters;
		    },
			filterTypes(){
		      	return this.$store.state.filterTypes;
		    },
			filterList(){
      			return this.$store.state.filterList;
		    },
		    selected(){
		    	return this.$store.getters.filterArray;
			},
			placeholder(){
				if (this.window.width >= 768 ) {
					return 'Buscar por ubicación, área, palabras clave...'
				} else {
					return 'Buscar'
				}
			}
		},
		methods: {
		    submitSearch: function () {
		      	this.$store.dispatch('changeQuerySearch', this.searchInput);
		      	this.$store.dispatch('fetchServices');
		  	 	router.push({ name: 'Results', query:{services: this.$store.state.searchQuery, filters: this.$store.getters.filterArray}});   
		    },
		    filterclick: function(filter, e){
		    	var selected = this.searchQueryFilters;
		    	var result = this.searchQueryFilters.some(function (el){
		  	 		return el.id === filter.id;
		  	 	});
		  	 	
		  	 	if (!result) {
		  	 		selected.push(filter);
		  	 	} else if (result){
		  	 		var end = 0;
			  		var listToDelete = [filter.id];
					for (var i = 0; i < selected.length; i++) {
					    var obj = selected[i];

					    if (listToDelete.indexOf(obj.id) === -1) {
					        selected[end++] = obj;
					    }
					}
				selected.splice(end);
			  	}
				e.stopPropagation();
				this.$store.dispatch('changeQueryFilters', selected);     

			},
			handleResize() {
				this.window.width = window.innerWidth;
				this.window.height = window.innerHeight;
			}
		}
}
// CAMBIA EL PLACEHOLDER
// var media = "screen and (min-width: 576px)",
//     placeholderShort = "Buscar",
//     placeholderLong = "Buscar por ubicación, área, palabras clave...";
// $(window).resize(function(){    
//     if(window.matchMedia(media).matches) {
//       $('.form-control').attr('placeholder', placeholderLong); 
//     }
//     else {
//       $('.form-control').attr('placeholder', placeholderShort); 
//     }
// });
</script>
<style scoped>

.input-group input {
	background: #f4f4f4;
}

.searcherbtn{
    background-color: #000;
    color:#fff;
    text-transform: uppercase;
    font-weight: 700;
	z-index:0;
}

.btnalone{
	text-align: center;
	margin-top: 30px;
}

.searcherbtn:hover{
    color:#fff; 
    transition: 0.2s;   
}

.form-control{
    overflow:hidden;
    text-overflow:ellipsis;
    display:inline-block;
}

.filterarrow{
    margin-left:4px;
}

.scrollable-menu{
    max-height: 200px;
    overflow-x: hidden;
    max-width: 50%;
}

.scrollable-menu li:hover{
    background-color:#63fbf4;
}

.scrollable-menu li:active{
    background-color:#43dbf4;
}



.highlight {
    background-color:#23cbf4;
}

@media screen and (max-width:576px){
	.form-control{
		font-size:0.9em;
	}
}


</style>