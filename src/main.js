// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/////// inicia vuex store.js 
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({ 
  state: {
    filtersAvailable: [],
    searchQuery: [],
    searchFilters: [],
    test: 'testing'
  },
  mutations: { //syncronous
    changeTest(state, text) {
      state.test = text;
    }
  },
  actions: { //asyncronous commit of mutations
    changeTest(context, text) {
      context.commit('changeTest', text);
    }
  },
  getters: { //procesan la data en state para displayear
    filterArray(state) {
      var filters = [];
       for (var i = 0; i < (state.searchFilters.length); i++){
          filters.push(state.searchFilters[i].id);
        } 
      return filters;
    },
    capitalize(state) {
      return state.test.toUpperCase();
    }
  }

});
///////// fin vuex store.js


var querystring = require('querystring');

Vue.config.productionTip = false

export const eventBus = new Vue({
	data: {
		filtrosOferta : [] ,
		filtrosElegidos: [],
		searchQuery:{}
	},
	methods: {
   		changeFilters(filters) {
   			this.$emit('filtersChanged', filters);
   			this.filtrosElegidos = filters;
   		},
   		changeServices(services) {
   			this.$emit('servicesChanged', services);
   			this.searchQuery = services;
   		}
	}
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
