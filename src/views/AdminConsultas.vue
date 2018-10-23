<template>
	<div>
		<h1>Consultas</h1>
		<div class="row">
			<b-card class="border-danger">
				<div slot="header">
					<p><strong>martu@gmail.com</strong> el 11/10/18 a las 16:30 </p>
				</div>
				<ul v-for='consulta in consultas' :key='consulta.id'>
					<h3>{{consulta.name}}</h3>
					<li>{{consulta.phone}}</li>
					<li>{{consulta.email}}</li>
					<li>{{consulta.description}}</li>
				</ul>
			</b-card>
		</div>
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