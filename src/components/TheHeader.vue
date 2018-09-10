<template>
  <div class="row align-items-center header">
    <div class="col-sm-6 col-md-3 col-lg-3">  
        <img src="../assets/img/logountref.svg" alt="logo-untref">  
    </div>
    <div class="d-none d-md-inline col-md-6 col-lg-6 offset-3">
      <div class="input-group">
        <input 
          type="text" 
          class="form-control rounded-0 place" 
          placeholder="Buscar servicios, instituciones..." 
          aria-label="Recipient's username" 
          aria-describedby="button-addon2">
        <div class="input-group-append boton">
          <button class="btn btn-outline-secondary rounded-0 boton" type="button">Buscar</button>
        </div>
      </div>                  
    </div>
  </div>          
</template>

<script>
export default {
  name: 'TheHeader',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  margin-top: 1em;
  border-bottom:1px solid rgba(0, 0, 0, 0.2);
  width: 100%;
  padding-bottom: 1em;
}

/*HACER QUE DESAPAREZCA LINEA CON MEDIAQ, HACER EL BUSCADOR MÁS GRANDE CON MEDIAQ*/
.header img{
    height: auto; 
    width: auto; 
    max-width: 150px; 
    max-height: 150px;
}


</style>
