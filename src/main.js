// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//import router from './router'

Vue.config.productionTip = false

export const eventBus = new Vue({
	data: {
		filtrosOferta : [] ,
		filtrosElegidos: [],
		serviciosFiltrados:[]
	},
	methods: {
   		changeFilters(filters) {
   			this.$emit('filtersChanged', filters);
   			this.filtrosElegidos = filters;
   		},
   		changeServices(services) {
   			this.$emit('servicesChanged', services);
   			this.serviciosFiltrados = services;
   		}
	}
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  //router,
  components: { App },
  template: '<App/>'
})
