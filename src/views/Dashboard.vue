<template>
	<main role="main" class="animated fadeIn">
		<h1> dashboard </h1>
		 <Callout variant="info">
                    <small class="text-muted">New Clients</small><br>
                    <strong class="h4">9,123</strong>
                    <div class="chart-wrapper" :style="{ top: '-10px'}">
                      <!--<callout-chart-example :data="[35, 23, 56, 22, 97, 23, 64]" variant="#20a8d8" width="80" height="30" />-->
                      <callout-chart-example chartId="callout-chart-01" :data="[35, 23, 56, 22, 97, 23, 64]" variant="info" width="80" height="30" />
                    </div>
                  </Callout>
	</main>
</template>

<script>
	import { Callout } from '@coreui/vue'

	import CalloutChartExample from '@/components/CalloutChartExample'
export default{
	name: 'Dashboard',
	components: {
		Callout,
		CalloutChartExample
	}
}
</script>

<style ></style>