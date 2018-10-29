import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

const SERVER_PATH = process.env.SERVER_PATH;

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
		}, 


	},
	actions: {
		fetchFilters(context){
			var getFilters = axios.get(`${SERVER_PATH}/filters`)
		      .then(response => {
		        //commit filterlist
		      	context.commit('FETCH_FILTER_LIST', response.data.data);
						//return response.data.data;
					})
		      .catch(e => {
		        this.errors.push(e)
					}) 
			var getFilterTypes = axios.get(`${SERVER_PATH}/filter-types`)
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
			axios.get(`${SERVER_PATH}/services`,  {
		        params: {
		          service: state.searchQuery,
		          filters: filters,
		        }
		      })
		      .then(response => {
		      	commit('FETCH_SERVICES', response.data);
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
			var getFullServices = axios.get(`${SERVER_PATH}/services`,  {
								params: {
									service: state.searchQuery,
									filters: filters,
									per_page: total
								}
							})
							.then(response => {
								commit('FETCH_FULL_SERVICES', response.data);
							})
							.catch(e => {
										this.errors.push(e)
							})
			return Promise.all([getFullServices]);
		},
		fetchService(context, id){
		    var requestedID = `${SERVER_PATH}/services/` + id;
		    var getFilter = axios.get(requestedID)
					.then(response => {
							context.commit('FETCH_SERVICE', response.data);
					})
					.catch(e => {
							this.errors.push(e)
					});
				return Promise.all([getFilter]);
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
		},
		postNewService(context, newService){
				var service = newService;
				//dos acciones encadenadas
				// 1 post / service con todos sus campos => devuelve el servicio nuevo con el id
				axios.post(`${SERVER_PATH}/services`,  {
		           	name: service.name,
					slug: service.name,
					summary: service.dir, 
					description: service.description,
					icon: 'fa-close',
					website: service.email,
					created_at: Date.now(),
					updated_at: Date.now()
		        
		      })
		      .then(response => {
						// 2 post / filters , a partir del servicio nuevo sacar el id, y asociar id de servicio e id de filtros, ciclo for. 
						for(var i = 0; i < service.filters.length; i++){
							var link = `${SERVER_PATH}/services/${response.data.data.id}/filters/${service.filters[i]}`
							console.log(`asociando servicio #${response.data.data.id} con filtro #${service.filters[i]}\nlink: ${link}`);
							axios.post(link).then(response => {
										
							}).catch(e => this.errors.push(e));
							if(i === (service.filters.length - 1) ){
								console.log(`nuevo servicio creado : ${response}`);
							}
						}
		      })
		      .catch(e => {
		            this.errors.push(e)
		      });
		},
		postNewFilter(context, newFilter){
			return axios.post(`${SERVER_PATH}/filters`,  {
				name: newFilter.name,
				tag: newFilter.tag, 
				filter_type_id: newFilter.type,
			})
			.then(response => {
				return response.data.data;
			})
			.catch(e => {
				this.errors.push(e);
			});
			 
		
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
		        	};
		        }
	      	};
	      	return services;
		},
		serviceFilters(state){
			var filter1 = [];
			var filter2 = [];
			var filter3 = [];
			var filter4 = [];

			var filtersByType = [];
			
			for (var i = 0; i < state.service.data.filters.length; i++){
				console.log(state.service.data.filters[i]);
				if (state.service.data.filters[i].filterType.id === 1){
					filter1.push(state.service.data.filters[i].id);
				} else if (state.service.data.filters[i].filterType.id === 2){
					filter2.push(state.service.data.filters[i].id);
				} else if (state.service.data.filters[i].filterType.id === 3){
					filter3.push(state.service.data.filters[i].id);
				} else if (state.service.data.filters[i].filterType.id === 4){
					filter4.push(state.service.data.filters[i].id);
				} 
			}
			filtersByType.push(filter1);
			filtersByType.push(filter2);
			filtersByType.push(filter3);
			filtersByType.push(filter4);
			
			return filtersByType;
		}
	}
});

export default store