<template>
	<main role="main">
<!-- 		<div class="row">
			<div class="col-12 mainback">
				<button @click="goBack"><i class="fas fa-caret-left"></i> volver </button>
			</div>
		</div> -->	
		<div class="row">
			<div class="col-8 offset-2 titleconsult">
				<h1>{{title}}</h1>
					<h2>{{subtitle}}</h2>
					<small>{{reference}}</small>
			</div>
			<div class="col-md-6 offset-md-3">
				<form autocomplete="off" class="contactdata">
					<div class="form-group">
						<label for="name"><span class="numberconsult">1-</span>{{name}}</label>
						<input type="text" class="form-control rounded-0" id="name" placeholder="Raul Castillo">
					</div>
					<div class="form-group">
						<label for="company"><span class="numberconsult">2-</span>{{company}}</label>
						<input type="text" class="form-control rounded-0" id="company" placeholder="UNTREF">
					</div>
					<div class="form-group">
						<label for="phone"><span class="numberconsult">3-</span>{{phone}}</label>
						<input type="number" class="form-control rounded-0" id="phone" placeholder="01147861427">
					</div>
					<div class="form-group">
						<label for="email"><span class="numberconsult">4-</span>{{email}}</label>
						<input type="email" class="form-control rounded-0" id="email" placeholder="example@gmail.com">
					</div>
					<div class="form-group">
						<label for="description"><span class="numberconsult">5-</span>{{description}}</label>
						<p>{{subdescription}}</p>
						<textarea type="text" class="form-control rounded-0" id="description"></textarea>
					</div>
				</form>
				<button v-on:click="sendalert()" class="btn btn-primary offset-5 sendbtn rounded-0" type="submit" value="Submit">Enviar</button>	
			</div>
		</div>
	</main>	
</template>	
<script>
	export default{
		name:"Contact",
		data:function(){
			return{
				title:"consulta de oferta tecnológica",
				subtitle:"Complete el siguiente formulario con sus datos personales y describa su consulta o el tipo de búsqueda que quiere realizar",
				reference:"*Obligatorio",
				name:"Nombre y Apellido",
				company:"Institución/empresa *",
				phone:"Teléfono *",
				email:"Email *",
				description:"Descripción de consulta *",
				subdescription:"A continuación escriba su consulta o tipo de búsqueda que quiera realizar y en breve nos estaremos comunicando.",
			}
		},	
		methods:{
			sendalert:function(){
				alert("tu mensaje ha sido enviado");
			}
		}
	}	
	
</script>
<style scoped>
main {
	margin-top: 20px;
}

.mainback button{
    border:none;
    background-color:#ffffff;
    color:#000;
    font-size:1.125em;
    text-transform:uppercase;
}

.titleconsult h1{
    text-transform: uppercase;
    text-align: center;
}

.titleconsult h2{
    font-size: inherit;
    text-align: center;
 
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
}
</style>
