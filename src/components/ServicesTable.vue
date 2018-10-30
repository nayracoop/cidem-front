<template>
  <b-card >
    <div slot="header">
	    <header><i class="fa fa-gear"></i> Administrar Servicios
        <b-button @click="addService()" class="btn-success float-right"> Crear Nuevo Servicio </b-button>
      </header>
	  </div>
     <b-row>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Filtrar" class="m-1 mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
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
    <b-table hover striped bordered small responsive="sm" 
    :filter="filter" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
      <template slot="status" slot-scope="data">
        <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
      </template>
      <template slot="acciones" slot-scope="data">
        <b-button @click="editService(data.item.id)" class='btn-warning badge-warning badge-action p-1'><i class="icon-pencil mr-1"></i>Editar</b-button>
        <b-button  class='btn-danger badge-action p-1 m-1'><i class="icon-trash mr-1"></i> Eliminar</b-button>
        <b-button  class='btn-success badge-action p-1'><i class="icon-eye mr-1"></i> Ver más</b-button>

      </template>
    </b-table>
    <nav>
      <b-pagination :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
    </nav>
  </b-card>
</template>

<script>
import router from "@/router"


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
        {key: 'id', sortable: true},
        {key: 'name'},
        {key: 'unidad', sortable: true},
        {key: 'tipo', sortable: true},
        {key: 'sector', sortable: true},
        {key: 'destinatario', sortable: true},
        {key: 'acciones'}
      ],
      currentPage: 1,
      perPage: 10,
      pageOptions: [ 5, 10, 15, 20, 25 ],
      totalRows: 0,
       filter: null,
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
               
                if (this.services.data[i].filters.length > 0){
                    for (var n = 0; n < this.services.data[i].filters.length; n++){
                        if (this.services.data[i].filters[n].filterType.id === 1){
                            filter1.push(this.services.data[i].filters[n].name);
                        } else if (this.services.data[i].filters[n].filterType.id === 2){
                            filter2.push(this.services.data[i].filters[n].name);
                        } else if (this.services.data[i].filters[n].filterType.id === 3){
                            filter3.push(this.services.data[i].filters[n].name);
                        } else if (this.services.data[i].filters[n].filterType.id === 4){
                            filter4.push(this.services.data[i].filters[n].name);
                        } 
                    }
                }
               
                var service = {
                    id: this.services.data[i].id,
                    name: this.services.data[i].name,
                    unidad: filter1.toString(),
                    tipo: filter3.toString(),
                    sector: filter4.toString()
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
    }
  }
}
</script>

<style>
.badge-action i{
  color:black;
}
.badge-action {
  color:black !important;
  font:black;
}
.badge-action:hover{
  cursor:pointer;
}
</style>