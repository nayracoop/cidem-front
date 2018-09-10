<template>
	<div class="selectedfilters">
		<dl v-for="filter in filters">
			<dd>{{filter}}<i class="fas fa-times cruz"></i></dd>
		</dl>	
	</div>	
</template>

<script>
	export default {
	  name: 'FiltersSelected',
	  props: {
	  	filters: {
	  		type: Array,
	  		required: true
	  	}
	  }
	}
</script>

<style scoped>
	
</style>