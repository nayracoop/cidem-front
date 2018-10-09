<template>
	<main role="main" class="col-10 offset-1">
		<button @click="goBack"> volver </button>
		<div class="row">
			<h2> {{ofertaRef.title}}</h2>
			<p> {{ofertaRef.description}}</p>
		</div>
		<h2>Referencias por tipo de servicio</h2>
		<div v-for="ref in typeRef" class="row">
				<h4> {{ref.title}}</h4>
				<p> {{ref.description}} </p>
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
				typeRef: [
					{
						title: "Análisis", 
						description: "Comprende una suma de actividades con el propósito de estudiar, ponderar, valorar y concluir respecto de objetos, personas o condiciones. Puede hacer referencia tanto a una práctica científica como a una social."
					}, 
					{
						title: "Asistencia técnica", 
						description: "Transferencia de conocimientos, información o servicios para resolver problemas técnicos específicos o aportar elementos para su resolución."
					}, 
					{
						title: "Calibración", 
						description: "Cubre la actualización de normas nacionales, la calibración de normas secundarias y los ensayos y análisis rutinarios de materiales, componentes, productos, procesos, suelos, atmósfera, etc."
					},
					{
						title: "Calificación", 
						description: "Evaluación de la manera en que una cosa o una persona  realiza alguna actividad y en base a ello determinar las cualidades, capacidades y aptitudes para ser utilizado en alguna actividad específica."
					},
					{
						title: "Certificación/Homologación/Regímenes Especiales", 
						description: "Verificación  del cumplimiento de determinadas especificaciones o características de un objeto o acción."
					},
					{
						title: "Control ambiental/Medio ambiental", 
						description: "Inspección, vigilancia y aplicación de las medidas legales y técnicas que se aplican y son necesarias para disminuir o evitar, cualquier tipo de afección al medio ambiente en general, y a un ecosistema en particular."
					},
					{
						title: "Control de calidad", 
						description: "Conjunto de los mecanismos, acciones y herramientas realizadas para detectar la presencia de errores. La función principal del control de calidad es asegurar que los productos o servicios cumplan con los requisitos mínimos de calidad"
					},
					{
						title: "Desarrollo de procesos", 
						description: "Proyección  y elaboración de las medidas y acciones necesarias para fabricar productos a partir de materias primas. Se investigan nuevos procesos y mejoran los ya existentes."
					},
					{
						title: "Desarrollo de productos", 
						description: "Se lleva a cabo en el ámbito de los negocios, ingeniería y el diseño y  consiste en el proceso completo de crear y llevar un nuevo producto al mercado."
					},
					{
						title: "Diseño de producto", 
						description: "Actividad que utiliza a la creación y las ideas como principales herramientas para lograr soluciones. "
					},
					{
						title: "Ensayo", 
						description: "Actividad cuyo objetivo principal sea el de adquirir experiencia y obtener datos técnicos o de otro tipo que puedan utilizarse en la evaluación de hipótesis, la elaboración de nuevas fórmulas de productos, el establecimiento de nuevas especificaciones de producto terminado, el diseño de equipo especial y de estructuras necesarias para un nuevo proceso, la redacción de instrucciones de funcionamiento o manuales sobre el proceso."
					},
					{
						title: "Formación de RRHH", 
						description: "La capacitación que ayude a las personas a desempeñar su vida y actividad profesional actual y pueden aportar al desarrollo de responsabilidades futuras."
					},
					{
						title: "Peritaje", 
						description: "Actividad de estudio realizada por una persona o equipo de personas hábiles y prácticos que poseen acreditación certificada de sus habilidades y conocimientos encaminada a obtener criterios certeros e indubitados útiles para los fines de la actividad procesal."
					},
					{
						title: "Programación y desarrollo software", 
						description: "Creación, soporte y mantenimiento de un producto adaptado como un sistema funcional que permita a un usuario final interactuar fácilmente con su ambiente."
					},
					{
						title: "Tecnología de Gestión", 
						description: "Combinación de conocimientos de ingeniería, ciencia y administración con el fin de planificar, desarrollar e implantar soluciones tecnológicas que contribuyan al logro de los objetivos estratégicos y tácticos de una organización. "
					},
				],
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
	margin: 20px 0;
}
</style>