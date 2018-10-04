<template>
	<main role="main">
		<div class="row listado">
			<p> {{id}}</p>
			<h2>{{ service.name }}</h2>
			<p>{{service.description}}</p>
			<ul v-for="id in serviceIdArray" @click="getServiceById(id)"> {{id}} </ul>
		</div>
	</main>
</template>

<script>
import router from '../router'

export default {
	name: 'Service',
	data () {
	    return {
	    	
	    }
	}, 
	mounted: function mounted(){
		this.getServiceById(this.id);
	},
	created() {

	},
	computed: {
		service() {
			return this.$store.state.service.data;
		},
		services(){
        	return this.$store.state.services.data;
		},
		id(){
			return this.$route.query.id;
		},
		serviceIdArray(){
			return this.$store.getters.serviceIdArray;
		}
	},
	methods: {
		getServiceById: function (id) {
	      this.$store.dispatch('getServiceById', id);
	      router.push({ name: 'Service', query:{id: id}});
	    }
	},
	
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>