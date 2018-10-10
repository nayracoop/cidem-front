<template>
		<div class="col-12 col-md-2 mainback">
				<a @click="callback"><i class="fas fa-caret-left"></i>Volver</a>
		</div>
</template>

<script>
	export default {
		name: 'bVolver',
		props: ["callback"]
	}
</script>

<style>
.mainback a{
	text-transform: uppercase;
}
.mainback a{
    text-decoration: none;
    color:#000;
    font-size:1.125em;
}
@media screen and (max-width: 768px){
    .mainback a{
        color:#17aae4;
    }
    .mainback{
        margin-bottom: 10px; 
    }
}

</style>