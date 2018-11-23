<template>
 <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>Iniciar sesión</h1>
                  <p class="text-muted">Ingrese a su cuenta administrativa</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" required class="form-control" placeholder="Email" autocomplete="username email" v-model="form.email" required/>
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" required class="form-control" placeholder="Constraseña" autocomplete="current-password" v-model="form.password" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button type="submit" variant="primary" class="px-4" @click="submitLogin($event)" :disabled="validation">
                          <span v-if="!loading">Iniciar sesión</span>
                          <i v-if="loading" class="fa fa-spinner fa-spin fa-fw"></i>
                      </b-button>
                    </b-col>
                  
                    <p class="alert-danger m-1 p-1 px-2" v-if="invalid">Email o contraseña inválidos!</p>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
	import store from '../store'

	export default{
    name: 'AdminLogin',
    data() {
      return {
        form: {
          email: '',
          password: ''
        },
        invalid: false,
        loading: false
      }
    },
    computed:{
      validation(){
         if (this.form.email != '' && this.form.password!=''){
           return false;
         } else {
           return true;
         }
      }
    },
    methods: {
      submitLogin(e){
        e.preventDefault();
        this.loading = true;
        store.dispatch('login', this.form).then(response => {
          if (response == "error"){
            this.loading = false;
            this.invalid = true;
              setTimeout(() => {
              this.invalid = false;
            }, 2500);
            this.form.email='';
            this.form.password='';
          } else if (response == "success"){  
            this.$router.push({name: 'Admin'});
          }
        });
      }
    }
	}
</script>

<style lang="scss">
 // CoreUI Icons Set
  @import '../../node_modules/@coreui/icons/css/coreui-icons.min.css';
  /* Import Font Awesome Icons Set */
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/scss/font-awesome.scss';
  /* Import Simple Line Icons Set */
  $simple-line-font-path: '~simple-line-icons/fonts/';
  @import '~simple-line-icons/scss/simple-line-icons.scss';
  /* Import Flag Icons Set */
  @import '../../node_modules/flag-icon-css/css/flag-icon.min.css';
  /* Import Bootstrap Vue Styles */
  @import '../../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
  // Import Main styles for this application
  @import '@/assets/scss/style.scss';

</style>