<template>
	<b-row class="animated fadeIn">
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

		}
	}
</script>