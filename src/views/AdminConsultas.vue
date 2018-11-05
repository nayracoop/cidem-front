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
						<b-button v-if="row.item.status !== 'archivado'" @click="row.toggleDetails" :class="{'btn-success':row.item.status === 'unread'}"> {{ row.detailsShowing ? 'Esconder' : 'Ver consulta'}} </b-button>
					</template>
					<template slot="name" slot-scope="row">
						<p :class="{unread: row.item.status === 'unread', archived: row.item.status === 'archivado'} " >{{row.item.name}} </p>
					</template>
					<template slot="institucion" slot-scope="row">
						<p :class="{unread: row.item.status === 'unread', archived: row.item.status === 'archivado'} " >{{row.item.institucion}} </p>
					</template>
					<template slot="row-details" slot-scope="row">
						<p> 11:34 26/10/1994 - &lt; {{row.item.email}} &gt; </p> 
						<p> {{row.item.message}} </p>	
					</template>
					<template slot="status" slot-scope="row">
						<b-badge :class="statusBadge(row.item.status)">{{row.item.status}}</b-badge>
					</template>
					<template slot="accion" slot-scope="row">
						<b-button v-if="row.item.status === 'unread'" 
						v-b-tooltip.hover title="Marcar como leida"  
						class="mb-1"
						@click="markRead(row.item.id)">
							<i class="fa fa-eye"></i>
						</b-button>
						<b-button v-if="row.item.status !== 'unread'"  
							v-b-tooltip.hover title="Marcar como no leida" class="mb-1"
							@click="markUnread(row.item.id)" >
							<i class="fa fa-eye-slash"></i>
						</b-button>
						<b-button v-if="row.item.status === 'read'" v-b-tooltip.hover title="Archivar" class="mb-1"
							@click="archive(row.item.id)">
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
			tableFields: [
				{key: 'id'},
				{key: 'toggle', label: '', class: 'toggleCol'},
				{key: 'fecha'},
				{key:'name', label: 'Nombre'},
				{key:'institucion'},
				{key: 'status', label: 'Estado'},
				{key: 'accion', class: 'actionCol'} 
			]
		}
	},
	computed: {
		messages() {
			return this.$store.state.messages;
		},
		tableItems(){
			var rowsArray = [];

			if (this.messages.length > 0){
         		 for (var i = 0; i < this.messages.length; i++){
					  var service = {
						  id: this.messages[i].id,
						  name: this.messages[i].name,
						  institucion: this.messages[i].institution,
						  email: this.messages[i].email,
						  message: this.messages[i].description,
						  status: this.messages[i].status,
						  _showDetails: false
					  }
					  rowsArray.push(service);

				}
			}

			return rowsArray;

		} 
				
			
		
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
		},
		markRead(id) {
			var newStatus = {
				id: id,
				status: 'read'
			}
			this.$store.dispatch('changeMessageStatus', newStatus);
		},
		markUnread(id){
			var newStatus = {
				id: id,
				status: 'unread'
			}
			this.$store.dispatch('changeMessageStatus',newStatus);
		},
		archive(id){
			var newStatus = {
				id: id,
				status: 'archivado'
			}
			this.$store.dispatch('changeMessageStatus',newStatus);
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
	.unread {
		font-weight: bold !important;
	}
	.archived {
		font-style:italic ;
	}
</style>