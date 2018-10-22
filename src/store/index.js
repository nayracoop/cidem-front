import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'


Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		filterTypes: [],
		filterList: [],
		searchQuery: null,
		searchQueryFilters: [],
		services:{},
		fullServices:{},
		service:{},
		consultas:[]
	},
	mutations: {
		FETCH_FILTER_TYPES(state, filterTypes) {
			state.filterTypes = filterTypes;
		},
		FETCH_FILTER_LIST(state, filterList){
			state.filterList = filterList;
		},
		FETCH_SERVICES(state, services){
			state.services = services;
		},
		FETCH_SERVICE(state, service){
			state.service = service;
		},
		FETCH_FULL_SERVICES(state, fullServices){
			state.fullServices = fullServices;
		},
		CHANGE_QUERY_SEARCH(state, searchQuery){
			state.searchQuery = searchQuery;
		},
		CHANGE_QUERY_FILTERS(state, searchQueryFilters){
			state.searchQueryFilters = searchQueryFilters;
			//console.log(state.searchQueryFilters);
		},
		LOAD_NEW_CONSULTA(state, newConsulta){
			state.consultas.push(newConsulta);
		}

	},
	actions: {
		fetchFilters(context){

			var getFilters = axios.get('http://127.0.0.1:8000/api/filters')
		      .then(response => {
		        //commit filterlist
		      	context.commit('FETCH_FILTER_LIST', response.data.data);
						//return response.data.data;
					})
		      .catch(e => {
		        this.errors.push(e)
					}) 
			var getFilterTypes = axios.get('http://127.0.0.1:8000/api/filter-types')
		      .then(response => {
		        //commit filtertypes
						context.commit('FETCH_FILTER_TYPES', response.data.data);
						//return response.data.data;

		      })
		      .catch(e => {
		        this.errors.push(e)
					}) 
	
			return Promise.all([getFilters, getFilterTypes]);
		},
		fetchServices({commit, state}){
			var filters = [];
		    if (state.searchQueryFilters.length > 0) {
		        for (var i = 0; i < (state.searchQueryFilters.length); i++){
		          filters.push(state.searchQueryFilters[i].id);
		        } 
		    };
			axios.get('http://127.0.0.1:8000/api/services',  {
		        params: {
		          service: state.searchQuery,
		          filters: filters,
		        }
		      })
		      .then(response => {
		      	commit('FETCH_SERVICES', response.data);
		      })
		      // REVISAR DE ACA A ABAJO
		      .then(() => {
			      	
		      })
		      .catch(e => {
		            this.errors.push(e)
		      })
		},
		fetchFullServices({commit, state}, total){
			var filters = [];
		    if (state.searchQueryFilters.length > 0) {
		        for (var i = 0; i < (state.searchQueryFilters.length); i++){
		          filters.push(state.searchQueryFilters[i].id);
		        } 
		    };
			axios.get('http://127.0.0.1:8000/api/services',  {
		        params: {
		          service: state.searchQuery,
		          filters: filters,
		          per_page: total
		        }
		      })
		      .then(response => {
		      	commit('FETCH_FULL_SERVICES', response.data);
		      })
		      // REVISAR DE ACA A ABAJO
		      .then(() => {
			      	
		      })
		      .catch(e => {
		            this.errors.push(e)
		      })
		},
		fetchService(context, id){
		    var requestedID = 'http://127.0.0.1:8000/api/services/' + id;
		    axios.get(requestedID)
		    .then(response => {
		        context.commit('FETCH_SERVICE', response.data);
		    })
		    .catch(e => {
		        this.errors.push(e)
		    }) 
		},
		changePage({commit, state}, link){
			var filters = [];
		    if (state.searchQueryFilters.length > 0) {
		        for (var i = 0; i < (state.searchQueryFilters.length); i++){
		          filters.push(state.searchQueryFilters[i].id);
		        } 
		    };
			axios.get(link,{
	          	params: {
		            service: state.searchQuery,
		            filters: filters
	          	}
	        })
	        .then(response => {
	          commit('FETCH_SERVICES', response.data);
	        })
	        .catch(e => {
	           this.errors.push(e)
	        })
		},
		changeQuerySearch(context, searchQuery){
			context.commit('CHANGE_QUERY_SEARCH', searchQuery);

		},
		changeQueryFilters(context, searchQueryFilters){
			return context.commit('CHANGE_QUERY_FILTERS', searchQueryFilters);
		},
		loadNewConsulta(context, consu){
			context.commit('LOAD_NEW_CONSULTA', consu);
		}
	},
	getters:{
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
	      	if (state.fullServices.data) {
	      		if (state.fullServices.data.length > 0) {
		        	for (var i = 0; i < (state.fullServices.data.length); i++){
		        		services.push(state.fullServices.data[i].id);
		        	} 
		        }
	      	};
	      	return services;
	    }
	}
});

export default store