<template>	
		<div>
			<div class="hidebutton d-none d-sm-block">
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
      <div class="hidebutton d-block d-sm-none"> 
        <button class="Fbtn" type="button" data-toggle="collapse" data-target="#linksmenu">
        <i class="fas fa-bars"></i>
        </button>
        <div class="rounded-0 collapse headercollapse" id="linksmenu" role="menu" aria-expanded="false">
          <ul>  
            <li><a @click="goTo('LogIn')">Log in</a></li>
            <li><a @click="goTo('Referencias')">Referencias</a></li>
            <li><a @click="goTo('Contact')">Contacto</a></li>
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