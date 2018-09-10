<template>
	<div class="footer">	
		<div class="menufooter">
			<ul>	
				<li><a href="http://google.com">Términos de uso</a></li>
				<li><a href="http://google.com>">Políticas de privacidad</a></li>
				<li><a href="http://google.com>">Presentación</a></li>
			</ul>						
		</div>						
		<div class="row justify-content-between final">
			<div class="col-6 col-sm-6 col-md-3 cidem">	
  				<img src="../assets/img/cidem-logo.png" alt="logo-cidem"> 			  					   
			</div>	
			<div class="d-none d-md-inline col-md-6 direccion">
				<p>Centro de Innovación y Desarrollo de Empresas y Organizaciones - CIDEM |
				Av. San Martín 2921, 2º piso Caseros, Buenos Aires | 4759-9686/9810 | cidem@untref.edu.ar</p>
			</div>
			<div class="col-6 col-sm-6 col-md-2 copyright">
				<p>Copyright 2018 
				Universidad Nacional 
				de Tres de Febrero</p>
			</div>
		</div>						
	</div>		
</template>

<script>
export default {
  name: 'TheFooter',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
	border-top:1px solid rgba(0, 0, 0, 0.2);
}

.menufooter ul{
	margin-top: 1em;
	padding:0;
	padding-bottom: 2em;
}
	
.menufooter ul li{
	display: inline-block;
	list-style: none;	
	margin-right:100px;
}

.menufooter ul li a{
	font-size: 1.05em;
	font-family:'DistefanoSans-Regular', 'DistefanoSans';
	color:#000;
	text-decoration: none;
}

.footer .cidem img{
	width: 100%;
    max-width: 200px; 
    max-height: 200px;
}

.copyright p{
	margin:0 auto;
	font-size: 0.875em;
	font-family:'DistefanoSans-Regular', 'DistefanoSans'; 
	text-transform: uppercase;
	text-align: right;
	white-space: pre-line;
}

.direccion p{
	margin:0 auto;
	font-family:'DistefanoSans-Light', 'DistefanoSans';
	font-size: 0.875em;
    white-space: pre-line;
}

.final{
	padding-bottom: 1em;
}

</style>
