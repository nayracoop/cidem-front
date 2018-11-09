<template>
	<div class="animated fadeIn">
		<h1> 70 Servicios disponibles </h1>
		<b-row>
			<b-col sm="6" lg="3">
		        <b-card no-body class="bg-primary">
		          <b-card-body class="pb-0">
		            <b-dropdown class="float-right" variant="transparent p-0" right>
		              <template slot="button-content">
		                <i class="icon-settings"></i>
		              </template>
		              <b-dropdown-item>Action</b-dropdown-item>
		              <b-dropdown-item>Another action</b-dropdown-item>
		              <b-dropdown-item>Something else here...</b-dropdown-item>
		              <b-dropdown-item disabled>Disabled action</b-dropdown-item>
		            </b-dropdown>
		            <h4 class="mb-0">9.823</h4>
		            <p>Members online</p>
		          </b-card-body>
		          <card-line-chart-example chartId="card-chart-01" class="chart-wrapper px-3" style="height:70px;" :height="70"/>
		        </b-card>
		  </b-col>
		  <b-col sm="6" lg="3">
		        <b-card no-body class="bg-info">
		          <b-card-body class="pb-0">
		            <b-dropdown class="float-right" variant="transparent p-0" right no-caret>
		              <template slot="button-content">
		                <i class="icon-location-pin"></i>
		              </template>
		              <b-dropdown-item>Action</b-dropdown-item>
		              <b-dropdown-item>Another action</b-dropdown-item>
		              <b-dropdown-item>Something else here...</b-dropdown-item>
		              <b-dropdown-item disabled>Disabled action</b-dropdown-item>
		            </b-dropdown>
		            <h4 class="mb-0">9.823</h4>
		            <p>Members online</p>
		          </b-card-body>
		          <card-line-chart-example chartId="card-chart-02" class="chart-wrapper px-3" style="height:70px;" :height="70"/>
		        </b-card>
	    </b-col>
			<b-col sm="6" lg="3">
		        <b-card no-body class="bg-danger">
		          <b-card-body class="pb-0">
		            <b-dropdown class="float-right" variant="transparent p-0" right>
		              <template slot="button-content">
		                <i class="icon-settings"></i>
		              </template>
		              <b-dropdown-item>Action</b-dropdown-item>
		              <b-dropdown-item>Another action</b-dropdown-item>
		              <b-dropdown-item>Something else here...</b-dropdown-item>
		              <b-dropdown-item disabled>Disabled action</b-dropdown-item>
		            </b-dropdown>
		            <h4 class="mb-0">9.823</h4>
		            <p>Members online</p>
		          </b-card-body>
		          <card-line-chart-example chartId="card-chart-04" class="chart-wrapper px-3" style="height:70px;" height="70"/>
		        </b-card>
				</b-col>
	  </b-row>
		<b-row> 
			<b-card>
				<div class="chart-wrapper">
					<chart-pie id="chartTipo"></chart-pie>
				</div>
			</b-card>
		</b-row>
	    <b-card>
	      <b-row>
	        <b-col sm="5">
	          <h4 id="traffic" class="card-title mb-0">Traffic</h4>
	          <div class="small text-muted">November 2017</div>
	        </b-col>
	        <b-col sm="7" class="d-none d-md-block">
	          <b-button type="button" variant="primary" class="float-right"><i class="icon-cloud-download"></i></b-button>
	        </b-col>
	      </b-row>
	      <main-chart-example chartId="main-chart-01" class="chart-wrapper" style="height:300px;margin-top:40px;" height="300"></main-chart-example>
	      <div slot="footer">
	        <b-row class="text-center">
	          <b-col class="mb-sm-2 mb-0">
	            <div class="text-muted">Visits</div>
	            <strong>29.703 Users (40%)</strong>
	            <b-progress height={} class="progress-xs mt-2" :precision="1" variant="success" :value="40"></b-progress>
	          </b-col>
	          <b-col class="mb-sm-2 mb-0 d-md-down-none">
	            <div class="text-muted">Unique</div>
	            <strong>24.093 Users (20%)</strong>
	            <b-progress height={} class="progress-xs mt-2" :precision="1" variant="info" :value="20"></b-progress>
	          </b-col>
	          <b-col class="mb-sm-2 mb-0">
	            <div class="text-muted">Pageviews</div>
	            <strong>78.706 Views (60%)</strong>
	            <b-progress height={} class="progress-xs mt-2" :precision="1" variant="warning" :value="60"></b-progress>
	          </b-col>
	          <b-col class="mb-sm-2 mb-0">
	            <div class="text-muted">New Users</div>
	            <strong>22.123 Users (80%)</strong>
	            <b-progress height={} class="progress-xs mt-2" :precision="1" variant="danger" :value="80"></b-progress>
	          </b-col>
	          <b-col class="mb-sm-2 mb-0 d-md-down-none">
	            <div class="text-muted">Bounce Rate</div>
	            <strong>Average Rate (40.15%)</strong>
	            <b-progress height={} class="progress-xs mt-2" :precision="1" :value="40"></b-progress>
	          </b-col>
	        </b-row>
	      </div>
	    </b-card>    
	</div>
</template>

<script>
	import { Callout } from '@coreui/vue'
	import CalloutChartExample from '@/components/CalloutChartExample'
	import CardLineChartExample from '@/components/CardLineChartExample'
	import MainChartExample from '@/components/MainChartExample'
	import ChartPie from '@/components/ChartPie'



export default{
	name: 'Dashboard',
	data() {
		return {
			selected: [], // Must be an array reference!
      		show: true
		}
		
	},
	components: {
		Callout,
		CalloutChartExample,
		CardLineChartExample,
		MainChartExample,
		ChartPie
	},
	methods: {
	    click () {
	      // do nothing
	    }
	}
}
</script>
