<template>
	<b-row class="animated fadeIn">
      <b-col sm="12">
        <c-table hover striped bordered small fixed caption="<i class='fa fa-align-justify'></i> Combined All Table"></c-table>
      </b-col>
    </b-row>
</template>

<script>
	import cTable from '@/components/Table'
	export default{
		name: 'AdminServicios',
		components: {cTable}
	}
</script>