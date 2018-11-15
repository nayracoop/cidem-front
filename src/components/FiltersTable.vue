<template>
  <div>
  <b-card id="admin-filters">
    <div slot="header">
	    <header><i class="fa fa-gear  mr-2 pt-1"></i> Administrar Filtros
        <b-button class="btn-success float-right" @click="newModal = true"> Crear Nuevo Filtro </b-button>
      </header>
	  </div>
    
    <b-table id="filters-table" :hover="hover" :striped="striped" 
          :bordered="bordered" :small="small" 
          :fixed="fixed" responsive="sm" 
          :items="items" :fields="fields" 
          :current-page="currentPage" :per-page="perPage">
      <template slot="status" slot-scope="data">
        <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
      </template>
      <template slot="acciones" slot-scope="data">
           <b-button class='btn-warning badge-warning badge-action p-1 mb-1'  @click="editFilter(data.item)"  ><i class="icon-pencil mr-1"></i>Editar</b-button>
          <b-button  class='btn-danger badge-action p-1' @click="deleteFilter(data.item)" ><i class="icon-trash mr-1"  ></i> Eliminar</b-button>
      </template>
    </b-table>
    <nav class="pagination-nav">
      <b-pagination :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Anterior" next-text="Siguiente" class="mx-auto"/>
    </nav>
  </b-card>

  <b-modal title="Crear filtro" class="modal-success" v-model="newModal" size="lg" > 
    <b-form @submit.stop.prevent="validateCreateFilter($event)" v-if="filterCreated === false">
      <b-form-group
          description=""
          label="Nombre del Filtro"
          label-for="filterName"
          :label-cols="3"
          :horizontal="true">
        <b-form-input id="filterName" class="mt-2" type="text" placeholder="Nombre del Filtro" v-model="newFilter.name"></b-form-input>
        <div>
          <p class="validation-error" v-if="!$v.newFilter.name.minLength">{{validationText.name.min}}</p>
          <p class="validation-error" v-if="!$v.newFilter.name.maxLength">{{validationText.name.max}}</p>
          <p class="validation-error" v-if="!$v.newFilter.name.required">{{validationText.req}}</p>
        </div>
      </b-form-group>
      <b-form-group
          description=""
          label="Etiqueta del Filtro"
          label-for="filterTag"
          :label-cols="3"
          :horizontal="true">
        <b-form-input class="mt-2" id="filterTag" type="text" placeholder="Etiqueta del filtro" v-model="newFilter.tag"></b-form-input>
          <div>
            <p class="validation-error" v-if="!$v.newFilter.tag.minLength">{{validationText.tag.min}}</p>
            <p class="validation-error" v-if="!$v.newFilter.tag.maxLength">{{validationText.tag.max}}</p>
            <p class="validation-error" v-if="!$v.newFilter.tag.required">{{validationText.req}}</p>
          </div>
        </b-form-group>
        <b-form-group
            label="Tipo de filtro"
            label-for="filterType"
            :label-cols="3"
            :horizontal="true">
          <b-form-radio-group id="filterType"
            class="mt-2"
            :plain="true"
            v-model="newFilter.type"
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
          <div>
            <p class="validation-error" v-if="!$v.newFilter.type.required">{{validationText.req}}</p>
          </div>
        </b-form-group>
              <p :class="{'alert-danger':creationDenied, 'validation-error':creationDenied, hide:!creationDenied}"> No se puede crear el filtro sin validar </p>
        <input type="submit" id="submit-create-form" hidden/>
    </b-form>
    <div v-if="filterCreated === true">
      <h2> El filtro #{{currentFilter.id}} se ha creado exitosamente </h2>
      <ul class="pb-0 pt-1 mb-0 m-2">
        <p> <strong> Nombre : </strong> {{currentFilter.name}}  </p>
        <p> <strong> Etiqueta : </strong>{{currentFilter.tag}}</p>
        <p> <strong> Tipo de Filtro:  </strong> {{currentFilter.filterType.id}} - {{currentFilter.filterType.name}}</p>
      </ul>
    </div>
    <template slot="modal-footer">
      <b-button class="btn rounded m-0 btn-success" :disabled="$v.newFilter.$invalid" @click="validateCreateFilter($event)"
              type="submit" variant="success" v-if="filterCreated === false" > 
          <span v-if="!loading">Crear filtro</span>  
          <i v-if="loading" class="fa fa-spinner fa-spin fa-fw"></i>
      </b-button>
      <b-button type="cancel" v-if="filterCreated === false"  @click="newModal = false; closeModal()" > Cancel </b-button>
      <b-button v-if="filterCreated === true" @click="newModal = false; closeModal()" variant="success"> Ok </b-button>
    </template>
  </b-modal>

  <b-modal :title="'Editar filtro ' + currentFilter.id" class="modal-warning " v-model="editModal" size="lg" > 
    <div>
      <div v-if="associatedServices.length > 0"> 
        <h5>Los siguientes servicios se encuentran asociados a este filtro:</h5>
        <ul>
          <li v-for="service in associatedServices" :key="service.id"> #{{service.id}} - {{service.name}} </li>
        </ul>
      </div>
      <b-form @submit.stop.prevent="validateEditFilter($event)">
            <b-form-group
              description=""
              label="Nombre del Filtro"
              label-for="filterName"
              :label-cols="3"
              :horizontal="true">
              <div v-if="editFilterName === false" class="m-1 mt-2">
                <p class="d-inline">{{editedFilter.name}}</p> 
                <b-badge @click="editFilterName = true"  class='badge-pill badge-warning badge-action d-inline m-1'>
                  <i class="fa fa-pencil"></i>
                </b-badge>
              </div>
              <div v-if="editFilterName === true" class="d-inline">
                <b-form-input id="filterName" class="mt-2" type="text" :placeholder="currentFilter.filtro" v-model="editedFilter.name"></b-form-input>
                <b-badge @click="editFilterName = false; editedFilter.name=currentFilter.filtro"  class='badge-pill badge-danger badge-action float-right m-1'>
                  <i class="fa fa-close"></i>
                </b-badge>
                <b-badge  v-if="!$v.editedFilter.name.$invalid" @click="editFilterName = false; changesWereMade = true"  
                    class='badge-pill badge-success badge-action float-right m-1'>
                  <i class="fa fa-check"></i>
                </b-badge>
                <div>
                  <p class="validation-error" v-if="!$v.editedFilter.name.minLength">{{validationText.name.min}}</p>
                  <p class="validation-error" v-if="!$v.editedFilter.name.maxLength">{{validationText.name.max}}</p>
                  <p class="validation-error" v-if="!$v.editedFilter.name.required">{{validationText.req}}</p>
                </div>
              </div>
            </b-form-group>
              <b-form-group
              description=""
              label="Etiqueta del Filtro"
              label-for="filterTag"
              :label-cols="3"
              :horizontal="true">
              <div v-if="editFilterTag === false" class="m-1 mt-2">
                <p class="d-inline">{{editedFilter.tag}}</p> 
                <b-badge @click="editFilterTag = true"  class='badge-pill badge-warning badge-action d-inline m-1'>
                  <i class="fa fa-pencil"></i>
                </b-badge>
              </div>
                <div v-if="editFilterTag === true" class="d-inline">
                <b-form-input id="filterTag" type="text" :placeholder="currentFilter.etiqueta" v-model="editedFilter.tag"></b-form-input>
                <b-badge @click="editFilterTag = false; editedFilter.tag = currentFilter.etiqueta"  class='badge-pill badge-danger badge-action float-right m-1'>
                  <i class="fa fa-close"></i>
                </b-badge>
                <b-badge v-if="!$v.editedFilter.tag.$invalid" @click="editFilterTag = false; changesWereMade = true"  
                    class='badge-pill badge-action float-right m-1' :class="{'badge-secondary': $v.editedFilter.tag.$invalid ,'badge-success': !$v.editedFilter.tag.$invalid}">
                  <i class="fa fa-check"></i>
                </b-badge>
                <p>
                  <span class="validation-error" v-if="!$v.editedFilter.tag.minLength">{{validationText.tag.min}}</span>
                  <span class="validation-error" v-if="!$v.editedFilter.tag.maxLength">{{validationText.tag.max}}</span>
                  <span class="validation-error" v-if="!$v.editedFilter.tag.required">{{validationText.req}}</span>
                </p>
              </div>
            </b-form-group>
            <b-form-group
              label="Tipo de filtro"
              label-for="filterType"
              :label-cols="3"
              :horizontal="true">
              <div v-if="editFilterType === false" class="m-1 mt-2">
                <p class="d-inline">{{returnTypeName(editedFilter.type)}}</p> 
                <b-badge @click="editFilterType = true"  class='badge-pill badge-warning badge-action d-inline m-1'>
                  <i class="fa fa-pencil"></i>
                </b-badge>
              </div>
                <div v-if="editFilterType === true" class="d-inline">
                  <b-form-radio-group id="filterType"
                      class="mt-2"
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
                      v-model="editedFilter.type">
                  </b-form-radio-group>
                  <b-badge v-if="!$v.editedFilter.type.$invalid" @click="editFilterType = false; changesWereMade = true"  
                      class='badge-pill badge-success badge-action m-1'>
                    <i class="fa fa-check"></i>
                  </b-badge>
                  <b-badge @click="editFilterType = false; editedFilter.type = currentFilter.tipoId"  class='badge-pill badge-danger badge-action  m-1'>
                    <i class="fa fa-close"></i>
                  </b-badge>
                  <div>
                    <p class="validation-error" v-if="!$v.editedFilter.type.required">{{validationText.req}}</p>
                  </div>
              </div>
            </b-form-group>
            <input type="submit" id="submit-edit-form" hidden/>
      </b-form>
      <p :class="{'validation-error':editionDenied, hide:!editionDenied}"> No puede guardar cambios no validados </p>
      <p class="alert-success" v-if="filterEdited"> El filtro #{{currentFilter.id}} se ha editado exitosamente </p>
    </div>
    <template slot="modal-footer">
      <b-button class="btn rounded m-0 btn-success" :disabled="!changesWereMade||$v.editedFilter.$invalid" @click="validateEditFilter($event)"
                type="submit" v-if="filterEdited === false" >
          <span v-if="!loading">Guardar Cambios</span>
          <i v-if="loading" class="fa fa-spinner fa-spin fa-fw"></i>
      </b-button>
      <b-button type="cancel" v-if="filterEdited === false"  @click.prevent="editModal = false; closeModal()" > Cancel </b-button>
      <b-button v-if="filterEdited === true" @click="editModal = false; closeModal()" variant="success"> Ok </b-button>
    </template>
  </b-modal>

  <b-modal :title="'Eliminar filtro ' + currentFilter.id" class="modal-danger" v-model="deleteModal" @ok="closeModal(deleteModal)" size="lg">
      <div v-if="associatedServices.length > 0"> 
        <h3>No se puede eliminar el filtro #{{currentFilter.id}}</h3>
        <h5>Los siguientes servicios se encuentran asociados a este filtro:</h5>
        <ul>
          <li v-for="service in associatedServices" :key="service.id"> #{{service.id}} - {{service.name}} </li>
        </ul>
      </div>
      <div v-if="associatedServices.length === 0">  
         <div v-if="filterDeleted === false">
            <p> Confirmar eliminación del filtro </p>
            <b-button variant="danger" @click="submitDeletedFilter()"> Si, quiero eliminar el filtro número {{currentFilter.id}} </b-button>
          </div>   
          <p class="alert-success" v-if="filterDeleted === true"> el filtro #{{currentFilter.id}} fue eliminado exitosamente  </p>
       
      </div>
      <template slot="modal-footer">
          <div  v-if="filterDeleted === false">
            <b-button type="cancel"  v-if="associatedServices.length === 0" @click="deleteModal = false; closeModal() "> Cancel </b-button>
            <b-button type="ok" variant="primary" v-if="associatedServices.length > 0" @click="deleteModal = false; closeModal()" > Ok </b-button>
          </div>
          <div v-if="filterDeleted === true">
            <b-button type="ok" variant="primary" @click="deleteModal = false; closeModal()" > Ok </b-button>
          </div>
    </template>
  </b-modal>
  </div>

</template>

<script>
import store from '@/store'
import { maxLength , minLength , required } from 'vuelidate/lib/validators'


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
      loading: false,
      newFilter: {
        name: '',
        type: '',
        tag: ''
      },
      editedFilter:{
        id: '',
        name: '',
        type: '',
        tag: ''
      },
      currentFilter: {},
      filterCreated: false,
      newModal: false,
      filterEdited: false,
      editModal: false,
      editFilterName: false,
      editFilterTag: false,
      editFilterType: false,
      changesWereMade: false,
      noChangesWereMade: false,
      editionDenied: false,
      creationDenied: false,
      deleteModal: false,
      filterDeleted: false,
      fields: [
          {key: 'id', class: 'id-col'},
          {key: 'tipo'},
          {key: 'tipoId', thClass: 'd-none', tdClass: 'd-none' },
          {key: 'filtro'},
          {key: 'etiqueta'},
          {key: 'acciones', class: 'act-col'}
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      associatedServices: [],
      validationText:{
        req: "Este campo no puede quedar vacío",
        name: {
          min: "El nombre debe tener por lo menos 3 caracteres",
          max: "El nombre debe tener como máximo 150 caracteres", 
        },
        tag: {
          min: "La etiqueta debe tener por lo menos 3 caracteres",
          max: "La etiqueta debe tener como máximo 50 caracteres", 
        }
      }
    }
  },
  validations: {
    newFilter: {
      name: { 
        required,
        minLength: minLength(3),
        maxLength: maxLength(150),
      },
      tag: {
        required,  
        minLength: minLength(3),
        maxLength: maxLength(50),
      },
      type: { required }
    },
    editedFilter: {
      name: { 
        required,
        minLength: minLength(3),
        maxLength: maxLength(150),
      },
      tag: {
        required,  
        minLength: minLength(3),
        maxLength: maxLength(50),
      },
      type: { required }
    },
    
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
        //get services associados with filter
        this.$store.dispatch('getAssociatedServices', filter.id).then(response => {
          this.associatedServices = response;
        });
        //
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
        this.filterDeleted = false;
        this.validate = false;
        this.loading = false;

    },
    validateCreateFilter(evt){
      evt.preventDefault();
      this.$v.newFilter.$touch();
      if (this.$v.newFilter.$invalid) {
          this.creationDenied = true;
          setTimeout(() => {
           this.creationDenied = false;
        }, 2500);
      } else {
        this.loading = true;
        this.submitCreatedFilter();
      }
    },
    validateEditFilter(evt){
      evt.preventDefault();
        this.$v.editedFilter.$touch();
        if (this.$v.editedFilter.$invalid) {
          this.editionDenied = true;
          setTimeout(() => {
           this.editionDenied = false;
        }, 2500)
        } else {
          this.noChangesWereMade = false;
          this.editionDenied = false;
          this.loading = true;
          this.submitEditedFilter();
        }

    },
    submitEditedFilter(){
      this.$store.dispatch('editFilter', this.editedFilter)
      .then(response => {
        this.$store.dispatch('fetchFilters');
        this.loading = false;
        this.filterEdited = true;
        setTimeout(() => {
           this.filterEdited = false;
        }, 2500)
        this.noChangesWereMade = false;
        this.editFilterType = false;
        this.editFilterName = false;
        this.editFilterTag = false;       
      });
    },
    submitDeletedFilter(){
      this.$store.dispatch('deleteFilter', this.currentFilter.id).then(()=>{
        this.loading = false;
        this.$store.dispatch('fetchFilters');
        this.filterDeleted = true;
      });
    },
    submitCreatedFilter(){
      this.$store.dispatch('postNewFilter', this.newFilter).then(response => {
        this.$store.dispatch('fetchFilters');
        this.currentFilter = response;
        this.filterCreated = true;
      });
    },
  }
}
</script>

<style>
#filters-table .id-col{
  width: 20px ;
}
#filters-table .act-col{
  width: 40px ;
}
#admin-filters .badge-action i{
  color:white ;
}
#admin-filters .badge-action {
  font-size: 0.75rem ;
  color:white;
  font:black;
}
#admin-filters .badge-action:hover{
  cursor:pointer;
}

#admin-filters .card-body {
  text-align: center;
}

</style>