<template>
  <div class="footer">	
    <div class="row justify-content-between rowfooter">
      <div class="offset-3 col-6 offset-sm-0 col-sm-4 col-md-3 cidem text-center text-sm-left order-1 order-md-0"> 
          <a target="_blank" href="http://untref.edu.ar/sitios/cidem"><img src="../assets/img/CIDEM.jpg" alt="CIDEM (Centro de Innovación y Desarrollo de Empresas y Organizaciones)"></a>       
      </div>  
      <div class="col-12 col-md-6 SIDcontact order-0 order-md-1">
        <p>{{SID}} <span class="address">{{SIDaddress}}</span></p>
      </div>  
      <div class="offset-3 col-6 offset-sm-0 col-sm-4 col-md-3 text-center text-sm-right cidem order-2">  
          <a target="_blank" href="http://www.untref.edu.ar/investigacion-y-desarrollo"><img src="../assets/img/logoSID.png" alt="SID (Secretaria de Investigación y Desarrollo)"></a>              
      </div>
    </div>
  </div>		
</template>

<script>
export default {
  name: 'TheFooter',
  data () {
    return {
      SID:"Secretaria de Investigación y Desarrollo-SID",
      SIDaddress:"Av. San Martín 2508, Caseros, Buenos Aires|4716-0004|desarrollo@untref.edu.ar"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.footer {
    border-top:1px solid rgba(0, 0, 0, 0.2);
    margin-top:2em;
}

.cidem img{
    max-width: 200px; 
    max-height: 200px;
    width: 100%;
}

.SIDcontact{
    font-weight: 200;
    font-size: 0.875em;
    text-align: center;
    margin-bottom:16px;
    line-height:1.25em;
}

.rowfooter{
  padding: 10px 0;
}

.address{
    display:block;
}

@media screen and (max-width:768px){
  .cidem img{
    margin-bottom:32px;
  }
}
</style>
