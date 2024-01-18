<template>
  <div>
    <MenuComponent ref="menu" @menu-clicked="menuClicked"></MenuComponent>

    <div>
      <Puzzles @puzzle-changed="selectedPuzzleID = $event" />

      <!-- Utilisez directement la propriété difficulty_choosen pour afficher le composant correspondant -->
      <SliderPuzzleeasy @finished="finished" v-if="difficulty_choosen == 0" :puzzleId="selectedPuzzleID" />
      <SliderPuzzlemedium @finished="finished" v-if="difficulty_choosen == 1" :puzzleId="selectedPuzzleID" />
      <SliderPuzzlehard @finished="finished" v-if="difficulty_choosen == 2" :puzzleId="selectedPuzzleID" />

    </div>
  </div>
</template>
  
<script>
import SliderPuzzleeasy from '@/components/games/RemetEnOrdre/SliderPuzzleeasy.vue';
import SliderPuzzlemedium from '@/components/games/RemetEnOrdre/SliderPuzzlemedium.vue';
import SliderPuzzlehard from '@/components/games/RemetEnOrdre/SliderPuzzlehard.vue';
import Puzzles from '@/components/games/RemetEnOrdre/Menu.vue';
import MenuComponent from "@/components/all/MenuComponent.vue";
// import { toHandlers } from 'vue';

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
      difficulty_label: undefined
    };
  },
  mounted() {
    let difficultys = ["FACILE", "MOYEN", "DIFFICILE"];
    this.$refs.menu.open('CHOISISSEZ UNE DIFFICULTÉ', difficultys, 'JOUER');
  },
  methods: {
    menuClicked(message, difficulty_choosen, difficulty_label) {
      this.difficulty_choosen = difficulty_choosen;
      this.difficulty_label = difficulty_label;
    },

    finished(timer) {

      let difficultys = ["FACILE", "MOYEN", "DIFFICILE"];
      this.$refs.menu.open('CHOISISSEZ UNE DIFFICULTÉ', difficultys, 'REJOUER', undefined, timer);
      this.registerPartie(timer);
    },

    async registerPartie(timer) {
      const response = await fetch("http://localhost:9090/insertPartie", {
        method: "POST",
        body: JSON.stringify({
          "ScorePartie": (timer).toString(),
          "LibelleDifficultePartie": this.difficulty_label,
          "jws": this.$cookies.get('jws'),
          "NomJeu": this.$route.name,
        })
      })
      response;
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