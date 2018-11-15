<template>
	<main role="main">
		<div class="row">
			<div class="col-6 mainback d-print-none">
				<button @click="goBack()"><i class="fas fa-caret-left"></i> Volver</button>
			</div>	
				<div class="col-6 d-none d-md-block printbtn d-print-none">
					<button v-on:click="printpage()"><i class="fas fa-print"></i></button>
				</div>
			</div>
		</div>	
		<div class="row navficha flex justify-content-between"> <!-- FIRST LINE -->
			<!--- BUGEADO NO FUNCIONA BIEN -->			
			<div v-if="!(total===0)" class="col-12 text-center navfile">
				<a v-if="prev" @click="getServiceById(prev)"><i class="fas fa-angle-double-left"></i><span class="d-none  d-md-inline">Anterior</span></a>
				<p >Resultado {{current + 1}} de {{total}}</p>
				<a v-if="next" @click="getServiceById(next)"><span class="d-none d-md-inline">Siguiente</span><i class="fas fa-angle-double-right"></i></a>	
			</div>
		</div>	
		<div class="row">
			<div class="col-sm-12 col-lg-10 offset-md-1">
				<div class="titlefile mb-4">
					<h1>{{ service.name }}</h1>
				</div>
				<div class="row">
					<div class="col-md-9">
						<div class="row">
							<div class="col-sm-3 categ">
								<h2>Unidad</h2>
							</div>
							<div class="col-sm-9 categresult">
								<p><span v-for="service in serviceFilters[0]">{{service}} <span v-if="serviceFilters[0].length > 1">, </span> </span></p>
							</div>
							<div v-if="serviceFilters[1].length > 0" class="col-sm-3 categ">
								<h2>Subunidad</h2>
							</div>
							<div v-if="serviceFilters[1].length > 0" class="col-sm-9 categresult">
								<p><span v-for="service in serviceFilters[1]">{{service}} <span v-if="serviceFilters[0].length > 1">, </span> </span></p>

							</div>
							<div class="col-sm-3 categ">
								<h2>Tipo de servicio</h2>
							</div>
							<div class="col-sm-9 categresult">
								<p><span v-for="service in serviceFilters[2]">{{service}} <span v-if="serviceFilters[0].length > 1">, </span> </span></p>
							</div>
							<div class="col-sm-3 categ">
								<h2>Sector al que está destinado el servicio</h2>
							</div>
							<div class="col-sm-9 categresult">
								<p><span v-for="service in serviceFilters[3]">{{service}} <span v-if="serviceFilters[0].length > 1">, </span> </span></p>

							</div>
							<div class="col-sm-3 categ">
								<h2>Destinatario</h2>
							</div>
							<div class="col-sm-9 categresult">
								<p><span v-for="service in serviceFilters[4]">{{service}} <span v-if="serviceFilters[0].length > 1">, </span> </span></p>
							</div>
							<div class="col-sm-3 categ">
								<h2>Descripción</h2>
							</div>
							<div class="col-md-12 categresultlast">
								<p>{{service.description}}</p>
							</div>
						</div>
					</div>
					<div class="col-12 col-lg-3 contact">
						<aside>
							<h3>Información de contacto</h3>
							<div class="vcard"> 
								<p>
									<span class="name"><i class="fas fa-user"></i>{{contact_name}}</span>
									<span class="email"><i class="fas fa-envelope"></i>{{contact_email}}</span> 
									<span class="number"><i class="fas fa-phone ph"></i>{{contact_number}}</span>
									<span v-if="contact_web" class="region"><i class="fas fa-globe"></i>{{contact_web}}</span>
									<span class="region"><i class="fas fa-map-marker-alt"></i>{{contact_adress}}</span>

								</p>
							</div>
						</aside>
					</div>	
				</div>
			</div>
		</div>			
	</main>
</template>

<script>
import router from '../router';
import store from '../store'

	export default{
		name:"Service",
		data:function(){
			return{
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
				contact_name:"Diego Federico",
				contact_email:"dfederico@untref.edu.ar",
				contact_number:"01147599810",
				contact_adress:"Av. San Martín 2921, Caseros (1678), Provincia de Buenos Aires",
				contact_web: 'www.hola.com'

			}
		},
		beforeRouteEnter (to, from, next) {
			store.dispatch('fetchService', to.query.id).then(() =>{
				next();
			});
		},
		befoteRouteUpdate(to, from, next){
			store.dispatch('fetchService', to.query.id).then(() =>{
				next();
			});
		},
		created() {
			//this.$store.dispatch('fetchService', this.$route.query.id);	
		},
		computed: {
			searchQuery: function(){
				return this.$store.state.searchQuery;
			},
			searchQueryFilters() {
				return this.$store.state.searchQueryFilters;
			},
			serviceFilters(){
				return this.$store.getters.serviceFiltersNames;
			},
			service() {
								console.log(this.$store.state.service.data);

				return this.$store.state.service.data;
			},
			services(){
	        	return this.$store.state.fullServices.data;
			},
			id(){
				return this.$route.query.id;
			},
			serviceIdArray(){
				return this.$store.getters.serviceIdArray;
			},
			total(){
				if (this.serviceIdArray){
					return this.serviceIdArray.length;
				}
			},
			current(){
				return this.serviceIdArray.indexOf(this.id);
			},
			prev(){
				if (this.serviceIdArray[this.current-1]){
					return this.serviceIdArray[this.current-1];
				}
			},
			next(){
				if (this.serviceIdArray[this.current+1]){
					return this.serviceIdArray[this.current+1];
				}
			}

		},
		methods:{
			printpage:function(){
				window.print();
			},
			getServiceById: function (id) {
		      //this.$store.dispatch('getServiceById', id);
		      router.replace({ name: 'Service', query:{id: id}});
		      this.$store.dispatch('fetchService', id);
		    },
		    goBack: function(){
				 this.$store.dispatch('fetchServices');
				 router.go(-1);
     			 //router.push({ name: 'Results', query:{services: this.searchQuery, filters: this.searchQueryFilters}});     
			}
		}
	}
</script>

<style>
main {
	margin:20px auto;
}

.vcard p span:hover {
	cursor: pointer;
}

.navficha{
    padding-bottom: 20px;
}

.navficha i{
    margin:0 5px;
}

.navfile p,
.navfile a{
    display: inline-block;
}

.navfile p{
    margin:0 70px;
    font-size:1.125em;
}

.mainback button{
    border:none;
    background-color:#ffffff;
    color:#000;
    font-size:1.125em;
    text-transform:uppercase;
    cursor:pointer;
}

.navfile a {
    text-decoration: none;
    color:#000;
    font-size:1.125em;
}

.printbtn{
	text-align:right;
}

.printbtn button{
	cursor:pointer;
	background:#fff;
	border:none;
	border-bottom:solid #17aae4;
	margin-right:4px;
}

.categresultlast p,
.categresult p{
    font-style: italic;
    color:#7c7c7c;
    margin-bottom:20px;
}

.categresult p {
	cursor: pointer;
}
.categresultlast p{
 text-align: justify;
}

.contact h3,
.categ h2{
    font-size:1.125em; 
    font-weight:500; 
}

.categ h2{
	margin-bottom:30px;
}

aside .vcard{
    color:#17aae4;
}

aside .vcard i{
    margin-right:4px;
   
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

@media screen and (max-width: 576px){
  

    .mainback{
        margin-bottom: 10px; 
    }

    .mainback button{
    	font-size: 1em;
    }

    .titlefile h1{
    	font-size:1.625em;
    	text-align:center;
    }

    .contact h3,
    .categ h2{
		font-size:1em;
		margin-bottom:15px;
	}

	.navfile p{
		font-size:1em;
		padding-bottom:20px;
	}

	.vcard p,	
	.navfile p,
	.categresultlast,
	.categresult p{
		font-size:1em;
	}
}
</style>