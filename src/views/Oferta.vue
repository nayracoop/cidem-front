<template>
	<main role="main">
		<div class="row">
			<h1 class="col-11 text-center">Oferta de soluciones y servicios tecnológicos</h1>
			<button class="col-1 d-print-none" @click="print()"> print </button>
		</div>
		<table class="table table-striped">
		  <thead>
		    <tr>
		      <th scope="col">#</th>
		      <th scope="col">Nombre</th>
		      <th scope="col">Tipo de servicio</th>
		      <th scope="col">Sector al que esta destinado</th>
		      <th scope="col">Destinatario</th>
		    </tr>
		  </thead>
		  <tbody>
		    <tr v-for="service in services">
		      <th scope="row">{{service.id}}</th>
		      <td @click="viewService(service.id)"><a>{{service.name}}</a></td>
		      <td>{{service.slug}}</td>
		      <td>{{service.summary}}</td>
		      <td>{{service.website}}</td>
		    </tr>
		  </tbody>
		</table>
	</main>
</template>

<script>
import router from '../router'

export default {
	name: "Oferta",
	created() {
		this.$store.dispatch('fetchServices');
	
	},
	computed: {
		services: function(){
        	return this.$store.state.services.data;
		},
	},
	methods:{
		viewService: function (id) {	
			router.push({ name: 'Service', query:{id: id}}); // no pude acceder a los query params desde /service?id=n
		},
		print: function() {
			window.print();
		}
	}
}
	
</script>

<style>
a:hover{
	cursor: pointer;
}
	
</style>