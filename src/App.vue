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
@font-face {
  font-family: 'pixel';
  src: url('@/assets/fonts/pixel.ttf')
}

@font-face {
  font-family: 'pixel2';
  src: url('@/assets/fonts/pixel2.ttf')
}

* {
  padding: 0;
  margin: 0;
  font-family: 'Roboto Condensed';
}

body {
  max-width: 1920px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  min-height: 100vh;
}

#app {
  height: 100%;
}
</style>
