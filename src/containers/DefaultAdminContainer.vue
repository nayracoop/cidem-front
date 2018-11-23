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
        <b-nav-item class="px-3" @click="submitLogout()">Cerrar sesión</b-nav-item>
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


export default {
  name: 'DefaultAdminContainer',
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    Breadcrumb,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  data () {
    return {
      
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    nav () {
      return nav.items;
    },
    list () {
      return this.$route.matched
    },

  },
  methods: {
    submitLogout(){
      store.dispatch('logout').then(response => {
        console.log(response);
        if (response.data.status === 'logged out'){
          this.$router.push({name: 'Admin'});
        }
      });
    },
  }
}
</script>

<style  lang="scss">
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

  .pagination-nav {
    display: inline-block;
}
p.validation-error{
  font-size: 0.75em;
  padding: 1px 6px;
  margin-bottom: 3px;
  font-style: italic;
  color:red;
  opacity: 1 ;
  transition: all ease-out 400;
}
.hide {
  opacity: 0;
   font-size: 0.75em;
  padding: 1px 6px;
  margin-top: 6px;
  transition: all ease-out 400;

}

</style>