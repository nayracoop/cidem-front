<template>
	<div class="animated fadeIn">
		<b-row>
	      <b-col md="8" offset="2">
	        <b-card>
	          <div slot="header">
	            <strong>Ver / Editar Servicio  /// b-select default :value = filtro original </strong>
	          </div>
	          <b-form>
				<b-form-group
					description=""
					label="Nombre del servicio"
					label-for="basicText"
					:label-cols="3"
					:horizontal="true">
					<div v-if="editServiceName === false" class="d-flex">
						<b-badge @click="editServiceName = true"  class='badge-pill badge-warning badge-action'>
							<i class="fa fa-pencil"></i>
						</b-badge>
						<p>Señor servicio numoero uno</p> 
					</div>
					<div v-show="editServiceName === true">
						<b-badge @click="editServiceName = false"  class='badge-pill badge-danger badge-action'>
							<i class="fa fa-close"></i>
						</b-badge>
						<b-form-input id="basicText" type="text" placeholder="Nombre del servicio"></b-form-input>
					</div>
				</b-form-group>

				<b-form-group
					label="Unidad"
					description=""
					label-for="basicMultiSelect"
					:label-cols="3"
					:horizontal="true">
					<div v-if="editServiceUnidad === false" class="d-flex">
						<b-badge @click="editServiceUnidad = true"  class='badge-pill badge-warning badge-action'>
							<i class="fa fa-pencil"></i>
						</b-badge>
						<p>tipo de servicio</p> 
					</div>
					<div v-show="editServiceUnidad === true">
						<b-badge @click="editServiceUnidad = false"  class='badge-pill badge-danger badge-action'>
							<i class="fa fa-close"></i>
						</b-badge>
						<b-form-select id="basicMultiSelect"
							:plain="true"
							:multiple="true">
							<option v-if="filter.filterType.id === 1" v-for="filter in filterList" :key="filter.id" :value="filter.id">{{filter.name}}</option>
						</b-form-select>
					</div>
				</b-form-group>

				<b-form-group
					label="Subunidad"
					label-for="basicMultiSelect"
					:label-cols="3"
					:horizontal="true">
					<div v-if="editServiceSubunidad === false" class="d-flex">
						<b-badge @click="editServiceSubunidad = true"  class='badge-pill badge-warning badge-action'>
							<i class="fa fa-pencil"></i>
						</b-badge>
						<p>SUbunidad cidemica</p> 
					</div>
					<div v-show="editServiceSubunidad === true">
						<b-badge @click="editServiceSubunidad = false"  class='badge-pill badge-danger badge-action'>
							<i class="fa fa-close"></i>
						</b-badge>
						<b-form-select id="basicMultiSelect"
							:plain="true"
							:multiple="true">
							<option v-if="filter.filterType.id === 2" v-for="filter in filterList" :key="filter.id" :value="filter.id">{{filter.name}}</option>
						</b-form-select>
					</div>
				</b-form-group>

			  	<b-form-group
					label="Tipo de Servicio"
					label-for="basicMultiSelect"
					:label-cols="3"
					:horizontal="true">
						<div v-if="editServiceTipo === false" class="d-flex">
							<b-badge @click="editServiceTipo = true"  class='badge-pill badge-warning badge-action'>
								<i class="fa fa-pencil"></i>
							</b-badge>
							<p>Señor tipo de numoero uno</p> 
						</div>

						<div v-show="editServiceTipo === true">
							<b-badge @click="editServiceTipo = false"  class='badge-pill badge-danger badge-action'>
								<i class="fa fa-close"></i>
							</b-badge>
							<b-form-select id="basicMultiSelect"
								:plain="true"
								:multiple="true">
								<option v-if="filter.filterType.id === 3" v-for="filter in filterList" :key="filter.id" :value="filter.id">{{filter.name}}</option>

							</b-form-select>
						</div>
	          	</b-form-group>

	          	<b-form-group
					label="Sector al que esta destinado"
					label-for="basicMultiSelect"
					:label-cols="3"
					:horizontal="true">
						<div v-if="editServiceSector === false" class="d-flex">
								<b-badge @click="editServiceSector = true"  class='badge-pill badge-warning badge-action'>
									<i class="fa fa-pencil"></i>
								</b-badge>
								<p>Sector servicio numoero uno</p> 
						</div>
						<div v-show="editServiceSector === true">
							<b-badge @click="editServiceSector = false"  class='badge-pill badge-danger badge-action'>
								<i class="fa fa-close"></i>
							</b-badge>
							<b-form-select id="basicMultiSelect"
								:plain="true"
								:multiple="true">
									<option v-if="filter.filterType.id === 4" v-for="filter in filterList" :key="filter.id" :value="filter.id">{{filter.name}}</option>
							</b-form-select>
						</div>
	          	</b-form-group>

				<b-form-group
					label="Destinatario"
					label-for="basicMultiSelect"
					:label-cols="3"
					:horizontal="true">
						<div v-if="editServiceDestinatario === false" class="d-flex">
								<b-badge @click="editServiceDestinatario = true"  class='badge-pill badge-warning badge-action'>
									<i class="fa fa-pencil"></i>
								</b-badge>
								<p>Gobierno local</p> 
						</div>
						<div v-show="editServiceDestinatario === true">
							<b-badge @click="editServiceDestinatario = false"  class='badge-pill badge-danger badge-action'>
								<i class="fa fa-close"></i>
							</b-badge>
							<b-form-select id="basicMultiSelect"
								:plain="true"
								:multiple="true">
								<option v-if="filter.filterType.id === 4" v-for="filter in filterList" :key="filter.id" :value="filter.id">{{filter.name}}</option>
							</b-form-select>
						</div>
						</b-form-group>

			<b-form-group
	            label="Descripción"
	            label-for="basicTextarea"
	            :label-cols="3"
	            :horizontal="true">
							<div v-if="editServiceDescripcion === false" class="d-flex">
									<b-badge @click="editServiceDescripcion = true"  class='badge-pill badge-warning badge-action'>
										<i class="fa fa-pencil"></i>
									</b-badge>
									<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor neque enim nihil veritatis dolore nemo cumque odit repudiandae deleniti quis omnis eveniet, delectus culpa impedit velit in, inventore voluptas quaerat.</p> 
							</div>
							<div v-show="editServiceDescripcion === true">
								<b-badge @click="editServiceDescripcion = false"  class='badge-pill badge-danger badge-action'>
									<i class="fa fa-close"></i>
								</b-badge>
	            	<b-form-input id="basicTextarea" :textarea="true" :rows="9" placeholder="Escribe descipción del servicio"></b-form-input>
							</div>
	          </b-form-group>
				
				<b-form-group
	            description="Nombre del contacto"
	            label="Contacto"
	            label-for="basicText"
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
	            	<b-form-input id="basicText" type="text" placeholder=""></b-form-input>
							</div>
	        </b-form-group>

	          <b-form-group
	            description=""
	            label="Email de contacto"
	            label-for="basicEmail"
	            :label-cols="3"
	            :horizontal="true">
							<div v-if="editServiceEmail === false" class="d-flex">
									<b-badge @click="editServiceEmail = true"  class='badge-pill badge-warning badge-action'>
										<i class="fa fa-pencil"></i>
									</b-badge>
									<p>Señor servicio numoero uno</p> 
							</div>
							<div v-show="editServiceEmail === true">
								<b-badge @click="editServiceEmail = false"  class='badge-pill badge-danger badge-action'>
									<i class="fa fa-close"></i>
								</b-badge>
	            	<b-form-input id="basicEmail" type="email" placeholder="Enter your email" autocomplete="email"></b-form-input>
							</div>
	          </b-form-group>
	         </b-form>
				
			   <b-form-group
	            description=""
	            label="Telefono de contacto"
	            label-for="basicText"
	            :label-cols="3"
	            :horizontal="true">
									<div v-if="editServiceTelefono === false" class="d-flex">
									<b-badge @click="editServiceTelefono = true"  class='badge-pill badge-warning badge-action'>
										<i class="fa fa-pencil"></i>
									</b-badge>
									<p>Señor servicio numoero uno</p> 
								</div>
							<div v-show="editServiceTelefono === true">
								<b-badge @click="editServiceTelefono = false"  class='badge-pill badge-danger badge-action'>
									<i class="fa fa-close"></i>
								</b-badge>
	            	<b-form-input id="basicText" type="text" placeholder=""></b-form-input>
							</div>
	        </b-form-group>

				<b-form-group
	            description=""
	            label="Direccion de contacto"
	            label-for="basicText"
	            :label-cols="3"
	            :horizontal="true">
									<div v-if="editServiceDireccion === false" class="d-flex">
									<b-badge @click="editServiceDireccion = true"  class='badge-pill badge-warning badge-action'>
										<i class="fa fa-pencil"></i>
									</b-badge>
									<p>Señor servicio numoero uno</p> 
								</div>
							<div v-show="editServiceDireccion === true">
								<b-badge @click="editServiceDireccion = false"  class='badge-pill badge-danger badge-action'>
									<i class="fa fa-close"></i>
								</b-badge>
	            	<b-form-input id="basicText" type="text" placeholder=""></b-form-input>
							</div>
	        </b-form-group>

		
	        </b-form-group>

	        </b-card>
	      </b-col>
	    </b-row>
	</div>
</template>

<script>
import store from '../store'

export default {
	name: 'AdminAddServicio',
	data() {
		return {
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
		}
	},
	computed:{
		filterTypes(){
		    return this.$store.state.filterTypes;
		},
		filterList(){
			return this.$store.state.filterList;
		},
	}
}
</script>