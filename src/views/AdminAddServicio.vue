<template>
	<div class="animated fadeIn">
		<b-row>
			<b-col class="col-12">
				<b-card class="clearfix">
					<div slot="header">
						<i class="icon-plus mr-2"></i>Crear Nuevo Servicio
					</div>
					<b-form id="newService" @submit="validate($event)" class="row clearfix"> 
						<div class="col-7">
							<b-form-group label="Nombre del servicio"
									description=""
									label-for="sName"
									:label-cols="3"
									:horizontal="true">
								<b-form-input id="sName" 
											class="mt-2"
											type="text" 
											placeholder="Nombre del servicio"
											v-model="form.name">
								</b-form-input>
								<p class="validation-error" v-show="!$v.form.name.minLength">{{validationText.name.min}}</p>
          						<p class="validation-error" v-show="!$v.form.name.maxLength">{{validationText.name.max}}</p>
								<p class="validation-error" v-show="!$v.form.name.required">{{validationText.req}}</p>
							</b-form-group>
						
							<b-form-group label="Unidad"
									description=""
									label-for="sUnidad"
									:label-cols="3"
									:horizontal="true">
								<b-form-select id="sUnidad"
												class="mt-2"
												:plain="true"
												v-model="form.unidad"
												placeholder="Selecciona una unidad">
									<option v-if="filter.filterType.id === 1" 
											v-for="filter in filterList" 
											:key="filter.id" 
											:value="filter.id">{{filter.name}}</option>
								</b-form-select>
								<p class="validation-error" v-show="!$v.form.unidad.required">{{validationText.req}}</p>
							</b-form-group>

							<b-form-group label="Subunidad"
									label-for="sSubunidad"
									:label-cols="3"
									:horizontal="true">
								<b-form-select id="sSubunidad"
											class="mt-2"
											:plain="true"
											v-model="form.subunidad"
											placeholder="Selecciona una subunidad">
									<option v-if="filter.filterType.id === 2" 
											v-for="filter in filterList" 
											:key="filter.id" 
											:value="filter.id">{{filter.name}}</option>
								</b-form-select>
							</b-form-group>

							<b-form-group label="Tipo de Servicio"
									label-for="sTipo"
									:label-cols="3"
									:horizontal="true">
								<b-form-select id="sTipo"
											class="mt-2"
											:plain="true"
											:multiple="true"
											v-model="form.tipo">
									<option v-if="filter.filterType.id === 3" 
											v-for="filter in filterList" 
											:key="filter.id" 
											:value="filter.id">{{filter.name}}</option>
								</b-form-select>
								<p class="validation-error" v-show="!$v.form.tipo.required">{{validationText.req}}</p>
							</b-form-group>

							<b-form-group label="Sector al que esta destinado"
									label-for="sSector"
									:label-cols="3"
									:horizontal="true">
								<b-form-select id="sSector"
											class="mt-2"
											:plain="true"
											:multiple="true"
											v-model="form.sector">				
									<option v-if="filter.filterType.id === 4" 
											v-for="filter in filterList" 
											:key="filter.id" 
											:value="filter.id">{{filter.name}}</option>
								</b-form-select>
								<p class="validation-error" v-show="!$v.form.sector.required">{{validationText.req}}</p>
							</b-form-group>

							<b-form-group label="Destinatario"
									label-for="basicMultiSelect"
									:label-cols="3"
									:horizontal="true">
								<b-form-select id="basicMultiSelect"
											class="mt-2"
											:plain="true"
											:multiple="true" 
											v-model="form.destinatario">
									<option v-if="filter.filterType.id === 5"
											v-for="filter in filterList" 
											:key="filter.id" 
											:value="filter.id">{{filter.name}}</option>
								</b-form-select>
								<p class="validation-error" v-show="!$v.form.destinatario.required">{{validationText.req}}</p>		
							</b-form-group>

							<b-form-group label="Descripción"
									label-for="sDescripcion"
									:label-cols="3"
									:horizontal="true">
								<b-form-textarea id="sDescripcion" 
												class="mt-2"
												:textarea="true" 
												rows="3" 
												placeholder="Escribe descipción del servicio"
												v-model="form.description">
								</b-form-textarea>
								<p class="validation-error" v-show="!$v.form.description.required">{{validationText.req}}</p>
								<p class="validation-error" v-show="!$v.form.description.minLength">{{validationText.description.min}}</p>
          						<p class="validation-error" v-show="!$v.form.description.maxLength">{{validationText.description.max}}</p>
							</b-form-group>
						</div>
						<div class="col-5">
							<h5 class="mt-5"> Información de contacto </h5>

							<b-form-group label="Persona de contacto"
									description=""	
									label-for="sContacto"
									:label-cols="3"
									:horizontal="true">
								<b-form-input id="sContacto"
											class="mt-2" 
											type="text" 
											placeholder="Ingresa el nombre de la persona de contacto"
											v-model="form.contacto">
								</b-form-input>
								<p class="validation-error" v-show="!$v.form.contacto.required">{{validationText.req}}</p>
								<p class="validation-error" v-show="!$v.form.contacto.minLength">{{validationText.contacto.min}}</p>
          						<p class="validation-error" v-show="!$v.form.contacto.maxLength">{{validationText.contacto.max}}</p>
							</b-form-group>

							<b-form-group label="Email"
									description=""
									label-for="sEmail"
									label-cols="3"
									:horizontal="true">	
								<b-form-input id="sEmail" 
											class="mt-2"
											type="email" 
											placeholder="Ingresa el email de contacto" 
											autocomplete="email"
											v-model="form.email">
								</b-form-input>
								<p class="validation-error" v-show="!$v.form.email.required">{{validationText.req}}</p>
								<p class="validation-error" v-show="!$v.form.email.email">{{validationText.email}}</p>
							</b-form-group>

							
							<b-form-group label="Web"
								description=""
								label-for="sWeb"
								:label-cols="3"
								:horizontal="true">	
									<b-form-input id="sWeb" 
												class="mt-2"
												placeholder="Ingresa la pagina web de contacto" 
												autocomplete="website"
												v-model="form.website">
									</b-form-input>
									<p class="validation-error" v-show="!$v.form.website.required">{{validationText.req}}</p>
							</b-form-group>
							
							<b-form-group label="Telefono"
								description=""
								label-for="sTel"
								:label-cols="3"
								:horizontal="true">
									<b-form-input id="sTel" 
												class="mt-2"
												type="text" 
												placeholder="Ingresa el telefono de contacto"
												v-model="form.tel">
									</b-form-input>
									<p class="validation-error" v-show="!$v.form.tel.required">{{validationText.req}}</p>
							</b-form-group>

							<b-form-group label="Direccion"
									description=""
									label-for="sDir"
									class="mb-5"
									:horizontal="true">
								<b-form-input id="sDir" 
									class="mt-2"
									type="text" 
									placeholder="Ingresa la direccion de contacto"
									v-model="form.dir">
								</b-form-input>
								<div>
									<p class="validation-error" v-show="!$v.form.dir.required">{{validationText.req}}</p>			
									<p class="validation-error" v-show="!$v.form.dir.minLength">{{validationText.dir.min}}</p>
									<p class="validation-error" v-show="!$v.form.dir.maxLength">{{validationText.dir.max}}</p>
								</div>
							</b-form-group>
						<b-button class="submitbtn" type="submit" variant="success" :disabled="$v.form.$invalid">
							<span v-if="!loading"> Crear nuevo servicio </span>
							<i v-if="loading" class="fa fa-spinner fa-spin fa-fw"></i>
						</b-button>
		
						</div>
					</b-form >
	       		 </b-card>
	      	</b-col>
	    </b-row>
		<b-modal v-if="createdService.name" ok-only :title="'Servicio creado /' + createdService.id" class="modal-success"  v-model="createdModal" size="lg" > 
			<p class="alert-success">El servicio fue creado exitosamente.</p>	
			<h2>{{createdService.name}}</h2>
			<p>{{createdService.description}}</p>
			<h5> Filtros: {{filters.toString()}}</h5>
			<h5>Datos de contacto</h5>
			<ul>
				<li>{{createdService.contact_name}}</li>
				<li>{{createdService.email}}</li>
				<li>{{createdService.phone}}</li>
				<li>{{createdService.address}}</li>
			</ul>
			<template slot="modal-footer">
				<b-button variant="cancel" @click="createdModal=false">Crear otro servicio </b-button>
				<b-button variant="success" @click="confirmed()">Volver al listado </b-button>
			</template>
		</b-modal>
	</div>
</template>

<script>
import store from '../store'
import router from '../router'
import { maxLength , minLength , required, email, url, alpha } from 'vuelidate/lib/validators'


export default {
	name: 'AdminAddServicio',
	data() {
		return {
			loading: false,
			form: {
				name: '',
				unidad: [],
				subunidad: [],
				tipo: [],
				sector: [],
				destinatario: [],
				contacto: '',
				email: '',
				tel: '',
				dir: '',
				website: '',
				description: '',
				filters: []
			},
			createdModal: false,
			createdService: {},
			filters: [],
			validationText:{
				req: "Este campo es obligatorio",
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
	validations:{
		form: {
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
			website: {required},
			description: {
				minLength: minLength(10),
      			maxLength: maxLength(300),
				required
			},
		},
	},
	beforeRouteEnter(to,from,next){
		store.dispatch('fetchServices').then(()=>{
			next();
		});
	},
	beforeRouteUpdate(to,from,next){
		store.dispatch('fetchServices').then(()=>{
			next();
		});
	},
	computed:{
		filterTypes(){
		    return this.$store.state.filterTypes;
		},
		filterList(){
			return this.$store.state.filterList;
		},
	},
	methods:{
		validate(evt){
			evt.preventDefault();
			this.$v.form.$touch();
			if (this.$v.form.$invalid) {
				console.log('ERROR');
				this.invalidForm = true;
				setTimeout(() => {
					this.invalidForm = false;
				}, 2500);			
				} else {
				this.invalidForm = false;
				this.loading = true;
				this.submit(evt);
			}
		},
		submit(evt){
			evt.preventDefault();	
			var filters = this.form.tipo.concat(this.form.sector).concat(this.form.destinatario);
			filters.push(this.form.unidad);
			filters.push(this.form.subunidad);
			this.form.filters = filters;
			store.dispatch('postNewService', this.form).then(response => {
				this.createdService = response;
				this.filters = this.form.filters;
				this.createdModal = true;
				this.loading = false;
				this.form.name= '';
				this.form.unidad= [];
				this.form.subunidad= [];
				this.form.tipo= [];
				this.form.sector= [];
				this.form.destinatario= [];
				this.form.contacto= '';
				this.form.email= '';
				this.form.tel= '';
				this.form.dir= '';
				this.form.website= '';
				this.form.description= '';
				this.form.filters= [];
			});
		},	
		confirmed(){
			router.push({name: "Servicios"});
		},
		
	}
}
</script>

<style>
.submitbtn {
	float: right;
	margin-top: 160px ;
	padding: 0.8em ;
	font: 1.3em;
}
</style>