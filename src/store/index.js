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
		services:{
			data: [],
			meta:[],
			links:[]
		},
		service:{}
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
		CHANGE_QUERY_SEARCH(state, searchQuery){
			state.searchQuery = searchQuery;
		},
		CHANGE_QUERY_FILTERS(state, searchQueryFilters){
			state.searchQueryFilters = searchQueryFilters;
			//console.log(state.searchQueryFilters);

		}
	},
	actions: {
		fetchFilters(context){
			//get filter list
			axios.get('http://127.0.0.1:8000/api/filters')
		      .then(response => {
		        //commit filterlist
		      	context.commit('FETCH_FILTER_LIST', response.data.data);
		      })
		      .catch(e => {
		        this.errors.push(e)
		      }) 
			//get filter types
		    axios.get('http://127.0.0.1:8000/api/filter-types')
		      .then(response => {
		        //commit filtertypes
				context.commit('FETCH_FILTER_TYPES', response.data.data);
		      })
		      .catch(e => {
		        this.errors.push(e)
		      }) 
		},
		fetchServices({commit, state}){
			var filters = [];
		    if (state.searchQueryFilters.length > 0) {
		        for (var i = 0; i < (state.searchQueryFilters.length); i++){
		          filters.push(state.searchQueryFilters[i].id);
		        } 
		    };
		    console.log(filters);   
			axios.get('http://127.0.0.1:8000/api/services',  {
		        params: {
		          service: state.searchQuery,
		          filters: filters,
		        }
		      })
		      .then(response => {
		      	console.log(response.data);
		      	commit('FETCH_SERVICES', response.data);
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
		changePage({context, state}, link){
			axios.get(link,{
	          	params: {
		            service: state.searchQuery,
		            filters: state.searchQueryFilters
	          	}
	        })
	        .then(response => {
	          context.commit('FETCH_SERVICES', response.data);
	        })
	        .catch(e => {
	           this.errors.push(e)
	        })
		},
		changeQuerySearch(context, searchQuery){
			context.commit('CHANGE_QUERY_SEARCH', searchQuery);

		},
		changeQueryFilters(context, searchQueryFilters){
			context.commit('CHANGE_QUERY_FILTERS', searchQueryFilters);
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
	       if (state.services.data.length > 0) {
	        for (var i = 0; i < (state.services.data.length); i++){
	          services.push(state.services.data[i].id);
	        } 
	      };
	      return services;
	    }
	}
});

export default store