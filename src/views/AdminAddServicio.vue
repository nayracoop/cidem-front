<template>
	<div class="animated fadeIn">
		<b-row>
			<b-col class="col-12">
				<b-card class="clearfix">
					<div slot="header">
						<strong>Crear Nuevo Servicio</strong>
					</div>
					<b-form id="newService" @submit="submit($event)" class="row clearfix"> 
						<div class="col-7">
							<b-form-group label="Nombre del servicio"
									description=""
									label-for="sName"
									:label-cols="3"
									:horizontal="true">
								<b-form-input id="sName" 
											type="text" 
											placeholder="Nombre del servicio"
											required
											v-model="form.name">
								</b-form-input>
							</b-form-group>
						
							<b-form-group label="Unidad"
									description=""
									label-for="sUnidad"
									:label-cols="3"
									:horizontal="true">
								<b-form-select id="sUnidad"
												:plain="true"
												required 
												v-model="form.unidad"
												placeholder="Selecciona una unidad">
									<option v-if="filter.filterType.id === 1" 
											v-for="filter in filterList" 
											:key="filter.id" 
											:value="filter.id">{{filter.name}}</option>
								</b-form-select>
							</b-form-group>

							<b-form-group label="Subunidad"
									label-for="sSubunidad"
									:label-cols="3"
									:horizontal="true">
								<b-form-select id="sSubunidad"
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
											:plain="true"
											:multiple="true"
											required 
											v-model="form.tipo">
									<option v-if="filter.filterType.id === 3" 
											v-for="filter in filterList" 
											:key="filter.id" 
											:value="filter.id">{{filter.name}}</option>
								</b-form-select>
							</b-form-group>

							<b-form-group label="Sector al que esta destinado"
									label-for="sSector"
									:label-cols="3"
									:horizontal="true">
								<b-form-select id="sSector"
											:plain="true"
											:multiple="true"
											required 
											v-model="form.sector">				
									<option v-if="filter.filterType.id === 4" 
											v-for="filter in filterList" 
											:key="filter.id" 
											:value="filter.id">{{filter.name}}</option>
								</b-form-select>
							</b-form-group>

							<b-form-group label="Destinatario"
									label-for="basicMultiSelect"
									:label-cols="3"
									:horizontal="true">
								<b-form-select id="basicMultiSelect"
											:plain="true"
											:multiple="true"
											required 
											v-model="form.destinatario">
									<option v-if="filter.filterType.id === 5"
											v-for="filter in filterList" 
											:key="filter.id" 
											:value="filter.id">{{filter.name}}</option>
								</b-form-select>		
							</b-form-group>

							<b-form-group label="Descripción"
									label-for="sDescripcion"
									:label-cols="3"
									:horizontal="true">
								<b-form-textarea id="sDescripcion" 
												:textarea="true" 
												rows="3" 
												placeholder="Escribe descipción del servicio"
												required 
												v-model="form.description">
								</b-form-textarea>
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
											class="mt-3" 
											type="text" 
											placeholder="Ingresa el nombre de la persona de contacto"
											required 
											v-model="form.contacto">
								</b-form-input>
							</b-form-group>

							<b-form-group label="Email"
								description=""
								label-for="sEmail"
								label-cols="3"
								:horizontal="true">	
									<b-form-input id="sEmail" 
												type="email" 
												placeholder="Ingresa el email de contacto" 
												autocomplete="email"
												required 
												v-model="form.email">
									</b-form-input>
							</b-form-group>

							
							<b-form-group label="Web"
								description=""
								label-for="sWeb"
								:label-cols="3"
								:horizontal="true">	
									<b-form-input id="sWeb" 
												type="website" 
												placeholder="Ingresa la pagina web de contacto" 
												autocomplete="website"
												required 
												v-model="form.website">
									</b-form-input>
							</b-form-group>
							
							<b-form-group label="Telefono"
								description=""
								label-for="sTel"
								:label-cols="3"
								:horizontal="true">
									<b-form-input id="sTel" 
												type="text" 
												placeholder="Ingresa el telefono de contacto"
												required 
												v-model="form.tel">
									</b-form-input>
							</b-form-group>

							<b-form-group label="Direccion"
									description=""
									label-for="sDir"
									class="mb-5"
									:horizontal="true">
								<b-form-input id="sDir" 
												type="text" 
												placeholder="Ingresa la direccion de contacto"
												required 
												v-model="form.dir">
								</b-form-input>				
							</b-form-group>
						<b-button class="submitbtn" type="submit" variant="success">Crear nuevo servicio</b-button>
		
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

export default {
	name: 'AdminAddServicio',
	data() {
		return {
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
		}
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
		submit(evt){
			evt.preventDefault();
			
			var filters = this.form.tipo.concat(this.form.sector).concat(this.form.destinatario);
			filters.push(this.form.unidad);
			filters.push(this.form.subunidad);
			this.form.filters = filters;
			store.dispatch('postNewService', this.form).then(response => {
				this.createdService = response;
				console.log(this.createdService);
				this.filters = this.form.filters;
				this.createdModal = true;
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
	margin-top: 160px !important;
	padding: 0.8em !important;
	font: 1.3em !important;
}
</style>