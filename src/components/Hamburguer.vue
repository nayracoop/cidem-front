<template>	
		<div class="col-6 col-md-9 dropdown">
			<div class="hidebutton">
				<button class="Fbtn" type="button" data-toggle="dropdown">
				<i class="fas fa-bars"></i>
				</button>
				<div class="dropdown-menu rounded-0 dropdown-menu-right headermenu" role="menu" aria-expanded="false">
					<ul>	
						<li><a class="dropdown-item" href="#">{{log}}</a></li>
						<li><a class="dropdown-item" href="#">{{reference}}</a></li>
						<li><a class="dropdown-item" href="#">{{contact}}</a></li>
					</ul>
				</div>
			</div>
		</div>
</template>
<script>
export default {
  name: 'Hamburguer',
  data:function () {
    return {
    	log:"Log in",
    	referencia:"referencia",
    	contacto:"contacto"
  	}
  }
}	
</script>
<style>
.hidebutton{
    text-align: right;
}

.hidebutton button{
    border: none;
    background-color: white;
    font-size: 30px;
    margin-top: 15px;
    cursor:pointer;
}

.headermenu ul{
    padding:0;
}

.headermenu ul li{
    text-align: right;       
    padding-right:4px;
    display: block;
    list-style: none;
}

.headermenu a{
    color:#000;
    font-size:1.25em;
}
</style>