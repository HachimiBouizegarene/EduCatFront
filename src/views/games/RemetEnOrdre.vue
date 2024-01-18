<template>
    <div>
      <MenuComponent ref="menu" @menu-clicked="menuClicked"></MenuComponent>
  
      <div>
        <Puzzles @puzzle-changed="selectedPuzzleID = $event" />
  
        <!-- Utilisez directement la propriété difficulty_choosen pour afficher le composant correspondant -->
        <SliderPuzzleeasy v-if="difficulty_choosen == 0 " :puzzleId="selectedPuzzleID" />
        <SliderPuzzlemedium v-if="difficulty_choosen == 1" :puzzleId="selectedPuzzleID" />
        <SliderPuzzlehard v-if="difficulty_choosen == 2" :puzzleId="selectedPuzzleID" />
  
       
      </div>
    </div>
  </template>
  
  <script>
  import SliderPuzzleeasy from './components/SliderPuzzleeasy.vue';
  import SliderPuzzlemedium from './components/SliderPuzzlemedium.vue';
  import SliderPuzzlehard from './components/SliderPuzzlehard.vue';
  import Puzzles from './components/Menu.vue';
  import MenuComponent from "@/components/all/MenuComponent.vue";
  
  export default {
    name: 'App',
    components: {
      Puzzles,
      SliderPuzzlehard,
      SliderPuzzleeasy,
      SliderPuzzlemedium,
      MenuComponent,
    },
    data() {
      return {
        difficulty_choosen: 'FACILE', // Définissez une valeur par défaut
        selectedPuzzleID: 'geographie',
      };
    },
    mounted() {
      let difficultys = ["FACILE", "MOYEN", "DIFFICILE"];
      this.$refs.menu.open('CHOISISSEZ UNE DIFFICULTÉ', difficultys, 'REJOUER');
    },
    methods: {
      menuClicked(message, difficulty_choosen) {
        this.difficulty_choosen = difficulty_choosen;
   
      },
    },
  };
  </script>
  <style scoped>
  /* Styles spécifiques à votre composant App.vue */
  #app {
    font-family: 'Arial', sans-serif;
    text-align: center;
    color: #333;
   background-color: #3498db;
    padding: 20px;
  }
  
  /* Autres styles spécifiques à votre composant */
  </style>