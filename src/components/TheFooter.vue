<template>
	<div class="footer">	
		<div class="row justify-content-between rowfooter">
			<div class="col-6 col-md-3 cidem">	
			  	<a href="#"><img src="../assets/img/CIDEM.jpg" alt="logo-cidem"></a> 			  	  
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

.footer .cidem img{
    height: auto; 
    width: auto; 
    max-width: 200px; 
    max-height: 200px;
}

.rowfooter{
    padding-bottom: 1em;
}
</style>
