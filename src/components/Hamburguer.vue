	<template>	
	<div>	
    <div class="hidebutton">
			<button class="Fbtn" type="button" @click="openSide = true"><i class="fas fa-bars"></i></button>
    </div>    
		<div class="headermenu" role="menu" :class='{headermenushow: openSide}'>
			<span class="close" @click="openSide = false"><i class="fas fa-times"></i></span>
         	<ul>	
    				<li><a class="item" @click="()=>{goTo('Lander');openSide = false}">Inicio</a></li>
    				<li><a class="item" @click="()=>{goTo('Referencias');openSide = false}">Referencias</a></li>
           	<li><a class="item" @click="()=>{goTo('Contact');openSide = false}">Contacto</a></li>
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
    	openSide:false
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

.item{
    text-align: left;       
    padding:10px 15px;
    display: block;
}

.hidebutton{
    text-align: right;
}

.headermenu .close{
    text-align: right;
    margin-right: 20px;
}

.headermenu .close:hover{
	color:inherit;
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
    margin:80px auto;
}

.headermenu i{
  text-align:right;
  color:#fff;
}

.headermenu ul li{
    list-style: none;
    text-transform:uppercase;
}

.headermenu ul li a{
    transition:0.3s;
}

.headermenu ul li a:hover{
    transition:0.3s;
    background-color: #17aae4;
}

.headermenu {
    color:#fff;
    font-size:1.25em;
    background: #0d0d0d;
    position: fixed;
    overflow-x: hidden;
    transition: 0.3s;
    width: 0;
    height: 200px;
    right: -1px;
    height:100%;
    z-index:4;
    top:0;
    padding-top:40px;
}

.headermenu::before {
  content:"";
  background-color:rgba(255,255,255,0);
  margin-right:0;
}


.headermenushow{
	width:240px;
}

.headermenushow::before {
    content: "";
    display:block;
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left:0;
    background-color: rgba(0,0,0,.5);
    transition: background-color 0.4s, margin-right 0.35s;   
    margin-right:239px;      
}

.headercollapse ul{
    padding:0;
}	

@media screen and (max-width:576px){
	.headermenushow{
		width:100%;
	}

  .headermenushow::before {
    content: none;      
}

	.item{
		text-align:center;
    font-size:1.25em;
	}
	
	.headermenu ul li a:hover{
		border:none;
	}

}
</style>