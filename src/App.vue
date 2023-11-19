<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
  *{
      padding: 0;
      margin: 0;
      font-family:'Roboto Condensed';
  }
  body{
    max-width: 1920px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    height: 100vh;
  }
  #app{
    height: 100%;
  }
</style>
