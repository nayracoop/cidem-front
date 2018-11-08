<template>
	<main role="main">
		<div class="row">
			<div class="col-12 text-center">
				<h1>Página No Encontrada</h1>
			</div>	
		</div>
		<div class="row">
			<div class="col-10 offset-1 sub">
				<p>La página a la cual está intentando acceder no existe. Puede visitar nuestra página principal haciendo click <span><a @click="goTo('Lander')">aquí</a></span>.</p>
			</div>
		</div>	
			<h2></h2>
		</div>
	</main>
</template>

<script>
import router from '../router'

export default {
	name: "NotFound404",
	created() {
	
	},
	computed: {
	
	},
	methods:{
	  	goTo: function (link) {
	  		router.push({ name: link});     
  		}
  
	}
}
	
</script>

<style scoped>

h1{
	margin-top:20px;
	margin-bottom:60px;
}

.sub p{
	font-size:1.25em;
	color:#4a4a4a;
	margin-bottom:240px;
}

.sub a:hover{
	cursor: pointer;
	color:#0645ad;
	text-decoration:underline;
}

.sub a{
	color:#0645ad;
	text-decoration:underline;
}
</style>