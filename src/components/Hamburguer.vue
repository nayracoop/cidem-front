<template>	
		<div>	
      <div class="hidebutton">
				<button class="Fbtn" type="button"><i class="fas fa-bars"></i></button>
      </div>  
				<div class="headermenu" role="menu" id="hamb">
					<ul>	
						<li><a class="dropdown-item" @click="goTo('Lander')">Inicio</a></li>
						<li><a class="dropdown-item" @click="goTo('Referencias')">Referencias</a></li>
            <li><a class="dropdown-item" @click="goTo('Contact')">Contacto</a></li>
					</ul>
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
<style scoped>

.dropdown-item{
	  padding:0;
}

.hidebutton{
    text-align: right;
}

.hidebutton button{
    border: none;
    background-color: #fff;
    font-size: 30px;
    cursor:pointer;
    background: inherit;
}

.headermenu ul{
    padding:0;
    margin:0;
    width: inherit;
}

.headermenu ul li{
    list-style: none;
}

.headermenu ul li a{
    transition:0.3s;
}

.dropdown-item{
    text-align: right;       
    padding-right:6px;
    display: block;
}

.dropdown-item:active{
    background-color:#f4f4f4;
}

.headermenu ul li a:hover{
    transition:0.3s;
    border-right:solid 4px #17aae4;
}

.headermenu{
    color:#000;
    font-size:1.25em;
    width: inherit;
    background: #f4f4f4;
    position: fixed;
    z-index: 1;
    overflow-x: hidden;
    transition: 0.5s;
    width: 0;
}

.headercollapse ul li{
    list-style:none;
    display:inline-block;
    margin:0 5px;
}

.headercollapse ul{
    padding:0;

}

.collapse.show{
  margin-left:-200px;
}


</style>