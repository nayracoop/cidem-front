	<template>
	<div>
		<div v-for="type in filterTypes" 
			v-if="filterCondition(type.id)" 
			class="row landerHiddenF"
			:key="type.id">
			<div class="col-sm-12 col-md-10 offset-md-1">
				<label for="tipo"></label>
				<button class="btn rounded-0 btn-outline-secondary btn-block" 
						type="button" 
						data-toggle="dropdown">{{type.name}}
						<span class="Filterarrow">
							<i class="fas fa-caret-down"></i>
						</span>
				</button>
				<ul class="dropdown-menu scrollable-menu" role="menu" aria-expanded="false">
					<li v-for="filter in filterList"
						:key="filter.id"
						v-if="filter.filterType.id === type.id"
						:class="{highlight:selected.includes(filter.id)}"
						@click="filterclick(filter, $event)">{{filter.name}} </li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<script>
	import store from '../store'
	import router from '../router'

	export default{
		name: "Dropdown",
		data:function(){
			return{
				searchInput: '',
			}
		}, 
		computed: {
			searchQuery(){
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
		}, 
		methods: {
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
			filterCondition(type){
				if (type === 2 || type === 5) {
					return false;
				} else {
					return true;
				}
			}
		}
}
</script>
<style>

.landerHiddenF:firstchild{
	margin-top:1em;
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

.landerHiddenF button{
    display:flex;
    justify-content: space-between;
    border-color:#ced4da;
}

label{
	display:inline;
}

.scrollable-menu{
    max-height: 200px;
    overflow-x: hidden;
    max-width: 93%;
}

.scrollable-menu li{
    line-height:1em;
    padding:1em 15px;
    border-bottom:solid 1px #eaeaea;
    cursor:pointer;
}

.scrollable-menu li:hover{
    background-color:#f1f1f1; 
}

.scrollable-menu{
    width: inherit;
}


.highlight {
    font-weight: bold !important;
}

</style>