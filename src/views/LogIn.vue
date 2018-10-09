<template>
	<main role="main">
		<button @click="goBack"> volver </button>
		<div class="col-12"
			<h2> Iniciar Sesión </h2>
		</div>
		<div class="row">
		    <div class="login d-none d-md-inline col-md-6 col-lg-6 offset-3">
		    	<h5>Usuario</h5>
		    	<div class="textbox form-control rounded-0 place">
					<i class="fa fa-user"></i>
					<input 
						type="text" 
						placeholder="User" 
						aria-label="User" 
						v-model="user">
				</div>
				<h5>Contraseña</h5>
				<div class="textbox">
					<i class="fa fa-lock"></i>
					<input 
						type="password" 
						class=" form-control rounded-0 place" 
						placeholder="Password" 
						aria-label="Password" 	
						aria-describedby="button-addon2"
						v-model="password">
		        </div>
		        <div>
		          <a class="btn btn-outline-secondary rounded-0 boton">Iniciar Sesión</a>
		        </div>                
		    </div>
		</div>
	</main>
</template>

<script>
	import store from '../store'
	import router from '../router'

	export default {
		name: 'LogIn',
		data () {
			return {
				user: '',
				password: ''
		    }
		},
		methods: {
			goBack: function(){
				router.go(-1)
			}
		}
	}
</script>

<style scoped>
	.btn {
		color: white; 
	}
	.login {
		padding: 10px;

	}
	.form-control{
		margin-bottom: 10px;
	}
	.textbox i {
		float: left;
	}
	h2 {
		text-align: center;
	}
</style>