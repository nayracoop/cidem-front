<template>
	<div class="animated fadeIn">
		<b-row>
	      <b-col md="8" offset="2">
	        <b-card>
	          <div slot="header">
	            <strong>Crear Nuevo Servicio</strong>
	          </div>
	          <b-form>
							<b-form-group
								description=""
								label="Nombre del servicio"
								label-for="basicText"
								:label-cols="3"
								:horizontal="true">
								<b-form-input id="basicText" type="text" placeholder="Nombre del servicio"></b-form-input>
							</b-form-group>


	          
							<b-form-group
								label="Unidad"
								description=""
								label-for="basicMultiSelect"
								:label-cols="3"
								:horizontal="true">
									<b-form-select id="basicMultiSelect"
										:plain="true"
										:multiple="true">
										<option v-if="filter.filterType.id === 1" v-for="filter in filterList" :key="filter.id" :value="filter.id">{{filter.name}}</option>
									</b-form-select>
							</b-form-group>

	          <b-form-group
	            label="Subunidad"
	            label-for="basicMultiSelect"
	            :label-cols="3"
	            :horizontal="true">
					<b-form-select id="basicMultiSelect"
						:plain="true"
						:multiple="true">
						<option v-if="filter.filterType.id === 2" v-for="filter in filterList" :key="filter.id" :value="filter.id">{{filter.name}}</option>

					</b-form-select>

	          </b-form-group>

			  	  <b-form-group
	            label="Tipo de Servicio"
	            label-for="basicMultiSelect"
	            :label-cols="3"
	            :horizontal="true">
						
					<b-form-select id="basicMultiSelect"
						:plain="true"
						:multiple="true">
					<option v-if="filter.filterType.id === 3" v-for="filter in filterList" :key="filter.id" :value="filter.id">{{filter.name}}</option>

					</b-form-select>
	          </b-form-group>

	          	 <b-form-group
	            label="Sector al que esta destinado"
	            label-for="basicMultiSelect"
	            :label-cols="3"
	            :horizontal="true">
				
						<b-form-select id="basicMultiSelect"
							:plain="true"
							:multiple="true">
												
							<option v-if="filter.filterType.id === 4" v-for="filter in filterList" :key="filter.id" :value="filter.id">{{filter.name}}</option>

						</b-form-select>
	          	</b-form-group>

				<b-form-group
					label="Destinatario"
					label-for="basicMultiSelect"
					:label-cols="3"
					:horizontal="true">
						<b-form-select id="basicMultiSelect"
							:plain="true"
							:multiple="true">
								<option v-if="filter.filterType.id === 4" v-for="filter in filterList" :key="filter.id" :value="filter.id">{{filter.name}}</option>
						</b-form-select>		
				</b-form-group>

			<b-form-group
	            label="Descripción"
	            label-for="basicTextarea"
	            :label-cols="3"
	            :horizontal="true">
				
	            	<b-form-textarea id="basicTextarea" :textarea="true" :rows="3" placeholder="Escribe descipción del servicio"></b-form-textarea>
	          </b-form-group>
				
				<h5> Información de contacto </h5>

				<b-form-group
	            description="Nombre del contacto"
	            label="Contacto"
	            label-for="basicText"
	            :label-cols="3"
	            :horizontal="true">
									
	            	<b-form-input id="basicText" type="text" placeholder=""></b-form-input>
						
	        </b-form-group>

	          <b-form-group
	            description=""
	            label="Email de contacto"
	            label-for="basicEmail"
	            :label-cols="3"
	            :horizontal="true">
							
	            	<b-form-input id="basicEmail" type="email" placeholder="Enter your email" autocomplete="email"></b-form-input>
								
	          </b-form-group>
	         </b-form>
				
			   <b-form-group
	            description=""
	            label="Telefono de contacto"
	            label-for="basicText"
	            :label-cols="3"
	            :horizontal="true">
						
	            	<b-form-input id="basicText" type="text" placeholder=""></b-form-input>
					
	        </b-form-group>

				<b-form-group
	            description=""
	            label="Direccion de contacto"
	            label-for="basicText"
	            :label-cols="3"
	            :horizontal="true">
	            	<b-form-textarea id="basicText" type="text" placeholder=""></b-form-textarea>				
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