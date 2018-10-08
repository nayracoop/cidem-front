<template>
	<div class="d-block d-lg-none">
		<div class="row landerHiddenF">
			<div class="col-sm-12 col-md-10 offset-md-1">
				<label for="Tipodeservicio"></label>
				<button class="btn rounded btn-outline-secondary btn-block" type="button" data-toggle="dropdown">{{title}}<span class="Filterarrow"><i class="fas fa-caret-down"></i></span></button>
				<ul class="dropdown-menu scrollable-menu" role="menu" aria-expanded="false">
					<li>Análisis</li>
					<li>Asistencia Técnica</li>
					<li>Calibración</li>
					<li>Calificación</li>
					<li>Certificación</li>
					<li>Certificación/Homologación /Regímenes Especiales</li>
					<li>Control ambiental/Medio ambiental</li>
					<li>Control de calidad</li>
					<li>Desarrollo de proceso</li>
					<li>Desarrollo de productos</li>
					<li>Ensayo</li>
					<li>Formación de RRHH</li>
					<li>Peritake</li>
					<li>Programación y desarrollo de software</li>
					<li>Tecnología de Gestión</li>
				</ul>
			</div>
		</div>
		<div class="row landerHiddenF">	
			<div class="col-sm-12 col-md-10 offset-md-1">
				<label for="Sector"></label>
				<button type="button" class="btn rounded btn-outline-secondary btn-block" data-toggle="dropdown">{{title}}<span class="Filterarrow"><i class="fas fa-caret-down"></i></span></button>
				<ul class="dropdown-menu scrollable-menu" role="menu">
					<li>Administración pública</li>
					<li>Agua y saneamiento</li>
					<li>Ambiente y tecnología</li>
					<li>Arte y cultura</li>
					<li>Ciencia, tecnología e innovación</li>
					<li>Derechos y ciudadanía</li>
					<li>Desarrollo productivo</li>
					<li>Desarrollo rural</li>
					<li>Desarrollo social</li>
					<li>Desarrollo urbano</li>
					<li>Educación</li>
					<li>Energía</li>
					<li>Infraestructura</li>
					<li>Minería e hidrocarburos</li>
					<li>Ordenamiento territorial</li>
					<li>Salud y deportes</li>
					<li>Tecnologías de la información y la comunicación</li>
					<li>Telecomunicaciones</li>
					<li>Transporte y logística</li>
					<li>Turismo</li>
				</ul>
			</div>
		</div> 
			<div class="row landerHiddenF">
				<div class="col-sm-12 col-md-10 offset-md-1">
					<label for="Destinatario"></label>
					<button type="button" class="btn rounded btn-outline-secondary btn-block" data-toggle="dropdown">{{title}}<span class="Filterarrow"><i class="fas fa-caret-down"></i></span></button>
					<ul class="dropdown-menu scrollable-menu" role="menu">
						<li>Comunidad</li>
						<li>Cooperativas y Org. de la economía social</li>
						<li>Emprendedores</li>
						<li>Empresas</li>
						<li>Gobierno Nacional</li>
						<li>Gobierno Provincial </li>
						<li>Gobierno Local</li>
						<li>Organismos de ciencia y técnica</li>
						<li>Org. no gubernamental (ONG)</li>
						<li>Universidades</li>
					</ul>
				</div>
			</div>
		<div class="row landerHiddenS">
			<div class="col-sm-12 col-md-10 offset-md-1">
				<div class="input-group">
					<input type="text" class="form-control" placeholder="Buscar por ubicación, área, palabras claves..." aria-label="Recipient's username" aria-describedby="button-addon2">
					<div class="input-group-append">
						<button class="btn rounded searcherbtn" type="button">
						<i class="d block d-md-none fa fa-search lupa"></i><span class= "d-none d-md-block">Buscar</span></button>
					</div>
				</div>
			</div>
		</div>	
	</div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<script>
	export default{
		data:function(){
			return{
				title:"Sector",
			}
		}
}
</script>
<style>
.searcherbtn{
    background-color: #000;
    color:#fff;
    text-transform: uppercase;
    font-weight: 700;
}

.searcherbtn:hover{
    background-color:#333333;
    color:#fff; 
    transition: 0.2s;   
}

.searcherbox{
    background-color: #f4f4f4; 
}

.landerHiddenF button{
    display:flex;
    justify-content: space-between;
}

.scrollable-menu{
    max-height: 200px;
    overflow-x: hidden;
    max-width: 93%;
}

.scrollable-menu li:hover{
    background-color:#f1f1f1; 
}

.scrollable-menu li:active{
    background-color:#17aae4;
}

.scrollable-menu{
    width: inherit;
}

.landerHiddenS{
    margin-top:18px;
}
</style>