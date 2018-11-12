<template>
  <b-card id="admin-service">
    <div slot="header">
	    <header><i class="icon-layers mr-2 pt-1"></i> Administrar Servicios
        <b-button @click="addService()" class="btn-success float-right"><i class="icon-plus mr-2"></i> Crear Nuevo Servicio </b-button>
      </header>
	  </div>
     <b-row>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Filtrar" class="m-1 mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Ingrese busqueda" />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">Borrar</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6"  class="my-1">
        <b-form-group horizontal label="Por página" class="mb-0">
          <b-form-select :options="pageOptions" v-model="perPage" />
        </b-form-group>
      </b-col>
     </b-row>
    <b-table id="servicesTable" striped bordered
            small responsive="sm" 
           :filter="filter" 
           :items="items" :fields="fields" 
           :current-page="currentPage" :per-page="perPage">
      <template slot="status" slot-scope="data">
        <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
      </template>
      <template slot="row-details" slot-scope="data">
          <div class="p-3">
						<p> <strong> Descripción: </strong> {{data.item.description}} </p>
            <p> <strong> Filtros relacionados (ID): </strong> {{data.item.filters}} </p>
            <p> <strong> Contacto: </strong>{{data.item.nombre_contacto}} - {{data.item.tel}} - {{data.item.email}} - {{data.item.dir}} </p>
          </div>
					</template>
      <template slot="acciones" slot-scope="data">
          <b-button class='btn-warning badge-warning badge-action p-1 mb-1'  @click="editService(data.item.id)" ><i class="icon-pencil mr-1"></i>Editar</b-button>
          <b-button  class='btn-danger badge-action p-1 mb-1' @click="confirmDeletion(data.item.id)"><i class="icon-trash mr-1"  ></i> Eliminar</b-button>
          <b-button  class='btn-success badge-action p-1' @click="data.toggleDetails" ><i class="icon-eye mr-1"></i> {{ data.detailsShowing ? 'Ver menos' : 'Ver más'}}</b-button>
      </template>
      
    </b-table>
    <nav class="pagination-nav">
      <b-pagination :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Anterior" next-text="Siguiente"/>
    </nav>
    <b-modal ok-only :title="'Confirmar eliminacion'" class="modal-danger" v-model="deleteModal" size="lg" > 
        <div v-if="IDtoDelete">
          <h1>¿Eliminar el servicio #{{IDtoDelete}} ?</h1>
          <b-button variant="danger" @click="deleteService(IDtoDelete)"> Si, quiero eliminarlo </b-button>	
        </div>
        <p class="alert-success" v-if="!IDtoDelete"> El servicio fue eliminado exitósamente. </p>
       <template slot="modal-footer">
          <b-button @click="closeModal()"> Cerrar </b-button>
        </template>
		</b-modal>
  </b-card>


</template>

<script>
import router from "@/router"

  var $table = $('#servicesTable');

export default {
  name: 'ServicesTable',
  props: {
    caption: {
      type: String,
      default: 'Table'
    },
    hover: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
       fields: [
        {key: 'id', sortable: true, class: 'id-col'},
        {key: 'name', label:"Nombre",class: 'name-col'},
        {key: 'unidad', sortable: true},
        {key: 'tipo', sortable: true},
        {key: 'sector', sortable: true},
       // {key: 'destinatario', sortable: true},
        {key: 'acciones', class: 'act-col'}
      ],
      currentPage: 1,
      perPage: 10,
      pageOptions: [ 5, 10, 15, 20, 25 ],
      totalRows: 0,
      filter: null,
      deleteModal: false,
      IDtoDelete: false,
    }
  },
  computed: {
    services(){
      return this.$store.state.fullServices;
    },
    items(){
      var rowsArray = [];
     
      for (var i = 0; i < this.services.data.length; i++){
          var filter1 = [];
          var filter2 = [];
          var filter3 = [];
          var filter4 = [];
          var filter5 = [];         
          var filters = []; 
          
        if (this.services.data[i].filters.length > 0){
          for (var n = 0; n < this.services.data[i].filters.length; n++){
              if (this.services.data[i].filters[n].filterType.id === 1){
                  filter1.push(this.services.data[i].filters[n].name + " ");
              } else if (this.services.data[i].filters[n].filterType.id === 2){
                  filter2.push(this.services.data[i].filters[n].name + " ");
              } else if (this.services.data[i].filters[n].filterType.id === 3){
                  filter3.push(this.services.data[i].filters[n].name + " ");
              } else if (this.services.data[i].filters[n].filterType.id === 4){
                  filter4.push(this.services.data[i].filters[n].name + " ");
              } else if (this.services.data[i].filters[n].filterType.id === 5){
                  filter5.push(this.services.data[i].filters[n].name + " ");
              }  
              filters.push(this.services.data[i].filters[n].id);
          }
      }
          
          var service = {
              id: this.services.data[i].id,
              name: this.services.data[i].name,
              unidad: filter1,
              tipo: filter3,
              sector: filter4,
              destinatario: filter5,
              filters:  filters,
              description:  this.services.data[i].description,
              nombre_contacto:  this.services.data[i].contact_name,
              tel:  this.services.data[i].phone,
              email:  this.services.data[i].email,
              dir:  this.services.data[i].address,
              website:  this.services.data[i].website,
              _showDetails: false,
          };
          rowsArray.push(service);
      }

      return rowsArray;
    }
  },
  methods: {
    getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
    getRowCount (items) {
      return items.length
    },
    editService: function (serviceID) {
			//router.push({ name: 'Service', params:{id: serviceID}});			
			router.push({ name: 'Editar Servicio', query:{id: serviceID}}); // no pude acceder a los query params desde /service?id=n
    },
    addService: function () {
      router.push({ name: 'Crear Servicio'});
    },
     onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    confirmDeletion(serviceID){
      this.IDtoDelete = serviceID;
      this.deleteModal = true;
    },
    deleteService(serviceID){
      console.log('solicitud de eliminacion');
      console.log(serviceID);
      this.$store.dispatch('deleteService', serviceID).then(()=>{
            console.log('eliminado');
            this.$store.dispatch('fetchServices');
            this.IDtoDelete = false;
      });
    },
    closeModal(){
      this.deleteModal = false; 
      if (this.IDtoDelete === false) {router.go()} else {};
    }
  }
}
</script>

<style>
#admin-service .id-col {
  width: 2em ;
}

#admin-service .act-col {
  width: 50px ;
}
#admin-service .badge-action i{
  color:white ;
}
#admin-service .badge-action {
  font-size: 0.75rem ;
  color:white;
  font:black;
}
#admin-service .badge-action:hover{
  cursor:pointer;
}
#admin-service .card-body {
  text-align: center;
}

#admin-service .pagination-nav{
  display: inline-block;
}
</style>