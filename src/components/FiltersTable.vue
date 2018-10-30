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
  <b-modal title="Crear filtro" class="modal-success" v-model="newModal" size="lg" > 
      <b-form @submit.prevent="createFilter($event)" v-if="filterCreated === false">
          <b-form-group
              description=""
              label="Nombre del Filtro"
              label-for="filterName"
              :label-cols="3"
              :horizontal="true">
            <b-form-input id="filterName" type="text" required placeholder="Nombre del Filtro" v-model="newFilter.name"></b-form-input>
          </b-form-group>
            <b-form-group
              description=""
              label="Etiqueta del Filtro"
              label-for="filterTag"
              :label-cols="3"
              :horizontal="true">
            <b-form-input id="filterTag" type="text" required placeholder="Etiqueta del filtro" v-model="newFilter.tag"></b-form-input>
          </b-form-group>
            <b-form-group
              label="Tipo de filtro"
              label-for="filterType"
              :label-cols="3"
              :horizontal="true">
            <b-form-radio-group id="filterType"
              :plain="true"
              v-model="newFilter.type"
              required
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
          <input type="submit" id="submit-create-form" hidden/>
      </b-form>
      <div v-if="filterCreated === true">
        <h2> El filtro #{{currentFilter.id}} se ha creado exitosamente </h2>
        <ul class="pb-0 pt-1 mb-0 m-2">
        <p> <strong> Nombre : </strong> {{currentFilter.name}}  </p>
        <p>  <strong> Etiqueta : </strong>{{currentFilter.tag}}</p>
        <p>  <strong> Tipo de Filtro:  </strong> {{currentFilter.filterType.id}} - {{currentFilter.filterType.name}}</p>
        </ul>
      </div>
      <template slot="modal-footer">
        
          <label for="submit-create-form"  class="btn rounded m-0 btn-success"
                  type="submit" variant="success" v-if="filterCreated === false" >Crear filtro  </label>
        <b-button type="cancel" v-if="filterCreated === false"  @click="newModal = false; closeModal()" > Cancel </b-button>
        <b-button v-if="filterCreated === true" @click="newModal = false; closeModal()" variant="success"> Ok </b-button>
      </template>
  </b-modal>


  <b-modal :title="'Editar filtro ' + currentFilter.id" class="modal-warning" v-model="editModal" size="lg" > 
      <div>
        <div class="p-2">
          <h5>Los siguientes servicios se verán afectados por el cambio:</h5>
          <p>filter . getServicesRelated = [] / #2, #4, #6 </p>
        </div>
        <b-form @submit.prevent="submitEditedFilter($event)">
            <b-form-group
              description=""
              label="Nombre del Filtro"
              label-for="filterName"
              :label-cols="3"
              :horizontal="true">
              <div v-if="editFilterName === false" class="m-1">
                <p class="d-inline">{{editedFilter.name}}</p> 
                <b-badge @click="editFilterName = true"  class='badge-pill badge-warning badge-action d-inline m-1'>
                  <i class="fa fa-pencil"></i>
                </b-badge>
              </div>
              <div v-if="editFilterName === true" class="d-inline">
                <b-form-input id="filterName" type="text" required :placeholder="currentFilter.filtro" v-model="editedFilter.name"></b-form-input>
                <b-badge @click="editFilterName = false; editedFilter.name=currentFilter.filtro"  class='badge-pill badge-danger badge-action float-right m-1'>
                  <i class="fa fa-close"></i>
                </b-badge>
                <b-badge @click="editFilterName = false; changesWereMade = true"  
                    class='badge-pill badge-success badge-action float-right m-1'>
                  <i class="fa fa-check"></i>
                </b-badge>
              </div>
            </b-form-group>
              <b-form-group
              description=""
              label="Etiqueta del Filtro"
              label-for="filterTag"
              :label-cols="3"
              :horizontal="true">
              <div v-if="editFilterTag === false" class="m-1">
                <p class="d-inline">{{editedFilter.tag}}</p> 
                <b-badge @click="editFilterTag = true"  class='badge-pill badge-warning badge-action d-inline m-1'>
                  <i class="fa fa-pencil"></i>
                </b-badge>
              </div>
                <div v-if="editFilterTag === true" class="d-inline">
                <b-form-input id="filterTag" type="text" required :placeholder="currentFilter.etiqueta" v-model="editedFilter.tag"></b-form-input>
                <b-badge @click="editFilterTag = false; editedFilter.tag = currentFilter.etiqueta"  class='badge-pill badge-danger badge-action float-right m-1'>
                  <i class="fa fa-close"></i>
                </b-badge>
                <b-badge @click="editFilterTag = false; changesWereMade = true"  
                    class='badge-pill badge-success badge-action float-right m-1'>
                  <i class="fa fa-check"></i>
                </b-badge>
              </div>
            </b-form-group>
              <b-form-group
              label="Tipo de filtro"
              label-for="filterType"
              :label-cols="3"
              :horizontal="true">
              <div v-if="editFilterType === false" class="m-1">
                <p class="d-inline">{{returnTypeName(editedFilter.type)}}</p> 
                <b-badge @click="editFilterType = true"  class='badge-pill badge-warning badge-action d-inline m-1'>
                  <i class="fa fa-pencil"></i>
                </b-badge>
              </div>
                <div v-if="editFilterType === true" class="d-inline">
                  <b-form-radio-group id="filterType"
                      :plain="true"
                      :options="[
                        {text: 'Unidad ', value: 1},
                        {text: 'Subunidad ', value: 2},
                        {text: 'Tipo de servicio ', value: 3},
                        {text: 'Sector al que esta destinado ', value: 4},
                        {text: 'Destinatarios ', value: 5}
                      ]"
                      :checked="editedFilter.type"
                      stacked
                      required
                      v-model="editedFilter.type">
                  </b-form-radio-group>
                  <b-badge @click="editFilterType = false; editedFilter.type = currentFilter.tipoId"  class='badge-pill badge-danger badge-action float-right m-1'>
                    <i class="fa fa-close"></i>
                  </b-badge>
                  <b-badge @click="editFilterType = false; changesWereMade = true"  
                      class='badge-pill badge-success badge-action float-right m-1'>
                    <i class="fa fa-check"></i>
                  </b-badge>
              </div>
            </b-form-group>
            <input type="submit" id="submit-edit-form" hidden/>
        </b-form>
        <p class="alert-warning" v-if="noChangesWereMade"> No hay cambios que guardar </p>
        <p class="alert-success" v-if="filterEdited"> El filtro #{{currentFilter.id}} se ha editado exitosamente </p>
      </div>
      <template slot="modal-footer">
        <label for="submit-edit-form" class="btn rounded m-0 btn-success" :disabled="!changesWereMade"
                  type="submit" variant="success" v-if="filterEdited === false" >Guardar cambios</label>
        <b-button type="cancel" v-if="filterEdited === false"  @click="editModal = false; closeModal()" > Cancel </b-button>
        <b-button v-if="filterEdited === true" @click="editModal = false; closeModal()" variant="success"> Ok </b-button>
      </template>
  </b-modal>
  <b-modal :title="'Eliminar filtro ' + currentFilter.id" class="modal-danger" v-model="deleteModal" @ok="closeModal(deleteModal)" size="lg" >
      <h3>No se puede eliminar el filtro #{{currentFilter.id}}</h3>
      <h5>Los siguientes servicios se encuentran asociados a este filtro:</h5>
      <ul>
        <li>#34 Servicio bhlabalbha (click link a pag de edicion del servicio)</li>
        <li>#12 Servicio bhlabalbha (click link a pag de edicion del servicio)</li>
        <li>#7 Servicio bhlabalbha (click link a pag de edicion del servicio)</li>
      </ul>
  </b-modal>
  </div>
</template>

<script>
import store from '@/store'

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
        newFilter: {
          name: '',
          type: '',
          tag: ''
        },
        filterCreated: false,
        currentFilter: {},
        newModal: false,
        filterEdited: false,
        editModal: false,
        editFilterName: false,
        editFilterTag: false,
        editFilterType: false,
        editedFilter:{
          id: '',
          name: '',
          type: '',
          tag: ''
        },
        changesWereMade: false,
        noChangesWereMade: false,
        deleteModal: false,
        fields: [
            {key: 'id'},
            {key: 'tipo'},
            {key: 'tipoId', thClass: 'd-none', tdClass: 'd-none' },
            {key: 'filtro'},
            {key: 'etiqueta'},
            {key: 'servicios_asociados'},
            {key: 'acciones'}
        ],
        currentPage: 1,
        perPage: 10,
        totalRows: 0,
        
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
                    filtro: this.filterList[i].name,
                    etiqueta: this.filterList[i].tag,
                    tipoId: this.filterList[i].filterType.id
                };
                rowsArray.push(holi);
            }

            
            return rowsArray;
        
        },
        
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
    returnTypeName(id){
      switch (id) {
        case 1: return 'Unidad';
        case 2: return 'Subunidad';
        case 3: return 'Tipo de servicio'
        case 4: return 'Sector al que esta destinado'
        case 5: return 'Destinatario'
      }
    },
    editFilter(filter){
        this.editModal = true;
        this.currentFilter = filter;
        this.editedFilter.id = this.currentFilter.id;
        this.editedFilter.name = this.currentFilter.filtro;
        this.editedFilter.tag = this.currentFilter.etiqueta;
        this.editedFilter.type = this.currentFilter.tipoId;
    },
    deleteFilter(filter){
        this.deleteModal = true;
        this.currentFilter = filter;
        console.log(id);
    },
    closeModal(modal){
        this.filterCreated = false;
        this.filterEdited= false;
        this.noChangesWereMade = false;
        this.currentFilter = {};
        this.newFilter.name = '';
        this.newFilter.tag = '';
        this.newFilter.type = '';
        this.editedFilter.id = '';
        this.editedFilter.name = '';
        this.editedFilter.tag = '';
        this.editedFilter.type = '';
    },
    createFilter(evt){
      evt.preventDefault();
      this.$store.dispatch('postNewFilter', this.newFilter).then(response => {
        this.$store.dispatch('fetchFilters');
        this.currentFilter = response;
        this.filterCreated = true;
      });
    },
    submitEditedFilter(evt){
        if (this.changesWereMade === true ){
          this.$store.dispatch('editFilter', this.editedFilter).then(response => {
            this.filterEdited = true;
             this.noChangesWereMade = false;
          });
          
        } else {
          this.noChangesWereMade = true;
        }
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