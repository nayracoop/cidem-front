<template>
	<main role="main">
		<div class="row">
			<div class="col-12 text-center">
				<h1>Página No Encontrada</h1>
			</div>	
		</div>
		<div class="row">
			<div class="col-10 offset-1 sub">
				<p>{{description}} <span><a @click="goTo('Lander')">aquí</a></span>.</p>
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
	data(){
		return{
			description:"La página a la cual está intentando acceder no existe. Puede visitar nuestra página principal haciendo click"
		}
	},

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
	font-size:1.5em;
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

@media screen and (max-width: 576px) {
	h1{
		font-size:1.625em;
	}

	.sub p{
		font-size:1.25em;
	}
}
</style>