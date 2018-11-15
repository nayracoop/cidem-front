<template>
	<div class="animated fadeIn">
		<b-row>
	      	<b-col md="8" offset="2">
	        	<b-card>
					<div slot="header">
						<strong>Ver / Editar Servicio </strong>
					</div>
					<b-form @submit="validateEditedService($event)" @enter="$event.preventDefault()">
						<b-form-group label="Nombre del servicio"
								description=""
								label-for="sName"
								:label-cols="3"
								:horizontal="true">
							<div v-if="editServiceName === false" class="mt-2">
								<p class="d-inline" :class="{edited:editedFields.includes('name')}">{{editedService.name}}</p> 
								<b-badge @click="editServiceName = true"  
										class='badge-pill badge-warning badge-action  d-inline'>
									<i class="fa fa-pencil"></i>
								</b-badge>
							</div>
							<div v-show="editServiceName === true" clearfix>
								<b-form-input id="sName" 
											type="text" 
											placeholder="Inserte nuevo nombre del servicio"
											v-model="form.name">
								</b-form-input>
								<b-badge @click="editServiceName = false; form.name= editedService.name"  
										class='badge-pill badge-danger badge-action float-right m-1'>
									<i class="fa fa-close"></i>
								</b-badge>
								<b-badge @click="editServiceName = false; editedService.name = form.name;"  
										class='badge-pill badge-success badge-action float-right m-1'>
									<i class="fa fa-check"></i>
								</b-badge>
							</div>
							<p class="validation-error" v-if="!$v.editedService.name.minLength">{{validationText.name.min}}</p>
							<p class="validation-error" v-if="!$v.editedService.name.maxLength">{{validationText.name.max}}</p>
							<p class="validation-error" v-if="!$v.editedService.name.required">{{validationText.req}}</p>
						</b-form-group>

						<b-form-group label="Unidad"
								description=""
								label-for="sUnidad"
								:label-cols="3"
								:horizontal="true">
							<div v-if="editServiceUnidad === false"  class="mt-2">
								<p class="d-inline">{{namedFilters.unidad.toString()}} </p>
								<b-badge @click="editServiceUnidad = true"  
										class='badge-pill badge-warning badge-action d-inline'>
									<i class="fa fa-pencil"></i>
								</b-badge>
							</div>
							<div v-show="editServiceUnidad === true" clearfix>
								<b-form-select id="sUnidad"
									:plain="true"
									v-model="form.unidad">
									<option v-if="filter.filterType.id === 1" 
										v-for="filter in filterList" 
										:key="filter.id" 
										:value="filter.id">{{filter.name}}</option>
								</b-form-select>
								<b-badge @click="editServiceUnidad = false; form.unidad = editedService.unidad"  
										class='badge-pill badge-danger badge-action float-right m-1'>
									<i class="fa fa-close"></i>
								</b-badge>
								<b-badge @click="editServiceUnidad = false; editedService.unidad = form.unidad"  
										class='badge-pill badge-success badge-action float-right m-1'>
									<i class="fa fa-check"></i>
								</b-badge>
							</div>
							<p class="validation-error" v-if="!$v.editedService.unidad.required">{{validationText.req}}</p>
						</b-form-group>

						<b-form-group label="Subunidad"
								label-for="sSubunidad"
								:label-cols="3"
								:horizontal="true">
							<div v-if="editServiceSubunidad === false"  class="mt-2">
								<p class="d-inline" v-if="editedService.subunidad" >{{namedFilters.subunidad.toString()}}</p>
								<b-badge @click="editServiceSubunidad = true"  class='badge-pill badge-warning badge-action d-inline'>
									<i class="fa fa-pencil"></i>
								</b-badge>
							</div>
							<div v-show="editServiceSubunidad === true" clearfix>
								<b-form-select id="sSubunidad"
									:plain="true"
									v-model="form.subunidad">
									<option v-if="filter.filterType.id === 2" 
											v-for="filter in filterList" 
											:key="filter.id" 
											:value="filter.id">{{filter.name}}</option>
								</b-form-select>
								<b-badge @click="editServiceSubunidad = false; form.subunidad = editedService.subunidad"  class='badge-pill badge-danger badge-action float-right m-1'>
									<i class="fa fa-close"></i>
								</b-badge>
								<b-badge @click="editServiceSubunidad = false; editedService.subunidad = form.subunidad "  
										class='badge-pill badge-success badge-action float-right m-1'>
									<i class="fa fa-check"></i>
								</b-badge>	
							</div>
						</b-form-group>

						<b-form-group
								label="Tipo de Servicio"
								label-for="sTipo"
								:label-cols="3"
								:horizontal="true">
							<div v-if="editServiceTipo === false"  class="mt-2">
								<p class="d-inline">{{ namedFilters.tipo.toString() }} </p> 
								<b-badge @click="editServiceTipo = true"  class='badge-pill badge-warning badge-action d-inline'>
									<i class="fa fa-pencil"></i>
								</b-badge>
							</div>
							<div v-show="editServiceTipo === true" clearfix>
								<b-form-select id="sTipo"
									:plain="true"
									:multiple="true"
									v-model="form.tipo">
									<option v-if="filter.filterType.id === 3" 
											v-for="filter in filterList" 
											:key="filter.id" 
											:value="filter.id">{{filter.name}}</option>
								</b-form-select>
								<b-badge @click="editServiceTipo = false; form.tipo=editedService.tipo" class='badge-pill badge-danger badge-action float-right m-1'>
									<i class="fa fa-close"></i>
								</b-badge>
								<b-badge @click="editServiceTipo = false; editedService.tipo= form.tipo "  
										class='badge-pill badge-success badge-action float-right m-1'>
									<i class="fa fa-check"></i>
								</b-badge>
							</div>
							<p class="validation-error" v-if="!$v.editedService.tipo.required">{{validationText.req}}</p>
						</b-form-group>

						<b-form-group
								label="Sector al que esta destinado"
								label-for="sSector"
								:label-cols="3"
								:horizontal="true">
							<div v-if="editServiceSector === false" class="mt-2">
								<p class="d-inline" >{{namedFilters.sector.toString()}} </p> 
								<b-badge @click="editServiceSector = true"  class='badge-pill badge-warning badge-action d-inline'>
									<i class="fa fa-pencil"></i>
								</b-badge>
							</div>
							<div v-show="editServiceSector === true" clearfix>
								<b-form-select id="sSector"
									:plain="true"
									:multiple="true"
									v-model="form.sector">
										<option v-if="filter.filterType.id === 4" 
												v-for="filter in filterList" 
												:key="filter.id" 
												:value="filter.id">{{filter.name}}</option>
								</b-form-select>

								<b-badge @click="editServiceSector = false; form.sector = editedService.sector"  class='badge-pill badge-danger badge-action float-right m-1'>
									<i class="fa fa-close"></i>
								</b-badge>
								<b-badge @click="editServiceSector = false; editedService.sector= form.sector  "  
										class='badge-pill badge-success badge-action float-right m-1'>
									<i class="fa fa-check"></i>
								</b-badge>
							</div>
							<p class="validation-error" v-if="!$v.editedService.sector.required">{{validationText.req}}</p>
						</b-form-group>

						<b-form-group
								label="Destinatario"
								label-for="sDestinatario"
								:label-cols="3"
								:horizontal="true">
							<div v-if="editServiceDestinatario === false"  class="mt-2">
								<p class="d-inline">{{namedFilters.destinatario.toString()}} </p> 
								<b-badge @click="editServiceDestinatario = true"  class='badge-pill badge-warning badge-action d-inline'>
										<i class="fa fa-pencil"></i>
								</b-badge>
							</div>
							<div v-show="editServiceDestinatario === true" clearfix>
								<b-form-select id="sDestinatario"
									:plain="true"
									:multiple="true"
									v-model="form.destinatario">
									<option v-if="filter.filterType.id === 5" 
											v-for="filter in filterList" 
											:key="filter.id" 
											:value="filter.id">{{filter.name}}</option>
								</b-form-select>
								<b-badge @click="editServiceDestinatario = false; form.destinatario = editedService.destinatario"  class='badge-pill badge-danger badge-action float-right m-1'>
									<i class="fa fa-close"></i>
								</b-badge>
								<b-badge @click="editServiceDestinatario = false; editedService.destinatario= form.destinatario  "  
										class='badge-pill badge-success badge-action float-right m-1'>
									<i class="fa fa-check"></i>
								</b-badge>
							</div>
							<p class="validation-error" v-if="!$v.editedService.destinatario.required">{{validationText.req}}</p>
						</b-form-group>

						<b-form-group
								label="Descripción"
								label-for="sDescription"
								:label-cols="3"
								:horizontal="true">
							<div v-if="editServiceDescripcion === false" class="mt-2">
								<p  class="d-inline">{{editedService.description}}</p> 
								<b-badge @click="editServiceDescripcion = true"  class='badge-pill badge-warning badge-action  d-inline'>
									<i class="fa fa-pencil"></i>
								</b-badge>
							</div>
							<div v-show="editServiceDescripcion === true" clearfix>
								<b-form-textarea id="sDescription" 
											:rows="4" 
											v-model="form.description"
											placeholder="Escribe descipción del servicio">
								</b-form-textarea>
								<b-badge @click="editServiceDescripcion = false; form.description"  class='badge-pill badge-danger badge-action float-right m-1'>
									<i class="fa fa-close"></i>
								</b-badge>
								<b-badge @click="editServiceDescripcion = false; editedService.description = form.description"  
										class='badge-pill badge-success badge-action float-right m-1'>
									<i class="fa fa-check"></i>
								</b-badge>
							</div>
							<p class="validation-error" v-if="!$v.editedService.description.required">{{validationText.req}}</p>
						</b-form-group>
					
						<b-form-group
								description=""
								label="Contacto"
								label-for="sContacto"
								:label-cols="3"
								:horizontal="true">
							<div v-if="editServiceContacto === false" class="mt-2">
								<p class="d-inline">{{editedService.contacto}} </p> 
								<b-badge @click="editServiceContacto = true"  class='badge-pill badge-warning badge-action d-inline'>
									<i class="fa fa-pencil"></i>
								</b-badge>
							</div>
							<div v-show="editServiceContacto === true" clearfix>
								<b-form-input id="sContacto" 
										type="text"
										placeholder=""
										v-model="form.contacto">
								</b-form-input>
								<b-badge @click="editServiceContacto = false; form.contacto=''"  class='badge-pill badge-danger badge-action float-right m-1'>
									<i class="fa fa-close"></i>
								</b-badge>
								<b-badge @click="editServiceContacto = false; editedService.contacto = form.contacto"  
										class='badge-pill badge-success badge-action float-right m-1'>
									<i class="fa fa-check"></i>
								</b-badge>
							</div>
							<p class="validation-error" v-if="!$v.editedService.contacto.required">{{validationText.req}}</p>
							<p class="validation-error" v-if="!$v.editedService.contacto.minLength">{{validationText.contacto.min}}</p>
							<p class="validation-error" v-if="!$v.editedService.contacto.maxLength">{{validationText.contacto.max}}</p>
						</b-form-group>

						<b-form-group
								description=""
								label="Email de contacto"
								label-for="sEmail"
								:label-cols="3"
								:horizontal="true">
							<div v-if="editServiceEmail === false" class="mt-2">
								<p  class="d-inline">{{editedService.email}} </p> 
								<b-badge @click="editServiceEmail = true"  class='badge-pill badge-warning badge-action  d-inline'>
									<i class="fa fa-pencil"></i>
								</b-badge>
							</div>
							<div v-show="editServiceEmail === true">
								<b-form-input id="sEmail" type="email" placeholder="Ingrese mail de contacto" autocomplete="email" v-model="form.email"></b-form-input>
								<b-badge @click="editServiceEmail = false; form.email=''"  class='badge-pill badge-danger badge-action float-right m-1'>
									<i class="fa fa-close"></i>
								</b-badge>
								<b-badge @click="editServiceEmail = false; editedService.email = form.email"  
										class='badge-pill badge-success badge-action float-right m-1'>
									<i class="fa fa-check"></i>
								</b-badge>
							</div>
							<p class="validation-error" v-if="!$v.editedService.email.required">{{validationText.req}}</p>
							<p class="validation-error" v-if="!$v.editedService.email.email">{{validationText.email}}</p>
						</b-form-group>
				
							<b-form-group
									description=""
									label="Web de contacto"
									label-for="sWeb"
									:label-cols="3"
									:horizontal="true">
								<div v-if="editServiceWeb === false" class="mt-2">
									<p  class="d-inline">{{editedService.web}} </p> 
									<b-badge @click="editServiceWeb = true"  class='badge-pill badge-warning badge-action  d-inline'>
										<i class="fa fa-pencil"></i>
									</b-badge>
								</div>
								<div v-show="editServiceWeb === true">
									<b-form-input id="sWeb"  placeholder="Ingrese web de contacto" v-model="form.web"></b-form-input>
									<b-badge @click="editServiceWeb = false; form.web=''"  class='badge-pill badge-danger badge-action float-right m-1'>
										<i class="fa fa-close"></i>
									</b-badge>
									<b-badge @click="editServiceWeb = false; editedService.web = form.web"  
											class='badge-pill badge-success badge-action float-right m-1'>
										<i class="fa fa-check"></i>
									</b-badge>
								</div>
								<p class="validation-error" v-if="!$v.editedService.web.required">{{validationText.req}}</p>
							</b-form-group>
					
							<b-form-group label="Telefono de contacto"
									description=""
									label-for="sTel"
									:label-cols="3"
									:horizontal="true">
								<div v-if="editServiceTelefono === false"  class="mt-2">
									<p class="d-inline">{{editedService.tel}} </p> 
									<b-badge @click="editServiceTelefono = true"  class='badge-pill badge-warning badge-action  d-inline'>
										<i class="fa fa-pencil"></i>
									</b-badge>
								</div>
								<div v-show="editServiceTelefono === true" clearfix>
									<b-form-input id="sTel" type="text" placeholder="" v-model="form.tel"></b-form-input>
									<b-badge @click="editServiceTelefono = false; form.tel=''"  class='badge-pill badge-danger badge-action float-right m-1'>
										<i class="fa fa-close"></i>
									</b-badge>
									<b-badge @click="editServiceTelefono = false; editedService.tel = form.tel"  
											class='badge-pill badge-success badge-action float-right m-1'>
											<i class="fa fa-check"></i>
									</b-badge>
								</div>
								<p class="validation-error" v-if="!$v.editedService.tel.required">{{validationText.req}}</p>
							</b-form-group>

							<b-form-group label="Direccion de contacto"
									description=""
									label-for="sDir"
									:label-cols="3"
									:horizontal="true">
								<div v-if="editServiceDireccion === false" class="mt-2">
									<p  class="d-inline">{{editedService.dir}}</p> 
									<b-badge @click="editServiceDireccion = true"  class='badge-pill badge-warning badge-action d-inline'>
										<i class="fa fa-pencil"></i>
									</b-badge>
								</div>
								<div v-show="editServiceDireccion === true" clearfix>
									<b-form-input id="sDir" type="text" placeholder="" v-model="form.dir"></b-form-input>
									<b-badge @click="editServiceDireccion = false; form.dir = ''"  
											class='badge-pill badge-danger badge-action float-right m-1'>
										<i class="fa fa-close"></i>
									</b-badge>
									<b-badge @click="editServiceDireccion = false; editedService.dir = form.dir"  
											class='badge-pill badge-success badge-action float-right m-1'>
										<i class="fa fa-check"></i>
									</b-badge>
								</div>
								<p class="validation-error" v-if="!$v.editedService.dir.required">{{validationText.req}}</p>
								<p class="validation-error" v-if="!$v.editedService.dir.minLength">{{validationText.dir.min}}</p>
								<p class="validation-error" v-if="!$v.editedService.dir.maxLength">{{validationText.dir.max}}</p>

							</b-form-group>
							<p v-if="invalidForm" class="alert-danger">No pueden guardarse los cambios </p>
							<p v-if="loaded" class="alert-success">El servicio se ha editado exitosamente </p>
							<div class="clearfix">
							<b-button type="submit" variant="success" class="float-right m-1"  :disabled="$v.editedService.$invalid">
								<span v-if="!loading"> Guardar cambios </span>
								<i v-if="loading" class="fa fa-spinner fa-spin fa-fw"></i>
							</b-button>
							<b-button type="cancel" class="float-right m-1" @click="cancel()">Cancelar </b-button>
							</div>
						</b-form>
	        	</b-card>
	      	</b-col>
	    </b-row>
	</div>
</template>

<script>
import store from '../store'
import { maxLength , minLength , required, email, url, alpha } from 'vuelidate/lib/validators'

export default {
	name: 'AdminEditServicio',
	data() {
		return {
			form: {
				name: this.$store.state.service.data.name,
				unidad: this.$store.getters.serviceFilters[0][0],
				subunidad: this.$store.getters.serviceFilters[1][0],
				tipo: this.$store.getters.serviceFilters[2],
				sector: this.$store.getters.serviceFilters[3],
				destinatario: this.$store.getters.serviceFilters[4], //falta agregar a db
				contacto: this.$store.state.service.data.contact_name,
				email: this.$store.state.service.data.email,
				tel: this.$store.state.service.data.phone,
				dir: this.$store.state.service.data.address,
				description: this.$store.state.service.data.description,
				web: this.$store.state.service.data.website,
				filters: []
			},
			editedService: {
				id:  this.$store.state.service.data.id, 
				name: this.$store.state.service.data.name,
				unidad: this.$store.getters.serviceFilters[0],
				subunidad: this.$store.getters.serviceFilters[1],
				tipo: this.$store.getters.serviceFilters[2],
				sector: this.$store.getters.serviceFilters[3],
				destinatario: this.$store.getters.serviceFilters[4], //falta agregar a db
				contacto: this.$store.state.service.data.contact_name,
				email: this.$store.state.service.data.email,
				tel: this.$store.state.service.data.phone,
				dir: this.$store.state.service.data.address,
				description: this.$store.state.service.data.description,
				web: this.$store.state.service.data.website,
				oldFilters: [],
				newFilters: []
			},
			editServiceName: false,
			editServiceUnidad: false,
			editServiceSubunidad: false,
			editServiceTipo: false,
			editServiceSector: false,
			editServiceDestinatario: false,
			editServiceDescripcion: false,
			editServiceContacto: false,
			editServiceWeb: false,
			editServiceEmail: false,
			editServiceTelefono: false,
			editServiceDireccion: false,
			editedFields: [],
			loading: false,
			loaded: false,
			validationText:{
				req: "Este campo no puede quedar vacío",
				name: {
					min: "El nombre del servicio debe tener por lo menos 5 caracteres",
					max: "El nombre del servicio debe tener como máximo 150 caracteres", 
				},
				contacto: {
					min: "El nombre de contacto debe tener por lo menos 4 caracteres",
					max: "El nombre de contacto debe tener como máximo 60 caracteres", 
				},
				dir: {
					min: "La dirección debe tener por lo menos 10 caracteres",
					max: "La dirección debe tener como máximo 100 caracteres", 
				},
				description: {
					min: "La descripción debe tener por lo menos 10 caracteres",
					max: "La descripción debe tener como máximo 300 caracteres", 
				},
				email: "Ingrese un email de contacto válido",
				url: "Ingrese una web de contacto válida"
			},
			invalidForm: false,
		}
	},
	beforeRouteEnter (to, from, next) {
		store.dispatch('fetchService', to.query.id).then(() =>{
			next();
		});
	},
	befoteRouteUpdate(to, from, next){
		store.dispatch('fetchService', to.query.id).then(() =>{
			next();
		});
	},
	validations:{
		editedService: {
			name: {
				minLength: minLength(5),
       			maxLength: maxLength(150),
				required
			},
			unidad: {required},
			tipo: {required},
			sector: {required},
			destinatario: {required},
			contacto: {
				required,
				minLength: minLength(4),
       			maxLength: maxLength(60),
			},
			email: { required , email },
			tel: {required},
			dir: {
				required,  
				minLength: minLength(10),
				maxLength: maxLength(100),
			},
			web: {required},
			description: {
				minLength: minLength(10),
      			maxLength: maxLength(300),
				required
			},
		},
	},
	computed:{
		filterTypes(){
		    return this.$store.state.filterTypes;
		},
		filterList(){
			return this.$store.state.filterList;
		},
		service() {
			return this.$store.state.service.data;
		},
		id(){
			return this.$route.query.id;
		},
		filters(){
			return this.$store.getters.serviceFilters;
		},
		namedFilters(){
			var that = this;
			var names = {
				unidad: [],
				subunidad: [],
				tipo : [],
				sector: [],
				destinatario: []
			};
			if (this.editedService.unidad.constructor === Array) {
				this.editedService.unidad.forEach(function(e){
					names.unidad.push(that.filterList.find(x => x.id === e).name);
				});
			} else {
				if (that.filterList.find(x => x.id === this.editedService.unidad) != undefined){
					names.unidad.push(that.filterList.find(x => x.id === this.editedService.unidad).name);
				};
			};
			
			if (this.editedService.subunidad.constructor === Array) {
				this.editedService.subunidad.forEach(function(e){
					names.subunidad.push(that.filterList.find(x => x.id === e).name);
				});
			} else {
				if (that.filterList.find(x => x.id === this.editedService.subunidad) != undefined){
					names.subunidad.push(that.filterList.find(x => x.id === this.editedService.subunidad).name);
				};	
			};
			
			if (this.editedService.tipo.length > 0){
				this.editedService.tipo.forEach(function(e){
					names.tipo.push(that.filterList.find(x => x.id === e).name);
				});
			}
			if (this.editedService.sector.length > 0){
				this.editedService.sector.forEach(function(e){
					names.sector.push(that.filterList.find(x => x.id === e).name);
				});
			}
			if (this.editedService.destinatario.length > 0){
				this.editedService.destinatario.forEach(function(e){
					names.destinatario.push(that.filterList.find(x => x.id === e).name);
				});
			}
			return names;
		}
	}, 
	methods: {
		validateEditedService(evt){
			evt.preventDefault();
			this.$v.editedService.$touch();
			if (this.$v.editedService.$invalid) {
				console.log('ERROR');
				this.invalidForm = true;
				setTimeout(() => {
					this.invalidForm = false;
				}, 2500);			
			} else {
				this.invalidForm = false;
				this.loading = true;
				this.submitEditedService(evt);
			}

		},
		submitEditedService(evt){
			evt.preventDefault();
			var newFilters = this.form.tipo.concat(this.form.sector).concat(this.form.destinatario);
			newFilters.push(this.form.unidad);
			newFilters.push(this.form.subunidad);
			this.editedService.newFilters = newFilters;
			var oldFilters = this.$store.getters.serviceFilters[2].concat(this.$store.getters.serviceFilters[3])
						.concat(this.$store.getters.serviceFilters[4])
						.concat(this.$store.getters.serviceFilters[0])
						.concat(this.$store.getters.serviceFilters[1]);
			this.editedService.oldFilters = oldFilters;

			this.$store.dispatch('editService',this.editedService).then(response => {
				this.loaded = true;
				this.loading = false;
				this.$router.push({name: 'Servicios'});
			});	
		},
		cancel(){
			//MODAL => SEGURO QUE QUIERES ABANDONAR LOS CAMBIOS
			this.$router.push({name: 'Servicios'});
		}
	}
}
</script>

<style scoped>
.edited{ 
	font-style: italic;
	color: #337020 !important;
}
</style>