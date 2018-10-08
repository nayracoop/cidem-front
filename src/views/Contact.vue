<template>
	<main role="main">
		<div class="row">
			<div class="col-12 titleconsult">
				<h1>{{title}}</h1>
					<h2>{{subtitle}}</h2>
					<small>{{reference}}</small>
			</div>
			<div class="col-6">
				<form autocomplete="off" class="contactdata">
					<div class="form-group">
						<label for="name"><span class="numberconsult">{{first}}</span>{{name}}</label>
						<input type="text" class="form-control" id="name" placeholder="Raul Castillo">
					</div>
					<div class="form-group">
						<label for="company"><span class="numberconsult">{{second}}</span>{{company}}</label>
						<input type="text" class="form-control" id="company" placeholder="UNTREF">
					</div>
					<div class="form-group">
						<label for="phone"><span class="numberconsult">{{third}}</span>{{phone}}</label>
						<input type="number" class="form-control" id="phone" placeholder="01147861427">
					</div>
					<div class="form-group">
						<label for="email"><span class="numberconsult">{{fourth}}</span>{{email}}</label>
						<input type="email" class="form-control" id="email" placeholder="example@gmail.com">
					</div>
					<div class="form-group">
						<label for="description"><span class="numberconsult">{{fifth}}</span>{{description}}</label>
						<p>{{subdescription}}</p>
						<textarea type="text" class="form-control" id="description"></textarea>
					</div>
				</form>
				<button v-on:click="sendalert()" class="btn btn-primary offset-5 sendbtn" type="submit" value="Submit">{{send}}</button>	
			</div>
		</div>
	</main>	
</template>	
<script>
	export default{
		name:"contact",
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
				send:"Enviar",
				first:"1.",
				second:"2.",
				third:"3.",	
				fourth:"4.",
				fifth:"5."
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

.titleconsult h1{
    text-transform: uppercase;
}

.titleconsult h2{
    font-size: inherit; 
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
