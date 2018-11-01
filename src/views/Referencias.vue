<template>
	<main role="main">
<!-- 		<div class="row">
			<div class="col-12 mainback">
				<button @click="goBack"><i class="fas fa-caret-left"></i> volver </button>
			</div>
		</div> -->			
		<div class="row">
			<div class="col-12 OFtitle">
				<h1> {{ofertaRef.title}}</h1>
			</div>
			<div class="col-12 col-lg-10 offset-lg-1 OFp">
				<p> {{ofertaRef.description}}</p>
			</div>
			<div class="col-12 col-md-10 offset-md-1 OFsub">
				<h2>Referencias por tipo de servicio</h2>
			</div>	
		</div>
		<div class="references">
			<div class="row servicesRow">
				<div class="offset-1 offset-lg-2 OFicons">
					<i class="fas fa-search"></i>
				</div>	
				<div class="col-12 col-md-7 col-lg-6 offset-md-1 OFtipos">
					<h3>{{title_1}}</h3>
					<p>{{description_1}}</p>
				</div>	
			</div>	
			<div class="row servicesRow">	
				<div class="col-12 col-md-7 offset-md-1 col-lg-6 offset-lg-2 order-1 order-md-0 OFtipos">
					<h3>{{title_2}}</h3>
					<p>{{description_2}}</p>
				</div>	
				<div class="offset-md-1 order-0 order-md-1 OFicons">
					<i class="fas fa-chalkboard-teacher"></i>
				</div>
			</div>
			<div class="row servicesRow">
				<div class="offset-1 offset-lg-2 OFicons">
					<i class="fas fa-microscope"></i>
				</div>	
				<div class="col-12 col-md-7 col-lg-6 offset-md-1 OFtipos">
					<h3>{{title_3}}</h3>
					<p>{{description_3}}</p>
				</div>	
			</div>
			<div class="row servicesRow">	
				<div class="col-12 col-md-7 offset-md-1 col-lg-6 offset-lg-2 order-1 order-md-0 OFtipos">
					<h3>{{title_4}}</h3>
					<p>{{description_4}}</p>
				</div>	
				<div class="offset-md-1 order-0 order-md-1 OFicons">
					<i class="fas fa-clipboard-list"></i>
				</div>
			</div>
			<div class="row servicesRow">	
				<div class="offset-1 offset-lg-2 OFicons">
					<i class="fas fa-clipboard-check"></i>
				</div>
				<div class="col-12 col-md-7 col-lg-6 offset-md-1 OFtipos">
					<h3>{{title_5}}</h3>
					<p>{{description_5}}</p>
				</div>	
			</div>
			<div class="row servicesRow">	
				<div class="col-12 col-md-7 offset-md-1 col-lg-6 offset-lg-2 order-1 order-md-0 OFtipos">
					<h3>{{title_6}}</h3>
					<p>{{description_6}}</p>
				</div>	
				<div class="offset-md-1 order-0 order-md-1 OFicons">
					<i class="fab fa-envira"></i>
				</div>
			</div>
			<div class="row servicesRow">	
				<div class="offset-1 offset-lg-2 OFicons">
					<i class="fas fa-tasks "></i>
				</div>
				<div class="col-12 col-md-7 col-lg-6 offset-md-1 OFtipos">
					<h3>{{title_7}}</h3>
					<p>{{description_7}}</p>
				</div>	
			</div>
			<div class="row servicesRow">	
				<div class="col-12 col-md-7 offset-md-1 col-lg-6 offset-lg-2 order-1 order-md-0 OFtipos">
					<h3>{{title_8}}</h3>
					<p>{{description_8}}</p>
				</div>	
				<div class="offset-md-1 order-0 order-md-1 OFicons">
					<i class="fas fa-cogs"></i>
				</div>
			</div>
			<div class="row servicesRow">	
				<div class="offset-1 offset-lg-2 OFicons">	
					<i class="fas fa-chart-line "></i>
				</div>
				<div class="col-12 col-md-7 col-lg-6 offset-md-1 OFtipos">
					<h3>{{title_9}}</h3>
					<p>{{description_9}}</p>
				</div>	
			</div>
			<div class="row servicesRow">	
				<div class="col-12 col-md-7 offset-md-1 col-lg-6 offset-lg-2 order-1 order-md-0 OFtipos">
					<h3>{{title_10}}</h3>
					<p>{{description_10}}</p>
				</div>	
				<div class="offset-md-1 order-0 order-md-1 OFicons">
					<i class="far fa-lightbulb"></i>
				</div>
			</div>						
			<div class="row servicesRow">	
				<div class="offset-1 offset-lg-2 OFicons">
					<i class="fas fa-graduation-cap "></i>
				</div>
				<div class="col-12 col-md-7 col-lg-6 offset-md-1 OFtipos">
					<h3>{{title_11}}</h3>
					<p>{{description_11}}</p>
				</div>	
			</div>
			<div class="row servicesRow">	
				<div class="col-12 col-md-7 offset-md-1 col-lg-6 offset-lg-2 order-1 order-md-0 OFtipos">
					<h3>{{title_12}}</h3>
					<p>{{description_12}}</p>
				</div>	
				<div class="offset-md-1 order-0 order-md-1 OFicons">
					<i class="fas fa-hands-helping"></i>
				</div>
			</div>
			<div class="row servicesRow">	
				<div class="offset-1 offset-lg-2 OFicons">
					<i class="fas fa-balance-scale"></i>
				</div>
				<div class="col-12 col-md-7 col-lg-6 offset-md-1 OFtipos">
					<h3>{{title_13}}</h3>
					<p>{{description_13}}</p>
				</div>	
			</div>
			<div class="row servicesRow">	
				<div class="col-12 col-md-7 offset-md-1 col-lg-6 offset-lg-2 order-1 order-md-0 OFtipos">
					<h3>{{title_14}}</h3>
					<p>{{description_14}}</p>
				</div>	
				<div class="offset-md-1 order-0 order-md-1 OFicons">
					<i class="fas fa-laptop"></i>
				</div>
			</div>
			<div class="row servicesRow">	
				<div class="offset-1 offset-lg-2 OFicons">
					<i class="fas fa-chart-bar"></i>
				</div>
				<div class="col-12 col-md-7 col-lg-6 offset-md-1 OFtipos">
					<h3>{{title_15}}</h3>
					<p>{{description_15}}</p>
				</div>	
			</div>		
		</div>								
	</main>
</template>

<script>
	import store from '../store'
	import router from '../router'

	export default {
		name: 'Referencias',
		data () {
			return {
						title_1: "Análisis", 
						description_1: "Comprende una suma de actividades con el propósito de estudiar, ponderar, valorar y concluir respecto de objetos, personas o condiciones. Puede hacer referencia tanto a una práctica científica como a una social.",
						title_2: "Asistencia técnica", 
						description_2: "Transferencia de conocimientos, información o servicios para resolver problemas técnicos específicos o aportar elementos para su resolución.",
						title_3: "Calibración", 
						description_3: "Cubre la actualización de normas nacionales, la calibración de normas secundarias y los ensayos y análisis rutinarios de materiales, componentes, productos, procesos, suelos, atmósfera, etc.",
						title_4: "Calificación", 
						description_4: "Evaluación de la manera en que una cosa o una persona  realiza alguna actividad y en base a ello determinar las cualidades, capacidades y aptitudes para ser utilizado en alguna actividad específica.",
						title_5: "Certificación /Homologación/ Regímenes Especiales", 
						description_5: "Verificación  del cumplimiento de determinadas especificaciones o características de un objeto o acción.",
						title_6: "Control ambiental/Medio ambiental", 
						description_6: "Inspección, vigilancia y aplicación de las medidas legales y técnicas que se aplican y son necesarias para disminuir o evitar, cualquier tipo de afección al medio ambiente en general, y a un ecosistema en particular.",
						title_7: "Control de calidad", 
						description_7:"Conjunto de los mecanismos, acciones y herramientas realizadas para detectar la presencia de errores. La función principal del control de calidad es asegurar que los productos o servicios cumplan con los requisitos mínimos de calidad",
						title_8: "Desarrollo de procesos", 
						description_8: "Proyección  y elaboración de las medidas y acciones necesarias para fabricar productos a partir de materias primas. Se investigan nuevos procesos y mejoran los ya existentes.",
						title_9: "Desarrollo de productos", 
						description_9: "Se lleva a cabo en el ámbito de los negocios, ingeniería y el diseño y  consiste en el proceso completo de crear y llevar un nuevo producto al mercado.",
						title_10: "Diseño de producto", 
						description_10: "Actividad que utiliza a la creación y las ideas como principales herramientas para lograr soluciones.",
						title_11: "Ensayo", 
						description_11: "Actividad cuyo objetivo principal sea el de adquirir experiencia y obtener datos técnicos o de otro tipo que puedan utilizarse en la evaluación de hipótesis, la elaboración de nuevas fórmulas de productos, el establecimiento de nuevas especificaciones de producto terminado, el diseño de equipo especial y de estructuras necesarias para un nuevo proceso, la redacción de instrucciones de funcionamiento o manuales sobre el proceso.",
						title_12: "Formación de RRHH", 
						description_12: "La capacitación que ayude a las personas a desempeñar su vida y actividad profesional actual y pueden aportar al desarrollo de responsabilidades futuras.",
						title_13: "Peritaje", 
						description_13: "Actividad de estudio realizada por una persona o equipo de personas hábiles y prácticos que poseen acreditación certificada de sus habilidades y conocimientos encaminada a obtener criterios certeros e indubitados útiles para los fines de la actividad procesal.",
						title_14: "Programación y desarrollo software", 
						description_14: "Creación, soporte y mantenimiento de un producto adaptado como un sistema funcional que permita a un usuario final interactuar fácilmente con su ambiente.",
						title_15: "Tecnología de Gestión", 
						description_15: "Combinación de conocimientos de ingeniería, ciencia y administración con el fin de planificar, desarrollar e implantar soluciones tecnológicas que contribuyan al logro de los objetivos estratégicos y tácticos de una organización.",
				ofertaRef: {
					title: "Oferta tecnológica", 
					description: "Capacidad científico tecnológica de investigación, asistencia técnica y capacitación tecnológica existente (en la actualidad) o capaz de generarse (en  lo inmediato) en los centros productores de conocimiento (universidades, institutos de investigación, etc.) que puedan ser transferidos al sector productivo."
				}

		    }
		},
		methods: {
			goBack: function(){
				router.go(-1)
			}
		}
	}

	
</script>

<style>
main {
	margin: 40px 0;
}

.mainback button{
    border:none;
    background-color:#ffffff;
    color:#000;
    font-size:1.125em;
    text-transform:uppercase;
}

.OFtitle{
    text-align:center;
    text-transform: uppercase;
}

.OFp{
    margin-top: 20px;
    padding-bottom:20px;
    font-size: 1.25em;
    color: #4a4a4a;
    text-align: justify;
}

.references h3{
    text-align: center;
}

.references p{
    text-align: justify;
}

.servicesRow{
    margin-bottom:60px;
}

.OFsub h2{
    padding-bottom:40px;
}

.OFicons{
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    text-align:center;
    border-radius: 50%;
    background-color: #17aae4;
    width: 100px;
    height: 100px;
}


.OFicons i{
    font-size:50px;
    color: #ffffff;
}

@media screen and (max-width: 768px) {
    .OFicons{
        margin:0 auto; 
        width: 3em;
        height: 3em;
    }
 	.OFicons i {
 		font-size: 1.5em;
 	}
    .servicesRow{
        margin-bottom: 10px;
    }

    .OFtipos{
        margin-top: 20px;
    }

    .OFsub h2{
        text-align: center;
    }
}

</style>