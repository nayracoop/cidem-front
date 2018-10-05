<template>
	<main role="main">
		<div v-if="service" class="row listado">
			<p> {{id}}</p>
			<h2>{{ service.name }}</h2>
			<p>{{service.description}}</p>
			<ul v-for="id in serviceIdArray" @click="getServiceById(id)"> {{id}} </ul>
		</div>
	</main>
</template>

<script>
import router from '../router';
import store from '../store'

//import store from '@/store'

export default {
	name: 'Service',
	data () {
	    return {
	    	
	    }
	}, 
	beforeRouteEnter (to, from, next) {
		console.log(to);
		
		next();
	},
	befoteRouteUpdate(to, from, next){
		this.$store.dispatch('fetchService', to.$route.query.id);
	},
	mounted: function mounted(){
		//this.$store.dispatch('getServiceById', this.$route.query.id);	
	
	},
	created() {
		this.$store.dispatch('fetchService', this.$route.query.id);	
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
	      //this.$store.dispatch('getServiceById', id);
	      router.push({ name: 'Service', query:{id: id}});
	      this.$store.dispatch('fetchService', id);
	    }
	},
	
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>