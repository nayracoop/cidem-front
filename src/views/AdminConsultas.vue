<template>
	<div>
		<b-card>
			<template class="row " slot="header">
				<header class="d-flex justify-space-around">
				<h1 class="col-4"> Consultas </h1>
				<p class="mt-2 float-right" > 5 consultas nuevas </p>
				</header>
			</template>
			<b-card-body>	
			
				<b-table class="mb-0 col-12" 
						responsive="sm" hover 
						:items="tableItems" outlined
						:fields="tableFields" 
						head-variant="light">
					<template slot="toggle" slot-scope="row">
						<b-button @click="row.toggleDetails"> {{ row.detailsShowing ? 'Esconder' : 'Ver consulta'}} </b-button>
					</template>
					<template slot="row-details" slot-scope="row">
						<p> 11:34 26/10/1994 - &lt; {{row.item.email}} &gt; </p> 
						<p> {{row.item.message}} </p>	
					</template>
					<template slot="status" slot-scope="row">
						<b-badge :class="statusBadge(row.item.status)">{{row.item.status}}</b-badge>
					</template>
					<template slot="accion" slot-scope="row">
						<b-button v-if="row.item.status === 'no leida'" v-b-tooltip.hover title="Marcar como leida"  class="mb-1">
							<i class="fa fa-eye"></i>
						</b-button>
						<b-button v-if="row.item.status === 'leida'"  v-b-tooltip.hover title="Marcar como no leida" class="mb-1" >
							<i class="fa fa-eye-slash"></i>
						</b-button>
						<b-button v-if="row.item.status === 'leida'" v-b-tooltip.hover title="Marcar como contestada" class="mb-1">
							<i  class="fa fa-check"></i>
						</b-button>
						<b-button v-if="row.item.status === 'contestada'" v-b-tooltip.hover title="Archivar" class="mb-1">
							<i  class="fa fa-archive"></i>
						</b-button>
					</template>					
				</b-table>			
			</b-card-body>
		</b-card>
		
	</div>
</template>

<script>
export default {
	name: 'AdminConsultas',
	data(){
		return {
			tableItems: [
				{name:'martina', institucion:'agba', message:'hola queria saber', email: 'martu@gmail.com', fecha:'10/11/18', status:'no leida', _showDetails: false},
				{name:'pedrito', institucion:'cidem', message:'buenas tardes , lorem ipsum ', email: 'pedrito@gmail.com', fecha:'10/11/18', status:'leida', _showDetails: false},
				{name:'tito', institucion:'untref', message:'lkdhsa fhja shsj palabras prreguntas espuestas blah bah sis sis ahufma dhasudwm ', email: 'tito@gmail.com', fecha:'10/11/18', status:'contestada', _showDetails: false}
			],
			tableFields: [
				{key: 'toggle', label: '', class: 'toggleCol'},
				{key: 'fecha'},
				{key:'name'},
				{key:'institucion'},
				{key: 'status'},
				{key: 'accion', class: 'actionCol'} 
			]
		}
	},
	computed: {
		consultas() {
			return this.$store.state.consultas;
		},
		
	}, 
	methods: {
		statusBadge(status){
			if (status === 'no leida'){
				return 'badge-danger'
			} else if (status === 'leida'){
				return 'badge-warning'
			} else if (status === 'contestada'){
				return 'badge-success'
			}  
		}
	}
}
</script>

<style>
	.toggleCol {
		width: 50px ;
	}
	.actionCol {
		width: 120px !important;
	}
</style>