<template>
	
</template>

<script>
import router from '../router'

export default {
	name: "Oferta",
	mounted: {
		this.$store.dispatch('fetchServices');
	},
	computed: {
		services: function(){
        	return this.$store.state.services.data;
		},
	}
}
	
</script>

<style>
	
</style>