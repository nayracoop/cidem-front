<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="/">
        <img class="navbar-brand-full" src="../assets/img/logountref.svg" width="55" height="" alt="Courier Admin Logo">
        <img class="navbar-brand-minimized ml-5" src="../assets/img/logountref.svg" width="55" alt="Courier Admin Logo">
      </b-link>
      <SidebarToggler class="d-md-down-none mr-auto" display="lg" />
      <b-navbar-nav class="d-md-down-none float-right">
        <b-nav-item class="px-3" @click="logout()">Cerrar sesión</b-nav-item>
      </b-navbar-nav>

    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter/>
      </AppSidebar>
      <main class="main">
        <breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view ></router-view>
        </div>
      </main>
      <AppAside fixed>
      </AppAside>
    </div>

  </div>
</template>

<script>
import nav from '@/_nav'
import store from '@/store'

import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler, Breadcrumb } from '@coreui/vue'
import DefaultHeaderDropdownAccnt from '@/containers/DefaultHeaderDropdownAccnt'


export default {
  name: 'DefaultAdminContainer',
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    Breadcrumb,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  beforeRouteEnter(to, from, next){
    store.dispatch('fetchMessages').then(() => {
      next();
    }); 
  },
  data () {
    return {
      nav: nav.items
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched
    }
  },
  methods: {
    logout(){
      console.log('logout');
    }
  }
}
</script>

<style scoped lang="scss">
  /deep/ {
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
  // Import Main styles for this application
  @import '@/assets/scss/style.scss';
  }
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