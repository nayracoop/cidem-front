<template>	
		<div class="dropdown ">
			<div class="hidebutton">
				<button class="Fbtn" type="button" data-toggle="dropdown">
				<i class="fas fa-bars"></i>
				</button>
				<div class="dropdown-menu rounded-0 dropdown-menu-right headermenu" role="menu" aria-expanded="false">
					<ul>	
						<li><a class="dropdown-item" @click="goTo('LogIn')">Log in</a></li>
						<li><a class="dropdown-item" @click="goTo('Referencias')">Referencias</a></li>
            <li><a class="dropdown-item" @click="goTo('Contact')">Contacto</a></li>
					</ul>
				</div>
			</div>
		</div>
</template>
<script>
import router from '../router'

export default {

  name: 'Hamburguer',
  data:function () {
    return {
    
  	}
  },
  methods:{
  	goTo: function (link) {
  		router.push({ name: link});     
  	}
  }
}	
</script>
<style scope>
.dropdown-item{
	padding:0;
}
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
    padding-right:0px;
    display: block;
    list-style: none;
}

.headermenu{
    color:#000;
    font-size:1.25em;
    width: 100px;
}
</style>