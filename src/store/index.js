import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import VuexPersist from 'vuex-persist';
import data from '@/data'

const token = localStorage.getItem('token')


const SERVER_PATH = process.env.SERVER_PATH;

Vue.use(Vuex);


const vuexLocalStorage = new VuexPersist({
	key: 'vuex', // The key to store the state on in the storage provider.
	storage: window.localStorage, // or window.sessionStorage or localForage
	// Function that passes the state and returns the state with only the objects you want to store.
	// reducer: state => state,
	// Function that passes a mutation and lets you decide if it should update the state in localStorage.
	// filter: mutation => (true)
  })
  

const store = new Vuex.Store({
	plugins: [vuexLocalStorage.plugin],
	state: {
		filterTypes: [],
		filterList: [],
		searchQuery: null,
		searchQueryFilters: [],
		services:{},
		fullServices:{},
		service:{},
		messages:[],
		access_token: null,
		errors: []
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
		},
		FETCH_MESSAGES(state, messages){
			state.messages = messages;
		}, 
		STORE_ACCESS_TOKEN(state, access_token){
			state.access_token = access_token;
		},
		DELETE_ACCESS_TOKEN(state){
			state.access_token = null;
		}

	},
	actions: {
		//client actions
		fetchFilters(context){
			var getFilters = axios.get(`${SERVER_PATH}/filters`)
		      	.then(response => {
		      		context.commit('FETCH_FILTER_LIST', response.data.data);
				})
		      	.catch(e => {
		        	this.errors.push(e)
				}) 
			var getFilterTypes = axios.get(`${SERVER_PATH}/filter-types`)
				.then(response => {
						context.commit('FETCH_FILTER_TYPES', response.data.data);
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
			if (state.searchQuery === null) {
				axios.get(`${SERVER_PATH}/services`,  {
					params: {
					  filters: filters,
					}
				  })
				  .then(response => {
					  commit('FETCH_SERVICES', response.data);
				  })
				  .catch(e => {
						this.errors.push(e)
				  })
			} else {
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
			}
			
		},
		fetchFullServices({commit, state}, total){
			var filters = [];
		    if (state.searchQueryFilters.length > 0) {
		        for (var i = 0; i < (state.searchQueryFilters.length); i++){
		          filters.push(state.searchQueryFilters[i].id);
		        } 
				};
			return axios.get(`${SERVER_PATH}/services`,  {
								params: {
									service: state.searchQuery,
									filters: filters,
									per_page: total
								}
							})
							.then(response => {
								commit('FETCH_FULL_SERVICES', response.data);
								return response.data;
							})
							.catch(e => {
										this.errors.push(e)
							})
			
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
		getAssociatedServices(context, filterId){
			return axios.get(`${SERVER_PATH}/filters/${filterId}/services`)
			.then(response => {
				return response.data.data;
			})
			.catch(e => {
				this.errors.push(e);
			});

		},
		postMessage(context, mess){
			return axios.post(`${SERVER_PATH}/messages`, { 
				data: {
					name: mess.name,
					institution: mess.institution, 
					email: mess.email,
					description: mess.description,
					status: 'unread'
				}
			})	
			.then(response => {
			})
			.catch(e => {
				this.errors.push(e);
			});
		},
		login(context, user){
			return axios.post(`${SERVER_PATH}/login`,  {
				email: user.email,
				password: user.password, 
			})
			.then(response => {
				context.commit('STORE_ACCESS_TOKEN', response.data.access_token);
				return response.data.status;
			})
			.catch(e => {
				return "error";
			});
		},
		//admin
		postNewService({commit,state}, newService){
			var service = newService;
				//dos acciones encadenadas
				// 1 post / service con todos sus campos => devuelve el servicio nuevo con el id
			return axios.post(`${SERVER_PATH}/services`,  {
		           	name: service.name,
					slug: service.name,
					summary: service.dir, 
					description: service.description,
					contact_name: service.contacto,
					email: service.email,
					phone: service.tel,
					address: service.dir,
					icon: 'fa-close',
					website: service.website,
					created_at: Date.now(),
					updated_at: Date.now()
		        
				},
				{
					headers: {
						'x-api-key': state.access_token,
					}
				}
			  )
		      .then(response => {
						// 2 post / filters , a partir del servicio nuevo sacar el id, y asociar id de servicio e id de filtros, ciclo for. 
						for(var i = 0; i < (service.filters.length); i++){
		
							var link = `${SERVER_PATH}/services/${response.data.data.id}/filters/${service.filters[i]}`
							axios.post(link, {}, {
								headers: {'x-api-key': state.access_token}})
							.then(response => {
							}).catch(e => this.errors.push(e));
							if (i === (newService.filters.length-2)) {
								return response.data.data;
							}
						}
					
		      })
		      .catch(e => {
		            this.errors.push(e)
			  });
			  
		},
		postNewFilter({commit,state}, newFilter){
			return axios.post(`${SERVER_PATH}/filters`,  {
				name: newFilter.name,
				tag: newFilter.tag, 
				filter_type_id: newFilter.type,
			},
			{
				headers: {
					'x-api-key': state.access_token,
				}
			})
			.then(response => {
				return response.data.data;
			})
			.catch(e => {
				this.errors.push(e);
			});
			 
		
		},
		editService({commit,state}, editedService){
			for(var i = 0; i < (editedService.oldFilters.length - 1); i++){
				var link = `${SERVER_PATH}/services/${editedService.id}/filters/${editedService.oldFilters[i]}`
				axios.delete(link,{
					headers: {
						'x-api-key': state.access_token,
					}
				}).then(response => {
				}).catch(e => this.errors.push(e));
			}
		
			return axios.put(`${SERVER_PATH}/services/${editedService.id}`,  {
					name: editedService.name,
					slug: editedService.name,
					summary: editedService.dir, 
					description: editedService.description,
					icon: 'fa-close',
					phone: editedService.tel,
					address: editedService.dir,
					email: editedService.email,
					contact_name: editedService.contacto,
					website: editedService.web,
					updated_at: Date.now(),
			},
			{
				headers: {
					'x-api-key': state.access_token,
				}
			})
		      .then(response => {
				for(var i = 0; i < (editedService.newFilters.length); i++){
					var link = `${SERVER_PATH}/services/${editedService.id}/filters/${editedService.newFilters[i]}`
					axios.post(link,{},{
						headers: {
							'x-api-key': state.access_token,
						}
					}).then(response => {
					}).catch(e => this.errors.push(e));
				}
				return response.data.data;
		      })
		      .catch(e => {
				this.errors.push(e)
			  });
		},
		editFilter({commit,state}, editedFilter){
			return axios.put(`${SERVER_PATH}/filters/${editedFilter.id}`,  {
				name: editedFilter.name,
				tag: editedFilter.tag, 
				filter_type_id: editedFilter.type,
			},{
				headers: {
					'x-api-key': state.access_token,
				}
			})
			.then(response => {
				return response.data.data;
			})
			.catch(e => {
				this.errors.push(e);
			});
		
		},
		deleteFilter({commit, state}, deletedFilter){
			return axios.delete(`${SERVER_PATH}/filters/${deletedFilter}`,{
				headers: {
					'x-api-key': state.access_token,
				}
			})
			.then(response => {
			})
			.catch(e => {
				this.errors.push(e);
			});
		},
		deleteService({commit, state}, deletedServiceId){
			return axios.delete(`${SERVER_PATH}/services/${deletedServiceId}`,{
				headers: {
					'x-api-key': state.access_token,
				}
			})
			.then(response => {
				return response.data.data;
			})
			.catch(e => {
				this.errors.push(e);
			});
		},
		
		fetchMessages({commit, state}){
			return axios.get(`${SERVER_PATH}/messages`, {
				headers: {
					'x-api-key': state.access_token,
				}
			})
			.then(response => {
				return commit('FETCH_MESSAGES', response.data.data);
			})
			.catch(e => {
				this.errors.push(e);
			});

		},
		changeMessageStatus({commit, dispatch,state}, newStatus){
			return axios.put(`${SERVER_PATH}/messages/${newStatus.id}`, 
				{
					status: newStatus.status
				}, 
				{
					headers: {
						'x-api-key': state.access_token,
				}
			})
			.then(response => {
				dispatch('fetchMessages');
			})
			.catch(e => {
				this.errors.push(e);
			});

		},
		getAdminStatus({commit,state}){
			return axios.get(`${SERVER_PATH}/admin-status`, {
				headers: {
					'x-api-key': state.access_token,
				}
			})
			.then((response, error )=> {
				return response.data.status;
			})
			.catch(e => {
				state.errors.push(e);
				return e.response.data.error;
			});
		},
		logout({commit,state}, user){
			return axios.post(`${SERVER_PATH}/logout`, { } , {
				headers: {
					'x-api-key': state.access_token,
				}
			})
			.then(response => {
				commit('STORE_ACCESS_TOKEN', null);
				return response;
			}).catch(e=>{
				state.errors.push(e);
			});
			
		},
		
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
			var filter5 = [];

			var filtersByType = [];
			
			for (var i = 0; i < state.service.data.filters.length; i++){
				if (state.service.data.filters[i].filterType.id === 1){
					filter1.push(state.service.data.filters[i].id);
				} else if (state.service.data.filters[i].filterType.id === 2){
					filter2.push(state.service.data.filters[i].id);
				} else if (state.service.data.filters[i].filterType.id === 3){
					filter3.push(state.service.data.filters[i].id);
				} else if (state.service.data.filters[i].filterType.id === 4){
					filter4.push(state.service.data.filters[i].id);
				} else if (state.service.data.filters[i].filterType.id === 5 ){
					filter5.push(state.service.data.filters[i].id);
				} 
			}
			filtersByType.push(filter1);
			filtersByType.push(filter2);
			filtersByType.push(filter3);
			filtersByType.push(filter4);
			filtersByType.push(filter5);
			
			return filtersByType;
		},
		serviceFiltersNames(state){
			var filter1 = [];
			var filter2 = [];
			var filter3 = [];
			var filter4 = [];
			var filter5 = [];


			var filtersByType = [];
			
			for (var i = 0; i < state.service.data.filters.length; i++){
				if (state.service.data.filters[i].filterType.id === 1){
					filter1.push(state.service.data.filters[i].name);
				} else if (state.service.data.filters[i].filterType.id === 2){
					filter2.push(state.service.data.filters[i].name);
				} else if (state.service.data.filters[i].filterType.id === 3){
					filter3.push(state.service.data.filters[i].name);
				} else if (state.service.data.filters[i].filterType.id === 4){
					filter4.push(state.service.data.filters[i].name);
				} else if (state.service.data.filters[i].filterType.id === 5){
					filter5.push(state.service.data.filters[i].name);
				} 
			}
			filtersByType.push(filter1);
			filtersByType.push(filter2);
			filtersByType.push(filter3);
			filtersByType.push(filter4);
			filtersByType.push(filter5);
			
			return filtersByType;
		}
	}
});

export default store