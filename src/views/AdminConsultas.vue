<template>
	<div>
		<b-card >
			<template class="row " slot="header">
				<header class="d-flex justify-space-around">
				<h1 class="col-4"> Consultas </h1>
				<p class="mt-2 float-right" > {{newMessages.length}} consulta<span v-if="newMessages.length != 1">s</span> no leída<span v-if="newMessages.length != 1">s</span> </p>
				</header>
			</template>
			<b-card-body>	
				<template slot="table-header">
					<h1> holi </h1>
				</template>
				<b-table class="mb-0 col-12" 
						responsive="md" hover
						:items="tableItems" outlined
						:fields="tableFields" 
						head-variant="light">
					<template slot="name" slot-scope="row">
						<p :class="{unread: row.item.status === 'unread', archived: row.item.status === 'archivado'} " >{{row.item.name}} </p>
					</template>
					<template slot="institucion" slot-scope="row">
						<p :class="{unread: row.item.status === 'unread', archived: row.item.status === 'archivado'} " >{{row.item.institucion}} </p>
					</template>
					<template slot="row-details" slot-scope="row">
						<b-card class="mx-5">
							<p>  {{row.item.fecha}} - &lt; {{row.item.email}} &gt; </p> 
							<p> {{row.item.message}} </p>	
						</b-card>
					</template>
					<template slot="status" slot-scope="row">
						<b-badge :class="statusBadge(row.item.status)">
							<span v-if="row.item.status === 'unread' "><i class="fa fa-check"  ></i>No leída</span>  
							<span v-if="row.item.status === 'read' "><i class="fa fa-check"></i>Leída</span>
						</b-badge>
					</template>
					<template slot="accion" slot-scope="row">
						
						<b-button  class='toggle-button p-1 mb-1' v-if="row.item.status === 'unread'" @click="markRead(row.item.id)"><i class="fa fa-archive"  ></i> Marcar como leída</b-button>
						<b-button   class='toggle-button p-1 mb-1' v-if="row.item.status !== 'unread'"   @click="markUnread(row.item.id)"><i class="fa fa-eye-slash"  ></i> Marcar como no leída</b-button>

						<b-button variant="primary" class="toggle-button p-1 mb-1'" v-if="row.item.status !== 'archivado'" @click="row.toggleDetails"> {{ row.detailsShowing ? 'Esconder' : 'Ver consulta'}} </b-button>

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
				{key: 'id', sortable: true},
				{key: 'status', label: 'Estado', sortable: true},
				{key: 'fecha' , sortable: true},
				{key:'name', label: 'Nombre'},
				{key:'institucion'},
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

			// v REEMPLAZAR POR FECHA DE DB	
			var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth();
				var yyyy = today.getFullYear();
				var hh = today.getHours();
				var min = today.getMinutes();


				var today = dd+"/"+mm+"/"+yyyy + "  - " + hh + ":" + min;
			/// ^ reemplazar por fecha de db

			if (this.messages.length > 0){
         		 for (var i = (this.messages.length - 1); i > 0 ; i--){
					  var message = {
						  id: this.messages[i].id,
						  name: this.messages[i].name,
						  institucion: this.messages[i].institution,
						  email: this.messages[i].email,
						  message: this.messages[i].description,
						  status: this.messages[i].status,
						  _showDetails: false,
							fecha: today,
					  }
					  rowsArray.push(message);

				}
			}

			return rowsArray;

		},
		newMessages: function(){
			
			if (this.messages.length > 0){
				var newMess = [];
				for (var i = (this.messages.length - 1); i > 0 ; i--){
					if (this.messages[i].status === 'unread'){
						newMess.push(this.messages[i]);
					}
				}

				return newMess;
			}

		}
				
			
		
	}, 
	methods: {
		statusBadge(status){
			if (status === 'unread'){
				return 'badge-danger'
			} else if (status === 'read'){
				return 'badge-success'
			} else if (status === 'archivado'){
				return 'badge'
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
	.toggle-button {
			font-size: 0.75rem !important;

	}
	.badge-action i{
	color:white !important;
	}
	.badge-action {
	font-size: 0.75rem !important;
	color:white !important;
	font:black;
	}
	.badge-action:hover{
	cursor:pointer;
	}
</style>