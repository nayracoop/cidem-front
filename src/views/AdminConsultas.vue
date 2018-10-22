<template>
	<div>
		<h1>Consultas</h1>
		<ul v-for='consulta in consultas' :key='consulta.id'>
			<h3>{{consulta.name}}</h3>
			<li>{{consulta.phone}}</li>
			<li>{{consulta.email}}</li>
			<li>{{consulta.description}}</li>
		</ul>
		
	</div>
</template>

<script>
export default {
	name: 'AdminConsultas',
	computed: {
		consultas() {
			return this.$store.state.consultas;
		}
	}
}
</script>