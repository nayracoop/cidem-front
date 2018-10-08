<template>
	<div class="container">
		<div class="row searcher">		
			<div class="col-sm-12 col-md-10 offset-md-1 d-lg-flex input-group"> <!-- buscador principal -->
				<div 
					class="input-group-prepend d-sm-none d-md-block"
					 v-for="type in filterTypes"
					 v-if="type.id !== 2">  
					<label for="Tipodeservicio"></label>
					<button 
						class="btn btn-outline-secondary rounded-0" 
						type="button" 
						data-toggle="dropdown">{{type.name}}<span class="filterarrow"><i class="fas fa-caret-down"></i></span></button>
					<ul class="dropdown-menu scrollable-menu" role="menu" aria-expanded="false">
						<li 
							v-for="filter in filterList"
							v-if="filter.filterType.id == type.id" >{{filter.name}}</li>
					</ul>
				</div>
				
				<input type="text" 
					class="form-control d-lg-block  rounded-0" 
					placeholder="Buscar por ubicación, área, palabras claves..." 
					aria-label="Recipient's username" 
					aria-describedby="button-addon2"
					v-model="searchInput"
		          	@keyup.enter="submitSearch">

				<div class="input-group-append">
					<button class="btn rounded searcherbtn d-lg-block  rounded-0" type="button"  @click="submitSearch">
					<i class="d block d-md-none fa fa-search lupa"></i><span class= "d-none d-md-block">Buscar</span></button>
				</div>	 
				
			</div>	
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
				searchInput: ''
			}
		},
		computed: {
			searchQuery: function(){
		      return this.$store.state.searchQuery;
		    },
			filterTypes(){
		      	return this.$store.state.filterTypes;
		    },
			filterList(){
      			return this.$store.state.filterList;
		    }
		},
		methods: {
		    submitSearch: function () {
		      this.$store.dispatch('changeQuerySearch', this.searchInput);
		      this.$store.dispatch('fetchServices');
		      router.push({ name: 'Results', query:{services: this.searchQuery}});     
		      //router.push({ name: "Results", query:{services: this.$store.state.searchQuery, filters: this.$store.getters.filterArray}});
		    },
		}
}
</script>
<style scoped>
.input-group input {
	background: #f4f4f4;
}
.input-group input::placeholder {
    font-size:0.8em;
}

.input-group-prepend{
	
}

.searcher{
    margin-top: 50px;
}

.searcherbtn{
    background-color: #000;
    color:#fff;
    text-transform: uppercase;
    font-weight: 700;

}

.searcherbtn:hover{
    background-color:#333333;
    color:#fff; 
    transition: 0.2s;   
}

.searcherbox{
    background-color: #f4f4f4; 
}

.filterarrow{
    margin-left:4px;
}

.scrollable-menu{
    max-height: 200px;
    overflow-x: hidden;
    max-width: 95%;
}

.scrollable-menu li:hover{
    background-color:#f1f1f1; 
}

.scrollable-menu li:active{
    background-color:#17aae4;
}


@media screen and (max-width:992px){
    .scrollable-menu{
        width: inherit;
    }

    .landerHiddenS{
        margin-top:18px;
    }
}

</style>