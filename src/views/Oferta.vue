<template>
	<main role="main">
		<div class="row">
			<div class="col-6 mainback">
				<button @click="goBack"><i class="fas fa-caret-left"></i> volver </button>
			</div>
			<div class="col-6">	
				<span class="printbtn d-none d-md-block"><button @click="print()"><i class="fas fa-print"></i></button></span>
			</div>	
		</div>
		<div class="row">
			<h1 class="col-12 text-center">Oferta de soluciones y servicios tecnológicos</h1>
		</div>
		<div class="row">
			<div class="col-12">		
				<table class="table table-striped table-responsive">
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
				    <tr v-for="service in services" :key="service.id">
				      <th scope="row">{{service.id}}</th>
				      <td class="w-25" @click="viewService(service.id)"><strong><a>{{service.name}}</a></strong></td>
							<td><span v-for="filter in service.filters" :key="filter.id" v-if="filter.filterType.id == 3">{{filter.name}} </span></td>
				      <td><span v-for="filter in service.filters" :key="filter.id" v-if="filter.filterType.id == 4">{{filter.name}} </span></td>
				      <td><span v-for="filter in service.filters" :key="filter.id" v-if="filter.filterType.id == 5">{{filter.name}} </span></td>
				    </tr>
				  </tbody>
				</table>
			</div>
		</div>		
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
		},
		goBack: function(){
			router.go(-1)
			}
	}
}
	
</script>

<style scoped>
a:hover{
	cursor: pointer;
}

.printbtn{
	text-align:right;
}

.printbtn button{
	cursor:pointer;
	background:#fff;
	border:none;
	border-bottom:solid #17aae4;
}

.mainback{
	padding-bottom:20px;
}

.mainback button{
    border:none;
    background-color:#ffffff;
    color:#000;
    font-size:1.125em;
    text-transform:uppercase;
    cursor:pointer;
}

main{
	margin: 20px auto;
}

table{
	margin-top:20px;
}
	
</style>