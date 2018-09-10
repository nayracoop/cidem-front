<template>
	<div class="selectedfilters">
		<dl v-for="servicio in servicios">
	        <dd>{{servicio.id}} / {{servicio.name}} <i class="fas fa-times cruz"></i></dd>
     	</dl>
	</div>	
</template>

<script>
	import { eventBus } from '@/main.js'

	export default {
	  name: 'FiltersSelected',
	  data () {
	  	return {
	  		servicios: null
	  	}
	  },
	  created() {
	  	eventBus.$on('serviciosConsultados', (data) => {
	  		this.servicios = data;
	  	})
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