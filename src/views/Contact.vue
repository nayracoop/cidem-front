<template>
	<main role="main">
		<div class="row">
			<div class="col-12 mainback">
				<button @click="volver()"><i class="fas fa-caret-left"></i> volver </button>
			</div>
		</div>	
		<div class="row">
			<div class="col-12 titleconsult">
				<h1>Consulta de Oferta Tecnológica</h1>
			</div>
		</div>
		<div class="formulario" v-if="!consultaEnviada">
			<div class="row">		
				<div class="col-sm-10 offset-sm-1 titleconsult">
					<h2>Complete el siguiente formulario con sus datos personales y describa su consulta o el tipo de búsqueda que quiere realizar.</h2>
				</div>		
			</div>
			<div class="row">		
				<div class="col-12 offset-sm-2 titleconsult">					
						<small>* Obligatorio</small>
				</div>
			</div>	
			<div class="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
				<form autocomplete="off" class="contactdata needs-validation" @submit="submitMessage($event)">
					<div class="form-group">
						<label for="name"><span class="numberconsult">1-</span>Nombre y Apellido *</label>
						<input required type="text" class="form-control rounded-0" id="name" placeholder="Raul Castillo" v-model="form.name">
					</div>
					<div class="form-group">
						<label for="company"><span class="numberconsult">2-</span>Institución/empresa *</label>
						<input required type="text" class="form-control rounded-0" id="company" placeholder="UNTREF" v-model="form.institution">
					</div>
					<div class="form-group">
						<label for="phone"><span class="numberconsult">3-</span>Teléfono</label>
						<input type="number" class="form-control rounded-0" id="phone" placeholder="01147861427" v-model="form.phone">
					</div>
					<div class="form-group">
						<label for="email"><span class="numberconsult">4-</span>Email *</label>
						<input required type="email" class="form-control rounded-0" id="email" placeholder="example@gmail.com" v-model="form.email">
					</div>
					<div class="form-group">
						<label  for="description"><span class="numberconsult">5-</span>Mensaje de consulta *</label>
						<p>A continuación escriba su consulta o tipo de búsqueda que quiera realizar y en breve nos estaremos comunicando.</p>
						<textarea required type="text" class="form-control rounded-0" id="description" v-model="form.description"></textarea>
					</div>
					<div class="text-center">
						<button class="btn sendbtn rounded-0" type="submit" value="Submit" :disable="$v.form.$invalid">Enviar</button>
					</div>	

				</form>
			</div>
		</div>
		<div v-if="consultaEnviada">
			<div class="row">
				<div class="text-center center col-10 offset-1 mb-5 alert">
					<h3> Su consulta fue enviada exitosamente </h3>
				</div>
			</div>
		</div>
	</main>	
</template>	
<script>
import { maxLength , minLength , required, email, url, alpha } from 'vuelidate/lib/validators'

	export default{
		name:"Contact",
		data:function(){
			return{
				form: {
					name: '',
					email: '',
					institution: '',
					description: '',
					phone: '' ,
					date: '',
					time: '',
				},
				consultaEnviada: false,
				invalidForm: false,
				loading: false,
			}
		},	
		validations:{
			form: {
				name: {
					required
				},
				email: { required , email },
				institution: {
					required
				},
				description: {
					required
				},
				phone: {required},

			},
		},
		methods:{
			submitMessage: function(e){
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth();
				var yyyy = today.getFullYear();
				var now = today.getHours();

				var today = dd+"/"+mm+"/"+yyyy;
				this.form.date=today;
				this.form.time= now;
				this.$store.dispatch('postMessage', this.form);
				e.preventDefault();
				this.consultaEnviada = true;
			},
			volver() {
				this.$router.go(-1);
			}
		}
	}	
	
</script>
<style scoped>
main {
	margin:20px auto;
}

.mainback{
	padding-bottom:20px;
}

.mainback button{
    border:none;
    background-color:#ffffff;
    color:#000;
    font-size:1.125em;
    text-transform:uppercase;
    cursor:pointer;
}

.titleconsult h1{
    text-transform: uppercase;
    text-align: center;
}

.titleconsult h2{
    padding-bottom:20px;
    font-size: 1.25em;
    color: #4a4a4a;
    text-align: justify;
    margin-top:20px;
}

.form-group input::placeholder{
	font-style: italic;
}

.contactdata{
    margin-top:30px;
}

.contactdata textarea,
.contactdata input{
    border:none;
    border-bottom: 2px solid #000; 
}

.contactdata textarea{
    height: 100px;
}

.contactdata label{
    font-weight: 700;
}

.contactdata p{
    margin-left:10px;
}

.contactdata .numberconsult{
margin-right: 10px;    
}

.sendbtn{
    margin-top: 20px;
    margin-bottom:20px;
    background-color: #000;
    color:#fff;
    text-transform: uppercase;
    font-weight: 700;
    border:none;
}

.alert h3{
    color: #4a4a4a;
    margin:80px auto;
}

@media screen and (max-width: 576px) {
	
	
	.titleconsult h1{
		font-size: 1.625em;
	}

	.alert h3{
		font-size:1.5em;
	}

	.mainback{
		margin-bottom:10px;
	}

	.contactdata p,
	.contactdata label,
	.titleconsult h2,
	.mainback button{
		font-size:1em;
	}

	.contactdata textarea{
		height:50px;
	}

}
</style>
