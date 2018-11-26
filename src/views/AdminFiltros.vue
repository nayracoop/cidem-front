<template>
	<b-row class="animated fadeIn">
			<button @click="populatefilters()"> POPULAR FILTROS </button>
			<button @click="populateservices()"> POPULAR SERVICIOS </button>

      <b-col sm="12">
        <filters-table hover striped bordered   caption="<i class='fa fa-gear'></i> Administrar Filtros"></filters-table>
      </b-col>
    </b-row>
</template>

<script>
	import FiltersTable from '@/components/FiltersTable'

	export default{
		name: 'AdminFiltros',
		components: {FiltersTable},
		computed: {
			
		},
		methods: {
			populatefilters: function(){
				this.$store.dispatch('populateFilters');
			},
			populateservices: function(){
				this.$store.dispatch('populateServices');
			}
    },
	}

</script>