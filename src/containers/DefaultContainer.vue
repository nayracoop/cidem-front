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

<style>
 

  @font-face {
      font-family: 'Distefano-Sans';
      font-style: normal;
      font-weight: 400;
      src: url('../assets/fonts/tipo_-_distefanosans_regular-webfont.woff') format('woff');
  }
/*
  @font-face {
      font-family: 'Distefano-Sans';
      font-style: italic;
      font-weight: 400;
      src: url('../assets/fonts/tipo_-_distefanosans-italic-webfont.woff') format('woff');
  }
*/
  @font-face {
      font-family: 'Distefano-Sans';
      font-style: normal;
      font-weight: 200;
      src: url('../assets/fonts/tipo_-_distefanosans_light-webfont.woff') format('woff');
  }
/*
  @font-face {
      font-family: 'Distefano-Sans';
      font-style: italic;
      font-weight: 200;
      src: url('../assets/fonts/tipo_-_distefanosanslightitalic-webfont.woff') format('woff');
  }
*/
  @font-face {
      font-family: 'Distefano-Sans';
      font-style: normal;
      font-weight: 900;
      src: url('../assets/fonts/tipo_-_distefanosans-black-webfont.woff') format('woff');
  }

/*
  @font-face {
      font-family: 'Distefano-Sans';
      font-style: italic;
      font-weight: 900;
      src: url('../assets/fonts/tipo_-_distefanosans-blackitalic-webfont.woff') format('woff');
  }
  */

  @font-face {
      font-family: 'Distefano-Sans';
      font-style: normal;
      font-weight: 700;
      src: url('../assets/fonts/tipo_-_distefanosans-bold-webfont.woff') format('woff');
  }

  @font-face {
      font-family: 'Distefano-Slab';
      font-weight: 700;
      src: url('../assets/fonts/tipo_-_distefanoslab-bold-webfont.woff') format('woff');
  }
  @font-face {
      font-family: 'Distefano-Slab';
      font-weight: 400;
      src: url('../assets/fonts/tipo_-_distefanoslab-regular-webfont.woff') format('woff');
  }

  body {
    font: normal 100%/1.5 'Distefano-Sans', sans-serif;
    background: #fff;
    color:#000;
    margin: auto;
    cursor: default;

  }


a{
  cursor: pointer;
}


</style>