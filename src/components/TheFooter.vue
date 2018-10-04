<template>
	<div class="footer">	
		<div class="row justify-content-between final">
			<div class="col-6 col-sm-6 col-md-3 cidem">	
  				<img src="../assets/img/cidem-logo.jpg" alt="logo-cidem"> 			  					   
			</div>	
			<div class="d-none d-md-inline col-md-6 direccion">
				<p>Secretaria de Investigación y Desarrollo- SID
				Av. San Martín 2508, Caseros, Buenos Aires│4716-0044│desarrollo@untref.edu.ar</p>
			</div>
			<div class="col-6 col-md-3 cidem">	
	  			<a href="#"><img src="../assets/img/logoSID.jpg" alt="logo-SID"></a> 			  					   
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
