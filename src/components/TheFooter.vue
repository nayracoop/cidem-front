<template>
  <div class="footer">	
    <div class="row d-flex justify-content-between rowfooter">
      <div class="col-6 col-md-3 cidem text-center order-1 order-md-0"> 
          <a href="http://untref.edu.ar/sitios/cidem"><img src="../assets/img/CIDEM.jpg" alt="logo-cidem"></a>       
      </div>  
      <div class="col-12 col-md-6 SIDcontact order-0 order-md-1">
        <address>{{SID}} <span class="address">{{SIDaddress}}</span></address>
      </div>  
      <div class="col-6 col-md-3 text-center cidem order-2">  
          <a href="http://www.untref.edu.ar/investigacion-y-desarrollo"><img src="../assets/img/logoSID.png" alt="logo-SID"></a>              
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
}

.cidem img{
    max-width: 200px; 
    max-height: 200px;
    width: 60%;
}

.SIDcontact{
    font-weight: 200;
    font-size: 0.875em;
    text-align: center;
}

.rowfooter{
  padding: 10px 0;
}

.address{
    display:block;
}
</style>
