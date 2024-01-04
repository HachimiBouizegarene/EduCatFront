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

@font-face {
    font-family: 'VT323';
    src: url('@/assets/fonts/VT323-Regular.ttf') format('truetype');
}

@font-face {
    font-family: 'gamePage';
    /* Nom de la police */
    src: url('@/assets/fonts/gamePage.ttf') format('truetype');
    /* Chemin vers le fichier WOFF */
    /* Ajoute d'autres formats de fichiers de police si nécessaire */
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

a{
    text-decoration: none;
}

/* SCROLLBAR */
body {
  --sb-track-color: #dbdbdb;
  --sb-thumb-color: #b1b1b1;
  --sb-size: 10px;
}

/* Pour WebKit (Chrome, Safari) */
body::-webkit-scrollbar {
  width: var(--sb-size);
}

body::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 10px;
}

body::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 10px;
}

/* Pour Firefox */
body {
  scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
}

body::-moz-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 10px;
}

body::-moz-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 10px;
}
</style>
