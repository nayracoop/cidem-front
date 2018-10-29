<template>
	<div class="animated fadeIn">
		<b-row>
	      	<b-col md="8" offset="2">
	        	<b-card>
					<div slot="header">
						<strong>Ver / Editar Servicio  /// b-select default :value = filtro original </strong>
					</div>
	          	<b-form>
					<b-form-group label="Nombre del servicio"
							description=""
							label-for="sName"
							:label-cols="3"
							:horizontal="true">
						<div v-if="editServiceName === false">
							<p class="d-inline" :class="{edited:editedFields.includes('name')}">{{service.name}}</p> 
							<b-badge @click="editServiceName = true"  
									class='badge-pill badge-warning badge-action'>
								<i class="fa fa-pencil"></i>
							</b-badge>
						</div>
						<div v-show="editServiceName === true">
							<b-form-input id="sName" 
										type="text" 
										placeholder="Inserte nuevo nombre del servicio"
										v-model="form.name">
							</b-form-input>
							<b-badge @click="editServiceName = false"  
									class='badge-pill badge-danger badge-action'>
								<i class="fa fa-close"></i>
							</b-badge>
							<b-badge @click="editServiceName = false; editedFields.push('name')"  
									class='badge-pill badge-success badge-action'>
								<i class="fa fa-check"></i>
							</b-badge>
						</div>
					</b-form-group>

					<b-form-group label="Unidad"
							description=""
							label-for="sUnidad"
							:label-cols="3"
							:horizontal="true">
						<div v-if="editServiceUnidad === false" >
							<p class="d-inline" v-if="form.unidad">unidad</p>
							<b-badge @click="editServiceUnidad = true"  
							class='badge-pill badge-warning badge-action'>
								<i class="fa fa-pencil"></i>
							</b-badge>
						</div>
						<div v-show="editServiceUnidad === true">
							<b-badge @click="editServiceUnidad = false"  
									class='badge-pill badge-danger badge-action'>
								<i class="fa fa-close"></i>
							</b-badge>
							<b-badge @click="editServiceUnidad = false"  
									class='badge-pill badge-success badge-action'>
								<i class="fa fa-check"></i>
							</b-badge>
							<b-form-select id="sUnidad"
								:plain="true"
								v-model="form.unidad">
								<option v-if="filter.filterType.id === 1" 
									v-for="filter in filterList" 
									:key="filter.id" 
									:value="filter.id">{{filter.name}}</option>
							</b-form-select>
						</div>
					</b-form-group>

					<b-form-group label="Subunidad"
							label-for="sSubunidad"
							:label-cols="3"
							:horizontal="true">
						<div v-if="editServiceSubunidad === false" class="d-flex">
							<p v-if="form.subunidad" >subunidad</p>
							<b-badge @click="editServiceSubunidad = true"  class='badge-pill badge-warning badge-action'>
								<i class="fa fa-pencil"></i>
							</b-badge>
						</div>
						<div v-show="editServiceSubunidad === true">
							<b-badge @click="editServiceSubunidad = false"  class='badge-pill badge-danger badge-action'>
								<i class="fa fa-close"></i>
							</b-badge>
							<b-badge @click="editServiceUnidad = false"  
									class='badge-pill badge-success badge-action'>
								<i class="fa fa-check"></i>
							</b-badge>
							<b-form-select id="sSubunidad"
								:plain="true"
								v-model="form.subunidad">
								<option v-if="filter.filterType.id === 2" 
										v-for="filter in filterList" 
										:key="filter.id" 
										:value="filter.id">{{filter.name}}</option>
							</b-form-select>
						</div>
					</b-form-group>

					<b-form-group
							label="Tipo de Servicio"
							label-for="sTipo"
							:label-cols="3"
							:horizontal="true">
						<div v-if="editServiceTipo === false" >
							<p v-if="form.tipo" class="d-inline">tipo</p> 
							<b-badge @click="editServiceTipo = true"  class='badge-pill badge-warning badge-action'>
								<i class="fa fa-pencil"></i>
							</b-badge>
						</div>
						<div v-show="editServiceTipo === true">
							<b-badge @click="editServiceTipo = false"  class='badge-pill badge-danger badge-action'>
								<i class="fa fa-close"></i>
							</b-badge>
							<b-badge @click="editServiceUnidad = false"  
									class='badge-pill badge-success badge-action'>
								<i class="fa fa-check"></i>
							</b-badge>
							<b-form-select id="sTipo"
								:plain="true"
								:multiple="true"
								v-model="form.tipo">
								<option v-if="filter.filterType.id === 3" 
										v-for="filter in filterList" 
										:key="filter.id" 
										:value="filter.id">{{filter.name}}</option>
							</b-form-select>
						</div>
	          		</b-form-group>

					<b-form-group
							label="Sector al que esta destinado"
							label-for="sSector"
							:label-cols="3"
							:horizontal="true">
						<div v-if="editServiceSector === false" class="d-flex">
							<p class="d-inline" v-if="form.sector">0</p> 
							<b-badge @click="editServiceSector = true"  class='badge-pill badge-warning badge-action'>
								<i class="fa fa-pencil"></i>
							</b-badge>
						</div>
						<div v-show="editServiceSector === true">
							<b-badge @click="editServiceSector = false"  class='badge-pill badge-danger badge-action'>
								<i class="fa fa-close"></i>
							</b-badge>
							<b-badge @click="editServiceUnidad = false"  
									class='badge-pill badge-success badge-action'>
								<i class="fa fa-check"></i>
							</b-badge>
							<b-form-select id="sSector"
								:plain="true"
								:multiple="true"
								v-model="form.sector">
									<option v-if="filter.filterType.id === 4" v-for="filter in filterList" :key="filter.id" :value="filter.id">{{filter.name}}</option>
							</b-form-select>
						</div>
					</b-form-group>

					<b-form-group
							label="Destinatario"
							label-for="sDestinatario"
							:label-cols="3"
							:horizontal="true">
						<div v-if="editServiceDestinatario === false" class="d-flex">
							<p class="d-inline"> Gobierno local</p> 
							<b-badge @click="editServiceDestinatario = true"  class='badge-pill badge-warning badge-action'>
									<i class="fa fa-pencil"></i>
							</b-badge>
						</div>
						<div v-show="editServiceDestinatario === true">
							<b-badge @click="editServiceDestinatario = false"  class='badge-pill badge-danger badge-action'>
								<i class="fa fa-close"></i>
							</b-badge>
							<b-badge @click="editServiceUnidad = false"  
									class='badge-pill badge-success badge-action'>
								<i class="fa fa-check"></i>
							</b-badge>
							<b-form-select id="sDestinatario"
								:plain="true"
								:multiple="true"
								v-model="form.destinatario">
								<option v-if="filter.filterType.id === 4" 
										v-for="filter in filterList" 
										:key="filter.id" 
										:value="filter.id">{{filter.name}}</option>
							</b-form-select>
						</div>
					</b-form-group>

					<b-form-group
							label="Descripción"
							label-for="sDescription"
							:label-cols="3"
							:horizontal="true">
						<div v-if="editServiceDescripcion === false">
								<b-badge @click="editServiceDescripcion = true"  class='badge-pill badge-warning badge-action'>
									<i class="fa fa-pencil"></i>
								</b-badge>
								<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor neque enim nihil veritatis dolore nemo cumque odit repudiandae deleniti quis omnis eveniet, delectus culpa impedit velit in, inventore voluptas quaerat.</p> 
						</div>
						<div v-show="editServiceDescripcion === true">
							<b-badge @click="editServiceDescripcion = false"  class='badge-pill badge-danger badge-action'>
								<i class="fa fa-close"></i>
							</b-badge>
							<b-badge @click="editServiceUnidad = false"  
									class='badge-pill badge-success badge-action'>
								<i class="fa fa-check"></i>
							</b-badge>
							<b-form-input id="sDescription" 
										:textarea="true" 
										:rows="9" 
										v-model="form.description"
										placeholder="Escribe descipción del servicio">
							</b-form-input>
						</div>
					</b-form-group>
				
					<b-form-group
							description="Nombre del contacto"
							label="Contacto"
							label-for="sContacto"
							:label-cols="3"
							:horizontal="true">
						<div v-if="editServiceContacto === false" class="d-flex">
							<b-badge @click="editServiceContacto = true"  class='badge-pill badge-warning badge-action'>
								<i class="fa fa-pencil"></i>
							</b-badge>
							<p>Señor servicio numoero uno</p> 
						</div>
						<div v-show="editServiceContacto === true">
							<b-badge @click="editServiceContacto = false"  class='badge-pill badge-danger badge-action'>
								<i class="fa fa-close"></i>
							</b-badge>
							<b-badge @click="editServiceUnidad = false"  
									class='badge-pill badge-success badge-action'>
								<i class="fa fa-check"></i>
							</b-badge>
							<b-form-input id="sContacto" 
									type="text"
									placeholder=""
									v-model="form.contacto">
									
							</b-form-input>
						</div>
	        		</b-form-group>

	          		<b-form-group
							description=""
							label="Email de contacto"
							label-for="sEmail"
							:label-cols="3"
							:horizontal="true">
						<div v-if="editServiceEmail === false" class="d-flex">
							<p>Señor servicio numoero uno</p> 
							<b-badge @click="editServiceEmail = true"  class='badge-pill badge-warning badge-action'>
								<i class="fa fa-pencil"></i>
							</b-badge>
						</div>
						<div v-show="editServiceEmail === true">
								<b-badge @click="editServiceEmail = false"  class='badge-pill badge-danger badge-action'>
									<i class="fa fa-close"></i>
								</b-badge>
								<b-badge @click="editServiceUnidad = false"  
										class='badge-pill badge-success badge-action'>
									<i class="fa fa-check"></i>
								</b-badge>
							<b-form-input id="sEmail" type="email" placeholder="Ingrese mail de contacto" autocomplete="email"></b-form-input>
						</div>
	          </b-form-group>
	        
				
						<b-form-group label="Telefono de contacto"
								description=""
								label-for="sTel"
								:label-cols="3"
								:horizontal="true">
							<div v-if="editServiceTelefono === false" class="d-flex">
								<p>Señor servicio numoero uno</p> 
								<b-badge @click="editServiceTelefono = true"  class='badge-pill badge-warning badge-action'>
									<i class="fa fa-pencil"></i>
								</b-badge>
							</div>
							<div v-show="editServiceTelefono === true">
								<b-badge @click="editServiceTelefono = false"  class='badge-pill badge-danger badge-action'>
									<i class="fa fa-close"></i>
								</b-badge>
								<b-badge @click="editServiceUnidad = false"  
										class='badge-pill badge-success badge-action'>
										<i class="fa fa-check"></i>
								</b-badge>
								<b-form-input id="sTel" type="text" placeholder=""></b-form-input>
							</div>
	        			</b-form-group>

						<b-form-group label="Direccion de contacto"
								description=""
								label-for="sDir"
								:label-cols="3"
								:horizontal="true">
							<div v-if="editServiceDireccion === false" class="d-flex">
								<p>Señor servicio numoero uno</p> 
								<b-badge @click="editServiceDireccion = true"  class='badge-pill badge-warning badge-action'>
									<i class="fa fa-pencil"></i>
								</b-badge>
							</div>
							<div v-show="editServiceDireccion === true">
								<b-badge @click="editServiceDireccion = false"  
										class='badge-pill badge-danger badge-action'>
									<i class="fa fa-close"></i>
								</b-badge>
								<b-badge @click="editServiceUnidad = false"  
										class='badge-pill badge-success badge-action'>
									<i class="fa fa-check"></i>
								</b-badge>
	            				<b-form-input id="sDir" type="text" placeholder=""></b-form-input>
							</div>
	        			</b-form-group>

		 			</b-form>
	        	</b-card>
	      	</b-col>
	    </b-row>
	</div>
</template>

<script>
import store from '../store'

export default {
	name: 'AdminEditServicio',
	data() {
		return {
			form: {
				name: '',
				unidad: this.$store.getters.serviceFilters[0][0],
				subunidad: this.$store.getters.serviceFilters[1][0],
				tipo: this.$store.getters.serviceFilters[2],
				sector: this.$store.getters.serviceFilters[3],
				destinatario: [], //falta agregar a db
				contacto: '',
				email: '',
				tel: '',
				dir: '',
				description: '',
				filters: []
			},
			editServiceName: false,
			editServiceUnidad: false,
			editServiceSubunidad: false,
			editServiceTipo: false,
			editServiceSector: false,
			editServiceDestinatario: false,
			editServiceDescripcion: false,
			editServiceContacto: false,
			editServiceEmail: false,
			editServiceTelefono: false,
			editServiceDireccion: false,
			editedFields: [],
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
	mounted(){
		console.log(this.filters);
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
		}
	},
	
}
</script>

<style scoped>
.edited{ 
	text-transform: uppercase;
	color: #337020 !important;
}
</style>