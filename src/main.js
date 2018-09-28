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
    service:{},
    urlQuery: '',
    test: 'testing'
  },
  mutations: { //syncronous
    getFiltersAvailable(state){
      axios.get('http://127.0.0.1:8000/api/filter-tree')
      .then(response => {
        state.filtersAvailable = response.data.data;
        console.log('mutation triggered');
      })
      .catch(e => {
        this.errors.push(e)
      }) 
    },
    changeQueryFilters(state, filters) {
      state.searchQueryFilters = filters
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
     
      var filters = [];
      if (state.searchQueryFilters.length > 0) {
        for (var i = 0; i < (state.searchQueryFilters.length); i++){
          filters.push(state.searchQueryFilters[i].id);
        } 
      }
            
      router.push({ name: 'Results', query:{services: state.searchQuery, filters: filters}});      

    },
    getServiceById(state, id){
      // ADAPTAR A API/SERVICES/ID
      var requestedID = 'http://127.0.0.1:8000/api/services/' + id;
      axios.get(requestedID)
      .then(response => {
        state.service = response.data;
        console.log(state.service);

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
     context.commit('changeQuerySearch', search);     
      //this.$emit('servicesChanged', services);
    },
    changeQueryFilters(context, filters){
      context.commit('changeQueryFilters', filters);
    },
    getServices(context){
      context.commit('getServices');
    },
    getServiceById(context, id){
      context.commit('getServiceById', id);
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


////// end eventBus

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
