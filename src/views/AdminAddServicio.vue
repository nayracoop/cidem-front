<template>
	<div class="animated fadeIn">
		<b-row>
	      <b-col md="8" offset="2">
	        <b-card>
	          <div slot="header">
	            <strong>Agregar</strong> Servicio
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
	            description="Seleccionar múltiples filtros con Ctrl + Click"
	            label-for="basicMultiSelect"
	            :label-cols="3"
	            :horizontal="true">
	            <b-form-select id="basicMultiSelect"
	              :plain="true"
	              :multiple="true"
	              :options="[
	                {
	                  text: 'This is First option',
	                  value: 'a'
	                }, {
	                  text: 'Default Selected Option',
	                  value: 'b'
	                }, {
	                  text: 'This is another option',
	                  value: 'c'
	                }, {
	                  text: 'This one is disabled',
	                  value: 'd',
	                  disabled: true
	                }]">
	            </b-form-select>
	          </b-form-group>

	          <b-form-group
	            label="Subunidad"
	            label-for="basicMultiSelect"
	            :label-cols="3"
	            :horizontal="true">
	            <b-form-select id="basicMultiSelect"
	              :plain="true"
	              :multiple="true"
	              :options="[
	                {
	                  text: 'This is First option',
	                  value: 'a'
	                }, {
	                  text: 'Default Selected Option',
	                  value: 'b'
	                }, {
	                  text: 'This is another option',
	                  value: 'c'
	                }, {
	                  text: 'This one is disabled',
	                  value: 'd',
	                  disabled: true
	                }]">
	            </b-form-select>
	          </b-form-group>

			  	          <b-form-group
	            label="Tipo de Servicio"
	            label-for="basicMultiSelect"
	            :label-cols="3"
	            :horizontal="true">
	            <b-form-select id="basicMultiSelect"
	              :plain="true"
	              :multiple="true"
	              :options="[
	                {
	                  text: 'This is First option',
	                  value: 'a'
	                }, {
	                  text: 'Default Selected Option',
	                  value: 'b'
	                }, {
	                  text: 'This is another option',
	                  value: 'c'
	                }, {
	                  text: 'This one is disabled',
	                  value: 'd',
	                  disabled: true
	                }]">
	            </b-form-select>
	          </b-form-group>

	          	 <b-form-group
	            label="Sector al que esta destinado"
	            label-for="basicMultiSelect"
	            :label-cols="3"
	            :horizontal="true">
	            <b-form-select id="basicMultiSelect"
	              :plain="true"
	              :multiple="true"
	              :options="[
	                {
	                  text: 'This is First option',
	                  value: 'a'
	                }, {
	                  text: 'Default Selected Option',
	                  value: 'b'
	                }, {
	                  text: 'This is another option',
	                  value: 'c'
	                }, {
	                  text: 'This one is disabled',
	                  value: 'd',
	                  disabled: true
	                }]">
	            </b-form-select>
	          </b-form-group>

			<b-form-group
	            label="Destinatario"
	            label-for="basicMultiSelect"
	            :label-cols="3"
	            :horizontal="true">
	            <b-form-select id="basicMultiSelect"
	              :plain="true"
	              :multiple="true"
	              :options="[
	                {
	                  text: 'This is First option',
	                  value: 'a'
	                }, {
	                  text: 'Default Selected Option',
	                  value: 'b'
	                }, {
	                  text: 'This is another option',
	                  value: 'c'
	                }, {
	                  text: 'This one is disabled',
	                  value: 'd',
	                  disabled: true
	                }]">
	            </b-form-select>
	          </b-form-group>

			<b-form-group
	            label="Descripción"
	            label-for="basicTextarea"
	            :label-cols="3"
	            :horizontal="true">
	            <b-form-input id="basicTextarea" :textarea="true" :rows="9" placeholder="Escribe descipción del servicio"></b-form-input>
	          </b-form-group>
				
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
	            <b-form-input id="basicText" type="text" placeholder=""></b-form-input>
	        </b-form-group>

		
	          </b-form-group>

	        </b-card>
	      </b-col>
	    </b-row>
	</div>
</template>

<script>
export default {
	name: 'AdminAddServicio'
}
</script>