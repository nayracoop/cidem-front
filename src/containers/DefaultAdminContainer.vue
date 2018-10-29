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
        <b-nav-item class="px-3">Logout</b-nav-item>
        <b-nav-item class="px-3">Users</b-nav-item>
      </b-navbar-nav>
      <!--AsideToggler class="d-none d-lg-block" /-->
      <!--AsideToggler class="d-lg-none" mobile /-->
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside/>
      </AppAside>
    </div>

  </div>
</template>

<script>
import nav from '@/_nav'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler, Breadcrumb } from '@coreui/vue'
import DefaultAside from '@/containers/DefaultAside'
import DefaultHeaderDropdownAccnt from '@/containers/DefaultHeaderDropdownAccnt'


export default {
  name: 'DefaultAdminContainer',
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
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