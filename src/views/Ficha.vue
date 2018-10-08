<template>
	<div class="container">
		<main role="main">
			<div class="row navficha"> <!-- FIRST LINE -->
				<div class="col-12 col-md-2 mainback">
					<a :href="backpage"><i class="fas fa-caret-left"></i>{{ back }}</a>
				</div>
				<div class="col-12 col-md-7 offset-md-2 navfile">
					<a :href="beforefile"><i class="fas fa-angle-double-left"></i><span class="d-none  d-md-inline">{{ before }}</span></a>
					<p>{{ results }}</p>
					<a :href="nextfile"><span class="d-none d-md-inline">{{next}}</span><i class="fas fa-angle-double-right"></i></a>	
				</div>
				<div class="d-none d-md-block col-1 printbtn">
					<button v-on:click="printpage()"><i class="fas fa-print"></i></button>
				</div>
			</div>	
			<div class="row">
				<div class="col-sm-12 col-lg-10 offset-md-1">
					<div class="titlefile">
						<h1>{{fileTitle}}</h1>
					</div>
					<div class="row">
						<div class="col-md-9">
							<div class="row">
								<div class="col-sm-3 categ">
									<h2>{{C_Uni}}</h2>
								</div>
								<div class="col-sm-9 categresult">
									<p>{{Uni_results}}</p>
								</div>
								<div class="col-sm-3 categ">
									<h2>{{C_Sub}}</h2>
								</div>
								<div class="col-sm-9 categresult">
									<p>{{Sub_results}}</p>
								</div>
								<div class="col-sm-3 categ">
									<h2>{{C_Tipo}}</h2>
								</div>
								<div class="col-sm-9 categresult">
									<p>{{Tipo_Results}}</p>
								</div>
								<div class="col-sm-3 categ">
									<h2>{{C_Sec}}</h2>
								</div>
								<div class="col-sm-9 categresult">
									<p>{{Sec_results}}</p>
								</div>
								<div class="col-sm-3 categ">
									<h2>{{C_Dest}}</h2>
								</div>
								<div class="col-sm-9 categresult">
									<p>{{Dest_results}}</p>
								</div>
								<div class="col-sm-3 categ">
									<h2>{{C_Desc}}</h2>
								</div>
								<div class="col-md-12 categresultlast">
									<p>{{Desc_results}}</p>
								</div>
							</div>
						</div>
						<div class="col-12 col-lg-3 contact">
							<aside>
								<h3>{{contact_info}}</h3>
								<div class="vcard"> 
									<p>
									<span class="name"><i class="fas fa-user"></i>{{contact_name}}</span>
									<span class="email"><i class="fas fa-envelope"></i>{{contact_email}}</span> 
									<span class="number"><i class="fas fa-phone ph"></i>{{contact_number}}</span>
									<span class="region"><i class="fas fa-map-marker-alt"></i>{{contact_adress}}</span>
									</p>
								</div>
							</aside>
						</div>	
					</div>
				</div>
			</div>			
		</main>
	</div>
	
</template>
<script>
	export default{
		data:function(){
			return{
				backpage:"#",
				beforefile:"#",
				nextfile:"#",
				back:"volver",
				before:"Anterior",
				next:"Siguiente",
				results:"Resultado 1 de 3", /*results:"Resultado" n "de" n,*/
				fileTitle:"Asistencia técnica al fortalecimiento institucional",
				C_Uni:"Unidad",
				Uni_results:"Centro de Innovación y Desarrollo de Empresas y Organizaciones - CIDEM",
				C_Sub:"Subunidad",
				Sub_results:"Coordinación de Proyectos Institucionales",
				C_Tipo:"Tipo de Servicio",
				Tipo_Results:"Asistencia técnica",
				C_Sec:"Sector al que está destinado el Servicio",
				Sec_results:"Organismos públicos",
				C_Dest:"Destinatario",
				Dest_results:"Universidad",
				C_Desc:"Descripción",
				Desc_results:"Dessarrollo y ejecución de proyectos de fortalecimiento institucional de organismos públicos (Gobierno Nacional, Subnacional y Local). Se provee asistencia y asesoramiento en proceso de fortalecimiento institucional, orientados a la incorporación de capacidades, como por ejemplo mejora de procesos de gestión, realización de estudios y diagnósticos sectoriales, reorganizaciones y mejoras organizativas, gestión por resultados, diseño y puesta en funcionamiento de agencias y áreas de promoción económica, implementación de estándares de calidad y servicios al vecino.",
				contact_info:"Información de contacto",
				contact_name:"Diego Federico",
				contact_email:"dfederico@untref.edu.ar",
				contact_number:"01147599810",
				contact_adress:"Av. San Martín 2921, Caseros (1678), Provincia de Buenos Aires"

			}
		},
		methods:{
			printpage:function(){
				window.print();
			}
		}
	}
</script>

<style scope>

.navficha{
    padding-bottom: 40px;
}

.navficha i{
    margin:0 5px;
}

.navfile p,
.navfile a{
    display: inline-block;
}

.navfile p{
    margin:0 20px;
    font-size:1.125em;
}

.mainback a{
    text-transform: uppercase;
}

.navfile a,
.mainback a{
    text-decoration: none;
    color:#000;
    font-size:1.125em;
}

.printbtn{
	text-align:right;
}

.titlefile h1{
    font-size:1.3131em;
    font-weight: 700;
    margin-bottom: 20px;
}

.categresultlast p,
.categresult p{
    font-style: italic;
    color:#7c7c7c;
}

.categ:nth-child(7){
    margin-bottom:10px;
} 

.categresultlast p{
 text-align: justify;
}

.contact h3,
.categ h2{
    font-size:1.125em; 
    font-weight: 700;
}

aside .vcard{
    color:#17aae4;
}

aside .vcard i{
    margin-right:4px;
    font-size:;
}

aside .vcard span {
    display: block;
    margin:10px auto;
}

aside .name {
    margin:0;
    color:#7c7c7c;
}

aside .ph{
    transform: rotate(90deg);
}

@media screen and (max-width: 768px){
    .navfile{
        display: flex;
        justify-content: space-between;
    }    

    .mainback a{
        color:#17aae4;
    }
    .mainback{
        margin-bottom: 10px; 
    }
}


</style>