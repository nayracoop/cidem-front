<template>
	<b-row class="animated fadeIn">
      <b-col sm="12">
        <services-table caption="<i class='fa fa-align-justify'></i> Admnistrar Servicios"></services-table>
      </b-col>
    </b-row>
</template>

<script>
	import ServicesTable from '@/components/ServicesTable'
	import store from '../store'

	export default{
		name: 'AdminServicios',
		components: {ServicesTable},
		beforeRouteEnter(to, from, next){
			store.dispatch('changeQuerySearch', null);
      store.dispatch('changeQueryFilters', []);
			store.dispatch('fetchFullServices').then(()=>{
				next();
			});
		},
		beforeRouteUpdate(to, from, next){
			store.dispatch('changeQuerySearch', null);
      store.dispatch('changeQueryFilters', []);
			store.dispatch('fetchFullServices').then(()=>{
				next();
		});
  },
	}
</script>