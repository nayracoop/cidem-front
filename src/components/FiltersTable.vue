<template>
  <div>
  <b-card >
    <div slot="header">
	    <header><i class="fa fa-gear"></i> Administrar Filtros
        <b-button class="btn-success float-right" @click="newModal = true"> Crear Nuevo Filtro </b-button>
      </header>
	  </div>
    
    <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
      <template slot="status" slot-scope="data">
        <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
      </template>
      <template slot="acciones" slot-scope="data">
        <b-badge @click="editFilter(data.item)"  class='badge-pill badge-warning badge-action'><i class="icon-pencil"></i></b-badge>
        <b-badge @click="deleteFilter(data.item)" class='badge-pill badge-danger badge-action'><i class="icon-trash"></i></b-badge>
      </template>
    </b-table>
    <nav>
      <b-pagination :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
    </nav>
  </b-card>
    <b-modal title="Crear filtro" class="modal-success" v-model="newModal" @ok="closeModal(newModal)" ok-variant="success" size="lg" > 
      <b-form>
          <b-form-group
            description=""
            label="Nombre del Filtro"
            label-for="filterName"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="filterName" type="text" placeholder="Nombre del Filtro"></b-form-input>
          </b-form-group>
            <b-form-group
            description=""
            label="Etiqueta del Filtro"
            label-for="filterTag"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="filterTag" type="text" placeholder="Etiqueta del filtro"></b-form-input>
          </b-form-group>
            <b-form-group
            label="Tipo de filtro"
            label-for="filterType"
            :label-cols="3"
            :horizontal="true">
            <b-form-radio-group id="filterType"
              :plain="true"
              :options="[
                {text: 'Unidad ', value: '1'},
                {text: 'Subunidad ', value: '2'},
                {text: 'Tipo de servicio ', value: '3'},
                {text: 'Sector al que esta destinado ', value: '4'},
                {text: 'Destinatarios ', value: '5'}
              ]"
              checked="2"
              stacked>
            </b-form-radio-group>
          </b-form-group>
      </b-form>
  </b-modal>
  <b-modal :title="'Editar filtro  ' + currentFilter.id" class="modal-warning" v-model="editModal" @ok="closeModal(editModal)" ok-variant="success" size="lg" > 
      <h3>{{currentFilter.filtro}}</h3>
      <b-form>
          <b-form-group
            description=""
            label="Nombre del Filtro"
            label-for="filterName"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="filterName" type="text" :placeholder="currentFilter.filtro"></b-form-input>
          </b-form-group>
            <b-form-group
            description=""
            label="Etiqueta del Filtro"
            label-for="filterTag"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="filterTag" type="text" placeholder="Etiqueta del filtro"></b-form-input>
          </b-form-group>
            <b-form-group
            label="Tipo de filtro"
            label-for="filterType"
            :label-cols="3"
            :horizontal="true">
            <b-form-radio-group id="filterType"
              :plain="true"
              :options="[
                {text: 'Unidad ', value: '1'},
                {text: 'Subunidad ', value: '2'},
                {text: 'Tipo de servicio ', value: '3'},
                {text: 'Sector al que esta destinado ', value: '4'},
                {text: 'Destinatarios ', value: '5'}
              ]"
              checked="2"
              stacked>
            </b-form-radio-group>
          </b-form-group>
      </b-form>
  </b-modal>
  <b-modal :title="'Eliminar filtro   ' + currentFilter.id" class="modal-danger" v-model="deleteModal" @ok="closeModal(deleteModal)" size="lg" >
      <h3>No se puede eliminar el filtro #{{currentFilter.id}}</h3>
      <h7>Los siguientes servicios se encuentran asociados a este filtro:</h7>
      <ul>
        <li>#34 Servicio bhlabalbha (click link a pag de edicion del servicio)</li>
        <li>#12 Servicio bhlabalbha (click link a pag de edicion del servicio)</li>
        <li>#7 Servicio bhlabalbha (click link a pag de edicion del servicio)</li>

      </ul>
  </b-modal>
  </div>
</template>

<script>
/**
   * Randomize array element order in-place.
   * Using Durstenfeld shuffle algorithm.
   */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

export default {
  name: 'FiltersTable',
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
        currentFilter: {},
        newModal: false,
        editModal: false,
        deleteModal: false,
        fields: [
            {key: 'id'},
            {key: 'tipo'},
            {key: 'filtro'},
            {key: 'etiqueta'},
            {key: 'acciones'}
        ],
        currentPage: 1,
        perPage: 10,
        totalRows: 0,
        header: '<i class="fa fa-gear"></i> Administrar Filtros <button @click="newModal = true"></button>'
      }
  },
  computed: {
        filterList(){
            return this.$store.state.filterList;
        },
        filterTypes(){
            return this.$store.state.filterTypes;
        },
        items(){
            var rowsArray = [];

            for (var i = 0; i < this.filterList.length; i++){
                var holi = {
                    id: this.filterList[i].id,
                    tipo: this.filterList[i].filterType.name,
                    filtro: this.filterList[i].name
                };
                rowsArray.push(holi);
            }

            console.log(rowsArray);
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
    editFilter(filter){
        this.editModal = true;
        this.currentFilter = filter;
        console.log(filter);
    },
    deleteFilter(filter){
        this.deleteModal = true;
        this.currentFilter = filter;
        console.log(id);
    },
    closeModal(modal){
       modal = false;  
    }
  }
}
</script>

<style>
.badge-action i{
  color:black;
}
.badge-action:hover{
  cursor:pointer;
}
</style>