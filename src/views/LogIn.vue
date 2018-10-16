<template>
	<main role="main">		
		<div class="row">
			<div class="col-12 mainback">
				<!-- <button @click="goBack"><i class="fas fa-caret-left"></i> {{back}} </button> -->
				<h2>Iniciar Sesión</h2>
			</div>
		</div>	
		<div class="row">
		    <div class="login col-9 offset-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
		    	<form>			    	
			    	<div class="input-group">
						<div class="input-group-prepend">
							<div class="input-group-text icon">
								<i class="fa fa-user"></i>
							</div>
						</div>	
					<input type="text" class="form-control rounded-0" placeholder="Usuario" aria-label="User" v-model="user">
					</div>			
					<div class="input-group">
						<div class="input-group-prepend">	
							<div class="input-group-text icon">
								<i class="fa fa-lock"></i>
							</div>	
						</div>	
					<input type="password" class="form-control rounded-0" placeholder="Contraseña" aria-label="Password" aria-describedby="button-addon2" v-model="password">
					</div>
			  	</form>    
		        <div class="row">
		        	<div class="col-12">	
			        	<div class="Submit">
				         	<a @click="log()" class="btn btn-outline-secondary rounded-0">Iniciar </a>
				        </div>    
				    </div>
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
				back:'volver',
				user: '',
				password: ''
		    }
		},
		methods: {
			goBack: function(){
				router.go(-1)
			},
			log: function(){
				router.push({ name: 'Dashboard'});
			}
		}
	}
</script>

<style scoped>
	.labels{
		text-align:center;
	}

	.btn {
		color: white; 
	}

	.login {
		padding: 10px;
	}
	
	.label {
		text-align:center;
	}

	.form-control{
		margin-bottom: 20px;
		background:#f4f4f4;
	}

	h2 {
		text-align: center;
		margin-top:50px;
		margin-bottom:50px;
		margin-left:38px;

	}

	.mainback button{
	    border:none;
	    background:#ffffff;
	    text-decoration: none;
	    color:#000;
	    font-size:1.125em;
	    text-transform:uppercase;
	    cursor:pointer;
	}

	.icon{
		background:#ffffff;
		border:none;
		margin-bottom:20px;
	}

	.Finalboton{
		text-align:center;
	}

	.Submit{
		margin:50px auto;
		text-align:center;
	    color:#fff;
	    text-transform: uppercase;
	    font-weight: 700;
	}

	.Submit a{
		background-color: #000;
		margin-left:38px;
	}

	.Submit a:hover{
		background-color:#333333; 
	    transition: 0.2s; 
	}

	@media screen and (max-width:768px){
		h2{	
			margin-left:0px;
		}
	}
</style>