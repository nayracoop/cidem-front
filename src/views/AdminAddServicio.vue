<template>
	<div class="animated fadeIn">
		<b-row>
			<b-col class="col-md-8 offset-md-2 col-sm-10 offset-sm-1">
				<b-card class="clearfix">
					<div slot="header">
						<strong>Crear Nuevo Servicio</strong>
					</div>
					<b-form id="newService" @submit="submit($event)">
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
								<option v-if="filter.filterType.id === 4"
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
				
						<h5> Información de contacto </h5>

						<b-form-group label="Contacto"
								description="Nombre del contacto"	
								label-for="sContacto"
								:label-cols="3"
								:horizontal="true">
	            			<b-form-input id="sContacto" 
										type="text" 
										placeholder=""
										required 
										v-model="form.contacto">
							</b-form-input>
						</b-form-group>

						<b-form-group label="Email de contacto"
							description=""
							label-for="sEmail"
							:label-cols="3"
							:horizontal="true">	
								<b-form-input id="sEmail" 
											type="email" 
											placeholder="Enter your email" 
											autocomplete="email"
											required 
											v-model="form.email">
								</b-form-input>
						</b-form-group>
	         			
						<b-form-group label="Telefono de contacto"
							description=""
							label-for="sTel"
							:label-cols="3"
							:horizontal="true">
								<b-form-input id="sTel" 
											type="text" 
											placeholder=""
											required 
											v-model="form.tel">
								</b-form-input>
						</b-form-group>

						<b-form-group label="Direccion de contacto"
								description=""
								label-for="sDir"
								:label-cols="3"
								:horizontal="true">
							<b-form-input id="sDir" 
											type="text" 
											placeholder=""
											required 
											v-model="form.dir">
							</b-form-input>				
						</b-form-group>

     				 <b-button class="float-right"  type="submit" variant="success">Crear nuevo servicio</b-button>

					</b-form >
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
				description: '',
				filters: []
			}
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
			document.querySelector('#newService').submit();
			store.dispatch('postNewService', this.form);
		},	
	}
}
</script>