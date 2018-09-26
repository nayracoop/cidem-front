// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

/////// inicia vuex store.js 
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({ 
  state: {
    filtersAvailable: [],
    searchQuery: "",
    searchQueryFilters: [],
    services:{},
    urlQuery: '',
    test: 'testing'
  },
  mutations: { //syncronous
    getFiltersAvailable(state){
      axios.get('http://127.0.0.1:8000/api/filter-tree')
      .then(response => {
        state.filtersAvailable = response.data.data;
        console.log('mutation triggered');
        eventBus.$emit('filtrosOfrecidos', state.filtersAvailable)//reemplazar
      })
      .catch(e => {
        this.errors.push(e)
      }) 
    },
    
    changeQueryFilters(state, filters) {
      state.searchFilters = filters
      //this.$emit('filtersChanged', filters);
    },
    changeQuerySearch(state, search) {
      state.searchQuery = search;
      //this.$emit('servicesChanged', services);
    },
    getServices(state){
      ///REVISAR ADAPTACION DE ESTO
      //eventBus.changeServices(this.services); // REEMPLAZAR ESTO EN LOS RECEPTORES
      axios.get('http://127.0.0.1:8000/api/services',  {
        params: {
          service: state.searchQuery,
          filters: state.searchQueryFilters
        }
      })
      .then(response => {
        state.services = response.data;
        //this.setUrl();  //VER COMO SE SETEARIA EL URL DESDE VUEX
      })
      .catch(e => {
        this.errors.push(e)
      }) 
    },
    changePage: function (state, link) { 
      // FALTA REEMPLAZAR EL EVENT BUS PARA LA PAGINACION
      ///REEMPLAZAR TODO A VUEX -> o buscar una forma de navegar 
      axios.get(link)
        .then(response => {
          state.services = response.data;
        })
        .catch(e => {
           this.errors.push(e)
        })
    },   
    changeTest(state, text) {
      state.test = text;
    },

  },
  actions: { //asyncronous commit of mutations
    getFiltersAvailable(context){
      context.commit('getFiltersAvailable');
    },
    changeQuerySearch(context, search) {
     context.commit('changeQuerySearch', search)
      //this.$emit('servicesChanged', services);
    },
    changeQueryFilters(context, filters){
      context.commit('changeQueryFilters', filters);
    },
    getServices(context){
      context.commit('getServices');
    },
    changePage(context, link){
      context.commit('changePage', link);
    },
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

/// start eventBus
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
////// end eventBus

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
