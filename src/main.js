// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

/////// inicia vuex store.js 
import Vuex from 'vuex';

Vue.use(Vuex);

/* 
VUE LLAMA A LA ACCION
LA ACCION LLAMA A UNA FUNCION QUE GETEA A AXIOS Y LE DEVUELVE LA RESPONSE
LA ACCION LE MANDA LA RESPONSE A UNA MUTATION PARA ACTUALIZAR EL STATE
*/

export const store = new Vuex.Store({ 
  state: {
    filtersAvailable: [],
    filterList: [],
    filterTypes: [],
    searchQuery: "",
    searchQueryFilters: [],
    services:{},
    service:{},
    urlQuery: '',
    loading: true
  },
  mutations: { //syncronous
    getFiltersAvailable(state){
      axios.get('http://127.0.0.1:8000/api/filter-tree')
      .then(response => {
        state.filtersAvailable = response.data.data;
      })
      .catch(e => {
        this.errors.push(e)
      }) 
    },
    getFilterList(state){
      state.loading = true;
      axios.get('http://127.0.0.1:8000/api/filters')
      .then(response => {
        state.filterList = response.data.data;
        state.loading = false
      })
      .catch(e => {
        this.errors.push(e)
      }) 
    },
    getFilterTypes(state){
      axios.get('http://127.0.0.1:8000/api/filter-types')
      .then(response => {
        state.filterTypes = response.data.data;
      })
      .catch(e => {
        this.errors.push(e)
      }) 
    },
    changeQueryFilters(state, filters) {
      state.searchQueryFilters = filters
    },
    changeQuerySearch(state, search) {
      state.searchQuery = search;
    },
    getServices(state){
      ///REVISAR ADAPTACION DE ESTO
      axios.get('http://127.0.0.1:8000/api/services',  {
        params: {
          service: state.searchQuery,
          filters: state.searchQueryFilters
        }
      })
      .then(response => {
        state.services = response.data;
        console.log("response available for " + state.searchQuery);
        console.log(state.services);
      })
      .then(() => {
        router.push({ name: 'Results', query:{services: state.searchQuery, filters: filters}});      
      })
      .catch(e => {
        this.errors.push(e)
      })
     
      var filters = [];
      if (state.searchQueryFilters.length > 0) {
        for (var i = 0; i < (state.searchQueryFilters.length); i++){
          filters.push(state.searchQueryFilters[i].id);
        } 
      };
            

    },
    getServiceById(state, id){
      // ADAPTAR A API/SERVICES/ID
      var requestedID = 'http://127.0.0.1:8000/api/services/' + id;
      axios.get(requestedID)
      .then(response => {
        state.service = response.data;
       //console.log(state.service);
      })
      .catch(e => {
        this.errors.push(e)
      }) 
    },
    changePage: function (state, link) { 
      axios.get(link,{
          params: {
            service: state.searchQuery,
            filters: state.searchQueryFilters
          }})
        .then(response => {
          state.services = response.data;
          console.log("changed page");
          console.log(state.services);
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
    getFilterList(context){
      context.commit('getFilterList');
    },
    getFilterTypes(context){
      context.commit('getFilterTypes');
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
       if (state.searchQueryFilters.length > 0) {
        for (var i = 0; i < (state.searchQueryFilters.length); i++){
          filters.push(state.searchQueryFilters[i].id);
        } 
      };
      return filters;
    },
    serviceIdArray(state) {
      var services = [];
       if (state.services.data.length > 0) {
        for (var i = 0; i < (state.services.data.length); i++){
          services.push(state.services.data[i].id);
        } 
      };
      return services;
    }
  }

});
///////// fin vuex store.js


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
