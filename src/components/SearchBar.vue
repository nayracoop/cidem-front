<template>
	<div class="input-group"> <!-- buscador principal -->
		<div 
		class="input-group-prepend d-none d-md-block"
		 v-for="type in filterTypes"
		 v-if="filterCondition(type.id)"
		 :key="type.id">  
			<button 
				class="btn dropwdown-btn btn-outline-secondary rounded-0" 
				type="button" 
				data-toggle="dropdown">{{type.name}}<span class="filterarrow"><i class="fas fa-caret-down"></i></span></button>
			<ul class="dropdown-menu dropdown-menu-center scrollable-menu" role="menu" aria-expanded="false">
				<li  
					:key="filter.id"
					v-for="filter in filterList"
					v-if="filter.filterType.id == type.id" 
					:class="{highlight:selected.includes(filter.id)}"
					@click="filterclick(filter, $event)">
					<i class="fa fa-check" v-if="selected.includes(filter.id)"></i>
					{{filter.name}}
				</li>
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
			<button class="btn searcherbtn rounded-0" type="button"  @click="submitSearch">
			<i class="d-none d-sm-block d-lg-none fa fa-search lupa"></i><span class="d-block d-sm-none d-lg-block">Buscar</span></button>
		</div>
		<div class="d-none d-md-block input-group-append" v-if="this.$route.name == 'Lander'">
			<button class="btn searcherbtn rounded-0" type="button"  @click="submitSearch">
			<i class="d-block d-md-none fa fa-search lupa"></i><span class="d-none d-md-block">Buscar</span></button>
		</div>
		<div class="d-block d-md-none input-group btnalone" v-if="this.$route.name == 'Lander'">
			<button class="btn d-lg-block searcherbtn rounded-0 btn-block" type="button"  @click="submitSearch">
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
			},
		
		},
		methods: {
		    submitSearch: function () {
				var searchChar = this.searchInput.split("");
				var validation = searchChar.find(function(element) {
					return element != " ";
				});
				if (validation != undefined) {
					this.$store.dispatch('changeQuerySearch', this.searchInput);
					this.$store.dispatch('fetchServices');
					router.push({ name: 'Results', query:{services: this.$store.state.searchQuery, filters: this.$store.getters.filterArray}});   
				} else {
					this.$store.dispatch('changeQuerySearch', null);
					this.$store.dispatch('fetchServices');
					router.push({ name: 'Results', query:{filters: this.$store.getters.filterArray}});  
				}  
		      
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
			},
			filterCondition(type){
				if (type === 2 || type === 5) {
					return false;
				} else {
					return true;
				}
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
	font-weight:300;
}

.input-group-prepend button{
	font-weight:300;
	border-color:#ced4da;
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

.scrollable-menu li{
    line-height:1em;
    padding:0.5em 15px;
    border-bottom:solid 1px #eaeaea;
}

.scrollable-menu li:hover{
    background-color:#f4f4f4;
}

@media screen and (max-width: 767px){
  
  .searcherbox{
    font-size:1rem;
    font-weight:500;
    height:auto;
    padding:0.375rem 0.75rem;
   }

	.input-group input {
		font-weight:500;
	}
}
</style>