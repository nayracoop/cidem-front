<template>
	<div class="animated fadeIn">
		<b-row>
			<b-col sm="6" lg="10" offset="1">
		        <b-card no-body class="bg-primary">
		          <b-card-body class="pb-0">
		            <b-dropdown class="float-right" variant="transparent p-0" right>
		              <template slot="button-content">
		                <i class="icon-settings"></i>
		              </template>
		              <b-dropdown-item>Action</b-dropdown-item>
		              <b-dropdown-item>Another action</b-dropdown-item>
		              <b-dropdown-item>Something else here...</b-dropdown-item>
		            </b-dropdown>
		            <h4 class="mb-0">{{services.length}}</h4>
		            <p>Servicios Disponibles</p>
		          </b-card-body>
		          <card-line-chart-example chartId="card-chart-01" class="chart-wrapper px-3" style="height:70px;" :height="70"/>
		        </b-card>
		  </b-col>
		</b-row>


		<b-row> 
			<b-card class="col-10 offset-1 px-0">
				<template slot="header" class="m-0">Cantidad de servicios ofrecidos por tipo de filtro 	          
					<b-button type="button" variant="primary" class="float-right"><i class="fa fa-print"></i></b-button>
				</template>
				 <b-row>
	        <b-col sm="7" class="d-none d-md-block">
	        </b-col>
	      </b-row>
				<div class="chart-wrapper col-10 offset-1" >
					<chart-unidad id="Unidad" :height="200" ></chart-unidad>
				</div>
				<div class="chart-wrapper  col-12" >
					<chart-sector id="Sector" :height="200"></chart-sector>
				</div>
				<div class="chart-wrapper col-10 offset-1" >
					<chart-tipo id="Tipo" :height="200"></chart-tipo>
				</div>
				<div class="chart-wrapper col-10 offset-1" >
					<chart-destinatarios id="Destinatarios" :height="200"></chart-destinatarios>
				</div>
			</b-card>
		</b-row>


	</div>
</template>

<script>
	import { Callout } from '@coreui/vue'
	import CalloutChartExample from '@/components/CalloutChartExample'
	import CardLineChartExample from '@/components/CardLineChartExample'
	import MainChartExample from '@/components/MainChartExample'
	import ChartPie from '@/components/ChartPie'
	import ChartUnidad from '@/components/ChartUnidad'
	import ChartSector from '@/components/ChartSector'
	import ChartTipo from '@/components/ChartTipo'
	import ChartDestinatarios from '@/components/ChartDestinatarios'


	import store from '../store'


export default{
	name: 'Dashboard',
	data() {
		return {
			selected: [], // Must be an array reference!
					show: true,
					chU: {
						labels: [],
						data: []
					}
		}
	},
	beforeRouteEnter(to, from, next){
			store.dispatch('changeQuerySearch', null);
      store.dispatch('changeQueryFilters', []);
			store.dispatch('fetchFullServices').then(()=>{
				store.dispatch('fetchFilters').then(()=>{
					next();
				});
			});
		},
		beforeRouteUpdate(to, from, next){
			store.dispatch('changeQuerySearch', null);
      store.dispatch('changeQueryFilters', []);
			store.dispatch('fetchFullServices').then(()=>{
				store.dispatch('fetchFilters').then(()=>{
					next();
				});
		});
		},
	computed: {
	 services () {
      return this.$store.state.fullServices.data
		},
		filtersList () {
      return this.$store.state.filterList
    },
    chartUnidadLabels (){
			var that = this;
      var chUnidadLabels = [];
			for (var i = 0 ; i < this.filtersList.length; i++){
				if (this.filtersList[i].filterType.id === 1){
					chUnidadLabels.push(that.filtersList[i].name);
				}
			}
			console.log(chUnidadLabels);
			return chUnidadLabels;
		},
		chartUnidadData (){
				var that = this;
				var chUnidadData = [];
				for (var i = 0 ;i < this.filtersList.length; i++){
					if (this.filtersList[i].filterType.id === 1){
						store.dispatch('getAssociatedServices', this.filtersList[i].id).then(response => {
							chUnidadData.push(response.length);
							if (i > (that.filtersList.length -1)){
									console.log(chUnidadData);
									return chUnidadData;		
							}
						}); 

					}
				}
		}
	},
	components: {
		Callout,
		CalloutChartExample,
		CardLineChartExample,
		MainChartExample,
		ChartUnidad,
		ChartSector, 
		ChartTipo,
		ChartDestinatarios,
		ChartPie,

	},
	methods: {
	    click () {
	      // do nothing
			},
			loadChartData(){
							var that = this;
							for (var i = 0 ; i < this.filtersList.length; i++){
								if (this.filtersList[i].filterType.id === 1){
									chU.labels.push(that.filtersList[i].name);
									store.dispatch('getAssociatedServices', this.filtersList[i].id).then(response => {
										that.chU.data.push(response.length);
									});
								}
							}

			}
	}
}
</script>
