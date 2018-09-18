<template>
	<div class="d-block d-md-block selectedfilters">
		<dl v-for="filter in selected">
	        <dd>{{filter.id}} / {{filter.name}} <i @click="remove(filter.id)" class="fas fa-times cruz"></i></dd>
     	</dl>
	</div>	
</template>

<script>
	import { eventBus } from '@/main.js'

	export default {
	  name: 'FiltersSelected',
	  data () {
	  	return {
	  		selected: null
	  	}
	  },
	  created() {
	  	eventBus.$on('filtersChanged', (data) => {
	  		this.selected = data;
	  	})
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
			eventBus.changeFilters(this.selected);

	  	}
	  }
	}
</script>

<style scoped>
.selectedfilters dl {
	display: flex;
}
.selectedfilters dl dt,
.selectedfilters dl dd{
    display: inline;
}
.selectedfilters dl dt{
font-weight: 200;
font-size:1.125em;

}
.selectedfilters dl dd{
    margin-left: 5px;
    border-radius: 25px;
    padding: 0.3em 0.4em;
    background-color:#17aae4;
    color:#fff;
    font-family:'Distefano-Slab';
    font-weight: 400;
    font-size:1.125em;
    text-transform: uppercase;
}

.selectedfilters i{
    margin-left: 5px;
    font-size: 0.75em;
    vertical-align: super;
}

</style>