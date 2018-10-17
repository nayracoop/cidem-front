// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import store from './store'
import axios from 'axios'
import ModuleLibrary from '@coreui/vue';
 
Vue.use(ModuleLibrary);

Vue.use(BootstrapVue);

/* 
VUE LLAMA A LA ACCION
LA ACCION LLAMA A UNA FUNCION QUE GETEA A AXIOS Y LE DEVUELVE LA RESPONSE
LA ACCION LE MANDA LA RESPONSE A UNA MUTATION PARA ACTUALIZAR EL STATE
*/


var querystring = require('querystring');

Vue.config.productionTip = false;


////// end eventBus

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>',
  router
})
