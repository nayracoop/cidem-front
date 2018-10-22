<template>
  <div class="container">
    <the-header class="d-print-none"></the-header>
    <div class="view">
      <router-view/>
    </div>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'

export default {
  name: 'DefaultContainer',
  data() {
    return {
    }
  },
  components: {
    TheHeader,
    TheFooter
  } 

}
</script>

